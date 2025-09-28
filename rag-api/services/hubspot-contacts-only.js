const axios = require('axios');
const { createHubSpotContact } = require('../utils/index.cjs');

let hubspotClient = null;

const initializeHubSpot =() => {
  if (hubspotClient) return hubspotClient;

  const accessToken = process.env.HUBSPOT_ACCESS_TOKEN;
  const portalId = process.env.HUBSPOT_PORTAL_ID;

  if (!accessToken) {
    throw new Error('HUBSPOT_ACCESS_TOKEN environment variable is required');
  }

  if (!portalId) {
    throw new Error('HUBSPOT_PORTAL_ID environment variable is required');
  }

  hubspotClient = {
    accessToken,
    portalId,
    baseUrl: 'https://api.hubapi.com'
  };

  console.log('HubSpot client initialized successfully');
  return hubspotClient;
}

async function createContact(contactData) {
  if (!hubspotClient) { initializeHubSpot();}

  try {
    // Use centralized HTTP client
    const result = await createHubSpotContact({
      email: contactData.email,
      firstname: contactData.first_name,
      lastname: contactData.last_name,
      phone: contactData.phone,
      company: contactData.company,
      website: contactData.website
    });

    if (result.success) {
      console.log(`✅ Contact created successfully: ${result.data.id}`);
      return result.data;
    } else {
      throw new Error(result.error?.message || 'Contact creation failed');
    }
  } catch (error) {
    console.error('❌ Error creating contact:', error.message);
    throw error;
  }
}

async function createLead(leadData) {
  if (!hubspotClient) {
    initializeHubSpot();
  }

  try {
    // Create contact only (no deals for now)
    const contact = await createContact(leadData);
    
    console.log(`🎉 Lead created in HubSpot!`);
    console.log(`Contact ID: ${contact.id}`);
    console.log(`Name: ${leadData.first_name} ${leadData.last_name}`);
    console.log(`Email: ${leadData.email}`);
    console.log(`Company: ${leadData.company}`);
    console.log(`Service: ${leadData.service_requested || 'Not specified'}`);

    return {
      contact,
      success: true
    };

  } catch (error) {
    console.error('❌ Error creating lead:', error);
    throw error;
  }
}

async function testConnection() {
  if (!hubspotClient) {
    initializeHubSpot();
  }

  try {
    const { httpClient } = require('../utils/index.cjs');
    const result = await httpClient(
      `${hubspotClient.baseUrl}/crm/v3/objects/contacts`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${hubspotClient.accessToken}`,
          'Content-Type': 'application/json'
        },
        params: { limit: 1 }
      }
    );

    if (result.success) {
      console.log('✅ HubSpot connection successful!');
      console.log(`Found ${result.data.total} contacts in your account`);
      return true;
    } else {
      console.error('❌ HubSpot connection failed:', result.error);
      return false;
    }
  } catch (error) {
    console.error('❌ HubSpot connection failed:', error.message);
    return false;
  }
}

module.exports = {
  initializeHubSpot,
  createContact,
  createLead,
  testConnection
};