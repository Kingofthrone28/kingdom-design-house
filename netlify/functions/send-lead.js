// Import HTTP client utilities
const { createHubSpotContact, createHubSpotDeal, createHubSpotTicket } = require('./utils/index.cjs');

exports.handler = async (event, context) => {
  // Handle CORS
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
      body: '',
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const leadData = JSON.parse(event.body);

    // Validate required fields
    if (!leadData.email) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ error: 'Email is required' }),
      };
    }

    // HubSpot API configuration
    const hubspotApiKey = process.env.HUBSPOT_API_KEY;
    const hubspotPortalId = process.env.HUBSPOT_PORTAL_ID;

    if (!hubspotApiKey || !hubspotPortalId) {
      console.error('HubSpot configuration missing');
      return {
        statusCode: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ error: 'HubSpot configuration missing' }),
      };
    }

    // Prepare HubSpot contact data
    const contactData = {
      properties: {
        email: leadData.email,
        firstname: leadData.first_name || '',
        lastname: leadData.last_name || '',
        phone: leadData.phone || '',
        company: leadData.company || '',
        website: leadData.website || '',
        // Custom properties
        service_requested: leadData.service_requested || '',
        budget_range: leadData.budget_range || '',
        timeline: leadData.timeline || '',
        project_description: leadData.project_description || leadData.originalMessage || '',
        lead_source: 'Chat with Jarvis',
        lead_status: 'New',
        // Additional context
        chat_timestamp: leadData.timestamp || new Date().toISOString(),
        lead_score: calculateLeadScore(leadData),
      }
    };

    // Create contact in HubSpot using centralized client
    const contactResult = await createHubSpotContact(contactData);
    
    if (!contactResult.success) {
      console.error('HubSpot API error:', contactResult.error);
      throw new Error('Failed to create contact in HubSpot');
    }

    const hubspotData = contactResult.data;

    // Create a deal if we have service information
    if (leadData.service_requested || leadData.budget_range) {
      try {
        const dealData = {
          properties: {
            dealname: `${leadData.service_requested || 'Service Inquiry'} - ${leadData.email}`,
            dealstage: 'appointmentscheduled',
            amount: extractBudgetAmount(leadData.budget_range),
            closedate: calculateCloseDate(leadData.timeline),
            pipeline: 'default',
            // Custom deal properties
            service_type: leadData.service_requested || '',
            budget_range: leadData.budget_range || '',
            timeline: leadData.timeline || '',
            lead_source: 'Chat with Jarvis',
          }
        };

        // Create deal using centralized client
        const dealResult = await createHubSpotDeal(dealData);
        
        if (dealResult.success) {
          const dealData = dealResult.data;
          
          // Associate the deal with the contact
          await fetch(
            `https://api.hubapi.com/crm/v3/objects/deals/${dealData.id}/associations/contacts/${hubspotData.id}`,
            {
              method: 'PUT',
              headers: {
                'Authorization': `Bearer ${hubspotApiKey}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                inputs: [{
                  from: { id: dealData.id },
                  to: { id: hubspotData.id },
                  type: 'deal_to_contact'
                }]
              }),
            }
          );
        }
      } catch (dealError) {
        console.error('Error creating deal:', dealError);
        // Don't fail the lead creation if deal creation fails
      }
    }

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        success: true,
        contactId: hubspotData.id,
        message: 'Lead created successfully in HubSpot',
      }),
    };

  } catch (error) {
    console.error('Send lead error:', error);
    
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ 
        error: 'Failed to create lead',
        message: 'There was an error processing your request. Please try again.',
      }),
    };
  }
};

// Helper function to calculate lead score
function calculateLeadScore(leadData) {
  let score = 0;
  
  if (leadData.email) score += 10;
  if (leadData.phone) score += 15;
  if (leadData.company) score += 10;
  if (leadData.service_requested) score += 20;
  if (leadData.budget_range) score += 25;
  if (leadData.timeline) score += 15;
  if (leadData.project_description) score += 10;
  
  return Math.min(score, 100);
}

// Helper function to extract budget amount
function extractBudgetAmount(budgetRange) {
  if (!budgetRange) return null;
  
  const numbers = budgetRange.match(/\d+/g);
  if (!numbers) return null;
  
  const amount = parseInt(numbers[0]);
  if (budgetRange.toLowerCase().includes('k')) {
    return amount * 1000;
  }
  if (budgetRange.toLowerCase().includes('m')) {
    return amount * 1000000;
  }
  return amount;
}

// Helper function to calculate close date
function calculateCloseDate(timeline) {
  if (!timeline) {
    // Default to 30 days from now
    const date = new Date();
    date.setDate(date.getDate() + 30);
    return date.toISOString();
  }
  
  const now = new Date();
  const timelineLower = timeline.toLowerCase();
  
  if (timelineLower.includes('week')) {
    const weeks = parseInt(timeline.match(/\d+/)?.[0] || '1');
    now.setDate(now.getDate() + (weeks * 7));
  } else if (timelineLower.includes('month')) {
    const months = parseInt(timeline.match(/\d+/)?.[0] || '1');
    now.setMonth(now.getMonth() + months);
  } else if (timelineLower.includes('day')) {
    const days = parseInt(timeline.match(/\d+/)?.[0] || '30');
    now.setDate(now.getDate() + days);
  } else {
    // Default to 30 days
    now.setDate(now.getDate() + 30);
  }
  
  return now.toISOString();
}