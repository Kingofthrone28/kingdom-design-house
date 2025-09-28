/**
 * RAG API Client Helper
 * Centralized RAG API calls
 */

import { httpClients, requestBuilders } from './httpClient.js';

/**
 * RAG API Configuration
 */
const RAG_API_CONFIG = {
  baseUrl: process.env.RAG_API_URL || 'http://localhost:3001',
  timeout: 30000 // 30 seconds for AI processing
};

/**
 * Send chat message to RAG API
 * @param {string} message - User message
 * @param {Array} conversationHistory - Previous conversation
 * @param {Object} options - Additional options
 * @returns {Promise<Object>} Response data
 */
export const sendRagChatMessage = async (message, conversationHistory = [], options = {}) => {
  const request = requestBuilders.ragChat(message, conversationHistory);
  
  return await httpClients.ragApi({
    ...request,
    url: `${RAG_API_CONFIG.baseUrl}/api/chat`,
    timeout: RAG_API_CONFIG.timeout,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    }
  });
};

/**
 * Test RAG API connection
 * @returns {Promise<Object>} Health check response
 */
export const testRagApiConnection = async () => {
  return await httpClients.ragApi({
    url: `${RAG_API_CONFIG.baseUrl}/`,
    method: 'GET',
    timeout: 5000
  });
};

/**
 * Get RAG API health status
 * @returns {Promise<Object>} Health status
 */
export const getRagApiHealth = async () => {
  return await httpClients.ragApi({
    url: `${RAG_API_CONFIG.baseUrl}/health`,
    method: 'GET',
    timeout: 5000
  });
};

/**
 * RAG API with retry logic
 * @param {string} message - User message
 * @param {Array} conversationHistory - Previous conversation
 * @param {number} maxRetries - Maximum retry attempts
 * @returns {Promise<Object>} Response data
 */
export const sendRagChatMessageWithRetry = async (message, conversationHistory = [], maxRetries = 3) => {
  let lastError;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await sendRagChatMessage(message, conversationHistory);
      
      if (response.success) {
        return response;
      }
      
      lastError = response.error;
      
      // Don't retry on client errors (4xx)
      if (response.status >= 400 && response.status < 500) {
        break;
      }
      
      // Wait before retry (exponential backoff)
      if (attempt < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
      }
      
    } catch (error) {
      lastError = error.message;
      
      if (attempt < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
      }
    }
  }
  
  return {
    success: false,
    error: `Failed after ${maxRetries} attempts: ${lastError}`,
    status: 500
  };
};