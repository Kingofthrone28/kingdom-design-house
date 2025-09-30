import React from 'react';
import Head from 'next/head';
import Layout from '../../../components/Layout';
import GroupHero from '../../../components/GroupHero';
import GroupHeading from '../../../components/Molecules/GroupHeading';
import ServiceContent from '../../../components/Organisms/ServiceContent';
import ProcessSteps from '../../../components/ProcessSteps';
import ChatJarvis from '../../../components/ChatJarvis';
import WhyChooseUs from '../../../components/WhyChooseUs';

export default function NetworkSupport() {
  return (
    <>
      <Head>
        <title>IT Support Services - The Network Group | Kingdom Design House</title>
        <meta name="description" content="IT support and network services by The Network Group. 24/7 technical support, network maintenance, and IT infrastructure management." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Layout>
        <GroupHero groupName="networkgroup" />
        <GroupHeading groupName="networkgroup" />
        <ServiceContent serviceType="network-support" />
        <ProcessSteps />
        <ChatJarvis />
        <WhyChooseUs />
      </Layout>
    </>
  );
}