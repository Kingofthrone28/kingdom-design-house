const OpenAI = require('openai');

let openaiClient = null;

const initializeOpenAI = () => {
  if (openaiClient) return openaiClient

  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error('OPENAI_API_KEY environment variable is required');
  }

  try {
    openaiClient = new OpenAI({
      apiKey: apiKey
    });

    console.log('OpenAI client initialized successfully');
    return openaiClient;
  } catch (error) {
    console.error('Failed to initialize OpenAI:', error);
    throw error;
  }
}

const generateEmbedding = async (text) => {
  if (!openaiClient) {
    initializeOpenAI();
  }

  try {
    const response = await openaiClient.embeddings.create({
      model: 'text-embedding-3-small',
      input: text
    });

    return response.data[0].embedding;
  } catch (error) {
    console.error('Error generating embedding:', error);
    throw error;
  }
}

const generateResponse = async (messages, systemPrompt, maxTokens = 1000) => {
  if (!openaiClient) {
    initializeOpenAI();
  }

  try {
    const response = await openaiClient.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages
      ],
      max_tokens: maxTokens,
      temperature: 0.7,
      presence_penalty: 0.1,
      frequency_penalty: 0.1
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('Error generating response:', error);
    throw error;
  }
}

const extractStructuredInfo = async (text, conversationHistory = []) => {
  if (!openaiClient) {
    initializeOpenAI();
  }

  // Build full context from conversation history
  const fullContext = conversationHistory
    .map(msg => `${msg.role}: ${msg.content}`)
    .join('\n') + `\nuser: ${text}`;

  try {
    const response = await openaiClient.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'You are an expert at extracting contact information from conversations. Extract only the information explicitly mentioned by the user. Be precise and accurate.'
        },
        {
          role: 'user',
          content: `Extract contact information from this conversation:\n\n${fullContext}`
        }
      ],
      functions: [
        {
          name: 'extract_contact_info',
          description: 'Extract contact information from user conversation',
          parameters: {
            type: 'object',
            properties: {
              first_name: {
                type: 'string',
                description: 'First name if explicitly mentioned'
              },
              last_name: {
                type: 'string',
                description: 'Last name if explicitly mentioned'
              },
              email: {
                type: 'string',
                description: 'Email address if mentioned'
              },
              phone: {
                type: 'string',
                description: 'Phone number if mentioned'
              },
              company: {
                type: 'string',
                description: 'Company name if mentioned'
              },
              service_requested: {
                type: 'string',
                enum: ['ai solutions', 'web development', 'networking', 'it services', 'General Inquiry'],
                description: 'Service they are interested in based on conversation context'
              },
              budget_range: {
                type: 'string',
                description: 'Budget mentioned (e.g., "$3000", "$5k", "under $10k")'
              },
              timeline: {
                type: 'string',
                description: 'Timeline mentioned (e.g., "Q3", "3 months", "ASAP")'
              },
              project_description: {
                type: 'string',
                description: 'Brief description of their project or needs'
              }
            },
            required: []
          }
        }
      ],
      function_call: { name: 'extract_contact_info' },
      max_tokens: 500,
      temperature: 0.1
    });

    const functionCall = response.choices[0].message.function_call;
    if (functionCall && functionCall.name === 'extract_contact_info') {
      const extractedInfo = JSON.parse(functionCall.arguments);
      console.log('OpenAI Function Call - Extracted Info:', extractedInfo);
      return extractedInfo;
    } else {
      console.warn('OpenAI Function Call - No function call returned');
      return {};
    }
  } catch (error) {
    console.error('Error extracting structured info with function calling:', error);
    return {};
  }
}

module.exports = {
  initializeOpenAI,
  generateEmbedding,
  generateResponse,
  extractStructuredInfo
};