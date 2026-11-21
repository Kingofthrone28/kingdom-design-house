import { inquiryContext, contactHref, normalizePath } from '../utils/acquisition';
import { setAnalyticsConsent, trackAcquisition, trackConfirmedLead, captureAttribution, getAttribution, trackOnce } from '../utils/analytics';
import { siteData } from '../data/siteData';
import { buildStructuredData } from '../lib/structuredData';
import { submitContactForm } from '../utils/formSubmissionService';
import { renderToStaticMarkup } from 'react-dom/server';
import PricingSummary from '../components/PricingSummary';
import { getCaseStudy } from '../data/caseStudies';
import fs from 'node:fs';

const storage = () => {
  const values = new Map();
  return { getItem: key => values.get(key) || null, setItem: (key, value) => values.set(key, value), removeItem: key => values.delete(key) };
};
beforeEach(() => {
  global.window = { sessionStorage: storage(), location: { pathname: '/contact/', search: '?email=private@example.com&utm_campaign=ai-assistant&utm_term=patient-record', hostname: 'kingdomdesignhouse.com' }, gtag: jest.fn() };
  global.document = { referrer: '' };
  setAnalyticsConsent(false);
});
afterEach(() => { setAnalyticsConsent(false); delete global.window; delete global.document; delete global.fetch; });

describe('approved inquiry context', () => {
  test('allows known services and CTA codes while removing personal and query-string context', () => {
    expect(inquiryContext({ service: 'support', cta: 'service-hero', sourcePath: '/web-group/?email=private@example.com', email: 'private@example.com' })).toEqual({ service: 'support', cta: 'service-hero', sourcePath: '/web-group/' });
    expect(inquiryContext({ service: ['ai-development'], cta: 'private@example.com', sourcePath: '/private@example.com' })).toEqual({ service: '', cta: '', sourcePath: '/unknown/' });
    expect(contactHref({ service: 'web-design', cta: 'service-hero', sourcePath: '/web-group/services/web-design/?secret=value' })).toBe('/contact/?service=web-design&cta=service-hero&sourcePath=%2Fweb-group%2Fservices%2Fweb-design%2F');
    expect(normalizePath('//external.example/')).toBe('/unknown/');
  });
});

