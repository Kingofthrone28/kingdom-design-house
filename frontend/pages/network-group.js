import React from 'react';
import Layout from '../components/Layout';
import SEOHead from '../components/SEOHead';
import GroupHero from '../components/GroupHero';
import GroupHeading from '../components/Molecules/GroupHeading';
import ProcessSteps from '../components/ProcessSteps';  
import ServiceContent from '../components/Organisms/ServiceContent';
import ChatJarvis from '../components/ChatJarvis';
import WhyChooseUs from '../components/WhyChooseUs';
import { pageSeoData } from '../lib/seo';

export default function NetworkGroup() {
  const seoData = pageSeoData.networkGroup;
  
  return (
    <>
      <SEOHead {...seoData} />
      
      <Layout>
        <GroupHero groupName="networkgroup" />
        <GroupHeading groupName="networkgroup" />
        <ServiceContent serviceType="network-design" layout="2-column" />
        <ProcessSteps />
        <ChatJarvis />
        <WhyChooseUs />
      </Layout>
    </>
  );
}