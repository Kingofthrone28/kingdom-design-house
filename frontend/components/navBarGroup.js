import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/navBarGroup.module.scss';
import { getGroupsData } from '../data/siteData';
import { getNavbarData, getNavBarGroupData } from '../data/navbarData';
import PhoneIcon from './Atoms/PhoneIcon';
import EmailIcon from './Atoms/EmailIcon';
import MobileMenu from './Molecules/MobileMenu';
import MobileToggle from './Atoms/MobileToggle';

const NavBarGroup = ({ groupName = 'webgroup' }) => {
  const groupData = getGroupsData();
  const navbarData = getNavbarData();
  const navBarGroupData = getNavBarGroupData();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { phone, email } = navbarData.contact;
  const { ariaLabel } = navbarData.cta;
  const { navigation = [] } = navbarData;
  const currentGroup = groupData.find(group => group.id === groupName) || groupData[0];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  // Navigation links from siteData
  const { navLinks, servicesSubmenu } = navBarGroupData;

  return (
    <nav className={styles.navBarGroup}>
      <div className={styles.navBarGroup__container}>
        {/* Logo Section */}
        <div className={styles.navBarGroup__logo}>
          <Link href="/">
            <div className={styles.navBarGroup__logo__content}>
              <div className={styles.navBarGroup__logo__groupLogo}>
                <Image 
                  src={currentGroup.logo} 
                  alt={`${currentGroup.title} Logo`}
                  width={150} 
                  height={150}
                />
              </div>
            </div>
          </Link>
        </div>

        {/* Navigation Links */}
        <div className={styles.navBarGroup__nav}>
          {navLinks.map((link, index) => (
            <div key={index} className={`${link.hasSubmenu ? styles.navBarGroup__nav__item__hasSubmenu : styles.navBarGroup__nav__item}`}>
              {link.hasSubmenu ? (
                <div className={styles.navBarGroup__nav__dropdown}>
                  <div className={`${styles.navBarGroup__nav__link}`}>
                    {link.name}
                    <span className={styles.navBarGroup__nav__chevron}>▼</span>
                    
                      <div className={styles.navBarGroup__nav__submenu}>
                        {servicesSubmenu.map((service, serviceIndex) => (
                        <Link 
                          key={serviceIndex} 
                          href={service.route}
                          className={styles.navBarGroup__nav__submenu__link}
                        >
                          {service.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link href={link.route} className={styles.navBarGroup__nav__link}>
                  {link.name}
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <MobileToggle 
          isOpen={isMenuOpen}
          onToggle={toggleMenu}
          ariaLabel={ariaLabel}
        />

        {/* Mobile Menu */}
        {isMenuOpen && (
          <MobileMenu 
            phone={phone}
            email={email}
            navigation={navigation}
          />
        )}

        {/* Contact Information */}
        <div className={styles.navBarGroup__contact}>
          <div className={styles.navBarGroup__contact__item}>
            <PhoneIcon />
            <span className={styles.navBarGroup__contact__text}>
              {phone}
            </span>
          </div>
          <div className={styles.navBarGroup__contact__item}>
            <EmailIcon />
            <span className={styles.navBarGroup__contact__text}>
              {email}
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBarGroup;