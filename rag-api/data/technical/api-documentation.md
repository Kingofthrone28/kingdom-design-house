# Kingdom Design House API Documentation

## Overview

The Kingdom Design House API provides programmatic access to our services and data. This documentation covers authentication, endpoints, request/response formats, and integration examples.

## Base URL

- **Production**: `https://api.kingdomdesignhouse.com/v1`
- **Staging**: `https://staging-api.kingdomdesignhouse.com/v1`
- **Development**: `http://localhost:3001/api`

## Authentication

### API Key Authentication

All API requests require authentication using an API key. Include your API key in the request header:

```http
Authorization: Bearer YOUR_API_KEY
```

### Getting an API Key

1. Contact our support team at kingdomdesignhouse@gmail.com
2. Provide your business information and use case
3. We'll generate and provide your API key
4. Keep your API key secure and never share it publicly

## Rate Limiting

- **Standard Tier**: 100 requests per minute
- **Premium Tier**: 500 requests per minute
- **Enterprise Tier**: Custom limits based on agreement

Rate limit headers are included in all responses:
- `X-RateLimit-Limit`: Maximum requests per minute
- `X-RateLimit-Remaining`: Remaining requests in current window
- `X-RateLimit-Reset`: Time when the rate limit resets

## Error Handling

### Error Response Format

```json
{
  "error": {
    "code": "INVALID_REQUEST",
    "message": "The request is missing required parameters",
    "details": {
      "field": "email",
      "reason": "Email address is required"
    }
  },
  "timestamp": "2024-01-15T10:30:00Z",
  "request_id": "req_123456789"
}
```

### HTTP Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `429` - Rate Limited
- `500` - Internal Server Error

## Endpoints

### Chat API

#### Send Message

Send a message to our AI assistant and receive a response.

**Endpoint**: `POST /chat`

**Request Body**:
```json
{
  "query": "What are your web development services?",
  "conversationHistory": [
    {
      "role": "user",
      "content": "Hello, I need help with my website"
    },
    {
      "role": "assistant", 
      "content": "Hello! I'd be happy to help you with your website. What specific assistance do you need?"
    }
  ],
  "userId": "user_123456789"
}
```

**Response**:
```json
{
  "response": "We offer comprehensive web development services including custom website design, e-commerce solutions, and web applications. Our services include...",
  "structuredInfo": {
    "email": null,
    "first_name": null,
    "last_name": null,
    "phone": null,
    "company": null,
    "website": null,
    "service_requested": "web development",
    "budget_range": null,
    "timeline": null,
    "project_description": null
  },
  "hubspotLead": {
    "contactId": "contact_123456789",
    "dealId": "deal_123456789",
    "ticketId": "ticket_123456789"
  },
  "relevantDocs": [
    {
      "id": "web-development-1",
      "title": "Web Development Services",
      "score": 0.95,
      "metadata": {
        "category": "web-development",
        "tags": "web development, custom applications, react, nextjs"
      }
    }
  ],
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### Services API

#### Get Available Services

Retrieve a list of all available services.

**Endpoint**: `GET /services`

**Response**:
```json
{
  "services": [
    {
      "id": "web-development",
      "name": "Web Development",
      "description": "Custom web applications and websites",
      "category": "web",
      "pricing": {
        "starter": {
          "setupPrice": 2500,
          "monthlySupport": 150
        },
        "growth": {
          "setupPrice": 3800,
          "monthlySupport": 250
        },
        "scale": {
          "setupPrice": 5500,
          "monthlySupport": 500
        }
      }
    }
  ]
}
```

#### Get Service Details

Get detailed information about a specific service.

**Endpoint**: `GET /services/{serviceId}`

**Response**:
```json
{
  "id": "web-development",
  "name": "Web Development",
  "description": "Custom web applications and websites",
  "category": "web",
  "features": [
    "Custom React applications",
    "Next.js development",
    "Database design",
    "API development"
  ],
  "process": [
    {
      "step": 1,
      "title": "Discovery",
      "description": "Understanding your requirements and goals"
    }
  ],
  "pricing": {
    "starter": {
      "setupPrice": 2500,
      "monthlySupport": 150,
      "features": ["Up to 5 pages", "Basic SEO", "Contact form"]
    }
  }
}
```

### Projects API

#### Create Project

Create a new project request.

**Endpoint**: `POST /projects`

**Request Body**:
```json
{
  "name": "E-commerce Website",
  "description": "Custom e-commerce platform for retail business",
  "serviceType": "web-development",
  "budget": 10000,
  "timeline": "3 months",
  "contact": {
    "name": "John Smith",
    "email": "john@example.com",
    "phone": "555-123-4567",
    "company": "ABC Retail"
  }
}
```

**Response**:
```json
{
  "projectId": "proj_123456789",
  "status": "pending",
  "estimatedStartDate": "2024-02-01",
  "estimatedCompletionDate": "2024-05-01",
  "nextSteps": [
    "Initial consultation call",
    "Requirements gathering",
    "Proposal development"
  ]
}
```

#### Get Project Status

Get the current status of a project.

**Endpoint**: `GET /projects/{projectId}`

**Response**:
```json
{
  "projectId": "proj_123456789",
  "name": "E-commerce Website",
  "status": "in-progress",
  "progress": 45,
  "currentPhase": "development",
  "milestones": [
    {
      "name": "Design Approval",
      "status": "completed",
      "completedDate": "2024-02-15"
    },
    {
      "name": "Development Phase 1",
      "status": "in-progress",
      "dueDate": "2024-03-01"
    }
  ]
}
```

## Webhooks

### Project Updates

Receive real-time updates about project status changes.

**Endpoint**: `POST /webhooks/project-updates`

**Headers**:
```http
X-Webhook-Signature: sha256=...
Content-Type: application/json
```

**Payload**:
```json
{
  "event": "project.status.changed",
  "projectId": "proj_123456789",
  "data": {
    "oldStatus": "pending",
    "newStatus": "in-progress",
    "timestamp": "2024-01-15T10:30:00Z"
  }
}
```

### Lead Creation

Receive notifications when new leads are created.

**Endpoint**: `POST /webhooks/lead-created`

**Payload**:
```json
{
  "event": "lead.created",
  "leadId": "lead_123456789",
  "data": {
    "contact": {
      "name": "John Smith",
      "email": "john@example.com",
      "phone": "555-123-4567"
    },
    "service": "web-development",
    "source": "chat",
    "timestamp": "2024-01-15T10:30:00Z"
  }
}
```

## SDKs and Libraries

### JavaScript/Node.js

```bash
npm install @kingdomdesignhouse/api-client
```

```javascript
const KingdomAPI = require('@kingdomdesignhouse/api-client');

