# Enhanced RAG System Documentation

## Overview

The Enhanced RAG (Retrieval-Augmented Generation) system provides comprehensive document processing and knowledge management capabilities for Kingdom Design House. This system goes beyond basic sample documents to include PDF processing, web content scraping, and intelligent document chunking.

## Features

### 📄 Document Processing
- **PDF Support**: Extract text from PDF documents
- **DOCX Support**: Process Microsoft Word documents
- **HTML Processing**: Extract content from HTML files
- **Markdown Support**: Process Markdown documentation
- **Text Files**: Handle plain text documents

### 🌐 Web Content Scraping
- **Website Scraping**: Automatically scrape website content
- **Service Pages**: Extract information from service pages
- **Dynamic Content**: Process JavaScript-rendered content
- **Content Filtering**: Intelligent content extraction

### 🧠 Intelligent Chunking
- **Smart Segmentation**: Break documents into optimal chunks
- **Context Preservation**: Maintain context across chunks
- **Overlap Management**: Ensure continuity between chunks
- **Metadata Enrichment**: Add rich metadata to each chunk

### 🔍 Advanced Search
- **Vector Similarity**: Semantic search using embeddings
- **Metadata Filtering**: Filter by category, tags, and source
- **Relevance Scoring**: Rank results by relevance
- **Context Retrieval**: Retrieve relevant context for responses

## Quick Start

### 1. Initial Setup

```bash
# Install dependencies
npm install

# Set up environment variables
cp env.example .env
# Edit .env with your API keys

# Run the enhanced setup
npm run setup
```

### 2. Add Documents

Place your documents in the appropriate directories:

```
rag-api/data/
├── documents/          # Company documents, policies, procedures
├── guides/            # User guides, tutorials, how-to docs
└── technical/         # API docs, specifications, technical info
```

### 3. Process Documents

```bash
# Process all documents
npm run process-docs

# Scrape website content
npm run scrape-web

# Run complete setup
npm run setup
```

## Directory Structure

```
rag-api/
├── data/
│   ├── documents/          # Company documents
│   │   ├── policies.pdf
│   │   ├── procedures.docx
│   │   └── README.md
│   ├── guides/            # User guides
│   │   ├── setup-guide.md
│   │   ├── troubleshooting.pdf
│   │   └── README.md
│   ├── technical/         # Technical documentation
│   │   ├── api-docs.md
│   │   ├── specifications.pdf
│   │   └── README.md
│   └── sample-documents.json
├── services/
│   ├── documentProcessor.js    # Document processing service
│   ├── pinecone.js            # Vector database service
│   └── openai.js              # AI service
├── scripts/
│   ├── setup-enhanced-rag.js  # Complete setup script
│   ├── process-documents.js   # Document processing script
│   ├── web-content-scraper.js # Website scraping script
│   └── populate-index.js      # Basic population script
└── routes/
    └── chat.js                # Chat API endpoint
```

## Document Processing

### Supported File Types

| File Type | Extension | Description |
|-----------|-----------|-------------|
| PDF | `.pdf` | Business documents, reports, specifications |
| Word | `.docx` | Documents, procedures, guides |
| HTML | `.html`, `.htm` | Web pages, documentation |
| Text | `.txt` | Plain text documents, notes |
| Markdown | `.md` | Documentation, README files |

### Processing Options

```javascript
const options = {
  chunkSize: 1000,        // Maximum characters per chunk
  overlap: 200,           // Character overlap between chunks
  category: 'documents',  // Document category
  tags: ['important'],    // Document tags
  recursive: true         // Process subdirectories
};
```

### Chunking Strategy

The system uses intelligent chunking to maintain context:

1. **Sentence Boundary Detection**: Breaks at sentence endings when possible
2. **Context Preservation**: Maintains overlapping content between chunks
3. **Size Optimization**: Balances chunk size with context preservation
4. **Metadata Enrichment**: Adds source, category, and tag information

## Web Content Scraping

### Configuration

The web scraper is configured to scrape:

- **Main Pages**: Home, About, Pricing, Service Groups
- **Service Pages**: Individual service descriptions
- **Dynamic Content**: JavaScript-rendered content
- **Structured Data**: Metadata and structured information

### Scraping Process

1. **URL Discovery**: Automatically discovers relevant pages
2. **Content Extraction**: Extracts meaningful content from HTML
3. **Noise Filtering**: Removes navigation, ads, and irrelevant content
4. **Chunking**: Breaks content into searchable chunks
5. **Metadata Addition**: Adds source URL and timestamp information

## API Usage

### Chat Endpoint

```javascript
const response = await fetch('/api/chat', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: JSON.stringify({
    query: 'What are your web development services?',
    conversationHistory: []
  })
});

const data = await response.json();
console.log(data.response);
```

### Search Endpoint

```javascript
const response = await fetch('/api/search', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: JSON.stringify({
    query: 'network setup',
    filters: {
      category: 'technical',
      tags: ['network', 'setup']
    }
  })
});
```

