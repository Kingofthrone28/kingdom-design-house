/**
 * @fileoverview Bot Protection Utilities
 * 
 * Provides multi-layered bot protection for chat interfaces:
 * - Rate limiting per session/IP
 * - Honeypot field validation
 * - Time-based validation (submission speed)
 * - Request pattern analysis
 * 
 * FEATURE FLAGS:
 * Enable these protections via environment variables when ready:
 * - ENABLE_RATE_LIMITING=true
 * - ENABLE_HONEYPOT=true
 * - ENABLE_TIME_VALIDATION=true
 * - ENABLE_PATTERN_DETECTION=true
 * 
 * DEFAULT: All protections are DISABLED until explicitly enabled
 * 
 * @author Kingdom Design House Development Team
 * @version 1.0.0
 */

/**
 * Feature flags for bot protection layers
 * Set these in Netlify environment variables to enable
 */
const FEATURE_FLAGS = {
  RATE_LIMITING: process.env.ENABLE_RATE_LIMITING === 'true',
  HONEYPOT: process.env.ENABLE_HONEYPOT === 'true',
  TIME_VALIDATION: process.env.ENABLE_TIME_VALIDATION === 'true',
  PATTERN_DETECTION: process.env.ENABLE_PATTERN_DETECTION === 'true',
};

/**
 * Rate limiting configuration
 */
const RATE_LIMITS = {
  MESSAGES_PER_MINUTE: parseInt(process.env.RATE_LIMIT_PER_MINUTE) || 5,
  MESSAGES_PER_HOUR: parseInt(process.env.RATE_LIMIT_PER_HOUR) || 30,
  MESSAGES_PER_DAY: parseInt(process.env.RATE_LIMIT_PER_DAY) || 100,
  COOLDOWN_SECONDS: parseInt(process.env.RATE_LIMIT_COOLDOWN) || 30,
};

/**
 * Time validation configuration
 */
const TIME_VALIDATION = {
  MIN_SECONDS_SINCE_PAGE_LOAD: parseInt(process.env.MIN_SECONDS_BEFORE_SUBMIT) || 2,
  MIN_SECONDS_BETWEEN_MESSAGES: parseInt(process.env.MIN_SECONDS_BETWEEN_MESSAGES) || 1,
};

/**
 * In-memory store for rate limiting
 * In production, consider using Redis or similar for distributed rate limiting
 */
const requestStore = new Map();

/**
 * Cleans up old entries from the request store
 * Call periodically to prevent memory leaks
 */
const cleanupRequestStore = () => {
  const now = Date.now();
  const ONE_DAY = 24 * 60 * 60 * 1000;
  
  for (const [key, data] of requestStore.entries()) {
    if (now - data.firstRequest > ONE_DAY) {
      requestStore.delete(key);
    }
  }
};

// Cleanup every hour
setInterval(cleanupRequestStore, 60 * 60 * 1000);

/**
 * Extracts client identifier from request
 * Uses a combination of IP and userId for tracking
 * 
 * @param {Object} event - Netlify event object
 * @param {string} userId - User identifier
 * @returns {string} Unique client identifier
 */
const getClientIdentifier = (event, userId) => {
  const ip = event.headers['x-forwarded-for'] || 
             event.headers['x-nf-client-connection-ip'] || 
             'unknown';
  return `${ip}_${userId}`;
};

/**
 * Layer 1: Rate Limiting Protection
 * Tracks requests per client and enforces limits
 * 
 * @param {Object} event - Netlify event object
 * @param {string} userId - User identifier
 * @returns {Object} { allowed: boolean, reason: string, retryAfter: number }
 */
