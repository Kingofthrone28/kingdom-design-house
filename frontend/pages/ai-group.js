import React from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import GroupHero from '../components/GroupHero';
import GroupHeading from '../components/Molecules/GroupHeading';
import OurGroups from '../components/OurGroups';
import ProcessSteps from '../components/ProcessSteps';
import ChatJarvis from '../components/ChatJarvis';
import WhyChooseUs from '../components/WhyChooseUs';

export default function AIGroup() {
  return (
    <>
      <Head>
        <title>The AI Group - Kingdom Design House</title>
        <meta name="description" content="AI Integration and Tools. The AI Group specializes in implementing cutting-edge AI-driven solutions and automation tools." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Layout>
        <GroupHero groupName="aigroup" />
        <GroupHeading groupName="aigroup" />
        <ProcessSteps />
        <ChatJarvis />
        <WhyChooseUs />
      </Layout>
    </>
  );
}