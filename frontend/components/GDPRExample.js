/**
 * @fileoverview GDPR Usage Example Component
 * 
 * This component demonstrates how to use the GDPR compliance system
 * in your application components.
 * 
 * @author Kingdom Design House Development Team
 * @version 1.0.0
 * @since 2024
 */

import React, { useEffect } from 'react';
import { useGDPRConsent } from '../hooks/useGDPRConsent';
import styles from '../styles/GDPRExample.module.scss';

const GDPRExample = () => {
  const {
    canTrackAnalytics,
    canTrackMarketing,
    canPersonalize,
    canUseThirdParty,
    canProcessData,
    canSendMarketingEmails,
    isGDPRCompliant,
    getComplianceStatus,
    openPrivacyModal,
    openDataRightsModal,
    acceptAllConsent,
    acceptNecessaryOnly,
    withdrawConsent
  } = useGDPRConsent();

  // Example: Initialize analytics only if consent is given
  useEffect(() => {
    if (canTrackAnalytics()) {
      console.log('✅ Analytics tracking enabled - initializing Google Analytics');
      // Initialize Google Analytics here
      // gtag('config', 'GA_MEASUREMENT_ID');
    } else {
      console.log('❌ Analytics tracking disabled by user consent');
    }
  }, [canTrackAnalytics]);

  // Example: Handle marketing features
  useEffect(() => {
    if (canTrackMarketing()) {
      console.log('✅ Marketing tracking enabled - initializing marketing tools');
      // Initialize marketing tools here
    } else {
      console.log('❌ Marketing tracking disabled by user consent');
    }
  }, [canTrackMarketing]);

  // Example: Handle personalization
  useEffect(() => {
    if (canPersonalize()) {
      console.log('✅ Personalization enabled - loading user preferences');
      // Load user preferences here
    } else {
      console.log('❌ Personalization disabled by user consent');
    }
  }, [canPersonalize]);

  // Example: Handle third-party services
  useEffect(() => {
    if (canUseThirdParty()) {
      console.log('✅ Third-party services enabled - loading external widgets');
      // Load third-party widgets here
    } else {
      console.log('❌ Third-party services disabled by user consent');
    }
  }, [canUseThirdParty]);

  const handleNewsletterSignup = () => {
    if (canSendMarketingEmails()) {
      console.log('✅ User can receive marketing emails - adding to newsletter');
      // Add to newsletter
    } else {
      console.log('❌ User has not consented to marketing emails');
      // Show consent request or redirect to privacy settings
    }
  };

  const handleDataProcessing = () => {
    if (canProcessData()) {
      console.log('✅ User has consented to data processing');
      // Process user data
    } else {
      console.log('❌ User has not consented to data processing');
      // Request consent or show alternative
    }
  };

  const complianceStatus = getComplianceStatus();

  return (
    <div className={styles.gdprExample}>
      <div className={styles.gdprExample__header}>
        <h2>🍪 GDPR Compliance Demo</h2>
        <p>This component demonstrates how to use the GDPR compliance system.</p>
      </div>

      <div className={styles.gdprExample__section}>
        <h3>Consent Status</h3>
        <div className={styles.gdprExample__status}>
          <div className={styles.gdprExample__statusItem}>
            <span className={styles.gdprExample__label}>Analytics:</span>
            <span className={`${styles.gdprExample__value} ${canTrackAnalytics() ? styles.gdprExample__valueEnabled : styles.gdprExample__valueDisabled}`}>
              {canTrackAnalytics() ? '✅ Enabled' : '❌ Disabled'}
            </span>
          </div>
          <div className={styles.gdprExample__statusItem}>
            <span className={styles.gdprExample__label}>Marketing:</span>
            <span className={`${styles.gdprExample__value} ${canTrackMarketing() ? styles.gdprExample__valueEnabled : styles.gdprExample__valueDisabled}`}>
              {canTrackMarketing() ? '✅ Enabled' : '❌ Disabled'}
            </span>
          </div>
          <div className={styles.gdprExample__statusItem}>
            <span className={styles.gdprExample__label}>Personalization:</span>
            <span className={`${styles.gdprExample__value} ${canPersonalize() ? styles.gdprExample__valueEnabled : styles.gdprExample__valueDisabled}`}>
              {canPersonalize() ? '✅ Enabled' : '❌ Disabled'}
            </span>
          </div>
          <div className={styles.gdprExample__statusItem}>
            <span className={styles.gdprExample__label}>Third-party:</span>
            <span className={`${styles.gdprExample__value} ${canUseThirdParty() ? styles.gdprExample__valueEnabled : styles.gdprExample__valueDisabled}`}>
              {canUseThirdParty() ? '✅ Enabled' : '❌ Disabled'}
            </span>
          </div>
          <div className={styles.gdprExample__statusItem}>
            <span className={styles.gdprExample__label}>Data Processing:</span>
            <span className={`${styles.gdprExample__value} ${canProcessData() ? styles.gdprExample__valueEnabled : styles.gdprExample__valueDisabled}`}>
              {canProcessData() ? '✅ Enabled' : '❌ Disabled'}
            </span>
          </div>
          <div className={styles.gdprExample__statusItem}>
            <span className={styles.gdprExample__label}>Marketing Emails:</span>
            <span className={`${styles.gdprExample__value} ${canSendMarketingEmails() ? styles.gdprExample__valueEnabled : styles.gdprExample__valueDisabled}`}>
              {canSendMarketingEmails() ? '✅ Enabled' : '❌ Disabled'}
            </span>
          </div>
        </div>
      </div>

      <div className={styles.gdprExample__section}>
        <h3>Compliance Status</h3>
        <div className={styles.gdprExample__compliance}>
          <div className={styles.gdprExample__complianceItem}>
            <span className={styles.gdprExample__label}>GDPR Compliant:</span>
            <span className={`${styles.gdprExample__value} ${isGDPRCompliant() ? styles.gdprExample__valueEnabled : styles.gdprExample__valueDisabled}`}>
              {isGDPRCompliant() ? '✅ Yes' : '❌ No'}
            </span>
          </div>
          <div className={styles.gdprExample__complianceItem}>
            <span className={styles.gdprExample__label}>Consent Given:</span>
            <span className={`${styles.gdprExample__value} ${complianceStatus.consentGiven ? styles.gdprExample__valueEnabled : styles.gdprExample__valueDisabled}`}>
              {complianceStatus.consentGiven ? '✅ Yes' : '❌ No'}
            </span>
          </div>
          <div className={styles.gdprExample__complianceItem}>
            <span className={styles.gdprExample__label}>Active Consents:</span>
            <span className={styles.gdprExample__value}>
              {complianceStatus.activeConsents} of {complianceStatus.totalConsents}
            </span>
          </div>
          {complianceStatus.consentDate && (
            <div className={styles.gdprExample__complianceItem}>
              <span className={styles.gdprExample__label}>Consent Date:</span>
              <span className={styles.gdprExample__value}>
                {new Date(complianceStatus.consentDate).toLocaleDateString()}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className={styles.gdprExample__section}>
        <h3>Example Actions</h3>
        <div className={styles.gdprExample__actions}>
          <button 
            className={styles.gdprExample__button}
            onClick={handleNewsletterSignup}
          >
            📧 Newsletter Signup
          </button>
          <button 
            className={styles.gdprExample__button}
            onClick={handleDataProcessing}
          >
            🔄 Process Data
          </button>
          <button 
            className={styles.gdprExample__button}
            onClick={openPrivacyModal}
          >
            ⚙️ Privacy Settings
          </button>
          <button 
            className={styles.gdprExample__button}
            onClick={openDataRightsModal}
          >
            📋 Data Rights
          </button>
        </div>
      </div>

      <div className={styles.gdprExample__section}>
        <h3>Quick Consent Actions</h3>
        <div className={styles.gdprExample__actions}>
          <button 
            className={styles.gdprExample__buttonSecondary}
            onClick={acceptNecessaryOnly}
          >
            🔒 Necessary Only
          </button>
          <button 
            className={styles.gdprExample__buttonPrimary}
            onClick={acceptAllConsent}
          >
            ✅ Accept All
          </button>
          <button 
            className={styles.gdprExample__buttonDanger}
            onClick={withdrawConsent}
          >
            🚫 Withdraw Consent
          </button>
        </div>
      </div>

      <div className={styles.gdprExample__section}>
        <h3>Console Output</h3>
        <p className={styles.gdprExample__console}>
          Check the browser console to see how the GDPR system responds to different consent states.
        </p>
      </div>
    </div>
  );
};

export default GDPRExample;
