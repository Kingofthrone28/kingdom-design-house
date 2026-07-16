const HUBSPOT_BASE_URL = 'https://api.hubapi.com';
const MAX_RETRIES = 3;
const REQUEST_TIMEOUT_MS = 10000;

const calculateLeadScore = lead => Math.min(100,
  (lead.email ? 10 : 0) + (lead.phone ? 15 : 0) + (lead.company ? 10 : 0) +
  (lead.service_requested ? 20 : 0) + (lead.budget_range ? 25 : 0) +
  (lead.timeline ? 15 : 0) + (lead.project_description ? 10 : 0));

const extractBudgetAmount = value => {
  if (!value) return null;
  const match = String(value).match(/(\d+(?:\.\d+)?)\s*([kKmM]?)/);
  if (!match) return null;
  const multipliers = { k: 1000, m: 1000000 };
  return Number(match[1]) * (multipliers[match[2].toLowerCase()] || 1);
};

const calculateCloseDate = timeline => {
  const date = new Date();
  const value = String(timeline || '').toLowerCase();
  const amount = Number.parseInt(value.match(/\d+/)?.[0] || '1', 10);
  if (value.includes('week')) date.setDate(date.getDate() + amount * 7);
  else if (value.includes('month')) date.setMonth(date.getMonth() + amount);
  else if (value.includes('day')) date.setDate(date.getDate() + amount);
  else date.setDate(date.getDate() + (/(urgent|asap)/.test(value) ? 7 : 30));
  return date.toISOString();
};

const sleep = milliseconds => new Promise(resolve => setTimeout(resolve, milliseconds));

const hubspotRequest = async (path, { method = 'POST', body } = {}, attempt = 0) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const response = await fetch(`${HUBSPOT_BASE_URL}${path}`, {
      method,
      headers: { Authorization: `Bearer ${process.env.HUBSPOT_ACCESS_TOKEN}`, 'Content-Type': 'application/json' },
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });
    const data = await response.json().catch(() => ({}));
    if (response.status === 429 && attempt < MAX_RETRIES) {
      const retryAfter = Number(response.headers?.get?.('retry-after')) * 1000;
      await sleep(retryAfter || 1000 * (2 ** attempt));
      return hubspotRequest(path, { method, body }, attempt + 1);
    }
    if (!response.ok) throw new Error(`HubSpot request failed (${response.status}): ${data.message || 'Unknown error'}`);
    return data;
  } finally {
    clearTimeout(timeout);
  }
};

const association = (id, associationTypeId) => ({
  to: { id: String(id) },
  types: [{ associationCategory: 'HUBSPOT_DEFINED', associationTypeId }],
});

const contactProperties = lead => {
  const emailName = String(lead.email).split('@')[0].split(/[._-]/);
  return {
    email: lead.email,
    firstname: lead.first_name || emailName[0] || 'Prospect',
    lastname: lead.last_name || emailName[1] || 'Lead',
    phone: lead.phone || '',
    company: lead.company || '',
    website: lead.website || '',
    jobtitle: `Service: ${lead.service_requested || 'Not specified'} | Keywords: ${lead.conversation_keywords || 'None'}`,
  };
};

const dealProperties = lead => ({
  dealname: lead.deal_name || `${lead.service_requested || 'Service Inquiry'} - ${lead.email}`,
  dealstage: process.env.HUBSPOT_DEAL_STAGE_ID || 'appointmentscheduled',
  pipeline: process.env.HUBSPOT_DEAL_PIPELINE_ID || 'default',
  amount: String(extractBudgetAmount(lead.budget_range) || 0),
  closedate: calculateCloseDate(lead.timeline),
  description: `Service: ${lead.service_requested || 'Not specified'}\nBudget: ${lead.budget_range || 'Not specified'}\nTimeline: ${lead.timeline || 'Not specified'}\nKeywords: ${lead.conversation_keywords || 'None'}`,
});

const ticketProperties = lead => ({
  subject: `Follow-up: ${lead.service_requested || 'New Lead'} inquiry`,
  content: [
    `Name: ${lead.first_name || ''} ${lead.last_name || ''}`.trim(),
    `Email: ${lead.email}`,
    `Phone: ${lead.phone || 'Not provided'}`,
    `Company: ${lead.company || 'Not provided'}`,
    `Service: ${lead.service_requested || 'General Inquiry'}`,
    `Budget: ${lead.budget_range || 'Not specified'}`,
    `Timeline: ${lead.timeline || 'Not specified'}`,
    `Project: ${lead.project_description || lead.originalMessage || 'Not provided'}`,
    `Conversation:\n${lead.conversation_history || lead.originalMessage || 'Not provided'}`,
  ].join('\n'),
  hs_ticket_priority: lead.priority_level || 'HIGH',
  hs_pipeline: process.env.HUBSPOT_TICKET_PIPELINE_ID || '0',
  hs_pipeline_stage: process.env.HUBSPOT_TICKET_STAGE_ID || '1',
});

const createLead = async lead => {
  if (!lead?.email) return { status: 400, body: { error: 'Email is required' } };
  if (!process.env.HUBSPOT_ACCESS_TOKEN) return { status: 500, body: { error: 'HubSpot configuration missing' } };

  try {
    const contact = await hubspotRequest('/crm/v3/objects/contacts', { body: { properties: contactProperties(lead) } });
    let deal = null;
    let ticket = null;
    const warnings = [];

    if (lead.service_requested || lead.budget_range) {
      try {
        deal = await hubspotRequest('/crm/v3/objects/deals', { body: {
          properties: dealProperties(lead),
          associations: [association(contact.id, 3)],
        } });
      } catch (error) {
        warnings.push(`Deal creation failed: ${error.message}`);
        console.error(warnings[warnings.length - 1]);
      }
    }

    if (lead.project_description || lead.service_requested) {
      try {
        const associations = [association(contact.id, 16)];
        if (deal?.id) associations.push(association(deal.id, 28));
        ticket = await hubspotRequest('/crm/v3/objects/tickets', { body: {
          properties: ticketProperties(lead),
          associations,
        } });
      } catch (error) {
        warnings.push(`Ticket creation failed: ${error.message}`);
        console.error(warnings[warnings.length - 1]);
      }
    }

    return {
      status: 200,
      body: {
        success: true,
        contactId: contact.id,
        dealId: deal?.id || null,
        ticketId: ticket?.id || null,
        hubspotLead: { contactId: contact.id, dealId: deal?.id || null, ticketId: ticket?.id || null, success: true },
        warnings,
        message: warnings.length ? 'Contact created with partial HubSpot failures' : 'Lead created successfully in HubSpot',
      },
    };
  } catch (error) {
    console.error('HubSpot lead creation failed:', error.message);
    return { status: 500, body: { error: 'Failed to create lead', message: 'There was an error processing your request. Please try again.' } };
  }
};

module.exports = {
  createLead,
  hubspotRequest,
  association,
  contactProperties,
  dealProperties,
  ticketProperties,
  calculateLeadScore,
  extractBudgetAmount,
  calculateCloseDate,
};
