import React from 'react';
import Layout from '../components/Layout';
import SEOHead from '../components/SEOHead';
import StructuredData from '../components/StructuredData';
import Hero from '../components/Hero';
import OurGroups from '../components/OurGroups';
import FeaturedProjects from '../components/Organisms/FeaturedProjects';
import ProcessSteps from '../components/ProcessSteps';
import PricingTeaser from '../components/Organisms/PricingTeaser';
import ContactForm from '../components/ContactForm';
import ChatJarvis from '../components/ChatJarvis';
import WhyChooseUs from '../components/WhyChooseUs';
import { pageSeoData } from '../lib/seo';
import { getPageHeadline } from '../data/siteData';
export default function Home() {
  const seoData = pageSeoData.home;
  
  return (
    <>
      <SEOHead {...seoData} />
      <StructuredData page={{ url: seoData.canonical, name: seoData.title, description: seoData.description }} />
      <Layout>
        <Hero pageHeadline={getPageHeadline('home')} />
        <ChatJarvis />
        <FeaturedProjects />
        <OurGroups />
        <ProcessSteps />
        <PricingTeaser />
        <ContactForm embedded />
      </Layout>
    </>
  );
}
