import React from 'react';

/**
 * StructuredData Component
 * 
 * Implements Schema.org structured data for rich snippets and improved SEO.
 * Consolidates all JSON-LD into a single @graph for cleaner structure.
 * 
 * @param {Object} props - Component props
 * @param {Object} props.page - Optional page-specific data
 * @param {string} props.page.url - Page URL
 * @param {string} props.page.name - Page name
 * @param {Array} props.page.breadcrumbs - Optional breadcrumb array
 */
const StructuredData = ({ page }) => {
  const siteUrl = 'https://kingdomdesignhouse.com';
  const orgId = `${siteUrl}/#organization`;
  const lbId = `${siteUrl}/#localbusiness`;
  const webSiteId = `${siteUrl}/#website`;
  const webPageId = page?.url ? `${page.url}#webpage` : `${siteUrl}/#webpage`;

  // Build BreadcrumbList from props (optional)
  const breadcrumb = page?.breadcrumbs?.length
    ? {
        '@type': 'BreadcrumbList',
        '@id': `${webPageId}-breadcrumbs`,
        itemListElement: page.breadcrumbs.map((b, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: b.name,
          ...(b.url ? { item: b.url } : {})
        }))
      }
    : null;

  const graph = [
    // WebSite with SearchAction
    {
      '@type': 'WebSite',
      '@id': webSiteId,
      url: siteUrl,
      name: 'Kingdom Design House',
      publisher: { '@id': orgId },
      potentialAction: {
        '@type': 'SearchAction',
        target: `${siteUrl}/?s={search_term_string}`,
        'query-input': 'required name=search_term_string'
      }
    },

    // WebPage (generic; override per page via props)
    {
      '@type': 'WebPage',
      '@id': webPageId,
      url: page?.url || siteUrl,
      name: page?.name || 'Kingdom Design House',
      isPartOf: { '@id': webSiteId },
      inLanguage: 'en-US'
    },

    // Organization (entity)
    {
      '@type': 'Organization',
      '@id': orgId,
      name: 'Kingdom Design House',
      legalName: 'Kingdom Design House LLC',
      url: siteUrl,
      logo: `${siteUrl}/images/logo.png`,
      description:
        'Full-service technology company offering AI solutions, web development, and network services for businesses in Long Island, NY.',
      email: 'kingdomdesignhouse@gmail.com',
      telephone: '+1-347-927-8846',
      sameAs: [
        'https://www.linkedin.com/company/kingdom-design-house',
        'https://www.instagram.com/kingdomdesignhouse'
      ],
      foundingDate: '2020',
      numberOfEmployees: {
        '@type': 'QuantitativeValue',
        minValue: 5,
        maxValue: 10
      },
      // Link to the physical location entity
      location: { '@id': lbId },
      knowsAbout: [
        'Web Development',
        'IT Services',
        'Networking Solutions',
        'AI Solutions',
        'React Development',
        'Node.js',
        'Python',
        'Cloud Computing'
      ]
    },

    // LocalBusiness (physical presence / service area)
    {
      '@type': 'LocalBusiness',
      '@id': lbId,
      name: 'Kingdom Design House',
      image: `${siteUrl}/images/logo.png`,
      url: siteUrl,
      telephone: '+1-347-927-8846',
      email: 'kingdomdesignhouse@gmail.com',
      priceRange: '$$-$$$',
      // No street address provided to avoid NAP confusion
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Long Island',
        addressRegion: 'NY',
        postalCode: '11501',
        addressCountry: 'US'
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 40.7891,
        longitude: -73.135
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: [
            'https://schema.org/Monday',
            'https://schema.org/Tuesday',
            'https://schema.org/Wednesday',
            'https://schema.org/Thursday',
            'https://schema.org/Friday'
          ],
          opens: '09:00',
          closes: '18:00'
        }
      ],
      areaServed: [
        { '@type': 'AdministrativeArea', name: 'Long Island, NY' },
        { '@type': 'AdministrativeArea', name: 'Queens, NY' },
        { '@type': 'AdministrativeArea', name: 'Brooklyn, NY' },
        { '@type': 'AdministrativeArea', name: 'Manhattan, NY' },
        { '@type': 'State', name: 'New York' }
      ]
    },

    // AI Service
    {
      '@type': 'Service',
      '@id': `${siteUrl}/#service-ai`,
      name: 'AI Solutions',
      description:
        'Artificial Intelligence consulting, implementation, and support including chatbots, automation, and ML solutions.',
      provider: { '@id': orgId },
      areaServed: { '@type': 'State', name: 'New York' },
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
    },

    // Web Development Service
    {
      '@type': 'Service',
      '@id': `${siteUrl}/#service-web`,
      name: 'Web Development Services',
      description:
        'Professional web development, design, and digital marketing for businesses.',
      provider: { '@id': orgId },
      areaServed: { '@type': 'State', name: 'New York' },
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
              description: 'User-centered responsive web design'
            }
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Technical SEO',
              description:
                'SEO focused on site architecture, Core Web Vitals, schema, and index management'
            }
          }
        ]
      }
    },

    // Network Service
    {
      '@type': 'Service',
      '@id': `${siteUrl}/#service-network`,
      name: 'Network Services',
      description: 'Networking, infrastructure design, and IT support.',
      provider: { '@id': orgId },
      areaServed: { '@type': 'State', name: 'New York' },
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
              description: 'Monitoring and maintenance'
            }
          }
        ]
      }
    }
  ];

  // Add breadcrumb if provided
  if (breadcrumb) {
    graph.push(breadcrumb);
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': graph
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};

export default StructuredData;

