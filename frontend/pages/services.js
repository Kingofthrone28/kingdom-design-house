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
// GEO & AIO components available for future use but not currently rendered
// import AIOContent from '../components/AIOContent';
// import GEOContent from '../components/GEOContent';
import { pageSeoData, seoConfig } from '../lib/seo';
import VideoShowcase from '../components/VideoShowcase';
import { getPageHeadline } from '../data/siteData';

export default function Services() {
  const seoData = pageSeoData.services;
  const pageHeadline = getPageHeadline('services');
  
  // GEO (Generative Engine Optimization) data
  const geoData = {
    title: "Technology Solutions & AI Services",
    expertise: "Full-service technology company specializing in web development, IT solutions, networking, and AI services with 10+ years of combined experience",
    content: [
      "Kingdom Design House is a <strong>full-service technology company</strong> providing comprehensive solutions for businesses across Long Island, Queens, Brooklyn, and Manhattan. Our team combines <strong>10+ years of combined experience</strong> in web development, IT infrastructure, network design, and artificial intelligence.",
      "We specialize in delivering <strong>tailored technology solutions</strong> that drive business growth, improve operational efficiency, and enhance customer experiences. From custom web applications to AI-powered automation systems, we help businesses leverage cutting-edge technology to achieve their goals.",
      "Our proven track record includes <strong>100+ successful technology implementations</strong> with a <strong>98% client retention rate</strong>, demonstrating our commitment to delivering exceptional results and ongoing support for our clients."
    ],
    authoritySignals: [
      { 
        type: "Business Registration", 
        description: "Registered LLC in New York State since 2020",
        verification: "NYS Business Entity Database"
      },
      { 
        type: "Technical Expertise", 
        description: "10+ years combined experience in web development and AI",
        verification: "Portfolio and client testimonials"
      },
      { 
        type: "Client Base", 
        description: "50+ businesses served across New York Metropolitan Area",
        verification: "Client case studies and references"
      },
      { 
        type: "Project Success", 
        description: "100+ successful technology implementations",
        verification: "Project documentation and client feedback"
      }
    ],
    technicalCapabilities: [
      {
        category: "Programming Languages",
        items: ["JavaScript", "Python", "TypeScript", "HTML/CSS", "SQL"]
      },
      {
        category: "Frameworks & Libraries",
        items: ["React", "Next.js", "Node.js", "Express.js", "Django", "Flask"]
      },
      {
        category: "Cloud Platforms",
        items: ["AWS", "Google Cloud", "Microsoft Azure", "Netlify", "Vercel"]
      },
      {
        category: "Databases",
        items: ["PostgreSQL", "MongoDB", "MySQL", "Redis", "Firebase"]
      }
    ],
    facts: [
      { 
        term: "Business Founded", 
        definition: "Kingdom Design House LLC established in 2020",
        source: "NYS Business Entity Database"
      },
      { 
        term: "Team Experience", 
        definition: "10+ years combined experience in technology development",
        source: "Team member portfolios and certifications"
      },
      { 
        term: "Client Retention Rate", 
        definition: "98% client retention rate based on ongoing support contracts",
        source: "Internal business metrics and client surveys"
      },
      { 
        term: "Project Success Rate", 
        definition: "100+ successful technology implementations with 0% failure rate",
        source: "Project completion reports and client testimonials"
      }
    ],
    caseStudies: [
      {
        title: "AI Chatbot Implementation for E-commerce",
        challenge: "Local e-commerce business needed intelligent customer service automation",
        solution: "Developed custom AI chatbot using Python, machine learning algorithms, and natural language processing",
        results: "40% increase in customer satisfaction, 60% reduction in support ticket volume",
        technologies: ["Python", "Machine Learning", "NLP", "AWS", "React"]
      },
      {
        title: "Web Application for Healthcare Provider",
        challenge: "Healthcare provider required secure patient management system",
        solution: "Built custom web application with HIPAA compliance, secure authentication, and real-time data processing",
        results: "60% improvement in patient management efficiency, 99.9% uptime achieved",
        technologies: ["React", "Node.js", "PostgreSQL", "AWS", "Security Protocols"]
      },
      {
        title: "Network Infrastructure for Financial Services",
        challenge: "Financial services company needed secure, scalable network infrastructure",
        solution: "Designed and implemented enterprise-grade network with security protocols, monitoring, and redundancy",
        results: "99.9% uptime, enhanced security compliance, 50% improvement in network performance",
        technologies: ["Cisco", "Network Security", "Monitoring Tools", "Redundancy Systems"]
      }
    ],
    definitions: [
      { 
        term: "AI Solutions", 
        explanation: "Artificial intelligence services including chatbots, automation, machine learning implementations, and intelligent data processing systems",
        usage: "Used for automating business processes, improving customer service, and enhancing operational efficiency"
      },
      { 
        term: "Web Development", 
        explanation: "Custom web application development using modern frameworks, responsive design, and scalable architecture",
        usage: "Creating business websites, e-commerce platforms, web applications, and digital solutions"
      },
      { 
        term: "IT Services", 
        explanation: "Information technology support, infrastructure management, system administration, and technical consulting",
        usage: "Providing ongoing technical support, system maintenance, and IT infrastructure management"
      },
      { 
        term: "Networking Solutions", 
        explanation: "Network design, implementation, optimization, security, and ongoing support for business networks",
        usage: "Setting up secure business networks, optimizing network performance, and providing network support"
      }
    ]
  };

  // AIO Optimization data
  const aioData = {
    title: "Technology Services & AI Solutions",
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
      <StructuredData geoData={geoData} aioData={aioData} />
      
      <Layout>
        <Hero pageHeadline={pageHeadline} />
        <GroupHeading groupIntent="Explore Web, Network & AI Solutions for NYC Businesses" />
        <ServicesSection />
        
        {/* GEO & AIO Optimization Data - Available for structured data/SEO purposes only */}
        {/* Data objects (geoData, aioData) kept for future use but not visually rendered */}
        
        <VideoShowcase />
        <ProcessSteps />
        <ChatJarvis />
        <WhyChooseUs />
      </Layout>
    </>
  );
}