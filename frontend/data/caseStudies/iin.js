import { createEditorialCaseStudy } from './factory';

export const iinData = createEditorialCaseStudy({
  seo: {
    title: 'Institute for Integrative Nutrition Case Study | Kingdom Design House',
    description: 'Explore a responsive education experience for the Institute for Integrative Nutrition designed around program discovery, accessible content, and clear enrollment pathways.',
    canonical: '/case-studies/iin/',
    keywords: 'case study, Institute for Integrative Nutrition, IIN, health coaching, wellness education, UX design, web development',
    ogImage: '/images/iin_pic.png'
  },
  client: 'Integrative|Nutrition',
  industry: 'Wellness · Education',
  services: 'Strategy · UX/UI · Development',
  focus: 'Program discovery · Enrollment',
  heroCopy: 'An engaging education experience that helps future health coaches move from program discovery to confident enrollment.',
  overview: 'When I stepped into this role, customer enrollment depended on disconnected platforms, manual processes, and overlapping vendor tools. I led an international engineering team of five to simplify that environment while strengthening technical planning, onboarding, architecture reviews, and software delivery. Consolidating vendors reduced annual technology overhead by approximately $90,000, while an enrollment workflow connecting Shopify, HubSpot, and Salesforce supported more than $1 million in sales volume. Cross-functional improvements to search, Q&A, and enrollment increased mobile engagement for sales closings by 30%.',
  video: { src: '/videos/iin_vid.mp4', poster: '/images/iin_pic.png' },
  objectives: 'Create an approachable experience that clearly communicates IIN’s programs, educational philosophy, and value while simplifying program discovery and enrollment decisions.',
  challenges: 'Detailed program information had to serve visitors with different goals and backgrounds while balancing inspirational storytelling with practical enrollment content.',
  solutions: 'Streamlined program pathways, concise content, prominent calls-to-action, and reusable responsive patterns help prospective students move from discovery to enrollment.',
  features: ['Intuitive program pathways', 'Accessible education content', 'Enrollment-focused interactions'],
  image: { src: '/images/iin_devices_new.png', alt: 'Institute for Integrative Nutrition experience across responsive devices' }
});
