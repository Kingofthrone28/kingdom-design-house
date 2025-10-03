const { searchSimilarDocuments } = require('../services/pinecone');
const { generateResponse, extractStructuredInfo } = require('../services/openai');
const { createLead } = require('../services/hubspot');

// Helper function to extract basic lead info without AI
const extractBasicLeadInfo = (query) => {
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
  const phoneRegex = /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/;
  
  const email = query.match(emailRegex)?.[0];
  const phone = query.match(phoneRegex)?.[0];
  
  // Extract name patterns - prioritize user messages
  let firstName = null;
  let lastName = null;
  
  // Extract only user messages for name detection
  const userMessages = query.split('user:').slice(1).join(' ');
  const nameSearchQuery = userMessages || query;
  
  // Pattern 1: "My name is John Smith" or "I'm John Smith"
  const namePattern1 = /(?:my name is|i'm|i am|this is)\s+([a-zA-Z]+)(?:\s+([a-zA-Z]+))?/i;
  const nameMatch1 = nameSearchQuery.match(namePattern1);
  if (nameMatch1) {
    firstName = nameMatch1[1];
    lastName = nameMatch1[2] || null;
  }
  
  // Pattern 2: "John Smith here" or "John Smith calling"
  const namePattern2 = /^([a-zA-Z]+)(?:\s+([a-zA-Z]+))?\s+(?:here|calling|speaking)/i;
  const nameMatch2 = nameSearchQuery.match(namePattern2);
  if (nameMatch2 && !firstName) {
    firstName = nameMatch2[1];
    lastName = nameMatch2[2] || null;
  }
  
  // Pattern 3: "Hi, I'm John" or "Hello, John here"
  const namePattern3 = /(?:hi|hello|hey),?\s*(?:i'm|i am)?\s*([a-zA-Z]+)/i;
  const nameMatch3 = nameSearchQuery.match(namePattern3);
  if (nameMatch3 && !firstName) {
    firstName = nameMatch3[1];
  }
  
  // Pattern 4: "This is John" or "It's John"
  const namePattern4 = /(?:this is|it's|its)\s+([a-zA-Z]+)/i;
  const nameMatch4 = nameSearchQuery.match(namePattern4);
  if (nameMatch4 && !firstName) {
    firstName = nameMatch4[1];
  }
  
  // Pattern 5: "John from Company" or "John at Company"
  const namePattern5 = /^([a-zA-Z]+)\s+(?:from|at)\s+/i;
  const nameMatch5 = nameSearchQuery.match(namePattern5);
  if (nameMatch5 && !firstName) {
    firstName = nameMatch5[1];
  }
  
  // Pattern 6: "Hi my name is Lucas Tyler" (from the actual conversation)
  const namePattern6 = /hi my name is\s+([a-zA-Z]+)(?:\s+([a-zA-Z]+))?/i;
  const nameMatch6 = nameSearchQuery.match(namePattern6);
  if (nameMatch6 && !firstName) {
    firstName = nameMatch6[1];
    lastName = nameMatch6[2] || null;
  }
  
  // Enhanced service keywords mapping with more specific terms
  const serviceKeywords = {
    'networking': ['network', 'networking', 'infrastructure', 'server', 'wifi', 'internet', 'connectivity', 'lan', 'wan', 'firewall', 'router', 'switch', 'cabling', 'wireless', 'ethernet', 'network setup', 'corporate office', 'users', 'devices', 'mbps', 'speed', 'security', 'router and switch', 'load balancing', 'network redundancy'],
    'web development': ['website', 'web development', 'web design', 'site', 'online', 'web app', 'web application', 'ecommerce', 'cms', 'frontend', 'backend'],
    'it services': ['it', 'technology', 'tech support', 'computer', 'system', 'technical support', 'help desk', 'desktop', 'laptop', 'hardware', 'software'],
    'ai solutions': ['ai', 'artificial intelligence', 'automation', 'machine learning', 'chatbot', 'ai integration', 'intelligent', 'smart', 'predictive']
  };
  
  // Extract only user messages from conversation history for better service detection
  const userMessagesForService = query.split('user:').slice(1).join(' ').toLowerCase();
  const cleanQuery = userMessagesForService || query.toLowerCase();
  
  // Analyze user messages for service detection (prioritize user intent)
  const serviceRequested = Object.entries(serviceKeywords)
    .find(([_, keywords]) => keywords.some(keyword => cleanQuery.includes(keyword)))?.[0] || 'General Inquiry';
  
  // Debug logging for service detection
  console.log('Service Detection Debug:');
  console.log('Full Query:', query);
  console.log('User Messages:', userMessagesForService);
  console.log('Clean Query:', cleanQuery);
  console.log('Detected Service:', serviceRequested);
  console.log('Name Search Query:', nameSearchQuery);
  console.log('Extracted Name:', { firstName, lastName });
  
  // Extract budget information - avoid office sizes and people counts
  const budgetRegex = /\$(\d{1,3}(?:,\d{3})*(?:\.\d{2})?)\s*(?:k|thousand|K)?/i;
  const budgetMatch = query.match(budgetRegex);
  const budgetAmount = budgetMatch ? budgetMatch[1].replace(/,/g, '') : null;
  
  // Extract timeline information
  const timelineRegex = /(?:timeline|deadline|complete|finish|deliver).*?(\d+)\s*(?:weeks?|months?|days?)/i;
  const timelineMatch = query.match(timelineRegex);
  const timeline = timelineMatch ? `${timelineMatch[1]} ${timelineMatch[2]}` : null;
  
  // Extract conversation keywords
  const conversationKeywords = extractConversationKeywords(query);
  
  return {
    email: email || null,
    phone: phone || null,
    first_name: firstName,
    last_name: lastName,
    service_requested: serviceRequested,
    project_description: query.substring(0, 500),
    budget_range: budgetAmount,
    budget_amount: budgetAmount,
    timeline: timeline,
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
const createLeadIfPossible = async (structuredInfo, query, conversationHistory = []) => {
  if (structuredInfo?.email && structuredInfo?.service_requested) {
    return await createHubSpotLead(structuredInfo, conversationHistory);
  } else {
    // Create enhanced query with full conversation for better service detection
    const fullConversation = conversationHistory.map(msg => `${msg.role}: ${msg.content}`).join(' ') + ' ' + query;
    const basicLeadInfo = extractBasicLeadInfo(fullConversation);
    if (basicLeadInfo.email) {
      return await createHubSpotLead(basicLeadInfo, conversationHistory);
    }
  }
  return null;
};

// Lead creation helper
const createHubSpotLead = async (leadData, conversationHistory = []) => {
  try {
    console.log('Creating lead in HubSpot...')
    console.log(leadData)
    
    // Add conversation history to lead data
    const enrichedLeadData = {
      ...leadData,
      source_of_lead: 'Website Chat',
      preferred_communication_method: 'Email',
      contact_type: 'Lead',
      conversation_history: conversationHistory.map(msg => 
        `${msg.role}: ${msg.content}`
      ).join('\n')
    };
    
    const hubspotLead = await createLead(enrichedLeadData);
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
    const hubspotLead = await createLeadIfPossible(structuredInfo, query, conversationHistory);

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