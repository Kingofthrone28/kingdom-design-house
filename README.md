# Kingdom Design House

A modern, responsive website for Kingdom Design House featuring an AI-powered chat system with RAG (Retrieval-Augmented Generation) capabilities and HubSpot CRM integration.

## 🏗️ Architecture

### Frontend (Next.js + SCSS)
- **Framework**: Next.js 14 with React 18
- **Styling**: SCSS with BEM methodology and flexbox grid system
- **Components**: Atomic Design Pattern (Atoms, Molecules, Organisms)
- **State Management**: React Context API for global state
- **Routing**: Dynamic routing for group-specific pages and services
- **Design**: Modern dark theme with yellow accents and responsive design

### Hosted Services
- **Vercel**: Next.js frontend plus `/api/chat` and `/api/send-lead` Node.js Functions
- **Railway RAG API**: Express service with Pinecone and OpenAI integration
- **Railway Contact Server**: Express service for reCAPTCHA validation and SendGrid email
- **HubSpot**: Contacts and deals created by the server-only Vercel lead service

## 🚀 Features

### Website Sections
1. **Hero Section**: Dynamic group-specific content with logos
2. **Our Groups**: Three service groups (Web, Network, AI) with individual pages
3. **Group-Specific Services**: Nested routing for service pages
4. **Our Process**: 6-step workflow with visual timeline
5. **Chat with Jarvis**: AI-powered chat with lead capture
6. **Why Choose Us**: Company description and value proposition
7. **Footer**: Contact info and company links

### AI Chat System
- **RAG Integration**: Retrieves relevant information from knowledge base
- **Structured Data Extraction**: Automatically extracts lead information (name, email, phone, service, budget)
- **HubSpot CRM**: Creates contacts, deals, and tickets automatically
- **Context-Aware Responses**: Maintains conversation history
- **Fallback Handling**: Graceful degradation when AI services are unavailable
- **Keyword Extraction**: Captures conversation keywords for better lead qualification

### Component Architecture
- **Atoms**: Basic UI elements (Icons, Buttons)
- **Molecules**: Simple component combinations (GroupHeading, MobileToggle)
- **Organisms**: Complex components (WebStrategy, ServiceContent)
- **Templates**: Page layouts with dynamic content

## 🛠️ Setup Instructions

### Prerequisites
- Node.js 18+ 
- npm or yarn
- OpenAI API key (GPT-4o access)
- Pinecone account and API key
- HubSpot account with private app and API access

### Environment Variables

Never place OpenAI, Pinecone, HubSpot, SendGrid, or reCAPTCHA secrets in a `NEXT_PUBLIC_*` variable. Those values are embedded in browser JavaScript.

| Owner | Variable | Required | Visibility | Environments |
| --- | --- | --- | --- | --- |
| Vercel | `NEXT_PUBLIC_CONTACT_SERVER_URL` | Yes | Public | Development, Preview, Production |
| Vercel | `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | Yes | Public | Development, Preview, Production |
| Vercel | `NEXT_PUBLIC_SITE_URL` | Yes | Public | Development, Preview, Production |
| Vercel | `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`, `NEXT_PUBLIC_BING_SITE_VERIFICATION` | No | Public | Production |
| Vercel | `RAG_API_URL` | Yes | Server-only | Development, Preview, Production |
| Vercel | `HUBSPOT_ACCESS_TOKEN` | Yes | Secret | Preview and Production |
| Vercel | `HUBSPOT_DEAL_PIPELINE_ID`, `HUBSPOT_DEAL_STAGE_ID`, `HUBSPOT_TICKET_PIPELINE_ID`, `HUBSPOT_TICKET_STAGE_ID` | Yes | Server-only | Preview and Production |
| Vercel | `HUBSPOT_CONVERSATION_PROPERTY` | No | Server-only | Preview and Production |
| Vercel | `ENABLE_*`, `RATE_LIMIT_*`, `MIN_SECONDS_*` | No | Server-only | Preview and Production |
| Railway RAG | `OPENAI_API_KEY`, `PINECONE_API_KEY`, `PINECONE_INDEX_NAME` | Yes | Secret | Railway service |
| Railway RAG | `OPENAI_MODEL`, `OPENAI_MAX_TOKENS`, `WEB_SCRAPING_URL` | No | Server-only | Railway service |
| Railway Contact | `SENDGRID_API_KEY`, `SENDGRID_FROM_EMAIL`, `BUSINESS_EMAIL` | Yes | Secret/server-only | Railway service |
| Railway Contact | `RECAPTCHA_SECRET_KEY`, `RECAPTCHA_MIN_SCORE` | Yes | Secret/server-only | Railway service |

Copy the sanitized templates and fill in local values:

```bash
cp frontend/env.example frontend/.env.local
cp rag-api/env.example rag-api/.env
cp contact-server/env.example contact-server/.env
```

Configure the same variable names in the owning Vercel or Railway project. Use distinct Vercel Development, Preview, and Production values. Changing a Vercel variable only affects new deployments, so redeploy after every configuration change. Any real credential previously committed to Git must be rotated; deleting the file does not remove it from repository history.

The chat CRM synchronization expects a unique text property named `kdh_conversation_id` on both HubSpot deals and tickets. It uses that identifier to update the same records as a conversation develops. Set `HUBSPOT_CONVERSATION_PROPERTY` only if the HubSpot internal property name differs.

### Installation

1. **Install Dependencies**
```bash
# Frontend
cd frontend
npm install

