/**
 * @fileoverview Google Analytics Utility Functions
 * 
 * Helper functions for tracking events, conversions, and user interactions
 * with Google Analytics in a GDPR-compliant manner.
 * 
 * @author Kingdom Design House Development Team
 * @version 1.0.0
 * @since 2024
 */

const GA_MEASUREMENT_ID = 'G-BEKZ5DH50B';

/**
 * Tracks a page view
 * @param {string} url - Page URL to track
 */
export const trackPageView = (url) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
      anonymize_ip: true,
    });
  }
};

/**
 * Tracks a custom event
 * @param {string} action - Event action (e.g., 'click', 'submit', 'view')
 * @param {string} category - Event category (e.g., 'Button', 'Form', 'Video')
 * @param {string} label - Event label (e.g., 'Contact Form', 'Pricing Plan')
 * @param {number} value - Event value (optional numeric value)
 */
export const trackEvent = (action, category, label, value = null) => {
  if (typeof window !== 'undefined' && window.gtag) {
    const eventParams = {
      event_category: category,
      event_label: label,
    };

    if (value !== null) {
      eventParams.value = value;
    }

    window.gtag('event', action, eventParams);
  }
};

/**
 * Tracks button clicks
 * @param {string} buttonName - Name of the button clicked
 */
export const trackButtonClick = (buttonName) => {
  trackEvent('click', 'Button', buttonName);
};

/**
 * Tracks form submissions
 * @param {string} formName - Name of the form submitted
 */
export const trackFormSubmission = (formName) => {
  trackEvent('submit', 'Form', formName);
};

/**
 * Tracks chat interactions
 * @param {string} action - Chat action (e.g., 'open', 'close', 'send_message')
 */
export const trackChatInteraction = (action) => {
  trackEvent(action, 'Chat', 'Jarvis AI Chat');
};

/**
 * Tracks video interactions
 * @param {string} action - Video action (e.g., 'play', 'pause', 'complete')
 * @param {string} videoTitle - Title of the video
 */
export const trackVideoInteraction = (action, videoTitle) => {
  trackEvent(action, 'Video', videoTitle);
};

/**
 * Tracks pricing plan views
 * @param {string} planName - Name of the pricing plan viewed
 */
export const trackPricingView = (planName) => {
  trackEvent('view', 'Pricing', planName);
};

/**
 * Tracks service interest
 * @param {string} serviceName - Name of the service
 */
export const trackServiceInterest = (serviceName) => {
  trackEvent('interest', 'Service', serviceName);
};

/**
 * Tracks lead generation
 * @param {string} source - Lead source (e.g., 'contact_form', 'chat', 'phone')
 */
export const trackLeadGeneration = (source) => {
  trackEvent('generate_lead', 'Lead', source);
};

/**
 * Tracks scroll depth
 * @param {number} percentage - Scroll percentage (25, 50, 75, 100)
 */
export const trackScrollDepth = (percentage) => {
  trackEvent('scroll', 'Engagement', `${percentage}%`, percentage);
};

/**
 * Tracks time on page
 * @param {number} seconds - Time spent on page in seconds
 */
export const trackTimeOnPage = (seconds) => {
  trackEvent('time_on_page', 'Engagement', `${seconds} seconds`, seconds);
};

/**
 * Tracks external link clicks
 * @param {string} url - External URL clicked
 */
export const trackExternalLink = (url) => {
  trackEvent('click', 'External Link', url);
};

/**
 * Tracks file downloads
 * @param {string} fileName - Name of the file downloaded
 */
export const trackFileDownload = (fileName) => {
  trackEvent('download', 'File', fileName);
};

/**
 * Tracks search queries
 * @param {string} searchTerm - Search term entered
 */
export const trackSearch = (searchTerm) => {
  trackEvent('search', 'Search', searchTerm);
};

/**
 * Tracks errors
 * @param {string} errorMessage - Error message
 * @param {string} errorLocation - Where the error occurred
 */
export const trackError = (errorMessage, errorLocation) => {
  trackEvent('error', 'Error', `${errorLocation}: ${errorMessage}`);
};

/**
 * Tracks conversions (e.g., contact form submission, lead capture)
 * @param {string} conversionType - Type of conversion
 * @param {number} value - Conversion value (optional)
 */
export const trackConversion = (conversionType, value = null) => {
  if (typeof window !== 'undefined' && window.gtag) {
    const conversionParams = {
      send_to: GA_MEASUREMENT_ID,
      value: value,
      currency: 'USD',
    };

    window.gtag('event', 'conversion', {
      ...conversionParams,
      event_category: 'Conversion',
      event_label: conversionType,
    });
  }
};

/**
 * Sets user properties
 * @param {Object} properties - User properties to set
 */
export const setUserProperties = (properties) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('set', 'user_properties', properties);
  }
};

/**
 * Updates consent settings
 * @param {boolean} analyticsConsent - Analytics consent status
 * @param {boolean} adConsent - Advertising consent status
 */
export const updateConsentSettings = (analyticsConsent, adConsent) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('consent', 'update', {
      analytics_storage: analyticsConsent ? 'granted' : 'denied',
      ad_storage: adConsent ? 'granted' : 'denied',
    });
  }
};

/**
 * Tracks custom dimensions
 * @param {string} dimensionName - Name of the custom dimension
 * @param {string} dimensionValue - Value of the custom dimension
 */
export const trackCustomDimension = (dimensionName, dimensionValue) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('set', dimensionName, dimensionValue);
  }
};

/**
 * Tracks exceptions
 * @param {string} description - Exception description
 * @param {boolean} fatal - Whether the exception was fatal
 */
export const trackException = (description, fatal = false) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'exception', {
      description: description,
      fatal: fatal,
    });
  }
};

/**
 * Tracks timing (performance metrics)
 * @param {string} category - Timing category
 * @param {string} variable - Timing variable
 * @param {number} value - Timing value in milliseconds
 * @param {string} label - Timing label
 */
export const trackTiming = (category, variable, value, label = '') => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'timing_complete', {
      name: variable,
      value: value,
      event_category: category,
      event_label: label,
    });
  }
};

export default {
  trackPageView,
  trackEvent,
  trackButtonClick,
  trackFormSubmission,
  trackChatInteraction,
  trackVideoInteraction,
  trackPricingView,
  trackServiceInterest,
  trackLeadGeneration,
  trackScrollDepth,
  trackTimeOnPage,
  trackExternalLink,
  trackFileDownload,
  trackSearch,
  trackError,
  trackConversion,
  setUserProperties,
  updateConsentSettings,
  trackCustomDimension,
  trackException,
  trackTiming,
};
