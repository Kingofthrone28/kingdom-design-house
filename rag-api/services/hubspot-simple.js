const axios = require('axios');

let hubspotClient = null;

function initializeHubSpot() {
  if (hubspotClient) {
    return hubspotClient;
  }

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
  if (!hubspotClient) {
    initializeHubSpot();
  }

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

    console.log(`Contact created successfully: ${response.data.id}`);
    return response.data;
  } catch (error) {
    console.error('Error creating contact:', error.response?.data || error.message);
    throw error;
  }
}

async function createDeal(dealData) {
  if (!hubspotClient) {
    initializeHubSpot();
  }

  try {
    const response = await axios.post(
      `${hubspotClient.baseUrl}/crm/v3/objects/deals`,
      {
        properties: {
          dealname: dealData.deal_name || `${dealData.service_requested} Project`,
          amount: dealData.budget_amount || '0',
          dealstage: 'appointmentscheduled',
          pipeline: 'default'
        }
      },
      {
        headers: {
          'Authorization': `Bearer ${hubspotClient.accessToken}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log(`Deal created successfully: ${response.data.id}`);
    return response.data;
  } catch (error) {
    console.error('Error creating deal:', error.response?.data || error.message);
    throw error;
  }
}

async function createLead(leadData) {
  if (!hubspotClient) {
    initializeHubSpot();
  }

  try {
    // Create contact first
    const contact = await createContact(leadData);
    
    // Create deal if service info is available
    let deal = null;
    if (leadData.service_requested) {
      deal = await createDeal({
        ...leadData,
        contact_id: contact.id,
        deal_name: `${leadData.service_requested} - ${leadData.company || leadData.first_name}`,
        budget_amount: leadData.budget_range || '0'
      });
    }

    return {
      contact,
      deal,
      success: true
    };

  } catch (error) {
    console.error('Error creating lead:', error);
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
  createDeal,
  createLead,
  testConnection
};