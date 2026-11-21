// Shared by browser and API handlers. Query strings never pass through wholesale.
const publication = require('../data/site/publication.json');
const SERVICES = ['web-development', 'web-design', 'digital-marketing', 'support', 'it-services', 'network-design', 'network-support', 'network-optimization', 'ai-solutions', 'ai-consulting', 'ai-development', 'ai-support', 'other'];
const CTAS = ['hero', 'homepage', 'floating', 'service-hero', 'service-footer', 'hub', 'proof', 'location', 'guide', 'healthcare', 'assistant-demo', 'chat-fallback', 'pricing'];
const ATTRIBUTION_SOURCES = ['unknown_direct', 'google', 'bing', 'linkedin', 'instagram', 'referral'];
const CAMPAIGNS = ['organic-acquisition', 'web-services', 'ai-assistant', 'healthcare-websites'];
const publicPaths = new Set(publication.filter(page => page.published && page.indexable && !page.redirect).map(page => page.path));
const pick = (value, allowed) => typeof value === 'string' && allowed.includes(value) ? value : '';
const normalizePath = value => {
  if (typeof value !== 'string' || !value.startsWith('/') || value.startsWith('//')) return '/unknown/';
  const pathname = value.split(/[?#]/)[0].replace(/\/{2,}/g, '/');
  const normalized = pathname === '/' ? '/' : `${pathname.replace(/\/$/, '')}/`;
  return publicPaths.has(normalized) ? normalized : '/unknown/';
};
const inquiryContext = (values = {}) => ({
  service: pick(values.service, SERVICES),
  cta: pick(values.cta, CTAS),
  sourcePath: values.sourcePath ? normalizePath(values.sourcePath) : '',
});
const approvedAttribution = (values = {}) => ({
  attributionSource: pick(values.attributionSource, ATTRIBUTION_SOURCES),
  attributionCampaign: pick(values.attributionCampaign, CAMPAIGNS),
  landingPath: values.landingPath ? normalizePath(values.landingPath) : '',
});
const contactHref = context => {
  const clean = inquiryContext(context);
  const query = new URLSearchParams(Object.entries(clean).filter(([, value]) => value));
  return `/contact/${query.size ? `?${query}` : ''}`;
};
const contextDescription = values => {
  const clean = { ...inquiryContext(values), ...approvedAttribution(values) };
  return Object.entries(clean).filter(([, value]) => value).map(([key, value]) => `${key}: ${value}`).join('\n');
};
module.exports = { SERVICES, CTAS, ATTRIBUTION_SOURCES, CAMPAIGNS, normalizePath, inquiryContext, approvedAttribution, contactHref, contextDescription };