const client = new KingdomAPI({
  apiKey: 'your-api-key',
  environment: 'production' // or 'staging', 'development'
});

// Send a chat message
const response = await client.chat.sendMessage({
  query: 'What are your services?',
  conversationHistory: []
});

console.log(response.response);
```

### Python

```bash
pip install kingdom-design-house-api
```

```python
from kingdom_design_house import KingdomAPI

client = KingdomAPI(
    api_key='your-api-key',
    environment='production'
)

# Send a chat message
response = client.chat.send_message(
    query='What are your services?',
    conversation_history=[]
)

print(response.response)
```

### PHP

```bash
composer require kingdom-design-house/api-client
```

```php
<?php
use KingdomDesignHouse\API\Client;

$client = new Client([
    'api_key' => 'your-api-key',
    'environment' => 'production'
]);

// Send a chat message
$response = $client->chat->sendMessage([
    'query' => 'What are your services?',
    'conversationHistory' => []
]);

echo $response->response;
```

## Integration Examples

### Chatbot Integration

```javascript
// Example: Integrating with a website chatbot
class KingdomChatbot {
  constructor(apiKey) {
    this.client = new KingdomAPI({ apiKey });
    this.conversationHistory = [];
  }

  async sendMessage(message) {
    try {
      const response = await this.client.chat.sendMessage({
        query: message,
        conversationHistory: this.conversationHistory
      });

      // Update conversation history
      this.conversationHistory.push(
        { role: 'user', content: message },
        { role: 'assistant', content: response.response }
      );

      return response;
    } catch (error) {
      console.error('Chat error:', error);
      throw error;
    }
  }
}
```

### Lead Management Integration

```javascript
// Example: Creating a project from lead data
async function createProjectFromLead(leadData) {
  const client = new KingdomAPI({ apiKey: process.env.KINGDOM_API_KEY });

  try {
    const project = await client.projects.create({
      name: leadData.projectName,
      description: leadData.description,
      serviceType: leadData.serviceType,
      budget: leadData.budget,
      timeline: leadData.timeline,
      contact: {
        name: leadData.contactName,
        email: leadData.contactEmail,
        phone: leadData.contactPhone,
        company: leadData.company
      }
    });

    return project;
  } catch (error) {
    console.error('Project creation error:', error);
    throw error;
  }
}
```

## Support

### Documentation
- **API Reference**: https://docs.kingdomdesignhouse.com/api
- **Integration Guides**: https://docs.kingdomdesignhouse.com/integrations
- **Code Examples**: https://github.com/kingdomdesignhouse/api-examples

### Contact
- **Email**: api-support@kingdomdesignhouse.com
- **Phone**: 347.927.8846
- **Support Hours**: Monday - Friday, 9 AM - 6 PM EST

### Status Page
Monitor API status and uptime at: https://status.kingdomdesignhouse.com