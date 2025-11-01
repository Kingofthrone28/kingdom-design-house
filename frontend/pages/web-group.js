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
import { getPageHeadline } from '../data/siteData';

export default function WebGroup() {
  const seoData = pageSeoData.webGroup;
  const pageHeadline = getPageHeadline('webGroup');
  
  return (
    <>
      <SEOHead {...seoData} />
      
      <Layout>
        <GroupHero groupName="webgroup" pageHeadline={pageHeadline} />
        <GroupHeading groupName="webgroup" groupIntent="Web Development & SEO Experts in New York" />
        <ProcessSteps />
        <WebStrategy />
        <WhyChooseUs />
        <ChatJarvis />
      </Layout>
    </>
  );
}