import React, { useEffect, useState } from 'react';
import { useGDPRConsent } from '../hooks/useGDPRConsent';
import styles from '../styles/GDPRCompliance.module.scss';

const consentOptions = [
  ['analytics', 'Analytics Cookies', 'Help us understand how visitors interact with our website.'],
  ['marketing', 'Marketing Cookies', 'Support advertising and campaign measurement.'],
  ['personalization', 'Personalization Cookies', 'Remember preferences and personalize content.'],
  ['thirdParty', 'Third-party Cookies', 'Enable approved external services and integrations.']
];

const dataRights = [
  ['access', 'Right to Access'],
  ['rectification', 'Right to Rectification'],
  ['deletion', 'Right to Erasure'],
  ['portability', 'Right to Portability'],
  ['objection', 'Right to Object']
];

const GDPRCompliance = () => {
  const gdpr = useGDPRConsent();
  const [draftConsent, setDraftConsent] = useState(gdpr.consent);
  const [draftPreferences, setDraftPreferences] = useState(gdpr.preferences);

  useEffect(() => {
    if (gdpr.ui.showPrivacyModal) {
      setDraftConsent(gdpr.consent);
      setDraftPreferences(gdpr.preferences);
    }
  }, [gdpr.ui.showPrivacyModal, gdpr.consent, gdpr.preferences]);

  const savePreferences = () => {
    gdpr.acceptCustomConsent(draftConsent);
    gdpr.updatePreferences(draftPreferences);
    gdpr.closePrivacyModal();
  };

  const requestRight = (type) => {
    const actions = {
      access: gdpr.requestDataAccess,
      rectification: gdpr.requestDataRectification,
      deletion: gdpr.requestDataDeletion,
      portability: gdpr.requestDataPortability,
      objection: gdpr.objectToProcessing
    };
    const result = actions[type]();
    window.alert(result.message);
  };

  return (
    <>
      {gdpr.ui.showConsentBanner && (
        <div className={styles.consentBanner}>
          <div className={styles.consentBanner__content}>
            <div className={styles.consentBanner__text}>
              <h3>Cookie & Privacy Consent</h3>
              <p>We use cookies to improve the site, understand usage, and support marketing where you allow it.</p>
            </div>
            <div className={styles.consentBanner__actions}>
              <button className={styles.consentBanner__buttonSecondary} onClick={gdpr.acceptNecessaryOnly}>Necessary Only</button>
              <button className={styles.consentBanner__button} onClick={gdpr.openPrivacyModal}>Customize</button>
              <button className={styles.consentBanner__buttonPrimary} onClick={gdpr.acceptAllConsent}>Accept All</button>
            </div>
          </div>
        </div>
      )}

      {gdpr.ui.showPrivacyModal && (
        <div className={styles.modal}>
          <div className={styles.modal__overlay} onClick={gdpr.closePrivacyModal} />
          <div className={styles.modal__content} role="dialog" aria-modal="true" aria-labelledby="privacy-title">
            <div className={styles.modal__header}>
              <h2 id="privacy-title">Privacy & Cookie Settings</h2>
              <button className={styles.modal__close} onClick={gdpr.closePrivacyModal} aria-label="Close privacy settings">×</button>
            </div>
            <div className={styles.modal__body}>
              <div className={styles.consentSection}>
                <h3>Cookie Categories</h3>
                <div className={styles.consentItem}>
                  <div className={styles.consentItem__info}><h4>Necessary Cookies</h4><p>Required for the website to function.</p></div>
                  <div className={styles.consentItem__toggle}><input type="checkbox" checked disabled /></div>
                </div>
                {consentOptions.map(([key, title, description]) => (
                  <div className={styles.consentItem} key={key}>
                    <div className={styles.consentItem__info}><h4>{title}</h4><p>{description}</p></div>
                    <div className={styles.consentItem__toggle}>
                      <input
                        type="checkbox"
                        checked={draftConsent[key]}
                        onChange={(event) => setDraftConsent((current) => ({ ...current, [key]: event.target.checked }))}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className={styles.preferencesSection}>
                <h3>Data Preferences</h3>
                {[
                  ['dataProcessing', 'Data Processing Consent'],
                  ['marketingEmails', 'Marketing Emails']
                ].map(([key, title]) => (
                  <div className={styles.consentItem} key={key}>
                    <div className={styles.consentItem__info}><h4>{title}</h4></div>
                    <div className={styles.consentItem__toggle}>
                      <input
                        type="checkbox"
                        checked={draftPreferences[key]}
                        onChange={(event) => setDraftPreferences((current) => ({ ...current, [key]: event.target.checked }))}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.modal__footer}>
              <button
                className={styles.modal__buttonSecondary}
                onClick={() => {
                  gdpr.closePrivacyModal();
                  gdpr.openDataRightsModal();
                }}
              >
                Data Rights
              </button>
              <button className={styles.modal__buttonSecondary} onClick={gdpr.withdrawConsent}>Withdraw Consent</button>
              <button className={styles.modal__button} onClick={savePreferences}>Save Preferences</button>
            </div>
          </div>
        </div>
      )}

      {gdpr.ui.showDataRightsModal && (
        <div className={styles.modal}>
          <div className={styles.modal__overlay} onClick={gdpr.closeDataRightsModal} />
          <div className={styles.modal__content} role="dialog" aria-modal="true" aria-labelledby="rights-title">
            <div className={styles.modal__header}>
              <h2 id="rights-title">Your Data Rights</h2>
              <button className={styles.modal__close} onClick={gdpr.closeDataRightsModal} aria-label="Close data rights">×</button>
            </div>
            <div className={styles.modal__body}>
              <div className={styles.rightsSection}>
                {dataRights.map(([type, title]) => (
                  <div className={styles.rightItem} key={type}>
                    <h4>{title}</h4>
                    <button className={styles.rightButton} onClick={() => requestRight(type)}>Submit Request</button>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.modal__footer}>
              <button className={styles.modal__button} onClick={gdpr.closeDataRightsModal}>Close</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GDPRCompliance;
