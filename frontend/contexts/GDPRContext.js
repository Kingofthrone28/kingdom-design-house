/**
 * @fileoverview GDPR Context Provider
 * 
 * This context provides GDPR compliance state management across the application.
 * It handles consent tracking, user preferences, and data processing compliance.
 * 
 * @author Kingdom Design House Development Team
 * @version 1.0.0
 * @since 2024
 */

import React, { createContext, useContext, useReducer, useEffect } from 'react';

// GDPR Action Types
const GDPR_ACTIONS = {
  SET_CONSENT: 'SET_CONSENT',
  SET_PREFERENCES: 'SET_PREFERENCES',
  SET_BANNER_VISIBLE: 'SET_BANNER_VISIBLE',
  SET_MODAL_OPEN: 'SET_MODAL_OPEN',
  LOAD_SAVED_DATA: 'LOAD_SAVED_DATA',
  WITHDRAW_CONSENT: 'WITHDRAW_CONSENT',
  LOG_EVENT: 'LOG_EVENT'
};

// Initial GDPR State
const initialGDPRState = {
  consent: {
    necessary: true, // Always true - required for basic functionality
    analytics: false,
    marketing: false,
    personalization: false,
    thirdParty: false
  },
  preferences: {
    dataProcessing: false,
    marketingEmails: false,
    analyticsTracking: false,
    cookieStorage: false
  },
  ui: {
    showConsentBanner: false,
    showPrivacyModal: false,
    showDataRightsModal: false
  },
  audit: {
    consentGiven: false,
    consentDate: null,
    lastUpdated: null,
    events: []
  }
};

// GDPR Reducer
const gdprReducer = (state, action) => {
  switch (action.type) {
    case GDPR_ACTIONS.SET_CONSENT:
      return {
        ...state,
        consent: { ...state.consent, ...action.payload },
        audit: {
          ...state.audit,
          consentGiven: true,
          consentDate: new Date().toISOString(),
          lastUpdated: new Date().toISOString()
        }
      };

    case GDPR_ACTIONS.SET_PREFERENCES:
      return {
        ...state,
        preferences: { ...state.preferences, ...action.payload },
        audit: {
          ...state.audit,
          lastUpdated: new Date().toISOString()
        }
      };

    case GDPR_ACTIONS.SET_BANNER_VISIBLE:
      return {
        ...state,
        ui: { ...state.ui, showConsentBanner: action.payload }
      };

    case GDPR_ACTIONS.SET_MODAL_OPEN:
      return {
        ...state,
        ui: { 
          ...state.ui, 
          [action.modalType]: action.payload 
        }
      };

    case GDPR_ACTIONS.LOAD_SAVED_DATA:
      return {
        ...state,
        ...action.payload,
        ui: {
          ...state.ui,
          showConsentBanner: !action.payload.audit.consentGiven
        }
      };

    case GDPR_ACTIONS.WITHDRAW_CONSENT:
      return {
        ...state,
        consent: {
          necessary: true,
          analytics: false,
          marketing: false,
          personalization: false,
          thirdParty: false
        },
        preferences: {
          dataProcessing: false,
          marketingEmails: false,
          analyticsTracking: false,
          cookieStorage: false
        },
        audit: {
          ...state.audit,
          consentGiven: false,
          consentDate: null,
          lastUpdated: new Date().toISOString()
        }
      };

    case GDPR_ACTIONS.LOG_EVENT:
      return {
        ...state,
        audit: {
          ...state.audit,
          events: [
            ...state.audit.events.slice(-49), // Keep last 50 events
            {
              timestamp: new Date().toISOString(),
              type: action.eventType,
              data: action.payload
            }
          ]
        }
      };

    default:
      return state;
  }
};

// Create GDPR Context
const GDPRContext = createContext();

