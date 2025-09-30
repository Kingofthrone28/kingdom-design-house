import React from 'react';
import Head from 'next/head';
import Layout from '../../../components/Layout';
import GroupHero from '../../../components/GroupHero';
import GroupHeading from '../../../components/Molecules/GroupHeading';
import ServiceContent from '../../../components/Organisms/ServiceContent';
import ProcessSteps from '../../../components/ProcessSteps';
import ChatJarvis from '../../../components/ChatJarvis';
import WhyChooseUs from '../../../components/WhyChooseUs';

export default function WebDevelopment() {
  return (
    <>
      <Head>
        <title>Web Development Services - The Web Group | Kingdom Design House</title>
        <meta name="description" content="Professional web development services by The Web Group. Custom web applications, e-commerce solutions, and scalable web development." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Layout>
        <GroupHero groupName="webdevelopment" />
        <GroupHeading groupName="webdevelopment" />
        <ServiceContent serviceType="web-development" />
        <ProcessSteps />
        <ChatJarvis />
        <WhyChooseUs />
      </Layout>
    </>
  );
}