require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { initializePinecone, upsertDocument } = require('../services/pinecone');

async function populateIndex() {
  try {
    console.log('Initializing Pinecone...');
    await initializePinecone();
    
    console.log('Loading sample documents...');
    const sampleDataPath = path.join(__dirname, '../data/sample-documents.json');
    const sampleDocuments = JSON.parse(fs.readFileSync(sampleDataPath, 'utf8'));
    
    console.log(`Found ${sampleDocuments.length} documents to upload`);
    
    for (const doc of sampleDocuments) {
      console.log(`Uploading document: ${doc.id}`);
      await upsertDocument(doc.id, doc.content, {
        title: doc.title,
        category: doc.category,
        tags: doc.tags.join(', ')
      });
    }
    
    console.log('✅ Successfully populated Pinecone index with sample documents');
    
  } catch (error) {
    console.error('❌ Error populating index:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  populateIndex();
}

module.exports = populateIndex;