# RAG API
cd ../rag-api
npm install

# Contact server
cd ../contact-server
npm install
```

2. **Setup Environment** using the template commands above.

3. **Setup Enhanced RAG System**
```bash
cd rag-api
npm run setup
# This will:
# - Populate Pinecone with sample documents
# - Process local documents (PDF, DOCX, HTML, MD, TXT)
# - Scrape website content (optional)
# - Set up the complete knowledge base
```

### Development

1. **Start the Frontend**
```bash
cd frontend
npm run dev
# Runs on http://localhost:3000
```

2. **Start the RAG API**
```bash
cd rag-api
npm start
# Runs on http://localhost:3001
```

3. **Start the Contact Server**
```bash
cd contact-server
npm run dev
# Runs on http://localhost:8081
```

4. **Available RAG API Scripts**
```bash
cd rag-api

# Development with auto-reload
npm run dev

# Populate Pinecone with sample documents only
npm run populate

# Process local documents (PDF, DOCX, HTML, MD, TXT)
npm run process-docs

# Scrape website content and add to knowledge base
npm run scrape-web

# Test API connections
npm test

# Complete setup (recommended for first time)
npm run setup
```

## 📁 Project Structure

```
kingdom-design-house/
├── frontend/                    # Next.js application
│   ├── components/             # React components
│   │   ├── Atoms/              # Basic UI elements
│   │   │   ├── PhoneIcon.js    # Phone SVG icon
│   │   │   └── EmailIcon.js    # Email SVG icon
│   │   ├── Molecules/          # Simple components
│   │   │   ├── GroupHeading.js # Group page headings
│   │   │   └── MobileToggle.js # Mobile menu toggle
│   │   ├── Organisms/          # Complex components
│   │   │   ├── WebStrategy.js  # 6-step process timeline
│   │   │   └── ServiceContent.js # Service page template
│   │   ├── Navbar.js           # Main navigation
│   │   ├── navBarGroup.js      # Group-specific navigation
│   │   ├── ChatInterface.js    # AI chat interface
│   │   └── Layout.js           # Page layout wrapper
│   ├── pages/                  # Next.js pages
│   │   ├── web-group/          # Web group pages
│   │   ├── network-group/      # Network group pages
│   │   ├── ai-group/           # AI group pages
│   │   └── services/           # Service pages
│   ├── styles/                 # SCSS stylesheets
│   │   ├── variables.scss      # Design system variables
│   │   ├── grid.scss           # Flexbox grid system
│   │   └── components/         # Component-specific styles
│   ├── data/                   # Static data
│   │   ├── siteData.js         # Global site data
│   │   └── navbarData.js       # Navigation data
│   ├── contexts/               # React Context providers
│   └── lib/                    # Utility functions
├── rag-api/                    # RAG API server
│   ├── routes/                 # API routes
│   │   └── chat.js             # Main chat handler
│   ├── services/               # API services
│   │   ├── openai.js           # OpenAI integration
│   │   ├── pinecone.js         # Pinecone vector search
│   │   └── hubspot.js          # HubSpot CRM integration
│   ├── lib/                    # Configuration
│   │   └── config.js           # Environment config
│   ├── scripts/                # Utility scripts
│   │   ├── populate-index.js    # Pinecone data population
│   │   ├── process-documents.js # Document processing (PDF, DOCX, HTML, MD, TXT)
│   │   ├── web-content-scraper.js # Website content scraping
│   │   └── setup-enhanced-rag.js # Complete RAG system setup
│   ├── data/                   # Sample documents
│   └── server.js              # Express server
├── netlify/                    # Netlify functions
│   └── functions/              # Serverless functions
│       └── chat-jarvis.js     # Chat proxy function
├── utils/                      # Shared utilities
├── scripts/                    # Setup scripts
│   └── setup.sh               # Automated setup
└── SETUP_INSTRUCTIONS.md      # Detailed setup guide
```

## 🎨 Design System

### Colors
- **Primary Black**: #1a1a1a
- **Primary Dark Gray**: #2d2d2d
- **Primary Yellow**: #ffd700
- **Primary White**: #ffffff
- **Primary Cream**: #f5f5f0

### Typography
- **Primary Font**: Inter
- **Script Font**: Dancing Script
- **BEM Methodology**: Block__Element--Modifier

### Grid System
- **Flexbox-based**: 12-column grid
- **Responsive**: Mobile-first approach
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)

### Component Architecture
- **Atomic Design**: Atoms → Molecules → Organisms
- **BEM Naming**: Consistent CSS class naming
- **SCSS Modules**: Component-scoped styles
- **Responsive Design**: Mobile-first approach

## 🤖 AI Chat System

### Data Flow
1. User sends message to `/api/chat`
2. RAG API searches Pinecone for relevant documents
3. GPT-4o generates response with context
4. Structured information extracted from user input
5. Lead information captured in HubSpot CRM
6. Response returned to frontend

### Lead Capture Features
- **Name Extraction**: Regex patterns for first/last name detection
- **Contact Information**: Email and phone number extraction
- **Service Classification**: Automatic service categorization
- **Budget Detection**: Budget range identification
- **Keyword Extraction**: Conversation keyword capture
- **HubSpot Integration**: Automatic contact, deal, and ticket creation

### Enhanced RAG System
The system includes multiple knowledge sources:

#### **Sample Documents** (`rag-api/data/sample-documents.json`)
- Web development services
- IT services & networking
- AI solutions
- Pricing information
- Company process
- Contact information

#### **Document Processing** (`npm run process-docs`)
- **PDF Documents**: Extract text from PDF files
- **DOCX Files**: Process Word documents
- **HTML Files**: Parse HTML content
- **Markdown Files**: Process MD documentation
- **Text Files**: Plain text processing
- **Automatic Chunking**: Intelligent text segmentation
- **Metadata Extraction**: Document properties and context

#### **Website Scraping** (`npm run scrape-web`)
- **Live Content**: Scrape current website content
- **Dynamic URLs**: Auto-detect localhost vs production
- **Memory Optimized**: Efficient processing for large sites
- **Content Filtering**: Extract relevant business information
- **Batch Processing**: Handle multiple pages efficiently

#### **Complete Setup** (`npm run setup`)
- **One-Command Setup**: Automated knowledge base creation
- **Multi-Source Integration**: Combines all knowledge sources
- **Pinecone Population**: Vector database setup
- **Error Handling**: Graceful failure management
- **Progress Tracking**: Real-time setup monitoring

## 🚀 Deployment

### Vercel Preview and Production

1. Import this Git repository into Vercel and set the project **Root Directory** to `frontend`.
2. Keep framework detection set to Next.js and use Node.js 18 or newer. No custom build or output directory is required.
3. Add the Vercel-owned variables from the table to Development, Preview, and Production as appropriate.
4. Deploy the updated Railway RAG API first. It must honor `skipLeadCreation` before Vercel serves chat traffic, otherwise both services can write the same lead to HubSpot.
5. Push a non-production branch and validate its Preview deployment before promoting the same revision to Production.
6. Test `/api/chat`, `/api/send-lead`, the contact form, 404 handling, sitemap, robots file, and trailing-slash URLs. Review Function logs for RAG or HubSpot failures.
7. Add `kingdomdesignhouse.com` and `www.kingdomdesignhouse.com` to the Vercel project. Set the apex as primary and configure `www` to redirect to it; Vercel manages HTTPS.

### Domain Cutover and Rollback

1. Record the current Netlify DNS records and lower their TTL before cutover.
2. Validate the Vercel production URL, then apply only the DNS records Vercel requests.
3. Confirm HTTPS, the apex/`www` redirect, page navigation, chat, contact submission, and HubSpot lead creation.
4. Keep Netlify deployed during the observation window. If a critical check fails, restore the recorded DNS records and investigate using Vercel Function logs.
5. Remove `netlify.toml`, `netlify/functions`, and the Netlify site only after the observation window succeeds. They intentionally remain in this repository for rollback during migration.

The RAG API and contact server remain on Railway. Their health endpoints should be checked before each Vercel promotion.

## 📝 API Endpoints

### RAG API
- `POST /api/chat` - Process chat messages with AI
- `GET /health` - Health check endpoint

### Vercel Functions
- `POST /api/chat` - Chat proxy, bot protection, and optional lead capture
- `POST /api/send-lead` - Direct HubSpot lead creation

## 🔧 Customization

### Adding New Services
1. Update `rag-api/data/sample-documents.json`
2. Add new service cards in `OurGroups` component
3. Update structured info extraction in OpenAI service
4. Create new service pages in `frontend/pages/services/`

### Styling Changes
1. Modify SCSS variables in `frontend/styles/variables.scss`
2. Update component-specific styles
3. Follow BEM methodology for consistency

### HubSpot Integration
1. Create custom properties in HubSpot
2. Update property mappings in `rag-api/services/hubspot.js`
3. Configure deal stages and pipelines

## 🧪 Testing

### Test Commands
```bash
# Test RAG API
curl -X POST http://localhost:3001/api/chat \
  -H "Content-Type: application/json" \
  -d '{"query": "Hi, I need help with web development"}'

