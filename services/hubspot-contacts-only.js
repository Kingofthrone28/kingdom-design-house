const axios = require('axios');

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
    // Use only the most basic properties that are guaranteed to exist
    const response = await axios.post(
      `${hubspotClient.baseUrl}/crm/v3/objects/contacts`,
      {
        properties: {
          email: contactData.email,
          firstname: contactData.first_name,
          lastname: contactData.last_name,
          phone: contactData.phone,
          company: contactData.company,
          website: contactData.website
        }
      },
      {
        headers: {
          'Authorization': `Bearer ${hubspotClient.accessToken}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log(`✅ Contact created successfully: ${response.data.id}`);
    return response.data;
  } catch (error) {
    console.error('❌ Error creating contact:', error.response?.data || error.message);
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
    const response = await axios.get(
      `${hubspotClient.baseUrl}/crm/v3/objects/contacts`,
      {
        headers: {
          'Authorization': `Bearer ${hubspotClient.accessToken}`,
          'Content-Type': 'application/json'
        },
        params: {
          limit: 1
        }
      }
    );

    console.log('✅ HubSpot connection successful!');
    console.log(`Found ${response.data.total} contacts in your account`);
    return true;
  } catch (error) {
    console.error('❌ HubSpot connection failed:', error.response?.data || error.message);
    return false;
  }
}

module.exports = {
  initializeHubSpot,
  createContact,
  createLead,
  testConnection
};