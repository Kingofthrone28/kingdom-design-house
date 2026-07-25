import React from 'react';
import EditorialCaseStudyPage from '../../components/Organisms/EditorialCaseStudyPage';
import { dareMdData } from '../../data/caseStudies/daremd';

export default function DareMdCaseStudy() {
  return <EditorialCaseStudyPage data={dareMdData} />;
}
