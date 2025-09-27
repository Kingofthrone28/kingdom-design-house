require('dotenv').config();
const express = require('express');
const cors = require('cors');
const chatRoutes = require('./routes/chat');
const { initializePinecone } = require('./services/pinecone');
const { initializeOpenAI } = require('./services/openai');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize services
let pineconeClient, openaiClient;

async function initializeServices() {
  try {
    pineconeClient = await initializePinecone();
    openaiClient = initializeOpenAI();
    console.log('Services initialized successfully');
  } catch (error) {
    console.error('Failed to initialize services:', error);
    process.exit(1);
  }
}

// Routes
app.use('/api/chat', chatRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    services: {
      pinecone: !!pineconeClient,
      openai: !!openaiClient
    }
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Server error:', error);
  res.status(500).json({
    error: 'Internal server error',
    message: 'An unexpected error occurred'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Not found',
    message: 'The requested endpoint does not exist'
  });
});

// Export handler for Netlify
exports.handler = async (event, context) => {
  // Initialize services if not already done
  if (!pineconeClient || !openaiClient) {
    await initializeServices();
  }

  // Convert Netlify event to Express request
  const { httpMethod, path, body, headers, queryStringParameters } = event;
  
  const req = {
    method: httpMethod,
    url: path,
    body: body ? JSON.parse(body) : {},
    headers: headers || {},
    query: queryStringParameters || {}
  };

  // Mock response object
  let responseData = {};
  let statusCode = 200;
  
  const res = {
    status: (code) => {
      statusCode = code;
      return res;
    },
    json: (data) => {
      responseData = data;
      return res;
    },
    send: (data) => {
      responseData = data;
      return res;
    }
  };

  try {
    // Route the request
    if (path.startsWith('/api/chat')) {
      const chatHandler = require('./routes/chat');
      await chatHandler(req, res);
    } else if (path === '/health') {
      res.json({ 
        status: 'healthy', 
        timestamp: new Date().toISOString(),
        services: {
          pinecone: !!pineconeClient,
          openai: !!openaiClient
        }
      });
    } else {
      res.status(404).json({
        error: 'Not found',
        message: 'The requested endpoint does not exist'
      });
    }
  } catch (error) {
    console.error('Handler error:', error);
    statusCode = 500;
    responseData = {
      error: 'Internal server error',
      message: 'An unexpected error occurred'
    };
  }

  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(responseData)
  };
};

// Start server if running directly
if (require.main === module) {
  initializeServices().then(() => {
    app.listen(PORT, () => {
      console.log(`RAG API server running on port ${PORT}`);
    });
  });
}

module.exports = app;