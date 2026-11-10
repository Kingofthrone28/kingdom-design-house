import { createEditorialCaseStudy } from './factory';

export const iinData = createEditorialCaseStudy({
  seo: {
    title: 'Institute for Integrative Nutrition Contributions | Kingdom Design House',
    description: 'Review Paul Solomon’s professional engineering and enrollment workflow contributions at IIN, with the engagement context stated explicitly.',
    canonical: '/case-studies/iin/',
    keywords: 'case study, Institute for Integrative Nutrition, IIN, health coaching, wellness education, UX design, web development',
    ogImage: '/images/iin_pic.png'
  },
  client: 'Integrative|Nutrition',
  industry: 'Wellness · Education',
  services: 'Strategy · UX/UI · Development',
  focus: 'Program discovery · Enrollment',
  heroCopy: 'An engaging education experience that helps future health coaches move from program discovery to confident enrollment.',
  overview: 'This portfolio entry describes Paul Solomon’s professional contributions at the Institute for Integrative Nutrition, not a verified KDH agency engagement. The work included engineering leadership, technical planning, onboarding, architecture reviews, and software delivery. Contributions included vendor consolidation and enrollment workflows connecting Shopify, HubSpot, and Salesforce, alongside work on search, Q&A, and mobile enrollment. Financial and engagement figures have been omitted because supporting records are not available in this repository.',
  relationship: 'Professional contribution · Agency relationship not verified',
  video: { src: '/videos/iin_vid.mp4', poster: '/images/iin_pic.png' },
  objectives: 'Create an approachable experience that clearly communicates IIN’s programs, educational philosophy, and value while simplifying program discovery and enrollment decisions.',
  challenges: 'Detailed program information had to serve visitors with different goals and backgrounds while balancing inspirational storytelling with practical enrollment content.',
  solutions: 'Streamlined program pathways, concise content, prominent calls-to-action, and reusable responsive patterns help prospective students move from discovery to enrollment.',
  features: ['Intuitive program pathways', 'Accessible education content', 'Enrollment-focused interactions'],
  image: { src: '/images/iin_devices_new.png', alt: 'Institute for Integrative Nutrition experience across responsive devices' }
});
