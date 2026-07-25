const isNonEmptyString = (value) => typeof value === 'string' && value.trim().length > 0;
const isPublicPath = (value) => isNonEmptyString(value) && value.startsWith('/');

export const validateCaseStudy = (caseStudy) => {
  const errors = [];
  const requireString = (value, path) => {
    if (!isNonEmptyString(value)) errors.push(`${path} must be a non-empty string`);
  };

  if (!caseStudy || typeof caseStudy !== 'object') return ['case study must be an object'];

  ['title', 'description', 'canonical', 'ogImage'].forEach((key) => requireString(caseStudy.seo?.[key], `seo.${key}`));
  requireString(caseStudy.hero?.eyebrow, 'hero.eyebrow');
  requireString(caseStudy.hero?.copy, 'hero.copy');
  if (!Array.isArray(caseStudy.hero?.title) || caseStudy.hero.title.length === 0) errors.push('hero.title must contain at least one line');
  if (!Array.isArray(caseStudy.projectDetails) || caseStudy.projectDetails.length === 0) errors.push('projectDetails must contain at least one item');
  if (!Array.isArray(caseStudy.opportunity?.paragraphs) || caseStudy.opportunity.paragraphs.length === 0) errors.push('opportunity.paragraphs must contain at least one paragraph');
  if (!isPublicPath(caseStudy.video?.src)) errors.push('video.src must be a public-root path');
  if (!Array.isArray(caseStudy.approach?.pillars) || caseStudy.approach.pillars.length === 0) errors.push('approach.pillars must contain at least one item');
  if (!Array.isArray(caseStudy.experience?.features) || caseStudy.experience.features.length === 0) errors.push('experience.features must contain at least one item');
  if (!isPublicPath(caseStudy.experience?.devicePreview?.src)) errors.push('experience.devicePreview.src must be a public-root path');
  requireString(caseStudy.experience?.devicePreview?.alt, 'experience.devicePreview.alt');

  if (caseStudy.impact) {
    if (!Array.isArray(caseStudy.impact.metrics) || caseStudy.impact.metrics.length === 0) {
      errors.push('impact.metrics must contain at least one item when impact is provided');
    } else {
      caseStudy.impact.metrics.forEach((metric, index) => {
        ['from', 'to', 'label'].forEach((key) => requireString(metric[key], `impact.metrics[${index}].${key}`));
      });
    }
  }

  return errors;
};
