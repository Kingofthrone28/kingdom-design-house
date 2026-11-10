import { seoConfig } from './seo';
import { toAbsoluteUrl } from '../utils/url';
import { buildBreadcrumbs } from '../utils/breadcrumbs';

export function buildStructuredData(page = {}) {
  const siteUrl = seoConfig.company.url;
  const orgId = `${siteUrl}/#organization`;
  const lbId = `${siteUrl}/#localbusiness`;
  const websiteId = `${siteUrl}/#website`;
  const pageUrl = toAbsoluteUrl(siteUrl, page.url || '/');
  const webPageId = `${pageUrl}#webpage`;
  const region = [{ '@type': 'AdministrativeArea', name: 'Long Island, NY' }, { '@type': 'City', name: 'New York City' }];
  const graph = [
    { '@type': 'WebSite', '@id': websiteId, url: `${siteUrl}/`, name: seoConfig.company.name, publisher: { '@id': orgId } },
    { '@type': 'WebPage', '@id': webPageId, url: pageUrl, name: page.name || seoConfig.company.name, description: page.description || seoConfig.company.description, isPartOf: { '@id': websiteId }, inLanguage: 'en-US' },
    {
      '@type': 'Organization', '@id': orgId, name: seoConfig.company.name,
      legalName: 'Kingdom Design House LLC', url: `${siteUrl}/`, logo: seoConfig.company.logo,
      description: seoConfig.company.description, email: seoConfig.company.email, telephone: '+1-347-927-8846',
      sameAs: ['https://www.linkedin.com/in/paul-solomon-4a623bba/', 'https://www.instagram.com/kingdom_design_house/'],
      location: { '@id': lbId },
    },
    {
      '@type': 'LocalBusiness', '@id': lbId, name: seoConfig.company.name, url: `${siteUrl}/`,
      image: seoConfig.company.logo, email: seoConfig.company.email, telephone: '+1-347-927-8846',
      address: { '@type': 'PostalAddress', addressLocality: 'Freeport', addressRegion: 'NY', addressCountry: 'US' },
      areaServed: region,
    },
    ...[
      ['ai', 'AI Solutions', 'Knowledge assistants and business workflow automation.'],
      ['web', 'Web Development Services', 'Websites, business applications, web design, and support.'],
      ['network', 'Network Services', 'Network design, optimization, and IT support.'],
    ].map(([key, name, description]) => ({ '@type': 'Service', '@id': `${siteUrl}/#service-${key}`, name, description, provider: { '@id': orgId }, areaServed: region })),
  ];
  const crumbs = page.breadcrumbs || buildBreadcrumbs(page.url);
  if (crumbs.length > 1) graph.push({
    '@type': 'BreadcrumbList', '@id': `${webPageId}-breadcrumbs`,
    itemListElement: crumbs.map((item, index) => ({ '@type': 'ListItem', position: index + 1, name: item.name, item: toAbsoluteUrl(siteUrl, item.url) })),
  });
  if (page.service) graph.push({
    '@type': 'Service', '@id': `${pageUrl}#service`, url: pageUrl, name: page.service,
    description: page.description, provider: { '@id': orgId }, areaServed: region,
    mainEntityOfPage: { '@id': webPageId },
  });
  return { '@context': 'https://schema.org', '@graph': graph };
}
