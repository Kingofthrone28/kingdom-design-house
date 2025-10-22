import React from 'react';
import Layout from '../components/Layout';
import SEOHead from '../components/SEOHead';
import StructuredData from '../components/StructuredData';
import Hero from '../components/Hero';
import GroupHeading from '../components/Molecules/GroupHeading';
import ServicesSection from '../components/Organisms/ServicesSection';
import ProcessSteps from '../components/ProcessSteps';
import ChatJarvis from '../components/ChatJarvis';
import WhyChooseUs from '../components/WhyChooseUs';
import { pageSeoData } from '../lib/seo';
import VideoShowcase from '../components/VideoShowcase';
export default function Services() {
  const seoData = pageSeoData.services;
  
  return (
    <>
      <SEOHead {...seoData} />
      <StructuredData />
      
      <Layout>
        <Hero />
        <GroupHeading/>
        <ServicesSection />
        <VideoShowcase />
        <ProcessSteps />
        <ChatJarvis />
        <WhyChooseUs />
      </Layout>
    </>
  );
}