require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Import routes from rag-api
const chatRoutes = require('./rag-api/routes/chat');

// Routes
app.use('/api/chat', chatRoutes);

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ 
    status: 'success', 
    message: 'Kingdom Design House RAG API is running',
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`RAG API Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/`);
  console.log(`Chat endpoint: http://localhost:${PORT}/api/chat`);
});