import React from 'react';
import Head from 'next/head';
import { seoConfig } from '../lib/seo';
import { toAbsoluteAssetUrl, toAbsoluteUrl } from '../utils/url';

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
  ogImage = '/images/kdh_logo.svg',
  ogType = 'website',
  structuredData,
  noindex = false,
  additionalMeta = []
}) => {
  const companyName = seoConfig.company.name;
  const fullTitle = title
    ? (title.toLowerCase().includes(companyName.toLowerCase()) ? title : `${title} | ${companyName}`)
    : companyName;
  const fullCanonical = toAbsoluteUrl(seoConfig.company.url, canonical || '/');
  const fullOgImage = toAbsoluteAssetUrl(seoConfig.company.url, ogImage);
  const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
  const bingVerification = process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION;

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description || seoConfig.company.description} />
      {keywords && <meta name="keywords" content={keywords} />}
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
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.svg" />
      <link rel="icon" type="image/svg+xml" sizes="32x32" href="/favicon-32x32.svg" />
      <link rel="icon" type="image/svg+xml" sizes="16x16" href="/favicon-16x16.svg" />
      <link rel="manifest" href="/site.webmanifest" />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={ogTitle || fullTitle} />
      <meta property="og:description" content={ogDescription || description || seoConfig.company.description} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:site_name" content={seoConfig.company.name} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:image:secure_url" content={fullOgImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={ogTitle || fullTitle} />
      <meta property="og:locale" content="en_US" />
      
      {/* Business-specific Open Graph tags */}
      <meta property="business:contact_data:street_address" content="3 Charlick Place" />
      <meta property="business:contact_data:locality" content="Freeport" />
      <meta property="business:contact_data:region" content="NY" />
      <meta property="business:contact_data:postal_code" content="11520" />
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
      
      {/* Site verification tags should only be present with real values */}
      {googleVerification && <meta name="google-site-verification" content={googleVerification} />}
      {bingVerification && <meta name="msvalidate.01" content={bingVerification} />}
      
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
