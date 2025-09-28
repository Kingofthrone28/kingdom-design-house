/**
 * HTTP Client Helper Functions
 * Centralized HTTP request handling for axios and fetch
 */

import axios from 'axios';

/**
 * Axios HTTP Client Helper
 * @param {Object} config - Request configuration
 * @param {string} config.url - Request URL
 * @param {string} config.method - HTTP method (GET, POST, PUT, DELETE)
 * @param {Object} config.headers - Request headers
 * @param {Object} config.data - Request body data
 * @param {Object} config.params - URL parameters
 * @param {number} config.timeout - Request timeout in ms
 * @returns {Promise<Object>} Response data
 */
export const axiosRequest = async ({
  url,
  method = 'GET',
  headers = {},
  data = null,
  params = null,
  timeout = 10000
}) => {
  try {
    const config = {
      url,
      method: method.toUpperCase(),
      headers: {
        'Content-Type': 'application/json',
        ...headers
      },
      timeout
    };

    if (data) config.data = data;
    if (params) config.params = params;

    const response = await axios(config);
    return {
      success: true,
      data: response.data,
      status: response.status,
      headers: response.headers
    };
  } catch (error) {
    console.error('Axios request failed:', error.message);
    return {
      success: false,
      error: error.response?.data || error.message,
      status: error.response?.status || 500,
      headers: error.response?.headers || {}
    };
  }
};

/**
 * Fetch HTTP Client Helper
 * @param {Object} config - Request configuration
 * @param {string} config.url - Request URL
 * @param {string} config.method - HTTP method (GET, POST, PUT, DELETE)
 * @param {Object} config.headers - Request headers
 * @param {Object} config.body - Request body data
 * @param {number} config.timeout - Request timeout in ms
 * @returns {Promise<Object>} Response data
 */
export const fetchRequest = async ({
  url,
  method = 'GET',
  headers = {},
  body = null,
  timeout = 10000
}) => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    const config = {
      method: method.toUpperCase(),
      headers: {
        'Content-Type': 'application/json',
        ...headers
      },
      signal: controller.signal
    };

    if (body) {
      config.body = typeof body === 'string' ? body : JSON.stringify(body);
    }

    const response = await fetch(url, config);
    clearTimeout(timeoutId);

    const data = await response.json();

    return {
      success: response.ok,
      data,
      status: response.status,
      headers: Object.fromEntries(response.headers.entries())
    };
  } catch (error) {
    console.error('Fetch request failed:', error.message);
    return {
      success: false,
      error: error.message,
      status: 500,
      headers: {}
    };
  }
};

/**
 * Universal HTTP Client (auto-detects environment)
 * @param {Object} config - Request configuration
 * @returns {Promise<Object>} Response data
 */
export const httpRequest = async (config) => {
  // Use axios for Node.js environments (RAG API, Netlify functions)
  if (typeof window === 'undefined') {
    return await axiosRequest(config);
  }
  
  // Use fetch for browser environments (Frontend)
  return await fetchRequest(config);
};

/**
 * Pre-configured HTTP clients for specific services
 */
export const httpClients = {
  // HubSpot API client
  hubspot: (config) => axiosRequest({
    ...config,
    headers: {
      'Authorization': `Bearer ${process.env.HUBSPOT_ACCESS_TOKEN}`,
      ...config.headers
    }
  }),

  // RAG API client
  ragApi: (config) => fetchRequest({
    ...config,
    headers: {
      'Content-Type': 'application/json',
      ...config.headers
    }
  }),

  // Netlify Functions client
  netlify: (config) => fetchRequest({
    ...config,
    headers: {
      'Content-Type': 'application/json',
      ...config.headers
    }
  })
};

/**
 * Request builder helpers
 */
export const requestBuilders = {
  // Build HubSpot contact request
  hubspotContact: (contactData) => ({
    url: `${process.env.HUBSPOT_BASE_URL}/crm/v3/objects/contacts`,
    method: 'POST',
    data: contactData
  }),

  // Build HubSpot deal request
  hubspotDeal: (dealData) => ({
    url: `${process.env.HUBSPOT_BASE_URL}/crm/v3/objects/deals`,
    method: 'POST',
    data: dealData
  }),

  // Build HubSpot ticket request
  hubspotTicket: (ticketData) => ({
    url: `${process.env.HUBSPOT_BASE_URL}/crm/v3/objects/tickets`,
    method: 'POST',
    data: ticketData
  }),

  // Build RAG API chat request
  ragChat: (message, conversationHistory = []) => ({
    url: `${process.env.RAG_API_URL}/api/chat`,
    method: 'POST',
    body: {
      query: message,
      conversationHistory
    }
  }),

  // Build Netlify function request
  netlifyFunction: (functionName, data) => ({
    url: `/.netlify/functions/${functionName}`,
    method: 'POST',
    body: data
  })
};