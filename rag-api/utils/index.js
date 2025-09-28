/**
 * HTTP Client Utilities
 * Centralized HTTP request helpers for the Kingdom Design House project
 */

// Core HTTP clients
export {
  axiosRequest,
  fetchRequest,
  httpRequest,
  httpClients,
  requestBuilders
} from './httpClient.js';

// Service-specific clients
export {
  createHubSpotContact,
  createHubSpotDeal,
  createHubSpotTicket,
  getHubSpotContact,
  updateHubSpotContact,
  searchHubSpotContacts,
  createHubSpotLead
} from './hubspotClient.js';

export {
  sendRagChatMessage,
  testRagApiConnection,
  getRagApiHealth,
  sendRagChatMessageWithRetry
} from './ragApiClient.js';

export {
  callNetlifyFunction,
  callChatJarvis,
  callSendLead,
  callNetlifyFunctionWithRetry
} from './netlifyClient.js';

// Convenience exports for common use cases
export const httpUtils = {
  // Core HTTP methods
  get: (url, options = {}) => httpRequest({ url, method: 'GET', ...options }),
  post: (url, data, options = {}) => httpRequest({ url, method: 'POST', data, ...options }),
  put: (url, data, options = {}) => httpRequest({ url, method: 'PUT', data, ...options }),
  delete: (url, options = {}) => httpRequest({ url, method: 'DELETE', ...options }),
  
  // Service shortcuts
  hubspot: {
    createContact: createHubSpotContact,
    createDeal: createHubSpotDeal,
    createTicket: createHubSpotTicket,
    createLead: createHubSpotLead
  },
  
  rag: {
    sendMessage: sendRagChatMessage,
    testConnection: testRagApiConnection,
    getHealth: getRagApiHealth
  },
  
  netlify: {
    callFunction: callNetlifyFunction,
    chatJarvis: callChatJarvis,
    sendLead: callSendLead
  }
};