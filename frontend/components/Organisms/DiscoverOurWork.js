import React from 'react';
import CaseStudyDirectoryCard from '../Molecules/CaseStudyDirectoryCard';
import styles from '../../styles/DiscoverOurWork.module.scss';
import { getCaseStudiesDirectoryData } from '../../data/caseStudiesData';

const DiscoverOurWork = ({ caseStudies = getCaseStudiesDirectoryData() }) => {
  return (
    <div className={styles.discoverOurWork}>
      <section className={styles.discoverOurWork__intro}>
        <div className={styles.discoverOurWork__introContainer}>
          <p className={styles.discoverOurWork__eyebrow}>Case Studies</p>
          <h1 className={styles.discoverOurWork__title}>Discover Our Work</h1>
          <p className={styles.discoverOurWork__description}>
            Real projects, measurable outcomes, and practical solutions across web,
            UX, and development.
          </p>
        </div>
      </section>

      <section className={styles.discoverOurWork__directory}>
        <div className={styles.discoverOurWork__container}>
          <div className={styles.discoverOurWork__grid}>
            {caseStudies.map((caseStudy) => (
              <CaseStudyDirectoryCard
                key={caseStudy.slug || caseStudy.href}
                title={caseStudy.title}
                description={caseStudy.description}
                imageSrc={caseStudy.imageSrc}
                imageAlt={caseStudy.imageAlt}
                href={caseStudy.href}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default DiscoverOurWork;
