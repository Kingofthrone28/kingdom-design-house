import React from 'react';
import Head from 'next/head';
import Layout from '../../../components/Layout';
import GroupHero from '../../../components/GroupHero';
import GroupHeading from '../../../components/Molecules/GroupHeading';
import ServiceContent from '../../../components/Organisms/ServiceContent';
import ProcessSteps from '../../../components/ProcessSteps';
import ChatJarvis from '../../../components/ChatJarvis';
import WhyChooseUs from '../../../components/WhyChooseUs';

export default function AIDevelopment() {
  return (
    <>
      <Head>
        <title>AI-Powered Development - The AI Group | Kingdom Design House</title>
        <meta name="description" content="AI-powered digital marketing services by The AI Group. Intelligent marketing automation, AI-driven campaigns, and smart analytics solutions." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Layout>
        <GroupHero groupName="aigroup" />
        <GroupHeading groupName="aigroup" />
        <ServiceContent serviceType="ai-development" />
        <ProcessSteps />
        <ChatJarvis />
        <WhyChooseUs />
      </Layout>
    </>
  );
}