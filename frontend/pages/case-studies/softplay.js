import React from 'react';
import Layout from '../../components/Layout';
import SEOHead from '../../components/SEOHead';
import CaseStudies from '../../components/Organisms/CaseStudies';
import ChatJarvis from '../../components/ChatJarvis';

// Case study data for Long Island Soft Play
const SoftPlayCaseStudyData = {
  overview: {
    title: 'Overview',
    text: `
      <p>This project involved building a modern, user-friendly website for a Long Island luxury soft play rental company. The site showcases their customizable play packages, highlights their emphasis on safety, and provides an easy way for customers to explore offerings and book services. Designed to clearly communicate the brand’s value and simplify the rental process, the website brings their fun, child-focused experience to life in a clean and engaging digital format.</p>
    `,
    imageSrc: '/images/Li_softplay.png',
    imageAlt: 'Long Island Soft Play logo'
  },
  projectOverview: {
    title: 'Project Overview',
    industry: 'Kids Entertainment | Long Island',
    services: 'Web Design, UX/UI Design, Development, Creative Direction, Branding, SEO, Content Strategy',
    imageSrc: '/images/softplaylaptop.png',
    imageAlt: 'Long Island Soft Play website responsive design'
  },
  letsTalk: {
    question: 'Want to collaborate on a Project?',
    heading: "Let's Talk"
  },
  video: {
    src: '/videos/softplayli.mp4',
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
          <p>Create a modern, visually engaging website that effectively showcases the soft play rental services. The goal was to highlight customizable packages, communicate the brand’s emphasis on child safety, and provide an intuitive user experience that encourages bookings.</p>
        `
      },
      {
        title: 'Challenges',
        text: `
          <p>The previous site lacked structure and clarity, making it difficult for visitors to find information or understand the range of services. Content was not organized for easy navigation, and the design did not reflect the luxury and fun-oriented nature of the brand. Optimizing for mobile and ensuring a visually appealing, safe-feeling experience were also key challenges.</p>
        `
      },
      {
        title: 'Solutions',
        text: `
          <p>Redesigned the website with a clean, modern layout and intuitive navigation to highlight the soft play packages. Integrated clear calls-to-action to simplify bookings and showcased the brand’s safety-first approach through design and messaging. The site is fully responsive, visually appealing, and built to provide a smooth, engaging experience for visitors on any device</p>
        `
      }
    ]
  }
};

// SEO data for the case study page
const caseStudySeoData = {
  title: 'Long Island Soft Play Case Study | Kingdom Design House',
  description: 'Explore how Kingdom Design House designed and developed a modern web experience for Long Island Soft Play, built for clarity and conversions.',
  canonical: '/case-studies/softplay/',
  keywords: 'case study, web design, development, soft play, kids entertainment, Long Island',
  ogImage: '/images/softplaylaptop.png'
};

export default function SoftPlayCaseStudy() {
  return (
    <>
      <SEOHead {...caseStudySeoData} />
      
      <Layout>
        <CaseStudies caseStudyData={SoftPlayCaseStudyData} />
        <ChatJarvis />
      </Layout>
    </>
  );
}
