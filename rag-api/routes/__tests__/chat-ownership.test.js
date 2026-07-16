jest.mock('../../services/pinecone', () => ({ searchSimilarDocuments: jest.fn().mockResolvedValue([]) }));
jest.mock('../../services/openai', () => ({
  generateResponse: jest.fn().mockResolvedValue('Generated answer'),
  extractStructuredInfo: jest.fn().mockResolvedValue({ email: 'jane@example.com', service_requested: 'Web Development' }),
}));
jest.mock('../../services/hubspot', () => ({ createLead: jest.fn().mockResolvedValue({ success: true }) }));

const chatHandler = require('../chat');
const { createLead } = require('../../services/hubspot');

const response = () => {
  const res = { statusCode: 200, payload: null };
  res.status = jest.fn(code => { res.statusCode = code; return res; });
  res.json = jest.fn(payload => { res.payload = payload; return res; });
  return res;
};

describe('RAG chat CRM ownership', () => {
  beforeEach(() => jest.clearAllMocks());

  test('skipLeadCreation returns extracted data without writing to HubSpot', async () => {
    const res = response();
    await chatHandler({ body: { query: 'I need a website', conversationHistory: [], skipLeadCreation: true } }, res);
    expect(res.statusCode).toBe(200);
    expect(res.payload).toMatchObject({
      response: 'Generated answer',
      structuredInfo: { email: 'jane@example.com' },
      hubspotLead: null,
    });
    expect(createLead).not.toHaveBeenCalled();
  });
});
