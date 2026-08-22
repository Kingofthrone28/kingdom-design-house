import fs from 'node:fs';
import path from 'node:path';
import { agencyServicePresentation, agencyServiceTypes, getAgencyServicePresentation } from '../data/agencyServicePresentation';
import { agencyGroupTypes, getAgencyGroupPresentation } from '../data/agencyGroupPresentation';
import { serviceSeoData } from '../lib/seo';
import { getPageHeadline, getServiceContentData } from '../data/siteData';
import { pageData } from '../data/site/pageRouting';

const routeFiles = {
  'web-development': 'pages/web-group/services/web-development.js',
  'web-design': 'pages/web-group/services/web-design.js',
  'digital-marketing': 'pages/web-group/services/digital-marketing.js',
  support: 'pages/web-group/services/support.js',
  'network-design': 'pages/network-group/services/network-design.js',
  'network-optimization': 'pages/network-group/services/network-optimization.js',
  'network-support': 'pages/network-group/services/network-support.js',
  'ai-development': 'pages/ai-group/services/ai-development.js',
  'ai-consulting': 'pages/ai-group/services/ai-consulting.js',
  'ai-support': 'pages/ai-group/services/ai-support.js'
};

describe('agency service configuration', () => {
  test('covers all ten service types with content, SEO, headlines, groups, and existing assets', () => {
    expect([...agencyServiceTypes].sort()).toEqual(Object.keys(routeFiles).sort());

    agencyServiceTypes.forEach((serviceType) => {
      const presentation = getAgencyServicePresentation(serviceType);
      const content = getServiceContentData(serviceType);
      const headline = getPageHeadline(serviceType);
      const seo = serviceSeoData[presentation.seoKey];
      const assetPath = path.join(process.cwd(), 'public', presentation.showcaseAsset);

      expect(['webgroup', 'networkgroup', 'aigroup']).toContain(presentation.groupName);
      expect(content.mainContent.paragraphs.length).toBeGreaterThan(0);
      expect(content.approach.steps.length).toBeGreaterThan(0);
      expect(content.expertise.items.length).toBeGreaterThan(0);
      expect(headline.main).toBeTruthy();
      expect(seo.canonical).toMatch(/^\/.+\/$/);
      expect(fs.existsSync(assetPath)).toBe(true);
    });
  });

  test('rejects unknown service types instead of silently falling back', () => {
    expect(() => getAgencyServicePresentation('missing-service')).toThrow(
      'Unknown agency service type: missing-service'
    );
  });

  test('all production routes use the shared wrapper with the correct service type and canonical', () => {
    Object.entries(routeFiles).forEach(([serviceType, relativePath]) => {
      const source = fs.readFileSync(path.join(process.cwd(), relativePath), 'utf8');
      const presentation = agencyServicePresentation[serviceType];
      const canonical = serviceSeoData[presentation.seoKey].canonical;

      expect(source).toContain("components/Organisms/AgencyServicePage");
      expect(source).toContain(`serviceType=\"${serviceType}\"`);
      expect(canonical).toContain(`/${serviceType}/`);
    });
  });

  test('route mapping covers Web, Network, and AI services', () => {
    agencyServiceTypes.forEach((serviceType) => {
      expect(Object.values(pageData.services)).toContain(serviceType);
    });
  });
});

describe('agency service content and motion behavior', () => {
  const templateSource = fs.readFileSync(
    path.join(process.cwd(), 'components/Organisms/AgencyServiceTemplate.js'),
    'utf8'
  );
  const motionSource = fs.readFileSync(
    path.join(process.cwd(), 'hooks/useSectionMotion.js'),
    'utf8'
  );
  const stylesSource = fs.readFileSync(
    path.join(process.cwd(), 'styles/AgencyServiceTemplate.module.scss'),
    'utf8'
  );

  test('uses native expandable rows and retains complete descriptions', () => {
    expect(templateSource).toContain('<details');
    expect(templateSource).toContain('<summary>');
    expect(templateSource).toContain('<p>{step.description}</p>');
  });

  test('reveals each section once while keeping parallax updates reversible', () => {
    expect(motionSource).toContain("setAttribute('data-motion-state', 'visible')");
    expect(motionSource).toContain('observer.unobserve(entry.target)');
    expect(motionSource).not.toContain("data-motion-state', 'exited'");
    expect(motionSource).toContain("window.addEventListener('scroll'");
  });

  test('provides a reduced-motion path that never leaves content hidden', () => {
    expect(motionSource).toContain("data-motion-enabled', 'reduced'");
    expect(stylesSource).toContain('@media (prefers-reduced-motion: reduce)');
    expect(stylesSource).toMatch(/\.motionContent[\s\S]*opacity:\s*1/);
  });
});

describe('agency group landings', () => {
  const groupPages = {
    web: { path: 'pages/web-group.js', seoKey: 'webGroup' },
    network: { path: 'pages/network-group.js', seoKey: 'networkGroup' },
    ai: { path: 'pages/ai-group.js', seoKey: 'aiGroup' }
  };
  const landingSource = fs.readFileSync(
    path.join(process.cwd(), 'components/Organisms/AgencyGroupLanding.js'),
    'utf8'
  );

  test('covers Web, Network, and AI with valid service content and visual assets', () => {
    expect([...agencyGroupTypes].sort()).toEqual(Object.keys(groupPages).sort());

    agencyGroupTypes.forEach((groupType) => {
      const presentation = getAgencyGroupPresentation(groupType);
      const assetPath = path.join(process.cwd(), 'public', presentation.capabilities.asset);

      expect(presentation.services.items.length).toBeGreaterThanOrEqual(3);
      expect(fs.existsSync(assetPath)).toBe(true);

      presentation.services.items.forEach(({ serviceType, href }) => {
        expect(getServiceContentData(serviceType).approach.steps.length).toBeGreaterThan(0);
        expect(href).toMatch(new RegExp(`/${serviceType}/$`));
      });
    });
  });

  test.each(Object.entries(groupPages))(
    'renders the shared template on the %s group route while preserving SEO',
    (groupType, { path: pagePath, seoKey }) => {
      const pageSource = fs.readFileSync(path.join(process.cwd(), pagePath), 'utf8');

      expect(pageSource).toContain('AgencyGroupLanding');
      expect(pageSource).toContain(`groupType=\"${groupType}\"`);
      expect(pageSource).toContain(`pageSeoData.${seoKey}`);
      expect(pageSource).not.toContain('GroupHeading');
    }
  );

  test('sources service topics and capabilities while using shared one-shot motion', () => {
    expect(landingSource).toContain('getServiceContentData(config.serviceType)');
    expect(landingSource).toContain('content.approach.steps.map');
    expect(landingSource).toContain('content.expertise.items');
    expect(landingSource).toContain('useSectionMotion');
    expect(landingSource).toContain('data-motion-section');
    expect(landingSource).toContain('AgencyAnimatedTitle');
  });

  test('rejects unknown group types instead of silently falling back', () => {
    expect(() => getAgencyGroupPresentation('missing-group')).toThrow(
      'Unknown agency group type: missing-group'
    );
  });
});