# Test API connections
cd rag-api
npm test

# Test Pinecone Connection
cd rag-api
npm run populate

# Test document processing
cd rag-api
npm run process-docs

# Test website scraping
cd rag-api
npm run scrape-web

# Complete system test
cd rag-api
npm run setup
```

## 📞 Support

For questions or support, contact:
- **Email**: info@kingdomdesignhouse.com
- **Phone**: 347.927.8846

## 📄 License

MIT License - see LICENSE file for details.

## 🔄 Recent Updates

### v2.1.0 - Enhanced RAG System & Lead Capture Fixes
- ✅ **Enhanced RAG System**: Complete document processing pipeline
- ✅ **Document Processing**: PDF, DOCX, HTML, MD, TXT support
- ✅ **Website Scraping**: Live content extraction with memory optimization
- ✅ **Fixed Service Detection**: Correctly identifies networking vs web development
- ✅ **Fixed Name Extraction**: Properly extracts user names from conversations
- ✅ **Fixed Budget Detection**: Avoids misinterpreting office sizes as budget
- ✅ **Enhanced Debug Logging**: Comprehensive troubleshooting information
- ✅ **Memory Optimization**: Efficient processing for large content
- ✅ **One-Command Setup**: Automated knowledge base creation

### v2.0.0 - Enhanced AI & CRM Integration
- ✅ Refactored chat handler with helper functions
- ✅ Enhanced lead capture with name extraction
- ✅ Improved HubSpot integration (Contacts, Deals, Tickets)
- ✅ Added keyword extraction for better lead qualification
- ✅ Implemented graceful fallback for AI service failures
- ✅ Added group-specific navigation and pages
- ✅ Created atomic design component structure
- ✅ Enhanced mobile responsiveness
- ✅ Added service-specific landing pages

### Key Features Added
- **Enhanced RAG System**: Multi-source knowledge base with document processing
- **Fixed Lead Capture**: Accurate service detection and name extraction
- **Structured Lead Capture**: Automatic extraction of contact details
- **HubSpot CRM Integration**: Full pipeline management
- **Group-Specific Pages**: Dynamic routing for service groups
- **Mobile-First Design**: Responsive component architecture
- **AI Fallback Handling**: Graceful degradation when services unavailable
# Contact Form Deployment - Wed Oct 15 17:25:09 EDT 2025
# Force deployment - Wed Oct 22 12:25:21 EDT 2025
# Redeploy after billing resolution - Wed Oct 22 12:50:44 EDT 2025
