# RAG API Architecture - Deep Dive Documentation

## 🏗️ System Architecture Overview

The RAG API is a sophisticated Express.js application that combines Retrieval-Augmented Generation (RAG) with HubSpot CRM integration to provide intelligent chat responses and automatic lead capture.

## 📊 High-Level Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        RAG API SERVER                          │
│                     (Express.js + Node.js)                     │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                        ENTRY POINTS                            │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  │
│  │   /api/chat     │  │   /health       │  │   Netlify       │  │
│  │   (Main Route)  │  │   (Health Check)│  │   Handler       │  │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                      CORE SERVICES LAYER                       │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  │
│  │   Pinecone      │  │   OpenAI        │  │   HubSpot       │  │
│  │   (Vector DB)   │  │   (AI Engine)  │  │   (CRM)         │  │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                      DATA LAYER                                │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  │
│  │   Sample Docs   │  │   Environment   │  │   Scripts       │  │
│  │   (Knowledge)   │  │   (Config)      │  │   (Setup)       │  │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

## 📁 File Structure & Responsibilities

### 🎯 Core Server Files

#### `server.js` - Main Application Entry Point
**Purpose**: Express.js server initialization and routing
**Key Functions**:
- `initializeServices()` - Initialize Pinecone and OpenAI clients
- `exports.handler` - Netlify serverless function handler
- Health check endpoint (`/health`)
- Error handling middleware
- CORS and JSON middleware setup

**Dependencies**:
- `routes/chat` - Main chat route handler
- `services/pinecone` - Vector database service
- `services/openai` - AI service integration
- `utils/` - Centralized HTTP client utilities (cleaned up)

#### `lib/config.js` - Configuration Management
**Purpose**: Centralized environment variable management
**Key Functions**:
- `validateConfig()` - Validates required environment variables
- `getServiceUrls()` - Returns service endpoint URLs
- Configuration object with Pinecone, OpenAI, HubSpot, and server settings

### 🛣️ Routes Layer

#### `routes/chat.js` - Main Chat Handler
**Purpose**: Processes chat requests and orchestrates AI responses
**Key Functions**:

##### Core Chat Functions:
- `chatHandler(req, res)` - Main request handler
- `getAIResponse(query, conversationHistory)` - AI response generation
- `getStructuredInfo(query)` - Structured data extraction
- `createLeadIfPossible(structuredInfo, query)` - Lead creation logic

##### Lead Extraction Functions:
- `extractBasicLeadInfo(query)` - Regex-based lead extraction
- `extractConversationKeywords(query)` - Keyword extraction
- `createSystemPrompt(context, conversationHistory)` - System prompt builder

**Data Flow**:
1. Receives chat query
2. Searches Pinecone for relevant documents
3. Generates AI response with context
4. Extracts structured lead information
5. Creates HubSpot lead if contact info available
6. Returns response with lead status

### 🔧 Services Layer

#### `services/pinecone.js` - Vector Database Service
**Purpose**: Manages vector embeddings and similarity search
**Key Functions**:
- `initializePinecone()` - Initialize Pinecone client
- `searchSimilarDocuments(query, topK)` - Vector similarity search
- `upsertDocument(id, text, metadata)` - Add documents to vector DB

**Configuration**:
- Index: `kingdom-design-house`
- Model: `text-embedding-3-small`
- Dimensions: 1536
- Metric: Cosine similarity

#### `services/openai.js` - AI Service Integration
**Purpose**: Handles OpenAI API interactions for embeddings and chat
**Key Functions**:
- `initializeOpenAI()` - Initialize OpenAI client
- `generateEmbedding(text)` - Create text embeddings
- `generateResponse(messages, systemPrompt, maxTokens)` - Generate chat responses
- `extractStructuredInfo(text)` - Extract structured data from text

**Models Used**:
- Chat: `gpt-4o`
- Embeddings: `text-embedding-3-small`

#### `services/hubspot.js` - CRM Integration Service
**Purpose**: Manages HubSpot CRM operations
**Key Functions**:

##### Payload Builders:
- `buildContactPayload(contactData)` - Contact creation payload
- `buildDealPayload(dealData)` - Deal creation payload
- `buildTicketPayload(ticketData)` - Ticket creation payload
- `buildRequestHeaders()` - API request headers

##### CRM Operations:
- `initializeHubSpot()` - Initialize HubSpot client
- `createContact(contactData)` - Create contact
- `createDeal(dealData)` - Create deal
- `createTicket(ticketData)` - Create ticket
- `createLead(leadData)` - Complete lead creation workflow

**HubSpot Integration**:
- Contacts: Standard properties + conversation context
- Deals: Service-based deal creation with budget tracking
- Tickets: Lead follow-up tickets with priority levels

