import React from 'react';
import EditorialCaseStudyPage from '../../components/Organisms/EditorialCaseStudyPage';
import { northwellData } from '../../data/caseStudies/northwell';

export default function NorthwellCaseStudy() {
  return (
    <EditorialCaseStudyPage data={northwellData} />
  );
}
