import React from 'react';
import Layout from '../../components/Layout';
import SEOHead from '../../components/SEOHead';
import CaseStudies from '../../components/Organisms/CaseStudies';
import ChatJarvis from '../../components/ChatJarvis';

// Case study data for DermCare
const dermcareCaseStudyData = {
  overview: {
    title: 'Overview',
    text: `
      <p><b>DermCare Management</b> delivers comprehensive support for dermatologists at every stage of their career. From residency and fellowship assistance for emerging physicians to transition planning for those nearing retirement, we meet clinicians where they are and help them move toward their goals. For actively practicing partners, we provide the operational and administrative backing that lets dermatologists focus on exceptional patient care. Our team-based philosophy ensures practices have the tools they need to grow while maintaining the high-quality care that defines their success.</p>
    `,
    imageSrc: '/images/derm_logo.png',
    imageAlt: 'DermCare Management Logo'
  },
  projectOverview: {
    title: 'Project Overview',
    industry: 'Health Care | Dermatology',
    services: 'Web Design, UX/UI Design, Development, Creative Direction, Branding, SEO, Content Strategy',
    imageSrc: '/images/dermcare.png',
    imageAlt: 'DermCare Management Website Responsive Design'
  },
  letsTalk: {
    question: 'Want to collaborate on a Project?',
    heading: "Let's Talk"
  },
  video: {
    src: '/videos/darmcare.mp4',
    autoplay: true,
    loop: true,
    muted: true,
    controls: true,
    showOverlay: true,
    showLoading: true
  },
  threeStep: {
    steps: [
      {
        title: 'Objectives',
        text: `
          <p>The primary goal of the web project was to modernize DermCare’s digital presence and create a user-focused experience that reflects the organization’s professionalism and growth. We aimed to simplify navigation, highlight key services, and clearly communicate DermCare’s value to physicians at every career stage. Additional objectives included improving content structure, enhancing mobile performance, and building a scalable foundation for future expansion</p>
        `
      },
      {
        title: 'Challenges',
        text: `
          <p>The previous site presented several obstacles, including outdated layouts, inconsistent branding, and content that did not effectively communicate the full breadth of DermCare’s offerings. Users had difficulty finding the information they needed, and the site architecture limited opportunities for growth. Technical limitations also affected page speed, accessibility, and the ability to easily update content within the CMS.</p>
        `
      },
      {
        title: 'Solutions',
        text: `
          <p>We implemented a complete site redesign with a cleaner interface, intuitive navigation, and a reorganized content structure tailored to physician needs. The build includes mobile-optimized layouts, streamlined page templates, and enhanced performance across all devices. Updated branding elements and strategic messaging were integrated to strengthen DermCare’s story. The new site was developed with a modular, CMS-friendly framework, enabling fast updates, improved scalability, and a more engaging digital experience overall.</p>
        `
      }
    ]
  }
};

// SEO data for the case study page
const caseStudySeoData = {
  title: 'DermCare Management Case Study | Kingdom Design House',
  description: 'Explore how Kingdom Design House delivered a comprehensive web solution for DermCare Management, including web design, development, and branding.',
  canonical: '/case-studies/dermcare/',
  keywords: 'case study, web design, development, dermatology, healthcare, DermCare',
  ogImage: '/images/dermcare.png'
};

export default function DermCareCaseStudy() {
  return (
    <>
      <SEOHead {...caseStudySeoData} />
      
      <Layout>
        <CaseStudies caseStudyData={dermcareCaseStudyData} />
        <ChatJarvis />
      </Layout>
    </>
  );
}
