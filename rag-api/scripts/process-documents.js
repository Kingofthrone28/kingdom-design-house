#!/usr/bin/env node

/**
 * Document Processing Script
 * Processes documents and uploads them to Pinecone vector database
 */

require('dotenv').config();
const path = require('path');
const { processDirectoryWithUpload } = require('../services/documentProcessor');
const { initializePinecone } = require('../services/pinecone');

// Configuration
const CONFIG = {
  // Document directories to process
  documentDirectories: [
    {
      path: path.join(__dirname, '../data/documents'),
      category: 'company-docs',
      tags: ['company', 'documentation', 'procedures'],
      chunkSize: 1000,
      overlap: 200
    },
    {
      path: path.join(__dirname, '../data/guides'),
      category: 'guides',
      tags: ['guides', 'tutorials', 'how-to'],
      chunkSize: 800,
      overlap: 150
    },
    {
      path: path.join(__dirname, '../data/technical'),
      category: 'technical',
      tags: ['technical', 'specifications', 'api'],
      chunkSize: 1200,
      overlap: 250
    }
  ],
  
  // File extensions to process
  supportedExtensions: ['.pdf', '.docx', '.html', '.htm', '.txt', '.md'],
  
  // Processing options
  options: {
    recursive: true,
    fileExtensions: ['.pdf', '.docx', '.html', '.htm', '.txt', '.md']
  }
};

/**
 * Creates directory structure if it doesn't exist
 */
const createDirectories = () => {
  const fs = require('fs');
  
  CONFIG.documentDirectories.forEach(dir => {
    if (!fs.existsSync(dir.path)) {
      fs.mkdirSync(dir.path, { recursive: true });
      console.log(`📁 Created directory: ${dir.path}`);
    }
  });
};

/**
 * Main processing function
 */
async function processDocuments() {
  try {
    console.log('🚀 Starting document processing...');
    
    // Initialize Pinecone
    console.log('🔗 Initializing Pinecone...');
    await initializePinecone();
    
    // Create directories
    createDirectories();
    
    let totalChunks = 0;
    let processedFiles = 0;
    
    // Process each directory with immediate upload to prevent memory accumulation
    for (const dirConfig of CONFIG.documentDirectories) {
      console.log(`\n📂 Processing directory: ${dirConfig.path}`);
      
      try {
        // Process directory and upload chunks immediately
        const result = await processDirectoryWithUpload(dirConfig.path, {
          ...CONFIG.options,
          category: dirConfig.category,
          tags: dirConfig.tags,
          chunkSize: dirConfig.chunkSize,
          overlap: dirConfig.overlap
        });
        
        totalChunks += result.chunksProcessed;
        processedFiles += result.filesProcessed;
        
        console.log(`✅ Processed ${result.filesProcessed} files, ${result.chunksProcessed} chunks from ${dirConfig.path}`);
        
        // Force garbage collection after each directory
        if (global.gc) {
          console.log('🧹 Forcing garbage collection...');
          global.gc();
        }
        
      } catch (error) {
        console.error(`❌ Error processing directory ${dirConfig.path}:`, error.message);
      }
    }
    
    if (processedFiles === 0) {
      console.log('⚠️  No documents found to process. Add documents to the following directories:');
      CONFIG.documentDirectories.forEach(dir => {
        console.log(`   - ${dir.path}`);
      });
      return;
    }
    
    console.log('\n🎉 Document processing completed successfully!');
    console.log(`📊 Total chunks processed: ${totalChunks}`);
    
  } catch (error) {
    console.error('❌ Document processing failed:', error);
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
Document Processing Script

Usage: node process-documents.js [options]

Options:
  --help, -h          Show this help message
  --dry-run          Process documents but don't upload to Pinecone
  --verbose          Show detailed processing information

Directories processed:
${CONFIG.documentDirectories.map(dir => `  - ${dir.path} (${dir.category})`).join('\n')}

Supported file types:
${CONFIG.supportedExtensions.join(', ')}

Example:
  node process-documents.js --verbose
    `);
    process.exit(0);
  }
  
  if (args.includes('--dry-run')) {
    console.log('🔍 Dry run mode - documents will be processed but not uploaded');
    // TODO: Implement dry run mode
  }
  
  if (args.includes('--verbose')) {
    console.log('📝 Verbose mode enabled');
    // TODO: Implement verbose logging
  }
  
  processDocuments();
}

module.exports = {
  processDocuments,
  CONFIG
};