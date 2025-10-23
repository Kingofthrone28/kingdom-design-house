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

export default function NetworkSupport() {
  const seoData = serviceSeoData.networkSupport;
  
  return (
    <>
      <SEOHead {...seoData} />
      <StructuredData />
      
      <Layout>
        <GroupHero groupName="networkgroup" />
        <GroupHeading groupName="networkgroup" />
        <ServiceContent serviceType="network-support" />
        <ProcessSteps />
        <ChatJarvis />
        <WhyChooseUs />
      </Layout>
    </>
  );
}