/**
 * Netlify Functions Client Helper
 * Centralized Netlify Functions calls
 */

import { httpClients, requestBuilders } from './httpClient.js';

/**
 * Netlify Functions Configuration
 */
const NETLIFY_CONFIG = {
  baseUrl: process.env.URL || 'http://localhost:8888',
  timeout: 15000 // 15 seconds for serverless functions
};

/**
 * Call Netlify Function
 * @param {string} functionName - Function name (without .netlify/functions/)
 * @param {Object} data - Request data
 * @param {Object} options - Additional options
 * @returns {Promise<Object>} Response data
 */
export const callNetlifyFunction = async (functionName, data = {}, options = {}) => {
  const request = requestBuilders.netlifyFunction(functionName, data);
  
  return await httpClients.netlify({
    ...request,
    url: `${NETLIFY_CONFIG.baseUrl}/.netlify/functions/${functionName}`,
    timeout: NETLIFY_CONFIG.timeout,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    }
  });
};

/**
 * Call Chat Jarvis Function
 * @param {Object} chatData - Chat data
 * @returns {Promise<Object>} Response data
 */
export const callChatJarvis = async (chatData) => {
  return await callNetlifyFunction('chat-jarvis', chatData);
};

/**
 * Call Send Lead Function
 * @param {Object} leadData - Lead data
 * @returns {Promise<Object>} Response data
 */
export const callSendLead = async (leadData) => {
  return await callNetlifyFunction('send-lead', leadData);
};

/**
 * Netlify Function with retry logic
 * @param {string} functionName - Function name
 * @param {Object} data - Request data
 * @param {number} maxRetries - Maximum retry attempts
 * @returns {Promise<Object>} Response data
 */
export const callNetlifyFunctionWithRetry = async (functionName, data = {}, maxRetries = 2) => {
  let lastError;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await callNetlifyFunction(functionName, data);
      
      if (response.success) {
        return response;
      }
      
      lastError = response.error;
      
      // Don't retry on client errors (4xx)
      if (response.status >= 400 && response.status < 500) {
        break;
      }
      
      // Wait before retry
      if (attempt < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
      }
      
    } catch (error) {
      lastError = error.message;
      
      if (attempt < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
      }
    }
  }
  
  return {
    success: false,
    error: `Netlify function failed after ${maxRetries} attempts: ${lastError}`,
    status: 500
  };
};