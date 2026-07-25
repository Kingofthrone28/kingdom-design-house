import { createEditorialCaseStudy } from './factory';

export const softPlayData = createEditorialCaseStudy({
  seo: {
    title: 'Long Island Soft Play Case Study | Kingdom Design House',
    description: 'Explore how Kingdom Design House designed and developed a modern web experience for Long Island Soft Play, built for clarity and conversions.',
    canonical: '/case-studies/softplay/',
    keywords: 'case study, web design, development, soft play, kids entertainment, Long Island',
    ogImage: '/images/softplaylaptop.png'
  },
  client: 'Long Island|Soft Play',
  industry: 'Kids Entertainment · Events',
  services: 'Brand · UX/UI · Development',
  focus: 'Package discovery · Bookings',
  heroCopy: 'A playful, polished digital storefront that turns customizable party packages into an effortless booking journey.',
  overview: 'Long Island Soft Play offers luxury soft play rentals with customizable packages and a strong emphasis on child safety. The new website brings that experience to life in a clean, engaging format while helping customers explore offerings and book services.',
  video: { src: '/videos/softplayli.mp4', poster: '/images/softplaylaptop.png' },
  objectives: 'Create a modern, visually engaging website that showcases customizable rental packages, communicates the brand’s safety standards, and encourages bookings.',
  challenges: 'The previous site lacked structure and clarity, did not reflect the luxury and playful brand, and made service discovery difficult—particularly on mobile.',
  solutions: 'A clean responsive layout, intuitive navigation, clear booking calls-to-action, and safety-focused messaging create a smooth experience across every device.',
  features: ['Custom package discovery', 'Safety-first storytelling', 'Streamlined booking pathways'],
  image: { src: '/images/softplaylaptop.png', alt: 'Long Island Soft Play website displayed on a laptop' }
});
