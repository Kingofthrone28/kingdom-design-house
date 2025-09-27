// Global site data store
export const siteData = {
  company: {
    name: "Kingdom Design House",
    tagline: "Your All-In-One Partner for Web Development / IT / Networking & AI Solutions",
    description: "We solve business problems so you don't have to."
  },
  
  contact: {
    phone: "347.927.8846",
    email: "info@kingdomdesignhouse.com",
    businessPhone: "347.927.8846"
  },
  
  navbar: {
    cta: {
      buttonText: "Get A Quote",
      ariaLabel: "Toggle menu"
    },
    companyGroups: [
      'The Web Group',
      'The IT Group', 
      'The AI Group'
    ]
  },

  // Page routing data for Layout component
  pageData: {
    group: {
      'web-group': 'webgroup',
      'network-group': 'networkgroup',
      'ai-group': 'aigroup'
    },
    services: {
      'web-group/services/web-development': 'web-development',
      'web-group/services/web-design': 'web-design',
      'web-group/services/digital-marketing': 'digital-marketing',
      'web-group/services/support': 'support',
    }
  },

  // Default fallback values for page routing
  defaultValues: {
    group: 'webgroup',
    services: 'web-development'
  },
  
  hero: {
    headline: {
      main: "WE SOLVE BUSINESS",
      highlight: "PROBLEMS",
      sub: "SO YOU",
      subHighlight: "DON'T HAVE TO"
    }
  },
  
  groups: [
    {
      id: 'webgroup',
      title: 'The Web Group',
      tagline: 'Custom Web Development & SEO Services',
      description: 'Design & Development SEO Optimization',
      buttonText: 'Web Group Site',
      bgImage: '/images/bg_web.png',
      logo: '/images/logo_web.svg',
      route: '/web-group'
    },
    {
      id: 'networkgroup',
      title: 'The Network Group',
      tagline: 'Information Technology & Networking',
      description: 'Information Technology & Networking',
      buttonText: 'IT Group Site',
      bgImage: '/images/bg_it.png',
      logo: '/images/logo_it.svg',
      route: '/network-group'
    },
    {
      id: 'aigroup',
      title: 'The AI Group',
      tagline: 'AI Integration & Tools',
      description: 'AI Integration & Tools',
      buttonText: 'AI Group Site',
      bgImage: '/images/bg_ai.png',
      logo: '/images/logo_ai.svg',
      route: '/ai-group'
    }
  ],
  
  process: {
    title: "Our Process",
    principlesTitle: "Our Core Principles",
    principles: [
      'Attention to detail',
      'Customer Engagement',
      'Results Driven Approach'
    ],
    steps: [
      { number: 1, title: 'Discovery' },
      { number: 2, title: 'Planning' },
      { number: 3, title: 'Implementation' },
      { number: 4, title: 'Optimization' },
      { number: 5, title: 'Launch' },
      { number: 6, title: 'Maintenance' }
    ]
  },
  
  chat: {
    buttonText: "Chat with Jarvis"
  },
  
  whyChooseUs: {
    title: "Why Choose Us",
    description: "With over 10 years of experience in web development and software engineering, Kingdom Design House has established itself as a trusted partner for businesses seeking innovative digital solutions. Our team specializes in creating scalable web applications, automating complex workflows, and implementing cutting-edge AI-driven tools that transform how organizations operate. We pride ourselves on delivering robust system architectures that not only meet current needs but also adapt to future growth. Our commitment to client satisfaction is reflected in our results-driven approach, where every project is tailored to maximize efficiency and drive measurable business outcomes."
  },

  // Web Strategy process data
  webStrategy: {
    steps: [
      {
        number: 1,
        title: "Discovery & Strategy",
        description: "We begin with an in-depth consultation to understand your goals, audience, and brand vision. This stage sets the foundation for every design and technical decision.",
        image: '/images/discovery.png',
      },
      {
        number: 2,
        title: "Wireframes & Design",
        description: "Before we touch a single line of code, we design page layouts and interactive mockups. This ensures clarity of structure, intuitive navigation, and a design aesthetic that aligns with your identity.",
        image: '/images/design.png',
      },
      {
        number: 3,
        title: "System Development",
        description: "Using modern backend and frontend frameworks with CMS/CRM platforms or building a system tailored to an enterprise, we bring the designs to life with scalability, security and responsiveness in mind.",
        image: '/images/engineering.png',
      },
      {
        number: 4,
        title: "Optimization",
        description: "We optimize your site for search engines, performance, and user experience to maximize your online presence.",
        image: '/images/seo.png',
      },
      {
        number: 5,
        title: "Launch & Training",
        description: "We launch your site and provide comprehensive training to ensure you can manage and update your content.",
        image: '/images/rocket.png',
      },
      {
        number: 6,
        title: "Maintenance & Growth",
        description: "We provide ongoing support, updates, and growth strategies to keep your website performing at its best.",
        image: '/images/maintenance.png'
      }
    ],
    cta: {
      text: "Start Your Project"
    }
  },

  // Group heading data for different groups
  groupHeadings: {
    webgroup: {
      title: "Our Web Group",
      highlightedText: "Web Group",
      content: "At <strong>Kingdom Design House</strong>, we craft websites that don't just look beautiful they solve problems and drive results. Every project is guided by a proven process that ensures your site is designed with purpose, optimized for performance, and built to grow with your business."
    },
    networkgroup: {
      title: "Our Network Group",
      highlightedText: "Network Group",
      content: "At <strong>Kingdom Design House</strong>, we provide comprehensive IT and networking solutions that keep your business connected and secure. Our expert team ensures your infrastructure is robust, scalable, and optimized for peak performance."
    },
    aigroup: {
      title: "Our AI Group",
      highlightedText: "AI Group",
      content: "At <strong>Kingdom Design House</strong>, we integrate cutting-edge AI solutions that transform how your business operates. From intelligent automation to smart analytics, we help you harness the power of artificial intelligence to drive innovation and efficiency."
    }
  },

  // Service content data for different service types
  serviceContent: {
    'web-design': {
      title: "Web Design",
      mainContent: {
        title: "Award-Winning, Purpose-Built Web Design",
        paragraphs: [
          "Transform your online presence with websites that are as <strong>innovative</strong> as they are <strong>impactful</strong>. At <strong>Kingdom Design House</strong>, we combine design, development, and strategy to deliver digital experiences that not only reflect your brand but also support your long-term growth.",
          "Your website should tell your story — and our collaborative approach ensures that story is crafted with intention. From early planning to launch, we involve you at every stage, creating a process that is clear, engaging, and client-focused.",
          "By immersing ourselves in your industry and brand identity, we deliver a site that speaks directly to your audience while driving measurable results."
        ]
      },
      approach: {
        title: "Our Approach to Modern Web Design",
        steps: [
          {
            title: "Discovery",
            description: "We begin with an in-depth consultation to uncover your business goals, challenges, and vision. This allows us to design a clear project roadmap, ensuring your website is built with both present needs and future growth in mind."
          },
          {
            title: "Research & Insight",
            description: "Our team studies your market, competition, and customer behavior to inform our design strategy. This research allows us to position your website to stand out while aligning with your audience's expectations."
          },
          {
            title: "UX & Structure",
            description: "We focus on creating user flows, wireframes, and architecture that make your site intuitive and functional. This stage ensures the right foundation for usability, clarity, and scalability."
          },
          {
            title: "Content Alignment",
            description: "Working with you, we determine the key messages and assets your website needs to highlight. Every section and piece of content is designed to build trust, inspire action, and guide users toward conversion."
          },
          {
            title: "Design Execution",
            description: "With a strong foundation in place, our team designs a site that is both visually striking and strategically effective. From responsive layouts to engaging visuals, we ensure your website represents your brand with style and precision."
          }
        ]
      },
      expertise: {
        title: "Expertise You Can Rely On",
        items: [
          "UX/UI Design - Intuitive and user-first experiences",
          "Creative Direction - Visual storytelling that fits your brand",
          "Mobile-Responsive Development - Optimized for every device"
        ]
      }
    },
    'web-development': {
      title: "Kingdom Design House — Web Group",
      mainContent: {
        title: "Custom Web Development Solutions",
        paragraphs: [
          "Build powerful, scalable web applications with our expert development team. We create custom solutions that grow with your business and deliver exceptional user experiences.",
          "From front-end frameworks to back-end architecture, we use cutting-edge technologies to build robust, secure, and performant web applications.",
          "Our development process ensures your application is not just functional, but optimized for speed, security, and scalability."
        ]
      },
      approach: {
        title: "Our Development Process",
        steps: [
          {
            title: "Technical Planning",
            description: "We analyze your requirements and create a comprehensive technical roadmap that outlines architecture, technology stack, and development milestones."
          },
          {
            title: "Architecture Design",
            description: "Our team designs scalable system architecture that can handle current needs while planning for future growth and feature additions."
          },
          {
            title: "Development & Testing",
            description: "We build your application using industry best practices, with continuous testing to ensure quality, performance, and security at every step."
          },
          {
            title: "Deployment & Optimization",
            description: "We deploy your application with proper monitoring, security measures, and performance optimization to ensure reliable operation."
          }
        ]
      },
      expertise: {
        title: "Technical Expertise",
        items: [
          "Full-Stack Development - Front-end and back-end solutions",
          "API Integration - Seamless third-party service connections",
          "Performance Optimization - Fast, efficient applications"
        ]
      }
    }
  },
  
  footer: {
    companyGroups: [
      'The Web Group',
      'The IT Group',
      'The AI Group'
    ],
    socialMedia: [
      'LinkedIn',
      'Instagram'
    ],
    companyInfo: { 
      phone: '347.927.8846', 
      email: 'info@kingdomdesignhouse.com' 
    },  
   }
};

