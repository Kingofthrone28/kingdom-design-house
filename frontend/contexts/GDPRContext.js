import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer
} from 'react';

export const GDPR_ACTIONS = {
  HYDRATE: 'HYDRATE',
  SET_CONSENT: 'SET_CONSENT',
  SET_PREFERENCES: 'SET_PREFERENCES',
  SET_BANNER_VISIBLE: 'SET_BANNER_VISIBLE',
  SET_MODAL_OPEN: 'SET_MODAL_OPEN',
  WITHDRAW_CONSENT: 'WITHDRAW_CONSENT',
  LOG_EVENT: 'LOG_EVENT'
};

const defaultConsent = {
  necessary: true,
  analytics: false,
  marketing: false,
  personalization: false,
  thirdParty: false
};

const defaultPreferences = {
  dataProcessing: false,
  marketingEmails: false,
  analyticsTracking: false,
  cookieStorage: false
};

export const initialGDPRState = {
  consent: defaultConsent,
  preferences: defaultPreferences,
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
  },
  hydrated: false
};

const withAudit = (state, changes, eventType, payload) => {
  const timestamp = new Date().toISOString();
  return {
    ...state,
    ...changes,
    audit: {
      ...state.audit,
      consentGiven: true,
      consentDate: state.audit.consentDate || timestamp,
      lastUpdated: timestamp,
      events: [
        ...state.audit.events.slice(-49),
        { timestamp, type: eventType, data: payload }
      ]
    }
  };
};

export const gdprReducer = (state, action) => {
  switch (action.type) {
    case GDPR_ACTIONS.HYDRATE:
      return {
        ...state,
        ...action.payload,
        ui: {
          ...state.ui,
          showConsentBanner: !action.payload.audit.consentGiven
        },
        hydrated: true
      };
    case GDPR_ACTIONS.SET_CONSENT:
      return withAudit(
        state,
        { consent: { ...state.consent, ...action.payload } },
        'consent_updated',
        action.payload
      );
    case GDPR_ACTIONS.SET_PREFERENCES:
      return withAudit(
        state,
        { preferences: { ...state.preferences, ...action.payload } },
        'preferences_updated',
        action.payload
      );
    case GDPR_ACTIONS.SET_BANNER_VISIBLE:
      return { ...state, ui: { ...state.ui, showConsentBanner: action.payload } };
    case GDPR_ACTIONS.SET_MODAL_OPEN:
      return { ...state, ui: { ...state.ui, [action.modalType]: action.payload } };
    case GDPR_ACTIONS.WITHDRAW_CONSENT:
      return {
        ...state,
        consent: defaultConsent,
        preferences: defaultPreferences,
        ui: { ...state.ui, showConsentBanner: true, showPrivacyModal: false },
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
            ...state.audit.events.slice(-49),
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

const GDPRContext = createContext(null);

export const readStoredGDPRState = (storage) => {
  const consent = JSON.parse(storage.getItem('gdpr-consent') || 'null') || defaultConsent;
  const preferences = JSON.parse(storage.getItem('gdpr-preferences') || 'null') || defaultPreferences;
  const savedAudit = JSON.parse(storage.getItem('gdpr-audit') || 'null');
  const legacyConsentGiven = storage.getItem('gdpr-consent-given') === 'true';
  const legacyDate = storage.getItem('gdpr-consent-date');
  const audit = savedAudit || {
    ...initialGDPRState.audit,
    consentGiven: legacyConsentGiven,
    consentDate: legacyDate,
    lastUpdated: legacyDate
  };

  return { consent, preferences, audit };
};

export const GDPRProvider = ({ children }) => {
  const [state, dispatch] = useReducer(gdprReducer, initialGDPRState);

  useEffect(() => {
    try {
      dispatch({ type: GDPR_ACTIONS.HYDRATE, payload: readStoredGDPRState(localStorage) });
    } catch {
      dispatch({
        type: GDPR_ACTIONS.HYDRATE,
        payload: { consent: defaultConsent, preferences: defaultPreferences, audit: initialGDPRState.audit }
      });
    }
  }, []);

  useEffect(() => {
    if (!state.hydrated) return;
    localStorage.setItem('gdpr-consent', JSON.stringify(state.consent));
    localStorage.setItem('gdpr-preferences', JSON.stringify(state.preferences));
    localStorage.setItem('gdpr-audit', JSON.stringify(state.audit));
    localStorage.setItem('gdpr-consent-given', String(state.audit.consentGiven));
    if (state.audit.consentDate) localStorage.setItem('gdpr-consent-date', state.audit.consentDate);
  }, [state.hydrated, state.consent, state.preferences, state.audit]);

  const clearNonEssentialData = useCallback(() => {
    document.cookie.split(';').forEach((cookie) => {
      const name = cookie.split('=')[0].trim();
      if (name.includes('marketing') || name.includes('advertising')) {
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
      }
    });
    Object.keys(sessionStorage).forEach((key) => {
      if (key.includes('analytics') || key.includes('marketing')) sessionStorage.removeItem(key);
    });
  }, []);

  const applyConsentSettings = useCallback(() => {
    if (typeof window === 'undefined' || !window.gtag) return;
    window.gtag('consent', 'update', {
      analytics_storage: state.consent.analytics ? 'granted' : 'denied',
      ad_storage: state.consent.marketing ? 'granted' : 'denied'
    });
  }, [state.consent.analytics, state.consent.marketing]);

  useEffect(() => {
    if (state.hydrated) applyConsentSettings();
  }, [state.hydrated, applyConsentSettings]);

  const value = useMemo(() => ({
    consent: state.consent,
    preferences: state.preferences,
    ui: state.ui,
    audit: state.audit,
    updateConsent: (payload) => dispatch({ type: GDPR_ACTIONS.SET_CONSENT, payload }),
    updatePreferences: (payload) => dispatch({ type: GDPR_ACTIONS.SET_PREFERENCES, payload }),
    setBannerVisible: (payload) => dispatch({ type: GDPR_ACTIONS.SET_BANNER_VISIBLE, payload }),
    setModalOpen: (modalType, payload) => dispatch({ type: GDPR_ACTIONS.SET_MODAL_OPEN, modalType, payload }),
    withdrawConsent: () => {
      dispatch({ type: GDPR_ACTIONS.WITHDRAW_CONSENT });
      clearNonEssentialData();
    },
    logEvent: (eventType, payload) => dispatch({ type: GDPR_ACTIONS.LOG_EVENT, eventType, payload }),
    hasConsent: (type) => state.consent[type] === true,
    hasAnyConsent: () => Object.values(state.consent).some(Boolean),
    getConsentSummary: () => {
      const types = Object.keys(state.consent).filter((type) => state.consent[type]);
      return { total: Object.keys(state.consent).length, active: types.length, types };
    },
    applyConsentSettings,
    clearNonEssentialData
  }), [state.consent, state.preferences, state.ui, state.audit, applyConsentSettings, clearNonEssentialData]);

  return <GDPRContext.Provider value={value}>{children}</GDPRContext.Provider>;
};

export const useGDPR = () => {
  const context = useContext(GDPRContext);
  if (!context) throw new Error('useGDPR must be used within a GDPRProvider');
  return context;
};
