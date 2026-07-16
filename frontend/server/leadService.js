const HUBSPOT_BASE_URL = 'https://api.hubapi.com';
const MAX_RETRIES = 3;
const REQUEST_TIMEOUT_MS = 10000;
const CONVERSATION_PROPERTY = process.env.HUBSPOT_CONVERSATION_PROPERTY || 'kdh_conversation_id';

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

const compactProperties = properties => Object.fromEntries(
  Object.entries(properties).filter(([, value]) => value !== null && value !== undefined && value !== ''),
);

const contactProperties = (lead, { includeFallbackNames = true } = {}) => {
  const emailName = String(lead.email).split('@')[0].split(/[._-]/);
  return compactProperties({
    email: lead.email,
    firstname: lead.first_name || (includeFallbackNames ? emailName[0] || 'Prospect' : null),
    lastname: lead.last_name || (includeFallbackNames ? emailName[1] || 'Lead' : null),
    phone: lead.phone,
    company: lead.company,
    website: lead.website,
    jobtitle: lead.service_requested || lead.conversation_keywords
      ? `Service: ${lead.service_requested || 'Not specified'} | Keywords: ${lead.conversation_keywords || 'None'}`
      : null,
  });
};

const dealProperties = lead => compactProperties({
  dealname: lead.deal_name || `${lead.service_requested || 'Service Inquiry'} - ${lead.email}`,
  dealstage: process.env.HUBSPOT_DEAL_STAGE_ID || 'appointmentscheduled',
  pipeline: process.env.HUBSPOT_DEAL_PIPELINE_ID || 'default',
  amount: String(extractBudgetAmount(lead.budget_range) || 0),
  closedate: calculateCloseDate(lead.timeline),
  description: `Service: ${lead.service_requested || 'Not specified'}\nBudget: ${lead.budget_range || 'Not specified'}\nTimeline: ${lead.timeline || 'Not specified'}\nKeywords: ${lead.conversation_keywords || 'None'}`,
  [CONVERSATION_PROPERTY]: lead.conversation_id,
});

const ticketProperties = lead => compactProperties({
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
  [CONVERSATION_PROPERTY]: lead.conversation_id,
});

const searchObject = async (objectType, propertyName, value, properties = []) => {
  if (!value) return null;
  const result = await hubspotRequest(`/crm/v3/objects/${objectType}/search`, {
    body: {
      filterGroups: [{ filters: [{ propertyName, operator: 'EQ', value: String(value) }] }],
      properties,
      limit: 1,
    },
  });
  return result.results?.[0] || null;
};

const upsertContact = async lead => {
  const email = String(lead.email).trim().toLowerCase();
  const existing = await searchObject(
    'contacts',
    'email',
    email,
    ['email', 'firstname', 'lastname', 'phone', 'company', 'website'],
  );
  const existingLead = existing ? {
    first_name: existing.properties?.firstname,
    last_name: existing.properties?.lastname,
    phone: existing.properties?.phone,
    company: existing.properties?.company,
    website: existing.properties?.website,
  } : {};
  const mergedLead = compactProperties({ ...existingLead, ...compactProperties(lead), email });
  const properties = contactProperties(
    mergedLead,
    { includeFallbackNames: !existing },
  );
  if (existing) {
    const contact = await hubspotRequest(`/crm/v3/objects/contacts/${existing.id}`, {
      method: 'PATCH',
      body: { properties },
    });
    return { record: contact, operation: 'updated', lead: mergedLead };
  }
  const contact = await hubspotRequest('/crm/v3/objects/contacts', { body: { properties } });
  return { record: contact, operation: 'created', lead: mergedLead };
};

const syncObject = async (objectType, lead, properties, associations) => {
  const existing = lead.conversation_id
    ? await searchObject(objectType, CONVERSATION_PROPERTY, lead.conversation_id, [CONVERSATION_PROPERTY])
    : null;
  if (existing) {
    const record = await hubspotRequest(`/crm/v3/objects/${objectType}/${existing.id}`, {
      method: 'PATCH',
      body: { properties },
    });
    return { record, operation: 'updated' };
  }
  const record = await hubspotRequest(`/crm/v3/objects/${objectType}`, {
    body: { properties, associations },
  });
  return { record, operation: 'created' };
};

const ensureTicketDealAssociation = async (ticketId, dealId) => {
  if (!ticketId || !dealId) return;
  await hubspotRequest(
    `/crm/v3/objects/tickets/${ticketId}/associations/deals/${dealId}/28`,
    { method: 'PUT' },
  );
};

const syncLead = async lead => {
  if (!lead?.email) return { status: 400, body: { error: 'Email is required' } };
  if (!process.env.HUBSPOT_ACCESS_TOKEN) return { status: 500, body: { error: 'HubSpot configuration missing' } };

  try {
    const contactResult = await upsertContact(lead);
    const contact = contactResult.record;
    const synchronizedLead = contactResult.lead;
    let deal = null;
    let ticket = null;
    const warnings = [];
    const operations = { contact: contactResult.operation, deal: 'skipped', ticket: 'skipped' };

    if (lead.service_requested || lead.budget_range) {
      try {
        const result = await syncObject(
          'deals',
          synchronizedLead,
          dealProperties(synchronizedLead),
          [association(contact.id, 3)],
        );
        deal = result.record;
        operations.deal = result.operation;
      } catch (error) {
        warnings.push(`Deal synchronization failed: ${error.message}`);
        console.error(warnings[warnings.length - 1]);
      }
    }

    if (lead.project_description || lead.service_requested) {
      try {
        const associations = [association(contact.id, 16)];
        if (deal?.id) associations.push(association(deal.id, 28));
        const result = await syncObject(
          'tickets',
          synchronizedLead,
          ticketProperties(synchronizedLead),
          associations,
        );
        ticket = result.record;
        operations.ticket = result.operation;
        if (deal?.id && result.operation === 'updated') {
          await ensureTicketDealAssociation(ticket.id, deal.id);
        }
      } catch (error) {
        warnings.push(`Ticket synchronization failed: ${error.message}`);
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
        operations,
        warnings,
        message: warnings.length ? 'Lead synchronized with partial HubSpot failures' : 'Lead synchronized successfully in HubSpot',
      },
    };
  } catch (error) {
    console.error('HubSpot lead creation failed:', error.message);
    return { status: 500, body: { error: 'Failed to create lead', message: 'There was an error processing your request. Please try again.' } };
  }
};

const createLead = syncLead;

module.exports = {
  syncLead,
  createLead,
  hubspotRequest,
  searchObject,
  upsertContact,
  syncObject,
  ensureTicketDealAssociation,
  association,
  compactProperties,
  contactProperties,
  dealProperties,
  ticketProperties,
  calculateLeadScore,
  extractBudgetAmount,
  calculateCloseDate,
};