// Helper functions
export const getSiteData = () => {
  return siteData;
};

export const getNavbarData = () => {
  return {
    contact: siteData.contact,
    cta: siteData.navbar.cta,
    companyGroups: siteData.navbar.companyGroups
  };
};

export const getHeroData = () => {
  return siteData.hero;
};

export const getGroupsData = () => {
  return siteData.groups;
};

export const getProcessData = () => {
  return siteData.process;
};

export const getChatData = () => {
  return siteData.chat;
};

export const getWhyChooseUsData = () => {
  return siteData.whyChooseUs;
};

export const getFooterData = () => {
  return siteData.footer;
};

export const getGroupHeadingData = (groupName) => {
  return siteData.groupHeadings[groupName] || siteData.groupHeadings.webgroup;
};

export const getWebStrategyData = () => {
  return siteData.webStrategy;
};

export const getServiceContentData = (serviceType) => {
  return siteData.serviceContent[serviceType] || siteData.serviceContent['web-design'];
};

// Export pageData and defaultValues from siteData
export const getPageData = () => {
  return siteData.pageData;
};

export const getdefaultValues = () => {
  return siteData.defaultValues;
};

// Update functions for dynamic content management
export const updateSiteData = (section, newData) => {
  if (siteData[section]) {
    Object.assign(siteData[section], newData);
  }
  return siteData;
};

export const updateContactInfo = (newContactData) => {
  Object.assign(siteData.contact, newContactData);
  return siteData.contact;
};