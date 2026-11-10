import { northwellData } from './northwell';
import { dareMdData } from './daremd';
import { dermCareData } from './dermcare';
import { iinData } from './iin';

export { getCaseStudySummaries, caseStudySummaries } from './summaries';
export { validateCaseStudy } from './validate';
export { northwellData, dareMdData, dermCareData, iinData };

const caseStudiesBySlug = {
  northwell: northwellData,
  daremd: dareMdData,
  dermcare: dermCareData,
  iin: iinData
};

export const getCaseStudy = (slug) => caseStudiesBySlug[slug] || null;
