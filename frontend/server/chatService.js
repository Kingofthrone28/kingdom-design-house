const { checkBotProtection } = require('./botProtection');
const { syncLead } = require('./leadService');

const fallbackResponse = message => ({
  response: `Hello! I'm Jarvis from Kingdom Design House. I'm currently experiencing some technical difficulties with my AI services, but I'd be happy to help you with your project needs.\n\nFor immediate assistance, please contact us:\n📞 Phone: 347.927.8846\n📧 Email: info@kingdomdesignhouse.com\n\nWe offer comprehensive packages for businesses of all sizes, including:\n• Web Development & Design\n• IT Services & Support\n• Networking Solutions\n• AI Integration\n\nWhat specific services are you interested in?`,
  structuredInfo: {
    email: null, first_name: null, last_name: null, phone: null, company: null, website: null,
    service_requested: 'General Inquiry', budget_range: null, timeline: null, project_description: message,
  },
  hubspotLead: null,
  relevantDocs: [],
  timestamp: new Date().toISOString(),
});

const hasValue = value => typeof value === 'string' && value.trim() !== '';
const EMAIL_PATTERN = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i;
const PHONE_PATTERN = /(?:\+?1[\s.-]?)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}\b/;

const userConversationText = (message, conversationHistory = []) => [
  ...conversationHistory
    .filter(item => item?.role === 'user' && hasValue(item.content))
    .map(item => item.content),
  message,
].join('\n');

const enrichStructuredInfo = (info = {}, message, conversationHistory = []) => {
  const text = userConversationText(message, conversationHistory);
  return {
    ...info,
    email: text.match(EMAIL_PATTERN)?.[0]?.toLowerCase() || info.email || null,
    phone: text.match(PHONE_PATTERN)?.[0] || info.phone || null,
  };
};

const shouldCreateLead = info => {
  if (!info || typeof info !== 'object') return false;
  const hasEmail = hasValue(info.email);
  const hasService = hasValue(info.service_requested);
  const hasDescription = hasValue(info.project_description);
  const hasIndicators = ['budget_range', 'timeline', 'company', 'phone', 'first_name', 'last_name'].some(field => hasValue(info[field]));
  return hasEmail && (hasService || hasDescription || hasIndicators);
};

const extractBudgetAmount = value => {
  const match = String(value || '').match(/\$?(\d+(?:\.\d+)?)([kK]?)/);
  return match ? String(Number(match[1]) * (match[2] ? 1000 : 1)) : '0';
};

const calculateDeliveryDate = timeline => {
  const value = String(timeline || '').toLowerCase();
  const days = /(urgent|asap)/.test(value) ? 7 : value.includes('quarter') ? 90 : 30;
  return new Date(Date.now() + days * 86400000).toISOString();
};

const completeConversation = (conversationHistory, originalMessage, assistantResponse) => [
  ...conversationHistory,
  { role: 'user', content: originalMessage },
  ...(hasValue(assistantResponse) ? [{ role: 'assistant', content: assistantResponse }] : []),
];

const transformLeadData = (info, originalMessage, conversationHistory = [], options = {}) => ({
  email: info.email, first_name: info.first_name, last_name: info.last_name, phone: info.phone,
  company: info.company, website: info.website, service_requested: info.service_requested,
  conversation_keywords: info.conversation_keywords, budget_range: info.budget_range, timeline: info.timeline,
  deal_name: info.service_requested ? `${info.service_requested} Project` : 'New Lead Project',
  budget_amount: extractBudgetAmount(info.budget_range), estimated_delivery_date: calculateDeliveryDate(info.timeline),
  project_description: info.project_description || originalMessage, description: info.project_description || originalMessage,
  priority_level: 'HIGH', assigned_team: 'KDH Sales Team', issue_type: 'Lead Follow-up',
  conversation_id: options.conversationId,
  conversation_history: completeConversation(conversationHistory, originalMessage, options.assistantResponse)
    .filter(item => hasValue(item?.content))
    .map(item => `${item.role}: ${item.content}`)
    .join('\n\n'),
  originalMessage, timestamp: new Date().toISOString(),
});

const callRagApi = async (message, conversationHistory, userId) => {
  const baseUrl = (process.env.RAG_API_URL || 'http://localhost:3001').replace(/\/$/, '');
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 25000);
  try {
    const response = await fetch(`${baseUrl}/api/chat`, {
      method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ query: message, conversationHistory, userId, skipLeadCreation: true }),
      signal: controller.signal,
    });
    if (!response.ok) throw new Error(`RAG API returned ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('RAG API call failed:', error.message);
    return fallbackResponse(message);
  } finally {
    clearTimeout(timeout);
  }
};

const processChat = async (req, body) => {
  const message = body.message.trim();
  const forwarded = req.headers['x-forwarded-for'];
  const userId = String(Array.isArray(forwarded) ? forwarded[0] : forwarded || req.socket?.remoteAddress || 'anonymous').split(',')[0];
  const protection = checkBotProtection(req, body, userId);

  if (!protection.allowed) {
    const retryAfter = protection.retryAfter || 60;
    return { status: 429, headers: { 'Retry-After': String(retryAfter) }, body: { error: 'Too many requests', response: `You're sending messages too quickly. Please wait ${retryAfter} seconds and try again.`, retryAfter, blocked: true } };
  }

  let data = protection.suspicious
    ? { ...fallbackResponse(message), botProtectionTriggered: true, botProtectionReasons: protection.reasons }
    : await callRagApi(message, body.conversationHistory || [], userId);

  if (!protection.actions.allowLeadCreation) {
    return { status: 200, body: { ...data, leadCreated: false, leadSkipped: true, leadSkipReason: 'Bot protection triggered' } };
  }

  const structuredInfo = enrichStructuredInfo(data.structuredInfo, message, body.conversationHistory || []);
  data = { ...data, structuredInfo };

  if (shouldCreateLead(structuredInfo)) {
    const result = await syncLead(transformLeadData(
      structuredInfo,
      message,
      body.conversationHistory || [],
      { conversationId: body.conversationId, assistantResponse: data.response },
    ));
    data = {
      ...data,
      leadCreated: result.status === 200,
      hubspotLead: result.status === 200 ? result.body.hubspotLead : null,
      crmOperations: result.status === 200 ? result.body.operations : undefined,
      ...(result.status === 200 ? {} : { leadError: result.body.message || result.body.error }),
    };
  }
  return { status: 200, body: data };
};

module.exports = {
  processChat,
  fallbackResponse,
  shouldCreateLead,
  transformLeadData,
  enrichStructuredInfo,
  completeConversation,
  extractBudgetAmount,
  calculateDeliveryDate,
  callRagApi,
};
