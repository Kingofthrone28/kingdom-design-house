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
const REQUEST_TIMEOUT_MS = 30000; // 30 seconds
const CONNECTION_TIMEOUT_MS = 10000; // 10 seconds for initial connection

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

    // Create timeout controller
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
    
    // Add abort signal to fetch options
    fetchOptions.signal = controller.signal;

    const response = await fetch(url, fetchOptions);
    
    // Clear timeout on successful response
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({ message: response.statusText }));
      throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorBody.message || 'Unknown error'}`);
    }

    const data = await response.json();
    
    // Handle direct response format (Netlify functions return data directly)
    if (data.response || data.structuredInfo !== undefined) {
      return { success: true, data, status: response.status };
    }
    
    // Handle wrapped response format (some APIs wrap in success/data)
    if (data.success !== undefined) {
      return data;
    }
    
    // Default: assume direct response
    return { success: true, data, status: response.status };
  } catch (error) {
    console.error(`HTTP request failed for ${url} (${method}):`, error.message);

    // Handle timeout and network errors with retry logic
    const isRetryableError = 
      error.name === 'AbortError' || // Timeout
      error.message.includes('Failed to fetch') || // Network error
      error.message.includes('429') || // Rate limit
      error.message.includes('RateLimit') ||
      error.message.includes('timeout') ||
      error.message.includes('NetworkError');

    if (retries < MAX_RETRIES && isRetryableError) {
      const delay = RETRY_DELAY_MS * Math.pow(2, retries);
      console.log(`Retrying in ${delay}ms... (Attempt ${retries + 1}/${MAX_RETRIES})`);
      await new Promise(resolve => setTimeout(resolve, delay));
      return httpClient(url, options, retries + 1);
    }

    // Provide user-friendly error messages
    let userMessage = 'Request failed. Please try again.';
    if (error.name === 'AbortError') {
      userMessage = 'Request timed out. Please check your connection and try again.';
    } else if (error.message.includes('Failed to fetch')) {
      userMessage = 'Network error. Please check your internet connection.';
    }

    return {
      success: false,
      error: { 
        message: userMessage,
        originalError: error.message,
        isTimeout: error.name === 'AbortError',
        isNetworkError: error.message.includes('Failed to fetch')
      },
      status: 500,
    };
  }
}

export default httpClient;