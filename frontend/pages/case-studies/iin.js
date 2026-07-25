import React from 'react';
import EditorialCaseStudyPage from '../../components/Organisms/EditorialCaseStudyPage';
import { iinData } from '../../data/caseStudies/iin';

export default function IinCaseStudy() {
  return <EditorialCaseStudyPage data={iinData} />;
}
