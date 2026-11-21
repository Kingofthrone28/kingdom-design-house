import React from 'react';
import Layout from '../components/Layout';
import SEOHead from '../components/SEOHead';
import StructuredData from '../components/StructuredData';
import ContactForm from '../components/ContactForm';

export default function Contact() {
  const seoData = {
    title: "Contact Us | Get Your Free Consultation | Kingdom Design House",
    description: "Ready to start your project? Contact Kingdom Design House for a free consultation. Based in Freeport, serving Long Island and NYC with remote delivery.",
    keywords: "contact us, free consultation, web development consultation, IT services Long Island, AI solutions consultation",
    canonical: "/contact/",
    ogTitle: "Contact Us | Kingdom Design House",
    ogDescription: "Ready to start your project? Contact Kingdom Design House for a free consultation. Websites, business applications, and AI automation. Based in Freeport, serving Long Island and NYC.",
  };

  return (
    <>
      <SEOHead {...seoData} />
      <StructuredData page={{ url: seoData.canonical, name: seoData.title, description: seoData.description }} />
      
      <Layout>
        <ContactForm />
      </Layout>
    </>
  );
}
