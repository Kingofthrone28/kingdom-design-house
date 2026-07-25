export const sharedEditorialCta = {
  eyebrow: 'Have a complex story to tell?',
  heading: [
    [{ text: 'Let’s make it' }],
    [{ text: 'impossible to ignore.', emphasis: true }]
  ],
  link: { label: 'Start a conversation', href: '/contact/', icon: '↗' }
};

export const createEditorialCaseStudy = ({
  seo,
  client,
  industry,
  services,
  focus,
  heroCopy,
  overview,
  video,
  objectives,
  challenges,
  solutions,
  features,
  image
}) => ({
  seo,
  hero: {
    eyebrow: `Case study · ${industry}`,
    title: client.split('|').map((text, index, lines) => ({
      text,
      accent: index === lines.length - 1
    })),
    copy: heroCopy,
    link: { label: 'Explore the story', href: '#story', icon: '↓' }
  },
  projectDetails: [
    { label: 'Client', value: client.replace('|', ' ') },
    { label: 'Industry', value: industry },
    { label: 'Services', value: services },
    { label: 'Focus', value: focus }
  ],
  opportunity: {
    sectionLabel: '01 / The opportunity',
    heading: [
      [{ text: 'A clearer experience.' }],
      [{ text: 'A stronger ' }, { text: 'connection.', emphasis: true }]
    ],
    lead: heroCopy,
    paragraphs: [overview]
  },
  video: {
    autoplay: true,
    loop: true,
    muted: true,
    controls: true,
    playsInline: true,
    preload: 'metadata',
    ...video
  },
  approach: {
    sectionLabel: '02 / Our approach',
    heading: [
      [{ text: 'From challenge' }],
      [{ text: 'to clear solutions.' }]
    ],
    pillars: [
      { number: '01', title: 'Objectives', body: objectives },
      { number: '02', title: 'Challenges', body: challenges },
      { number: '03', title: 'Solutions', body: solutions }
    ]
  },
  experience: {
    sectionLabel: '03 / The experience',
    heading: [
      [{ text: 'Built to perform.' }],
      [{ text: 'Every device.', emphasis: true }]
    ],
    description: solutions,
    features,
    devicePreview: image
  },
  callToAction: sharedEditorialCta
});
