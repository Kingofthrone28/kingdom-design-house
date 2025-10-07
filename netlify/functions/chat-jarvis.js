/**
 * @fileoverview Netlify Function: Chat Jarvis Proxy
 * 
 * This function acts as a critical proxy between the frontend and the RAG API server.
 * It handles CORS, request validation, and optional lead creation in the Kingdom Design House
 * AI chat system architecture.
 * 
 * SYSTEM INTEGRATION:
 * ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
 * │   Frontend      │    │   Netlify       │    │   RAG API       │
 * │   (Next.js)     │───▶│   Functions     │───▶│   (Railway)     │
 * │   Chat UI       │    │   This Module   │    │   AI Processing │
 * └─────────────────┘    └─────────────────┘    └─────────────────┘
 *                                 │
 *                                 ▼
 *                        ┌─────────────────┐
 *                        │   HubSpot CRM   │
 *                        │   Lead Storage  │
 *                        └─────────────────┘
 * 
 * WORKFLOW:
 * 1. Receives chat requests from frontend with CORS handling
 * 2. Validates request format and required fields
 * 3. Proxies request to RAG API server for AI processing
 * 4. Transforms RAG response data for HubSpot compatibility
 * 5. Optionally creates leads in HubSpot CRM
 * 6. Returns enriched response to frontend
 * 
 * FALLBACK MECHANISMS:
 * - RAG API unavailable: Returns template response with contact info
 * - Lead creation fails: Continues chat functionality without CRM integration
 * - Invalid requests: Returns structured error responses
 * 
 * @author Kingdom Design House Development Team
 * @version 1.0.0
 * @since 2024
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
  // Extract and transform data using helper functions
  const transformedData = {
    // Direct field mappings
    ...mapDirectFields(structuredInfo),
    
    // Computed field mappings
    ...mapComputedFields(structuredInfo, originalMessage)
  };

  return transformedData;
};

/**
 * Maps direct fields from structured info to HubSpot format
 * @param {Object} structuredInfo - Raw structured information
 * @returns {Object} Direct field mappings
 */
const mapDirectFields = (structuredInfo) => {
  const directFields = [
    'email', 'first_name', 'last_name', 'phone', 'company', 
    'website', 'service_requested', 'conversation_keywords', 
    'budget_range', 'timeline'
  ];
  
  return directFields.reduce((mapping, field) => {
    mapping[field] = structuredInfo[field];
    return mapping;
  }, {});
};

/**
 * Maps computed fields that require transformation or calculation
 * @param {Object} structuredInfo - Raw structured information
 * @param {string} originalMessage - Original user message
 * @returns {Object} Computed field mappings
 */
const mapComputedFields = (structuredInfo, originalMessage) => {
  return {
    deal_name: generateDealName(structuredInfo.service_requested),
    budget_amount: extractBudgetAmount(structuredInfo.budget_range),
    estimated_delivery_date: calculateDeliveryDate(structuredInfo.timeline),
    project_description: structuredInfo.project_description || originalMessage,
    description: structuredInfo.project_description || originalMessage,
    priority_level: 'HIGH',
    assigned_team: 'KDH Sales Team',
    issue_type: 'Lead Follow-up',
    originalMessage,
    timestamp: new Date().toISOString()
  };
};

/**
 * Generates a deal name based on service requested
 * @param {string} serviceRequested - The requested service
 * @returns {string} Generated deal name
 */
const generateDealName = (serviceRequested) => {
  return serviceRequested ? `${serviceRequested} Project` : 'New Lead Project';
};

/**
 * Extracts and normalizes budget amount from budget range text
 * @param {string} budgetRange - Budget range text (e.g., "$5k", "10K", "5000")
 * @returns {string} Normalized budget amount as string
 */
const extractBudgetAmount = (budgetRange) => {
  if (!budgetRange) return '0';
  
  const budgetPattern = /\$?(\d+(?:\.\d+)?)([kK]?)/;
  const match = budgetRange.match(budgetPattern);
  
  if (!match) return '0';
  
  const amount = parseFloat(match[1]);
  const multiplier = match[2].toLowerCase() === 'k' ? 1000 : 1;
  
  return (amount * multiplier).toString();
};

