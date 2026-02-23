import React from 'react';
import Image from 'next/image';
import styles from '../../styles/CaseStudyOverview.module.scss';

const CaseStudyOverview = ({ title, text, imageSrc, imageAlt }) => {
  return (
    <section className={styles.caseStudyOverview}>
      <div className={styles.caseStudyOverview__container}>
        <div className={styles.caseStudyOverview__content}>
          <div className={styles.caseStudyOverview__text}>
            <h2 className={styles.caseStudyOverview__title}>
              {title}
            </h2>
            <div 
              className={styles.caseStudyOverview__description}
              dangerouslySetInnerHTML={{ __html: text }}
            />
          </div>
          <div className={styles.caseStudyOverview__image}>
            {imageSrc && (
              <Image
                src={imageSrc}
                alt={imageAlt || title}
                width={400}
                height={400}
                className={styles.caseStudyOverview__img}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudyOverview;


