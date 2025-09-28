/**
 * Netlify Client for Netlify Functions
 * CommonJS version
 */

const httpClient = require('./httpClient.cjs');

const getNetlifyFunctionUrl = (functionName) => {
  // process.env.URL is provided by Netlify in production
  const baseUrl = process.env.URL || 'http://localhost:8888';
  return `${baseUrl}/.netlify/functions/${functionName}`;
};

/**
 * Calls a Netlify function.
 * @param {string} functionName - Name of the Netlify function.
 * @param {object} payload - Data to send to the function.
 * @returns {Promise<object>} Netlify function response.
 */
const callNetlifyFunction = async (functionName, payload) => {
  const url = getNetlifyFunctionUrl(functionName);
  return await httpClient(url, {
    method: 'POST',
    body: payload,
  });
};

module.exports = {
  callNetlifyFunction,
};