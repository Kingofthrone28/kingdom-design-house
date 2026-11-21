import fs from 'node:fs';
import { renderToStaticMarkup } from 'react-dom/server';
import AgencyServiceTemplate from '../components/Organisms/AgencyServiceTemplate';
import { agencyServiceTypes, getAgencyServicePresentation } from '../data/agencyServicePresentation';
import { getPageHeadline, getProcessData, getServiceContentData } from '../data/siteData';
import { serviceSeoData, pageSeoData } from '../lib/seo';
import publication from '../data/site/publication.json';
import overview from '../data/servicesOverview.json';
import guides from '../data/authorityGuides.json';

jest.mock('../components/InquiryCTA', () => function MockInquiryCTA() { return <a href="/contact/">Contact</a>; });

const published = new Set(publication.filter(page => page.published && page.indexable && !page.redirect).map(page => page.path));

function renderService(serviceType) {
  return renderToStaticMarkup(<AgencyServiceTemplate serviceType={serviceType} presentation={getAgencyServicePresentation(serviceType)} content={getServiceContentData(serviceType)} headline={getPageHeadline(serviceType)} process={getProcessData()} />);
}

test('each animated service renders one coherent H1 and complete authority content without client JavaScript', () => {
  for (const service of agencyServiceTypes) {
    const html = renderService(service);
    const h1s = html.match(/<h1\b[\s\S]*?<\/h1>/g);
    expect(h1s).toHaveLength(1);
    // The coherent text is the first heading child, before aria-hidden visual characters.
    const text = h1s[0].match(/^<h1[^>]*><span[^>]*>([^<]+)<\/span>/)?.[1];
    expect(text).toBeTruthy();
    expect(text).toMatch(/LONG ISLAND|NYC/);
    expect(h1s[0]).toContain('aria-hidden="true"');
    const guide = getServiceContentData(service).buyerGuide;
    expect(html).toContain('Scope and responsibilities');
    expect(html).toContain('How pricing is scoped');
    expect(html).toContain('Questions before you start');
    expect(html).toContain(guide.cta.replace(/&/g, '&amp;'));
  }
});

test('network services show network ranges and support prices rather than Web package amounts', () => {
  for (const service of ['network-design', 'network-optimization', 'network-support']) {
    const html = renderService(service);
    expect(html).toContain('Network packages');
    for (const value of ['$2,000 - $3,500', '$5,000 - $8,000', '$10,000 - $15,000+', '$200/month', '$350/month', '$600/month']) expect(html).toContain(value);
    expect(html).not.toContain('$2,500');
  }
});

test('contextual authority links resolve to published routes and real guide anchors', () => {
  const entries = [...agencyServiceTypes.map(service => getServiceContentData(service).buyerGuide), overview, ...Object.values(guides)];
  for (const entry of entries) {
    for (const item of [...entry.proof, ...entry.related]) {
      const [route, anchor] = item.href.split('#');
      expect(published.has(route)).toBe(true);
      expect(fs.existsSync(`pages${route.replace(/\/$/, '')}.js`) || fs.existsSync(`pages${route}index.js`)).toBe(true);
      if (anchor) expect(Object.values(guides).find(page => page.path === route)?.sections.some(section => section.id === anchor)).toBe(true);
    }
  }
  for (const service of agencyServiceTypes) {
    const guide = getServiceContentData(service).buyerGuide;
    expect(guide.related.some(item => item.href.includes('/services/'))).toBe(true);
    expect(guide.related.some(item => item.href.startsWith('/guides/'))).toBe(true);
  }
});

test('all eleven pages retain unique canonical metadata and existing share assets', () => {
  const metadata = [pageSeoData.services, ...agencyServiceTypes.map(service => serviceSeoData[getAgencyServicePresentation(service).seoKey])];
  for (const field of ['title', 'description', 'canonical', 'ogTitle', 'ogDescription']) expect(new Set(metadata.map(page => page[field])).size).toBe(11);
  for (const page of metadata) {
    expect(published.has(page.canonical)).toBe(true);
    expect(fs.existsSync(`public${page.ogImage}`)).toBe(true);
  }
});
