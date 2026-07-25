import React from 'react';
import EditorialCaseStudyPage from '../../components/Organisms/EditorialCaseStudyPage';
import { softPlayData } from '../../data/caseStudies/softplay';

export default function SoftPlayCaseStudy() {
  return <EditorialCaseStudyPage data={softPlayData} />;
}
