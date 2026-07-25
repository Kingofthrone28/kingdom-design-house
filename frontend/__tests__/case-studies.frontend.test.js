import {
  getCaseStudy,
  getCaseStudySummaries,
  validateCaseStudy
} from '../data/caseStudies';

const slugs = ['northwell', 'daremd', 'dermcare', 'iin', 'softplay'];

describe('case-study data', () => {
  test.each(slugs)('%s resolves and matches the editorial schema', (slug) => {
    const caseStudy = getCaseStudy(slug);
    expect(caseStudy).not.toBeNull();
    expect(validateCaseStudy(caseStudy)).toEqual([]);
  });

  test('returns null for an unknown case study', () => {
    expect(getCaseStudy('missing')).toBeNull();
  });

  test('summary slugs resolve to case-study data', () => {
    getCaseStudySummaries().forEach(({ slug, href, imageSrc }) => {
      expect(getCaseStudy(slug)).not.toBeNull();
      expect(href).toMatch(/^\/case-studies\/.+\/$/);
      expect(imageSrc).toMatch(/^\//);
    });
  });

  test('impact is optional but validated when present', () => {
    const withoutImpact = { ...getCaseStudy('iin') };
    expect(validateCaseStudy(withoutImpact)).toEqual([]);

    const invalidImpact = { ...withoutImpact, impact: { metrics: [] } };
    expect(validateCaseStudy(invalidImpact)).toContain(
      'impact.metrics must contain at least one item when impact is provided'
    );
  });
});
