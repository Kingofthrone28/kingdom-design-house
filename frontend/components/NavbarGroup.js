import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/navBarGroup.module.scss';
import { getGroupsData } from '../data/siteData';
import { getNavbarData, getNavBarGroupData } from '../data/navbarData';
import { withTrailingSlash } from '../utils/url';
import { scrollToChatOrContact } from '../utils/navigation';
import PhoneIcon from './Atoms/PhoneIcon';
import EmailIcon from './Atoms/EmailIcon';
import MobileMenu from './Molecules/MobileMenu';
import MobileToggle from './Atoms/MobileToggle';

const NavbarGroup = ({ groupName = 'webgroup' }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const groups = getGroupsData();
  const navbar = getNavbarData();
  const menus = getNavBarGroupData();
  const currentGroup = groups.find((group) => group.id === groupName) || groups[0];
  const serviceMenus = {
    webgroup: menus.webServicesSubmenu,
    'web-group': menus.webServicesSubmenu,
    networkgroup: menus.networkServicesSubmenu,
    'network-group': menus.networkServicesSubmenu,
    aigroup: menus.aiServicesSubmenu,
    'ai-group': menus.aiServicesSubmenu
  };
  const submenuFor = (name) => (
    name === 'Company Groups'
      ? menus.companyGroupsSubmenu
      : serviceMenus[groupName] || menus.webServicesSubmenu
  );

  return (
    <nav className={styles.navBarGroup}>
      <div className={styles.navBarGroup__container}>
        <div className={styles.navBarGroup__logo}>
          <Link href="/">
            <div className={styles.navBarGroup__logo__content}>
              <div className={styles.navBarGroup__logo__groupLogo}>
                <Image src={currentGroup.logo} alt={`${currentGroup.title} Logo`} width={150} height={150} />
              </div>
            </div>
          </Link>
        </div>
        <div className={styles.navBarGroup__nav}>
          {menus.navLinks.map((link) => (
            <div key={link.name} className={link.hasSubmenu ? styles.navBarGroup__nav__item__hasSubmenu : styles.navBarGroup__nav__item}>
              {link.hasSubmenu ? (
                <div className={styles.navBarGroup__nav__dropdown}>
                  <div className={styles.navBarGroup__nav__link}>
                    {link.name}
                    <span className={styles.navBarGroup__nav__chevron}>▼</span>
                    <div className={styles.navBarGroup__nav__submenu}>
                      {submenuFor(link.name).map((item) => (
                        <Link key={item.route} href={withTrailingSlash(item.route)} className={styles.navBarGroup__nav__submenu__link}>
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link href={withTrailingSlash(link.route)} className={styles.navBarGroup__nav__link}>{link.name}</Link>
              )}
            </div>
          ))}
        </div>
        <MobileToggle
          isOpen={isMenuOpen}
          onToggle={() => setIsMenuOpen((open) => !open)}
          ariaLabel={navbar.cta.ariaLabel}
        />
        {isMenuOpen && (
          <MobileMenu
            phone={navbar.contact.phone}
            email={navbar.contact.email}
            navigation={navbar.navigation || []}
            onScrollToChat={() => scrollToChatOrContact()}
            groupName={groupName}
          />
        )}
        <div className={styles.navBarGroup__contact}>
          <div className={styles.navBarGroup__contact__item}>
            <PhoneIcon />
            <span className={styles.navBarGroup__contact__text}>{navbar.contact.phone}</span>
          </div>
          <div className={styles.navBarGroup__contact__item}>
            <EmailIcon />
            <span className={styles.navBarGroup__contact__text}>{navbar.contact.email}</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarGroup;
