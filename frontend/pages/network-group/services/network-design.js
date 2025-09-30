import React from 'react';
import Head from 'next/head';
import Layout from '../../../components/Layout';
import GroupHero from '../../../components/GroupHero';
import OurGroups from '../../../components/OurGroups';
import ProcessSteps from '../../../components/ProcessSteps';
import ChatJarvis from '../../../components/ChatJarvis';
import WhyChooseUs from '../../../components/WhyChooseUs';

export default function NetworkDesign() {
  return (
    <>
      <Head>
        <title>Network Design Services - The Network Group | Kingdom Design House</title>
        <meta name="description" content="Network design services by The Network Group. IT-focused web design solutions, network-compatible designs, and technical web interfaces." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Layout>
        <GroupHero groupName="networkgroup" />
        <GroupHeading groupName="networkgroup" />
        <ServiceContent serviceType="network-design" />
        <ProcessSteps />
        <ChatJarvis />
        <WhyChooseUs />
      </Layout>
    </>
  );
}