const checkRateLimit = (event, userId) => {
  // If rate limiting is disabled, allow all requests
  if (!FEATURE_FLAGS.RATE_LIMITING) {
    return { allowed: true, reason: null, retryAfter: 0 };
  }

  const clientId = getClientIdentifier(event, userId);
  const now = Date.now();
  
  // Initialize tracking for new clients
  if (!requestStore.has(clientId)) {
    requestStore.set(clientId, {
      firstRequest: now,
      lastRequest: now,
      requestTimestamps: [now],
    });
    return { allowed: true, reason: null, retryAfter: 0 };
  }

  const clientData = requestStore.get(clientId);
  
  // Filter timestamps to relevant time windows
  const oneMinuteAgo = now - 60 * 1000;
  const oneHourAgo = now - 60 * 60 * 1000;
  const oneDayAgo = now - 24 * 60 * 60 * 1000;
  
  const recentTimestamps = clientData.requestTimestamps.filter(
    timestamp => timestamp > oneDayAgo
  );
  
  const lastMinute = recentTimestamps.filter(t => t > oneMinuteAgo).length;
  const lastHour = recentTimestamps.filter(t => t > oneHourAgo).length;
  const lastDay = recentTimestamps.length;
  
  // Check rate limits
  if (lastMinute >= RATE_LIMITS.MESSAGES_PER_MINUTE) {
    return {
      allowed: false,
      reason: 'Too many messages per minute',
      retryAfter: RATE_LIMITS.COOLDOWN_SECONDS,
    };
  }
  
  if (lastHour >= RATE_LIMITS.MESSAGES_PER_HOUR) {
    return {
      allowed: false,
      reason: 'Too many messages per hour',
      retryAfter: 300, // 5 minutes
    };
  }
  
  if (lastDay >= RATE_LIMITS.MESSAGES_PER_DAY) {
    return {
      allowed: false,
      reason: 'Daily message limit reached',
      retryAfter: 3600, // 1 hour
    };
  }
  
  // Update client data
  recentTimestamps.push(now);
  requestStore.set(clientId, {
    ...clientData,
    lastRequest: now,
    requestTimestamps: recentTimestamps,
  });
  
  return { allowed: true, reason: null, retryAfter: 0 };
};

/**
 * Layer 2: Honeypot Field Validation
 * Checks for hidden fields that should remain empty
 * Bots often auto-fill all form fields
 * 
 * @param {Object} requestBody - Parsed request body
 * @returns {Object} { isBot: boolean, reason: string }
 */
const checkHoneypot = (requestBody) => {
  // If honeypot is disabled, allow all requests
  if (!FEATURE_FLAGS.HONEYPOT) {
    return { isBot: false, reason: null };
  }

  // Check common honeypot field names
  const honeypotFields = ['website', 'bot_field', 'url', 'homepage'];
  
  for (const field of honeypotFields) {
    if (requestBody[field] && requestBody[field].trim() !== '') {
      console.warn('Honeypot triggered:', { field, value: requestBody[field] });
      return { 
        isBot: true, 
        reason: `Honeypot field "${field}" was filled` 
      };
    }
  }
  
  return { isBot: false, reason: null };
};

/**
 * Layer 3: Time-Based Validation
 * Detects suspiciously fast submissions
 * 
 * @param {Object} requestBody - Parsed request body
 * @param {string} userId - User identifier
 * @returns {Object} { suspicious: boolean, reason: string, confidence: number }
 */
const checkTimingPatterns = (requestBody, userId) => {
  // If time validation is disabled, allow all requests
  if (!FEATURE_FLAGS.TIME_VALIDATION) {
    return { suspicious: false, reason: null, confidence: 0 };
  }

  const now = Date.now();
  
  // Check time since page load (if provided)
  if (requestBody.pageLoadTime) {
    const timeSinceLoad = (now - requestBody.pageLoadTime) / 1000;
    if (timeSinceLoad < TIME_VALIDATION.MIN_SECONDS_SINCE_PAGE_LOAD) {
      return {
        suspicious: true,
        reason: 'Submitted too quickly after page load',
        confidence: 0.8,
      };
    }
  }
  
  // Check time between messages
  const clientData = requestStore.get(userId);
  if (clientData && clientData.lastRequest) {
    const timeSinceLastMessage = (now - clientData.lastRequest) / 1000;
    if (timeSinceLastMessage < TIME_VALIDATION.MIN_SECONDS_BETWEEN_MESSAGES) {
      return {
        suspicious: true,
        reason: 'Messages sent too rapidly',
        confidence: 0.7,
      };
    }
  }
  
  return { suspicious: false, reason: null, confidence: 0 };
};

/**
 * Layer 4: Pattern Detection
 * Analyzes message patterns for bot-like behavior
 * 
 * @param {string} message - Chat message content
 * @param {string} userId - User identifier
 * @returns {Object} { suspicious: boolean, reason: string, confidence: number }
 */
