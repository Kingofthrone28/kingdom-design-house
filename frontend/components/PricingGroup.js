import React from 'react';
import styles from '../styles/PricingGroup.module.scss';
import Button from './Atoms/Button';

const PricingGroup = ({ 
  selectedGroup, 
  onGroupChange, 
  className = '' 
}) => {
  return (
    <div className={`${styles.pricingGroup} ${className}`}>
      <h1 className={styles.pricingGroup__title}>Pricing Plans</h1>
      <div className={styles.pricingGroup__tabs}>
        <Button 
          className={`${styles.pricingGroup__tab} ${selectedGroup === 'web' ? styles['pricingGroup__tab--active'] : ''}`}
          onClick={() => onGroupChange('web')}
        >
          Web Group
        </Button>
        <Button 
          className={`${styles.pricingGroup__tab} ${selectedGroup === 'network' ? styles['pricingGroup__tab--active'] : ''}`}
          onClick={() => onGroupChange('network')}
        >
          Network Group
        </Button>
        <Button 
          className={`${styles.pricingGroup__tab} ${selectedGroup === 'ai' ? styles['pricingGroup__tab--active'] : ''}`}
          onClick={() => onGroupChange('ai')}
        >
          AI Group
        </Button>
      </div>
    </div>
  );
};

export default PricingGroup;