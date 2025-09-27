import React from 'react';
import Head from 'next/head';
import Layout from '../../../components/Layout';
import GroupHero from '../../../components/GroupHero';
import OurGroups from '../../../components/OurGroups';
import ProcessSteps from '../../../components/ProcessSteps';
import ChatJarvis from '../../../components/ChatJarvis';
import WhyChooseUs from '../../../components/WhyChooseUs';

export default function NetworkGroupDigitalMarketing() {
  return (
    <>
      <Head>
        <title>Digital Marketing Services - The Network Group | Kingdom Design House</title>
        <meta name="description" content="Digital marketing services by The Network Group. IT-focused marketing strategies, technical SEO, and network-optimized digital campaigns." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Layout>
        <GroupHero groupName="networkgroup" />
        <OurGroups />
        <ProcessSteps />
        <ChatJarvis />
        <WhyChooseUs />
      </Layout>
    </>
  );
}