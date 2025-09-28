/**
 * HubSpot API Client Helper
 * Centralized HubSpot API calls
 */

import { httpClients, requestBuilders } from './httpClient.js';

/**
 * HubSpot API Configuration
 */
const HUBSPOT_CONFIG = {
  baseUrl: process.env.HUBSPOT_BASE_URL || 'https://api.hubapi.com',
  accessToken: process.env.HUBSPOT_ACCESS_TOKEN,
  portalId: process.env.HUBSPOT_PORTAL_ID
};

/**
 * Build HubSpot request headers
 * @returns {Object} Headers object
 */
const buildHubSpotHeaders = () => ({
  'Authorization': `Bearer ${HUBSPOT_CONFIG.accessToken}`,
  'Content-Type': 'application/json'
});

/**
 * Create HubSpot Contact
 * @param {Object} contactData - Contact data
 * @returns {Promise<Object>} Response data
 */
export const createHubSpotContact = async (contactData) => {
  const request = requestBuilders.hubspotContact(contactData);
  return await httpClients.hubspot({
    ...request,
    headers: buildHubSpotHeaders()
  });
};

/**
 * Create HubSpot Deal
 * @param {Object} dealData - Deal data
 * @returns {Promise<Object>} Response data
 */
export const createHubSpotDeal = async (dealData) => {
  const request = requestBuilders.hubspotDeal(dealData);
  return await httpClients.hubspot({
    ...request,
    headers: buildHubSpotHeaders()
  });
};

/**
 * Create HubSpot Ticket
 * @param {Object} ticketData - Ticket data
 * @returns {Promise<Object>} Response data
 */
export const createHubSpotTicket = async (ticketData) => {
  const request = requestBuilders.hubspotTicket(ticketData);
  return await httpClients.hubspot({
    ...request,
    headers: buildHubSpotHeaders()
  });
};

/**
 * Get HubSpot Contact by ID
 * @param {string} contactId - Contact ID
 * @returns {Promise<Object>} Response data
 */
export const getHubSpotContact = async (contactId) => {
  return await httpClients.hubspot({
    url: `${HUBSPOT_CONFIG.baseUrl}/crm/v3/objects/contacts/${contactId}`,
    method: 'GET',
    headers: buildHubSpotHeaders()
  });
};

/**
 * Update HubSpot Contact
 * @param {string} contactId - Contact ID
 * @param {Object} updateData - Update data
 * @returns {Promise<Object>} Response data
 */
export const updateHubSpotContact = async (contactId, updateData) => {
  return await httpClients.hubspot({
    url: `${HUBSPOT_CONFIG.baseUrl}/crm/v3/objects/contacts/${contactId}`,
    method: 'PATCH',
    data: updateData,
    headers: buildHubSpotHeaders()
  });
};

/**
 * Search HubSpot Contacts
 * @param {Object} searchCriteria - Search criteria
 * @returns {Promise<Object>} Response data
 */
export const searchHubSpotContacts = async (searchCriteria) => {
  return await httpClients.hubspot({
    url: `${HUBSPOT_CONFIG.baseUrl}/crm/v3/objects/contacts/search`,
    method: 'POST',
    data: searchCriteria,
    headers: buildHubSpotHeaders()
  });
};

/**
 * HubSpot Lead Creation (Contact + Deal + Ticket)
 * @param {Object} leadData - Complete lead data
 * @returns {Promise<Object>} Response data with all created objects
 */
export const createHubSpotLead = async (leadData) => {
  const results = {
    contact: null,
    deal: null,
    ticket: null,
    success: false,
    errors: []
  };

  try {
    // Create Contact
    const contactResponse = await createHubSpotContact(leadData.contact);
    if (contactResponse.success) {
      results.contact = contactResponse.data;
    } else {
      results.errors.push(`Contact creation failed: ${contactResponse.error}`);
    }

    // Create Deal (if contact was successful)
    if (results.contact) {
      const dealResponse = await createHubSpotDeal({
        ...leadData.deal,
        associations: [{ to: { id: results.contact.id }, types: [{ associationCategory: 'HUBSPOT_DEFINED', associationTypeId: 3 }] }]
      });
      if (dealResponse.success) {
        results.deal = dealResponse.data;
      } else {
        results.errors.push(`Deal creation failed: ${dealResponse.error}`);
      }
    }

    // Create Ticket (if contact was successful)
    if (results.contact) {
      const ticketResponse = await createHubSpotTicket({
        ...leadData.ticket,
        associations: [{ to: { id: results.contact.id }, types: [{ associationCategory: 'HUBSPOT_DEFINED', associationTypeId: 16 }] }]
      });
      if (ticketResponse.success) {
        results.ticket = ticketResponse.data;
      } else {
        results.errors.push(`Ticket creation failed: ${ticketResponse.error}`);
      }
    }

    results.success = results.contact && results.deal && results.ticket;
    return results;

  } catch (error) {
    results.errors.push(`Lead creation failed: ${error.message}`);
    return results;
  }
};