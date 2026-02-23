/**
 * SEO Configuration and Utilities
 * Comprehensive SEO optimization for Kingdom Design House
 */

// Base SEO configuration
export const seoConfig = {
  company: {
    name: "Kingdom Design House",
    tagline: "Your All-In-One Partner for Web Development, IT, Networking & AI Solutions",
    description: "Professional web development, IT services, networking, and AI solutions serving Long Island, Queens, Brooklyn, and Manhattan. We solve business problems so you don't have to.",
    url: "https://kingdomdesignhouse.com",
    logo: "https://kingdomdesignhouse.com/images/kdh_logo.svg",
    phone: "347.927.8846",
    email: "info@kingdomdesignhouse.com"
  },
  
  location: {
    primary: "Long Island, NY",
    secondary: ["Queens, NY", "Brooklyn, NY", "Manhattan, NY"],
    address: "Long Island, New York",
    coordinates: {
      latitude: "40.7891",
      longitude: "-73.1347"
    },
    // GEO Optimization - Enhanced geographic entities
    geoEntities: {
      state: "New York",
      stateCode: "NY",
      counties: ["Nassau County", "Suffolk County", "Queens County", "Kings County", "New York County"],
      cities: ["Long Island", "Queens", "Brooklyn", "Manhattan", "New York City"],
      zipCodes: ["11501", "11502", "11503", "11101", "11201", "10001"],
      timeZone: "America/New_York",
      region: "Northeast United States"
    }
  },

  social: {
    twitter: "@kingdomdesignhouse",
    facebook: "kingdomdesignhouse",
    linkedin: "kingdom-design-house"
  },

  // GEO (Generative Engine Optimization) Configuration
  geoOptimization: {
    // Content authority and expertise signals
    authoritySignals: {
      expertise: "Technology Solutions Provider",
      experience: "10+ years in web development and AI",
      credentials: ["AWS Certified", "Microsoft Certified", "Google Cloud Partner"],
      publications: "Technical blog posts and case studies",
      certifications: "Industry-recognized technology certifications"
    },
    // Fact-based content for AI citation
    factualContent: {
      businessMetrics: {
        founded: "2020",
        experience: "10+ years combined team experience",
        clients: "50+ businesses served",
        projects: "100+ successful implementations",
        retention: "98% client retention rate"
      },
      technicalCapabilities: {
        languages: ["JavaScript", "Python", "React", "Node.js", "TypeScript"],
        frameworks: ["React", "Next.js", "Express.js", "Django", "Flask"],
        cloud: ["AWS", "Google Cloud", "Microsoft Azure", "Netlify", "Vercel"],
        databases: ["PostgreSQL", "MongoDB", "MySQL", "Redis"]
      }
    },
    // Content structure for generative engines
    contentStructure: {
      useHeadings: true,
      useDefinitions: true,
      useExamples: true,
      useCaseStudies: true,
      useTechnicalSpecs: true
    }
  },

  // AIO (AI Optimization) Configuration  
  aiOptimization: {
    // Content formatting for AI parsing
    contentStructure: {
      useHeadings: true,
      useLists: true,
      useTables: true,
      useDefinitions: true,
      useExamples: true
    },
    // Entity relationships for AI understanding
    entityRelationships: {
      services: ["Web Development", "IT Services", "Networking", "AI Solutions"],
      industries: ["Technology", "Business", "E-commerce", "Healthcare", "Finance"],
      technologies: ["React", "Node.js", "Python", "AI/ML", "Cloud Computing"],
      certifications: ["AWS", "Microsoft", "Google Cloud", "Cisco"]
    }
  }
};

