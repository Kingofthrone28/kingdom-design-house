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
    // Step 1: Create Contact first (required for associations)
    const contactResult = await createHubSpotContact(leadData.contact);
    if (!contactResult.success) {
      results.errors.push(`Contact creation failed: ${contactResult.error}`);
      return results;
    }
    results.contact = contactResult.data;

    // Step 2: Define remaining tasks with associations
    const tasks = {
      deal: { 
        fn: createHubSpotDeal, 
        data: leadData.deal, 
        associationTypeId: 3 
      },
      ticket: { 
        fn: createHubSpotTicket, 
        data: leadData.ticket, 
        associationTypeId: 16 
      }
    };

    // Execute remaining tasks in parallel
    const taskResults = await Promise.allSettled(
      Object.entries(tasks).map(([key, task]) => {
        const data = { 
          ...task.data, 
          associations: [{ 
            to: { id: results.contact.id }, 
            types: [{ associationCategory: 'HUBSPOT_DEFINED', associationTypeId: task.associationTypeId }] 
          }] 
        };
        return task.fn(data);
      })
    );

    // Process results in one pass
    Object.entries(tasks).forEach(([key, task], index) => {
      const result = taskResults[index];
      const isSuccess = result.status === 'fulfilled' && result.value.success;
      
      if (isSuccess) {
        results[key] = result.value.data;
      } else {
        const error = result.status === 'rejected' ? result.reason : result.value.error;
        results.errors.push(`${key.charAt(0).toUpperCase() + key.slice(1)} creation failed: ${error}`);
      }
    });

    // Success if contact was created (required) and at least one other object
    results.success = results.contact && (results.deal || results.ticket);
    return results;

  } catch (error) {
    results.errors.push(`Lead creation failed: ${error.message}`);
    return results;
  }
};