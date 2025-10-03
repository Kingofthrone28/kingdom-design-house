import React from 'react';
import Layout from '../components/Layout';
import SEOHead from '../components/SEOHead';
import GroupHero from '../components/GroupHero';
import GroupHeading from '../components/Molecules/GroupHeading';
import OurGroups from '../components/OurGroups';
import ProcessSteps from '../components/ProcessSteps';
import ChatJarvis from '../components/ChatJarvis';
import WhyChooseUs from '../components/WhyChooseUs';
import { pageSeoData } from '../lib/seo';

export default function AIGroup() {
  const seoData = pageSeoData.aiGroup;
  
  return (
    <>
      <SEOHead {...seoData} />
      
      <Layout>
        <GroupHero groupName="aigroup" />
        <GroupHeading groupName="aigroup" />
        <ProcessSteps />
        <ChatJarvis />
        <WhyChooseUs />
      </Layout>
    </>
  );
}