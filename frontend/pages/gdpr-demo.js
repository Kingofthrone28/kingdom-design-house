/**
 * @fileoverview GDPR Demo Page
 * 
 * This page demonstrates the GDPR compliance system functionality.
 * It shows how to integrate and use the GDPR components in your application.
 * 
 * @author Kingdom Design House Development Team
 * @version 1.0.0
 * @since 2024
 */

import React from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import GDPRExample from '../components/GDPRExample';

const GDPRDemoPage = () => {
  return (
    <>
      <Head>
        <title>GDPR Compliance Demo - Kingdom Design House</title>
        <meta name="description" content="Demonstration of GDPR compliance features including cookie consent, privacy controls, and data rights management." />
        <meta name="keywords" content="GDPR, compliance, privacy, cookies, data protection, Kingdom Design House" />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph tags */}
        <meta property="og:title" content="GDPR Compliance Demo - Kingdom Design House" />
        <meta property="og:description" content="Demonstration of GDPR compliance features including cookie consent, privacy controls, and data rights management." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://kingdomdesignhouse.com/gdpr-demo" />
        <meta property="og:image" content="https://kingdomdesignhouse.com/images/gdpr-demo-og.jpg" />
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="GDPR Compliance Demo - Kingdom Design House" />
        <meta name="twitter:description" content="Demonstration of GDPR compliance features including cookie consent, privacy controls, and data rights management." />
        <meta name="twitter:image" content="https://kingdomdesignhouse.com/images/gdpr-demo-twitter.jpg" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://kingdomdesignhouse.com/gdpr-demo" />
      </Head>

      <Layout>
        <div style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
          <GDPRExample />
        </div>
      </Layout>
    </>
  );
};

export default GDPRDemoPage;