const checkMessagePatterns = (message, userId) => {
  // If pattern detection is disabled, allow all requests
  if (!FEATURE_FLAGS.PATTERN_DETECTION) {
    return { suspicious: false, reason: null, confidence: 0 };
  }

  const patterns = {
    // Common spam patterns
    hasExcessiveLinks: (msg) => (msg.match(/https?:\/\//g) || []).length > 2,
    hasRepeatedChars: (msg) => /(.)\1{10,}/.test(msg),
    isAllCaps: (msg) => msg.length > 20 && msg === msg.toUpperCase(),
    hasSpamKeywords: (msg) => /\b(viagra|casino|lottery|prize|winner|click here|buy now)\b/i.test(msg),
    isTooLong: (msg) => msg.length > 5000,
    isSuspiciouslyShort: (msg) => msg.trim().length < 2,
  };
  
  for (const [patternName, checkFn] of Object.entries(patterns)) {
    if (checkFn(message)) {
      return {
        suspicious: true,
        reason: `Suspicious pattern detected: ${patternName}`,
        confidence: 0.6,
      };
    }
  }
  
  return { suspicious: false, reason: null, confidence: 0 };
};

/**
 * Main bot protection check
 * Runs all enabled protection layers and returns comprehensive result
 * 
 * @param {Object} event - Netlify event object
 * @param {Object} requestBody - Parsed request body
 * @param {string} userId - User identifier
 * @returns {Object} Protection check result
 */
const checkBotProtection = (event, requestBody, userId) => {
  const results = {
    allowed: true,
    blocked: false,
    suspicious: false,
    reasons: [],
    actions: {
      allowMessage: true,
      allowLeadCreation: true,
      requireVerification: false,
    },
    metadata: {
      enabledLayers: [],
      detections: {},
    },
  };

  // Track which layers are enabled
  for (const [layer, enabled] of Object.entries(FEATURE_FLAGS)) {
    if (enabled) {
      results.metadata.enabledLayers.push(layer);
    }
  }

  // Layer 1: Rate Limiting
  const rateLimit = checkRateLimit(event, userId);
  results.metadata.detections.rateLimit = rateLimit;
  if (!rateLimit.allowed) {
    results.allowed = false;
    results.blocked = true;
    results.reasons.push(rateLimit.reason);
    results.actions.allowMessage = false;
    results.actions.allowLeadCreation = false;
    results.retryAfter = rateLimit.retryAfter;
    return results; // Hard block, don't continue
  }

  // Layer 2: Honeypot
  const honeypot = checkHoneypot(requestBody);
  results.metadata.detections.honeypot = honeypot;
  if (honeypot.isBot) {
    results.suspicious = true;
    results.reasons.push(honeypot.reason);
    results.actions.allowMessage = true; // Allow message to not reveal honeypot
    results.actions.allowLeadCreation = false; // Don't create lead
  }

  // Layer 3: Timing Patterns
  const timing = checkTimingPatterns(requestBody, userId);
  results.metadata.detections.timing = timing;
  if (timing.suspicious && timing.confidence > 0.7) {
    results.suspicious = true;
    results.reasons.push(timing.reason);
    results.actions.allowLeadCreation = false; // Don't create lead for suspicious timing
  }

  // Layer 4: Message Patterns
  const patterns = checkMessagePatterns(requestBody.message, userId);
  results.metadata.detections.patterns = patterns;
  if (patterns.suspicious && patterns.confidence > 0.7) {
    results.suspicious = true;
    results.reasons.push(patterns.reason);
    results.actions.allowLeadCreation = false; // Don't create lead for spam patterns
  }

  return results;
};

/**
 * Gets current feature flag status
 * Useful for monitoring and debugging
 * 
 * @returns {Object} Current feature flag configuration
 */
const getProtectionStatus = () => {
  return {
    enabled: Object.values(FEATURE_FLAGS).some(flag => flag),
    layers: FEATURE_FLAGS,
    config: {
      rateLimits: RATE_LIMITS,
      timeValidation: TIME_VALIDATION,
    },
    stats: {
      trackedClients: requestStore.size,
    },
  };
};

module.exports = {
  checkBotProtection,
  checkRateLimit,
  checkHoneypot,
  checkTimingPatterns,
  checkMessagePatterns,
  getProtectionStatus,
  FEATURE_FLAGS,
  RATE_LIMITS,
  TIME_VALIDATION,
};

