import React, { useState } from 'react';
import Link from 'next/link';
import styles from '../../styles/Navbar.module.scss';
import PhoneIcon from '../Atoms/PhoneIcon';
import EmailIcon from '../Atoms/EmailIcon';
import Button from '../Atoms/Button';
import { getNavBarGroupData } from '../../data/navbarData';

const MobileMenu = ({ phone, email, navigation = [], onScrollToChat, groupName = 'webgroup' }) => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const navBarGroupData = getNavBarGroupData();
  const { navLinks, companyGroupsSubmenu, webServicesSubmenu, networkServicesSubmenu, aiServicesSubmenu } = navBarGroupData;

  const toggleDropdown = (dropdownName) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  const getCurrentServicesSubmenu = () => {
    const serviceMap = {
      'webgroup': webServicesSubmenu,
      'web-group': webServicesSubmenu,
      'networkgroup': networkServicesSubmenu,
      'network-group': networkServicesSubmenu,
      'aigroup': aiServicesSubmenu,
      'ai-group': aiServicesSubmenu
    };
    return serviceMap[groupName] || webServicesSubmenu;
  };

  return (
    <div className={styles.navbar__mobile__menu}>
      <div className={styles.navbar__mobile__contact}>
        <div className={styles.navbar__mobile__contact__item}>
          <PhoneIcon />
          <span>{phone}</span>
        </div>
        <div className={styles.navbar__mobile__contact__item}>
          <EmailIcon />
          <span>{email}</span>
        </div>
      </div>

      {/* Mobile Navigation with Dropdowns */}
      <div className={styles.navbar__mobile__groups}>
        {navLinks.map((link, index) => (
          <div key={index} className={styles.navbar__mobile__nav__item}>
            {link.hasSubmenu ? (
              <div className={styles.navbar__mobile__dropdown}>
                <button 
                  className={styles.navbar__mobile__dropdown__toggle}
                  onClick={() => toggleDropdown(link.name)}
                  aria-expanded={openDropdown === link.name}
                >
                  {link.name}
                  <span className={`${styles.navbar__mobile__dropdown__chevron} ${openDropdown === link.name ? styles['navbar__mobile__dropdown__chevron--open'] : ''}`}>
                    ▼
                  </span>
                </button>
                
                {openDropdown === link.name && (
                  <div className={styles.navbar__mobile__dropdown__menu}>
                    {link.name === 'Company Groups' ? (
                      companyGroupsSubmenu.map((item, itemIndex) => (
                        <Link 
                          key={itemIndex} 
                          href={item.route}
                          className={styles.navbar__mobile__dropdown__link}
                          onClick={() => setOpenDropdown(null)}
                        >
                          {item.name}
                        </Link>
                      ))
                    ) : link.name === 'Services' ? (
                      getCurrentServicesSubmenu().map((item, itemIndex) => (
                        <Link 
                          key={itemIndex} 
                          href={item.route}
                          className={styles.navbar__mobile__dropdown__link}
                          onClick={() => setOpenDropdown(null)}
                        >
                          {item.name}
                        </Link>
                      ))
                    ) : null}
                  </div>
                )}
              </div>
            ) : (
              <Link 
                href={link.route} 
                className={styles.navbar__mobile__groups__link}
                onClick={() => setOpenDropdown(null)}
              >
                {link.name}
              </Link>
            )}
          </div>
        ))}
      </div>

      {/* Mobile CTA Button */}
      <div className={styles.navbar__mobile__cta}>
        <Button variant="primary" size="large" onClick={onScrollToChat}>
          Get a Quote
        </Button>
      </div>
    </div>
  );
};

export default MobileMenu;
