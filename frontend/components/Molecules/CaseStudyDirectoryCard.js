import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../../styles/CaseStudyDirectoryCard.module.scss';
import { withTrailingSlash } from '../../utils/url';

const CaseStudyDirectoryCard = ({
  title,
  description,
  imageSrc,
  imageAlt,
  href
}) => {
  return (
    <Link
      href={withTrailingSlash(href)}
      className={styles.caseStudyDirectoryCard}
      aria-label={`View case study: ${title}`}
    >
      <article className={styles.caseStudyDirectoryCard__article}>
        <div className={styles.caseStudyDirectoryCard__media}>
          {imageSrc && (
            <Image
              src={imageSrc}
              alt={imageAlt || title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
              className={styles.caseStudyDirectoryCard__image}
            />
          )}
        </div>

        <div className={styles.caseStudyDirectoryCard__content}>
          <h2 className={styles.caseStudyDirectoryCard__title}>{title}</h2>
          {description && (
            <p className={styles.caseStudyDirectoryCard__description}>{description}</p>
          )}
          <span className={styles.caseStudyDirectoryCard__cta}>View Case Study</span>
        </div>
      </article>
    </Link>
  );
};

export default CaseStudyDirectoryCard;
