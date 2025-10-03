import React from 'react';
import Link from 'next/link';
import { generateInternalLinks } from '../lib/seo';
import styles from '../styles/InternalLinks.module.scss';

/**
 * Internal Links Component for SEO
 * Provides contextual internal linking to improve page authority and user experience
 */
const InternalLinks = ({ currentPage, className = '' }) => {
  const links = generateInternalLinks(currentPage);
  
  return (
    <nav className={`${styles.internalLinks} ${className}`} aria-label="Related pages">
      <h3 className={styles.internalLinks__title}>Related Services</h3>
      <ul className={styles.internalLinks__list}>
        {links.map((link, index) => (
          <li key={index} className={styles.internalLinks__item}>
            <Link href={link.url} className={styles.internalLinks__link}>
              {link.text}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default InternalLinks;
