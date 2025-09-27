import React from 'react';
import styles from '../../styles/WebStrategy.module.scss';
import { getWebStrategyData } from '../../data/siteData';
import Image from 'next/image';

const WebStrategy = () => {
  const strategyData = getWebStrategyData();
  const { steps, cta } = strategyData;

  return (
    <section className={styles.webStrategy}>
      <div className={styles.webStrategy__container}>
        {/* Vertical timeline line */}
        <div className={styles.webStrategy__timeline}></div>
        
        {/* Steps */}
        <div className={styles.webStrategy__steps}>
          {steps.map((step, index) => (
            <div 
              key={step.number} 
              className={`${styles.webStrategy__step} ${index % 2 === 0 ? styles.webStrategy__step__left : styles.webStrategy__step__right}`}
            >
              {/* Step content */}
              <div className={styles.webStrategy__step__content}>
                {/* Number circle */}
                <div className={styles.webStrategy__step__number}>
                  {step.number}
                </div>
                
                {/* Text content */}
                <div className={styles.webStrategy__step__text}>
                  <h3 className={styles.webStrategy__step__title}>
                    {step.title}
                  </h3>
                  <p className={styles.webStrategy__step__description}>
                    {step.description}
                  </p>
                </div>
              </div>
              
              {/* Icon */}
              <div className={styles.webStrategy__step__icon}>
                <Image src={step.image} alt={step.title} width={100} height={100} />
              </div>
            </div>
          ))}
        </div>
        
        {/* CTA Button */}
        <div className={styles.webStrategy__cta}>
          <button className={styles.webStrategy__cta__button}>
            {cta.text}
            <span className={styles.webStrategy__cta__arrow}>→</span>
          </button>
        </div>
      </div>
    </section>
  );
};



export default WebStrategy;