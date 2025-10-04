/**
 * @fileoverview Netlify Function: Chat Jarvis Proxy
 * 
 * This function acts as a proxy between the frontend and the RAG API server.
 * It handles CORS, request validation, and optional lead creation.
 * 
 * @author Kingdom Design House
 * @version 1.0.0
 */

/**
 * Standard CORS headers for all responses
 * @constant {Object}
 */
const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

/**
 * Creates a standardized HTTP response
 * @param {number} statusCode - HTTP status code
 * @param {Object} data - Response data
 * @param {Object} [additionalHeaders={}] - Additional headers to include
 * @returns {Object} Netlify function response object
 */
const createResponse = (statusCode, data, additionalHeaders = {}) => ({
  statusCode,
  headers: {
    ...CORS_HEADERS,
    'Content-Type': 'application/json',
    ...additionalHeaders,
  },
  body: JSON.stringify(data),
});

/**
 * Handles CORS preflight requests
 * @returns {Object} CORS preflight response
 */
const handleCorsPreflight = () => {
  return createResponse(200, '', {
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  });
};

/**
 * Validates the incoming request
 * @param {Object} event - Netlify event object
 * @returns {Object|null} Error response if validation fails, null if valid
 */
const validateRequest = (event) => {
  // Check HTTP method
  if (event.httpMethod !== 'POST') {
    return createResponse(405, { 
      error: 'Method not allowed',
      message: 'Only POST requests are allowed' 
    });
  }

  // Parse and validate request body
  let requestBody;
  try {
    requestBody = JSON.parse(event.body);
  } catch (parseError) {
    return createResponse(400, { 
      error: 'Invalid JSON',
      message: 'Request body must be valid JSON' 
    });
  }

  // Check for required message field
  if (!requestBody.message || !requestBody.message.trim()) {
    return createResponse(400, { 
      error: 'Message is required',
      message: 'The message field cannot be empty' 
    });
  }

  return null; // Validation passed
};

/**
 * Calls the RAG API server to process the chat request
 * @param {string} message - User's chat message
 * @param {Array} conversationHistory - Previous conversation messages
 * @param {string} userId - User identifier
 * @returns {Promise<Object>} RAG API response data
 * @throws {Error} If RAG API call fails
 */
