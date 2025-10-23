import React from 'react';
import Layout from '../components/Layout';
import SEOHead from '../components/SEOHead';
import StructuredData from '../components/StructuredData';
import Hero from '../components/Hero';
import GroupHeading from '../components/Molecules/GroupHeading';
import ServicesSection from '../components/Organisms/ServicesSection';
import ProcessSteps from '../components/ProcessSteps';
import ChatJarvis from '../components/ChatJarvis';
import WhyChooseUs from '../components/WhyChooseUs';
import AIOContent from '../components/AIOContent';
import GEOContent from '../components/GEOContent';
import { pageSeoData, seoConfig } from '../lib/seo';
import VideoShowcase from '../components/VideoShowcase';
export default function Services() {
  const seoData = pageSeoData.services;
  
  // GEO Optimization data
  const geoData = {
    primaryLocation: {
      name: "Long Island, New York",
      address: "Long Island, NY 11501",
      coordinates: {
        latitude: "40.7891",
        longitude: "-73.1347"
      },
      region: "Northeast United States"
    },
    serviceAreas: [
      { name: "Queens, NY", type: "Borough", distance: "15 miles" },
      { name: "Brooklyn, NY", type: "Borough", distance: "20 miles" },
      { name: "Manhattan, NY", type: "Borough", distance: "25 miles" },
      { name: "Nassau County, NY", type: "County", distance: "5 miles" },
      { name: "Suffolk County, NY", type: "County", distance: "30 miles" }
    ],
    businessFacts: [
      { label: "Founded", value: "2020" },
      { label: "Experience", value: "10+ years in technology" },
      { label: "Clients Served", value: "50+ local businesses" },
      { label: "Projects Completed", value: "100+ successful implementations" },
      { label: "Service Area", value: "New York Metropolitan Area" }
    ],
    localSignals: [
      { 
        type: "Local Business Registration", 
        description: "Registered business in New York State",
        verification: "NYS Business Entity Database"
      },
      { 
        type: "Local Phone Number", 
        description: "347.927.8846 - Long Island area code",
        verification: "NANPA Number Administration"
      },
      { 
        type: "Service Area Coverage", 
        description: "Serves all 5 NYC boroughs and Long Island",
        verification: "Geographic service mapping"
      }
    ]
  };

  // AIO Optimization data
  const aioData = {
    title: "Technology Services & AI Solutions",
    content: "Kingdom Design House provides comprehensive technology services including web development, IT solutions, networking, and AI services. We serve businesses across Long Island, Queens, Brooklyn, and Manhattan with professional technology solutions.",
    facts: [
      { label: "Years in Business", value: "4+ years" },
      { label: "Team Experience", value: "10+ years combined" },
      { label: "Technologies Mastered", value: "15+ programming languages and frameworks" },
      { label: "AI Projects", value: "20+ AI implementations" },
      { label: "Client Satisfaction", value: "98% client retention rate" }
    ],
    technologies: [
      { name: "React", description: "Modern web development framework" },
      { name: "Node.js", description: "Server-side JavaScript runtime" },
      { name: "Python", description: "AI and machine learning development" },
      { name: "AWS", description: "Cloud computing and infrastructure" },
      { name: "AI/ML", description: "Artificial intelligence and machine learning" }
    ],
    services: [
      { name: "Web Development", description: "Custom web applications and responsive websites" },
      { name: "IT Services", description: "Information technology support and infrastructure management" },
      { name: "Networking Solutions", description: "Network design, optimization, and support services" },
      { name: "AI Solutions", description: "Artificial intelligence consulting, development, and support" }
    ],
    definitions: [
      { term: "AI Solutions", definition: "Artificial intelligence services including chatbots, automation, and machine learning implementations" },
      { term: "Web Development", definition: "Custom web application development using modern frameworks and technologies" },
      { term: "IT Services", definition: "Information technology support, maintenance, and infrastructure management" },
      { term: "Networking", definition: "Network design, implementation, optimization, and ongoing support services" }
    ],
    examples: [
      { title: "AI Chatbot Implementation", description: "Developed intelligent customer service chatbot for local e-commerce business, increasing customer satisfaction by 40%" },
      { title: "Web Application Development", description: "Built custom web application for healthcare provider, improving patient management efficiency by 60%" },
      { title: "Network Infrastructure Setup", description: "Designed and implemented secure network infrastructure for financial services company, ensuring 99.9% uptime" }
    ]
  };
  
  return (
    <>
      <SEOHead {...seoData} />
      <StructuredData />
      
      <Layout>
        <Hero />
        <GroupHeading/>
        <ServicesSection />
        
        {/* GEO Optimization Content */}
        <GEOContent {...geoData} />
        
        {/* AIO Optimization Content */}
        <AIOContent {...aioData} />
        
        <VideoShowcase />
        <ProcessSteps />
        <ChatJarvis />
        <WhyChooseUs />
      </Layout>
    </>
  );
}