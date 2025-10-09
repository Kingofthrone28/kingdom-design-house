/**
 * @fileoverview RAG (Retrieval-Augmented Generation) Chat API Route
 * 
 * This module implements the core chat functionality for Kingdom Design House's AI assistant (Jarvis).
 * It combines document retrieval, AI-powered response generation, and lead capture in a unified system.
 * 
 * SYSTEM ARCHITECTURE:
 * ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
 * │   Frontend      │    │   Netlify       │    │   RAG API       │
 * │   (Next.js)     │───▶│   Functions     │───▶│   (Railway)     │
 * │   Chat UI       │    │   Proxy         │    │   This Module   │
 * └─────────────────┘    └─────────────────┘    └─────────────────┘
 *                                                       │
 *                                                       ▼
 * ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
 * │   HubSpot CRM   │◀───│   Lead Creation │◀───│   AI Services   │
 * │   Lead Storage  │    │   Logic         │    │   OpenAI GPT    │
 * └─────────────────┘    └─────────────────┘    └─────────────────┘
 *                                                       │
 *                                                       ▼
 *                                                ┌─────────────────┐
 *                                                │   Pinecone      │
 *                                                │   Vector DB     │
 *                                                │   Document      │
 *                                                │   Retrieval     │
 *                                                └─────────────────┘
 * 
 * WORKFLOW:
 * 1. User sends message via frontend chat interface
 * 2. Netlify function proxies request to RAG API
 * 3. RAG API searches Pinecone for relevant documents
 * 4. AI generates contextual response using retrieved documents
 * 5. System extracts lead information from conversation
 * 6. Lead is created in HubSpot CRM if sufficient data available
 * 7. Response is sent back through the chain to user
 * 
 * FALLBACK SYSTEMS:
 * - If AI services fail: Uses template responses with contact info
 * - If Pinecone fails: Uses basic keyword matching for responses
 * - If HubSpot fails: Logs error but continues chat functionality
 * 
 * @author Kingdom Design House Development Team
 * @version 1.0.0
 * @since 2024
 */

const { searchSimilarDocuments } = require('../services/pinecone');
const { generateResponse, extractStructuredInfo } = require('../services/openai');
const { createLead } = require('../services/hubspot');

/**
 * Extracts basic lead information from user queries using regex patterns and keyword matching.
 * This function serves as a fallback when AI-powered extraction is unavailable and provides
 * essential lead capture functionality for the RAG (Retrieval-Augmented Generation) system.
 * 
 * @param {string} query - The user's current message/query
 * @param {Array} conversationHistory - Array of conversation messages in format [{role: 'user'|'assistant', content: string}]
 * @returns {Object} Extracted lead information including:
 *   - email: Extracted email address using regex
 *   - phone: Extracted phone number using regex  
 *   - first_name: Extracted first name using multiple pattern matching
 *   - last_name: Extracted last name using multiple pattern matching
 *   - service_requested: Detected service type based on keyword analysis
 *   - project_description: Truncated query for project context
 *   - budget_range: Extracted budget amount from query
 *   - timeline: Extracted project timeline information
 *   - conversation_keywords: Relevant keywords from the conversation
 * 
 * @description This function is critical for lead capture when AI services are down.
 * It uses multiple regex patterns to extract names and analyzes conversation history
 * to determine service interests. It handles both legacy string format and current
 * array format for conversation history.
 */
