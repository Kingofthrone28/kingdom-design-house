import React from 'react';
import styles from '../../styles/PlanTypeSelector.module.scss';

const PlanTypeSelector = ({ className = '' }) => {
  return (
    <div className={`${styles.planTypeSelector} ${className}`}>
      <div className={styles.planTypeSelector__header}>
        <h2 className={styles.planTypeSelector__title}>
          Select a plan type
        </h2>
        <p className={styles.planTypeSelector__description}>
          An option to pay monthly or deposit of total amount to start a project.
        </p>
      </div>

      <div className={styles.planTypeSelector__infoBox}>
        <div className={styles.planTypeSelector__option}>
          <h3 className={styles.planTypeSelector__optionTitle}>Monthly</h3>
          <p className={styles.planTypeSelector__optionDescription}>
            A budget friendly option to finance your one time setup for 3 or 6 months.
          </p>
        </div>
        
        <div className={styles.planTypeSelector__divider}></div>
        
        <div className={styles.planTypeSelector__option}>
          <h3 className={styles.planTypeSelector__optionTitle}>Total amount</h3>
          <p className={styles.planTypeSelector__optionDescription}>
            An option to pay one time setup in full or choose a percentage to start the project with a balance at the end.
          </p>
        </div>
      </div>

      <p className={styles.planTypeSelector__footnote}>
        *see full details below, financing only included on one time setup.
      </p>
    </div>
  );
};

export default PlanTypeSelector;