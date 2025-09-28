/**
 * CommonJS HTTP Client for Netlify Functions
 * Server-side compatible version using axios
 */

const axios = require('axios');

const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};

const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 1000; // 1 second

/**
 * Generic HTTP client for making requests.
 * Uses axios with retry logic and exponential backoff.
 * @param {string} url - The URL to make the request to.
 * @param {object} options - Request options (method, headers, body, etc.).
 * @param {number} retries - Current retry count (internal).
 * @returns {Promise<object>} - The response data.
 */
async function httpClient(url, options = {}, retries = 0) {
  const { method = 'GET', headers = {}, body, ...rest } = options;
  const mergedHeaders = { ...DEFAULT_HEADERS, ...headers };

  try {
    const axiosOptions = {
      method,
      url,
      headers: mergedHeaders,
      data: body, // axios uses 'data' for body
      ...rest,
    };

    const response = await axios(axiosOptions);
    return { success: true, data: response.data, status: response.status };
  } catch (error) {
    console.error(`HTTP request failed for ${url} (${method}):`, error.message);

    if (retries < MAX_RETRIES && (error.response?.status === 429 || error.message.includes('RateLimit'))) {
      const delay = RETRY_DELAY_MS * Math.pow(2, retries);
      console.log(`Retrying in ${delay}ms... (Attempt ${retries + 1}/${MAX_RETRIES})`);
      await new Promise(resolve => setTimeout(resolve, delay));
      return httpClient(url, options, retries + 1);
    }

    return {
      success: false,
      error: error.response?.data || { message: error.message },
      status: error.response?.status || 500,
    };
  }
}

module.exports = httpClient;