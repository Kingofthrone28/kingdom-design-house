// Railway deployment entry point
// This file redirects to the actual RAG API server

const path = require('path');
const { spawn } = require('child_process');

// Start the RAG API server
const serverPath = path.join(__dirname, 'rag-api', 'server.js');
const server = spawn('node', [serverPath], {
  stdio: 'inherit',
  cwd: path.join(__dirname, 'rag-api')
});

server.on('error', (err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});

server.on('exit', (code) => {
  console.log(`Server exited with code ${code}`);
  process.exit(code);
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
  server.kill('SIGTERM');
});

process.on('SIGINT', () => {
  server.kill('SIGINT');
});