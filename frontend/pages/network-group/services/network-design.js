import React from 'react';
import Layout from '../../../components/Layout';
import SEOHead from '../../../components/SEOHead';
import StructuredData from '../../../components/StructuredData';
import GroupHero from '../../../components/GroupHero';
import ServiceContent from '../../../components/Organisms/ServiceContent';
import GroupHeading from '../../../components/Molecules/GroupHeading';
import ProcessSteps from '../../../components/ProcessSteps';
import ChatJarvis from '../../../components/ChatJarvis';
import WhyChooseUs from '../../../components/WhyChooseUs';
import { serviceSeoData } from '../../../lib/seo';
import { getPageHeadline } from '../../../data/siteData';

export default function NetworkDesign() {
  const seoData = serviceSeoData.networkDesign;
  const pageHeadline = getPageHeadline('network-design');
  
  return (
    <>
      <SEOHead {...seoData} />
      <StructuredData />
      
      <Layout>
        <GroupHero groupName="networkgroup" pageHeadline={pageHeadline} />
        <GroupHeading groupName="networkgroup" groupIntent="Wireless Network Design in Long Island NY" />
        <ServiceContent serviceType="network-design" />
        <ProcessSteps />
        <ChatJarvis />
        <WhyChooseUs />
      </Layout>
    </>
  );
}
