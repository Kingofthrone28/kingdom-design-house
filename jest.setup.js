// Jest setup file for Kingdom Design House tests

// Mock environment variables
process.env.NODE_ENV = 'test';
process.env.RAG_API_URL = 'http://localhost:3001';
process.env.URL = 'http://localhost:8888';

// Mock console methods to reduce test output noise
global.console = {
  ...console,
  log: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
  info: jest.fn()
};

// Mock fetch globally
global.fetch = jest.fn();

// Mock Date.now for consistent timestamps in tests
const mockTimestamp = 1704067200000; // 2024-01-01T00:00:00.000Z

// Mock Date.now
global.Date.now = jest.fn(() => mockTimestamp);
