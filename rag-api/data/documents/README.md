# Company Documents

This directory contains company documents that will be processed and added to the RAG system.

## Supported File Types

- **PDF** (.pdf) - Business documents, proposals, contracts
- **DOCX** (.docx) - Word documents, specifications, reports
- **HTML** (.html, .htm) - Web pages, documentation
- **Text** (.txt) - Plain text documents, notes
- **Markdown** (.md) - Documentation, guides, README files

## Document Categories

### Business Documents
- Company policies and procedures
- Service agreements and contracts
- Business plans and strategies
- Client case studies

### Technical Documentation
- API documentation
- System specifications
- Technical procedures
- Troubleshooting guides

### Marketing Materials
- Service descriptions
- Pricing information
- Case studies
- White papers

## Processing

Documents in this directory will be automatically processed when you run:

```bash
npm run process-docs
```

The system will:
1. Extract text content from each document
2. Split content into manageable chunks
3. Generate embeddings for each chunk
4. Upload to Pinecone vector database

## Best Practices

- Use descriptive filenames
- Include relevant metadata in document titles
- Keep documents up to date
- Organize by category using subdirectories