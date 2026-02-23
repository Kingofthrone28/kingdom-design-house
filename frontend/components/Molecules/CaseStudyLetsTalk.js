import React from 'react';
import styles from '../../styles/CaseStudyLetsTalk.module.scss';

const CaseStudyLetsTalk = ({ question, heading, onClick }) => {
  return (
    <section className={styles.caseStudyLetsTalk}>
      <div className={styles.caseStudyLetsTalk__container}>
        <button 
          className={styles.caseStudyLetsTalk__button}
          onClick={onClick}
          aria-label="Let's Talk"
        >
          <div className={styles.caseStudyLetsTalk__content}>
            <p className={styles.caseStudyLetsTalk__question}>
              {question}
            </p>
            <h2 className={styles.caseStudyLetsTalk__heading}>
              {heading}
            </h2>
          </div>
          <div className={styles.caseStudyLetsTalk__arrow}>
            <svg 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="7" y1="17" x2="17" y2="7"></line>
              <polyline points="7 7 17 7 17 17"></polyline>
            </svg>
          </div>
        </button>
      </div>
    </section>
  );
};

export default CaseStudyLetsTalk;


