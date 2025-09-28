/**
 * Examples of how to refactor existing HTTP calls using the new helper functions
 */

import { 
  httpUtils, 
  createHubSpotContact, 
  sendRagChatMessage, 
  callChatJarvis 
} from '../index.js';

// ===========================================
// BEFORE: Original HubSpot Contact Creation
// ===========================================
/*
const createContact = async (contactData) => {
  try {
    const response = await axios.post(
      `${hubspotClient.baseUrl}/crm/v3/objects/contacts`,
      buildContactPayload(contactData),
      { headers: buildRequestHeaders() }
    );
    console.log(`Contact created successfully: ${response.data.id}`);
    return response.data;
  } catch (error) {
    console.error('Error creating contact:', error.response?.data || error.message);
    throw error;
  }
};
*/

// ===========================================
// AFTER: Using Helper Function
// ===========================================
const createContactRefactored = async (contactData) => {
  const response = await createHubSpotContact(contactData);
  
  if (response.success) {
    console.log(`Contact created successfully: ${response.data.id}`);
    return response.data;
  } else {
    console.error('Error creating contact:', response.error);
    throw new Error(response.error);
  }
};

// ===========================================
// BEFORE: Original ChatInterface Fetch
// ===========================================
/*
const response = await fetch(apiEndpoint, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    query: inputMessage.trim(),
    conversationHistory: messages
  }),
});
*/

// ===========================================
// AFTER: Using Helper Function
// ===========================================
const sendChatMessageRefactored = async (message, conversationHistory) => {
  const response = await sendRagChatMessage(message, conversationHistory);
  
  if (response.success) {
    return response.data;
  } else {
    throw new Error(response.error);
  }
};

// ===========================================
// BEFORE: Original Netlify Function Call
// ===========================================
/*
const ragResponse = await fetch(`${ragApiUrl}/api/chat`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    query: message,
    conversationHistory,
    userId,
  }),
});
*/

// ===========================================
// AFTER: Using Helper Function
// ===========================================
const callRagApiRefactored = async (message, conversationHistory, userId) => {
  const response = await callChatJarvis({
    query: message,
    conversationHistory,
    userId
  });
  
  if (response.success) {
    return response.data;
  } else {
    throw new Error(response.error);
  }
};

// ===========================================
// BEFORE: Original HubSpot Lead Creation
// ===========================================
/*
// Multiple separate axios calls for contact, deal, ticket
const contactResponse = await axios.post(contactUrl, contactData, headers);
const dealResponse = await axios.post(dealUrl, dealData, headers);
const ticketResponse = await axios.post(ticketUrl, ticketData, headers);
*/

// ===========================================
// AFTER: Using Helper Function
// ===========================================
const createLeadRefactored = async (leadData) => {
  const response = await httpUtils.hubspot.createLead({
    contact: leadData.contact,
    deal: leadData.deal,
    ticket: leadData.ticket
  });
  
  if (response.success) {
    console.log('Lead created successfully:', {
      contactId: response.contact?.id,
      dealId: response.deal?.id,
      ticketId: response.ticket?.id
    });
    return response;
  } else {
    console.error('Lead creation failed:', response.errors);
    throw new Error(response.errors.join(', '));
  }
};

// ===========================================
// Generic HTTP Request Examples
// ===========================================

// Simple GET request
const getData = async (url) => {
  const response = await httpUtils.get(url);
  return response.success ? response.data : null;
};

// POST with data
const postData = async (url, data) => {
  const response = await httpUtils.post(url, data);
  return response.success ? response.data : null;
};

// Request with custom headers
const customRequest = async (url, data) => {
  const response = await httpUtils.post(url, data, {
    headers: {
      'Authorization': 'Bearer token',
      'Custom-Header': 'value'
    },
    timeout: 5000
  });
  return response;
};

export {
  createContactRefactored,
  sendChatMessageRefactored,
  callRagApiRefactored,
  createLeadRefactored,
  getData,
  postData,
  customRequest
};