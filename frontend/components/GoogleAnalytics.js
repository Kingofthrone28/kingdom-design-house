/**
 * @fileoverview Google Analytics Component
 * 
 * This component manages Google Analytics tracking with GDPR compliance.
 * It only loads and executes GA when the user has given consent.
 * 
 * @author Kingdom Design House Development Team
 * @version 1.0.0
 * @since 2024
 */

import { useEffect } from 'react';
import Script from 'next/script';
import { useRouter } from 'next/router';
import { useGDPRConsent } from '../hooks/useGDPRConsent';

const GA_MEASUREMENT_ID = 'G-BEKZ5DH50B';

const GoogleAnalytics = () => {
  const router = useRouter();
  const { canTrackAnalytics, consent } = useGDPRConsent();

  // Track page views when route changes
  useEffect(() => {
    if (!canTrackAnalytics()) {
      return;
    }

    const handleRouteChange = (url) => {
      // Send pageview with custom URL
      if (window.gtag) {
        window.gtag('config', GA_MEASUREMENT_ID, {
          page_path: url,
          anonymize_ip: true, // GDPR compliance
        });
      }
    };

    // Track initial page view
    handleRouteChange(router.pathname);

    // Subscribe to route changes
    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.pathname, router.events, canTrackAnalytics]);

  // Initialize gtag with consent settings
  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      // Update consent based on user preferences
      window.gtag('consent', 'update', {
        analytics_storage: canTrackAnalytics() ? 'granted' : 'denied',
        ad_storage: consent.marketing ? 'granted' : 'denied',
      });
    }
  }, [canTrackAnalytics, consent.marketing]);

  // Don't load GA if user hasn't consented
  if (!canTrackAnalytics()) {
    return null;
  }

  return (
    <>
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            
            gtag('consent', 'default', {
              'analytics_storage': 'granted',
              'ad_storage': '${consent.marketing ? 'granted' : 'denied'}',
              'anonymize_ip': true
            });
            
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
              anonymize_ip: true,
              cookie_flags: 'SameSite=None;Secure'
            });
          `,
        }}
      />
    </>
  );
};

export default GoogleAnalytics;
