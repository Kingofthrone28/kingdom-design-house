import React from 'react';
import { useLayout } from '../../contexts/LayoutContext';
import styles from '../../styles/LayoutToggle.module.scss';

const LayoutToggle = ({ className = '' }) => {
  const { serviceLayout, toggleServiceLayout } = useLayout();

  return (
    <div className={`${styles.layoutToggle} ${className}`}>
      <button
        onClick={toggleServiceLayout}
        className={styles.layoutToggle__button}
        aria-label={`Switch to ${serviceLayout === '3-column' ? '2-column' : '3-column'} layout`}
        title={`Switch to ${serviceLayout === '3-column' ? '2-column' : '3-column'} layout`}
      >
        <div className={styles.layoutToggle__icon}>
          {serviceLayout === '3-column' ? (
            // 2-column icon
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="18" rx="1"/>
              <rect x="14" y="3" width="7" height="18" rx="1"/>
            </svg>
          ) : (
            // 3-column icon
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="5" height="18" rx="1"/>
              <rect x="10" y="3" width="5" height="18" rx="1"/>
              <rect x="17" y="3" width="4" height="18" rx="1"/>
            </svg>
          )}
        </div>
        <span className={styles.layoutToggle__label}>
          {serviceLayout === '3-column' ? '2-Column' : '3-Column'}
        </span>
      </button>
    </div>
  );
};

export default LayoutToggle;