import { useEffect, useRef } from 'react';
import Script from 'next/script';
import { useRouter } from 'next/router';
import { useGDPR } from '../contexts/GDPRContext';
import { GA_MEASUREMENT_ID, captureAttribution, trackPageView } from '../utils/analytics';
import { normalizePath } from '../utils/acquisition';

export default function GoogleAnalytics() {
  const router = useRouter();
  const { consent } = useGDPR();
  const ready = useRef(false);
  useEffect(() => {
    if (!consent.analytics) return;
    const change = url => { captureAttribution(); if (ready.current) trackPageView(url); };
    // The initial view is emitted by onReady, subsequent navigation by this listener.
    router.events.on('routeChangeComplete', change);
    return () => router.events.off('routeChangeComplete', change);
  }, [consent.analytics, router.events]);
  if (!consent.analytics) return null;
  return <Script id="kdh-ga4" src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} strategy="afterInteractive" onReady={() => {
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
    window.gtag('consent', 'default', { analytics_storage: 'denied', ad_storage: 'denied' });
    window.gtag('consent', 'update', { analytics_storage: 'granted', ad_storage: consent.marketing ? 'granted' : 'denied' });
    window.gtag('js', new Date());
    window.gtag('config', GA_MEASUREMENT_ID, {
      send_page_view: false,
      page_location: `https://kingdomdesignhouse.com${normalizePath(window.location.pathname)}`,
      page_referrer: '',
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
    });
    ready.current = true;
    captureAttribution();
    trackPageView(router.asPath);
  }} />;
}
