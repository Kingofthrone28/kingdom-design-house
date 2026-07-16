const { processChat } = require('./chatService');
const { createLead } = require('./leadService');

const setCors = res => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
};

const bodySize = req => Number(req.headers['content-length'] || Buffer.byteLength(JSON.stringify(req.body || '')));

const chatHandler = async (req, res) => {
  setCors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed', message: 'Only POST requests are allowed' });
  if (bodySize(req) > 1024 * 1024) return res.status(413).json({ error: 'Payload too large', message: 'Request body must be 1 MB or smaller' });
  if (!req.body || typeof req.body !== 'object') return res.status(400).json({ error: 'Invalid JSON', message: 'Request body must be valid JSON' });
  if (typeof req.body.message !== 'string' || !req.body.message.trim()) return res.status(400).json({ error: 'Message is required', message: 'The message field cannot be empty' });

  try {
    const result = await processChat(req, req.body);
    for (const [name, value] of Object.entries(result.headers || {})) res.setHeader(name, value);
    return res.status(result.status).json(result.body);
  } catch (error) {
    console.error('Chat handler failed:', error);
    return res.status(500).json({ error: 'Internal server error', message: 'Sorry, I encountered an error. Please try again.', timestamp: new Date().toISOString() });
  }
};

const leadHandler = async (req, res) => {
  setCors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  if (bodySize(req) > 1024 * 1024) return res.status(413).json({ error: 'Payload too large' });
  if (!req.body || typeof req.body !== 'object') return res.status(400).json({ error: 'Invalid JSON' });
  const result = await createLead(req.body);
  return res.status(result.status).json(result.body);
};

module.exports = { chatHandler, leadHandler };
