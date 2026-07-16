const requestStore = new Map();

const enabled = name => process.env[name] === 'true';
const numberFromEnv = (name, fallback) => Number.parseInt(process.env[name], 10) || fallback;

const getClientIdentifier = (req, userId) => {
  const forwarded = req.headers['x-forwarded-for'];
  const ip = Array.isArray(forwarded) ? forwarded[0] : (forwarded || req.socket?.remoteAddress || 'unknown');
  return `${String(ip).split(',')[0].trim()}_${userId}`;
};

const checkRateLimit = (req, userId) => {
  if (!enabled('ENABLE_RATE_LIMITING')) return { allowed: true, retryAfter: 0 };

  const key = getClientIdentifier(req, userId);
  const now = Date.now();
  const existing = requestStore.get(key) || { timestamps: [], lastRequest: null };
  const timestamps = existing.timestamps.filter(timestamp => timestamp > now - 86400000);
  const limits = [
    [60000, numberFromEnv('RATE_LIMIT_PER_MINUTE', 5), numberFromEnv('RATE_LIMIT_COOLDOWN', 30)],
    [3600000, numberFromEnv('RATE_LIMIT_PER_HOUR', 30), 300],
    [86400000, numberFromEnv('RATE_LIMIT_PER_DAY', 100), 3600],
  ];

  for (const [window, limit, retryAfter] of limits) {
    if (timestamps.filter(timestamp => timestamp > now - window).length >= limit) {
      return { allowed: false, reason: 'Too many requests', retryAfter };
    }
  }

  timestamps.push(now);
  requestStore.set(key, { timestamps, lastRequest: existing.lastRequest });
  return { allowed: true, retryAfter: 0 };
};

const checkBotProtection = (req, body, userId) => {
  const layers = [];
  const result = {
    allowed: true,
    suspicious: false,
    reasons: [],
    actions: { allowMessage: true, allowLeadCreation: true },
    metadata: { enabledLayers: layers },
  };

  const rateLimit = checkRateLimit(req, userId);
  if (enabled('ENABLE_RATE_LIMITING')) layers.push('RATE_LIMITING');
  if (!rateLimit.allowed) {
    return { ...result, allowed: false, retryAfter: rateLimit.retryAfter, reasons: [rateLimit.reason], actions: { allowMessage: false, allowLeadCreation: false } };
  }

  if (enabled('ENABLE_HONEYPOT')) {
    layers.push('HONEYPOT');
    if (['website', 'bot_field', 'url', 'homepage'].some(field => String(body[field] || '').trim())) {
      result.suspicious = true;
      result.reasons.push('Honeypot field was filled');
      result.actions.allowLeadCreation = false;
    }
  }

  if (enabled('ENABLE_TIME_VALIDATION')) {
    layers.push('TIME_VALIDATION');
    const minimum = numberFromEnv('MIN_SECONDS_BEFORE_SUBMIT', 2) * 1000;
    if (body.pageLoadTime && Date.now() - Number(body.pageLoadTime) < minimum) {
      result.suspicious = true;
      result.reasons.push('Submitted too quickly after page load');
      result.actions.allowLeadCreation = false;
    }
    const key = getClientIdentifier(req, userId);
    const lastRequest = requestStore.get(key)?.lastRequest;
    const betweenMessages = numberFromEnv('MIN_SECONDS_BETWEEN_MESSAGES', 1) * 1000;
    if (lastRequest && Date.now() - lastRequest < betweenMessages) {
      result.suspicious = true;
      result.reasons.push('Messages sent too rapidly');
      result.actions.allowLeadCreation = false;
    }
  }

  if (enabled('ENABLE_PATTERN_DETECTION')) {
    layers.push('PATTERN_DETECTION');
    const message = String(body.message || '');
    const spam = (message.match(/https?:\/\//g) || []).length > 2 ||
      /(.)\1{10,}/.test(message) ||
      (message.length > 20 && message === message.toUpperCase()) ||
      message.length > 5000 ||
      message.trim().length < 2 ||
      /\b(viagra|casino|lottery|prize|winner|click here|buy now)\b/i.test(message);
    if (spam) {
      result.suspicious = true;
      result.reasons.push('Suspicious message pattern detected');
      result.actions.allowLeadCreation = false;
    }
  }

  const clientKey = getClientIdentifier(req, userId);
  const clientState = requestStore.get(clientKey) || { timestamps: [] };
  requestStore.set(clientKey, { ...clientState, lastRequest: Date.now() });

  return result;
};

const getProtectionStatus = () => ({
  enabled: ['ENABLE_RATE_LIMITING', 'ENABLE_HONEYPOT', 'ENABLE_TIME_VALIDATION', 'ENABLE_PATTERN_DETECTION'].some(enabled),
  trackedClients: requestStore.size,
});

module.exports = { checkBotProtection, checkRateLimit, getProtectionStatus };
