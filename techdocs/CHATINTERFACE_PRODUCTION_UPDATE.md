# ChatInterface Production Update for Netlify

## 🔄 Required Changes for Netlify Production

### **Current Development Code:**
```javascript
// ChatInterface.js - Current (Development)
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

### **Production Netlify Code:**
```javascript
// ChatInterface.js - Updated for Production
const response = await fetch('/.netlify/functions/chat-jarvis', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    message: inputMessage.trim(), // Changed from 'query' to 'message'
    conversationHistory: messages
  }),
});
```

## 🔧 Environment Variables Required

### **Netlify Dashboard Configuration:**
Go to **Site Settings > Environment Variables** and add:

```bash
# RAG API Server Configuration
RAG_API_URL=https://your-rag-api-server.railway.app
OPENAI_API_KEY=sk-your-openai-key
PINECONE_API_KEY=your-pinecone-key
PINECONE_ENVIRONMENT=us-east-1-aws
PINECONE_INDEX_NAME=kingdom-design-house

# HubSpot CRM Configuration
HUBSPOT_ACCESS_TOKEN=pat-na2-your-hubspot-token
HUBSPOT_PORTAL_ID=your-portal-id
```

## 🚀 Deployment Architecture

```
Frontend (Netlify) → Netlify Function → RAG API Server (Railway/Render)
     ↓                    ↓                    ↓
User Interface    →  chat-jarvis.js    →  Express Server
     ↓                    ↓                    ↓
ChatInterface.js  →  Proxy & Transform →  AI + HubSpot
```

## 📋 Step-by-Step Implementation

### **1. Update ChatInterface.js**

Replace the fetch call in `sendMessage` function:

```javascript
// OLD (Development)
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

// NEW (Production)
const response = await fetch('/.netlify/functions/chat-jarvis', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    message: inputMessage.trim(), // Changed parameter name
    conversationHistory: messages
  }),
});
```

### **2. Deploy RAG API Server**

Deploy your RAG API server to a hosting service:

**Option A: Railway (Recommended)**
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway link
railway up
```

**Option B: Render**
```bash
# Connect GitHub repository
# Set build command: npm install
# Set start command: node server.js
# Add environment variables
```

### **3. Configure Netlify Environment Variables**

In Netlify Dashboard:
1. Go to **Site Settings > Environment Variables**
2. Add all required variables (see above)
3. Set `RAG_API_URL` to your deployed RAG API server URL

### **4. Test Production Setup**

```bash
# Test Netlify function locally
netlify dev

# Test deployed function
curl -X POST https://your-site.netlify.app/.netlify/functions/chat-jarvis \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello, I need help with web development"}'
```

## 🔍 Key Differences

### **Development vs Production:**

| Aspect | Development | Production |
|--------|-------------|------------|
| **Endpoint** | `http://localhost:3001/api/chat` | `/.netlify/functions/chat-jarvis` |
| **Parameter** | `query` | `message` |
| **Server** | Local RAG API | Deployed RAG API |
| **Configuration** | `.env` file | Netlify Environment Variables |
| **CORS** | Direct connection | Netlify function proxy |

## 🛠️ No Additional Tokens Required

**You don't need any additional Netlify-specific tokens or IDs** for this setup. The Netlify function will use the environment variables you configure in the dashboard.

The flow is:
1. **Frontend** → Netlify Function (no auth needed)
2. **Netlify Function** → RAG API Server (using `RAG_API_URL`)
3. **RAG API Server** → External APIs (using their respective API keys)

## ✅ Benefits of This Setup

1. **Scalability**: Netlify handles function scaling automatically
2. **Security**: API keys are server-side only
3. **Performance**: Edge functions for faster response times
4. **Reliability**: Built-in error handling and retries
5. **Cost**: Pay-per-use pricing model

## 🚨 Important Notes

1. **Parameter Change**: `query` → `message` (required for Netlify function)
2. **CORS**: Netlify function handles CORS automatically
3. **Error Handling**: Netlify function includes built-in error handling
4. **Logging**: Check Netlify function logs in dashboard
5. **Testing**: Test locally with `netlify dev` before deploying