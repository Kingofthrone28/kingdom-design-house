# 🚀 Complete Deployment Guide: Railway + Netlify

## **📋 Overview**

This guide will help you deploy:
1. **RAG API Server** → Railway or Render
2. **Frontend** → Netlify
3. **Environment Variables** → Both platforms

## **🔧 Step 1: Deploy RAG API Server**

### **Option A: Railway (Recommended)**

#### **1.1: Install Railway CLI**
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login
```

#### **1.2: Deploy to Railway**
```bash
# Navigate to RAG API directory
cd rag-api

# Initialize Railway project
railway init

# Deploy
railway up

# Set environment variables
railway variables set OPENAI_API_KEY=your-openai-key
railway variables set PINECONE_API_KEY=your-pinecone-key
railway variables set PINECONE_ENVIRONMENT=us-east-1-aws
railway variables set PINECONE_INDEX_NAME=kingdom-design-house
railway variables set HUBSPOT_ACCESS_TOKEN=your-hubspot-token
railway variables set HUBSPOT_PORTAL_ID=your-portal-id

# Get the deployed URL
railway domain
```

### **Option B: Render (Alternative)**

#### **1.1: Create GitHub Repository**
```bash
# Initialize git (if not already done)
git init
git add .
git commit -m "Initial commit"

# Create GitHub repository
# Go to github.com and create a new repository
# Then push your code:
git remote add origin https://github.com/yourusername/kingdom-design-house.git
git push -u origin main
```

#### **1.2: Deploy to Render**
1. Go to [render.com](https://render.com)
2. Sign up/Login with GitHub
3. Click **New +** → **Web Service**
4. Connect your GitHub repository
5. Configure:
   - **Name**: `kingdom-rag-api`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Environment**: `Node`
6. Add environment variables:
   - `OPENAI_API_KEY` = your-openai-key
   - `PINECONE_API_KEY` = your-pinecone-key
   - `PINECONE_ENVIRONMENT` = us-east-1-aws
   - `PINECONE_INDEX_NAME` = kingdom-design-house
   - `HUBSPOT_ACCESS_TOKEN` = your-hubspot-token
   - `HUBSPOT_PORTAL_ID` = your-portal-id
7. Click **Create Web Service**

## **🌐 Step 2: Deploy Frontend to Netlify**

### **2.1: Prepare Frontend for Deployment**
```bash
# Navigate to frontend directory
cd frontend

# Build the frontend
npm run build

# Test the build
npm start
```

### **2.2: Deploy to Netlify**

#### **Option A: Git Integration (Recommended)**
1. Go to [netlify.com](https://netlify.com)
2. Sign up/Login
3. Click **New site from Git**
4. Connect your GitHub repository
5. Configure:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/.next`
6. Click **Deploy site**

#### **Option B: Manual Deploy**
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
netlify deploy --prod --dir=frontend/.next
```

## **🔑 Step 3: Set Environment Variables**

### **3.1: Netlify Environment Variables**
1. Go to your Netlify site dashboard
2. Click **Site Settings** → **Environment Variables**
3. Add these variables:

```bash
# RAG API Server URL (from Railway/Render)
RAG_API_URL=https://your-app.railway.app
# OR
RAG_API_URL=https://your-app.onrender.com

# OpenAI Configuration
OPENAI_API_KEY=sk-your-openai-key

# Pinecone Configuration
PINECONE_API_KEY=your-pinecone-key
PINECONE_ENVIRONMENT=us-east-1-aws
PINECONE_INDEX_NAME=kingdom-design-house

# HubSpot Configuration
HUBSPOT_ACCESS_TOKEN=pat-na2-your-hubspot-token
HUBSPOT_PORTAL_ID=your-portal-id
```

### **3.2: Test Environment Variables**
```bash
# Test RAG API Server
curl https://your-app.railway.app/api/chat \
  -H "Content-Type: application/json" \
  -d '{"query": "test message"}'

# Test Netlify Function
curl https://your-site.netlify.app/.netlify/functions/chat-jarvis \
  -H "Content-Type: application/json" \
  -d '{"message": "test message"}'
```

## **📋 Deployment Checklist**

### **RAG API Server:**
- [ ] Deploy to Railway/Render
- [ ] Set all environment variables
- [ ] Test server is running
- [ ] Note the deployed URL

### **Netlify Frontend:**
- [ ] Deploy frontend to Netlify
- [ ] Set environment variables in dashboard
- [ ] Set `RAG_API_URL` to deployed server
- [ ] Test chat functionality

### **Netlify Function:**
- [ ] Verify `chat-jarvis.js` is in `netlify/functions/`
- [ ] Test function locally with `netlify dev`
- [ ] Test deployed function

## **🔍 Troubleshooting**

### **Common Issues:**

1. **RAG API Server not starting:**
   - Check environment variables are set
   - Verify server.js is in the root directory
   - Check server logs in Railway/Render dashboard

2. **Netlify function not working:**
   - Verify `chat-jarvis.js` exists in `netlify/functions/`
   - Check Netlify function logs
   - Verify environment variables are set

3. **Environment variables not working:**
   - Check variable names match exactly
   - Redeploy after adding variables
   - Verify no typos in variable names

### **Debug Commands:**
```bash
# Test RAG API locally
curl http://localhost:3001/api/chat \
  -H "Content-Type: application/json" \
  -d '{"query": "test"}'

# Test Netlify function locally
netlify dev

# Check Railway logs
railway logs

# Check Render logs
# Go to Render dashboard → Your service → Logs
```

## **✅ Success Indicators**

When everything is working:
1. **RAG API Server** responds to curl requests
2. **Netlify Function** proxies requests correctly
3. **Frontend** shows chat interface
4. **Chat messages** get AI responses
5. **HubSpot** creates leads automatically

## **🚀 Next Steps After Deployment**

1. **Test the complete flow** from frontend to HubSpot
2. **Monitor logs** for any errors
3. **Set up monitoring** for production
4. **Configure custom domain** (optional)
5. **Set up SSL certificates** (automatic with Netlify)

## **📞 Support**

If you encounter issues:
1. Check the logs in Railway/Render dashboard
2. Check Netlify function logs
3. Verify all environment variables are set
4. Test each component individually

Your deployment is now ready for production! 🎉