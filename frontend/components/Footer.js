import React from 'react';
import styles from '../styles/Footer.module.scss';
import { useSiteData } from '../contexts/SiteDataContext';
import EmailIcon from './Atoms/EmailIcon';
import PhoneIcon from './Atoms/PhoneIcon';
            
const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { getFooterData } = useSiteData();
  const footerData = getFooterData();
  const {
    companyInfo,
    companyGroups, 
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
                href="mailto:info@kingdomdesignhouse.com" 
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
                {companyGroups.map((group, index) => (
                  <li key={index} className={styles.footer__links__item}>
                    <a href="#" className={styles.footer__links__link}>
                      {group}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Media */}
            <div className={styles.footer__links__section}>
              <h3 className={styles.footer__links__title}>Social Media</h3>
              <ul className={styles.footer__links__list}>
                {socialMedia.map((social, index) => (
                  <li key={index} className={styles.footer__links__item}>
                    <a href="#" className={styles.footer__links__link}>
                      {social}
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