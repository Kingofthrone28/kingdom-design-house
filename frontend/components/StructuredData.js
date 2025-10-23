import React from 'react';

/**
 * StructuredData Component
 * 
 * Implements Schema.org structured data for rich snippets and improved SEO.
 * Includes Organization, LocalBusiness, and Service schemas.
 */
const StructuredData = () => {
  // Enhanced Organization Schema with GEO/AIO optimization
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://kingdomdesignhouse.com/#organization',
    name: 'Kingdom Design House',
    legalName: 'Kingdom Design House LLC',
    url: 'https://kingdomdesignhouse.com',
    logo: 'https://kingdomdesignhouse.com/images/logo.png',
    description: 'Full-service technology company offering AI solutions, web development, and network services for businesses in Long Island, NY.',
    email: 'kingdomdesignhouse@gmail.com',
    telephone: '+1-347-927-8846',
    // GEO Optimization - Enhanced geographic data
    address: {
      '@type': 'PostalAddress',
      addressRegion: 'NY',
      addressLocality: 'Long Island',
      addressCountry: 'US',
      postalCode: '11501',
      streetAddress: 'Long Island, New York'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '40.7891',
      longitude: '-73.1347'
    },
    // Enhanced area served with detailed geographic entities
    areaServed: [
      {
        '@type': 'City',
        name: 'Long Island',
        containedInPlace: {
          '@type': 'State',
          name: 'New York'
        }
      },
      {
        '@type': 'City',
        name: 'Queens',
        containedInPlace: {
          '@type': 'State',
          name: 'New York'
        }
      },
      {
        '@type': 'City',
        name: 'Brooklyn',
        containedInPlace: {
          '@type': 'State',
          name: 'New York'
        }
      },
      {
        '@type': 'City',
        name: 'Manhattan',
        containedInPlace: {
          '@type': 'State',
          name: 'New York'
        }
      }
    ],
    // AIO Optimization - Enhanced entity relationships
    knowsAbout: [
      'Web Development',
      'IT Services',
      'Networking Solutions',
      'AI Solutions',
      'React Development',
      'Node.js',
      'Python',
      'Cloud Computing'
    ],
    hasCredential: [
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'AWS Certified',
        description: 'Amazon Web Services certification'
      },
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'Microsoft Certified',
        description: 'Microsoft technology certification'
      }
    ],
    foundingDate: '2020',
    numberOfEmployees: '5-10',
    sameAs: [
      'https://www.linkedin.com/company/kingdom-design-house',
      'https://www.instagram.com/kingdomdesignhouse'
    ]
  };

  // LocalBusiness Schema
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://kingdomdesignhouse.com/#localbusiness',
    name: 'Kingdom Design House',
    image: 'https://kingdomdesignhouse.com/images/logo.png',
    url: 'https://kingdomdesignhouse.com',
    telephone: '+1-347-927-8846',
    email: 'kingdomdesignhouse@gmail.com',
    priceRange: '$$-$$$',
    address: {
      '@type': 'PostalAddress',
      addressRegion: 'NY',
      addressLocality: 'Long Island',
      addressCountry: 'US'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 40.7891,
      longitude: -73.1350
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00'
    }
  };

  // Service Schemas
  const aiServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': 'https://kingdomdesignhouse.com/#ai-service',
    name: 'AI Solutions',
    description: 'Artificial Intelligence consulting, implementation, and support services including chatbots, automation, and machine learning solutions.',
    provider: {
      '@id': 'https://kingdomdesignhouse.com/#organization'
    },
    areaServed: {
      '@type': 'State',
      name: 'New York'
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'AI Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'AI Consulting',
            description: 'Strategic AI implementation and planning services'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'AI Support',
            description: 'Ongoing AI system maintenance and optimization'
          }
        }
      ]
    }
  };

  const webServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': 'https://kingdomdesignhouse.com/#web-service',
    name: 'Web Development Services',
    description: 'Professional web development, design, and digital marketing services for businesses.',
    provider: {
      '@id': 'https://kingdomdesignhouse.com/#organization'
    },
    areaServed: {
      '@type': 'State',
      name: 'New York'
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Web Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Web Development',
            description: 'Custom web applications and platforms'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Web Design',
            description: 'Beautiful, user-centered design solutions'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Digital Marketing',
            description: 'SEO, content, and growth strategies'
          }
        }
      ]
    }
  };

  const networkServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': 'https://kingdomdesignhouse.com/#network-service',
    name: 'Network Services',
    description: 'Enterprise networking, infrastructure design, and IT support services.',
    provider: {
      '@id': 'https://kingdomdesignhouse.com/#organization'
    },
    areaServed: {
      '@type': 'State',
      name: 'New York'
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Network Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Network Design',
            description: 'Custom network architecture and planning'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Network Optimization',
            description: 'Performance tuning and enhancement'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Network Support',
            description: '24/7 network monitoring and maintenance'
          }
        }
      ]
    }
  };

  // GEO Optimization - Geographic Entity Schema
  const geographicEntitySchema = {
    '@context': 'https://schema.org',
    '@type': 'Place',
    '@id': 'https://kingdomdesignhouse.com/#place',
    name: 'Long Island, New York',
    description: 'Primary service area for Kingdom Design House technology services',
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '40.7891',
      longitude: '-73.1347'
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Long Island',
      addressRegion: 'NY',
      addressCountry: 'US'
    },
    containedInPlace: {
      '@type': 'State',
      name: 'New York',
      addressRegion: 'NY'
    }
  };

  // AIO Optimization - AI Entity Schema
  const aiEntitySchema = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    '@id': 'https://kingdomdesignhouse.com/#ai-entity',
    headline: 'AI Solutions and Technology Services',
    description: 'Comprehensive AI and technology services including web development, IT solutions, and intelligent automation',
    author: {
      '@type': 'Organization',
      name: 'Kingdom Design House'
    },
    about: [
      {
        '@type': 'Thing',
        name: 'Artificial Intelligence',
        description: 'AI solutions and intelligent automation services'
      },
      {
        '@type': 'Thing',
        name: 'Web Development',
        description: 'Custom web applications and digital solutions'
      },
      {
        '@type': 'Thing',
        name: 'IT Services',
        description: 'Information technology support and infrastructure'
      }
    ],
    mentions: [
      'React',
      'Node.js',
      'Python',
      'Machine Learning',
      'Cloud Computing',
      'AWS',
      'Microsoft Azure'
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(geographicEntitySchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aiEntitySchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aiServiceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webServiceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(networkServiceSchema) }}
      />
    </>
  );
};

export default StructuredData;

