require('dotenv').config();
const express = require('express');
const cors = require('cors');
const chatHandler = require('./routes/chat-hubspot-only');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    services: {
      hubspot: process.env.HUBSPOT_ACCESS_TOKEN ? true : false
    }
  });
});

// Chat endpoint
app.post('/api/chat', chatHandler);

// Start server
app.listen(PORT, () => {
  console.log(`RAG API server running on port ${PORT}`);
  console.log('HubSpot integration enabled');
  console.log('Note: Pinecone and OpenAI services disabled for testing');
});

module.exports = app;