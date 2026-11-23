import React from 'react';
import styles from '../styles/PricingGroup.module.scss';
import Button from './Atoms/Button';

const PricingGroup = ({ 
  selectedGroup, 
  onGroupChange, 
  showTitle = true,
  className = '' 
}) => {
  return (
    <div className={`${styles.pricingGroup} ${className}`}>
      {showTitle && <h2 className={styles.pricingGroup__title}>Package details</h2>}
      <div className={styles.pricingGroup__tabs} role="group" aria-label="Choose a service group">
        <Button 
          className={`${styles.pricingGroup__tab} ${selectedGroup === 'web' ? styles['pricingGroup__tab--active'] : ''}`}
          onClick={() => onGroupChange('web')}
          aria-pressed={selectedGroup === 'web'}
        >
          Web Group
        </Button>
        <Button 
          className={`${styles.pricingGroup__tab} ${selectedGroup === 'network' ? styles['pricingGroup__tab--active'] : ''}`}
          onClick={() => onGroupChange('network')}
          aria-pressed={selectedGroup === 'network'}
        >
          Network Group
        </Button>
        <Button 
          className={`${styles.pricingGroup__tab} ${selectedGroup === 'ai' ? styles['pricingGroup__tab--active'] : ''}`}
          onClick={() => onGroupChange('ai')}
          aria-pressed={selectedGroup === 'ai'}
        >
          AI Group
        </Button>
      </div>
    </div>
  );
};

export default PricingGroup;
