// Environment configuration for RAG API
// This file centralizes all environment variable access

const config = {
  // Pinecone Configuration
  pinecone: {
    apiKey: process.env.PINECONE_API_KEY,
    environment: process.env.PINECONE_ENVIRONMENT,
    indexName: process.env.PINECONE_INDEX_NAME || 'kingdom-design-house'
  },

  // OpenAI Configuration
  openai: {
    apiKey: process.env.OPENAI_API_KEY,
    model: process.env.OPENAI_MODEL || 'gpt-4o',
    maxTokens: parseInt(process.env.OPENAI_MAX_TOKENS) || 1000
  },

  // HubSpot Configuration
  hubspot: {
    accessToken: process.env.HUBSPOT_ACCESS_TOKEN,
    portalId: process.env.HUBSPOT_PORTAL_ID
  },

  // Server Configuration
  server: {
    port: parseInt(process.env.PORT) || 3001,
    nodeEnv: process.env.NODE_ENV || 'development',
    apiKey: process.env.API_KEY
  }
};

// Validation function to check if all required environment variables are set
export const validateConfig = () => {
  const required = [
    'PINECONE_API_KEY',
    'PINECONE_ENVIRONMENT',
    'OPENAI_API_KEY',
    'HUBSPOT_ACCESS_TOKEN',
    'HUBSPOT_PORTAL_ID'
  ];

  const missing = required.filter(key => !process.env[key]);

  if (missing.length > 0) {
    console.error('❌ Missing required environment variables:', missing);
    console.error('Please check your .env file and ensure all required keys are set.');
    return false;
  }

  console.log('✅ All required environment variables are set');
  return true;
};

// Helper function to get service URLs
export const getServiceUrls = () => ({
  pinecone: `https://${config.pinecone.indexName}-${config.pinecone.environment}.svc.pinecone.io`,
  hubspot: `https://api.hubapi.com`,
  openai: 'https://api.openai.com/v1'
});

export default config;