import React from 'react';
import styles from '../../styles/PricingToggle.module.scss';

const PricingToggle = ({ 
  isMonthly = false, 
  onToggle, 
  className = '' 
}) => {
  return (
    <div className={`${styles.pricingToggle} ${className}`}>
      <button
        onClick={onToggle}
        className={styles.pricingToggle__button}
        aria-label={`Switch to ${isMonthly ? 'Total Amount' : 'Monthly'} pricing`}
      >
        <div className={styles.pricingToggle__track}>
          <div className={`${styles.pricingToggle__slider} ${isMonthly ? styles['pricingToggle__slider--monthly'] : styles['pricingToggle__slider--total']}`}>
            <span className={styles.pricingToggle__label}>
              {isMonthly ? 'Monthly' : 'Total Amount'}
            </span>
          </div>
        </div>
        <div className={styles.pricingToggle__arrow}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </div>
      </button>
    </div>
  );
};

export default PricingToggle;