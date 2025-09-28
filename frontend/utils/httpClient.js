/**
 * Browser-compatible HTTP client for frontend
 * Uses fetch API instead of axios for browser compatibility
 */

const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};

const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 1000; // 1 second

/**
 * Generic HTTP client for making requests in the browser.
 * Uses fetch API with retry logic and exponential backoff.
 * @param {string} url - The URL to make the request to.
 * @param {object} options - Request options (method, headers, body, etc.).
 * @param {number} retries - Current retry count (internal).
 * @returns {Promise<object>} - The response data.
 */
async function httpClient(url, options = {}, retries = 0) {
  const { method = 'GET', headers = {}, body, ...rest } = options;
  const mergedHeaders = { ...DEFAULT_HEADERS, ...headers };

  try {
    const fetchOptions = {
      method,
      headers: mergedHeaders,
      body: body ? JSON.stringify(body) : undefined,
      ...rest,
    };

    const response = await fetch(url, fetchOptions);
    
    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({ message: response.statusText }));
      throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorBody.message || 'Unknown error'}`);
    }

    const data = await response.json();
    return { success: true, data, status: response.status };
  } catch (error) {
    console.error(`HTTP request failed for ${url} (${method}):`, error.message);

    if (retries < MAX_RETRIES && (error.message.includes('429') || error.message.includes('RateLimit'))) {
      const delay = RETRY_DELAY_MS * Math.pow(2, retries);
      console.log(`Retrying in ${delay}ms... (Attempt ${retries + 1}/${MAX_RETRIES})`);
      await new Promise(resolve => setTimeout(resolve, delay));
      return httpClient(url, options, retries + 1);
    }

    return {
      success: false,
      error: { message: error.message },
      status: 500,
    };
  }
}

export default httpClient;