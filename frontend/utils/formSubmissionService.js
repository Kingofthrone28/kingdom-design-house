/**
 * Form Submission Service
 * 
 * Handles form submission with input sanitization, validation, and API communication.
 * Provides secure form processing for contact forms and other user input.
 */

/**
 * Sanitizes input to prevent XSS and other security issues
 * @param {string} input - Raw input string
 * @returns {string} Sanitized input
 */
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return '';
  
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .slice(0, 2000); // Limit length
};

/**
 * Validates email format
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid email format
 */
export const validateEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

/**
 * Validates phone number format
 * @param {string} phone - Phone number to validate
 * @returns {boolean} True if valid phone format
 */
export const validatePhone = (phone) => {
  if (!phone || phone.trim() === '') return true; // Optional field
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
};

/**
 * Validates name format (letters, spaces, hyphens, apostrophes only)
 * @param {string} name - Name to validate
 * @returns {boolean} True if valid name format
 */
export const validateName = (name) => {
  const nameRegex = /^[a-zA-Z\s'-]+$/;
  return nameRegex.test(name);
};

/**
 * Validates form data against field requirements
 * @param {Object} formData - Form data to validate
 * @param {Object} fieldConfig - Field configuration from siteData
 * @returns {Object} Validation result with errors
 */
export const validateFormData = (formData, fieldConfig) => {
  const errors = {};
  
  Object.entries(fieldConfig.fields).forEach(([fieldName, config]) => {
    const value = formData[fieldName] || '';
    const sanitizedValue = sanitizeInput(value);
    
    // Check required fields
    if (config.required && (!sanitizedValue || sanitizedValue.trim() === '')) {
      errors[fieldName] = `${config.label} is required`;
      return;
    }
    
    // Skip validation for empty optional fields
    if (!sanitizedValue && !config.required) return;
    
    // Type-specific validation
    switch (fieldName) {
      case 'email':
        if (!validateEmail(sanitizedValue)) {
          errors[fieldName] = 'Please enter a valid email address';
        }
        break;
        
      case 'phone':
        if (!validatePhone(sanitizedValue)) {
          errors[fieldName] = 'Please enter a valid phone number';
        }
        break;
        
      case 'name':
        if (!validateName(sanitizedValue)) {
          errors[fieldName] = 'Please enter a valid name (letters, spaces, hyphens, and apostrophes only)';
        }
        break;
        
      default:
        // Generic validation based on config
        if (config.validation) {
          if (config.validation.minLength && sanitizedValue.length < config.validation.minLength) {
            errors[fieldName] = `${config.label} must be at least ${config.validation.minLength} characters`;
          }
          if (config.validation.maxLength && sanitizedValue.length > config.validation.maxLength) {
            errors[fieldName] = `${config.label} must be no more than ${config.validation.maxLength} characters`;
          }
          if (config.validation.pattern && !new RegExp(config.validation.pattern).test(sanitizedValue)) {
            errors[fieldName] = `Please enter a valid ${config.label.toLowerCase()}`;
          }
        }
    }
  });
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Sanitizes all form data
 * @param {Object} formData - Raw form data
 * @returns {Object} Sanitized form data
 */
export const sanitizeFormData = (formData) => {
  const sanitized = {};
  
  Object.entries(formData).forEach(([key, value]) => {
    sanitized[key] = sanitizeInput(value);
  });
  
  return sanitized;
};

/**
 * Submits form data to the Express.js contact server
 * @param {Object} formData - Sanitized form data
 * @returns {Promise<Object>} Submission result
 */
export const submitContactForm = async (formData) => {
  try {
    // Use Express server endpoint (update this URL to your deployed server)
    const serverUrl = process.env.NEXT_PUBLIC_CONTACT_SERVER_URL || 'http://localhost:3002';
    
    // Submit to Express contact server
    const response = await fetch(`${serverUrl}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    return {
      success: true,
      data: result.data,
      message: result.message || 'Message sent successfully! We\'ll get back to you soon.'
    };
    
  } catch (error) {
    console.error('Form submission error:', error);
    return {
      success: false,
      error: error.message || 'Failed to send message. Please try again.',
      message: 'Sorry, there was an error sending your message. Please try again or contact us directly.'
    };
  }
};

/**
 * Main form submission handler
 * @param {Object} formData - Raw form data
 * @param {Object} fieldConfig - Field configuration from siteData
 * @returns {Promise<Object>} Submission result with validation
 */
export const handleFormSubmission = async (formData, fieldConfig) => {
  // Sanitize input data
  const sanitizedData = sanitizeFormData(formData);
  
  // Validate form data
  const validation = validateFormData(sanitizedData, fieldConfig);
  
  if (!validation.isValid) {
    return {
      success: false,
      errors: validation.errors,
      message: 'Please correct the errors below and try again.'
    };
  }
  
  // Submit form
  const submissionResult = await submitContactForm(sanitizedData);
  
  return {
    ...submissionResult,
    errors: validation.errors
  };
};

/**
 * Utility function to format phone number for display
 * @param {string} phone - Raw phone number
 * @returns {string} Formatted phone number
 */
export const formatPhoneNumber = (phone) => {
  if (!phone) return '';
  const cleaned = phone.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return phone;
};

/**
 * Utility function to format form data for email/display
 * @param {Object} formData - Form data
 * @returns {Object} Formatted form data
 */
export const formatFormDataForDisplay = (formData) => {
  return {
    ...formData,
    phone: formatPhoneNumber(formData.phone),
    timestamp: new Date().toLocaleString(),
    service: formData.service || 'Not specified'
  };
};