// GDPR Provider Component
export const GDPRProvider = ({ children }) => {
  const [state, dispatch] = useReducer(gdprReducer, initialGDPRState);

  // Load saved data on mount
  useEffect(() => {
    loadSavedGDPRData();
  }, []);

  // Save data to localStorage whenever state changes
  useEffect(() => {
    saveGDPRDataToStorage();
  }, [state.consent, state.preferences, state.audit]);

  /**
   * Loads saved GDPR data from localStorage
   */
  const loadSavedGDPRData = () => {
    try {
      const savedConsent = localStorage.getItem('gdpr-consent');
      const savedPreferences = localStorage.getItem('gdpr-preferences');
      const savedAudit = localStorage.getItem('gdpr-audit');

      if (savedConsent || savedPreferences || savedAudit) {
        dispatch({
          type: GDPR_ACTIONS.LOAD_SAVED_DATA,
          payload: {
            consent: savedConsent ? JSON.parse(savedConsent) : initialGDPRState.consent,
            preferences: savedPreferences ? JSON.parse(savedPreferences) : initialGDPRState.preferences,
            audit: savedAudit ? JSON.parse(savedAudit) : initialGDPRState.audit
          }
        });
      } else {
        // No saved data, show consent banner
        dispatch({ type: GDPR_ACTIONS.SET_BANNER_VISIBLE, payload: true });
      }
    } catch (error) {
      console.error('Error loading GDPR data:', error);
      dispatch({ type: GDPR_ACTIONS.SET_BANNER_VISIBLE, payload: true });
    }
  };

  /**
   * Saves GDPR data to localStorage
   */
  const saveGDPRDataToStorage = () => {
    try {
      localStorage.setItem('gdpr-consent', JSON.stringify(state.consent));
      localStorage.setItem('gdpr-preferences', JSON.stringify(state.preferences));
      localStorage.setItem('gdpr-audit', JSON.stringify(state.audit));
    } catch (error) {
      console.error('Error saving GDPR data:', error);
    }
  };

  /**
   * Updates consent settings
   */
  const updateConsent = (consentData) => {
    dispatch({ type: GDPR_ACTIONS.SET_CONSENT, payload: consentData });
    dispatch({ 
      type: GDPR_ACTIONS.LOG_EVENT, 
      eventType: 'consent_updated', 
      payload: consentData 
    });
  };

  /**
   * Updates user preferences
   */
  const updatePreferences = (preferences) => {
    dispatch({ type: GDPR_ACTIONS.SET_PREFERENCES, payload: preferences });
    dispatch({ 
      type: GDPR_ACTIONS.LOG_EVENT, 
      eventType: 'preferences_updated', 
      payload: preferences 
    });
  };

  /**
   * Sets consent banner visibility
   */
  const setBannerVisible = (visible) => {
    dispatch({ type: GDPR_ACTIONS.SET_BANNER_VISIBLE, payload: visible });
  };

  /**
   * Sets modal visibility
   */
  const setModalOpen = (modalType, open) => {
    dispatch({ type: GDPR_ACTIONS.SET_MODAL_OPEN, modalType, payload: open });
  };

  /**
   * Withdraws all consent
   */
  const withdrawConsent = () => {
    dispatch({ type: GDPR_ACTIONS.WITHDRAW_CONSENT });
    dispatch({ 
      type: GDPR_ACTIONS.LOG_EVENT, 
      eventType: 'consent_withdrawn', 
      payload: {} 
    });
    
    // Clear non-essential data
    clearNonEssentialData();
  };

  /**
   * Clears non-essential data from browser
   */
  const clearNonEssentialData = () => {
    // Clear analytics data
    if (typeof gtag !== 'undefined') {
      gtag('consent', 'update', {
        analytics_storage: 'denied',
        ad_storage: 'denied'
      });
    }

    // Clear marketing cookies
    document.cookie.split(";").forEach(cookie => {
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      if (name.includes('marketing') || name.includes('advertising')) {
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
      }
    });

    // Clear session storage for non-essential data
    Object.keys(sessionStorage).forEach(key => {
      if (key.includes('analytics') || key.includes('marketing')) {
        sessionStorage.removeItem(key);
      }
    });
  };

  /**
   * Logs GDPR events for audit purposes
   */
  const logEvent = (eventType, data) => {
    dispatch({ 
      type: GDPR_ACTIONS.LOG_EVENT, 
      eventType, 
      payload: data 
    });
  };

  /**
   * Checks if specific consent is given
   */
  const hasConsent = (consentType) => {
    return state.consent[consentType] === true;
  };

  /**
   * Checks if user has given any consent
   */
  const hasAnyConsent = () => {
    return Object.values(state.consent).some(value => value === true);
  };

  /**
   * Gets consent summary for display
   */
  const getConsentSummary = () => {
    const activeConsents = Object.entries(state.consent)
      .filter(([key, value]) => value === true)
      .map(([key]) => key);
    
    return {
      total: Object.keys(state.consent).length,
      active: activeConsents.length,
      types: activeConsents
    };
  };

  /**
   * Applies consent settings to the application
   */
  const applyConsentSettings = () => {
    // Analytics tracking
    if (state.consent.analytics) {
      console.log('Analytics tracking enabled');
      // Enable Google Analytics, etc.
    } else {
      console.log('Analytics tracking disabled');
      // Disable analytics
    }

    // Marketing cookies
    if (state.consent.marketing) {
      console.log('Marketing tracking enabled');
      // Enable marketing tracking
    } else {
      console.log('Marketing tracking disabled');
      // Disable marketing tracking
    }

    // Personalization
    if (state.consent.personalization) {
      console.log('Personalization enabled');
      // Enable personalization features
    } else {
      console.log('Personalization disabled');
      // Disable personalization
    }

    // Third-party services
    if (state.consent.thirdParty) {
      console.log('Third-party services enabled');
      // Enable third-party integrations
    } else {
      console.log('Third-party services disabled');
      // Disable third-party services
    }
  };

  // Apply consent settings whenever consent changes
  useEffect(() => {
    if (state.audit.consentGiven) {
      applyConsentSettings();
    }
  }, [state.consent]);

  // Context value
  const contextValue = {
    // State
    consent: state.consent,
    preferences: state.preferences,
    ui: state.ui,
    audit: state.audit,
    
    // Actions
    updateConsent,
    updatePreferences,
    setBannerVisible,
    setModalOpen,
    withdrawConsent,
    logEvent,
    
    // Utilities
    hasConsent,
    hasAnyConsent,
    getConsentSummary,
    applyConsentSettings,
    clearNonEssentialData
  };

  return (
    <GDPRContext.Provider value={contextValue}>
      {children}
    </GDPRContext.Provider>
  );
};

// Custom hook to use GDPR context
export const useGDPR = () => {
  const context = useContext(GDPRContext);
  if (!context) {
    throw new Error('useGDPR must be used within a GDPRProvider');
  }
  return context;
};

// Export action types for external use
export { GDPR_ACTIONS };
