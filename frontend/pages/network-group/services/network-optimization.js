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

export default function NetworkOptimization() {
  const seoData = serviceSeoData.networkOptimization;
  const pageHeadline = getPageHeadline('network-optimization');
  
  return (
    <>
      <SEOHead {...seoData} />
      <StructuredData />
      
      <Layout>
        <GroupHero groupName="networkgroup" pageHeadline={pageHeadline} />
        <GroupHeading groupName="networkgroup" groupIntent="Wireless Infrastructure Design and Optimization NYC" />
        <ServiceContent serviceType="network-optimization" />
        <ProcessSteps />
        <ChatJarvis />
        <WhyChooseUs />
      </Layout>
    </>
  );
}
