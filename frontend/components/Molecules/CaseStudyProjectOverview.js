import React from 'react';
import Image from 'next/image';
import styles from '../../styles/CaseStudyProjectOverview.module.scss';

const CaseStudyProjectOverview = ({ title, industry, services, imageSrc, imageAlt }) => {
  return (
    <section className={styles.caseStudyProjectOverview}>
      <div className={styles.caseStudyProjectOverview__container}>
        <div className={styles.caseStudyProjectOverview__content}>
          <div className={styles.caseStudyProjectOverview__text}>
            <h2 className={styles.caseStudyProjectOverview__title}>
              {title}
            </h2>
            <div className={styles.caseStudyProjectOverview__info}>
              <div className={styles.caseStudyProjectOverview__infoItem}>
                <span className={styles.caseStudyProjectOverview__infoLabel}>Industry:</span>
                <span className={styles.caseStudyProjectOverview__infoValue}>{industry}</span>
              </div>
              <div className={styles.caseStudyProjectOverview__infoItem}>
                <span className={styles.caseStudyProjectOverview__infoLabel}>Services:</span>
                <span className={styles.caseStudyProjectOverview__infoValue}>{services}</span>
              </div>
            </div>
          </div>
          <div className={styles.caseStudyProjectOverview__image}>
            {imageSrc && (
              <Image
                src={imageSrc}
                alt={imageAlt || title}
                width={800}
                height={600}
                className={styles.caseStudyProjectOverview__img}
                priority
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudyProjectOverview;


