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
    logo: "https://kingdomdesignhouse.com/images/logo.png",
    phone: "347.927.8846",
    email: "kingdomdesignhouse@gmail.com"
  },
  
  location: {
    primary: "Long Island, NY",
    secondary: ["Queens, NY", "Brooklyn, NY", "Manhattan, NY"],
    address: "Long Island, New York",
    coordinates: {
      latitude: "40.7891",
      longitude: "-73.1347"
    }
  },

  social: {
    twitter: "@kingdomdesignhouse",
    facebook: "kingdomdesignhouse",
    linkedin: "kingdom-design-house"
  }
};

// SEO data for each page
export const pageSeoData = {
  home: {
    title: "Web Development, IT Services & AI Solutions | Kingdom Design House | Long Island, NY",
    description: "Professional web development, IT services, networking, and AI solutions in Long Island, NY. Serving Queens, Brooklyn, and Manhattan. We solve business problems so you don't have to.",
    keywords: "web development Long Island, IT services Queens, networking solutions Brooklyn, AI solutions Manhattan, web design NYC, digital marketing Long Island, business technology solutions",
    canonical: "/",
    ogTitle: "Kingdom Design House - Web Development & IT Solutions | Long Island, NY",
    ogDescription: "Professional web development, IT services, networking, and AI solutions serving Long Island, Queens, Brooklyn, and Manhattan. We solve business problems so you don't have to.",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Kingdom Design House",
      "description": "Professional web development, IT services, networking, and AI solutions",
      "url": "https://kingdomdesignhouse.com",
      "logo": "https://kingdomdesignhouse.com/images/logo.png",
      "telephone": "347.927.8846",
      "email": "kingdomdesignhouse@gmail.com",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Long Island",
        "addressRegion": "NY",
        "addressCountry": "US"
      },
      "areaServed": [
        "Long Island, NY",
        "Queens, NY", 
        "Brooklyn, NY",
        "Manhattan, NY"
      ],
      "serviceType": [
        "Web Development",
        "IT Services", 
        "Networking Solutions",
        "AI Solutions"
      ]
    }
  },

  about: {
    title: "About Kingdom Design House | Web Development & IT Solutions | Long Island, NY",
    description: "Learn about Kingdom Design House, a technology company serving Long Island, Queens, Brooklyn, and Manhattan. Professional web development, IT services, and digital solutions.",
    keywords: "about Kingdom Design House, web development company Long Island, IT services Queens, technology company Brooklyn, digital solutions Manhattan",
    canonical: "/about/",
    ogTitle: "About Kingdom Design House - Technology Solutions | Long Island, NY",
    ogDescription: "Learn about Kingdom Design House, a technology company serving Long Island, Queens, Brooklyn, and Manhattan. Professional web development, IT services, and digital solutions.",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "name": "About Kingdom Design House",
      "description": "Learn about Kingdom Design House, a technology company serving Long Island, Queens, Brooklyn, and Manhattan",
      "url": "https://kingdomdesignhouse.com/about/",
      "mainEntity": {
        "@type": "Organization",
        "name": "Kingdom Design House",
        "description": "Professional web development, IT services, networking, and AI solutions"
      }
    }
  },

  pricing: {
    title: "Pricing Plans | Web Development, IT & AI Solutions | Kingdom Design House | Long Island, NY",
    description: "Flexible pricing plans for web development, IT services, networking, and AI solutions. Serving Long Island, Queens, Brooklyn, and Manhattan. Choose the perfect plan for your business.",
    keywords: "web development pricing Long Island, IT services pricing Queens, networking solutions pricing Brooklyn, AI solutions pricing Manhattan, business technology pricing NYC",
    canonical: "/pricing/",
    ogTitle: "Pricing Plans - Web Development & IT Solutions | Kingdom Design House",
    ogDescription: "Flexible pricing plans for web development, IT services, networking, and AI solutions. Serving Long Island, Queens, Brooklyn, and Manhattan.",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Pricing Plans",
      "description": "Flexible pricing plans for web development, IT services, networking, and AI solutions",
      "url": "https://kingdomdesignhouse.com/pricing/"
    }
  },

  webGroup: {
    title: "Web Development & Design Services | The Web Group | Kingdom Design House | Long Island, NY",
    description: "Professional web development, design, and SEO services in Long Island, NY. The Web Group specializes in scalable web applications, e-commerce, and digital marketing solutions.",
    keywords: "web development Long Island, web design Queens, web development Brooklyn, web development Manhattan, e-commerce development NYC, SEO services Long Island, digital marketing Queens",
    canonical: "/web-group/",
    ogTitle: "Web Development & Design Services | The Web Group | Long Island, NY",
    ogDescription: "Professional web development, design, and SEO services in Long Island, NY. The Web Group specializes in scalable web applications and digital solutions.",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Web Development Services",
      "description": "Professional web development, design, and SEO services",
      "provider": {
        "@type": "Organization",
        "name": "Kingdom Design House"
      },
      "areaServed": ["Long Island, NY", "Queens, NY", "Brooklyn, NY", "Manhattan, NY"],
      "serviceType": "Web Development"
    }
  },

  networkGroup: {
    title: "IT Services & Networking Solutions | The Network Group | Kingdom Design House | Long Island, NY",
    description: "Professional IT services and networking solutions in Long Island, NY. The Network Group provides infrastructure, security, and technical support for businesses.",
    keywords: "IT services Long Island, networking solutions Queens, IT support Brooklyn, network security Manhattan, business IT services NYC, technical support Long Island",
    canonical: "/network-group/",
    ogTitle: "IT Services & Networking Solutions | The Network Group | Long Island, NY",
    ogDescription: "Professional IT services and networking solutions in Long Island, NY. The Network Group provides infrastructure and security solutions.",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "IT Services & Networking Solutions",
      "description": "Professional IT services and networking solutions",
      "provider": {
        "@type": "Organization",
        "name": "Kingdom Design House"
      },
      "areaServed": ["Long Island, NY", "Queens, NY", "Brooklyn, NY", "Manhattan, NY"],
      "serviceType": "IT Services"
    }
  },

  aiGroup: {
    title: "AI Solutions & Automation Services | The AI Group | Kingdom Design House | Long Island, NY",
    description: "AI solutions and automation services in Long Island, NY. The AI Group specializes in machine learning, chatbots, and intelligent business solutions.",
    keywords: "AI solutions Long Island, artificial intelligence Queens, AI automation Brooklyn, machine learning Manhattan, chatbot development NYC, AI consulting Long Island",
    canonical: "/ai-group/",
    ogTitle: "AI Solutions & Automation Services | The AI Group | Long Island, NY",
    ogDescription: "AI solutions and automation services in Long Island, NY. The AI Group specializes in machine learning and intelligent business solutions.",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "AI Solutions & Automation Services",
      "description": "AI solutions and automation services",
      "provider": {
        "@type": "Organization",
        "name": "Kingdom Design House"
      },
      "areaServed": ["Long Island, NY", "Queens, NY", "Brooklyn, NY", "Manhattan, NY"],
      "serviceType": "AI Solutions"
    }
  },

  services: {
    title: "Our Services | Web Development, IT & AI Solutions | Kingdom Design House | Long Island, NY",
    description: "Comprehensive technology services including web development, IT solutions, networking, and AI services. Serving Long Island, Queens, Brooklyn, and Manhattan with professional solutions.",
    keywords: "services Long Island, web development services Queens, IT services Brooklyn, AI solutions Manhattan, technology services NYC, business solutions Long Island, professional services Queens",
    canonical: "/services/",
    ogTitle: "Our Services | Web Development, IT & AI Solutions | Kingdom Design House",
    ogDescription: "Comprehensive technology services including web development, IT solutions, networking, and AI services. Serving Long Island, Queens, Brooklyn, and Manhattan.",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Technology Services",
      "description": "Comprehensive technology services including web development, IT solutions, networking, and AI services",
      "provider": {
        "@type": "Organization",
        "name": "Kingdom Design House"
      },
      "areaServed": ["Long Island, NY", "Queens, NY", "Brooklyn, NY", "Manhattan, NY"],
      "serviceType": ["Web Development", "IT Services", "Networking Solutions", "AI Solutions"],
      "url": "https://kingdomdesignhouse.com/services/"
    }
  },

  videoDemo: {
    title: "Video Component Demo | Interactive Video Showcase | Kingdom Design House | Long Island, NY",
    description: "Experience our interactive video components and see how we showcase our work through engaging video content. Video player demos and showcase examples.",
    keywords: "video component demo, interactive video showcase, video player Long Island, video content Queens, multimedia solutions Brooklyn, video development Manhattan",
    canonical: "/video-demo/",
    ogTitle: "Video Component Demo | Interactive Video Showcase | Kingdom Design House",
    ogDescription: "Experience our interactive video components and see how we showcase our work through engaging video content.",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Video Component Demo",
      "description": "Interactive video showcase and component demonstrations",
      "url": "https://kingdomdesignhouse.com/video-demo/",
      "mainEntity": {
        "@type": "SoftwareApplication",
        "name": "Video Player Component",
        "description": "Interactive video player component for web applications"
      }
    }
  }
};

