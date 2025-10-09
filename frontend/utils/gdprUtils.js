/**
 * @fileoverview GDPR Utility Functions
 * 
 * Common utility functions for GDPR compliance across the application.
 * Includes data anonymization, consent validation, and compliance helpers.
 * 
 * @author Kingdom Design House Development Team
 * @version 1.0.0
 * @since 2024
 */

/**
 * Anonymizes IP addresses for GDPR compliance
 * @param {string} ip - IP address to anonymize
 * @returns {string} Anonymized IP address
 */
export const anonymizeIP = (ip) => {
  if (!ip) return 'anonymized';
  
  // IPv4 anonymization - remove last octet
  if (ip.includes('.')) {
    const parts = ip.split('.');
    if (parts.length === 4) {
      return `${parts[0]}.${parts[1]}.${parts[2]}.0`;
    }
  }
  
  // IPv6 anonymization - remove last 64 bits
  if (ip.includes(':')) {
    const parts = ip.split(':');
    if (parts.length >= 4) {
      return `${parts.slice(0, 4).join(':')}::`;
    }
  }
  
  return 'anonymized';
};

/**
 * Anonymizes email addresses for GDPR compliance
 * @param {string} email - Email address to anonymize
 * @returns {string} Anonymized email address
 */
export const anonymizeEmail = (email) => {
  if (!email || !email.includes('@')) return 'anonymized@example.com';
  
  const [localPart, domain] = email.split('@');
  const anonymizedLocal = localPart.length > 2 
    ? `${localPart[0]}***${localPart[localPart.length - 1]}`
    : '***';
  
  return `${anonymizedLocal}@${domain}`;
};

/**
 * Anonymizes phone numbers for GDPR compliance
 * @param {string} phone - Phone number to anonymize
 * @returns {string} Anonymized phone number
 */
export const anonymizePhone = (phone) => {
  if (!phone) return 'anonymized';
  
  // Keep first 3 and last 3 digits, replace middle with asterisks
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length < 6) return '***-***-****';
  
  const first = cleaned.slice(0, 3);
  const last = cleaned.slice(-3);
  const middle = '*'.repeat(cleaned.length - 6);
  
  return `${first}-${middle}-${last}`;
};

/**
 * Validates consent data structure
 * @param {Object} consent - Consent object to validate
 * @returns {boolean} True if valid consent structure
 */
export const validateConsentStructure = (consent) => {
  if (!consent || typeof consent !== 'object') return false;
  
  const requiredFields = ['necessary', 'analytics', 'marketing', 'personalization', 'thirdParty'];
  const hasAllFields = requiredFields.every(field => field in consent);
  const hasValidTypes = requiredFields.every(field => typeof consent[field] === 'boolean');
  
  return hasAllFields && hasValidTypes;
};

/**
 * Validates user preferences structure
 * @param {Object} preferences - Preferences object to validate
 * @returns {boolean} True if valid preferences structure
 */
export const validatePreferencesStructure = (preferences) => {
  if (!preferences || typeof preferences !== 'object') return false;
  
  const requiredFields = ['dataProcessing', 'marketingEmails', 'analyticsTracking', 'cookieStorage'];
  const hasAllFields = requiredFields.every(field => field in preferences);
  const hasValidTypes = requiredFields.every(field => typeof preferences[field] === 'boolean');
  
  return hasAllFields && hasValidTypes;
};

/**
 * Creates a GDPR-compliant audit log entry
 * @param {string} eventType - Type of event
 * @param {Object} data - Event data
 * @param {string} userId - User identifier (optional)
 * @returns {Object} Audit log entry
 */
export const createAuditLogEntry = (eventType, data = {}, userId = null) => {
  return {
    timestamp: new Date().toISOString(),
    eventType,
    data: sanitizeAuditData(data),
    userId: userId ? anonymizeEmail(userId) : null,
    userAgent: navigator.userAgent,
    ip: 'anonymized', // In production, this would be properly anonymized
    sessionId: generateSessionId()
  };
};

