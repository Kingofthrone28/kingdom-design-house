import { createEditorialCaseStudy } from './factory';

export const dareMdData = createEditorialCaseStudy({
  seo: {
    title: 'David Dare MD Case Study | Kingdom Design House',
    description: 'Explore how Kingdom Design House created a responsive, patient-focused website for David Dare MD, an orthopedic and sports medicine practice.',
    canonical: '/case-studies/daremd/',
    keywords: 'case study, web design, development, orthopedics, sports medicine, healthcare, David Dare MD',
    ogImage: '/images/daremd.png'
  },
  client: 'David Dare|MD',
  industry: 'Orthopedics · Sports Medicine',
  services: 'Strategy · UX/UI · Development',
  focus: 'Patient education · Appointments',
  heroCopy: 'A modern, patient-focused digital experience that makes orthopedic expertise easier to understand and access.',
  overview: 'David Dare MD is an orthopedic and knee surgery practice helping patients understand treatment options and stay ahead of sports injuries. The website presents the practice’s clinical expertise through a clear experience, making it easier to learn about shoulder and knee care, review patient resources, and request an appointment.',
  video: { src: '/videos/daremd.mp4', poster: '/images/daremd_logo.jpg' },
  objectives: 'Create a trustworthy digital presence that communicates the practice’s orthopedic expertise and helps patients move confidently toward scheduling an appointment on any device.',
  challenges: 'Detailed clinical information needed to feel approachable while preserving professional credibility, clear service navigation, and prominent contact pathways.',
  solutions: 'A responsive, patient-centered website uses strong hierarchy, focused shoulder and knee pathways, and clear appointment calls-to-action to connect visitors with the right care.',
  features: ['Focused treatment pathways', 'Patient-friendly content hierarchy', 'Responsive appointment journeys'],
  image: { src: '/images/daremd.png', alt: 'Responsive David Dare MD orthopedic practice website' }
});
