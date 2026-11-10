import { sharedEditorialCta } from './factory';

export const northwellData = {
  seo: {
    title: 'Northwell Health Professional Experience | Kingdom Design House',
    description: 'Paul Solomon’s professional employment experience at Northwell Health as a Software Engineer, including patient dashboard and provider discovery contributions.',
    canonical: '/case-studies/northwell/',
    keywords: 'case study, Northwell Health, healthcare UX, web development, patient experience, Find a Doctor, design system',
    ogImage: '/images/northwell_edu.jpg'
  },
  hero: {
    eyebrow: 'Professional employment experience · Software Engineer',
    title: [{ text: 'Northwell' }, { text: 'Health', accent: true }],
    copy: 'Turning a complex healthcare education ecosystem into a clear, human-centered digital experience.',
    link: { label: 'Explore the story', href: '#story', icon: '↓' }
  },
  projectDetails: [
    { label: 'Employer', value: 'Northwell Health' },
    { label: 'Industry', value: 'Healthcare · Education' },
    { label: 'Services', value: 'Strategy · UX/UI · Development' },
    { label: 'Relationship', value: 'Professional employment · Not a KDH agency engagement' }
  ],
  opportunity: {
    sectionLabel: '01 / The opportunity',
    heading: [
      [{ text: 'Healthcare is complex.' }],
      [{ text: 'Finding answers ' }, { text: 'shouldn’t be.', emphasis: true }]
    ],
    lead: 'Northwell needed a digital experience that could serve a broad audience without sacrificing depth, trust, or clarity.',
    paragraphs: [
      'Paul Solomon contributed to Northwell Health’s digital products as a Software Engineer. This entry represents professional employment experience, not a KDH agency engagement.',
      'Work included contributions to a centralized patient dashboard for appointments, billing, profile information, and account settings, alongside provider discovery and mobile interaction improvements in the Find a Doctor experience.',
      'These examples describe engineering and interface contributions. Organization-wide traffic figures, brand metrics, and conversion percentages are omitted because the repository does not establish a source or attribution to this work.'
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
  approach: {
    sectionLabel: '02 / Engineering approach',
    heading: [[{ text: 'Designed around' }], [{ text: 'real human needs.' }]],
    pillars: [
      { number: '01', title: 'Make complexity feel simple', body: 'We reorganized dense education content around the questions people actually ask, creating shorter paths to high-value information.' },
      { number: '02', title: 'Design for every screen', body: 'A flexible system keeps navigation, reading, and discovery clear from a hospital workstation to a phone in a waiting room.' },
      { number: '03', title: 'Build trust into the details', body: 'Accessible type, confident hierarchy, and predictable interaction patterns help every visitor move forward with clarity.' }
    ]
  },
  experience: {
    sectionLabel: '03 / The experience',
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
