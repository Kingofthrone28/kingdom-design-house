import React from 'react';
import Layout from '../components/Layout';
import SEOHead from '../components/SEOHead';
import StructuredData from '../components/StructuredData';
import Hero from '../components/Hero';
import OurGroups from '../components/OurGroups';
import ServicesSection from '../components/Organisms/ServicesSection';
import ProcessSteps from '../components/ProcessSteps';
import ChatJarvis from '../components/ChatJarvis';
import WhyChooseUs from '../components/WhyChooseUs';
import { pageSeoData } from '../lib/seo';
import { getPageHeadline } from '../data/siteData';
import VideoShowcase from '../components/VideoShowcase';
export default function Home() {
  const seoData = pageSeoData.home;
  
  return (
    <>
      <SEOHead {...seoData} />
      <StructuredData page={{ url: seoData.canonical, name: seoData.title, description: seoData.description }} />
      
      <Layout>
        <Hero pageHeadline={getPageHeadline('home')} />
        <OurGroups groupIntent="Web, AI & IT Services in Long Island NY" />
        <ServicesSection />
        <VideoShowcase />
        <ProcessSteps />
        <ChatJarvis />
        <WhyChooseUs />
      </Layout>
    </>
  );
}