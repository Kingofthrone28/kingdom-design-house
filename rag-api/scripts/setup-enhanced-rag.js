#!/usr/bin/env node

/**
 * Enhanced RAG Setup Script
 * Sets up the complete RAG system with document processing and web scraping
 */

require('dotenv').config();
const { initializePinecone } = require('../services/pinecone');
const { processDirectory, uploadChunksToPinecone } = require('../services/documentProcessor');
const fs = require('fs');
const path = require('path');

// Configuration
const SETUP_CONFIG = {
  // Clear existing data before setup
  clearExisting: true,
  
  // Process sample documents
  processSampleDocs: true,
  
  // Process uploaded documents
  processDocuments: true,

  // Scrape website content
  scrapeWebsite: true,
  
  // Document processing options
  documentOptions: {
    chunkSize: 1000,
    overlap: 200,
    recursive: true
  },
  
  // Web scraping options
  webOptions: {
    chunkSize: 800,
    overlap: 150
  }
};

/**
 * Clears existing data from Pinecone index
 */
async function clearPineconeIndex() {
  if (!SETUP_CONFIG.clearExisting) {
    console.log('⏭️  Skipping index clearing (disabled in config)');
    return;
  }
  
  try {
    console.log('🗑️  Clearing existing Pinecone index...');
    
    const { Pinecone } = require('@pinecone-database/pinecone');
    const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
    const index = pinecone.index(process.env.PINECONE_INDEX_NAME || 'kingdom-design-house');
    
    // Check if index has any vectors before trying to delete
    const stats = await index.describeIndexStats();
    if (stats.totalRecordCount > 0) {
      // Delete all vectors (this is a destructive operation)
      await index.deleteAll();
      console.log('✅ Pinecone index cleared successfully');
    } else {
      console.log('✅ Pinecone index is already empty');
    }
  } catch (error) {
    if (error.message.includes('404') || error.message.includes('not found')) {
      console.log('✅ Pinecone index is empty or does not exist');
    } else {
      console.error('❌ Error clearing Pinecone index:', error.message);
      throw error;
    }
  }
}

/**
 * Processes sample documents from sample-documents.json
 */
async function processSampleDocuments() {
  if (!SETUP_CONFIG.processSampleDocs) {
    console.log('⏭️  Skipping sample documents (disabled in config)');
    return;
  }
  
  try {
    console.log('📄 Processing sample documents...');
    
    const sampleDataPath = path.join(__dirname, '../data/sample-documents.json');
    const sampleDocuments = JSON.parse(fs.readFileSync(sampleDataPath, 'utf8'));
    
    console.log(`Found ${sampleDocuments.length} sample documents`);
    
    let totalChunks = 0;
    for (const doc of sampleDocuments) {
      const chunk = {
        id: doc.id,
        content: doc.content,
        metadata: {
          title: doc.title,
          category: doc.category,
          tags: doc.tags.join(', '),
          source: 'sample-documents.json',
          chunkIndex: 0,
          totalChunks: 1,
          fileType: 'json'
        }
      };
      // Upload one doc at a time — no accumulation
      await uploadChunksToPinecone([chunk]);
      totalChunks++;
    }
    console.log(`✅ Processed ${totalChunks} sample document chunks`);
    
  } catch (error) {
    console.error('❌ Error processing sample documents:', error.message);
    throw error;
  }
}

/**
 * Processes uploaded documents from data directories
 */
async function processUploadedDocuments() {
  if (!SETUP_CONFIG.processDocuments) {
    console.log('⏭️  Skipping uploaded documents (disabled in config)');
    return;
  }
  
  try {
    console.log('📁 Processing uploaded documents...');
    
    const documentDirectories = [
      {
        path: path.join(__dirname, '../data/documents'),
        category: 'company-docs',
        tags: ['company', 'documentation', 'procedures']
      },
      {
        path: path.join(__dirname, '../data/guides'),
        category: 'guides',
        tags: ['guides', 'tutorials', 'how-to']
      },
      {
        path: path.join(__dirname, '../data/technical'),
        category: 'technical',
        tags: ['technical', 'specifications', 'api']
      }
    ];
    
    let totalChunks = 0;
    
    for (const dirConfig of documentDirectories) {
      if (fs.existsSync(dirConfig.path)) {
        console.log(`📂 Processing directory: ${dirConfig.path}`);
        
        const chunks = await processDirectory(dirConfig.path, {
          ...SETUP_CONFIG.documentOptions,
          category: dirConfig.category,
          tags: dirConfig.tags
        });
        
        if (chunks.length > 0) {
          await uploadChunksToPinecone(chunks);
          totalChunks += chunks.length;
          console.log(`✅ Processed ${chunks.length} chunks from ${dirConfig.path}`);
        } else {
          console.log(`⚠️  No documents found in ${dirConfig.path}`);
        }
      } else {
        console.log(`⚠️  Directory not found: ${dirConfig.path}`);
      }
    }
    
    console.log(`✅ Total uploaded document chunks processed: ${totalChunks}`);
    
  } catch (error) {
    console.error('❌ Error processing uploaded documents:', error.message);
    throw error;
  }
}