## Configuration

### Environment Variables

```bash
# Pinecone Configuration
PINECONE_API_KEY=your_pinecone_api_key
PINECONE_INDEX_NAME=kingdom-design-house

# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key
OPENAI_MODEL=gpt-4o

# Web Scraping Configuration
WEB_SCRAPING_ENABLED=true
WEB_BASE_URL=https://kingdomdesignhouse.com

# Document Processing Configuration
DEFAULT_CHUNK_SIZE=1000
DEFAULT_OVERLAP=200
MAX_CHUNK_SIZE=2000
```

### Processing Configuration

```javascript
// Document processing settings
const DOCUMENT_CONFIG = {
  chunkSize: 1000,
  overlap: 200,
  maxChunkSize: 2000,
  minChunkSize: 100,
  supportedExtensions: ['.pdf', '.docx', '.html', '.txt', '.md']
};

// Web scraping settings
const WEB_CONFIG = {
  baseUrl: 'https://kingdomdesignhouse.com',
  timeout: 10000,
  retries: 3,
  chunkSize: 800,
  overlap: 150
};
```

## Scripts Reference

### Setup Scripts

```bash
# Complete enhanced setup
npm run setup

# Process documents only
npm run process-docs

# Scrape website only
npm run scrape-web

# Basic population (sample documents only)
npm run populate
```

### Script Options

```bash
# Setup with options
npm run setup -- --no-website --no-clear

# Process documents with verbose output
npm run process-docs -- --verbose

# Scrape custom URL
npm run scrape-web -- --url https://staging.kingdomdesignhouse.com
```

## Best Practices

### Document Organization

1. **Use Descriptive Filenames**: Include version numbers and dates
2. **Organize by Category**: Use subdirectories for different document types
3. **Include Metadata**: Add relevant tags and categories
4. **Keep Content Current**: Regularly update documents

### Content Quality

1. **Clear Structure**: Use headings and bullet points
2. **Consistent Formatting**: Maintain consistent style
3. **Relevant Keywords**: Include important terms and phrases
4. **Complete Information**: Provide comprehensive details

### Performance Optimization

1. **Appropriate Chunk Sizes**: Balance context with performance
2. **Regular Updates**: Keep the knowledge base current
3. **Quality Control**: Review processed content for accuracy
4. **Monitoring**: Track search performance and user feedback

## Troubleshooting

### Common Issues

#### Document Processing Fails

```bash
# Check file permissions
ls -la rag-api/data/documents/

# Verify file format support
file document.pdf

# Check processing logs
npm run process-docs -- --verbose
```

#### Web Scraping Issues

```bash
# Test website accessibility
curl -I https://kingdomdesignhouse.com

# Check scraping configuration
npm run scrape-web -- --dry-run

# Verify network connectivity
ping kingdomdesignhouse.com
```

#### Search Quality Issues

```bash
# Validate index content
npm run populate

# Test search queries
curl -X POST http://localhost:3001/api/chat \
  -H "Content-Type: application/json" \
  -d '{"query": "test query"}'
```

### Performance Issues

1. **Large Documents**: Break into smaller files
2. **Too Many Chunks**: Increase chunk size
3. **Slow Processing**: Check API rate limits
4. **Memory Issues**: Process documents in batches

## Monitoring and Maintenance

### Regular Tasks

1. **Weekly**: Review new documents and add to system
2. **Monthly**: Update website content via scraping
3. **Quarterly**: Review and optimize chunk sizes
4. **Annually**: Audit and clean up outdated content

### Performance Monitoring

```javascript
// Monitor search performance
const searchMetrics = {
  averageResponseTime: 150, // ms
  successRate: 0.98,
  topResultsRelevance: 0.92
};

// Monitor document processing
const processingMetrics = {
  documentsProcessed: 150,
  averageProcessingTime: 2.5, // seconds
  errorRate: 0.02
};
```

## Security Considerations

### Data Protection

1. **API Key Security**: Store keys in environment variables
2. **Content Filtering**: Remove sensitive information before processing
3. **Access Control**: Implement proper authentication
4. **Audit Logging**: Log all document processing activities

### Privacy Compliance

1. **Data Minimization**: Only process necessary content
2. **Retention Policies**: Implement data retention limits
3. **User Consent**: Obtain consent for data processing
4. **Right to Deletion**: Implement data deletion capabilities

## Support and Resources

### Documentation
- **API Reference**: `/docs/api`
- **Integration Guides**: `/docs/integrations`
- **Code Examples**: `/examples`

### Contact
- **Email**: info@kingdomdesignhouse.com
- **Phone**: 347.927.8846
- **Support Hours**: Monday - Friday, 9 AM - 6 PM EST

### Community
- **GitHub Issues**: Report bugs and request features
- **Discord**: Join our developer community
- **Blog**: Latest updates and tutorials

---

*This enhanced RAG system provides a robust foundation for intelligent document processing and knowledge management. For additional support or customization needs, please contact our development team.*