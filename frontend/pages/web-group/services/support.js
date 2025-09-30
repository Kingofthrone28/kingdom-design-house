import React from 'react';
import Head from 'next/head';
import Layout from '../../../components/Layout';
import GroupHero from '../../../components/GroupHero';
import GroupHeading from '../../../componen ts/Molecules/GroupHeading';
import ProcessSteps from '../../../components/ProcessSteps';
import ChatJarvis from '../../../components/ChatJarvis';
import WhyChooseUs from '../../../components/WhyChooseUs';

export default function Support() {
  return (
    <>
      <Head>
        <title>Web Support Services - The Web Group | Kingdom Design House</title>
        <meta name="description" content="Web support and maintenance services by The Web Group. 24/7 website monitoring, updates, security, and technical support." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Layout>
        <GroupHero groupName="websupport" />
        <GroupHeading groupName="websupport" />
        {/* <ServiceContent serviceType="web-support" /> */}
        <ProcessSteps />
        <ChatJarvis />
        <WhyChooseUs />
      </Layout>
    </>
  );
}