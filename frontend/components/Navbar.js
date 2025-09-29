import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '../styles/Navbar.module.scss';
import { getNavbarData } from '../data/navbarData';
import ChatInterface from './ChatInterface';
import Button from './Atoms/Button';
import PhoneIcon from './Atoms/PhoneIcon';
import EmailIcon from './Atoms/EmailIcon';
import MobileMenu from './Molecules/MobileMenu';
import MobileToggle from './Atoms/MobileToggle';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const navbarData = getNavbarData();
  const { phone, email } = navbarData.contact;
  const { buttonText, ariaLabel} = navbarData.cta;
  const { navigation = [] } = navbarData;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
 
  const toggleChat = () => {
    
      const chatInterface = document.querySelector('.chat-interface');
      if (chatInterface) {
        chatInterface.style.display = 'block';
      }else{
        const chatInterface = document.createElement('div');
        chatInterface.className = 'chat-interface';
        chatInterface.style.display = 'block';
        document.body.appendChild(chatInterface);
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
            <Link key={index} href={item.route} className={styles.navbar__groups__link}>
              {item.name}
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        <Button variant="primary" size="large" onClick={toggleChat}>
          {buttonText}
        </Button>

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
      </div>
    </nav>
  );
};

export default Navbar;