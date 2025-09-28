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

// Import HTTP client utilities
const { sendRagChatMessage, callNetlifyFunction } = require('./utils/index.cjs');

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
  console.log(`Calling RAG API with message: ${message}`);
  console.log(`RAG_API_URL: ${process.env.RAG_API_URL}`);
  
  try {
    // Use centralized HTTP client
    const result = await sendRagChatMessage(message, conversationHistory);
    
    if (result.success) {
      console.log('RAG API call successful:', result.data);
      return result.data;
    } else {
      console.error('RAG API call failed:', result.error);
      throw new Error(`RAG API error: ${result.error?.message || 'Unknown error'}`);
    }
  } catch (error) {
    console.error('RAG API call failed:', error.message);
    console.error('Full error:', error);
    throw error;
  }
};

/**
 * Transforms RAG API structured info to match HubSpot service expectations
 * @param {Object} structuredInfo - Raw structured info from RAG API
 * @param {string} originalMessage - Original user message
 * @returns {Object} Transformed lead data for HubSpot
 */
const transformLeadData = (structuredInfo, originalMessage) => {
  // Extract numeric value from budget range (e.g., "$5k" -> "5000")
  const extractBudgetAmount = (budgetRange) => {
    if (!budgetRange) return '0';
    const match = budgetRange.match(/\$?(\d+(?:\.\d+)?)([kK]?)/);
    if (match) {
      const value = parseFloat(match[1]);
      const multiplier = match[2].toLowerCase() === 'k' ? 1000 : 1;
      return (value * multiplier).toString();
    }
    return '0';
  };

  // Convert timeline to estimated delivery date
  const getEstimatedDeliveryDate = (timeline) => {
    if (!timeline) return new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
    
    const now = new Date();
    if (timeline.toLowerCase().includes('urgent') || timeline.toLowerCase().includes('asap')) {
      return new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString(); // 1 week
    } else if (timeline.toLowerCase().includes('month')) {
      return new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString(); // 1 month
    } else if (timeline.toLowerCase().includes('quarter')) {
      return new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000).toISOString(); // 3 months
    }
    return new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString(); // Default 1 month
  };

  return {
    // Contact fields (matching buildContactPayload)
    email: structuredInfo.email,
    first_name: structuredInfo.first_name,
    last_name: structuredInfo.last_name,
    phone: structuredInfo.phone,
    company: structuredInfo.company,
    website: structuredInfo.website,
    service_requested: structuredInfo.service_requested,
    conversation_keywords: structuredInfo.conversation_keywords,
    
    // Deal fields (matching buildDealPayload)
    deal_name: structuredInfo.service_requested ? `${structuredInfo.service_requested} Project` : 'New Lead Project',
    budget_amount: extractBudgetAmount(structuredInfo.budget_range),
    budget_range: structuredInfo.budget_range,
    estimated_delivery_date: getEstimatedDeliveryDate(structuredInfo.timeline),
    timeline: structuredInfo.timeline,
    
    // Ticket fields (matching buildTicketPayload)
    project_description: structuredInfo.project_description || originalMessage,
    description: structuredInfo.project_description || originalMessage,
    priority_level: 'HIGH',
    assigned_team: 'Sales Team',
    issue_type: 'Lead Follow-up',
    
    // Additional metadata
    originalMessage,
    timestamp: new Date().toISOString(),
  };
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
    console.log('No structured lead information available, skipping lead creation');
    return ragData;
  }

  try {
    console.log('Attempting to create lead with structured info:', ragData.structuredInfo);
    
    // Transform the data to match HubSpot service expectations
    const transformedLeadData = transformLeadData(ragData.structuredInfo, originalMessage);
    console.log('Transformed lead data for HubSpot:', transformedLeadData);
    
    // Use centralized HTTP client to call send-lead function
    const leadResult = await callNetlifyFunction('send-lead', transformedLeadData);
    
    if (leadResult.success) {
      console.log('Lead created successfully');
      ragData.leadCreated = true;
    } else {
      console.warn('Lead creation failed:', leadResult.error);
      ragData.leadCreated = false;
      ragData.leadError = leadResult.error?.message || 'Lead creation failed';
    }
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
  console.log('Chat Jarvis function invoked:', {
    method: event.httpMethod,
    hasBody: !!event.body,
    userAgent: event.headers?.['user-agent'],
  });

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
    
    console.log('Processing chat request:', {
      messageLength: message.length,
      conversationHistoryLength: conversationHistory.length,
      userId,
    });
    console.log('Environment check:', {
      RAG_API_URL: process.env.RAG_API_URL,
      NODE_ENV: process.env.NODE_ENV,
    });

    // Call the RAG API server
    const ragData = await callRagApi(message, conversationHistory, userId);
    console.log('RAG API response received:', {
      hasResponse: !!ragData.response,
      hasStructuredInfo: !!ragData.structuredInfo,
      hasHubspotLead: !!ragData.hubspotLead,
    });

    // Handle lead creation if applicable
    const finalData = await handleLeadCreation(ragData, message);

    // Return successful response
    return createResponse(200, finalData);

  } catch (error) {
    console.error('Chat Jarvis error:', {
      message: error.message,
      stack: error.stack,
      name: error.name,
    });
    
    return createResponse(500, { 
      error: 'Internal server error',
      message: 'Sorry, I encountered an error. Please try again.',
      timestamp: new Date().toISOString(),
    });
  }
};