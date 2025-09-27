const { Pinecone } = require('@pinecone-database/pinecone');

let pineconeClient = null;

async function initializePinecone() {
  if (pineconeClient) {
    return pineconeClient;
  }

  const apiKey = process.env.PINECONE_API_KEY;
  const indexName = process.env.PINECONE_INDEX_NAME || 'kingdom-design-house';

  if (!apiKey) {
    throw new Error('PINECONE_API_KEY environment variable is required');
  }

  try {
    pineconeClient = new Pinecone({
      apiKey: apiKey
    });

    // Test the connection
    const index = pineconeClient.index(indexName);
    const stats = await index.describeIndexStats();
    
    console.log('Pinecone connected successfully');
    console.log('Index stats:', stats);
    
    return pineconeClient;
  } catch (error) {
    console.error('Failed to initialize Pinecone:', error);
    throw error;
  }
}

async function searchSimilarDocuments(query, topK = 5) {
  if (!pineconeClient) {
    await initializePinecone();
  }

  const indexName = process.env.PINECONE_INDEX_NAME || 'kingdom-design-house';
  const index = pineconeClient.index(indexName);

  try {
    // Generate embedding for the query
    const { generateEmbedding } = require('./openai');
    const queryEmbedding = await generateEmbedding(query);

    // Search for similar documents
    const searchResponse = await index.query({
      vector: queryEmbedding,
      topK: topK,
      includeMetadata: true,
      includeValues: false
    });

    return searchResponse.matches || [];
  } catch (error) {
    console.error('Error searching Pinecone:', error);
    throw error;
  }
}

async function upsertDocument(id, text, metadata = {}) {
  if (!pineconeClient) {
    await initializePinecone();
  }

  const indexName = process.env.PINECONE_INDEX_NAME || 'kingdom-design-house';
  const index = pineconeClient.index(indexName);

  try {
    // Generate embedding for the document
    const { generateEmbedding } = require('./openai');
    const embedding = await generateEmbedding(text);

    // Upsert the document
    await index.upsert([{
      id: id,
      values: embedding,
      metadata: {
        text: text,
        ...metadata
      }
    }]);

    console.log(`Document ${id} upserted successfully`);
  } catch (error) {
    console.error('Error upserting document:', error);
    throw error;
  }
}

module.exports = {
  initializePinecone,
  searchSimilarDocuments,
  upsertDocument
};