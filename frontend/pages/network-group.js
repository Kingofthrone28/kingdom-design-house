import React from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import GroupHero from '../components/GroupHero';
import GroupHeading from '../components/Molecules/GroupHeading';
import ProcessSteps from '../components/ProcessSteps';  
import ServiceContent from '../components/Organisms/ServiceContent';
import ChatJarvis from '../components/ChatJarvis';
import WhyChooseUs from '../components/WhyChooseUs';

export default function NetworkGroup() {
  return (
    <>
      <Head>
        <title>The Network Group - Kingdom Design House</title>
        <meta name="description" content="Information Technology and Networking solutions. The Network Group provides IT services, network infrastructure, and technical support." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Layout>
        <GroupHero groupName="networkgroup" />
        <GroupHeading groupName="networkgroup" />
        <ServiceContent serviceType="network-design" layout="2-column" />
        <ProcessSteps />
        <ChatJarvis />
        <WhyChooseUs />
      </Layout>
    </>
  );
}