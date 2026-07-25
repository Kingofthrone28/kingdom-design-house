import React from 'react';
import EditorialCaseStudyPage from '../../components/Organisms/EditorialCaseStudyPage';
import { dermCareData } from '../../data/caseStudies/dermcare';

export default function DermCareCaseStudy() {
  return <EditorialCaseStudyPage data={dermCareData} />;
}
