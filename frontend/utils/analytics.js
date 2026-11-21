import { inquiryContext, normalizePath, approvedAttribution, CAMPAIGNS } from './acquisition';
export const GA_MEASUREMENT_ID = 'G-BEKZ5DH50B';
const EVENTS = new Set(['service_cta_click', 'chat_open', 'chat_message_sent', 'demo_request_start', 'generate_lead']);
let analyticsConsent = false;
const completed = new Set();
const once = new Set();
const ATTRIBUTION_KEY = 'kdh_analytics_attribution';
// Storage may be blocked. Guards still work for the mounted application.
export const sessionRead = key => { try { return window.sessionStorage.getItem(key); } catch { return null; } };
export const sessionWrite = (key, value) => { try { window.sessionStorage.setItem(key, value); } catch { /* unavailable */ } };
export const setAnalyticsConsent = allowed => {
  analyticsConsent = allowed === true;
  if (!analyticsConsent && typeof window !== 'undefined') {
    try { window.sessionStorage.removeItem(ATTRIBUTION_KEY); } catch { /* unavailable */ }
  }
};
export const getAttribution = () => {
  if (!analyticsConsent) return {};
  try { return approvedAttribution(JSON.parse(sessionRead(ATTRIBUTION_KEY) || '{}')); } catch { return {}; }
};
export const captureAttribution = () => {
  if (!analyticsConsent || sessionRead(ATTRIBUTION_KEY)) return;
  const query = new URLSearchParams(window.location.search);
  let attributionSource = 'unknown_direct';
  try {
    const host = new URL(document.referrer).hostname;
    if (/(^|\.)google\.[a-z.]+$/.test(host)) attributionSource = 'google';
    else if (/(^|\.)bing\.com$/.test(host)) attributionSource = 'bing';
    else if (/(^|\.)linkedin\.com$/.test(host)) attributionSource = 'linkedin';
    else if (/(^|\.)instagram\.com$/.test(host)) attributionSource = 'instagram';
    else if (host !== window.location.hostname) attributionSource = 'referral';
  } catch { /* No referrer remains unknown/direct. */ }
  sessionWrite(ATTRIBUTION_KEY, JSON.stringify(approvedAttribution({
    attributionSource,
    attributionCampaign: CAMPAIGNS.includes(query.get('utm_campaign')) ? query.get('utm_campaign') : '',
    landingPath: normalizePath(window.location.pathname),
  })));
};
export const trackAcquisition = (event, values = {}) => {
  if (!EVENTS.has(event) || !analyticsConsent || typeof window === 'undefined' || !window.gtag) return false;
  const context = inquiryContext(values);
  const page_path = normalizePath(window.location.pathname);
  const params = {
    page_path,
    page_location: `https://kingdomdesignhouse.com${page_path}`,
    page_referrer: '',
    ...Object.fromEntries(Object.entries(context).filter(([, value]) => value)),
    ...getAttribution(),
  };
  if (['contact_form', 'chat'].includes(values.method)) params.method = values.method;
  window.gtag('event', event, params);
  return true;
};
export const trackOnce = (event, localKey, values) => {
  const key = `${event}:${localKey}`;
  if (once.has(key)) return false;
  once.add(key);
  return trackAcquisition(event, values);
};
// IDs are local deduplication keys; never sent to GA. No replay after consent changes.
export const trackConfirmedLead = (method, localId, confirmed, context = {}) => {
  if (confirmed !== true || !localId || !['contact_form', 'chat'].includes(method)) return false;
  const key = `kdh_conversion_${method}_${localId}`;
  if (completed.has(key) || sessionRead(key)) return false;
  completed.add(key);
  sessionWrite(key, 'confirmed');
  return trackAcquisition('generate_lead', { ...context, method });
};
export const trackPageView = url => {
  if (!analyticsConsent || typeof window === 'undefined' || !window.gtag) return;
  const page_path = normalizePath(url);
  window.gtag('event', 'page_view', { page_path, page_location: `https://kingdomdesignhouse.com${page_path}`, page_referrer: '' });
};
