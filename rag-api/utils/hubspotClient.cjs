/**
 * HubSpot Client for Netlify Functions
 * CommonJS version
 */

const httpClient = require('./httpClient.cjs');

const HUBSPOT_BASE_URL = 'https://api.hubapi.com';

/**
 * Builds standard HubSpot request headers.
 * @returns {object} Headers object.
 */
const buildHubSpotHeaders = () => ({
  'Authorization': `Bearer ${process.env.HUBSPOT_ACCESS_TOKEN}`,
  'Content-Type': 'application/json',
});

/**
 * Creates a contact in HubSpot.
 * @param {object} contactData - Data for the contact.
 * @returns {Promise<object>} HubSpot contact response.
 */
const ecreateHubSpotContact = async (contactData) => {
  const url = `${HUBSPOT_BASE_URL}/crm/v3/objects/contacts`;
  const payload = { properties: contactData };
  return await httpClient(url, {
    method: 'POST',
    headers: buildHubSpotHeaders(),
    body: payload,
  });
};

/**
 * Creates a deal in HubSpot.
 * @param {object} dealData - Data for the deal.
 * @returns {Promise<object>} HubSpot deal response.
 */
const createHubSpotDeal = async (dealData) => {
  const url = `${HUBSPOT_BASE_URL}/crm/v3/objects/deals`;
  const payload = { properties: dealData };
  return await httpClient(url, {
    method: 'POST',
    headers: buildHubSpotHeaders(),
    body: payload,
  });
};

/**
 * Creates a ticket in HubSpot.
 * @param {object} ticketData - Data for the ticket.
 * @returns {Promise<object>} HubSpot ticket response.
 */
const createHubSpotTicket = async (ticketData) => {
  const url = `${HUBSPOT_BASE_URL}/crm/v3/objects/tickets`;
  const payload = { properties: ticketData };
  return await httpClient(url, {
    method: 'POST',
    headers: buildHubSpotHeaders(),
    body: payload,
  });
};

module.exports = {
  createHubSpotContact,
  createHubSpotDeal,
  createHubSpotTicket,
};