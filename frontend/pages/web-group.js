import React from 'react';
import Layout from '../components/Layout';
import SEOHead from '../components/SEOHead';
import GroupHero from '../components/GroupHero';
import GroupHeading from '../components/Molecules/GroupHeading';
import WebStrategy from '../components/Organisms/WebStrategy';
import ProcessSteps from '../components/ProcessSteps';
import ChatJarvis from '../components/ChatJarvis';
import WhyChooseUs from '../components/WhyChooseUs';
import { pageSeoData } from '../lib/seo';

export default function WebGroup() {
  const seoData = pageSeoData.webGroup;
  
  return (
    <>
      <SEOHead {...seoData} />
      
      <Layout>
        <GroupHero groupName="webgroup" />
        <GroupHeading groupName="webgroup" />
        <ProcessSteps />
        <WebStrategy />
        <WhyChooseUs />
        <ChatJarvis />
      </Layout>
    </>
  );
}