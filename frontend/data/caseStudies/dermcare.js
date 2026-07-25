import { createEditorialCaseStudy } from './factory';

export const dermCareData = createEditorialCaseStudy({
  seo: {
    title: 'DermCare Management Case Study | Kingdom Design House',
    description: 'Explore how Kingdom Design House delivered a comprehensive web solution for DermCare Management, including web design, development, and branding.',
    canonical: '/case-studies/dermcare/',
    keywords: 'case study, web design, development, dermatology, healthcare, DermCare',
    ogImage: '/images/dermcare.png'
  },
  client: 'DermCare|Management',
  industry: 'Healthcare · Dermatology',
  services: 'Brand · UX/UI · Development',
  focus: 'Physician support · Growth',
  heroCopy: 'A scalable digital foundation that helps dermatologists find the support they need at every stage of their careers.',
  overview: 'DermCare Management provides operational and administrative support for dermatologists, from residency and fellowship through active practice and retirement transitions. The redesigned experience clarifies that broad value while helping physicians quickly find resources aligned with their career stage.',
  video: { src: '/videos/darmcare.mp4', poster: '/images/dermcare.png' },
  objectives: 'Modernize DermCare’s digital presence, simplify navigation, highlight key services, improve mobile performance, and build a scalable foundation for future growth.',
  challenges: 'Outdated layouts, inconsistent branding, difficult navigation, and technical limitations prevented the previous experience from communicating the breadth of DermCare’s offering.',
  solutions: 'A complete redesign introduced intuitive navigation, career-focused content, responsive page templates, stronger brand storytelling, and a modular CMS-friendly framework.',
  features: ['Career-stage content pathways', 'Modular CMS architecture', 'Responsive performance'],
  image: { src: '/images/dermcare.png', alt: 'DermCare Management responsive website' }
});
