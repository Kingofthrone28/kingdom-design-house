import {
  GDPR_ACTIONS,
  gdprReducer,
  initialGDPRState,
  readStoredGDPRState
} from '../contexts/GDPRContext';

const storageWith = (values = {}) => ({
  getItem: (key) => values[key] ?? null
});

describe('GDPR persistence', () => {
  test('uses privacy-safe defaults for a first visit', () => {
    const state = readStoredGDPRState(storageWith());
    expect(state.consent).toMatchObject({ necessary: true, analytics: false, marketing: false });
    expect(state.audit.consentGiven).toBe(false);
  });

  test('migrates legacy consent without losing choices', () => {
    const state = readStoredGDPRState(storageWith({
      'gdpr-consent': JSON.stringify({ ...initialGDPRState.consent, analytics: true }),
      'gdpr-consent-given': 'true',
      'gdpr-consent-date': '2026-01-01T00:00:00.000Z'
    }));
    expect(state.consent.analytics).toBe(true);
    expect(state.audit.consentGiven).toBe(true);
    expect(state.audit.consentDate).toBe('2026-01-01T00:00:00.000Z');
  });

  test('prefers the current audit record', () => {
    const audit = { ...initialGDPRState.audit, consentGiven: true, consentDate: 'current' };
    const state = readStoredGDPRState(storageWith({
      'gdpr-audit': JSON.stringify(audit),
      'gdpr-consent-given': 'false'
    }));
    expect(state.audit.consentDate).toBe('current');
  });
});

describe('GDPR reducer', () => {
  test('records custom consent', () => {
    const state = gdprReducer(initialGDPRState, {
      type: GDPR_ACTIONS.SET_CONSENT,
      payload: { analytics: true }
    });
    expect(state.consent.analytics).toBe(true);
    expect(state.audit.consentGiven).toBe(true);
    expect(state.audit.events.at(-1).type).toBe('consent_updated');
  });

  test('withdrawal restores necessary-only consent', () => {
    const state = gdprReducer({
      ...initialGDPRState,
      consent: { ...initialGDPRState.consent, analytics: true },
      audit: { ...initialGDPRState.audit, consentGiven: true }
    }, { type: GDPR_ACTIONS.WITHDRAW_CONSENT });
    expect(state.consent).toEqual(initialGDPRState.consent);
    expect(state.audit.consentGiven).toBe(false);
    expect(state.ui.showConsentBanner).toBe(true);
  });
});
