/**
 * RAG API Client for Netlify Functions
 * CommonJS version
 */

const httpClient = require('./httpClient.cjs');

const getRagApiUrl = () => {
  // For Netlify production, RAG_API_URL should be set in Netlify environment variables
  // For local development, it might be localhost:3001
  return process.env.RAG_API_URL || 'http://localhost:3001';
};

/**
 * Sends a chat message to the RAG API.
 * @param {string} query - User's message.
 * @param {Array<object>} conversationHistory - Previous messages.
 * @returns {Promise<object>} RAG API response.
 */
const sendRagChatMessage = async (query, conversationHistory = []) => {
  const url = `${getRagApiUrl()}/api/chat`;
  const payload = { query, conversationHistory };
  return await httpClient(url, {
    method: 'POST',
    body: payload,
  });
};

module.exports = {
  sendRagChatMessage,
};