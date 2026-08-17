import fs from 'node:fs';
import path from 'node:path';
import { agencyServicePresentation, agencyServiceTypes, getAgencyServicePresentation } from '../data/agencyServicePresentation';
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
