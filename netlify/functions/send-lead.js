/**
 * @fileoverview Netlify Function: HubSpot Lead Creation Service
 * 
 * This function handles the creation of leads in HubSpot CRM system, including contacts,
 * deals, and tickets. It serves as the CRM integration layer for the Kingdom Design House
 * AI chat system, converting chat interactions into actionable sales leads.
 * 
 * SYSTEM INTEGRATION:
 * ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
 * │   Chat Jarvis   │    │   Send Lead     │    │   HubSpot CRM   │
 * │   Function      │───▶│   Function      │───▶│   API Service   │
 * │   (Proxy)       │    │   This Module   │    │   Lead Storage  │
 * └─────────────────┘    └─────────────────┘    └─────────────────┘
 * 
 * WORKFLOW:
 * 1. Receives transformed lead data from chat-jarvis function
 * 2. Validates required fields (email, service information)
 * 3. Creates HubSpot contact with enriched properties
 * 4. Optionally creates deal if service/budget information available
 * 5. Associates deal with contact for sales pipeline tracking
 * 6. Returns success/failure status to calling function
 * 
 * LEAD SCORING:
 * - Email: +10 points (basic contact info)
 * - Phone: +15 points (direct communication)
 * - Company: +10 points (business context)
 * - Service Requested: +20 points (clear intent)
 * - Budget Range: +25 points (qualified lead)
 * - Timeline: +15 points (urgency indicator)
 * - Project Description: +10 points (detailed context)
 * 
 * @author Kingdom Design House Development Team
 * @version 1.0.0
 * @since 2024
 */

// Import HTTP client utilities
const { createHubSpotContact, createHubSpotDeal, createHubSpotTicket } = require('./utils/index.cjs');

/**
 * Main Netlify function handler for HubSpot lead creation
 * 
 * This function processes lead data from the chat system and creates corresponding
 * records in HubSpot CRM, including contacts, deals, and associations.
 * 
 * @param {Object} event - Netlify event object
 * @param {string} event.httpMethod - HTTP method (POST, OPTIONS)
 * @param {string} event.body - JSON string containing lead data
 * @param {Object} context - Netlify context object
 * @returns {Promise<Object>} Netlify function response with lead creation status
 * 
 * @description This function implements the complete HubSpot integration workflow:
 * 1. Handles CORS preflight and method validation
 * 2. Validates required lead data fields
 * 3. Creates HubSpot contact with enriched properties
 * 4. Creates associated deal if service information available
 * 5. Establishes contact-deal associations for pipeline tracking
 * 6. Returns comprehensive success/failure status
 * 
 * The function ensures robust error handling and graceful degradation
 * when HubSpot API calls fail, maintaining chat functionality.
 */
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

/**
 * Calculates a lead score based on available information to prioritize follow-up.
 * This function implements a scoring system that helps sales teams identify
 * high-value leads and prioritize their outreach efforts.
 * 
 * @param {Object} leadData - Lead information object containing various fields
 * @param {string} [leadData.email] - Contact email address
 * @param {string} [leadData.phone] - Contact phone number
 * @param {string} [leadData.company] - Company name
 * @param {string} [leadData.service_requested] - Requested service type
 * @param {string} [leadData.budget_range] - Budget information
 * @param {string} [leadData.timeline] - Project timeline
 * @param {string} [leadData.project_description] - Project description
 * @returns {number} Lead score between 0-100 (capped at 100)
 * 
 * @description Scoring system:
 * - Email: +10 points (basic contact info)
 * - Phone: +15 points (direct communication channel)
 * - Company: +10 points (business context and credibility)
 * - Service Requested: +20 points (clear intent and qualification)
 * - Budget Range: +25 points (qualified lead with budget)
 * - Timeline: +15 points (urgency and project readiness)
 * - Project Description: +10 points (detailed context and engagement)
 * 
 * Higher scores indicate more qualified leads that should be prioritized
 * for immediate follow-up by the sales team.
 */
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

/**
 * Extracts and normalizes budget amount from budget range text.
 * This function parses various budget formats (e.g., "$5k", "10K", "5000")
 * and converts them to standardized numeric values for HubSpot deal creation.
 * 
 * @param {string} budgetRange - Budget range text (e.g., "$5k", "10K", "5000")
 * @returns {number|null} Normalized budget amount or null if no valid amount found
 * 
 * @description This function handles various budget formats:
 * - Dollar amounts: "$5000" → 5000
 * - K notation: "$5k", "10K" → 5000, 10000
 * - M notation: "2M" → 2000000
 * - Plain numbers: "5000" → 5000
 * 
 * The function uses regex to extract numeric values and applies appropriate
 * multipliers based on notation (K = 1000, M = 1000000).
 */
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

/**
 * Calculates the expected close date for a deal based on project timeline.
 * This function parses timeline information and converts it to a future date
 * for HubSpot deal creation and sales pipeline management.
 * 
 * @param {string} timeline - Project timeline text (e.g., "2 weeks", "1 month", "urgent")
 * @returns {string} ISO string of calculated close date
 * 
 * @description This function handles various timeline formats:
 * - Week-based: "2 weeks" → 14 days from now
 * - Month-based: "1 month" → 30 days from now
 * - Day-based: "5 days" → 5 days from now
 * - Urgent/ASAP: Defaults to 7 days from now
 * - No timeline: Defaults to 30 days from now
 * 
 * The function uses regex to extract numeric values and applies appropriate
 * date calculations based on the time unit specified in the timeline.
 */
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