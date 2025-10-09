/**
 * @fileoverview GDPR Consent Hook
 * 
 * A simplified hook for managing GDPR consent across components.
 * Provides easy access to consent status and utility functions.
 * 
 * @author Kingdom Design House Development Team
 * @version 1.0.0
 * @since 2024
 */

import { useGDPR } from '../contexts/GDPRContext';

/**
 * Custom hook for GDPR consent management
 * @returns {Object} GDPR consent utilities and state
 */
export const useGDPRConsent = () => {
  const {
    consent,
    preferences,
    ui,
    audit,
    updateConsent,
    updatePreferences,
    setBannerVisible,
    setModalOpen,
    withdrawConsent,
    hasConsent,
    hasAnyConsent,
    getConsentSummary,
    logEvent
  } = useGDPR();

  /**
   * Quick consent checkers
   */
  const canTrackAnalytics = () => hasConsent('analytics');
  const canTrackMarketing = () => hasConsent('marketing');
  const canPersonalize = () => hasConsent('personalization');
  const canUseThirdParty = () => hasConsent('thirdParty');
  const canProcessData = () => preferences.dataProcessing;
  const canSendMarketingEmails = () => preferences.marketingEmails;

  /**
   * Quick consent setters
   */
  const enableAnalytics = () => updateConsent({ analytics: true });
  const disableAnalytics = () => updateConsent({ analytics: false });
  const enableMarketing = () => updateConsent({ marketing: true });
  const disableMarketing = () => updateConsent({ marketing: false });
  const enablePersonalization = () => updateConsent({ personalization: true });
  const disablePersonalization = () => updateConsent({ personalization: false });
  const enableThirdParty = () => updateConsent({ thirdParty: true });
  const disableThirdParty = () => updateConsent({ thirdParty: false });

  /**
   * Quick preference setters
   */
  const enableDataProcessing = () => updatePreferences({ dataProcessing: true });
  const disableDataProcessing = () => updatePreferences({ dataProcessing: false });
  const enableMarketingEmails = () => updatePreferences({ marketingEmails: true });
  const disableMarketingEmails = () => updatePreferences({ marketingEmails: false });

  /**
   * UI helpers
   */
  const showConsentBanner = () => setBannerVisible(true);
  const hideConsentBanner = () => setBannerVisible(false);
  const openPrivacyModal = () => setModalOpen('showPrivacyModal', true);
  const closePrivacyModal = () => setModalOpen('showPrivacyModal', false);
  const openDataRightsModal = () => setModalOpen('showDataRightsModal', true);
  const closeDataRightsModal = () => setModalOpen('showDataRightsModal', false);

  /**
   * Consent management
   */
  const acceptAllConsent = () => {
    updateConsent({
      necessary: true,
      analytics: true,
      marketing: true,
      personalization: true,
      thirdParty: true
    });
    hideConsentBanner();
    logEvent('consent_accepted_all', {});
  };

  const acceptNecessaryOnly = () => {
    updateConsent({
      necessary: true,
      analytics: false,
      marketing: false,
      personalization: false,
      thirdParty: false
    });
    hideConsentBanner();
    logEvent('consent_accepted_necessary_only', {});
  };

  const acceptCustomConsent = (customConsent) => {
    updateConsent(customConsent);
    hideConsentBanner();
    logEvent('consent_accepted_custom', customConsent);
  };

  /**
   * Data rights helpers
   */
  const requestDataAccess = () => {
    logEvent('data_rights_requested', { type: 'access' });
    return {
      success: true,
      message: 'Data access request submitted. We will process it within 30 days as required by GDPR.'
    };
  };

  const requestDataDeletion = () => {
    logEvent('data_rights_requested', { type: 'deletion' });
    return {
      success: true,
      message: 'Data deletion request submitted. We will process it within 30 days as required by GDPR.'
    };
  };

  const requestDataPortability = () => {
    logEvent('data_rights_requested', { type: 'portability' });
    return {
      success: true,
      message: 'Data portability request submitted. We will process it within 30 days as required by GDPR.'
    };
  };

  const requestDataRectification = () => {
    logEvent('data_rights_requested', { type: 'rectification' });
    return {
      success: true,
      message: 'Data rectification request submitted. We will process it within 30 days as required by GDPR.'
    };
  };

  const objectToProcessing = () => {
    logEvent('data_rights_requested', { type: 'objection' });
    return {
      success: true,
      message: 'Processing objection submitted. We will process it within 30 days as required by GDPR.'
    };
  };

  /**
   * Audit helpers
   */
  const getConsentHistory = () => audit.events;
  const getConsentDate = () => audit.consentDate;
  const getLastUpdated = () => audit.lastUpdated;
  const isConsentGiven = () => audit.consentGiven;

  /**
   * Compliance helpers
   */
  const isGDPRCompliant = () => {
    return audit.consentGiven && 
           (consent.necessary === true) && 
           (hasAnyConsent() || preferences.dataProcessing);
  };

  const getComplianceStatus = () => {
    const summary = getConsentSummary();
    return {
      compliant: isGDPRCompliant(),
      consentGiven: audit.consentGiven,
      consentDate: audit.consentDate,
      activeConsents: summary.active,
      totalConsents: summary.total,
      consentTypes: summary.types,
      preferences: preferences
    };
  };

  return {
    // State
    consent,
    preferences,
    ui,
    audit,
    
    // Consent checkers
    canTrackAnalytics,
    canTrackMarketing,
    canPersonalize,
    canUseThirdParty,
    canProcessData,
    canSendMarketingEmails,
    hasConsent,
    hasAnyConsent,
    
    // Consent setters
    enableAnalytics,
    disableAnalytics,
    enableMarketing,
    disableMarketing,
    enablePersonalization,
    disablePersonalization,
    enableThirdParty,
    disableThirdParty,
    enableDataProcessing,
    disableDataProcessing,
    enableMarketingEmails,
    disableMarketingEmails,
    
    // UI helpers
    showConsentBanner,
    hideConsentBanner,
    openPrivacyModal,
    closePrivacyModal,
    openDataRightsModal,
    closeDataRightsModal,
    
    // Consent management
    acceptAllConsent,
    acceptNecessaryOnly,
    acceptCustomConsent,
    withdrawConsent,
    
    // Data rights
    requestDataAccess,
    requestDataDeletion,
    requestDataPortability,
    requestDataRectification,
    objectToProcessing,
    
    // Audit
    getConsentHistory,
    getConsentDate,
    getLastUpdated,
    isConsentGiven,
    
    // Compliance
    isGDPRCompliant,
    getComplianceStatus,
    getConsentSummary,
    
    // Direct access
    updateConsent,
    updatePreferences,
    logEvent
  };
};

export default useGDPRConsent;
