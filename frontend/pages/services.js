import React from 'react';
import Layout from '../components/Layout';
import SEOHead from '../components/SEOHead';
import StructuredData from '../components/StructuredData';
import Hero from '../components/Hero';
import GroupHeading from '../components/Molecules/GroupHeading';
import ServicesSection from '../components/Organisms/ServicesSection';
import ProcessSteps from '../components/ProcessSteps';
import ChatJarvis from '../components/ChatJarvis';
import WhyChooseUs from '../components/WhyChooseUs'
import { pageSeoData, seoConfig } from '../lib/seo';
import VideoShowcase from '../components/VideoShowcase';
import { getPageHeadline, geoData, aioData } from '../data/siteData';

export default function Services() {
  const seoData = pageSeoData.services;
  const pageHeadline = getPageHeadline('services');
  
  return (
    <>
      <SEOHead {...seoData} />
      <StructuredData geoData={geoData} aioData={aioData} />
      
      <Layout>
        <Hero pageHeadline={pageHeadline} />
        <GroupHeading groupIntent="Explore Web, Network & AI Solutions for NYC Businesses" />
        <ServicesSection />
        
        {/* GEO & AIO Optimization Data - Available for structured data/SEO purposes only */}
        {/* Data objects (geoData, aioData) kept for future use but not visually rendered */}
        
        <VideoShowcase />
        <ProcessSteps />
        <ChatJarvis />
        <WhyChooseUs />
      </Layout>
    </>
  );
}