import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import styles from '../../styles/Breadcrumbs.module.scss';
import { withTrailingSlash, toAbsoluteUrl } from '../../utils/url';

/**
 * Breadcrumbs Component
 * 
 * Displays hierarchical navigation breadcrumbs for SEO and user experience.
 * Implements structured data (Schema.org BreadcrumbList) for rich snippets.
 * 
 * @param {Object} props - Component props
 * @param {Array} props.customCrumbs - Optional custom breadcrumb path
 */
const Breadcrumbs = ({ customCrumbs }) => {
  const router = useRouter();
  const normalizedPath = router.asPath.split('?')[0].split('#')[0];
  const pathSegments = normalizedPath.split('/').filter(segment => segment);

  // Generate breadcrumbs from URL path
  const generateBreadcrumbs = () => {
    if (customCrumbs) {
      return customCrumbs;
    }

    const crumbs = [{ label: 'Home', href: '/' }];

    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      
      // Format segment label (capitalize, replace hyphens)
      const label = segment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      // Special handling: If segment is "services", link to homepage services section
      let href = currentPath;
      if (segment.toLowerCase() === 'services') {
        href = '/services/';
      }

      crumbs.push({
        label,
        href: withTrailingSlash(href),
        isLast: index === pathSegments.length - 1
      });
    });

    return crumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  // Generate JSON-LD structured data for breadcrumbs
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': crumb.label,
      'item': toAbsoluteUrl('https://kingdomdesignhouse.com', crumb.href)
    }))
  };

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      {/* Breadcrumb Navigation */}
      <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
        <ol className={styles.list}>
          {breadcrumbs.map((crumb, index) => (
            <li key={crumb.href} className={styles.item}>
              {crumb.isLast || index === breadcrumbs.length - 1 ? (
                <span className={styles.current} aria-current="page">
                  {crumb.label}
                </span>
              ) : (
                <>
                  <Link href={crumb.href} className={styles.link}>
                    {crumb.label}
                  </Link>
                  <span className={styles.separator} aria-hidden="true">
                    /
                  </span>
                </>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
};

export default Breadcrumbs;
