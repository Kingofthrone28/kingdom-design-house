import React from 'react';
import Head from 'next/head';
import Layout from '../../../components/Layout';
import GroupHero from '../../../components/GroupHero';
import GroupHeading from '../../../components/Molecules/GroupHeading';
import ProcessSteps from '../../../components/ProcessSteps';
import ChatJarvis from '../../../components/ChatJarvis';
import WhyChooseUs from '../../../components/WhyChooseUs';

export default function DigitalMarketing() {
  return (
    <>
      <Head>
        <title>Digital Marketing Services - The Web Group | Kingdom Design House</title>
        <meta name="description" content="Digital marketing services by The Web Group. SEO optimization, social media marketing, content strategy, and online advertising solutions." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Layout>
        <GroupHero groupName="digitalmarketing" />
        <GroupHeading groupName="digitalmarketing" />
        <ProcessSteps />
        <ChatJarvis />
        <WhyChooseUs />
      </Layout>
    </>
  );
}