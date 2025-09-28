# Kingdom Design House - API Setup Instructions

This guide will help you set up all the required API keys and configurations for the Kingdom Design House project.

## 📋 Prerequisites

- Node.js 18+ installed
- Git installed
- A code editor (VS Code recommended)

## 🔑 Required API Keys & Services

### 1. Pinecone (Vector Database)

**What it's for:** Stores and searches document embeddings for the RAG system.

**Setup Steps:**
1. Go to [Pinecone Console](https://app.pinecone.io/)
2. Sign up for a free account
3. Create a new project
4. Create an index with these settings:
   - **Name:** `kingdom-design-house`
   - **Dimensions:** `1536` (for OpenAI embeddings)
   - **Metric:** `cosine`
5. Go to "API Keys" section
6. Copy your **API Key** and **Environment**

**Required Values:**
- `PINECONE_API_KEY`
- `PINECONE_ENVIRONMENT`
- `PINECONE_INDEX_NAME=kingdom-design-house`

### 2. OpenAI (AI Language Model)

**What it's for:** Powers the AI chat functionality and generates responses.

**Setup Steps:**
1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Sign up or log in
3. Go to [API Keys](https://platform.openai.com/api-keys)
4. Click "Create new secret key"
5. Name it "Kingdom Design House"
6. Copy the key (starts with `sk-`)

**Required Values:**
- `OPENAI_API_KEY`
- `OPENAI_MODEL=gpt-4`
- `OPENAI_MAX_TOKENS=1000`

**Cost:** ~$0.03 per 1K tokens (very affordable for development)

### 3. HubSpot (CRM Integration)

**What it's for:** Stores lead information when users interact with the chat.

**Setup Steps:**
1. Go to [HubSpot](https://app.hubspot.com/)
2. Sign up for a free account
3. Go to Settings → Integrations → Private Apps
4. Click "Create a private app"
5. Name it "Kingdom Design House Integration"
6. Grant these scopes:
   - `crm.objects.contacts.write`
   - `crm.objects.contacts.read`
   - `crm.schemas.contacts.read`
7. Copy the **Access Token**
8. Find your **Portal ID** in Settings → Account Setup → Account Defaults

**Required Values:**
- `HUBSPOT_ACCESS_TOKEN`
- `HUBSPOT_PORTAL_ID`

### 4. Netlify (Deployment & Functions)

**What it's for:** Hosts the frontend and serverless functions.

**Setup Steps:**
1. Go to [Netlify](https://app.netlify.com/)
2. Sign up for a free account
3. Go to User Settings → Applications
4. Click "New access token"
5. Name it "Kingdom Design House"
6. Copy the **Personal Access Token**
7. Create a new site and note the **Site ID**

**Required Values:**
- `NETLIFY_API_KEY` (Personal Access Token)
- `NETLIFY_SITE_ID`

## 🚀 Quick Setup Guide

### Step 1: Copy Environment Files

```bash
# Frontend
cp frontend/env.example frontend/.env.local

# RAG API
cp rag-api/env.example rag-api/.env

# Netlify Functions
cp netlify/functions/env.example netlify/functions/.env
```

### Step 2: Fill in Your API Keys

Edit each `.env` file with your actual API keys:

```bash
# Example for frontend/.env.local
PINECONE_API_KEY=pc-xxxxxxxxxxxxxxxxxxxxxxxx
PINECONE_ENVIRONMENT=us-east-1-aws
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxx
HUBSPOT_ACCESS_TOKEN=pat-xxxxxxxxxxxxxxxxxxxxxxxx
HUBSPOT_PORTAL_ID=12345678
NETLIFY_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxx
NETLIFY_SITE_ID=xxxxxxxxxxxxxxxxxxxxxxxx
```

### Step 3: Install Dependencies

```bash
# Frontend
cd frontend
npm install

# RAG API
cd ../rag-api
npm install

# Netlify Functions
cd ../netlify/functions
npm install
```

### Step 4: Populate Pinecone Index

```bash
cd rag-api
node scripts/populate-index.js
```

### Step 5: Start Development Servers

```bash
# Terminal 1 - RAG API
cd rag-api
npm start

# Terminal 2 - Frontend
cd frontend
npm run dev
```

## 🔒 Security Best Practices

1. **Never commit `.env` files to Git**
2. **Use different API keys for development/production**
3. **Rotate keys regularly**
4. **Monitor API usage and costs**
5. **Use environment-specific configurations**

## 🧪 Testing Your Setup

### Test Pinecone Connection
```bash
cd rag-api
node -e "
const { Pinecone } = require('@pinecone-database/pinecone');
const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
console.log('Pinecone connected:', !!pc);
"
```

### Test OpenAI Connection
```bash
cd rag-api
node -e "
const OpenAI = require('openai');
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
console.log('OpenAI connected:', !!openai);
"
```

### Test HubSpot Connection
```bash
cd rag-api
node -e "
const hubspot = require('@hubspot/api-client');
const client = new hubspot.Client({ accessToken: process.env.HUBSPOT_ACCESS_TOKEN });
console.log('HubSpot connected:', !!client);
"
```

## 📊 Cost Estimates (Monthly)

| Service | Free Tier | Paid Usage |
|---------|-----------|------------|
| Pinecone | 100K vectors | $0.0004/1K vectors |
| OpenAI | $5 credit | ~$0.03/1K tokens |
| HubSpot | Free CRM | Free for basic use |
| Netlify | 100GB bandwidth | $19/month for Pro |

**Total estimated cost for development: $0-20/month**

## 🆘 Troubleshooting

### Common Issues:

1. **"Invalid API Key"**
   - Double-check the key format
   - Ensure no extra spaces or quotes
   - Verify the key is active

2. **"Rate Limit Exceeded"**
   - Check your usage limits
   - Implement rate limiting
   - Consider upgrading your plan

3. **"CORS Error"**
   - Ensure proper CORS configuration
   - Check domain whitelist settings

4. **"Environment Variables Not Loading"**
   - Restart your development server
   - Check file naming (`.env.local` not `.env.local.txt`)
   - Verify file location

## 📞 Support

If you encounter issues:

1. Check the service-specific documentation
2. Verify your API keys are correct
3. Check your account limits and billing
4. Review the troubleshooting section above

## 🔄 Next Steps

Once all APIs are configured:

1. Run the populate script to seed your Pinecone index
2. Test the chat functionality
3. Verify lead creation in HubSpot
4. Deploy to Netlify
5. Set up production environment variables

---

**Happy coding! 🚀**