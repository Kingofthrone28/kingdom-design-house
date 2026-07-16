const {
  syncLead,
  compactProperties,
} = require('../server/leadService');

const jsonResponse = (data, status = 200) => ({
  ok: status >= 200 && status < 300,
  status,
  headers: { get: () => null },
  json: async () => data,
});

describe('HubSpot lead synchronization', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = {
      ...originalEnv,
      HUBSPOT_ACCESS_TOKEN: 'test-token',
      HUBSPOT_DEAL_PIPELINE_ID: 'default',
      HUBSPOT_DEAL_STAGE_ID: '1998761658',
      HUBSPOT_TICKET_PIPELINE_ID: '0',
      HUBSPOT_TICKET_STAGE_ID: '1',
    };
  });

  afterEach(() => { delete global.fetch; });
  afterAll(() => { process.env = originalEnv; });

  test('updates existing contact, deal, and ticket for the same conversation', async () => {
    const requests = [];
    global.fetch = jest.fn(async (url, options) => {
      const body = options.body ? JSON.parse(options.body) : null;
      requests.push({ url, method: options.method, body });

      if (url.endsWith('/contacts/search')) return jsonResponse({ results: [{ id: 'contact-1' }] });
      if (url.endsWith('/contacts/contact-1')) return jsonResponse({ id: 'contact-1' });
      if (url.endsWith('/deals/search')) return jsonResponse({ results: [{ id: 'deal-1' }] });
      if (url.endsWith('/deals/deal-1')) return jsonResponse({ id: 'deal-1' });
      if (url.endsWith('/tickets/search')) return jsonResponse({ results: [{ id: 'ticket-1' }] });
      if (url.endsWith('/tickets/ticket-1')) return jsonResponse({ id: 'ticket-1' });
      if (url.includes('/tickets/ticket-1/associations/deals/deal-1/28')) return jsonResponse({});
      throw new Error(`Unexpected request: ${url}`);
    });

    const result = await syncLead({
      conversation_id: 'conversation-1',
      email: 'Robert@example.com',
      first_name: 'Robert',
      service_requested: 'AI consultation',
      budget_range: '$5,000',
      timeline: '2 months',
      project_description: 'RAG chat integrated with HighLevel',
      conversation_history: 'user: Complete conversation',
    });

    expect(result.status).toBe(200);
    expect(result.body.operations).toEqual({
      contact: 'updated',
      deal: 'updated',
      ticket: 'updated',
    });
    expect(result.body.hubspotLead).toMatchObject({
      contactId: 'contact-1',
      dealId: 'deal-1',
      ticketId: 'ticket-1',
    });
    expect(requests.find(request => request.url.endsWith('/contacts/contact-1'))).toMatchObject({
      method: 'PATCH',
      body: { properties: { email: 'robert@example.com', firstname: 'Robert' } },
    });
    expect(requests.find(request => request.url.endsWith('/tickets/ticket-1')).body.properties.content)
      .toContain('Complete conversation');
    expect(requests.some(request => request.method === 'PUT' && request.url.includes('/associations/deals/'))).toBe(true);
  });

  test('does not overwrite existing HubSpot values with empty fields', () => {
    expect(compactProperties({
      firstname: 'Robert',
      lastname: '',
      phone: null,
      company: undefined,
    })).toEqual({ firstname: 'Robert' });
  });
});
