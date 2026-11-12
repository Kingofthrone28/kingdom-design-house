export const agencyServicePresentation = {
  'web-development': {
    seoKey: 'webDevelopment',
    groupName: 'webgroup',
    groupLabel: 'The Web Group',
    serviceLabel: 'Custom development',
    market: 'Long Island & NYC',
    focus: 'Performance · Growth · SEO',
    eyebrow: 'Websites and business applications for Long Island and NYC',
    displayTitle: ['Built for', 'business', 'growth.'],
    showcaseAsset: '/images/iin_devices_new.png',
    showcaseAlt: 'Responsive website shown on desktop, laptop, tablet, and mobile devices'
  },
  'web-design': {
    seoKey: 'webDesign',
    groupName: 'webgroup',
    groupLabel: 'The Web Group',
    serviceLabel: 'Web design',
    market: 'Long Island & NYC',
    focus: 'UX · UI · Creative direction',
    eyebrow: 'Purpose-built digital experiences for ambitious New York brands',
    displayTitle: ['Designed to', 'stand', 'out.'],
    showcaseAsset: '/images/design.png',
    showcaseAlt: 'Web design and development illustration'
  },
  'digital-marketing': {
    seoKey: 'digitalMarketing',
    groupName: 'webgroup',
    groupLabel: 'The Web Group',
    serviceLabel: 'Digital marketing',
    market: 'Long Island & NYC',
    focus: 'SEO · Performance · Visibility',
    eyebrow: 'Search intent, useful service content and confirmed inquiry measurement',
    displayTitle: ['Found.', 'Chosen.', 'Growing.'],
    showcaseAsset: '/images/seo.png',
    showcaseAlt: 'Search engine optimization illustration'
  },
  support: {
    seoKey: 'support',
    groupName: 'webgroup',
    groupLabel: 'The Web Group',
    serviceLabel: 'Website support',
    market: 'Long Island & NYC',
    focus: 'Security · Speed · Reliability',
    eyebrow: 'Website maintenance with agreed checks, service hours and responsibilities',
    displayTitle: ['Check.', 'Update.', 'Verify.'],
    showcaseAsset: '/images/maintenance.png',
    showcaseAlt: 'Website maintenance and performance improvement illustration'
  },
  'network-design': {
    seoKey: 'networkDesign',
    groupName: 'networkgroup',
    groupLabel: 'The Network Group',
    serviceLabel: 'Network design',
    market: 'Long Island & NYC',
    focus: 'Infrastructure · WiFi · Uptime',
    eyebrow: 'Business network architecture designed for dependable performance',
    displayTitle: ['Connected', 'by', 'design.'],
    showcaseAsset: '/images/bg_cable.png',
    showcaseAlt: 'Abstract high-speed network infrastructure visualization'
  },
  'network-optimization': {
    seoKey: 'networkOptimization',
    groupName: 'networkgroup',
    groupLabel: 'The Network Group',
    serviceLabel: 'Network optimization',
    market: 'Long Island & NYC',
    focus: 'Coverage · Speed · Stability',
    eyebrow: 'Wireless infrastructure tested and tuned under real business load',
    displayTitle: ['Faster.', 'Stronger.', 'Smarter.'],
    showcaseAsset: '/images/discovery.png',
    showcaseAlt: 'Network discovery and optimization illustration'
  },
  'network-support': {
    seoKey: 'networkSupport',
    groupName: 'networkgroup',
    groupLabel: 'The Network Group',
    serviceLabel: 'Network support',
    market: 'Long Island & NYC',
    focus: 'Monitoring · Triage · Connectivity',
    eyebrow: 'Business connectivity diagnosis with agreed coverage and responsibilities',
    displayTitle: ['Report.', 'Trace.', 'Verify.'],
    showcaseAsset: '/images/maintenance.png',
    showcaseAlt: 'Proactive network support and maintenance illustration'
  },
  'ai-consulting': {
    seoKey: 'aiConsulting',
    groupName: 'aigroup',
    groupLabel: 'The AI Group',
    serviceLabel: 'AI consulting',
    market: 'Long Island & NYC',
    focus: 'Strategy · Roadmaps · Adoption',
    eyebrow: 'Practical AI strategy grounded in real business opportunities',
    displayTitle: ['Clarity', 'before', 'complexity.'],
    showcaseAsset: '/images/rocket.png',
    showcaseAlt: 'AI strategy and business growth illustration'
  },
  'ai-development': {
    seoKey: 'aiDevelopment',
    groupName: 'aigroup',
    groupLabel: 'The AI Group',
    serviceLabel: 'AI development',
    market: 'Long Island & NYC',
    focus: 'Automation · RAG · Applications',
    eyebrow: 'Custom AI applications designed around the way your business works',
    displayTitle: ['Intelligence', 'put to', 'work.'],
    showcaseAsset: '/images/Jarvis.png',
    showcaseAlt: 'Jarvis, the Kingdom Design House AI assistant'
  },
  'ai-support': {
    seoKey: 'aiSupport',
    groupName: 'aigroup',
    groupLabel: 'The AI Group',
    serviceLabel: 'AI support',
    market: 'Long Island & NYC',
    focus: 'Monitoring · Data · Optimization',
    eyebrow: 'Production AI review for Long Island and NYC businesses',
    displayTitle: ['Inspect.', 'Evaluate.', 'Update.'],
    showcaseAsset: '/images/AI_data.png',
    showcaseAlt: 'Artificial intelligence network visualization'
  }
};

export const agencyServiceTypes = Object.freeze(Object.keys(agencyServicePresentation));

export const getAgencyServicePresentation = (serviceType) => {
  const presentation = agencyServicePresentation[serviceType];

  if (!presentation) {
    throw new Error(`Unknown agency service type: ${serviceType}`);
  }

  return presentation;
};
