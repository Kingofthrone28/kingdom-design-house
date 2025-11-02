const { searchSimilarDocuments } = require('../services/pinecone');
const { generateResponse, extractStructuredInfo } = require('../services/openai');
const { createLead } = require('../services/hubspot');

// Helper function to extract basic lead info without AI
const extractBasicLeadInfo = (query) => {
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
  const phoneRegex = /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/;
  
  const email = query.match(emailRegex)?.[0];
  const phone = query.match(phoneRegex)?.[0];
  
  // Extract name patterns
  let firstName = null;
  let lastName = null;
  
  // Pattern 1: "My name is John Smith" or "I'm John Smith"
  const namePattern1 = /(?:my name is|i'm|i am|this is)\s+([a-zA-Z]+)(?:\s+([a-zA-Z]+))?/i;
  const nameMatch1 = query.match(namePattern1);
  if (nameMatch1) {
    firstName = nameMatch1[1];
    lastName = nameMatch1[2] || null;
  }
  
  // Pattern 2: "John Smith here" or "John Smith calling"
  const namePattern2 = /^([a-zA-Z]+)(?:\s+([a-zA-Z]+))?\s+(?:here|calling|speaking)/i;
  const nameMatch2 = query.match(namePattern2);
  if (nameMatch2 && !firstName) {
    firstName = nameMatch2[1];
    lastName = nameMatch2[2] || null;
  }
  
  // Pattern 3: "Hi, I'm John" or "Hello, John here"
  const namePattern3 = /(?:hi|hello|hey),?\s*(?:i'm|i am)?\s*([a-zA-Z]+)/i;
  const nameMatch3 = query.match(namePattern3);
  if (nameMatch3 && !firstName) {
    firstName = nameMatch3[1];
  }
  
  // Service keywords mapping
  const serviceKeywords = {
    'web development': ['website', 'web development', 'web design', 'site', 'online', 'web app', 'web application'],
    'it services': ['it', 'technology', 'tech support', 'computer', 'system', 'technical support', 'help desk'],
    'networking': ['network', 'networking', 'infrastructure', 'server', 'wifi', 'internet', 'connectivity'],
    'ai solutions': ['ai', 'artificial intelligence', 'automation', 'machine learning', 'chatbot', 'ai integration']
  };
  
  const serviceRequested = Object.entries(serviceKeywords)
    .find(([_, keywords]) => keywords.some(keyword => query.toLowerCase().includes(keyword)))?.[0] || 'General Inquiry';
  
  // Extract conversation keywords
  const conversationKeywords = extractConversationKeywords(query);
  
  return {
    email: email || null,
    phone: phone || null,
    first_name: firstName,
    last_name: lastName,
    service_requested: serviceRequested,
    project_description: query.substring(0, 500),
    conversation_keywords: conversationKeywords
  };
};

// Helper function to extract conversation keywords
const extractConversationKeywords = (query) => {
  const keywords = [];
  const lowerQuery = query.toLowerCase();

  const allKeywords = {
    business: ['business', 'company', 'startup', 'enterprise', 'small business', 'corporate'],
    technology: ['website', 'app', 'mobile', 'ecommerce', 'cms', 'database', 'cloud', 'security', 'seo'],
    urgency: ['urgent', 'asap', 'quickly', 'soon', 'immediately', 'rush', 'deadline'],
    budget: ['budget', 'cost', 'price', 'affordable', 'expensive', 'cheap', 'investment']
  };

  // Efficient single-pass keyword extraction
  const allKeywordList = Object.values(allKeywords).flat();
  const foundKeywords = allKeywordList.filter(keyword => lowerQuery.includes(keyword));
  keywords.push(...foundKeywords);

  return keywords.join(', ') || null;
};

// Fallback response templates
const FALLBACK_RESPONSES = {
  default: `Hello! I'm Jarvis from Kingdom Design House. I'm currently experiencing technical difficulties with my AI services, but I'd be happy to help you with your web development, IT services, networking, and AI solutions needs.

For immediate assistance, please contact us:
📞 Phone: 347.927.8846
📧 Email: info@kingdomdesignhouse.com

We offer comprehensive packages for businesses of all sizes, including:
• Web Development & Design
• IT Services & Support  
• Networking Solutions
• AI Integration

What specific services are you interested in?`,

  personalized: (serviceRequested) => `Hi there! Thanks for reaching out to Kingdom Design House. I can see you're interested in ${serviceRequested || 'our services'}. 

I'd love to help you with your project! While I'm experiencing some technical difficulties with my AI services right now, I can definitely assist you with:

• Web Development & Design
• IT Services & Support  
• Networking Solutions
• AI Integration

For immediate assistance, please contact us:
📞 Phone: 347.927.8846
📧 Email: info@kingdomdesignhouse.com

I'll make sure our team gets back to you quickly with a personalized proposal for your needs. What's your timeline looking like for this project?`
};

// System prompt template
const createSystemPrompt = (context, conversationHistory) => `You are Jarvis, the AI assistant for Kingdom Design House. You help potential clients understand our services and gather information about their needs.

Company Information:
Kingdom Design House is a full-service digital solutions company offering:
- Web Development & Design (The Web Group)
- IT Services & Networking (The Network Group) 
- AI Integration & Tools (The AI Group)

We have over 10 years of experience and specialize in:
- Scalable web applications
- Workflow automation
- AI-driven tools
- System architecture
- SEO optimization
- Custom software development

${context ? `\nRelevant Information:\n${context}` : ''}

Guidelines:
1. Be helpful, professional, and friendly
2. Ask clarifying questions about their project needs
3. Gather information about: service type, budget, timeline, company details
4. If they seem interested, encourage them to provide contact information
5. Keep responses concise but informative
6. Always represent Kingdom Design House professionally

Current conversation history: ${conversationHistory.map(msg => `${msg.role}: ${msg.content}`).join('\n')}`;

// AI response helper
const getAIResponse = async (query, conversationHistory) => {
  try {
    const relevantDocs = await searchSimilarDocuments(query, 5);
    const context = relevantDocs
      .map(doc => doc.metadata?.text || '')
      .filter(text => text.length > 0)
      .join('\n\n');
    
    const systemPrompt = createSystemPrompt(context, conversationHistory);
    const messages = [...conversationHistory, { role: 'user', content: query }];
    const response = await generateResponse(messages, systemPrompt, 800);
    
    return { response, relevantDocs };
  } catch (aiError) {
    console.log('AI service unavailable, using fallback response:', aiError.message);
    return { response: FALLBACK_RESPONSES.default, relevantDocs: [] };
  }
};

// Structured info helper
const getStructuredInfo = async (query) => {
  try {
    return await extractStructuredInfo(query);
  } catch (extractError) {
    console.log('Structured info extraction failed:', extractError.message);
    return null;
  }
};

// Lead creation logic helper
const createLeadIfPossible = async (structuredInfo, query) => {
  if (structuredInfo?.email && structuredInfo?.service_requested) {
    return await createHubSpotLead(structuredInfo);
  } else {
    const basicLeadInfo = extractBasicLeadInfo(query);
    if (basicLeadInfo.email) {
      return await createHubSpotLead(basicLeadInfo);
    }
  }
  return null;
};

// Lead creation helper
const createHubSpotLead = async (leadData) => {
  try {
    console.log('Creating lead in HubSpot...')
    console.log(leadData)
    const hubspotLead = await createLead({
      ...leadData,
      source_of_lead: 'Website Chat',
      preferred_communication_method: 'Email',
      contact_type: 'Lead'
    });
    console.log('Lead created in HubSpot:', hubspotLead.contact?.id);
    return hubspotLead;
  } catch (error) {
    console.error('Failed to create lead in HubSpot:', error.message);
    return null;
  }
};

// Main chat handler
const chatHandler = async (req, res) => {
  try {
    const { query, conversationHistory = [] } = req.body;

    if (!query) {
      return res.status(400).json({ error: 'Query is required' });
    }

    // Get AI response and structured info
    const aiResult = await getAIResponse(query, conversationHistory);
    const { response, relevantDocs } = aiResult;
    const structuredInfo = await getStructuredInfo(query);

    // Personalize fallback response if needed
    if (response.includes('technical difficulties')) {
      const basicInfo = extractBasicLeadInfo(query);
      if (basicInfo.email) {
        response = FALLBACK_RESPONSES.personalized(basicInfo.service_requested);
      }
    }

    // Create HubSpot lead
    const hubspotLead = await createLeadIfPossible(structuredInfo, query);

    // Prepare response
    const chatResponse = {
      response,
      structuredInfo,
      hubspotLead: hubspotLead ? {
        contactId: hubspotLead.contact?.id,
        dealId: hubspotLead.deal?.id,
        ticketId: hubspotLead.ticket?.id,
        success: hubspotLead.success
      } : null,
      relevantDocs: relevantDocs.map(doc => ({
        id: doc.id,
        score: doc.score,
        text: doc.metadata?.text?.substring(0, 200) + '...'
      })),
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
};

module.exports = chatHandler;