const callRagApi = async (message, conversationHistory, userId) => {
  // Use deployed RAG API URL or fallback to localhost for development
  const ragApiUrl = process.env.RAG_API_URL || 'https://kingdom-design-house-production.up.railway.app';
  
  const requestBody = {
    query: message,
    conversationHistory,
    userId,
  };
  
  try {
    const ragResponse = await fetch(`${ragApiUrl}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!ragResponse.ok) {
      const errorText = await ragResponse.text();
      console.error('RAG API error details:', {
        status: ragResponse.status,
        statusText: ragResponse.statusText,
        headers: Object.fromEntries(ragResponse.headers.entries()),
        body: errorText
      });
      throw new Error(`RAG API error: ${ragResponse.status} - ${errorText}`);
    }

    return await ragResponse.json();
  } catch (error) {
    console.error('RAG API call failed:', error);
    
    // Return a fallback response when RAG API is unavailable
    return {
      response: `Hello! I'm Jarvis from Kingdom Design House. I'm currently experiencing some technical difficulties with my AI services, but I'd be happy to help you with your project needs.

For immediate assistance, please contact us:
📞 Phone: 347.927.8846
📧 Email: kingdomdesignhouse@gmail.com

We offer comprehensive packages for businesses of all sizes, including:
• Web Development & Design
• IT Services & Support  
• Networking Solutions
• AI Integration

What specific services are you interested in?`,
      structuredInfo: {
        email: null,
        first_name: null,
        last_name: null,
        phone: null,
        company: null,
        website: null,
        service_requested: 'General Inquiry',
        budget_range: null,
        timeline: null,
        project_description: message
      },
      hubspotLead: null,
      relevantDocs: [],
      timestamp: new Date().toISOString()
    };
  }
};

/**
 * Transforms RAG API structured info to match HubSpot service expectations
 * @param {Object} structuredInfo - Raw structured info from RAG API
 * @param {string} originalMessage - Original user message
 * @returns {Object} Transformed lead data for HubSpot
 */
const transformLeadData = (structuredInfo, originalMessage) => {
  // Timeline to days mapping
  const timelineMap = {
    'urgent': 7,
    'asap': 7,
    'month': 30,
    'quarter': 90
  };

  // Extract budget amount with multiplier support
  const extractBudgetAmount = (budget) => {
    if (!budget) return '0';
    const match = budget.match(/\$?(\d+(?:\.\d+)?)([kK]?)/);
    return match ? (parseFloat(match[1]) * (match[2].toLowerCase() === 'k' ? 1000 : 1)).toString() : '0';
  };

  // Get delivery date based on timeline keywords
  const getDeliveryDate = (timeline) => {
    const days = 
    Object.entries(timelineMap)
      .find(([keyword]) => timeline?.toLowerCase().includes(keyword))?.[1] || 30;
    return new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString();
  };

  // Unified field mapping with direct and computed values
  const fieldMap = {
    // Direct mappings
    ...Object.fromEntries(['email', 'first_name', 'last_name', 'phone', 'company', 'website', 'service_requested', 'conversation_keywords', 'budget_range', 'timeline']
      .map(field => [field, structuredInfo[field]])),
    
    // Computed mappings
    deal_name: structuredInfo.service_requested ? `${structuredInfo.service_requested} Project` : 'New Lead Project',
    budget_amount: extractBudgetAmount(structuredInfo.budget_range),
    estimated_delivery_date: getDeliveryDate(structuredInfo.timeline),
    project_description: structuredInfo.project_description || originalMessage,
    description: structuredInfo.project_description || originalMessage,
    priority_level: 'HIGH',
    assigned_team: 'KDH Sales Team',
    issue_type: 'Lead Follow-up',
    originalMessage,
    timestamp: new Date().toISOString()
  };

  return fieldMap;
};

/**
 * Attempts to create a lead in HubSpot if structured information is available
 * @param {Object} ragData - Response data from RAG API
 * @param {string} originalMessage - Original user message
 * @returns {Promise<Object>} Updated RAG data with lead creation status
 */
const handleLeadCreation = async (ragData, originalMessage) => {
  // Check if we have structured lead information
  if (!ragData.structuredInfo || !shouldCreateLead(ragData.structuredInfo)) {
    return ragData;
  }

  try {
    // Transform the data to match HubSpot service expectations
    const transformedLeadData = transformLeadData(ragData.structuredInfo, originalMessage);
        
    const leadResponse = await fetch(`${process.env.URL || 'http://localhost:8888'}/.netlify/functions/send-lead`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transformedLeadData),
    });

    if(!leadResponse.ok){
      const errorData = await leadResponse.json();
      console.warn('Lead creation failed:', leadResponse.status, errorData);
      ragData.leadCreated = false;
      ragData.leadError = errorData.message || 'Lead creation failed';
    }
    ragData.leadCreated = true;
  
  } catch (leadError) {
    console.error('Error creating lead:', leadError);
    // Don't fail the chat response if lead creation fails
    ragData.leadCreated = false;
    ragData.leadError = leadError.message;
  }

  return ragData;
};

/**
 * Determines if a lead should be created based on structured information
 * Matches the requirements from HubSpot service (hubspot.js)
 * 
 * Contact Creation Requirements:
 * - email (required for contact creation)
 * 
 * Deal Creation Requirements:
 * - service_requested (required for deal creation)
 * 
 * Ticket Creation Requirements:
 * - project_description OR service_requested (required for ticket creation)
 * 
 * @param {Object} structuredInfo - Extracted structured information
 * @returns {boolean} True if lead should be created
 */
const shouldCreateLead = (structuredInfo) => {
  if (!structuredInfo || typeof structuredInfo !== 'object') {
    console.log('No structured info or invalid format');
    return false;
  }

  // Check for email (required for contact creation)
  const hasEmail = structuredInfo.email && structuredInfo.email.trim() !== '';
  
  // Check for service interest (required for deal/ticket creation)
  const hasServiceInterest = structuredInfo.service_requested && structuredInfo.service_requested.trim() !== '';
  
  // Check for project description (alternative for ticket creation)
  const hasProjectDescription = structuredInfo.project_description && structuredInfo.project_description.trim() !== '';
  
  // Check for any lead indicators (budget, timeline, company, phone)
  const hasLeadIndicators = structuredInfo.budget_range || 
                           structuredInfo.timeline || 
                           structuredInfo.company || 
                           structuredInfo.phone ||
                           structuredInfo.first_name ||
                           structuredInfo.last_name;

  // Lead should be created if:
  // 1. We have an email AND (service interest OR project description OR lead indicators)
  // 2. OR we have service interest with any contact info
  const shouldCreate = (hasEmail && (hasServiceInterest || hasProjectDescription || hasLeadIndicators)) ||
                      (hasServiceInterest && (structuredInfo.first_name || structuredInfo.last_name || structuredInfo.company));

  console.log('Lead creation decision:', {
    hasEmail,
    hasServiceInterest,
    hasProjectDescription,
    hasLeadIndicators,
    shouldCreate
  });

  return shouldCreate;
};

/**
 * Main Netlify function handler
 * 
 * Flow:
 * 1. Handle CORS preflight requests
 * 2. Validate incoming request
 * 3. Call RAG API server
 * 4. Optionally create lead in HubSpot
 * 5. Return response to frontend
 * 
 * @param {Object} event - Netlify event object
 * @param {string} event.httpMethod - HTTP method (GET, POST, etc.)
 * @param {string} event.body - Request body as string
 * @param {Object} context - Netlify context object
 * @param {Object} context.clientContext - Client context information
 * @param {Object} context.clientContext.user - User information
 * @param {string} context.clientContext.user.sub - User ID
 * @returns {Promise<Object>} Netlify function response
 */
exports.handler = async (event, context) => {
  // Handle CORS preflight requests
  if (event.httpMethod === 'OPTIONS') {
    console.log('Handling CORS preflight request');
    return handleCorsPreflight();
  }

  // Validate the incoming request
  const validationError = validateRequest(event);
  if (validationError) {
    console.log('Request validation failed:', validationError.body);
    return validationError;
  }

  try {
    // Parse request body
    const { message, conversationHistory = [] } = JSON.parse(event.body);
    const userId = context.clientContext?.user?.sub || 'anonymous';

    // Call the RAG API server
    const ragData = await callRagApi(message, conversationHistory, userId);

    // Handle lead creation if applicable
    const finalData = await handleLeadCreation(ragData, message);

    // Return successful response
    return createResponse(200, finalData);

  } catch (error) {    
    return createResponse(500, { 
      error: 'Internal server error',
      message: 'Sorry, I encountered an error. Please try again.',
      timestamp: new Date().toISOString(),
    });
  }
};