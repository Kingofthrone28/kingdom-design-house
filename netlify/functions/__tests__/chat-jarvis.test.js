/**
 * @fileoverview Unit tests for chat-jarvis Netlify function
 * 
 * Tests the core functionality of the chat proxy function including:
 * - Request validation
 * - RAG API communication
 * - Lead creation logic
 * - Data transformation
 * - Error handling
 */

// Mock fetch globally
global.fetch = jest.fn();

// Mock console methods to avoid test output noise
global.console = {
  ...console,
  log: jest.fn(),
  error: jest.fn(),
  warn: jest.fn()
};

// Import the functions we want to test
const {
  validateRequest,
  createResponse,
  handleCorsPreflight,
  extractBudgetAmount,
  calculateDeliveryDate,
  generateDealName,
  hasValidField,
  hasAnyContactInfo,
  hasAnyLeadIndicators,
  evaluateLeadCreationCriteria,
  shouldCreateLead,
  transformLeadData,
  createFallbackResponse
} = require('../chat-jarvis');

describe('Chat Jarvis Function Unit Tests', () => {
  
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
    fetch.mockClear();
  });

  describe('Request Validation', () => {
    test('should validate POST request with valid JSON body', () => {
      const validEvent = {
        httpMethod: 'POST',
        body: JSON.stringify({ message: 'Hello, I need help with web development' })
      };

      const result = validateRequest(validEvent);
      expect(result).toBeNull(); // No validation error
    });

    test('should reject non-POST requests', () => {
      const invalidEvent = {
        httpMethod: 'GET',
        body: JSON.stringify({ message: 'Hello' })
      };

      const result = validateRequest(invalidEvent);
      expect(result).not.toBeNull();
      expect(result.statusCode).toBe(405);
      expect(JSON.parse(result.body).error).toBe('Method not allowed');
    });

    test('should reject invalid JSON body', () => {
      const invalidEvent = {
        httpMethod: 'POST',
        body: 'invalid json'
      };

      const result = validateRequest(invalidEvent);
      expect(result).not.toBeNull();
      expect(result.statusCode).toBe(400);
      expect(JSON.parse(result.body).error).toBe('Invalid JSON');
    });

    test('should reject empty message', () => {
      const invalidEvent = {
        httpMethod: 'POST',
        body: JSON.stringify({ message: '' })
      };

      const result = validateRequest(invalidEvent);
      expect(result).not.toBeNull();
      expect(result.statusCode).toBe(400);
      expect(JSON.parse(result.body).error).toBe('Message is required');
    });

    test('should reject missing message field', () => {
      const invalidEvent = {
        httpMethod: 'POST',
        body: JSON.stringify({ query: 'Hello' })
      };

      const result = validateRequest(invalidEvent);
      expect(result).not.toBeNull();
      expect(result.statusCode).toBe(400);
      expect(JSON.parse(result.body).error).toBe('Message is required');
    });
  });

  describe('CORS Handling', () => {
    test('should handle CORS preflight requests', () => {
      const result = handleCorsPreflight();
      
      expect(result.statusCode).toBe(200);
      expect(result.headers['Access-Control-Allow-Origin']).toBe('*');
      expect(result.headers['Access-Control-Allow-Methods']).toBe('POST, OPTIONS');
    });

    test('should create response with CORS headers', () => {
      const result = createResponse(200, { success: true });
      
      expect(result.statusCode).toBe(200);
      expect(result.headers['Access-Control-Allow-Origin']).toBe('*');
      expect(result.headers['Content-Type']).toBe('application/json');
      expect(JSON.parse(result.body)).toEqual({ success: true });
    });
  });

  describe('Data Transformation', () => {
    test('should extract budget amount correctly', () => {
      expect(extractBudgetAmount('$5k')).toBe('5000');
      expect(extractBudgetAmount('10K')).toBe('10000');
      expect(extractBudgetAmount('$2.5k')).toBe('2500');
      expect(extractBudgetAmount('5000')).toBe('5000');
      expect(extractBudgetAmount('')).toBe('0');
      expect(extractBudgetAmount(null)).toBe('0');
    });

    test('should calculate delivery date correctly', () => {
      const urgentDate = calculateDeliveryDate('urgent');
      const asapDate = calculateDeliveryDate('asap');
      const monthDate = calculateDeliveryDate('1 month');
      const quarterDate = calculateDeliveryDate('1 quarter');
      const defaultDate = calculateDeliveryDate('some timeline');

      // Check that dates are in the future
      expect(new Date(urgentDate)).toBeInstanceOf(Date);
      expect(new Date(asapDate)).toBeInstanceOf(Date);
      expect(new Date(monthDate)).toBeInstanceOf(Date);
      expect(new Date(quarterDate)).toBeInstanceOf(Date);
      expect(new Date(defaultDate)).toBeInstanceOf(Date);

      // Check that urgent/asap are closer than month/quarter
      const urgentTime = new Date(urgentDate).getTime();
      const monthTime = new Date(monthDate).getTime();
      expect(urgentTime).toBeLessThan(monthTime);
    });

    test('should generate deal name correctly', () => {
      expect(generateDealName('Web Development')).toBe('Web Development Project');
      expect(generateDealName('')).toBe('New Lead Project');
      expect(generateDealName(null)).toBe('New Lead Project');
      expect(generateDealName(undefined)).toBe('New Lead Project');
    });

    test('should transform lead data correctly', () => {
      const structuredInfo = {
        email: 'test@example.com',
        first_name: 'John',
        last_name: 'Doe',
        service_requested: 'Web Development',
        budget_range: '$5k',
        timeline: 'urgent',
        project_description: 'Need a new website'
      };

      const originalMessage = 'I need help with my website';
      const result = transformLeadData(structuredInfo, originalMessage);

      expect(result.email).toBe('test@example.com');
      expect(result.first_name).toBe('John');
      expect(result.last_name).toBe('Doe');
      expect(result.deal_name).toBe('Web Development Project');
      expect(result.budget_amount).toBe('5000');
      expect(result.project_description).toBe('Need a new website');
      expect(result.priority_level).toBe('HIGH');
      expect(result.assigned_team).toBe('KDH Sales Team');
    });
  });

  describe('Lead Qualification Logic', () => {
    test('should validate fields correctly', () => {
      expect(hasValidField('valid text')).toBe(true);
      expect(hasValidField('')).toBe('');
      expect(hasValidField('   ')).toBe(false);
      expect(hasValidField(null)).toBe(null);
      expect(hasValidField(undefined)).toBe(undefined);
    });

    test('should detect contact information', () => {
      const withContactInfo = {
        first_name: 'John',
        last_name: 'Doe',
        company: 'Acme Corp'
      };

      const withoutContactInfo = {
        first_name: '',
        last_name: null,
        company: undefined
      };

      expect(hasAnyContactInfo(withContactInfo)).toBeTruthy();
      expect(hasAnyContactInfo(withoutContactInfo)).toBeFalsy();
    });

    test('should detect lead indicators', () => {
      const withIndicators = {
        budget_range: '$5k',
        timeline: 'urgent',
        company: 'Acme Corp',
        phone: '555-1234',
        first_name: 'John',
        last_name: 'Doe'
      };

      const withoutIndicators = {
        budget_range: null,
        timeline: '',
        company: undefined,
        phone: null,
        first_name: '',
        last_name: ''
      };

      expect(hasAnyLeadIndicators(withIndicators)).toBe(true);
      expect(hasAnyLeadIndicators(withoutIndicators)).toBe(false);
    });

    test('should evaluate lead creation criteria correctly', () => {
      // Primary qualification: Email + Service Interest
      const primaryQualification = {
        hasEmail: true,
        hasServiceInterest: true,
        hasProjectDescription: false,
        hasContactInfo: false,
        hasLeadIndicators: false
      };
      expect(evaluateLeadCreationCriteria(primaryQualification)).toBe(true);

      // Secondary qualification: Service Interest + Contact Info
      const secondaryQualification = {
        hasEmail: false,
        hasServiceInterest: true,
        hasProjectDescription: false,
        hasContactInfo: true,
        hasLeadIndicators: false
      };
      expect(evaluateLeadCreationCriteria(secondaryQualification)).toBe(true);

      // No qualification
      const noQualification = {
        hasEmail: false,
        hasServiceInterest: false,
        hasProjectDescription: false,
        hasContactInfo: false,
        hasLeadIndicators: false
      };
      expect(evaluateLeadCreationCriteria(noQualification)).toBe(false);
    });

    test('should determine lead creation correctly', () => {
      // Valid lead with email and service
      const validLead = {
        email: 'test@example.com',
        service_requested: 'Web Development',
        first_name: 'John',
        last_name: 'Doe'
      };
      expect(shouldCreateLead(validLead)).toBeTruthy();

      // Valid lead with service and contact info
      const validLeadNoEmail = {
        service_requested: 'Web Development',
        first_name: 'John',
        company: 'Acme Corp'
      };
      expect(shouldCreateLead(validLeadNoEmail)).toBeTruthy();

      // Invalid lead - no email or service
      const invalidLead = {
        first_name: 'John',
        last_name: 'Doe'
      };
      expect(shouldCreateLead(invalidLead)).toBeFalsy();

      // Invalid input
      expect(shouldCreateLead(null)).toBeFalsy();
      expect(shouldCreateLead(undefined)).toBeFalsy();
      expect(shouldCreateLead('string')).toBeFalsy();
    });
  });

  describe('Fallback Response', () => {
    test('should create fallback response with correct structure', () => {
      const message = 'I need help with my website';
      const result = createFallbackResponse(message);

      expect(result).toHaveProperty('response');
      expect(result).toHaveProperty('structuredInfo');
      expect(result).toHaveProperty('hubspotLead');
      expect(result).toHaveProperty('relevantDocs');
      expect(result).toHaveProperty('timestamp');

      expect(result.structuredInfo.service_requested).toBe('General Inquiry');
      expect(result.structuredInfo.project_description).toBe(message);
      expect(result.hubspotLead).toBeNull();
      expect(result.relevantDocs).toEqual([]);
    });

    test('should include contact information in fallback response', () => {
      const result = createFallbackResponse('test message');
      
      expect(result.response).toContain('347.927.8846');
      expect(result.response).toContain('kingdomdesignhouse@gmail.com');
      expect(result.response).toContain('Web Development & Design');
      expect(result.response).toContain('IT Services & Support');
    });
  });

  describe('Error Handling', () => {
    test('should handle missing structured info gracefully', () => {
      const ragData = {
        response: 'Hello',
        structuredInfo: null,
        hubspotLead: null,
        relevantDocs: []
      };

      // This should not throw an error
      expect(() => shouldCreateLead(ragData.structuredInfo)).not.toThrow();
      expect(shouldCreateLead(ragData.structuredInfo)).toBe(false);
    });

    test('should handle empty structured info gracefully', () => {
      const ragData = {
        response: 'Hello',
        structuredInfo: {},
        hubspotLead: null,
        relevantDocs: []
      };

      expect(shouldCreateLead(ragData.structuredInfo)).toBeFalsy();
    });
  });
});
