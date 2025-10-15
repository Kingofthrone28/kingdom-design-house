import React from 'react';
import styles from '../styles/Footer.module.scss';
import { useSiteData } from '../contexts/SiteDataContext';
import { getNavbarData } from '../data/navbarData';
import EmailIcon from './Atoms/EmailIcon';
import PhoneIcon from './Atoms/PhoneIcon';
import Link from 'next/link';
            
const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { getFooterData } = useSiteData();
  const footerData = getFooterData();
  const navbarData = getNavbarData();
  const {navigation} = navbarData;
  const {
    companyInfo,
    webServices,
    networkServices,
    aiServices,
    socialMedia 
} = footerData;
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <div className={styles.footer__content}>
          {/* Left Side - Contact Info */}
          <div className={styles.footer__contact}>
            <div className={styles.footer__contact__item}>
              <span className={styles.footer__contact__label}><EmailIcon /></span>
              <a 
                href="mailto:kingdomdesignhouse@gmail.com" 
                className={styles.footer__contact__link}
              >
                {companyInfo.email}
              </a>
            </div>
            
            <div className={styles.footer__contact__item}>
              <span className={styles.footer__contact__label}><PhoneIcon /></span>
              <a 
                href={`tel: ${companyInfo.phone}`} 
                className={styles.footer__contact__link}
              >
                {companyInfo.phone}
              </a>
            </div>
            
            <div className={styles.footer__copyright}>
              Copyright {currentYear} Kingdom Design House LLC. All rights reserved.
            </div>
          </div>

          {/* Right Side - Links */}
          <div className={styles.footer__links}>
            {/* Company Groups */}
            <div className={styles.footer__links__section}>
              <h3 className={styles.footer__links__title}>Company Groups</h3>
              <ul className={styles.footer__links__list}>
                {navigation && navigation.map((group, index) => (
                  <li key={index} className={styles.footer__links__item}>
                    <Link href={group.route} className={styles.footer__links__link}>
                      {group.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* AI Services */}
            <div className={styles.footer__links__section}>
              <h3 className={styles.footer__links__title}>AI Solutions</h3>
              <ul className={styles.footer__links__list}>
                {aiServices && aiServices.map((service, index) => (
                  <li key={index} className={styles.footer__links__item}>
                    <Link href={service.url} className={styles.footer__links__link}>
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Web Services */}
            <div className={styles.footer__links__section}>
              <h3 className={styles.footer__links__title}>Web Services</h3>
              <ul className={styles.footer__links__list}>
                {webServices && webServices.map((service, index) => (
                  <li key={index} className={styles.footer__links__item}>
                    <Link href={service.url} className={styles.footer__links__link}>
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Network Services */}
            <div className={styles.footer__links__section}>
              <h3 className={styles.footer__links__title}>Network Services</h3>
              <ul className={styles.footer__links__list}>
                {networkServices && networkServices.map((service, index) => (
                  <li key={index} className={styles.footer__links__item}>
                    <Link href={service.url} className={styles.footer__links__link}>
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Media */}
            <div className={styles.footer__links__section}>
              <h3 className={styles.footer__links__title}>Social Media</h3>
              <ul className={styles.footer__links__list}>
                {socialMedia && socialMedia.map((social, index) => (
                  <li key={index} className={styles.footer__links__item}>
                    <a 
                      href={social.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={styles.footer__links__link}
                    >
                      {social.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;