// Railway deployment entry point
// This file redirects to the actual RAG API server

const path = require('path');

// Change to rag-api directory and start the server
process.chdir(path.join(__dirname, 'rag-api'));

// Import and start the RAG API server
require('./rag-api/server.js');