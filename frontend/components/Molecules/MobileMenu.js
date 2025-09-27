import React from 'react';
import Link from 'next/link';
import styles from '../../styles/Navbar.module.scss';
import PhoneIcon from '../Atoms/PhoneIcon';
import EmailIcon from '../Atoms/EmailIcon';

const MobileMenu = ({ phone, email, navigation = [] }) => {
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

      {/* Mobile Navigation */}
      <div className={styles.navbar__mobile__groups}>
        {navigation.map((item, index) => (
          <Link key={index} href={item.route} className={styles.navbar__mobile__groups__link}>
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MobileMenu;
