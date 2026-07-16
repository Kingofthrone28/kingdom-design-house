const { processContactSubmission } = require('../../server/contactService');

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '16kb',
    },
  },
};

export default async function contactHandler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ success: false, message: 'Method not allowed.' });
  }

  if (!req.body || typeof req.body !== 'object' || Array.isArray(req.body)) {
    return res.status(400).json({ success: false, message: 'Invalid request body.' });
  }

  try {
    const result = await processContactSubmission(req);
    Object.entries(result.headers || {}).forEach(([name, value]) => res.setHeader(name, value));
    return res.status(result.status).json(result.body);
  } catch (error) {
    console.error('Contact form submission failed:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Failed to send message. Please try again or contact us directly.',
    });
  }
}
