import React from 'react';
import Layout from '../../components/Layout';
import SEOHead from '../../components/SEOHead';
import DiscoverOurWork from '../../components/Organisms/DiscoverOurWork';
import CaseStudyLetsTalk from '../../components/Molecules/CaseStudyLetsTalk';
import { getCaseStudySummaries } from '../../data/caseStudies/summaries';
import { scrollToChatOrContact } from '../../utils/navigation';

const caseStudiesSeoData = {
  title: 'Discover Our Work | Case Studies | Kingdom Design House',
  description:
    'Discover real client work from Kingdom Design House, including web design, development, and SEO case studies across Long Island and NYC.',
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
  const caseStudies = getCaseStudySummaries();

  return (
    <>
      <SEOHead {...caseStudiesSeoData} />

      <Layout>
        <DiscoverOurWork caseStudies={caseStudies} />

        <CaseStudyLetsTalk
          question={letsTalkData.question}
          heading={letsTalkData.heading}
          onClick={() => scrollToChatOrContact()}
        />

      </Layout>
    </>
  );
}
