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
import { getPageHeadline } from '../data/siteData';

export default function AIGroup() {
  const seoData = pageSeoData.aiGroup;
  const pageHeadline = getPageHeadline('aiGroup');
  
  return (
    <>
      <SEOHead {...seoData} />
      
      <Layout>
        <GroupHero groupName="aigroup" pageHeadline={pageHeadline} />
        <GroupHeading groupName="aigroup" groupIntent="AI Solutions & Automation Experts in NY" />
        <ProcessSteps />
        <ChatJarvis />
        <WhyChooseUs />
      </Layout>
    </>
  );
}