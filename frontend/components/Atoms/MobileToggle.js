import React from 'react';
import styles from '../../styles/MobileToggle.module.scss';

const MobileToggle = ({ isOpen, onToggle, ariaLabel }) => {
  return (
    <button 
      className={styles.mobileToggle}
      onClick={onToggle}
      aria-label={ariaLabel}
    >
      {!isOpen ? (
        <>
          <span className={styles.mobileToggle__hamburger}></span>
          <span className={styles.mobileToggle__hamburger}></span>
          <span className={styles.mobileToggle__hamburger}></span>
        </>
      ) : (
        <span className={styles.mobileToggle__close}>X</span>
      )}
    </button>
  );
};

export default MobileToggle;