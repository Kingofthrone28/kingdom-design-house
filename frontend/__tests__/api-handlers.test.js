const { chatHandler, leadHandler } = require('../server/apiHandlers');
const chatService = require('../server/chatService');
const leadService = require('../server/leadService');

jest.mock('../server/chatService', () => ({ processChat: jest.fn() }));
jest.mock('../server/leadService', () => ({ createLead: jest.fn() }));

const response = () => {
  const res = { headers: {}, statusCode: 200, payload: undefined };
  res.setHeader = jest.fn((name, value) => { res.headers[name] = value; });
  res.status = jest.fn(code => { res.statusCode = code; return res; });
  res.json = jest.fn(payload => { res.payload = payload; return res; });
  res.end = jest.fn(() => res);
  return res;
};

describe('Vercel API handlers', () => {
  beforeEach(() => jest.clearAllMocks());

  test('chat handles CORS preflight', async () => {
    const res = response();
    await chatHandler({ method: 'OPTIONS', headers: {} }, res);
    expect(res.statusCode).toBe(200);
    expect(res.headers['Access-Control-Allow-Methods']).toBe('POST, OPTIONS');
  });

  test('chat rejects unsupported methods', async () => {
    const res = response();
    await chatHandler({ method: 'GET', headers: {} }, res);
    expect(res.statusCode).toBe(405);
  });

  test('chat rejects missing and invalid bodies', async () => {
    let res = response();
    await chatHandler({ method: 'POST', headers: {}, body: 'invalid' }, res);
    expect(res.statusCode).toBe(400);
    res = response();
    await chatHandler({ method: 'POST', headers: {}, body: {} }, res);
    expect(res.statusCode).toBe(400);
  });

  test('chat rejects oversized payloads before invoking services', async () => {
    const res = response();
    await chatHandler({ method: 'POST', headers: { 'content-length': String(1024 * 1024 + 1) }, body: { message: 'Hello' } }, res);
    expect(res.statusCode).toBe(413);
    expect(chatService.processChat).not.toHaveBeenCalled();
  });

  test('chat returns service response and headers', async () => {
    chatService.processChat.mockResolvedValue({ status: 429, headers: { 'Retry-After': '30' }, body: { blocked: true } });
    const res = response();
    await chatHandler({ method: 'POST', headers: {}, body: { message: 'Hello' } }, res);
    expect(res.statusCode).toBe(429);
    expect(res.headers['Retry-After']).toBe('30');
  });

  test('lead validates method and delegates valid requests', async () => {
    let res = response();
    await leadHandler({ method: 'GET', headers: {} }, res);
    expect(res.statusCode).toBe(405);

    leadService.createLead.mockResolvedValue({ status: 200, body: { success: true } });
    res = response();
    await leadHandler({ method: 'POST', headers: {}, body: { email: 'test@example.com' } }, res);
    expect(leadService.createLead).toHaveBeenCalledWith({ email: 'test@example.com' });
    expect(res.statusCode).toBe(200);
  });
});
