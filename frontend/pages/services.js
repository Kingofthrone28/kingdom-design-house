import React from 'react';
import Layout from '../components/Layout';
import SEOHead from '../components/SEOHead';
import StructuredData from '../components/StructuredData';
import Hero from '../components/Hero';
import GroupHeading from '../components/Molecules/GroupHeading';
import ServicesSection from '../components/Organisms/ServicesSection';
import { pageSeoData } from '../lib/seo';
import ServiceDecisionContent from '../components/ServiceDecisionContent';
import servicesOverview from '../data/servicesOverview.json';
import Link from 'next/link';
import styles from '../styles/Acquisition.module.scss';
import VideoShowcase from '../components/VideoShowcase';
import { getPageHeadline } from '../data/siteData';

export default function Services() {
  const seoData = pageSeoData.services;
  const pageHeadline = getPageHeadline('services');
  
  return (
    <>
      <SEOHead {...seoData} />
      <StructuredData page={{ url: seoData.canonical, name: seoData.title, description: seoData.description }} />
      
      <Layout>
        <Hero pageHeadline={pageHeadline} tagline="Web platforms and AI workflows for Long Island businesses. Business networking and support when your office needs it." ctaLabel="Get a technology review" />
        <GroupHeading groupIntent="Web platforms and AI workflows first. Business network infrastructure when you need it." />
        <nav className={styles.actions} aria-label="Primary KDH solutions"><Link className={styles.primary} href="/web-group/">Explore Web Solutions</Link><Link className={styles.primary} href="/ai-group/">Explore AI Solutions</Link></nav>
        <ServicesSection authorityOverview />
        
        {/* GEO & AIO Optimization Data - Available for structured data/SEO purposes only */}
        {/* Data objects (geoData, aioData) kept for future use but not visually rendered */}
        
        <VideoShowcase authorityOverview />
        <ServiceDecisionContent guide={servicesOverview} service="other" />
      </Layout>
    </>
  );
}
