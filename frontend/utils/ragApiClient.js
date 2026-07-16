/**
 * RAG API Client for frontend
 * Browser-compatible version using fetch
 */

import httpClient from './httpClient.js';

/**
 * Sends a chat message to the RAG API.
 * @param {string} message - User's message.
 * @param {Array<object>} conversationHistory - Previous messages.
 * @param {object} botProtectionFields - Optional bot protection fields (honeypot, timing).
 * @returns {Promise<object>} RAG API response.
 */
export const sendRagChatMessage = async (message, conversationHistory = [], botProtectionFields = {}) => {
  const payload = { message, conversationHistory, ...botProtectionFields };
  
  return await httpClient('/api/chat/', {
    method: 'POST',
    body: payload,
  });
};
