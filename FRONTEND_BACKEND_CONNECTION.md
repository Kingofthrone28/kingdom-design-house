# Frontend-Backend Connection Architecture

## 🔗 How Frontend Connects to RAG API Server

### 📍 Server Location & Setup

The `server.js` file is located in the **`rag-api`** directory, not the root project directory.

```bash
# Correct location
/Users/paulsolomon/Projects/kingdom-design-house/rag-api/server.js

# To run the server (from rag-api directory)
cd rag-api
node server.js
# Server runs on http://localhost:3001
```

### 🏗️ Connection Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        FRONTEND (Next.js)                      │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │                ChatInterface.js                            │ │
│  │  ┌─────────────────────────────────────────────────────────┐ │ │
│  │  │  fetch('http://localhost:3001/api/chat', {            │ │ │
│  │  │    method: 'POST',                                    │ │ │
│  │  │    headers: { 'Content-Type': 'application/json' },   │ │ │
│  │  │    body: JSON.stringify({                             │ │ │
│  │  │      query: inputMessage.trim(),                       │ │ │
│  │  │      conversationHistory: messages                    │ │ │
│  │  │    })                                                  │ │ │
│  │  │  })                                                    │ │ │
│  │  └─────────────────────────────────────────────────────────┘ │ │
│  └─────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                        RAG API SERVER                          │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │                    server.js                              │ │
│  │  ┌─────────────────────────────────────────────────────────┐ │ │
│  │  │  app.use('/api/chat', chatRoutes);                     │ │ │
│  │  │  // Routes chat requests to routes/chat.js             │ │ │
│  │  └─────────────────────────────────────────────────────────┘ │ │
│  │  ┌─────────────────────────────────────────────────────────┐ │ │
│  │  │  app.listen(PORT, () => {                               │ │ │
│  │  │    console.log(`RAG API server running on port ${PORT}`);│ │ │
│  │  │  });                                                    │ │ │
│  │  └─────────────────────────────────────────────────────────┘ │ │
│  └─────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                    PRODUCTION (Netlify)                         │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │              netlify/functions/chat-jarvis.js              │ │
│  │  ┌─────────────────────────────────────────────────────────┐ │ │
│  │  │  const ragResponse = await fetch(`${ragApiUrl}/api/chat`);│ │ │
│  │  │  // Proxies requests to RAG API server                  │ │ │
│  │  └─────────────────────────────────────────────────────────┘ │ │
│  └─────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

## 🔄 Development vs Production Flow

### 🛠️ Development Mode

**Frontend → RAG API Server (Direct Connection)**

```javascript
// ChatInterface.js - Direct connection to RAG API
const response = await fetch('http://localhost:3001/api/chat', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    query: inputMessage.trim(),
    conversationHistory: messages
  }),
});
```

**Flow:**
1. User types message in ChatInterface
2. Frontend sends POST request to `http://localhost:3001/api/chat`
3. RAG API server processes request
4. Returns AI response with lead capture data

### 🚀 Production Mode

**Frontend → Netlify Function → RAG API Server**

```javascript
// Production: Frontend calls Netlify function
const response = await fetch('/.netlify/functions/chat-jarvis', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    message: inputMessage.trim(),
    conversationHistory: messages
  }),
});
```

**Flow:**
1. User types message in ChatInterface
2. Frontend sends POST request to `/.netlify/functions/chat-jarvis`
3. Netlify function proxies request to RAG API server
4. RAG API processes and returns response
5. Netlify function returns response to frontend

## 📁 File Structure & Connections

### Frontend Files
```
frontend/
├── components/
│   └── ChatInterface.js          # Main chat component
│       └── fetch('http://localhost:3001/api/chat')  # Direct API call
└── pages/
    └── index.js                 # Homepage with chat integration
```

### Backend Files
```
rag-api/
├── server.js                    # Main Express server
│   ├── app.use('/api/chat', chatRoutes)  # Route handler
│   └── app.listen(3001)        # Server on port 3001
├── routes/
│   └── chat.js                  # Chat request handler
└── services/
    ├── pinecone.js              # Vector database
    ├── openai.js                # AI service
    └── hubspot.js               # CRM integration
```

