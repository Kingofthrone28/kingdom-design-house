import React from 'react';
import Head from 'next/head';
import Layout from '../../../components/Layout';
import GroupHero from '../../../components/GroupHero';
import OurGroups from '../../../components/OurGroups';
import ProcessSteps from '../../../components/ProcessSteps';
import ChatJarvis from '../../../components/ChatJarvis';
import WhyChooseUs from '../../../components/WhyChooseUs';

export default function AIGroup() {
  return (
    <>
      <Head>
        <title>AI-Powered Web Development - The AI Group | Kingdom Design House</title>
        <meta name="description" content="AI-powered web development services by The AI Group. Intelligent web applications, AI integration, and smart automation solutions." />
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