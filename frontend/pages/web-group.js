import React from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import GroupHero from '../components/GroupHero';
import GroupHeading from '../components/Molecules/GroupHeading';
import WebStrategy from '../components/Organisms/WebStrategy';
import ProcessSteps from '../components/ProcessSteps';
import ChatJarvis from '../components/ChatJarvis';
import WhyChooseUs from '../components/WhyChooseUs';

export default function WebGroup() {
  return (
    <>
      <Head>
        <title>The Web Group - Kingdom Design House</title>
        <meta name="description" content="Professional web development, design, and SEO optimization services. The Web Group specializes in creating scalable web applications and digital solutions." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Layout>
        <GroupHero groupName="webgroup" />
        <GroupHeading groupName="webgroup" />
        <ProcessSteps />
        <WebStrategy />
        <WhyChooseUs />
        <ChatJarvis />
      </Layout>
    </>
  );
}