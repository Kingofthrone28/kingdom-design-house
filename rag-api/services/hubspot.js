const axios = require('axios');

let hubspotClient = null;

// Request payload builders
const buildContactPayload = (contactData) => ({
  properties: {
    email: contactData.email,
    firstname: contactData.first_name,
    lastname: contactData.last_name,
    phone: contactData.phone,
    company: contactData.company,
    website: contactData.website,
    // Store conversation data in jobtitle field (writable standard property)
    jobtitle: `Service: ${contactData.service_requested || 'Not specified'} | Keywords: ${contactData.conversation_keywords || 'None'}`
  }
});

const buildDealPayload = (dealData) => ({
  properties: {
    dealname: dealData.deal_name || `${dealData.service_requested} Project`,
    amount: dealData.budget_amount || '0',
    closedate: dealData.estimated_delivery_date || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    dealstage: '1998761658', // Using the first valid stage ID from the error message
    pipeline: 'default',
    description: `Service: ${dealData.service_requested || 'Not specified'}\nBudget: ${dealData.budget_range || 'Not specified'}\nTimeline: ${dealData.timeline || 'Not specified'}\nKeywords: ${dealData.conversation_keywords || 'None'}`
  }
});

const buildTicketPayload = (ticketData) => ({
  properties: {
    subject: ticketData.subject || 'Lead Follow-up',
    content: `${ticketData.description}\n\nPriority: ${ticketData.priority_level || 'High'}\nAssigned Team: ${ticketData.assigned_team || 'Sales Team'}\nIssue Type: ${ticketData.issue_type || 'Lead Follow-up'}\nKeywords: ${ticketData.conversation_keywords || 'None'}`,
    hs_ticket_priority: ticketData.priority_level || 'HIGH',
    hs_pipeline_stage: '1'
  }
});

const buildRequestHeaders = () => ({
  'Authorization': `Bearer ${hubspotClient.accessToken}`,
  'Content-Type': 'application/json'
});

// Initialize HubSpot client
const initializeHubSpot = () => {
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
};

// Create contact in HubSpot
const createContact = async (contactData) => {
  if (!initializeHubSpot()) {
    throw new Error('HubSpot not initialized');
  }

  try {
    const response = await axios.post(
      `${hubspotClient.baseUrl}/crm/v3/objects/contacts`,
      buildContactPayload(contactData),
      { headers: buildRequestHeaders() }
    );

    console.log(`Contact created successfully: ${response.data.id}`);
    return response.data;
  } catch (error) {
    console.error('Error creating contact:', error.response?.data || error.message);
    throw error;
  }
};

// Create deal in HubSpot
const createDeal = async (dealData) => {
  if (!initializeHubSpot()) {
    throw new Error('HubSpot not initialized');
  }

  try {
    const response = await axios.post(
      `${hubspotClient.baseUrl}/crm/v3/objects/deals`,
      buildDealPayload(dealData),
      { headers: buildRequestHeaders() }
    );

    console.log(`Deal created successfully: ${response.data.id}`);
    return response.data;
  } catch (error) {
    console.error('Error creating deal:', error.response?.data || error.message);
    throw error;
  }
};

// Create ticket in HubSpot
const createTicket = async (ticketData) => {
  if (!initializeHubSpot()) {
    throw new Error('HubSpot not initialized');
  }

  try {
    const response = await axios.post(
      `${hubspotClient.baseUrl}/crm/v3/objects/tickets`,
      buildTicketPayload(ticketData),
      { headers: buildRequestHeaders() }
    );
    return response.data;
  } catch (error) {
    console.error('Error creating ticket:', error.response?.data || error.message);
    throw error;
  }
};

// Main lead creation function
const createLead = async (leadData) => {
  if (!hubspotClient) {
    initializeHubSpot();
  }

  try {
    // Create contact first (this always works)
    const contact = await createContact(leadData);
    
    // Try to create deal if service info is available
    let deal = null;
    if (leadData.service_requested) {
      try {
        deal = await createDeal({
          ...leadData,
          contact_id: contact.id,
          deal_name: `${leadData.service_requested} - ${leadData.company || leadData.first_name || 'New Lead'}`,
          budget_amount: leadData.budget_range || '0'
        });
        console.log('Deal created successfully');
      } catch (dealError) {
        console.log('Deal creation failed:', dealError.message);
        console.log('Contact created successfully - deals can be added manually in HubSpot');
      }
    }

    // Try to create ticket for follow-up
    let ticket = null;
    if (leadData.project_description || leadData.service_requested) {
      try {
        ticket = await createTicket({
          subject: `Follow-up: ${leadData.service_requested || 'New Lead'} inquiry`,
          description: leadData.project_description || `New lead interested in ${leadData.service_requested || 'our services'}`,
          priority_level: 'HIGH',
          assigned_team: 'Sales Team',
          issue_type: 'Lead Follow-up'
        });
        console.log('Ticket created successfully');
      } catch (ticketError) {
        console.log('Ticket creation failed:', ticketError.message);
        console.log('Contact created successfully - tickets can be added manually in HubSpot');
      }
    }

    console.log('Lead creation completed!');
    console.log(`Contact ID: ${contact.id}`);

    if (deal) console.log(`Deal ID: ${deal.id}`);
    if (ticket) console.log(`Ticket ID: ${ticket.id}`);

    return {
      contact,
      deal,
      ticket,
      success: true
    };

  } catch (error) {
    console.error('Error creating lead:', error);
    throw error;
  }
};

// Test HubSpot connection
const testConnection = async () => {
  if (!hubspotClient) initializeHubSpot();

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

    console.log('HubSpot connection successful!');
    console.log(`Found ${response.data.total} contacts in your account`);
    return true;
  } catch (error) {
    console.error('HubSpot connection failed:', error.response?.data || error.message);
    return false;
  }
};

module.exports = {
  initializeHubSpot,
  createContact,
  createDeal,
  createTicket,
  createLead,
  testConnection
};