import React from 'react';
import Head from 'next/head';
import Layout from '../../../components/Layout';
import GroupHero from '../../../components/GroupHero';
import GroupHeading from '../../../components/Molecules/GroupHeading';
import ServiceContent from '../../../components/Organisms/ServiceContent';
import ProcessSteps from '../../../components/ProcessSteps';
import ChatJarvis from '../../../components/ChatJarvis';
import WhyChooseUs from '../../../components/WhyChooseUs';

export default function AISupport() {
  return (
    <>
      <Head>
        <title>AI Support Services - The AI Group | Kingdom Design House</title>
        <meta name="description" content="AI support and maintenance services by The AI Group. Intelligent monitoring, AI-powered troubleshooting, and smart automation support." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Layout>
        <GroupHero groupName="aigroup" />
        <GroupHeading groupName="aigroup" />
        <ServiceContent serviceType="ai-support" />
        <ProcessSteps />
        <ChatJarvis />
        <WhyChooseUs />
      </Layout>
    </>
  );
}