**Utils Integration**:
- Uses centralized HTTP client utilities from `utils/` directory
- Refactored to use `createHubSpotContact`, `createHubSpotDeal`, `createHubSpotTicket` helpers
- Improved error handling and request standardization

### 📊 Data Layer

#### `data/sample-documents.json` - Knowledge Base
**Purpose**: Sample documents for Pinecone vector database
**Content Categories**:
- Web Development Services
- IT Services & Networking
- AI Integration & Tools
- Pricing Information
- Company Process
- Contact Information

#### `scripts/populate-index.js` - Data Population Script
**Purpose**: Populates Pinecone index with sample documents
**Process**:
1. Loads sample documents from JSON
2. Generates embeddings for each document
3. Upserts documents to Pinecone index
4. Validates successful population

### 🧪 Testing Files

#### Test Files Overview:
- `test-hubspot-complete.js` - Complete HubSpot integration test
- `test-hubspot-simple.js` - Basic HubSpot contact creation test
- `test-hubspot-only.js` - HubSpot-only server test
- `test-minimal-populate.js` - Minimal Pinecone population test

### 🧹 Utils Directory (Cleaned Up)

#### `utils/` - Centralized HTTP Client Utilities
**Purpose**: Centralized HTTP request helpers for consistent API interactions
**Current Structure** (after cleanup):
```
rag-api/utils/
├── index.cjs          # Main export file (used by hubspot services)
├── httpClient.cjs     # Base HTTP client (used by hubspotClient.cjs)
└── hubspotClient.cjs  # HubSpot functions (used by index.cjs)
```

**Removed Files** (unused):
- ❌ `ragApiClient.cjs` - Not used by any rag-api service
- ❌ `netlifyClient.cjs` - Not used by any rag-api service
- ❌ All `.js` files (ES modules) - rag-api uses CommonJS
- ❌ Documentation files (`ANALYSIS_SUMMARY.md`, `MIGRATION_GUIDE.md`)
- ❌ `examples/` directory - Documentation/examples

**Available Functions**:
- `httpClient` - Universal HTTP client with error handling
- `createHubSpotContact` - Contact creation helper
- `createHubSpotDeal` - Deal creation helper
- `createHubSpotTicket` - Ticket creation helper

**Integration**:
- Used by `services/hubspot.js`, `services/hubspot-simple.js`, `services/hubspot-contacts-only.js`
- Provides consistent error handling and request standardization
- Reduces code duplication across HubSpot integrations

## 🔄 Data Flow Architecture

### 1. Request Processing Flow

```
User Query → /api/chat → chatHandler()
    │
    ▼
┌─────────────────────────────────────────────────────────────────┐
│                    AI RESPONSE GENERATION                      │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  │
│  │   Pinecone      │  │   OpenAI       │  │   Context      │  │
│  │   Search        │  │   Generation   │  │   Building     │  │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────────────────────────────────┐
│                    LEAD EXTRACTION & CRM                       │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  │
│  │   Structured    │  │   Basic Info    │  │   HubSpot       │  │
│  │   Extraction    │  │   Extraction    │  │   Creation     │  │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────────────────────────────────┐
│                        RESPONSE                                │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  │
│  │   AI Response  │  │   Lead Status   │  │   Metadata     │  │
│  │   (Text)       │  │   (Success)    │  │   (Docs)       │  │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

### 2. Lead Capture Flow

```
User Input → Lead Extraction
    │
    ▼
┌─────────────────────────────────────────────────────────────────┐
│                    LEAD EXTRACTION METHODS                      │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  │
│  │   AI-Powered    │  │   Regex-Based   │  │   Keyword       │  │
│  │   (Structured)  │  │   (Basic Info)  │  │   Extraction   │  │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────────────────────────────────┐
│                    HUBSPOT CRM CREATION                        │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  │
│  │   Contact       │  │   Deal          │  │   Ticket        │  │
│  │   Creation      │  │   Creation      │  │   Creation      │  │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

## 🔧 Function-Level Documentation

### Core Chat Handler Functions

#### `chatHandler(req, res)`
**Purpose**: Main request handler for chat endpoints
**Parameters**:
- `req.body.query` - User's chat message
- `req.body.conversationHistory` - Previous conversation context
**Returns**: JSON response with AI reply and lead status
**Error Handling**: Graceful fallback for AI service failures

#### `getAIResponse(query, conversationHistory)`
**Purpose**: Generates AI response using RAG
**Process**:
1. Searches Pinecone for relevant documents
2. Builds context from search results
3. Creates system prompt with context
4. Calls OpenAI for response generation
**Fallback**: Returns default response if AI fails

#### `getStructuredInfo(query)`
**Purpose**: Extracts structured lead information using AI
**Returns**: Object with contact details, service interest, budget, timeline
**Error Handling**: Returns null if extraction fails

### Lead Extraction Functions

