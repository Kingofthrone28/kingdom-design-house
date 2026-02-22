import React from 'react';
import Layout from '../components/Layout';
import SEOHead from '../components/SEOHead';
import StructuredData from '../components/StructuredData';
import GroupHero from '../components/GroupHero';
import GroupHeading from '../components/Molecules/GroupHeading';
import ProcessSteps from '../components/ProcessSteps';  
import ServiceContent from '../components/Organisms/ServiceContent';
import ChatJarvis from '../components/ChatJarvis';
import WhyChooseUs from '../components/WhyChooseUs';
import { pageSeoData } from '../lib/seo';
import { getPageHeadline } from '../data/siteData';

export default function NetworkGroup() {
  const seoData = pageSeoData.networkGroup;
  const pageHeadline = getPageHeadline('networkGroup');
  
  return (
    <>
      <SEOHead {...seoData} />
      <StructuredData />
      
      <Layout>
        <GroupHero groupName="networkgroup" pageHeadline={pageHeadline} />
        <GroupHeading groupName="networkgroup" groupIntent="IT Infrastructure & Connectivity Experts in NY" />
        <ServiceContent serviceType="network-design" layout="2-column" />
        <ProcessSteps />
        <ChatJarvis />
        <WhyChooseUs />
      </Layout>
    </>
  );
}
