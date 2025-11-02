const { createLead } = require('../services/hubspot');

// Helper function to extract basic lead info without AI
function extractBasicLeadInfo(query) {
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
  const phoneRegex = /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/;
  
  const email = query.match(emailRegex)?.[0];
  const phone = query.match(phoneRegex)?.[0];
  
  // Try to detect service interest from keywords
  const serviceKeywords = {
    'web development': ['website', 'web development', 'web design', 'site', 'online'],
    'it services': ['it', 'technology', 'tech support', 'computer', 'system'],
    'networking': ['network', 'networking', 'infrastructure', 'server'],
    'ai solutions': ['ai', 'artificial intelligence', 'automation', 'machine learning']
  };
  
  let serviceRequested = null;
  for (const [service, keywords] of Object.entries(serviceKeywords)) {
    if (keywords.some(keyword => query.toLowerCase().includes(keyword))) {
      serviceRequested = service;
      break;
    }
  }
  
  return {
    email: email || null,
    phone: phone || null,
    service_requested: serviceRequested || 'General Inquiry',
    project_description: query.substring(0, 500) // First 500 chars as description
  };
}

const chatHandler = async(req, res) => {
  try {
    const { query, conversationHistory = [] } = req.body;

    if (!query) {
      return res.status(400).json({
        error: 'Query is required'
      });
    }

    // Simple fallback response (no AI needed)
    const response = `Hello! I'm Jarvis from Kingdom Design House. I'd be happy to help you with your web development, IT services, networking, and AI solutions needs.

For immediate assistance, please contact us:
📞 Phone: 347.927.8846
📧 Email: info@kingdomdesignhouse.com

We offer comprehensive packages for businesses of all sizes, including:
• Web Development & Design
• IT Services & Support  
• Networking Solutions
• AI Integration

What specific services are you interested in?`;

    // Extract basic lead info from the query
    const basicLeadInfo = extractBasicLeadInfo(query);
    
    // Check if we have enough information to create a lead
    let hubspotLead = null;
    if (basicLeadInfo.email) {
      try {
        console.log('Creating lead in HubSpot with basic info...');
        hubspotLead = await createLead({
          ...basicLeadInfo,
          source_of_lead: 'Website Chat',
          preferred_communication_method: 'Email',
          contact_type: 'Lead'
        });
        console.log('✅ Lead created in HubSpot:', hubspotLead.contact?.id);
      } catch (error) {
        console.error('❌ Failed to create lead in HubSpot:', error.message);
        // Don't fail the chat response if HubSpot fails
      }
    }

    // Prepare response
    const chatResponse = {
      response: response,
      structuredInfo: basicLeadInfo,
      hubspotLead: hubspotLead ? {
        contactId: hubspotLead.contact?.id,
        dealId: hubspotLead.deal?.id,
        ticketId: hubspotLead.ticket?.id,
        success: hubspotLead.success
      } : null,
      relevantDocs: [],
      timestamp: new Date().toISOString()
    };

    res.json(chatResponse);

  } catch (error) {
    console.error('Chat handler error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Sorry, I encountered an error processing your request. Please try again.'
    });
  }
}

module.exports = chatHandler;