// SEO data for each page
export const pageSeoData = {
  home: {
    title: "Web & AI Solutions in Long Island NY",
    description: "Kingdom Design House delivers AI consulting, web development & IT services for NYC businesses. Grow with smart tech today.",
    keywords: "AI Consulting Long Island, Web Development NYC, IT Services New York",
    canonical: "/",
    ogTitle: "Web & AI Solutions in Long Island NY",
    ogDescription: "Kingdom Design House delivers AI consulting, web development & IT services for NYC businesses. Grow with smart tech today."
  },

  about: {
    title: "About Kingdom Design House",
    description: "Learn how our Long Island-based tech team builds AI, web & network solutions for businesses across NYC & beyond.",
    keywords: "Tech Company Long Island, About Us NYC, Local Web Agency NY",
    canonical: "/about/",
    ogTitle: "About Kingdom Design House",
    ogDescription: "Learn how our Long Island-based tech team builds AI, web & network solutions for businesses across NYC & beyond."
  },

  pricing: {
    title: "Pricing for Web & AI Services",
    description: "Flexible pricing for web development, AI & network solutions serving NYC and Long Island businesses.",
    keywords: "Web Design Pricing NYC, AI Consulting Cost NY, IT Service Rates Long Island",
    canonical: "/pricing/",
    ogTitle: "Pricing for Web & AI Services",
    ogDescription: "Flexible pricing for web development, AI & network solutions serving NYC and Long Island businesses."
  },

  webGroup: {
    title: "Web Development in Long Island NY",
    description: "We design & build modern websites for NYC businesses. Expert developers in Long Island deliver performance & SEO excellence.",
    keywords: "Web Development Long Island, Website Design NYC, WordPress Agency NY",
    canonical: "/web-group/",
    ogTitle: "Web Development in Long Island NY",
    ogDescription: "We design & build modern websites for NYC businesses. Expert developers in Long Island deliver performance & SEO excellence."
  },

  networkGroup: {
    title: "Network Design & IT Support NY",
    description: "Reliable network architecture & IT support for NY businesses. Serving Long Island & NYC since 2020.",
    keywords: "Network Design NYC, IT Support Long Island, Infrastructure Services NY",
    canonical: "/network-group/",
    ogTitle: "Network Design & IT Support NY",
    ogDescription: "Reliable network architecture & IT support for NY businesses. Serving Long Island & NYC since 2020."
  },

  aiGroup: {
    title: "AI Solutions in Long Island NY",
    description: "Leverage AI for growth. We build custom chatbots & automation tools for NYC businesses.",
    keywords: "AI Solutions NYC, AI Consulting Long Island, Chatbot Developer NY",
    canonical: "/ai-group/",
    ogTitle: "AI Solutions in Long Island NY",
    ogDescription: "Leverage AI for growth. We build custom chatbots & automation tools for NYC businesses."
  },

  services: {
    title: "Technology Services in Long Island",
    description: "Explore AI, web & network solutions tailored for NY businesses. Expert IT consultants serving Long Island & NYC.",
    keywords: "Tech Services Long Island, IT Consulting NY, AI Solutions NYC",
    canonical: "/services/",
    ogTitle: "Technology Services in Long Island",
    ogDescription: "Explore AI, web & network solutions tailored for NY businesses. Expert IT consultants serving Long Island & NYC."
  },

  videoDemo: {
    title: "Video Component Demo | Interactive Video Showcase | Kingdom Design House | Long Island, NY",
    description: "Experience our interactive video components and see how we showcase our work through engaging video content. Video player demos and showcase examples.",
    keywords: "video component demo, interactive video showcase, video player Long Island, video content Queens, multimedia solutions Brooklyn, video development Manhattan",
    canonical: "/video-demo/",
    ogTitle: "Video Component Demo | Interactive Video Showcase | Kingdom Design House",
    ogDescription: "Experience our interactive video components and see how we showcase our work through engaging video content."
  }
};

// Service page SEO data
export const serviceSeoData = {
  webDevelopment: {
    title: "Custom Web Development in NYC",
    description: "Custom web development in NYC for small and growing businesses. We build fast, scalable websites and web apps for New York teams.",
    keywords: "custom web development nyc, web development nyc, custom website development new york, long island web developer",
    canonical: "/web-group/services/web-development/"
  },
  
  webDesign: {
    title: "Web Design Services in NYC",
    description: "Beautiful, SEO-optimized web design for Long Island & NYC brands. Enhance your digital presence today.",
    keywords: "Web Design NYC, Responsive Web Design Long Island",
    canonical: "/web-group/services/web-design/"
  },

  digitalMarketing: {
    title: "SEO & Digital Marketing NYC",
    description: "Boost visibility with SEO, ads & content for Long Island & NYC companies. Data-driven digital growth experts.",
    keywords: "Digital Marketing NYC, SEO Agency Long Island, Local SEO New York",
    canonical: "/web-group/services/digital-marketing/"
  },

  support: {
    title: "Website Support and Maintenance in New York",
    description: "Website support and maintenance in New York for businesses that need reliable updates, security, uptime, and ongoing technical care.",
    keywords: "website support and maintenance new york, website maintenance new york, web support nyc, website care long island",
    canonical: "/web-group/services/support/"
  },

  aiDevelopment: {
    title: "AI App Development NY",
    description: "Custom AI apps & automations for Long Island companies. Powered by GPT & cutting-edge tech.",
    keywords: "AI App Development NYC, Automation Software NY",
    canonical: "/ai-group/services/ai-development/"
  },

  networkDesign: {
    title: "Wireless Network Design in Long Island NY",
    description: "Wireless network design in Long Island, NY with secure infrastructure for small businesses, offices, and home-office environments.",
    keywords: "wireless network design long island, network solutions for small businesses long island ny, wireless network design nyc, network infrastructure ny",
    canonical: "/network-group/services/network-design/"
  },

  networkOptimization: {
    title: "Wireless Infrastructure Design and Optimization NYC",
    description: "Wireless infrastructure design and network optimization for NYC businesses focused on speed, coverage, security, and reliability.",
    keywords: "wireless infrastructure design nyc, network optimization nyc, wireless network optimization long island",
    canonical: "/network-group/services/network-optimization/"
  },

  networkSupport: {
    title: "NYC Network Support and Maintenance",
    description: "NYC network support and maintenance for businesses that need proactive monitoring, fast troubleshooting, and reliable uptime.",
    keywords: "nyc network support, network support and maintenance ny, managed network support long island",
    canonical: "/network-group/services/network-support/"
  },

  aiConsulting: {
    title: "AI Consulting Services NYC",
    description: "Strategic AI consulting for NY businesses. Get expert guidance on automation & machine learning.",
    keywords: "AI Consulting NYC, Machine Learning NY",
    canonical: "/ai-group/services/ai-consulting/"
  },

  aiSupport: {
    title: "AI Support and Maintenance Services NY",
    description: "AI support and maintenance services in NY including model tuning, monitoring, updates, and ongoing optimization for production AI systems.",
    keywords: "ai support and maintenance, ai support nyc, ai maintenance long island, ai model monitoring new york",
    canonical: "/ai-group/services/ai-support/"
  }
};