/**
 * Calculates delivery date based on timeline keywords
 * @param {string} timeline - Project timeline text
 * @returns {string} ISO string of calculated delivery date
 */
const calculateDeliveryDate = (timeline) => {
  const timelineMap = {
    'urgent': 7,
    'asap': 7,
    'month': 30,
    'quarter': 90
  };
  
  const defaultDays = 30;
  const timelineLower = timeline?.toLowerCase() || '';
  
  const matchingKeyword = Object.entries(timelineMap)
    .find(([keyword]) => timelineLower.includes(keyword));
  
  const days = matchingKeyword ? matchingKeyword[1] : defaultDays;
  const deliveryDate = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
  
  return deliveryDate.toISOString();
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
  // Early return for invalid input
  if (!isValidStructuredInfo(structuredInfo)) {
    return false;
  }

  // Extract and validate key information
  const leadCriteria = extractLeadCriteria(structuredInfo);
  
  // Apply business logic for lead qualification
  const shouldCreate = evaluateLeadCreationCriteria(leadCriteria);
  
  // Log decision for debugging
  logLeadCreationDecision(leadCriteria, shouldCreate);

  return shouldCreate;
};

/**
 * Validates that structured info is a valid object with content
 * @param {*} structuredInfo - The structured info to validate
 * @returns {boolean} True if valid, false otherwise
 */
const isValidStructuredInfo = (structuredInfo) => {
  if (!structuredInfo || typeof structuredInfo !== 'object') {
    console.log('No structured info or invalid format');
    return false;
  }
  return true;
};

/**
 * Extracts and validates key lead qualification criteria
 * @param {Object} structuredInfo - Raw structured information
 * @returns {Object} Validated lead criteria
 */
const extractLeadCriteria = (structuredInfo) => {
  return {
    hasEmail: hasValidField(structuredInfo.email),
    hasServiceInterest: hasValidField(structuredInfo.service_requested),
    hasProjectDescription: hasValidField(structuredInfo.project_description),
    hasContactInfo: hasAnyContactInfo(structuredInfo),
    hasLeadIndicators: hasAnyLeadIndicators(structuredInfo)
  };
};

/**
 * Checks if a field has valid content (not empty or whitespace)
 * @param {string} field - Field value to check
 * @returns {boolean} True if field has valid content
 */
const hasValidField = (field) => {
  return field && field.trim() !== '';
};

/**
 * Checks if any contact information is available
 * @param {Object} structuredInfo - Structured information object
 * @returns {boolean} True if any contact info is present
 */
const hasAnyContactInfo = (structuredInfo) => {
  return hasValidField(structuredInfo.first_name) || 
         hasValidField(structuredInfo.last_name) || 
         hasValidField(structuredInfo.company);
};

/**
 * Checks if any lead qualification indicators are present
 * @param {Object} structuredInfo - Structured information object
 * @returns {boolean} True if any lead indicators are present
 */
const hasAnyLeadIndicators = (structuredInfo) => {
  const leadIndicatorFields = [
    'budget_range', 'timeline', 'company', 'phone', 
    'first_name', 'last_name'
  ];
  
  return leadIndicatorFields.some(field => hasValidField(structuredInfo[field]));
};

/**
 * Evaluates lead creation criteria using business logic
 * @param {Object} criteria - Lead qualification criteria
 * @returns {boolean} True if lead should be created
 */
const evaluateLeadCreationCriteria = (criteria) => {
  const { hasEmail, hasServiceInterest, hasProjectDescription, hasContactInfo, hasLeadIndicators } = criteria;
  
  // Primary qualification: Email + (Service Interest OR Project Description OR Lead Indicators)
  const primaryQualification = hasEmail && (hasServiceInterest || hasProjectDescription || hasLeadIndicators);
  
  // Secondary qualification: Service Interest + Contact Information
  const secondaryQualification = hasServiceInterest && hasContactInfo;
  
  return primaryQualification || secondaryQualification;
};

/**
 * Logs lead creation decision for debugging and monitoring
 * @param {Object} criteria - Lead qualification criteria
 * @param {boolean} shouldCreate - Final decision
 */
const logLeadCreationDecision = (criteria, shouldCreate) => {
  console.log('Lead creation decision:', {
    ...criteria,
    shouldCreate,
    timestamp: new Date().toISOString()
  });
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