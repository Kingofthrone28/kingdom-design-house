jest.mock('../server/leadService', () => ({ syncLead: jest.fn() }));

const { syncLead } = require('../server/leadService');
const { processChat, fallbackResponse, enrichStructuredInfo, completeConversation } = require('../server/chatService');

const request = () => ({ headers: { 'x-forwarded-for': '203.0.113.10' }, socket: {} });

describe('Vercel chat service', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn();
    process.env = { ...originalEnv, RAG_API_URL: 'https://rag.example.com' };
  });

  afterAll(() => { process.env = originalEnv; });

  test('returns the preserved fallback when the RAG service fails', async () => {
    fetch.mockRejectedValue(new Error('offline'));
    const result = await processChat(request(), { message: 'Help', conversationHistory: [] });
    expect(result.status).toBe(200);
    expect(result.body.response).toContain("I'm Jarvis");
    expect(result.body.structuredInfo.project_description).toBe('Help');
  });

  test('keeps chat successful when lead creation fails', async () => {
    fetch.mockResolvedValue({ ok: true, json: async () => ({ response: 'Hello', structuredInfo: { email: 'person@example.com', service_requested: 'Web Development' } }) });
    syncLead.mockResolvedValue({ status: 500, body: { message: 'CRM unavailable' } });
    const result = await processChat(request(), { message: 'I need a site' });
    expect(result.status).toBe(200);
    expect(result.body.response).toBe('Hello');
    expect(result.body.leadCreated).toBe(false);
    expect(result.body.leadError).toBe('CRM unavailable');
    const ragPayload = JSON.parse(fetch.mock.calls[0][1].body);
    expect(ragPayload.skipLeadCreation).toBe(true);
  });

  test('honeypot skips RAG and lead creation', async () => {
    process.env.ENABLE_HONEYPOT = 'true';
    const result = await processChat(request(), { message: 'Hello', website: 'spam.example' });
    expect(result.body.botProtectionTriggered).toBe(true);
    expect(result.body.leadSkipped).toBe(true);
    expect(fetch).not.toHaveBeenCalled();
    expect(syncLead).not.toHaveBeenCalled();
  });

  test('fallback response retains contact information', () => {
    expect(fallbackResponse('test').response).toContain('info@kingdomdesignhouse.com');
  });

  test('recovers email and phone from earlier user messages when structured extraction omits them', () => {
    const info = enrichStructuredInfo(
      { service_requested: 'AI consultation' },
      'My budget is $5k',
      [
        { role: 'user', content: 'Robert Towns, rtowns@example.com, 347-555-0199' },
        { role: 'assistant', content: 'How can we help?' },
      ],
    );
    expect(info).toMatchObject({
      email: 'rtowns@example.com',
      phone: '347-555-0199',
      service_requested: 'AI consultation',
    });
  });

  test('complete transcript includes the current user message and assistant response', () => {
    expect(completeConversation(
      [{ role: 'user', content: 'My name is Robert.' }],
      'I need AI consultation.',
      'We can help.',
    )).toEqual([
      { role: 'user', content: 'My name is Robert.' },
      { role: 'user', content: 'I need AI consultation.' },
      { role: 'assistant', content: 'We can help.' },
    ]);
  });
  test('only the owning CRM handler can confirm acceptance and includes approved context', async () => {
    fetch.mockResolvedValue({ ok: true, json: async () => ({ response: 'Thanks', structuredInfo: { email: 'person@example.com', service_requested: 'AI Development' } }) });
    syncLead.mockResolvedValue({ status: 200, body: { success: true, hubspotLead: { success: true, contactId: 'private-crm-id' }, operations: { contact: 'updated' } } });
    const result = await processChat(request(), { message: 'My project', conversationId: 'conversation-1', service: 'ai-development', cta: 'assistant-demo', sourcePath: '/ai-group/?email=secret@example.com', attributionSource: 'google' });
    expect(result.body.leadCreated).toBe(true);
    expect(syncLead).toHaveBeenCalledWith(expect.objectContaining({ conversation_id: 'conversation-1', cta: 'assistant-demo', sourcePath: '/ai-group/', attributionSource: 'google' }));
    expect(JSON.stringify(syncLead.mock.calls)).not.toContain('secret@example.com');
  });

  test('does not trust an upstream CRM success flag when no inquiry qualifies', async () => {
    fetch.mockResolvedValue({ ok: true, json: async () => ({ response: 'Hello', leadCreated: true, hubspotLead: { success: true }, structuredInfo: {} }) });
    const result = await processChat(request(), { message: 'What do you do?' });
    expect(result.body.leadCreated).toBe(false);
    expect(result.body.hubspotLead).toBeNull();
    expect(syncLead).not.toHaveBeenCalled();
  });

});
