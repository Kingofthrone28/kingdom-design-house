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

### Backend Services
- **RAG API**: Express.js server with Pinecone and OpenAI integration
- **HubSpot Integration**: Full CRM integration (Contacts, Deals, Tickets)
- **Netlify Functions**: Serverless API endpoints for production
- **AI Services**: GPT-4o powered responses with structured data extraction

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

#### Frontend (.env.local)
```bash
# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-4o
OPENAI_MAX_TOKENS=1000

# Pinecone Configuration
PINECONE_API_KEY=your_pinecone_api_key_here
PINECONE_ENVIRONMENT=us-east-1-aws
PINECONE_INDEX_NAME=kingdom-design-house

# HubSpot Configuration
HUBSPOT_ACCESS_TOKEN=your_hubspot_access_token_here
HUBSPOT_PORTAL_ID=your_hubspot_portal_id_here
```

#### RAG API (.env)
```bash
# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-4o
OPENAI_MAX_TOKENS=1000

# Pinecone Configuration
PINECONE_API_KEY=your_pinecone_api_key_here
PINECONE_ENVIRONMENT=us-east-1-aws
PINECONE_INDEX_NAME=kingdom-design-house

# HubSpot Configuration
HUBSPOT_ACCESS_TOKEN=your_hubspot_access_token_here
HUBSPOT_PORTAL_ID=your_hubspot_portal_id_here
```

### Installation

1. **Install Dependencies**
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

2. **Setup Environment**
```bash
# Copy environment templates
cp frontend/env.example frontend/.env.local
cp rag-api/env.example rag-api/.env
```

3. **Populate Pinecone Index**
```bash
cd rag-api
node scripts/populate-index.js
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
node server.js
# Runs on http://localhost:3001
```

3. **Test HubSpot Integration**
```bash
cd rag-api
node test-hubspot-complete.js
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
│   │   └── populate-index.js   # Pinecone data population
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

### Knowledge Base
The system includes sample documents covering:
- Web development services
- IT services & networking
- AI solutions
- Pricing information
- Company process
- Contact information

## 🚀 Deployment

### Netlify Deployment
1. Connect your repository to Netlify
2. Set environment variables in Netlify dashboard
3. Deploy automatically on push to main branch

### RAG API Deployment
Deploy the RAG API to your preferred hosting service (Railway, Render, etc.)

## 📝 API Endpoints

### RAG API
- `POST /api/chat` - Process chat messages with AI
- `GET /health` - Health check endpoint

### Netlify Functions
- `POST /.netlify/functions/chat-jarvis` - Chat proxy (production)

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

# Test HubSpot Integration
cd rag-api
node test-hubspot-complete.js

# Test Pinecone Connection
cd rag-api
node scripts/populate-index.js
```

## 📞 Support

For questions or support, contact:
- **Email**: info@kingdomdesignhouse.com
- **Phone**: 347.927.8846

## 📄 License

MIT License - see LICENSE file for details.

## 🔄 Recent Updates

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
- **Structured Lead Capture**: Automatic extraction of contact details
- **HubSpot CRM Integration**: Full pipeline management
- **Group-Specific Pages**: Dynamic routing for service groups
- **Mobile-First Design**: Responsive component architecture
- **AI Fallback Handling**: Graceful degradation when services unavailable