import React from 'react';
import styles from '../../styles/CaseStudyThreeStep.module.scss';

const CaseStudyThreeStep = ({ steps }) => {
  const getIcon = (title) => {
    const iconMap = {
      'Objectives': (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
      ),
      'Challenges': (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
          <line x1="12" y1="9" x2="12" y2="13"></line>
          <line x1="12" y1="17" x2="12.01" y2="17"></line>
        </svg>
      ),
      'Solutions': (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
          <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
          <line x1="12" y1="22.08" x2="12" y2="12"></line>
        </svg>
      )
    };
    return iconMap[title] || iconMap['Objectives'];
  };

  return (
    <section className={styles.caseStudyThreeStep}>
      <div className={styles.caseStudyThreeStep__container}>
        <div className={styles.caseStudyThreeStep__grid}>
          {steps.map((step, index) => (
            <div key={index} className={styles.caseStudyThreeStep__step}>
              <div className={styles.caseStudyThreeStep__icon}>
                {getIcon(step.title)}
              </div>
              <h3 className={styles.caseStudyThreeStep__title}>
                {step.title}
              </h3>
              <div 
                className={styles.caseStudyThreeStep__text}
                dangerouslySetInnerHTML={{ __html: step.text }}
              />
            </div>
          ))}
        </div>
         {/* Diagonal Separator */}
         <div className={styles.caseStudyThreeStep__separator}/>
      </div>
    </section>
  );
};

export default CaseStudyThreeStep;



