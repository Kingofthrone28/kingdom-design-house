import React from 'react';
import Layout from '../../components/Layout';
import SEOHead from '../../components/SEOHead';
import StructuredData from '../../components/StructuredData';
import DiscoverOurWork from '../../components/Organisms/DiscoverOurWork';
import CaseStudyLetsTalk from '../../components/Molecules/CaseStudyLetsTalk';
import { getCaseStudySummaries } from '../../data/caseStudies/summaries';
import { useJarvis } from '../../contexts/JarvisContext';
import { trackAcquisition } from '../../utils/analytics';

const caseStudiesSeoData = {
  title: 'Discover Our Work | Case Studies | Kingdom Design House',
  description:
    'Explore website projects and professional contributions, including David Dare MD, DermCare, IIN, and Northwell employment experience.',
  canonical: '/case-studies/',
  keywords:
    'case studies, web design portfolio, web development case studies, Long Island web agency, NYC website projects',
  ogImage: '/images/dermcare.png'
};

const letsTalkData = {
  question: 'Want to collaborate on a Project?',
  heading: "Let's Talk"
};

export default function CaseStudiesDirectoryPage() {
  const { openJarvis } = useJarvis();
  const caseStudies = getCaseStudySummaries();

  return (
    <>
      <SEOHead {...caseStudiesSeoData} />
      <StructuredData page={{ url: caseStudiesSeoData.canonical, name: caseStudiesSeoData.title, description: caseStudiesSeoData.description }} />

      <Layout>
        <DiscoverOurWork caseStudies={caseStudies} />

        <CaseStudyLetsTalk
          question={letsTalkData.question}
          heading={letsTalkData.heading}
          onClick={() => { trackAcquisition('service_cta_click', { cta: 'proof', sourcePath: '/case-studies/' }); openJarvis({ cta: 'proof' }); }}
        />

      </Layout>
    </>
  );
}
