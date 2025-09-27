import React from 'react';
import Head from 'next/head';
import Layout from '../../../components/Layout';
import GroupHero from '../../../components/GroupHero';
import OurGroups from '../../../components/OurGroups';
import ProcessSteps from '../../../components/ProcessSteps';
import ChatJarvis from '../../../components/ChatJarvis';
import WhyChooseUs from '../../../components/WhyChooseUs';

export default function AIGroupWebDesign() {
  return (
    <>
      <Head>
        <title>AI-Powered Web Design - The AI Group | Kingdom Design House</title>
        <meta name="description" content="AI-powered web design services by The AI Group. Intelligent design automation, AI-driven UX, and smart web interface solutions." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Layout>
        <GroupHero groupName="aigroup" />
        <OurGroups />
        <ProcessSteps />
        <ChatJarvis />
        <WhyChooseUs />
      </Layout>
    </>
  );
}