### Production Files
```
netlify/
└── functions/
    └── chat-jarvis.js           # Netlify function proxy
        └── fetch(`${ragApiUrl}/api/chat`)  # Proxies to RAG API
```

## 🔧 Setup Instructions

### 1. Start RAG API Server
```bash
# Navigate to rag-api directory
cd rag-api

# Install dependencies (if not already done)
npm install

# Start the server
node server.js
# Output: "RAG API server running on port 3001"
```

### 2. Start Frontend Development Server
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies (if not already done)
npm install

# Start the development server
npm run dev
# Output: "Ready - started server on 0.0.0.0:3000"
```

### 3. Test Connection
```bash
# Test RAG API directly
curl -X POST http://localhost:3001/api/chat \
  -H "Content-Type: application/json" \
  -d '{"query": "Hi, I need help with web development"}'

# Test health endpoint
curl http://localhost:3001/health
```

## 🔍 Connection Troubleshooting

### Common Issues

#### 1. "Cannot find module" Error
```bash
# ❌ Wrong directory
cd /Users/paulsolomon/Projects/kingdom-design-house
node server.js
# Error: Cannot find module '/Users/paulsolomon/Projects/kingdom-design-house/server.js'

# ✅ Correct directory
cd /Users/paulsolomon/Projects/kingdom-design-house/rag-api
node server.js
# Success: RAG API server running on port 3001
```

#### 2. CORS Issues
```javascript
// server.js includes CORS middleware
app.use(cors());
```

#### 3. Port Conflicts
```bash
# Check if port 3001 is in use
lsof -i :3001

# Kill process if needed
kill -9 <PID>
```

#### 4. Environment Variables
```bash
# Ensure .env file exists in rag-api directory
cd rag-api
ls -la .env

# Check if required variables are set
cat .env | grep -E "(PINECONE|OPENAI|HUBSPOT)"
```

## 📊 Request/Response Flow

### Frontend Request
```javascript
// ChatInterface.js
const response = await fetch('http://localhost:3001/api/chat', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    query: "Hi, I need help with web development",
    conversationHistory: [
      { role: 'user', content: 'Hello' },
      { role: 'assistant', content: 'Hi there!' }
    ]
  }),
});
```

### Backend Processing
```javascript
// routes/chat.js
const chatHandler = async (req, res) => {
  const { query, conversationHistory = [] } = req.body;
  
  // 1. Search Pinecone for relevant documents
  const relevantDocs = await searchSimilarDocuments(query, 5);
  
  // 2. Generate AI response
  const response = await generateResponse(messages, systemPrompt);
  
  // 3. Extract lead information
  const structuredInfo = await extractStructuredInfo(query);
  
  // 4. Create HubSpot lead
  const hubspotLead = await createLeadIfPossible(structuredInfo, query);
  
  // 5. Return response
  res.json({
    response,
    structuredInfo,
    hubspotLead,
    relevantDocs,
    timestamp: new Date().toISOString()
  });
};
```

### Frontend Response Handling
```javascript
// ChatInterface.js
const data = await response.json();

if (response.ok) {
  const assistantMessage = {
    role: 'assistant',
    content: data.response,
    structuredInfo: data.structuredInfo,
    leadCreated: data.hubspotLead?.success
  };
  
  setMessages(prev => [...prev, assistantMessage]);
}
```

## 🚀 Production Deployment

### Netlify Function Configuration
```javascript
// netlify/functions/chat-jarvis.js
const ragApiUrl = process.env.RAG_API_URL || 'http://localhost:3001';

// Proxies requests to RAG API server
const ragResponse = await fetch(`${ragApiUrl}/api/chat`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    query: message,
    conversationHistory,
  }),
});
```

### Environment Variables (Production)
```bash
# Netlify Environment Variables
RAG_API_URL=https://your-rag-api-server.com
HUBSPOT_ACCESS_TOKEN=your_token
HUBSPOT_PORTAL_ID=your_portal_id
```

This architecture ensures seamless communication between the frontend ChatInterface and the RAG API server, with proper fallbacks for production deployment.