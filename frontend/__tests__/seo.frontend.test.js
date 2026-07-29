import fs from 'node:fs';
import path from 'node:path';
import { navbarData } from '../data/navbarData';
import { caseStudySummaries } from '../data/caseStudies/summaries';
import { siteData } from '../data/siteData';
import { withTrailingSlash } from '../utils/url';

const SITE_URL = 'https://kingdomdesignhouse.com';

const expectCanonicalInternalRoute = (route) => {
  const absoluteUrl = new URL(route, SITE_URL);

  expect(absoluteUrl.protocol).toBe('https:');
  expect(absoluteUrl.hostname).toBe('kingdomdesignhouse.com');
  expect(absoluteUrl.pathname.endsWith('/')).toBe(true);
};

describe('SEO routing', () => {
  test('redirects the obsolete Northwell concept route to the canonical case study', async () => {
    const nextConfig = require('../next.config');

    await expect(nextConfig.redirects()).resolves.toContainEqual({
      source: '/case-studies/northwell-concept/',
      destination: '/case-studies/northwell/',
      permanent: true
    });
  });

  test('keeps navigation and content links on canonical internal routes', () => {
    const navBarGroup = navbarData.navBarGroup;
    const navigationRoutes = [
      navbarData.cta.route,
      ...navbarData.navigation.map(({ route }) => route),
      ...navBarGroup.navLinks.flatMap(({ route }) => route ? [route] : []),
      ...navBarGroup.companyGroupsSubmenu.map(({ route }) => route),
      ...navBarGroup.webServicesSubmenu.map(({ route }) => route),
      ...navBarGroup.networkServicesSubmenu.map(({ route }) => route),
      ...navBarGroup.aiServicesSubmenu.map(({ route }) => route)
    ];
    const groupRoutes = siteData.groups.map(({ route }) => route);
    const footerRoutes = [
      ...siteData.footer.webServices,
      ...siteData.footer.networkServices,
      ...siteData.footer.aiServices
    ].map(({ url }) => url);
    const serviceRoutes = Object.values(siteData.services).flatMap((group) =>
      group.services.map((service) =>
        withTrailingSlash(`${group.basePath}/${service.slug}`)
      )
    );
    const caseStudyRoutes = caseStudySummaries.map(({ href }) => href);

    [
      ...navigationRoutes,
      ...groupRoutes,
      ...footerRoutes,
      ...serviceRoutes,
      ...caseStudyRoutes
    ].forEach(expectCanonicalInternalRoute);
  });
});

describe('sitemap', () => {
  const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
  const sitemapXml = fs.readFileSync(sitemapPath, 'utf8');
  const locations = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map(([, location]) => location);

  test('lists only the 24 unique canonical public URLs', () => {
    expect(locations).toHaveLength(24);
    expect(new Set(locations).size).toBe(locations.length);

    locations.forEach((location) => {
      expect(location.startsWith(`${SITE_URL}/`)).toBe(true);
      expect(new URL(location).pathname.endsWith('/')).toBe(true);
    });

    expect(locations).not.toContain(
      `${SITE_URL}/case-studies/northwell-concept/`
    );
  });

  test('omits optional metadata that cannot be maintained accurately', () => {
    expect(sitemapXml).not.toMatch(/<(lastmod|changefreq|priority)>/);
  });
});

describe('structured data', () => {
  test('does not advertise a search action without a site-search feature', () => {
    const structuredDataSource = fs.readFileSync(
      path.join(process.cwd(), 'components', 'StructuredData.js'),
      'utf8'
    );

    expect(structuredDataSource).not.toMatch(
      /['"]@type['"]\s*:\s*['"]SearchAction['"]/
    );
    expect(structuredDataSource).not.toContain('{search_term_string}');
  });
});
