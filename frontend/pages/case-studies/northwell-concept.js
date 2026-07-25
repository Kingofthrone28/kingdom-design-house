import React from 'react';
import EditorialCaseStudyPage from '../../components/Organisms/EditorialCaseStudyPage';
import { northwellData } from '../../data/caseStudies/northwell';

export default function NorthwellConcept() {
  return <EditorialCaseStudyPage data={northwellData} />;
}
