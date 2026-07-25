// Compatibility exports. New code should import from data/caseStudies.
export {
  caseStudySummaries as caseStudiesDirectoryData,
  getCaseStudySummaries as getCaseStudiesDirectoryData
} from './caseStudies/summaries';

export {
  getCaseStudy,
  getCaseStudySummaries,
  validateCaseStudy
} from './caseStudies';

export { northwellData } from './caseStudies/northwell';
export { dareMdData } from './caseStudies/daremd';
export { dermCareData } from './caseStudies/dermcare';
export { iinData } from './caseStudies/iin';
export { softPlayData } from './caseStudies/softplay';

import { northwellData } from './caseStudies/northwell';
import { dareMdData } from './caseStudies/daremd';
import { dermCareData } from './caseStudies/dermcare';
import { iinData } from './caseStudies/iin';
import { softPlayData } from './caseStudies/softplay';

export const getNorthwellData = () => northwellData;
export const getDareMdEditorialData = () => dareMdData;
export const getDermCareEditorialData = () => dermCareData;
export const getIinEditorialData = () => iinData;
export const getSoftPlayEditorialData = () => softPlayData;
