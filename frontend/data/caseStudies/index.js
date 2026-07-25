import { northwellData } from './northwell';
import { dareMdData } from './daremd';
import { dermCareData } from './dermcare';
import { iinData } from './iin';
import { softPlayData } from './softplay';

export { getCaseStudySummaries, caseStudySummaries } from './summaries';
export { validateCaseStudy } from './validate';
export { northwellData, dareMdData, dermCareData, iinData, softPlayData };

const caseStudiesBySlug = {
  northwell: northwellData,
  daremd: dareMdData,
  dermcare: dermCareData,
  iin: iinData,
  softplay: softPlayData
};

export const getCaseStudy = (slug) => caseStudiesBySlug[slug] || null;
