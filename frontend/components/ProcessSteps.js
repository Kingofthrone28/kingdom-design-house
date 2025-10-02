import React from 'react';
import styles from  '../styles/ProcessSteps.module.scss';
import { useSiteData } from '../contexts/SiteDataContext';

const ProcessSteps = () => {
  const { getProcessData } = useSiteData();
  const processData = getProcessData() || {};
  const { steps: processSteps = [], principles = [], principlesTitle } = processData;

  return (
    <section className={styles.processSteps}>
      <div className={styles.processSteps__container}>
        <div className={styles.processSteps__header}>
          <h2 className={styles.processSteps__title}>
            Our <span className={styles.processSteps__title__highlight}>Process</span>
          </h2>
        </div>

        <div className={styles.processSteps__content}>
          {/* Left Side - Principles */}
          <div className={styles.processSteps__principles}>
            <h3 className={styles.processSteps__principles__title}>{principlesTitle}</h3>
            <ul className={styles.processSteps__principles__list}>
              {principles.map((principle, index) => (
                <li key={index} className={styles.processSteps__principles__item}>
                  <div className={styles.processSteps__principles__bullet}></div>
                  <span className={styles.processSteps__principles__text}>{principle}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Side - Process Flow */}
          <div className={styles.processSteps__flow}>
            <div className={styles.processSteps__flow__container}>
              {processSteps.map((step, index) => (
                <React.Fragment key={step.number}>
                  <div className={styles.processSteps__step}>
                    <div className={styles.processSteps__step__number}>
                      {step.number}
                    </div>
                    <div className={styles.processSteps__step__title}>
                      {step.title}
                    </div>
                  </div>
                  
                   {/* Arrow between steps */}
                   {index < processSteps.length - 1 && (
                     <div className={styles.processSteps__arrow}/>
        
                   )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className={styles.processSteps__decoration}>
          <div className={styles.processSteps__decoration__circle}></div>
          <div className={styles.processSteps__decoration__circle}></div>
          <div className={styles.processSteps__decoration__circle}></div>
        </div>
      </div>
        {/* Diagonal Separator */}
        <div className={styles.processSteps__decoration__separator}/>
    </section>
  );
};

export default ProcessSteps;