// Utility functions
export const generateSeoHead = (pageData, additionalProps = {}) => {
  const {
    title,
    description,
    keywords,
    canonical,
    ogTitle,
    ogDescription,
    structuredData,
    noindex = false
  } = { ...pageData, ...additionalProps };

  return {
    title,
    description,
    keywords,
    canonical,
    ogTitle: ogTitle || title,
    ogDescription: ogDescription || description,
    structuredData,
    noindex
  };
};

// Internal linking utility
export const generateInternalLinks = (currentPage, siteData) => {
  const links = [];
  
  // Add related service links
  if (currentPage.includes('web-group')) {
    links.push(
      { url: '/network-group/', text: 'IT Services & Networking' },
      { url: '/ai-group/', text: 'AI Solutions' },
      { url: '/pricing/', text: 'Pricing Plans' }
    );
  } else if (currentPage.includes('network-group')) {
    links.push(
      { url: '/web-group/', text: 'Web Development' },
      { url: '/ai-group/', text: 'AI Solutions' },
      { url: '/pricing/', text: 'Pricing Plans' }
    );
  } else if (currentPage.includes('ai-group')) {
    links.push(
      { url: '/web-group/', text: 'Web Development' },
      { url: '/network-group/', text: 'IT Services' },
      { url: '/pricing/', text: 'Pricing Plans' }
    );
  }

  // Add common links
  links.push(
    { url: '/about/', text: 'About Us' },
    { url: '/', text: 'Home' }
  );

  return links;
};

// Sitemap generation utility
export const generateSitemapUrls = () => {
  return [
    { url: '/', priority: 1.0, changefreq: 'weekly' },
    { url: '/about/', priority: 0.8, changefreq: 'monthly' },
    { url: '/services/', priority: 0.9, changefreq: 'monthly' },
    { url: '/pricing/', priority: 0.9, changefreq: 'monthly' },
    { url: '/web-group/', priority: 0.8, changefreq: 'monthly' },
    { url: '/web-group/services/web-development/', priority: 0.7, changefreq: 'monthly' },
    { url: '/web-group/services/web-design/', priority: 0.7, changefreq: 'monthly' },
    { url: '/web-group/services/digital-marketing/', priority: 0.7, changefreq: 'monthly' },
    { url: '/web-group/services/support/', priority: 0.7, changefreq: 'monthly' },
    { url: '/network-group/', priority: 0.8, changefreq: 'monthly' },
    { url: '/network-group/services/network-design/', priority: 0.7, changefreq: 'monthly' },
    { url: '/network-group/services/network-optimization/', priority: 0.7, changefreq: 'monthly' },
    { url: '/network-group/services/network-support/', priority: 0.7, changefreq: 'monthly' },
    { url: '/ai-group/', priority: 0.8, changefreq: 'monthly' },
    { url: '/ai-group/services/ai-consulting/', priority: 0.7, changefreq: 'monthly' },
    { url: '/ai-group/services/ai-development/', priority: 0.7, changefreq: 'monthly' },
    { url: '/ai-group/services/ai-support/', priority: 0.7, changefreq: 'monthly' },
    { url: '/video-demo/', priority: 0.6, changefreq: 'monthly' }
  ];
};
