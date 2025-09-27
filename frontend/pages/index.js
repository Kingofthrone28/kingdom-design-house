import React from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import Hero from '../components/Hero';
import OurGroups from '../components/OurGroups';
import ProcessSteps from '../components/ProcessSteps';
import ChatJarvis from '../components/ChatJarvis';
import WhyChooseUs from '../components/WhyChooseUs';

export default function Home() {
  return (
    <>
      <Head>
        <title>Kingdom Design House - Your All-In-One Partner for Web Development, IT, Networking & AI Solutions</title>
        <meta name="description" content="We solve business problems so you don't have to. Professional web development, IT services, networking, and AI solutions." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Layout>
        <Hero />
        <OurGroups />
        <ProcessSteps />
        <ChatJarvis />
        <WhyChooseUs />
      </Layout>
    </>
  );
}