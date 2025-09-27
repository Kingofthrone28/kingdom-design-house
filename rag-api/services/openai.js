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

const extractStructuredInfo = async (text) => {
  if (!openaiClient) {
    initializeOpenAI();
  }

  const systemPrompt = `You are an AI assistant that extracts structured information from customer inquiries. 
  Extract the following information if mentioned:
  - email: Customer's email address
  - first_name: Customer's first name
  - last_name: Customer's last name
  - phone: Customer's phone number
  - company: Customer's company name
  - website: Customer's website URL
  - service_requested: What service they're interested in (Web Development, IT Services, Networking, AI Solutions, etc.)
  - budget_range: Their budget range (e.g., "$5k-10k", "under $5k", "$10k+")
  - timeline: When they need the project completed
  - project_description: Description of their project or needs

  Return ONLY a JSON object with the extracted information. If a field is not mentioned, use null.
  Example: {"email": "john@example.com", "first_name": "John", "service_requested": "Web Development", "budget_range": "$5k-10k", "timeline": "next month", "project_description": "Need a new website", "phone": null, "company": null, "website": null, "last_name": null}`;

  try {
    const response = await openaiClient.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: text }
      ],
      max_tokens: 500,
      temperature: 0.1
    });

    const content = response.choices[0].message.content;
    
    // Try to parse the JSON response
    try {
      return JSON.parse(content);
    } catch (parseError) {
      console.error('Error parsing structured info JSON:', parseError);
      return {};
    }
  } catch (error) {
    console.error('Error extracting structured info:', error);
    return {};
  }
}

module.exports = {
  initializeOpenAI,
  generateEmbedding,
  generateResponse,
  extractStructuredInfo
};