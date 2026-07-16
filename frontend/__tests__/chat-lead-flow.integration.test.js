const { chatHandler } = require('../server/apiHandlers');

const makeResponse = () => {
  const res = { headers: {}, statusCode: 200, payload: undefined };
  res.setHeader = (name, value) => { res.headers[name] = value; };
  res.status = code => { res.statusCode = code; return res; };
  res.json = payload => { res.payload = payload; return res; };
  res.end = () => res;
  return res;
};

const jsonResponse = (data, status = 200) => ({
  ok: status >= 200 && status < 300,
  status,
  headers: { get: () => null },
  json: async () => data,
});

describe('local chat-to-lead integration', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = {
      ...originalEnv,
      RAG_API_URL: 'https://rag.test',
      HUBSPOT_ACCESS_TOKEN: 'test-token',
      HUBSPOT_DEAL_PIPELINE_ID: 'default',
      HUBSPOT_DEAL_STAGE_ID: 'appointmentscheduled',
      HUBSPOT_TICKET_PIPELINE_ID: '0',
      HUBSPOT_TICKET_STAGE_ID: '1',
      ENABLE_RATE_LIMITING: 'false',
      ENABLE_HONEYPOT: 'false',
      ENABLE_TIME_VALIDATION: 'false',
      ENABLE_PATTERN_DETECTION: 'false',
    };
  });

  afterEach(() => { delete global.fetch; });
  afterAll(() => { process.env = originalEnv; });

  test('chat delegates AI only to Railway and creates one associated CRM lead in Vercel', async () => {
    const requests = [];
    global.fetch = jest.fn(async (url, options) => {
      requests.push({ url, options, body: options.body ? JSON.parse(options.body) : null });
      if (url === 'https://rag.test/api/chat') {
        return jsonResponse({
          response: 'We can help with your website.',
          structuredInfo: {
            email: 'jane@example.com', first_name: 'Jane', last_name: 'Doe',
            service_requested: 'Web Development', budget_range: '$5k', timeline: '2 weeks',
            project_description: 'Build a new website', conversation_keywords: 'website, design',
          },
          hubspotLead: null,
          relevantDocs: [],
        });
      }
      if (url.endsWith('/crm/v3/objects/contacts/search')) return jsonResponse({ results: [] });
      if (url.endsWith('/crm/v3/objects/contacts')) return jsonResponse({ id: 'contact-1' }, 201);
      if (url.endsWith('/crm/v3/objects/deals/search')) return jsonResponse({ results: [] });
      if (url.endsWith('/crm/v3/objects/deals')) return jsonResponse({ id: 'deal-1' }, 201);
      if (url.endsWith('/crm/v3/objects/tickets/search')) return jsonResponse({ results: [] });
      if (url.endsWith('/crm/v3/objects/tickets')) return jsonResponse({ id: 'ticket-1' }, 201);
      throw new Error(`Unexpected request: ${url}`);
    });

    const req = {
      method: 'POST', headers: { 'x-forwarded-for': '203.0.113.25' }, socket: {},
      body: {
        message: 'I need a website. Contact me at jane@example.com.',
        conversationId: 'conversation-1',
        conversationHistory: [{ role: 'user', content: 'My name is Jane Doe.' }],
      },
    };
    const res = makeResponse();
    await chatHandler(req, res);

    expect(res.statusCode).toBe(200);
    expect(res.payload).toMatchObject({
      response: 'We can help with your website.',
      leadCreated: true,
      hubspotLead: { contactId: 'contact-1', dealId: 'deal-1', ticketId: 'ticket-1', success: true },
    });
    expect(requests).toHaveLength(7);
    expect(requests[0].body).toMatchObject({ skipLeadCreation: true, query: req.body.message });
    expect(requests[1].body.filterGroups[0].filters[0]).toMatchObject({
      propertyName: 'email',
      value: 'jane@example.com',
    });
    expect(requests[2].body.properties).toMatchObject({ email: 'jane@example.com', firstname: 'Jane' });
    expect(requests[4].body.associations[0]).toEqual({
      to: { id: 'contact-1' },
      types: [{ associationCategory: 'HUBSPOT_DEFINED', associationTypeId: 3 }],
    });
    expect(requests[6].body.associations).toEqual([
      { to: { id: 'contact-1' }, types: [{ associationCategory: 'HUBSPOT_DEFINED', associationTypeId: 16 }] },
      { to: { id: 'deal-1' }, types: [{ associationCategory: 'HUBSPOT_DEFINED', associationTypeId: 28 }] },
    ]);
    expect(requests[6].body.properties.content).toContain('user: My name is Jane Doe.');
    expect(requests[6].body.properties.content).toContain('user: I need a website. Contact me at jane@example.com.');
    expect(requests[6].body.properties.content).toContain('assistant: We can help with your website.');
  });
});