#### `extractBasicLeadInfo(query)`
**Purpose**: Regex-based lead extraction without AI dependency
**Extraction Patterns**:
- Email: `/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/`
- Phone: `/\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/`
- Names: Multiple patterns for first/last name detection
- Services: Keyword mapping for service classification

#### `extractConversationKeywords(query)`
**Purpose**: Extracts relevant keywords from conversation
**Categories**:
- Business: business, company, startup, enterprise
- Technology: website, app, mobile, ecommerce, cms
- Urgency: urgent, asap, quickly, soon, immediately
- Budget: budget, cost, price, affordable, expensive

### HubSpot Integration Functions

#### `createContact(contactData)`
**Purpose**: Creates contact in HubSpot CRM
**Payload Structure**:
```javascript
{
  properties: {
    email: contactData.email,
    firstname: contactData.first_name,
    lastname: contactData.last_name,
    phone: contactData.phone,
    company: contactData.company,
    website: contactData.website,
    jobtitle: `Service: ${service} | Keywords: ${keywords}`
  }
}
```

#### `createDeal(dealData)`
**Purpose**: Creates deal in HubSpot CRM
**Payload Structure**:
```javascript
{
  properties: {
    dealname: `${service} Project`,
    amount: budget_amount,
    closedate: estimated_delivery_date,
    dealstage: '1998761658',
    pipeline: 'default',
    description: service_details
  }
}
```

#### `createTicket(ticketData)`
**Purpose**: Creates support ticket in HubSpot
**Payload Structure**:
```javascript
{
  properties: {
    subject: 'Lead Follow-up',
    content: description_with_priority,
    hs_ticket_priority: 'HIGH',
    hs_pipeline_stage: '1'
  }
}
```

## 🚀 Deployment Architecture

### Local Development
```bash
# Start RAG API Server
cd rag-api
node server.js
# Runs on http://localhost:3001

# Test Endpoints
curl -X POST http://localhost:3001/api/chat \
  -H "Content-Type: application/json" \
  -d '{"query": "Hi, I need help with web development"}'
```

### Netlify Functions
```javascript
// netlify/functions/chat-jarvis.js
exports.handler = async (event, context) => {
  // Proxies requests to RAG API server
  const response = await fetch('http://localhost:3001/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: event.body.query })
  });
  return { statusCode: 200, body: JSON.stringify(await response.json()) };
};
```

## 🔍 Error Handling & Fallbacks

### AI Service Failures
- **OpenAI Quota Exceeded**: Falls back to predefined responses
- **Pinecone Unavailable**: Continues without context
- **Network Issues**: Graceful degradation with error messages

### HubSpot Integration Failures
- **Contact Already Exists**: Logs conflict, continues with other operations
- **Invalid Properties**: Logs validation errors, continues with available data
- **API Rate Limits**: Implements retry logic with exponential backoff

### Response Structure
```javascript
{
  "response": "AI-generated or fallback response",
  "structuredInfo": { /* extracted lead data */ },
  "hubspotLead": {
    "contactId": "123456789",
    "dealId": "987654321",
    "ticketId": "456789123",
    "success": true
  },
  "relevantDocs": [ /* Pinecone search results */ ],
  "timestamp": "2025-09-27T14:50:01.853Z"
}
```

## 📈 Performance Considerations

### Caching Strategy
- **Pinecone Client**: Singleton pattern for connection reuse
- **OpenAI Client**: Lazy initialization with connection pooling
- **HubSpot Client**: Reusable connection with token management

### Optimization Techniques
- **Vector Search**: Optimized topK parameter (default: 5)
- **Token Management**: Configurable max tokens per request
- **Batch Operations**: Efficient document upserting
- **Error Recovery**: Graceful fallbacks for service failures

## 🔐 Security & Configuration

### Environment Variables
```bash
# Required Variables
PINECONE_API_KEY=your_pinecone_key
PINECONE_ENVIRONMENT=us-east-1-aws
PINECONE_INDEX_NAME=kingdom-design-house
OPENAI_API_KEY=your_openai_key
HUBSPOT_ACCESS_TOKEN=your_hubspot_token
HUBSPOT_PORTAL_ID=your_portal_id
```

### API Security
- **CORS**: Configured for cross-origin requests
- **Rate Limiting**: Built into service APIs
- **Token Validation**: Environment variable validation
- **Error Sanitization**: Safe error message responses

## 🧪 Testing Strategy

### Unit Tests
- Individual service function testing
- Mock external API calls
- Error condition testing

### Integration Tests
- End-to-end chat flow testing
- HubSpot CRM integration testing
- Pinecone vector search testing

### Load Testing
- Concurrent request handling
- Memory usage optimization
- Response time monitoring

This comprehensive architecture provides a robust, scalable foundation for AI-powered chat with intelligent lead capture and CRM integration.