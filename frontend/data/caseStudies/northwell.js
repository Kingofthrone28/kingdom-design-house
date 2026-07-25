import { sharedEditorialCta } from './factory';

export const northwellData = {
  seo: {
    title: 'Northwell Health Case Study | Kingdom Design House',
    description: 'Explore the Northwell Health digital transformation, including a unified patient experience, Find a Doctor improvements, and measurable healthcare UX outcomes.',
    canonical: '/case-studies/northwell/',
    keywords: 'case study, Northwell Health, healthcare UX, web development, patient experience, Find a Doctor, design system',
    ogImage: '/images/northwell_edu.jpg'
  },
  hero: {
    eyebrow: 'Case study · Digital experience',
    title: [{ text: 'Northwell' }, { text: 'Health', accent: true }],
    copy: 'Turning a complex healthcare education ecosystem into a clear, human-centered digital experience.',
    link: { label: 'Explore the story', href: '#story', icon: '↓' }
  },
  projectDetails: [
    { label: 'Client', value: 'Northwell Health' },
    { label: 'Industry', value: 'Healthcare · Education' },
    { label: 'Services', value: 'Strategy · UX/UI · Development' },
    { label: 'Scale', value: '2019–2021 · 23 Hospitals · 750+ Outpatient Facilities' }
  ],
  opportunity: {
    sectionLabel: '01 / The opportunity',
    heading: [
      [{ text: 'Healthcare is complex.' }],
      [{ text: 'Finding answers ' }, { text: 'shouldn’t be.', emphasis: true }]
    ],
    lead: 'Northwell needed a digital experience that could serve a broad audience without sacrificing depth, trust, or clarity.',
    paragraphs: [
      'When I joined Northwell Health as a Software Engineer in 2019, the organization was entering a major period of digital transformation. With more than 14 million users visiting Northwell’s digital properties annually, patients needed a simpler and more connected way to navigate essential healthcare services. Over an eight-month development cycle, I helped lead engineering, and deployment of a centralized patient dashboard that allowed users to manage appointments, billing, profile information, and account settings across multiple Northwell platforms.',
      'Another critical challenge was improving the Find a Doctor experience and reducing friction between discovering a provider and scheduling care. I contributed to a significant overhaul of the platform, with a particular focus on mobile usability, search filters, and appointment conversion. These enhancements contributed to a 43% increase in customer intent to book an appointment, while engagement with key mobile features—including Book Online, Telehealth Available, and Primary Care filters—increased by approximately 100%.',
      'The combined impact of these initiatives supported substantial digital growth across the Northwell ecosystem. Between Q2 2019 and Q2 2022, northwell.edu experienced a 57% increase in users, a 50% increase in sessions, a 52% increase in unique page views, and a 45% increase in organic search traffic. Find a Doctor users increased by 34%, with unique page views rising by 27%.'
    ]
  },
  video: {
    src: '/videos/northwell_edu.mp4',
    poster: '/images/northwell_edu.jpg',
    autoplay: true,
    loop: true,
    muted: true,
    controls: true,
    playsInline: true,
    preload: 'metadata'
  },
  impact: {
    sectionLabel: '02 / Scale of impact',
    metrics: [
      { from: '12.9', to: '25.2', label: 'Brand NPS across the 8-year tenure — source: NRC Data, Core Market Survey' },
      { from: '37', to: '1', label: 'Disconnected hospital properties unified under one enterprise design system' },
      { from: '1.5', to: '19.1', label: 'Community Hospital NPS — from near-zero brand advocacy to system-wide lift' },
      { from: '29', to: '71', suffix: '%', label: 'Brand momentum — share of consumers who said Northwell was “really on the way up”' }
    ]
  },
  approach: {
    sectionLabel: '03 / Our approach',
    heading: [[{ text: 'Designed around' }], [{ text: 'real human needs.' }]],
    pillars: [
      { number: '01', title: 'Make complexity feel simple', body: 'We reorganized dense education content around the questions people actually ask, creating shorter paths to high-value information.' },
      { number: '02', title: 'Design for every screen', body: 'A flexible system keeps navigation, reading, and discovery clear from a hospital workstation to a phone in a waiting room.' },
      { number: '03', title: 'Build trust into the details', body: 'Accessible type, confident hierarchy, and predictable interaction patterns help every visitor move forward with clarity.' }
    ]
  },
  experience: {
    sectionLabel: '04 / The experience',
    heading: [[{ text: 'One clear system.' }], [{ text: 'Every device.', emphasis: true }]],
    description: 'A reusable component library gives teams the flexibility to publish new resources while keeping the experience coherent, recognizable, and easy to navigate.',
    features: ['Focused information architecture', 'Accessible interaction patterns', 'Responsive modular components'],
    devicePreview: {
      src: '/images/northwell_trans.png',
      alt: 'Northwell Health responsive digital experience shown across desktop and mobile devices'
    }
  },
  callToAction: sharedEditorialCta
};