const extractBasicLeadInfo = (query, conversationHistory = []) => {
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
  const phoneRegex = /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/;
  
  const email = query.match(emailRegex)?.[0];
  const phone = query.match(phoneRegex)?.[0];
  
  // Extract name patterns - prioritize user messages
  let firstName = null;
  let lastName = null;
  
  // Extract only user messages for name detection
  // Handle both string format (legacy) and array format (current)
  let userMessages = '';
  if (Array.isArray(conversationHistory)) {
    // New format: array of message objects
    userMessages = conversationHistory
      .filter(msg => msg.role === 'user')
      .map(msg => msg.content)
      .join(' ');
  } else {
    // Legacy format: string with 'user:' prefixes
    userMessages = query.split('user:').slice(1).join(' ');
  }
  
  const nameSearchQuery = userMessages || query;
  
  console.log('Name Extraction Debug:');
  console.log('User Messages:', userMessages);
  console.log('Name Search Query:', nameSearchQuery);
  
  // Pattern 1: "My name is John Smith" or "I'm John Smith"
  const namePattern1 = /(?:my name is|i'm|i am|this is)\s+([a-zA-Z]+)(?:\s+([a-zA-Z]+))?/i;
  const nameMatch1 = nameSearchQuery.match(namePattern1);
  console.log('Pattern 1 match:', nameMatch1);
  if (nameMatch1) {
    firstName = nameMatch1[1];
    lastName = nameMatch1[2] || null;
    console.log('Pattern 1 extracted:', { firstName, lastName });
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
  console.log('Pattern 6 match:', nameMatch6);
  if (nameMatch6 && !firstName) {
    firstName = nameMatch6[1];
    lastName = nameMatch6[2] || null;
    console.log('Pattern 6 extracted:', { firstName, lastName });
  }
  
  // Pattern 7: More flexible "Hi my name is" pattern
  const namePattern7 = /hi\s+my\s+name\s+is\s+([a-zA-Z]+)(?:\s+([a-zA-Z]+))?/i;
  const nameMatch7 = nameSearchQuery.match(namePattern7);
  console.log('Pattern 7 match:', nameMatch7);
  if (nameMatch7 && !firstName) {
    firstName = nameMatch7[1];
    lastName = nameMatch7[2] || null;
    console.log('Pattern 7 extracted:', { firstName, lastName });
  }
  
  // Enhanced service keywords mapping with more specific terms
  // Order matters: more specific services should be checked first
  const serviceKeywords = {
    'ai solutions': ['ai integration', 'ai solution', 'artificial intelligence', 'machine learning', 'chatbot', 'ai agent', 'sales automation', 'lead automation', 'automated sales', 'ai tools', 'intelligent automation', 'smart automation', 'predictive analytics', 'ai assistant', 'ai system'],
    'web development': ['website', 'web development', 'web design', 'site', 'online', 'web app', 'web application', 'ecommerce', 'cms', 'frontend', 'backend'],
    'networking': ['network', 'networking', 'infrastructure', 'server', 'wifi', 'internet', 'connectivity', 'lan', 'wan', 'firewall', 'router', 'switch', 'cabling', 'wireless', 'ethernet', 'network setup', 'corporate office', 'users', 'devices', 'mbps', 'speed', 'security', 'router and switch', 'load balancing', 'network redundancy'],
    'it services': ['it', 'technology', 'tech support', 'computer', 'system', 'technical support', 'help desk', 'desktop', 'laptop', 'hardware', 'software']
  };
  
  // Extract only user messages from conversation history for better service detection
  let userMessagesForService = '';
  if (Array.isArray(conversationHistory)) {
    // New format: array of message objects
    userMessagesForService = conversationHistory
      .filter(msg => msg.role === 'user')
      .map(msg => msg.content)
      .join(' ')
      .toLowerCase();
  } else {
    // Legacy format: string with 'user:' prefixes
    userMessagesForService = query.split('user:').slice(1).join(' ').toLowerCase();
  }
  const cleanQuery = userMessagesForService || query.toLowerCase();
  
  // Analyze user messages for service detection (prioritize user intent)
  // Score each service based on keyword matches and specificity
  const serviceScores = Object.entries(serviceKeywords).map(([service, keywords]) => {
    const matches = keywords.filter(keyword => cleanQuery.includes(keyword));
    const score = matches.length;
    // Boost score for exact phrase matches (more specific)
    const exactMatches = matches.filter(keyword => keyword.includes(' ') && cleanQuery.includes(keyword));
    return {
      service,
      score: score + (exactMatches.length * 2), // Double points for exact phrase matches
      matches
    };
  });
  
  // Sort by score (highest first) and take the best match
  const bestMatch = serviceScores
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)[0];
  
  const serviceRequested = bestMatch?.service || 'General Inquiry';
  
  // Debug logging for service detection
  console.log('Service Detection Debug:');
  console.log('Full Query:', query);
  console.log('Conversation History:', conversationHistory);
  console.log('User Messages:', userMessagesForService);
  console.log('Clean Query:', cleanQuery);
  console.log('Service Scores:', serviceScores);
  console.log('Best Match:', bestMatch);
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
  
  const extractedInfo = {
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
  
  console.log('Final extracted lead info:', extractedInfo);
  return extractedInfo;
};

/**
 * Extracts relevant keywords from user queries to enhance lead categorization and analysis.
 * This function analyzes conversation content to identify business context, technology needs,
 * urgency indicators, and budget considerations for better lead qualification.
 * 
 * @param {string} query - The user's message/query to analyze
 * @returns {string|null} Comma-separated string of found keywords, or null if none found
 * 
 * @description This function supports the lead qualification process by identifying:
 * - Business context (startup, enterprise, small business)
 * - Technology requirements (website, app, mobile, ecommerce)
 * - Urgency indicators (urgent, asap, deadline)
 * - Budget considerations (affordable, expensive, investment)
 * 
 * The extracted keywords help sales teams understand lead context and prioritize follow-up.
 */
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

/**
 * Fallback response templates for when AI services are unavailable.
 * These templates ensure the chat system remains functional even during service outages,
 * providing professional responses that maintain user engagement and lead capture.
 * 
 * @type {Object}
 * @property {string} default - Standard fallback response for general inquiries
 * @property {Function} personalized - Dynamic response generator for service-specific inquiries
 * 
 * @description These templates are critical for system reliability and ensure
 * that potential leads are not lost due to technical difficulties. They include
 * contact information and service offerings to maintain business continuity.
 */
const FALLBACK_RESPONSES = {
  default: `Hello! I'm Jarvis from Kingdom Design House. I'm currently experiencing technical difficulties with my AI services, but I'd be happy to help you with your web development, IT services, networking, and AI solutions needs.

For immediate assistance, please contact us:
📞 Phone: 347.927.8846
📧 Email: kingdomdesignhouse@gmail.com

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
📧 Email: kingdomdesignhouse@gmail.com

I'll make sure our team gets back to you quickly with a personalized proposal for your needs. What's your timeline looking like for this project?`
};

/**
 * Creates a comprehensive system prompt for the AI assistant (Jarvis) that includes
 * company context, conversation history, and behavioral guidelines.
 * 
 * @param {string} context - Relevant context from retrieved documents via Pinecone search
 * @param {Array} conversationHistory - Array of previous conversation messages
 * @returns {string} Formatted system prompt for AI model
 * 
 * @description This function is central to the RAG system's effectiveness. It:
 * - Provides Jarvis with company information and service offerings
 * - Includes relevant context from document search for informed responses
 * - Maintains conversation context for coherent interactions
 * - Sets behavioral guidelines for professional lead qualification
 * 
 * The system prompt ensures Jarvis responds consistently with company values
 * and effectively qualifies leads through structured conversation flow.
 */
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

/**
 * Generates AI-powered responses using the RAG (Retrieval-Augmented Generation) system.
 * This function orchestrates the core AI workflow: document retrieval, context building,
 * and response generation with fallback handling for service reliability.
 * 
 * @param {string} query - The user's current message/query
 * @param {Array} conversationHistory - Array of previous conversation messages
 * @returns {Promise<Object>} Response object containing:
 *   - response: AI-generated response text
 *   - relevantDocs: Array of retrieved documents with metadata
 * 
 * @description This function implements the core RAG workflow:
 * 1. Searches Pinecone vector database for relevant documents
 * 2. Builds context from retrieved documents
 * 3. Creates system prompt with context and conversation history
 * 4. Generates AI response using OpenAI GPT model
 * 5. Falls back to template responses if AI services fail
 * 
 * This is the primary function that makes the chat system intelligent and context-aware.
 */
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

/**
 * Extracts structured information from user queries using AI-powered analysis.
 * This function uses OpenAI's advanced language understanding to identify and
 * categorize lead information with high accuracy and context awareness.
 * 
 * @param {string} query - The user's message/query to analyze
 * @returns {Promise<Object|null>} Structured lead information or null if extraction fails
 * 
 * @description This function provides AI-powered lead extraction that:
 * - Uses advanced NLP to understand user intent and context
 * - Extracts contact information, service interests, and project details
 * - Provides higher accuracy than regex-based extraction
 * - Handles complex conversation patterns and implicit information
 * 
 * This is the preferred method for lead extraction when AI services are available,
 * falling back to extractBasicLeadInfo when AI services are unavailable.
 */
const getStructuredInfo = async (query) => {
  try {
    return await extractStructuredInfo(query);
  } catch (extractError) {
    console.log('Structured info extraction failed:', extractError.message);
    return null;
  }
};

/**
 * Determines whether to create a HubSpot lead based on available information.
 * This function implements the lead creation logic by evaluating structured information
 * and falling back to basic extraction when needed.
 * 
 * @param {Object|null} structuredInfo - AI-extracted structured information
 * @param {string} query - The user's current message/query
 * @param {Array} conversationHistory - Array of previous conversation messages
 * @returns {Promise<Object|null>} HubSpot lead object or null if no lead created
 * 
 * @description This function implements the lead qualification logic:
 * 1. First attempts to use AI-extracted structured information
 * 2. Falls back to basic regex-based extraction if AI data unavailable
 * 3. Only creates leads when email and service information are available
 * 4. Enriches lead data with conversation history for context
 * 
 * This function ensures leads are only created when sufficient information
 * is available for meaningful follow-up by the sales team.
 */
const createLeadIfPossible = async (structuredInfo, query, conversationHistory = []) => {
  console.log('Lead Creation Debug - createLeadIfPossible:');
  console.log('Structured Info:', structuredInfo);
  console.log('Query:', query);
  console.log('Conversation History:', conversationHistory);
  
  if (structuredInfo?.email && structuredInfo?.service_requested) {
    console.log('Using structured info for lead creation');
    return await createHubSpotLead(structuredInfo, conversationHistory);
  } else {
    console.log('Falling back to basic lead info extraction');
    // Create enhanced query with full conversation for better service detection
    const fullConversation = conversationHistory.map(msg => `${msg.role}: ${msg.content}`).join(' ') + ' ' + query;
    const basicLeadInfo = extractBasicLeadInfo(fullConversation, conversationHistory);
    console.log('Basic Lead Info:', basicLeadInfo);
    if (basicLeadInfo.email) {
      console.log('Creating lead with basic info');
      return await createHubSpotLead(basicLeadInfo, conversationHistory);
    } else {
      console.log('No email found in basic lead info - skipping lead creation');
    }
  }
  return null;
};

/**
 * Creates a lead in HubSpot CRM with enriched data and conversation context.
 * This function handles the actual lead creation process, including data enrichment
 * and error handling for HubSpot API integration.
 * 
 * @param {Object} leadData - Lead information extracted from user query
 * @param {Array} conversationHistory - Array of conversation messages for context
 * @returns {Promise<Object|null>} HubSpot lead response or null if creation fails
 * 
 * @description This function:
 * 1. Enriches lead data with conversation history and metadata
 * 2. Adds source tracking and communication preferences
 * 3. Creates the lead in HubSpot CRM via API
 * 4. Handles API errors gracefully with logging
 * 5. Returns lead information for response generation
 * 
 * This function is critical for converting chat interactions into actionable
 * sales leads in the CRM system.
 */
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

/**
 * Main chat handler that orchestrates the entire RAG system workflow.
 * This is the primary API endpoint that processes chat messages, generates responses,
 * and manages lead creation through the complete RAG pipeline.
 * 
 * @param {Object} req - Express request object containing:
 *   - body.query: User's message/query
 *   - body.conversationHistory: Array of previous conversation messages
 * @param {Object} res - Express response object
 * @returns {Promise<void>} Sends JSON response with chat data
 * 
 * @description This function implements the complete RAG workflow:
 * 1. Validates incoming request data
 * 2. Generates AI response using document retrieval and context
 * 3. Extracts structured information for lead qualification
 * 4. Creates HubSpot leads when appropriate
 * 5. Personalizes responses based on lead information
 * 6. Returns comprehensive response with all relevant data
 * 
 * This is the central orchestrator that ties together all system components:
 * - Pinecone vector search for document retrieval
 * - OpenAI GPT for response generation and information extraction
 * - HubSpot CRM for lead management
 * - Fallback systems for service reliability
 * 
 * The function ensures robust error handling and graceful degradation
 * when individual services are unavailable.
 */
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