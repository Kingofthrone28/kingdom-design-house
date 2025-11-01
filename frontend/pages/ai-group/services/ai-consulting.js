import React from 'react';
import Layout from '../../../components/Layout';
import SEOHead from '../../../components/SEOHead';
import StructuredData from '../../../components/StructuredData';
import GroupHero from '../../../components/GroupHero';
import GroupHeading from '../../../components/Molecules/GroupHeading';
import ServiceContent from '../../../components/Organisms/ServiceContent';
import ProcessSteps from '../../../components/ProcessSteps';
import ChatJarvis from '../../../components/ChatJarvis';
import WhyChooseUs from '../../../components/WhyChooseUs';
import { serviceSeoData } from '../../../lib/seo';
import { getPageHeadline } from '../../../data/siteData';

export default function AIGroupWebDesign() {
  const seoData = serviceSeoData.aiConsulting;
  const pageHeadline = getPageHeadline('ai-consulting');
  
  return (
    <>
      <SEOHead {...seoData} />
      <StructuredData />
      
      <Layout>
        <GroupHero groupName="aigroup" pageHeadline={pageHeadline} />
        <GroupHeading groupName="aigroup" groupIntent="AI Consulting Services for NYC Businesses" />
        <ServiceContent serviceType="ai-consulting" />
        <ProcessSteps />
        <ChatJarvis />
        <WhyChooseUs />
      </Layout>
    </>
  );
}