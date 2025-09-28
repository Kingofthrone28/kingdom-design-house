# 🚀 Netlify Production Deployment Guide

## ✅ ChatInterface.js Updated

The ChatInterface.js file has been updated for Netlify production:

### **Changes Made:**
- **URL**: `http://localhost:3001/api/chat` → `/.netlify/functions/chat-jarvis`
- **Parameter**: `query` → `message`
- **No additional frontend configuration needed**

## 🔧 Required Environment Variables

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

## 🚀 Step-by-Step Deployment

### **1. Deploy RAG API Server**

#### **Option A: Railway (Recommended)**
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway link
railway up

# Set environment variables
railway variables set OPENAI_API_KEY=your-key
railway variables set PINECONE_API_KEY=your-key
railway variables set HUBSPOT_ACCESS_TOKEN=your-token
railway variables set HUBSPOT_PORTAL_ID=your-id
```

#### **Option B: Render**
1. Connect your GitHub repository
2. Set build command: `npm install`
3. Set start command: `node server.js`
4. Add environment variables in dashboard

### **2. Configure Netlify Environment Variables**

In your Netlify dashboard:
1. Go to **Site Settings > Environment Variables**
2. Add all the variables listed above
3. Set `RAG_API_URL` to your deployed RAG API server URL

### **3. Deploy Frontend to Netlify**

#### **Option A: Git Integration**
1. Push your code to GitHub
2. Connect repository to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `frontend/.next`

#### **Option B: Manual Deploy**
```bash
# Build the frontend
cd frontend
npm run build

# Deploy to Netlify
netlify deploy --prod --dir=.next
```

## 🔍 Testing Production Setup

### **Test Netlify Function Locally:**
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Test locally
netlify dev

# Test the function
curl -X POST http://localhost:8888/.netlify/functions/chat-jarvis \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello, I need help with web development"}'
```

### **Test Deployed Function:**
```bash
curl -X POST https://your-site.netlify.app/.netlify/functions/chat-jarvis \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello, I need help with web development"}'
```

## 📋 Deployment Checklist

### **RAG API Server:**
- [ ] Deploy to Railway/Render
- [ ] Set all environment variables
- [ ] Test server is running
- [ ] Note the deployed URL

### **Netlify Frontend:**
- [ ] Set environment variables in dashboard
- [ ] Set `RAG_API_URL` to deployed server
- [ ] Deploy frontend
- [ ] Test chat functionality

### **Netlify Function:**
- [ ] Verify `chat-jarvis.js` is in `netlify/functions/`
- [ ] Test function locally with `netlify dev`
- [ ] Test deployed function

## 🚨 Important Notes

### **No Additional Tokens Required:**
- **No Netlify API keys needed**
- **No special authentication required**
- The Netlify function acts as a simple proxy

### **Key Differences:**
| Aspect | Development | Production |
|--------|-------------|------------|
| **Endpoint** | `http://localhost:3001/api/chat` | `/.netlify/functions/chat-jarvis` |
| **Parameter** | `query` | `message` |
| **Server** | Local RAG API | Deployed RAG API |
| **Configuration** | `.env` file | Netlify Environment Variables |

## 🔧 Troubleshooting

### **Common Issues:**

1. **Function not found:**
   - Check `netlify/functions/chat-jarvis.js` exists
   - Verify function name matches URL

2. **RAG API connection failed:**
   - Check `RAG_API_URL` environment variable
   - Verify RAG API server is running
   - Check server logs

3. **Environment variables not working:**
   - Verify variables are set in Netlify dashboard
   - Check variable names match exactly
   - Redeploy after adding variables

### **Debug Commands:**
```bash
# Check Netlify function logs
netlify functions:list
netlify functions:invoke chat-jarvis

# Test RAG API server
curl https://your-rag-api-server.railway.app/api/chat \
  -H "Content-Type: application/json" \
  -d '{"query": "test"}'
```

## ✅ Success Indicators

When everything is working correctly:
1. **ChatInterface** sends messages to `/.netlify/functions/chat-jarvis`
2. **Netlify function** proxies to your RAG API server
3. **RAG API server** processes with AI and HubSpot
4. **Response** flows back through the chain
5. **User** sees AI response in chat interface

## 🎯 Next Steps

1. **Deploy RAG API server** to Railway/Render
2. **Set environment variables** in Netlify
3. **Deploy frontend** to Netlify
4. **Test the complete flow**
5. **Monitor logs** for any issues

Your ChatInterface.js is now ready for Netlify production! 🚀