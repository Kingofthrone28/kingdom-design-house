import React from 'react';
import Layout from '../components/Layout';
import SEOHead from '../components/SEOHead';
import StructuredData from '../components/StructuredData';
import PricingSection from '../components/Organisms/PricingSection';
import { pageSeoData } from '../lib/seo';

export default function Pricing() {
  const seoData = pageSeoData.pricing;

  return (
    <>
      <SEOHead {...seoData} />
      <StructuredData page={{ url: seoData.canonical, name: seoData.title, description: seoData.description }} />
      
      <Layout>
        <PricingSection />
      </Layout>
    </>
  );
}
