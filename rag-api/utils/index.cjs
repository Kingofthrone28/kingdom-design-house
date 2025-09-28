/**
 * HTTP Client Utilities - CommonJS version
 * Centralized HTTP request helpers for Netlify Functions
 */

const httpClient = require('./httpClient.cjs');
const hubspotClient = require('./hubspotClient.cjs');

module.exports = {
  httpClient,
  ...hubspotClient,
};