/**
 * Sanitizes data for audit logging
 * @param {Object} data - Data to sanitize
 * @returns {Object} Sanitized data
 */
export const sanitizeAuditData = (data) => {
  if (!data || typeof data !== 'object') return {};
  
  const sanitized = { ...data };
  
  // Remove or anonymize sensitive fields
  const sensitiveFields = ['email', 'phone', 'address', 'ssn', 'creditCard'];
  sensitiveFields.forEach(field => {
    if (sanitized[field]) {
      if (field === 'email') {
        sanitized[field] = anonymizeEmail(sanitized[field]);
      } else if (field === 'phone') {
        sanitized[field] = anonymizePhone(sanitized[field]);
      } else {
        sanitized[field] = '[REDACTED]';
      }
    }
  });
  
  return sanitized;
};

/**
 * Generates a session ID for tracking
 * @returns {string} Session ID
 */
export const generateSessionId = () => {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Checks if consent is still valid (not expired)
 * @param {string} consentDate - Date when consent was given
 * @param {number} maxAgeDays - Maximum age in days (default: 365)
 * @returns {boolean} True if consent is still valid
 */
export const isConsentValid = (consentDate, maxAgeDays = 365) => {
  if (!consentDate) return false;
  
  const consent = new Date(consentDate);
  const now = new Date();
  const maxAge = maxAgeDays * 24 * 60 * 60 * 1000; // Convert to milliseconds
  
  return (now - consent) < maxAge;
};

/**
 * Calculates consent expiration date
 * @param {string} consentDate - Date when consent was given
 * @param {number} maxAgeDays - Maximum age in days (default: 365)
 * @returns {Date} Expiration date
 */
export const getConsentExpirationDate = (consentDate, maxAgeDays = 365) => {
  if (!consentDate) return null;
  
  const consent = new Date(consentDate);
  const maxAge = maxAgeDays * 24 * 60 * 60 * 1000; // Convert to milliseconds
  
  return new Date(consent.getTime() + maxAge);
};

/**
 * Formats consent data for display
 * @param {Object} consent - Consent object
 * @returns {Object} Formatted consent data
 */
export const formatConsentForDisplay = (consent) => {
  if (!validateConsentStructure(consent)) {
    return { error: 'Invalid consent structure' };
  }
  
  const consentTypes = {
    necessary: 'Necessary Cookies',
    analytics: 'Analytics Cookies',
    marketing: 'Marketing Cookies',
    personalization: 'Personalization Cookies',
    thirdParty: 'Third-party Cookies'
  };
  
  const activeConsents = Object.entries(consent)
    .filter(([key, value]) => value === true)
    .map(([key]) => ({
      key,
      name: consentTypes[key] || key,
      description: getConsentDescription(key)
    }));
  
  return {
    total: Object.keys(consent).length,
    active: activeConsents.length,
    consents: activeConsents,
    summary: `${activeConsents.length} of ${Object.keys(consent).length} consent types active`
  };
};

/**
 * Gets description for consent type
 * @param {string} consentType - Type of consent
 * @returns {string} Description
 */
export const getConsentDescription = (consentType) => {
  const descriptions = {
    necessary: 'Essential for the website to function properly',
    analytics: 'Help us understand how visitors interact with our website',
    marketing: 'Used to track visitors across websites for advertising purposes',
    personalization: 'Remember your preferences and provide personalized content',
    thirdParty: 'Cookies from external services like social media and analytics'
  };
  
  return descriptions[consentType] || 'Unknown consent type';
};

/**
 * Creates a GDPR-compliant data export
 * @param {Object} userData - User data to export
 * @returns {Object} GDPR-compliant data export
 */
export const createDataExport = (userData) => {
  const exportData = {
    exportDate: new Date().toISOString(),
    dataController: {
      name: 'Kingdom Design House',
      email: 'privacy@kingdomdesignhouse.com',
      phone: '347.927.8846',
      address: 'Long Island, NY'
    },
    userData: sanitizeAuditData(userData),
    consentHistory: userData.consentHistory || [],
    dataCategories: categorizeUserData(userData),
    retentionPolicies: getRetentionPolicies()
  };
  
  return exportData;
};

/**
 * Categorizes user data for GDPR compliance
 * @param {Object} userData - User data to categorize
 * @returns {Object} Categorized data
 */
export const categorizeUserData = (userData) => {
  const categories = {
    identity: [],
    contact: [],
    behavioral: [],
    technical: [],
    marketing: []
  };
  
  Object.entries(userData).forEach(([key, value]) => {
    if (key.includes('name') || key.includes('id')) {
      categories.identity.push(key);
    } else if (key.includes('email') || key.includes('phone') || key.includes('address')) {
      categories.contact.push(key);
    } else if (key.includes('preference') || key.includes('behavior')) {
      categories.behavioral.push(key);
    } else if (key.includes('ip') || key.includes('userAgent') || key.includes('session')) {
      categories.technical.push(key);
    } else if (key.includes('marketing') || key.includes('advertising')) {
      categories.marketing.push(key);
    }
  });
  
  return categories;
};

/**
 * Gets data retention policies
 * @returns {Object} Retention policies
 */
export const getRetentionPolicies = () => {
  return {
    identity: 'Retained for the duration of the business relationship plus 7 years for legal compliance',
    contact: 'Retained for the duration of the business relationship plus 3 years for marketing purposes',
    behavioral: 'Retained for 2 years for service improvement purposes',
    technical: 'Retained for 1 year for security and performance monitoring',
    marketing: 'Retained for 2 years or until consent is withdrawn'
  };
};

/**
 * Validates GDPR compliance status
 * @param {Object} gdprState - Current GDPR state
 * @returns {Object} Compliance validation results
 */
export const validateGDPRCompliance = (gdprState) => {
  const validation = {
    compliant: true,
    issues: [],
    warnings: [],
    recommendations: []
  };
  
  // Check consent structure
  if (!validateConsentStructure(gdprState.consent)) {
    validation.compliant = false;
    validation.issues.push('Invalid consent structure');
  }
  
  // Check preferences structure
  if (!validatePreferencesStructure(gdprState.preferences)) {
    validation.compliant = false;
    validation.issues.push('Invalid preferences structure');
  }
  
  // Check consent validity
  if (gdprState.audit.consentDate && !isConsentValid(gdprState.audit.consentDate)) {
    validation.warnings.push('Consent may have expired');
    validation.recommendations.push('Request fresh consent from user');
  }
  
  // Check audit trail
  if (!gdprState.audit.events || gdprState.audit.events.length === 0) {
    validation.warnings.push('No audit trail found');
    validation.recommendations.push('Implement audit logging for compliance');
  }
  
  return validation;
};

/**
 * Creates a privacy policy summary
 * @returns {Object} Privacy policy summary
 */
export const getPrivacyPolicySummary = () => {
  return {
    dataController: 'Kingdom Design House',
    contactEmail: 'privacy@kingdomdesignhouse.com',
    dataCategories: [
      'Identity data (name, user ID)',
      'Contact data (email, phone, address)',
      'Technical data (IP address, browser type)',
      'Usage data (website interactions)',
      'Marketing data (preferences, communications)'
    ],
    legalBasis: [
      'Consent (for marketing and analytics)',
      'Contract performance (for service delivery)',
      'Legitimate interest (for security and improvement)'
    ],
    dataRights: [
      'Right to access',
      'Right to rectification',
      'Right to erasure',
      'Right to portability',
      'Right to object',
      'Right to restrict processing'
    ],
    retentionPeriods: getRetentionPolicies(),
    lastUpdated: new Date().toISOString()
  };
};

export default {
  anonymizeIP,
  anonymizeEmail,
  anonymizePhone,
  validateConsentStructure,
  validatePreferencesStructure,
  createAuditLogEntry,
  sanitizeAuditData,
  generateSessionId,
  isConsentValid,
  getConsentExpirationDate,
  formatConsentForDisplay,
  getConsentDescription,
  createDataExport,
  categorizeUserData,
  getRetentionPolicies,
  validateGDPRCompliance,
  getPrivacyPolicySummary
};