describe('consent-aware conversion measurement', () => {
  test('denied consent emits no events and stores no attribution even if gtag exists', () => {
    captureAttribution();
    trackAcquisition('chat_open', { message: 'private' });
    expect(getAttribution()).toEqual({});
    expect(window.sessionStorage.getItem('kdh_analytics_attribution')).toBeNull();
    expect(window.gtag).not.toHaveBeenCalled();
  });
  test('only confirmation emits a lead, once per receipt and conversation across later callbacks', () => {
    setAnalyticsConsent(true);
    expect(trackConfirmedLead('contact_form', 'receipt-1', false)).toBe(false);
    expect(trackConfirmedLead('contact_form', 'receipt-1', true)).toBe(true);
    expect(trackConfirmedLead('contact_form', 'receipt-1', true)).toBe(false);
    expect(trackConfirmedLead('chat', 'conversation-1', true)).toBe(true);
    expect(trackConfirmedLead('chat', 'conversation-1', true, { updated: true })).toBe(false);
    expect(window.gtag.mock.calls.filter(call => call[1] === 'generate_lead')).toHaveLength(2);
    expect(JSON.stringify(window.gtag.mock.calls)).not.toMatch(/receipt-1|conversation-1/);
  });
  test('restored session guards prevent recounting and denied confirmations never replay', () => {
    window.sessionStorage.setItem('kdh_conversion_chat_restored', 'confirmed');
    setAnalyticsConsent(true);
    expect(trackConfirmedLead('chat', 'restored', true)).toBe(false);
    setAnalyticsConsent(false);
    trackConfirmedLead('chat', 'no-consent', true);
    setAnalyticsConsent(true);
    expect(trackConfirmedLead('chat', 'no-consent', true)).toBe(false);
    expect(window.gtag).not.toHaveBeenCalled();
  });
  test('chat openings and demo starts are engagement, and duplicate demo callbacks are guarded', () => {
    setAnalyticsConsent(true);
    trackAcquisition('chat_open');
    trackAcquisition('chat_message_sent');
    trackOnce('demo_request_start', 'demo-test', { cta: 'assistant-demo' });
    trackOnce('demo_request_start', 'demo-test', { cta: 'assistant-demo' });
    expect(window.gtag.mock.calls.map(call => call[1])).toEqual(['chat_open', 'chat_message_sent', 'demo_request_start']);
  });
  test('payloads contain only approved context, never PII, transcripts, CRM IDs, or query strings', () => {
    setAnalyticsConsent(true);
    captureAttribution();
    trackAcquisition('service_cta_click', { service: 'ai-development', cta: 'assistant-demo', sourcePath: '/ai-group/?email=private@example.com', email: 'private@example.com', message: 'patient-record', conversationId: 'crm-123', transcript: 'private' });
    const payload = window.gtag.mock.calls[0][2];
    expect(payload).toMatchObject({ service: 'ai-development', cta: 'assistant-demo', sourcePath: '/ai-group/', page_path: '/contact/', page_referrer: '', attributionSource: 'unknown_direct', attributionCampaign: 'ai-assistant' });
    expect(JSON.stringify(payload)).not.toMatch(/private|patient-record|crm-123|\?/);
    setAnalyticsConsent(false);
    expect(window.sessionStorage.getItem('kdh_analytics_attribution')).toBeNull();
  });
  test('unapproved campaigns are dropped and missing referrers remain unknown/direct', () => {
    window.location.search = '?utm_campaign=private@example.com&utm_source=made-up';
    setAnalyticsConsent(true); captureAttribution();
    expect(getAttribution()).toMatchObject({ attributionSource: 'unknown_direct', attributionCampaign: '' });
  });
  test('blocked storage does not break lead counting', () => {
    window.sessionStorage = { getItem: () => { throw new Error('denied'); }, setItem: () => { throw new Error('denied'); }, removeItem: () => {} };
    setAnalyticsConsent(true);
    expect(trackConfirmedLead('chat', 'blocked-storage-test', true)).toBe(true);
    expect(trackConfirmedLead('chat', 'blocked-storage-test', true)).toBe(false);
  });
});

describe('form response contract', () => {
  test.each([
    [{ success: true, notificationDelivered: true }, true, true],
    [{ success: false }, false, false],
    [{ success: true }, true, false],
  ])('requires the explicit notification confirmation for conversion', async (body, success, confirmed) => {
    global.fetch = jest.fn().mockResolvedValue({ ok: true, json: async () => body });
    const result = await submitContactForm({});
    expect(result.success).toBe(success);
    expect(result.notificationDelivered).toBe(confirmed);
  });
});

