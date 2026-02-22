import React, { useState } from 'react';
import Link from 'next/link';
import styles from '../styles/Navbar.module.scss';
import { getNavbarData } from '../data/navbarData';
import Button from './Atoms/Button';
import PhoneIcon from './Atoms/PhoneIcon';
import EmailIcon from './Atoms/EmailIcon';
import MobileMenu from './Molecules/MobileMenu';
import MobileToggle from './Atoms/MobileToggle';
import { withTrailingSlash } from '../utils/url';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navbarData = getNavbarData();
  const { phone, email } = navbarData.contact;
  const { buttonText, ariaLabel,route} = navbarData.cta;
  const { navigation = [] } = navbarData;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToChat = () => {
    const chatSection = document.getElementById('chat-jarvis');
    if (chatSection) {
      chatSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };
 

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar__container}>
        {/* Contact Info */}
        <div className={styles.navbar__contact}>
          <div className={styles.navbar__contact__item}>
            <PhoneIcon />
            <span className={styles.navbar__contact__phone}>{phone}</span>
          </div>
          <div className={styles.navbar__contact__item}>
            <EmailIcon />
            <span className={styles.navbar__contact__email}>{email}</span>
          </div>
        </div>

        {/* Navigation Links */}
        <div className={styles.navbar__groups}>
          {navigation.map((item, index) => (
            <Link key={index} href={withTrailingSlash(item.route)} className={styles.navbar__groups__link}>
              {item.name}
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        <Link href={withTrailingSlash(route)}>
          <Button variant="primary" size="large">
            {buttonText}
          </Button>
        </Link>   

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
            onScrollToChat={scrollToChat}
            groupName="webgroup"
          />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