// Service page SEO data
export const serviceSeoData = {
  webDevelopment: {
    title: "Web Development Services | Custom Web Applications | Kingdom Design House | Long Island, NY",
    description: "Professional web development services in Long Island, NY. Custom web applications, e-commerce solutions, and scalable web development for businesses.",
    keywords: "web development Long Island, custom web applications Queens, web development Brooklyn, e-commerce development Manhattan, web development services NYC",
    canonical: "/web-group/services/web-development/",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Web Development Services",
      "description": "Professional web development services",
      "provider": {
        "@type": "Organization",
        "name": "Kingdom Design House"
      }
    }
  },
  
  webDesign: {
    title: "Web Design Services | Professional Website Design | Kingdom Design House | Long Island, NY",
    description: "Professional web design services in Long Island, NY. Custom website design, responsive design, and user experience optimization for businesses.",
    keywords: "web design Long Island, website design Queens, web design Brooklyn, responsive design Manhattan, UI/UX design NYC, custom website design Long Island",
    canonical: "/web-group/services/web-design/",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Web Design Services",
      "description": "Professional web design services",
      "provider": {
        "@type": "Organization",
        "name": "Kingdom Design House"
      }
    }
  },

  digitalMarketing: {
    title: "Digital Marketing Services | SEO & Online Marketing | Kingdom Design House | Long Island, NY",
    description: "Digital marketing services in Long Island, NY. SEO optimization, social media marketing, and online advertising solutions for business growth.",
    keywords: "digital marketing Long Island, SEO services Queens, online marketing Brooklyn, social media marketing Manhattan, digital advertising NYC, marketing agency Long Island",
    canonical: "/web-group/services/digital-marketing/",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Digital Marketing Services",
      "description": "Digital marketing and SEO services",
      "provider": {
        "@type": "Organization",
        "name": "Kingdom Design House"
      }
    }
  },

  support: {
    title: "Web Support & Maintenance Services | Ongoing Website Support | Kingdom Design House | Long Island, NY",
    description: "Professional web support and maintenance services in Long Island, NY. Ongoing website support, updates, and technical maintenance for businesses.",
    keywords: "web support Long Island, website maintenance Queens, web support Brooklyn, technical support Manhattan, website updates NYC, web maintenance Long Island",
    canonical: "/web-group/services/support/",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Web Support & Maintenance Services",
      "description": "Professional web support and maintenance services",
      "provider": {
        "@type": "Organization",
        "name": "Kingdom Design House"
      }
    }
  },

  aiDevelopment: {
    title: "AI Development Services | Custom AI Solutions | Kingdom Design House | Long Island, NY",
    description: "Professional AI development services in Long Island, NY. Custom AI solutions, machine learning applications, and intelligent automation for businesses.",
    keywords: "AI development Long Island, artificial intelligence Queens, AI solutions Brooklyn, machine learning Manhattan, AI consulting NYC, AI automation Long Island",
    canonical: "/ai-group/services/ai-development/",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "AI Development Services",
      "description": "Professional AI development and machine learning solutions",
      "provider": {
        "@type": "Organization",
        "name": "Kingdom Design House"
      }
    }
  },

  networkDesign: {
    title: "Network Design Services | IT Network Solutions | Kingdom Design House | Long Island, NY",
    description: "Professional network design services in Long Island, NY. IT network architecture, infrastructure planning, and enterprise networking solutions for businesses.",
    keywords: "network design Long Island, IT networking Queens, network architecture Brooklyn, enterprise networking Manhattan, IT infrastructure NYC, network solutions Long Island",
    canonical: "/network-group/services/network-design/",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Network Design Services",
      "description": "Professional network design and IT infrastructure solutions",
      "provider": {
        "@type": "Organization",
        "name": "Kingdom Design House"
      }
    }
  },

  networkOptimization: {
    title: "Network Optimization Services | IT Performance Solutions | Kingdom Design House | Long Island, NY",
    description: "Professional network optimization services in Long Island, NY. Network performance tuning, bandwidth optimization, and IT infrastructure enhancement for businesses.",
    keywords: "network optimization Long Island, IT performance Queens, network tuning Brooklyn, bandwidth optimization Manhattan, IT enhancement NYC, network solutions Long Island",
    canonical: "/network-group/services/network-optimization/",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Network Optimization Services",
      "description": "Professional network optimization and performance enhancement",
      "provider": {
        "@type": "Organization",
        "name": "Kingdom Design House"
      }
    }
  },

  networkSupport: {
    title: "Network Support Services | IT Support Solutions | Kingdom Design House | Long Island, NY",
    description: "Professional network support services in Long Island, NY. 24/7 network monitoring, maintenance, and technical support for business networks.",
    keywords: "network support Long Island, IT support Queens, network maintenance Brooklyn, technical support Manhattan, IT monitoring NYC, network services Long Island",
    canonical: "/network-group/services/network-support/",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Network Support Services",
      "description": "Professional network support and maintenance services",
      "provider": {
        "@type": "Organization",
        "name": "Kingdom Design House"
      }
    }
  },

  aiConsulting: {
    title: "AI Consulting Services | AI Strategy Solutions | Kingdom Design House | Long Island, NY",
    description: "Professional AI consulting services in Long Island, NY. AI strategy development, implementation planning, and intelligent automation consulting for businesses.",
    keywords: "AI consulting Long Island, artificial intelligence Queens, AI strategy Brooklyn, AI planning Manhattan, AI implementation NYC, AI services Long Island",
    canonical: "/ai-group/services/ai-consulting/",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "AI Consulting Services",
      "description": "Professional AI consulting and strategy development",
      "provider": {
        "@type": "Organization",
        "name": "Kingdom Design House"
      }
    }
  },

  aiSupport: {
    title: "AI Support Services | AI Maintenance Solutions | Kingdom Design House | Long Island, NY",
    description: "Professional AI support services in Long Island, NY. AI system maintenance, optimization, and ongoing support for intelligent automation systems.",
    keywords: "AI support Long Island, AI maintenance Queens, AI optimization Brooklyn, AI services Manhattan, AI systems NYC, AI support Long Island",
    canonical: "/ai-group/services/ai-support/",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "AI Support Services",
      "description": "Professional AI support and system maintenance",
      "provider": {
        "@type": "Organization",
        "name": "Kingdom Design House"
      }
    }
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
