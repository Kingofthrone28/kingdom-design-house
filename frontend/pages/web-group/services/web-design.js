import React from 'react';
import Head from 'next/head';
import Layout from '../../../components/Layout';
import GroupHero from '../../../components/GroupHero';
import GroupHeading from '../../../components/Molecules/GroupHeading';
import ServiceContent from '../../../components/Organisms/ServiceContent';  
import ProcessSteps from '../../../components/ProcessSteps';
import ChatJarvis from '../../../components/ChatJarvis';
import WhyChooseUs from '../../../components/WhyChooseUs';

export default function WebDesign() {
  return (
    <>
      <Head>
        <title>Web Design Services - The Web Group | Kingdom Design House</title>
        <meta name="description" content="Professional web design services by The Web Group. Custom website design, UI/UX, responsive layouts, and modern design solutions." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Layout>
        <GroupHero groupName="webdesign" />
        <GroupHeading groupName="webdesign" />
        <ServiceContent serviceType="web-design" />
        <ProcessSteps />
        <ChatJarvis />
        <WhyChooseUs />
      </Layout>
    </>
  );
}