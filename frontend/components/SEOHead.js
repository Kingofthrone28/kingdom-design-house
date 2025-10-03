import React from 'react';
import Head from 'next/head';
import { seoConfig } from '../lib/seo';

/**
 * Comprehensive SEO Head Component
 * Handles all SEO meta tags, Open Graph, Twitter Cards, and structured data
 */
const SEOHead = ({ 
  title,
  description,
  keywords,
  canonical,
  ogTitle,
  ogDescription,
  ogImage = '/images/og-default.jpg',
  ogType = 'website',
  structuredData,
  noindex = false,
  additionalMeta = []
}) => {
  const fullTitle = title ? `${title} | ${seoConfig.company.name}` : seoConfig.company.name;
  const fullCanonical = canonical ? `${seoConfig.company.url}${canonical}` : seoConfig.company.url;
  const fullOgImage = ogImage.startsWith('http') ? ogImage : `${seoConfig.company.url}${ogImage}`;

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description || seoConfig.company.description} />
      <meta name="keywords" content={keywords} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="robots" content={noindex ? "noindex,nofollow" : "index,follow"} />
      <meta name="author" content={seoConfig.company.name} />
      <meta name="language" content="en-US" />
      <meta name="geo.region" content="US-NY" />
      <meta name="geo.placename" content="Long Island, New York" />
      <meta name="geo.position" content={`${seoConfig.location.coordinates.latitude};${seoConfig.location.coordinates.longitude}`} />
      <meta name="ICBM" content={`${seoConfig.location.coordinates.latitude}, ${seoConfig.location.coordinates.longitude}`} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullCanonical} />
      
      {/* Favicon and Icons */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={ogTitle || fullTitle} />
      <meta property="og:description" content={ogDescription || description || seoConfig.company.description} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:site_name" content={seoConfig.company.name} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={ogTitle || fullTitle} />
      <meta property="og:locale" content="en_US" />
      
      {/* Business-specific Open Graph tags */}
      <meta property="business:contact_data:street_address" content="Long Island, New York" />
      <meta property="business:contact_data:locality" content="Long Island" />
      <meta property="business:contact_data:region" content="NY" />
      <meta property="business:contact_data:postal_code" content="11501" />
      <meta property="business:contact_data:country_name" content="United States" />
      <meta property="business:contact_data:phone_number" content={seoConfig.company.phone} />
      <meta property="business:contact_data:email" content={seoConfig.company.email} />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={seoConfig.social.twitter} />
      <meta name="twitter:creator" content={seoConfig.social.twitter} />
      <meta name="twitter:title" content={ogTitle || fullTitle} />
      <meta name="twitter:description" content={ogDescription || description || seoConfig.company.description} />
      <meta name="twitter:image" content={fullOgImage} />
      <meta name="twitter:image:alt" content={ogTitle || fullTitle} />
      
      {/* Additional SEO Meta Tags */}
      <meta name="theme-color" content="#1a365d" />
      <meta name="msapplication-TileColor" content="#1a365d" />
      <meta name="msapplication-config" content="/browserconfig.xml" />
      
      {/* Local Business Schema */}
      <meta name="google-site-verification" content="your-google-verification-code" />
      <meta name="bing-site-verification" content="your-bing-verification-code" />
      
      {/* Structured Data */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData)
          }}
        />
      )}
      
      {/* Additional Meta Tags */}
      {additionalMeta.map((meta, index) => (
        <meta key={index} {...meta} />
      ))}
    </Head>
  );
};

export default SEOHead;
