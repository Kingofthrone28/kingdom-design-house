import React from 'react';
import Link from 'next/link';
import { siteData } from '../../data/siteData';
import styles from '../../styles/ServicesSection.module.scss';
import { withTrailingSlash } from '../../utils/url';

/**
 * ServicesSection Component
 * 
 * Displays a comprehensive overview of all services organized by group
 * to improve internal linking and help search engines discover service pages.
 * This component enhances SEO by creating clear pathways to all service pages.
 * 
 * Services data is imported from the centralized siteData object.
 */
const ServicesSection = () => {
  const services = siteData.services;

  return (
    <section id="services" className={styles.servicesSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            Our <span className={styles.highlight}>Services</span>
          </h2>
          <p className={styles.subtitle}>
            Comprehensive solutions for your business needs
          </p>
        </div>

        <div className={styles.groupsGrid}>
          {Object.entries(services).map(([groupName, groupData]) => (
            <div key={groupName} className={styles.groupCard}>
              <h3 className={styles.groupTitle}>{groupName}</h3>
              <p className={styles.groupDescription}>{groupData.description}</p>
              
              <ul className={styles.servicesList}>
                {groupData.services.map((service) => (
                  <li key={service.slug} className={styles.serviceItem}>
                    <Link 
                      href={withTrailingSlash(`${groupData.basePath}/${service.slug}`)}
                      className={styles.serviceLink}
                    >
                      <span className={styles.serviceName}>{service.name}</span>
                      <span className={styles.serviceDescription}>{service.description}</span>
                      <span className={styles.arrow}>→</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
