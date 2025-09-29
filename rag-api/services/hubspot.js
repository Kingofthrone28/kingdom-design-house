const axios = require('axios');
const { createHubSpotContact, createHubSpotDeal, createHubSpotTicket } = require('../utils/index.cjs');

let hubspotClient = null;

// Request payload builders
const buildContactPayload = (contactData) => {
  // Extract and validate names
  const firstName = contactData.first_name?.trim() || '';
  const lastName = contactData.last_name?.trim() || '';
  
  // If names are missing, try to extract from email
  let extractedFirstName = firstName;
  let extractedLastName = lastName;
  
  if (!firstName && !lastName && contactData.email) {
    const emailParts = contactData.email.split('@')[0];
    const nameParts = emailParts.split(/[._-]/);
    
    if (nameParts.length >= 2) {
      extractedFirstName = nameParts[0].charAt(0).toUpperCase() + nameParts[0].slice(1).toLowerCase();
      extractedLastName = nameParts[1].charAt(0).toUpperCase() + nameParts[1].slice(1).toLowerCase();
    } else if (nameParts.length === 1) {
      extractedFirstName = nameParts[0].charAt(0).toUpperCase() + nameParts[0].slice(1).toLowerCase();
      extractedLastName = 'User';
    }
  }
  
  // Fallback to generic names if still empty
  if (!extractedFirstName) {
    extractedFirstName = 'Prospect';
  }
  if (!extractedLastName) {
    extractedLastName = 'Lead';
  }

  return {
    properties: {
      email: contactData.email,
      firstname: extractedFirstName,
      lastname: extractedLastName,
      phone: contactData.phone,
      company: contactData.company,
      website: contactData.website,
      // Store conversation data in jobtitle field (writable standard property)
      jobtitle: `Service: ${contactData.service_requested || 'Not specified'} | Keywords: ${contactData.conversation_keywords || 'None'}`
    }
  };
};

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
    content: ticketData.description || 'No description provided',
    hs_ticket_priority: ticketData.priority_level || 'HIGH',
    hs_pipeline_stage: '1'
  }
});

const buildRequestHeaders = () => ({
  'Authorization': `Bearer ${hubspotClient.accessToken}`,
  'Content-Type': 'application/json'
});

// Build comprehensive ticket content with conversation history
const buildComprehensiveTicketContent = (leadData) => {
  const timestamp = new Date().toISOString();
  
  return `
=== LEAD INQUIRY SUMMARY ===
Date: ${new Date().toLocaleDateString()}
Time: ${new Date().toLocaleTimeString()}
Source: Website Chat

=== CONTACT INFORMATION ===
Name: ${leadData.first_name || 'Not provided'} ${leadData.last_name || 'Not provided'}
Email: ${leadData.email || 'Not provided'}
Phone: ${leadData.phone || 'Not provided'}
Company: ${leadData.company || 'Not provided'}

=== SERVICE INTEREST ===
Service Requested: ${leadData.service_requested || 'General Inquiry'}
Project Description: ${leadData.project_description || 'No specific details provided'}
Budget Range: ${leadData.budget_range || 'Not specified'}
Timeline: ${leadData.timeline || 'Not specified'}

=== CONVERSATION KEYWORDS ===
${leadData.conversation_keywords || 'No keywords extracted'}

=== CONVERSATION HISTORY ===
${leadData.conversation_history || leadData.project_description || 'No conversation history available'}

=== NEXT STEPS ===
1. Review contact information and service requirements
2. Schedule follow-up call or meeting
3. Prepare proposal based on service interest
4. Assign to appropriate sales team member

=== TECHNICAL DETAILS ===
Lead ID: Generated ${timestamp}
Priority: HIGH
Assigned Team: Sales Team
Issue Type: Lead Follow-up
  `.trim();
};

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
    const result = await createHubSpotContact(buildContactPayload(contactData).properties);
    
    if (result.success) {
      console.log(`Contact created successfully: ${result.data.id}`);
      return result.data;
    } else {
      throw new Error(result.error?.message || 'Contact creation failed');
    }
  } catch (error) {
    console.error('Error creating contact:', error.message);
    throw error;
  }
};

// Create deal in HubSpot
const createDeal = async (dealData) => {
  if (!initializeHubSpot()) {
    throw new Error('HubSpot not initialized');
  }

  try {
    const result = await createHubSpotDeal(buildDealPayload(dealData).properties);
    
    if (result.success) {
      console.log(`Deal created successfully: ${result.data.id}`);
      return result.data;
    } else {
      throw new Error(result.error?.message || 'Deal creation failed');
    }
  } catch (error) {
    console.error('Error creating deal:', error.message);
    throw error;
  }
};

// Create ticket in HubSpot
const createTicket = async (ticketData) => {
  if (!initializeHubSpot()) {
    throw new Error('HubSpot not initialized');
  }

  try {
    const result = await createHubSpotTicket(buildTicketPayload(ticketData).properties);
    
    if (result.success) {
      console.log(`Ticket created successfully: ${result.data.id}`);
      return result.data;
    } else {
      throw new Error(result.error?.message || 'Ticket creation failed');
    }
  } catch (error) {
    console.error('Error creating ticket:', error.message);
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
        // Create comprehensive ticket content with conversation history
        const ticketContent = buildComprehensiveTicketContent(leadData);
        
        ticket = await createTicket({
          subject: `Follow-up: ${leadData.service_requested || 'New Lead'} inquiry`,
          description: ticketContent,
          priority_level: 'HIGH',
          assigned_team: 'Sales Team',
          issue_type: 'Lead Follow-up',
          conversation_keywords: leadData.conversation_keywords || 'None'
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
    // Use the centralized HTTP client for testing
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
      console.log('HubSpot connection successful!');
      console.log(`Found ${result.data.total} contacts in your account`);
      return true;
    } else {
      console.error('HubSpot connection failed:', result.error);
      return false;
    }
  } catch (error) {
    console.error('HubSpot connection failed:', error.message);
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