describe('published content and evidence', () => {
  test.each(['web-development', 'web-design', 'digital-marketing', 'support', 'ai-development'])('%s includes buyer guidance, proof, boundaries, pricing, and 4–6 FAQs', key => {
    const guide = siteData.serviceContent[key].buyerGuide;
    expect(guide.deliverables.length).toBeGreaterThan(0);
    expect(guide.faqs.length).toBeGreaterThanOrEqual(4);
    expect(guide.faqs.length).toBeLessThanOrEqual(6);
    expect(guide.boundaries).toBeTruthy(); expect(guide.pricingBasis).toBeTruthy(); expect(guide.proof.length).toBeGreaterThan(0);
  });
  test('Web and AI authoritative prices render without JavaScript and retain all numeric values', () => {
    const prior = JSON.parse(fs.readFileSync('../techdocs/organic-acquisition/prior-metadata-and-content.json', 'utf8'))['frontend/data/siteData.js'];
    for (const [group, totals, support] of [['web', [2500, 3800, 5500], [150, 250, 500]], ['ai', [4000, 6000, 8000], [300, 500, 800]]]) {
      expect(siteData.pricing[group].plans.map(plan => plan.setupPrice)).toEqual(totals);
      expect(siteData.pricing[group].plans.map(plan => plan.monthlySupport)).toEqual(support);
      const html = renderToStaticMarkup(<PricingSummary group={group} />);
      for (const price of [...totals, ...support]) { expect(html).toContain(`$${price.toLocaleString('en-US')}`); expect(prior).toContain(`: ${price}`); }
      expect(html).toContain('six payments');
    }
  });
  test('all published setup prices, support prices, and network ranges are unchanged', () => {
    const prior = JSON.parse(fs.readFileSync('../techdocs/organic-acquisition/prior-metadata-and-content.json', 'utf8'))['frontend/data/siteData.js'];
    const current = fs.readFileSync('data/siteData.js', 'utf8');
    const prices = source => source.slice(source.indexOf('  pricing:'), source.indexOf('  about:', source.indexOf('  pricing:'))).match(/(?:setupPrice|monthlySupport|priceRange):\s*(?:\d+|"[^"]+")/g);
    expect(prices(current)).toEqual(prices(prior));
  });
  test('preserves entity IDs and uses page-specific Service data without unsupported business claims', () => {
    const data = buildStructuredData({ url: '/web-group/services/web-design/', name: 'Web Design', service: 'Web Design', description: 'Responsive website design' });
    const ids = data['@graph'].map(item => item['@id']);
    expect(ids).toContain('https://kingdomdesignhouse.com/#organization');
    expect(ids).toContain('https://kingdomdesignhouse.com/#localbusiness');
    expect(ids).toContain('https://kingdomdesignhouse.com/#service-web');
    expect(ids).toContain('https://kingdomdesignhouse.com/web-group/services/web-design/#service');
    expect(data['@graph'].some(item => item['@type'] === 'BreadcrumbList')).toBe(true);
    expect(JSON.stringify(data)).not.toMatch(/numberOfEmployees|GeoCoordinates|openingHours|certifi|98%|300%/i);
  });
  test('portfolio relationship wording and quantitative claims match available evidence', () => {
    expect(JSON.stringify(getCaseStudy('northwell'))).toContain('Professional employment');
    expect(getCaseStudy('northwell').impact).toBeUndefined();
    expect(JSON.stringify(getCaseStudy('iin'))).toContain('not a verified KDH agency engagement');
    expect(JSON.stringify(getCaseStudy('iin'))).not.toMatch(/90,000|1 million|30%/);
  });
});

describe('submission lifecycle', () => {
  const { startSubmission, finishSubmission, editSubmission } = require('../utils/inquirySession');
  test('blocks concurrent and completed submissions; a deliberate new edit starts a new receipt', () => {
    const state = { id: null, pending: false, delivered: false };
    expect(startSubmission(state)).toBe(true);
    const originalId = state.id;
    expect(startSubmission(state)).toBe(false);
    expect(editSubmission(state)).toBe(false);
    finishSubmission(state, true);
    expect(startSubmission(state)).toBe(false);
    expect(editSubmission(state)).toBe(true);
    expect(startSubmission(state)).toBe(true);
    expect(state.id).not.toBe(originalId);
  });
  test('a failure can retry under the same receipt and only a confirmed success completes it', () => {
    const state = { id: null, pending: false, delivered: false };
    startSubmission(state);
    const receipt = state.id;
    finishSubmission(state, false);
    expect(startSubmission(state)).toBe(true);
    expect(state.id).toBe(receipt);
    finishSubmission(state, true);
    expect(startSubmission(state)).toBe(false);
  });
});

describe('breadcrumb eligibility', () => {
  const { buildBreadcrumbs } = require('../utils/breadcrumbs');
  test('new destinations do not link to nonexistent category parents', () => {
    expect(buildBreadcrumbs('/guides/custom-ai-assistant-vs-chatbot/').map(item => item.url)).toEqual(['/', '/guides/custom-ai-assistant-vs-chatbot/']);
    expect(buildBreadcrumbs('/ai-group/solutions/ai-lead-assistant/').map(item => item.url)).toEqual(['/', '/ai-group/', '/ai-group/solutions/ai-lead-assistant/']);
    expect(buildBreadcrumbs('/locations/freeport-ny/').map(item => item.url)).not.toContain('/locations/');
  });
});
