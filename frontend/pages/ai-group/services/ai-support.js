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

export default function AISupport() {
  const seoData = serviceSeoData.aiSupport;
  
  return (
    <>
      <SEOHead {...seoData} />
      <StructuredData />
      
      <Layout>
        <GroupHero groupName="aigroup" />
        <GroupHeading groupName="aigroup" />
        <ServiceContent serviceType="ai-support" />
        <ProcessSteps />
        <ChatJarvis />
        <WhyChooseUs />
      </Layout>
    </>
  );
}