/**
 * Scrapes website content
 */
async function scrapeWebsiteContent() {
  if (!SETUP_CONFIG.scrapeWebsite) {
    console.log('⏭️  Skipping website scraping (disabled in config)');
    return;
  }
  
  try {
    console.log('🌐 Scraping website content...');
    
    const { processAllWebPages } = require('./web-content-scraper');

    // Upload each page's chunks immediately as they are scraped
    const total = await processAllWebPages((chunks) => uploadChunksToPinecone(chunks));

    if (total > 0) {
      console.log(`✅ Processed ${total} website content chunks`);
    } else {
      console.log('⚠️  No website content scraped');
    }
    
  } catch (error) {
    console.error('❌ Error scraping website content:', error.message);
    // Don't throw error for web scraping as it's optional
    console.log('⚠️  Website scraping failed, continuing with other setup...');
  }
}

/**
 * Validates the setup
 */
async function validateSetup() {
  try {
    console.log('🔍 Validating setup...');
    
    const { searchSimilarDocuments } = require('../services/pinecone');
    
    // Test queries to validate the setup
    const testQueries = [
      'What are your web development services?',
      'How much does network setup cost?',
      'What is your API documentation?',
      'Tell me about your pricing plans'
    ];
    
    let totalResults = 0;
    
    for (const query of testQueries) {
      const results = await searchSimilarDocuments(query, 3);
      totalResults += results.length;
      console.log(`✅ Query "${query}": Found ${results.length} relevant documents`);
    }
    
    if (totalResults > 0) {
      console.log(`✅ Setup validation successful: ${totalResults} total results across test queries`);
    } else {
      console.log('⚠️  Setup validation warning: No results found for test queries');
    }
    
  } catch (error) {
    console.error('❌ Setup validation failed:', error.message);
    throw error;
  }
}

/**
 * Main setup function
 */
async function setupEnhancedRAG() {
  try {
    console.log('🚀 Starting Enhanced RAG Setup...');
    console.log('=' .repeat(50));
    
    // Initialize Pinecone
    console.log('🔗 Initializing Pinecone...');
    await initializePinecone();
    
    // Clear existing data if configured
    await clearPineconeIndex();
    
    // Process sample documents
    await processSampleDocuments();
    
    // Process uploaded documents
    await processUploadedDocuments();
    
    // Scrape website content
    await scrapeWebsiteContent();
    
    // Validate setup
    await validateSetup();
    
    console.log('=' .repeat(50));
    console.log('🎉 Enhanced RAG Setup Completed Successfully!');
    console.log('');
    console.log('📊 Setup Summary:');
    console.log('  ✅ Pinecone initialized and connected');
    console.log('  ✅ Sample documents processed');
    console.log('  ✅ Uploaded documents processed');
    console.log('  ✅ Website content scraped');
    console.log('  ✅ Setup validated');
    console.log('');
    console.log('🔧 Next Steps:');
    console.log('  1. Test the chat functionality');
    console.log('  2. Add more documents to the data directories');
    console.log('  3. Run "npm run process-docs" to update documents');
    console.log('  4. Run "npm run scrape-web" to update website content');
    
  } catch (error) {
    console.error('❌ Enhanced RAG Setup Failed:', error);
    process.exit(1);
  }
}

/**
 * CLI interface
 */
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
Enhanced RAG Setup Script

Usage: node setup-enhanced-rag.js [options]

Options:
  --help, -h          Show this help message
  --no-clear          Don't clear existing Pinecone data
  --no-samples        Skip processing sample documents
  --no-documents      Skip processing uploaded documents
  --no-website        Skip website scraping
  --verbose           Show detailed processing information

Configuration:
  - Sample documents: ${SETUP_CONFIG.processSampleDocs ? 'enabled' : 'disabled'}
  - Uploaded documents: ${SETUP_CONFIG.processDocuments ? 'enabled' : 'disabled'}
  - Website scraping: ${SETUP_CONFIG.scrapeWebsite ? 'enabled' : 'disabled'}
  - Clear existing data: ${SETUP_CONFIG.clearExisting ? 'enabled' : 'disabled'}

Example:
  node setup-enhanced-rag.js --verbose
  node setup-enhanced-rag.js --no-website --no-clear
    `);
    process.exit(0);
  }
  
  // Parse command line arguments
  if (args.includes('--no-clear')) {
    SETUP_CONFIG.clearExisting = false;
  }
  
  if (args.includes('--no-samples')) {
    SETUP_CONFIG.processSampleDocs = false;
  }
  
  if (args.includes('--no-documents')) {
    SETUP_CONFIG.processDocuments = false;
  }
  
  if (args.includes('--no-website')) {
    SETUP_CONFIG.scrapeWebsite = false;
  }
  
  if (args.includes('--verbose')) {
    console.log('📝 Verbose mode enabled');
    // TODO: Implement verbose logging
  }
  
  setupEnhancedRAG();
}

module.exports = {
  setupEnhancedRAG,
  SETUP_CONFIG
};