/**
 * RAG API Client for frontend
 * Browser-compatible version using fetch
 */

import httpClient from './httpClient.js';

const getRagApiUrl = () => {
  const { hostname } = window.location;
  
  // Direct pattern matching for O(1) lookups
  const endpointMap = new Map([
    // Local development patterns
    ['localhost', 'http://localhost:3001'],
    ['127.0.0.1', 'http://localhost:3001'],
    
    // Netlify patterns - use preview domain for functions
    ['netlify.app', 'https://kingdom-design-house.netlify.app'],
    ['netlify.com', 'https://kingdom-design-house.netlify.app'],
    
    // Railway patterns
    ['railway.app', 'https://kingdom-design-house-production.up.railway.app']
  ]);
  
  // O(n) single pass through patterns
  for (const [pattern, baseUrl] of endpointMap) {
    if (hostname.includes(pattern)) {
      return baseUrl;
    }
  }
  
  // Default fallback
  return window.location.origin;
};

const getRagApiPath = () => {
  const { hostname } = window.location;
  
  // Netlify uses functions, others use direct API
  if (hostname.includes('netlify.app') || hostname.includes('netlify.com')) {
    return '/.netlify/functions/chat-jarvis';
  }
  
  return '/api/chat';
};

/**
 * Sends a chat message to the RAG API.
 * @param {string} message - User's message.
 * @param {Array<object>} conversationHistory - Previous messages.
 * @returns {Promise<object>} RAG API response.
 */
export const sendRagChatMessage = async (message, conversationHistory = []) => {
  const baseUrl = getRagApiUrl();
  const path = getRagApiPath();
  const url = `${baseUrl}${path}`;
  
  // Debug logging for troubleshooting
  console.log('RAG API Debug:', {
    hostname: window.location.hostname,
    baseUrl,
    path,
    fullUrl: url
  });
  
  const payload = { message, conversationHistory };
  return await httpClient(url, {
    method: 'POST',
    body: payload,
  });
};