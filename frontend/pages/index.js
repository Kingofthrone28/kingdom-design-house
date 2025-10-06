import React from 'react';
import Layout from '../components/Layout';
import SEOHead from '../components/SEOHead';
import Hero from '../components/Hero';
import OurGroups from '../components/OurGroups';
import ProcessSteps from '../components/ProcessSteps';
import ChatJarvis from '../components/ChatJarvis';
import WhyChooseUs from '../components/WhyChooseUs';
import { pageSeoData } from '../lib/seo';
import VideoShowcase from '../components/VideoShowcase';
export default function Home() {
  const seoData = pageSeoData.home;
  
  return (
    <>
      <SEOHead {...seoData} />
      
      <Layout>
        <Hero />
        <OurGroups />
        <VideoShowcase />
        <ProcessSteps />
        <ChatJarvis />
        <WhyChooseUs />
      </Layout>
    </>
  );
}