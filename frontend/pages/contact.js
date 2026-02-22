import React from 'react';
import Layout from '../components/Layout';
import SEOHead from '../components/SEOHead';
import StructuredData from '../components/StructuredData';
import ContactForm from '../components/ContactForm';
import ChatJarvis from '../components/ChatJarvis';

export default function Contact() {
  const seoData = {
    title: "Contact Us | Get Your Free Consultation | Kingdom Design House",
    description: "Ready to start your project? Contact Kingdom Design House for a free consultation. Web development, IT services, and AI solutions in Long Island, NY. Call 347.927.8846",
    keywords: "contact us, free consultation, web development consultation, IT services Long Island, AI solutions consultation",
    canonical: "/contact/",
    ogTitle: "Contact Us | Kingdom Design House",
    ogDescription: "Ready to start your project? Contact Kingdom Design House for a free consultation. Web development, IT services, and AI solutions in Long Island, NY.",
  };

  return (
    <>
      <SEOHead {...seoData} />
      <StructuredData />
      
      <Layout>
        <ContactForm />
        <ChatJarvis />
      </Layout>
    </>
  );
}
