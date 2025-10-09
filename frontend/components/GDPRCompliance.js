/**
 * @fileoverview GDPR Compliance Component
 * 
 * This component provides comprehensive GDPR compliance features including:
 * - Cookie consent management
 * - Privacy policy acceptance
 * - Data processing consent
 * - User rights management
 * - Data retention policies
 * - Consent withdrawal mechanisms
 * 
 * @author Kingdom Design House Development Team
 * @version 1.0.0
 * @since 2024
 */

import React, { useState, useEffect, useCallback } from 'react';
import styles from '../styles/GDPRCompliance.module.scss';

const GDPRCompliance = () => {
  // State management for GDPR compliance
  const [showConsentBanner, setShowConsentBanner] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showDataRightsModal, setShowDataRightsModal] = useState(false);
  const [consentData, setConsentData] = useState({
    necessary: true, // Always true - required for basic functionality
    analytics: false,
    marketing: false,
    personalization: false,
    thirdParty: false
  });
  const [userPreferences, setUserPreferences] = useState({
    dataProcessing: false,
    marketingEmails: false,
    analyticsTracking: false,
    cookieStorage: false
  });

  // Load saved preferences on component mount
  useEffect(() => {
    loadSavedPreferences();
    checkConsentStatus();
  }, []);

  /**
   * Loads saved user preferences from localStorage
   */
  const loadSavedPreferences = useCallback(() => {
    try {
      const savedConsent = localStorage.getItem('gdpr-consent');
      const savedPreferences = localStorage.getItem('gdpr-preferences');
      
      if (savedConsent) {
        setConsentData(JSON.parse(savedConsent));
      }
      
      if (savedPreferences) {
        setUserPreferences(JSON.parse(savedPreferences));
      }
    } catch (error) {
      console.error('Error loading GDPR preferences:', error);
    }
  }, []);

  /**
   * Checks if user has given consent and shows banner if needed
   */
  const checkConsentStatus = useCallback(() => {
    const hasConsent = localStorage.getItem('gdpr-consent-given');
    if (!hasConsent) {
      setShowConsentBanner(true);
    }
  }, []);

  /**
   * Saves consent data to localStorage
   */
  const saveConsentData = useCallback((data) => {
    try {
      localStorage.setItem('gdpr-consent', JSON.stringify(data));
      localStorage.setItem('gdpr-consent-given', 'true');
      localStorage.setItem('gdpr-consent-date', new Date().toISOString());
    } catch (error) {
      console.error('Error saving GDPR consent:', error);
    }
  }, []);

  /**
   * Saves user preferences to localStorage
   */
  const saveUserPreferences = useCallback((preferences) => {
    try {
      localStorage.setItem('gdpr-preferences', JSON.stringify(preferences));
    } catch (error) {
      console.error('Error saving GDPR preferences:', error);
    }
  }, []);

  /**
   * Handles consent acceptance
   */
  const handleConsentAccept = useCallback((customConsent = null) => {
    const finalConsent = customConsent || consentData;
    saveConsentData(finalConsent);
    setConsentData(finalConsent);
    setShowConsentBanner(false);
    
    // Apply consent settings
    applyConsentSettings(finalConsent);
    
    // Log consent for audit purposes
    logConsentEvent('accepted', finalConsent);
  }, [consentData, saveConsentData]);

  /**
   * Handles consent rejection (only necessary cookies)
   */
  const handleConsentReject = useCallback(() => {
    const minimalConsent = {
      necessary: true,
      analytics: false,
      marketing: false,
      personalization: false,
      thirdParty: false
    };
    
    saveConsentData(minimalConsent);
    setConsentData(minimalConsent);
    setShowConsentBanner(false);
    
    // Apply minimal consent settings
    applyConsentSettings(minimalConsent);
    
    // Log consent for audit purposes
    logConsentEvent('rejected', minimalConsent);
  }, [saveConsentData]);

  /**
   * Applies consent settings to the application
   */
  const applyConsentSettings = useCallback((consent) => {
    // Analytics tracking
    if (consent.analytics) {
      // Enable Google Analytics, etc.
      console.log('Analytics tracking enabled');
    } else {
      // Disable analytics
      console.log('Analytics tracking disabled');
    }

    // Marketing cookies
    if (consent.marketing) {
      // Enable marketing tracking
      console.log('Marketing tracking enabled');
    } else {
      // Disable marketing tracking
      console.log('Marketing tracking disabled');
    }

    // Personalization
    if (consent.personalization) {
      // Enable personalization features
      console.log('Personalization enabled');
    } else {
      // Disable personalization
      console.log('Personalization disabled');
    }

    // Third-party services
    if (consent.thirdParty) {
      // Enable third-party integrations
      console.log('Third-party services enabled');
    } else {
      // Disable third-party services
      console.log('Third-party services disabled');
    }
  }, []);

  /**
   * Logs consent events for audit purposes
   */
  const logConsentEvent = useCallback((action, consent) => {
    const event = {
      timestamp: new Date().toISOString(),
      action,
      consent,
      userAgent: navigator.userAgent,
      ip: 'anonymized' // In production, this would be properly anonymized
    };
    
    // In production, this would be sent to a secure audit log
    console.log('GDPR Consent Event:', event);
  }, []);

  /**
   * Handles data rights requests
   */
  const handleDataRightsRequest = useCallback((rightType) => {
    const request = {
      type: rightType,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent
    };
    
    // In production, this would be sent to your data processing system
    console.log('Data Rights Request:', request);
    
    // Show confirmation message
    alert(`Your ${rightType} request has been submitted. We will process it within 30 days as required by GDPR.`);
  }, []);

  /**
   * Withdraws all consent
   */
  const handleWithdrawConsent = useCallback(() => {
    const minimalConsent = {
      necessary: true,
      analytics: false,
      marketing: false,
      personalization: false,
      thirdParty: false
    };
    
    saveConsentData(minimalConsent);
    setConsentData(minimalConsent);
    applyConsentSettings(minimalConsent);
    
    // Clear all non-necessary data
    clearNonEssentialData();
    
    alert('Your consent has been withdrawn. Only necessary cookies will be used.');
  }, [saveConsentData, applyConsentSettings]);

  /**
   * Clears non-essential data
   */
  const clearNonEssentialData = useCallback(() => {
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
  }, []);

  /**
   * Updates individual consent preferences
   */
  const updateConsentPreference = useCallback((key, value) => {
    const updatedConsent = { ...consentData, [key]: value };
    setConsentData(updatedConsent);
  }, [consentData]);

  /**
   * Updates user preferences
   */
  const updateUserPreference = useCallback((key, value) => {
    const updatedPreferences = { ...userPreferences, [key]: value };
    setUserPreferences(updatedPreferences);
    saveUserPreferences(updatedPreferences);
  }, [userPreferences, saveUserPreferences]);

  return (
    <>
      {/* GDPR Consent Banner */}
      {showConsentBanner && (
        <div className={styles.consentBanner}>
          <div className={styles.consentBanner__content}>
            <div className={styles.consentBanner__text}>
              <h3>🍪 Cookie & Privacy Consent</h3>
              <p>
                We use cookies and similar technologies to enhance your experience, 
                analyze site usage, and assist in our marketing efforts. By continuing 
                to use our site, you consent to our use of cookies as described in our 
                <button 
                  className={styles.consentBanner__link}
                  onClick={() => setShowPrivacyModal(true)}
                >
                  Privacy Policy
                </button>.
              </p>
            </div>
            <div className={styles.consentBanner__actions}>
              <button 
                className={styles.consentBanner__buttonSecondary}
                onClick={handleConsentReject}
              >
                Necessary Only
              </button>
              <button 
                className={styles.consentBanner__button}
                onClick={() => setShowPrivacyModal(true)}
              >
                Customize
              </button>
              <button 
                className={styles.consentBanner__buttonPrimary}
                onClick={() => handleConsentAccept()}
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Privacy Settings Modal */}
      {showPrivacyModal && (
        <div className={styles.modal}>
          <div className={styles.modal__overlay} onClick={() => setShowPrivacyModal(false)} />
          <div className={styles.modal__content}>
            <div className={styles.modal__header}>
              <h2>Privacy & Cookie Settings</h2>
              <button 
                className={styles.modal__close}
                onClick={() => setShowPrivacyModal(false)}
              >
                ×
              </button>
            </div>
            
            <div className={styles.modal__body}>
              <div className={styles.consentSection}>
                <h3>Cookie Categories</h3>
                
                {/* Necessary Cookies */}
                <div className={styles.consentItem}>
                  <div className={styles.consentItem__info}>
                    <h4>Necessary Cookies</h4>
                    <p>Essential for the website to function properly. Cannot be disabled.</p>
                  </div>
                  <div className={styles.consentItem__toggle}>
                    <input 
                      type="checkbox" 
                      checked={consentData.necessary} 
                      disabled 
                    />
                  </div>
                </div>

                {/* Analytics Cookies */}
                <div className={styles.consentItem}>
                  <div className={styles.consentItem__info}>
                    <h4>Analytics Cookies</h4>
                    <p>Help us understand how visitors interact with our website.</p>
                  </div>
                  <div className={styles.consentItem__toggle}>
                    <input 
                      type="checkbox" 
                      checked={consentData.analytics}
                      onChange={(e) => updateConsentPreference('analytics', e.target.checked)}
                    />
                  </div>
                </div>

                {/* Marketing Cookies */}
                <div className={styles.consentItem}>
                  <div className={styles.consentItem__info}>
                    <h4>Marketing Cookies</h4>
                    <p>Used to track visitors across websites for advertising purposes.</p>
                  </div>
                  <div className={styles.consentItem__toggle}>
                    <input 
                      type="checkbox" 
                      checked={consentData.marketing}
                      onChange={(e) => updateConsentPreference('marketing', e.target.checked)}
                    />
                  </div>
                </div>

                {/* Personalization Cookies */}
                <div className={styles.consentItem}>
                  <div className={styles.consentItem__info}>
                    <h4>Personalization Cookies</h4>
                    <p>Remember your preferences and provide personalized content.</p>
                  </div>
                  <div className={styles.consentItem__toggle}>
                    <input 
                      type="checkbox" 
                      checked={consentData.personalization}
                      onChange={(e) => updateConsentPreference('personalization', e.target.checked)}
                    />
                  </div>
                </div>

                {/* Third-party Cookies */}
                <div className={styles.consentItem}>
                  <div className={styles.consentItem__info}>
                    <h4>Third-party Cookies</h4>
                    <p>Cookies from external services like social media and analytics.</p>
                  </div>
                  <div className={styles.consentItem__toggle}>
                    <input 
                      type="checkbox" 
                      checked={consentData.thirdParty}
                      onChange={(e) => updateConsentPreference('thirdParty', e.target.checked)}
                    />
                  </div>
                </div>
              </div>

              <div className={styles.preferencesSection}>
                <h3>Data Processing Preferences</h3>
                
                <div className={styles.consentItem}>
                  <div className={styles.consentItem__info}>
                    <h4>Data Processing Consent</h4>
                    <p>Allow us to process your personal data for service delivery.</p>
                  </div>
                  <div className={styles.consentItem__toggle}>
                    <input 
                      type="checkbox" 
                      checked={userPreferences.dataProcessing}
                      onChange={(e) => updateUserPreference('dataProcessing', e.target.checked)}
                    />
                  </div>
                </div>

                <div className={styles.consentItem}>
                  <div className={styles.consentItem__info}>
                    <h4>Marketing Emails</h4>
                    <p>Receive promotional emails and updates about our services.</p>
                  </div>
                  <div className={styles.consentItem__toggle}>
                    <input 
                      type="checkbox" 
                      checked={userPreferences.marketingEmails}
                      onChange={(e) => updateUserPreference('marketingEmails', e.target.checked)}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.modal__footer}>
              <button 
                className={styles.modal__buttonSecondary}
                onClick={() => setShowDataRightsModal(true)}
              >
                Data Rights
              </button>
              <button 
                className={styles.modal__buttonSecondary}
                onClick={handleWithdrawConsent}
              >
                Withdraw Consent
              </button>
              <button 
                className={styles.modal__button}
                onClick={() => {
                  handleConsentAccept();
                  setShowPrivacyModal(false);
                }}
              >
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Data Rights Modal */}
      {showDataRightsModal && (
        <div className={styles.modal}>
          <div className={styles.modal__overlay} onClick={() => setShowDataRightsModal(false)} />
          <div className={styles.modal__content}>
            <div className={styles.modal__header}>
              <h2>Your Data Rights (GDPR)</h2>
              <button 
                className={styles.modal__close}
                onClick={() => setShowDataRightsModal(false)}
              >
                ×
              </button>
            </div>
            
            <div className={styles.modal__body}>
              <div className={styles.rightsSection}>
                <h3>Your Rights Under GDPR</h3>
                
                <div className={styles.rightItem}>
                  <h4>Right to Access</h4>
                  <p>Request a copy of all personal data we hold about you.</p>
                  <button 
                    className={styles.rightButton}
                    onClick={() => handleDataRightsRequest('access')}
                  >
                    Request Data Access
                  </button>
                </div>

                <div className={styles.rightItem}>
                  <h4>Right to Rectification</h4>
                  <p>Correct any inaccurate or incomplete personal data.</p>
                  <button 
                    className={styles.rightButton}
                    onClick={() => handleDataRightsRequest('rectification')}
                  >
                    Request Data Correction
                  </button>
                </div>

                <div className={styles.rightItem}>
                  <h4>Right to Erasure</h4>
                  <p>Request deletion of your personal data in certain circumstances.</p>
                  <button 
                    className={styles.rightButton}
                    onClick={() => handleDataRightsRequest('erasure')}
                  >
                    Request Data Deletion
                  </button>
                </div>

                <div className={styles.rightItem}>
                  <h4>Right to Portability</h4>
                  <p>Receive your data in a structured, machine-readable format.</p>
                  <button 
                    className={styles.rightButton}
                    onClick={() => handleDataRightsRequest('portability')}
                  >
                    Request Data Export
                  </button>
                </div>

                <div className={styles.rightItem}>
                  <h4>Right to Object</h4>
                  <p>Object to processing of your personal data for certain purposes.</p>
                  <button 
                    className={styles.rightButton}
                    onClick={() => handleDataRightsRequest('objection')}
                  >
                    Object to Processing
                  </button>
                </div>
              </div>

              <div className={styles.contactSection}>
                <h3>Contact Information</h3>
                <p>
                  For data protection inquiries, contact our Data Protection Officer:
                </p>
                <ul>
                  <li>📧 Email: privacy@kingdomdesignhouse.com</li>
                  <li>📞 Phone: 347.927.8846</li>
                  <li>📮 Address: Kingdom Design House, Long Island, NY</li>
                </ul>
              </div>
            </div>

            <div className={styles.modal__footer}>
              <button 
                className={styles.modal__button}
                onClick={() => setShowDataRightsModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GDPRCompliance;
