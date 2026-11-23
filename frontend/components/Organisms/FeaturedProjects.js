import Image from 'next/image';
import Link from 'next/link';
import { getCaseStudySummaries } from '../../data/caseStudies/summaries';
import { withTrailingSlash } from '../../utils/url';
import styles from '../../styles/FeaturedProjects.module.scss';
import processStyles from '../../styles/ProcessSteps.module.scss';

export default function FeaturedProjects() {
  const caseStudies = getCaseStudySummaries();

  return (
    <section id="featured-projects" className={styles.featuredProjects} aria-labelledby="featured-projects-title">
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 id="featured-projects-title" className={`${styles.title} ${processStyles.processSteps__title}`}>
            Featured <span className={processStyles.processSteps__title__highlight}>Projects</span>
          </h2>
          <div className={styles.introduction}>
            <p className={styles.intro}>
              Explore selected web projects and professional contributions. See the design, development, and thinking behind each experience.
            </p>
            <Link href="/case-studies/" className={styles.more}>
              Show me more <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
        <div className={styles.grid}>
          {caseStudies.map(project => (
              <Link
                key={project.slug}
                href={withTrailingSlash(project.href)}
                className={styles.card}
                aria-label={`View case study: ${project.title}`}
              >
                <article className={styles.article}>
                  <div className={styles.media}>
                    <Image
                      src={project.imageSrc}
                      alt={project.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 615px"
                      className={styles.backdrop}
                    />
                  </div>
                  <div className={styles.caption}>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <span className={styles.cta}>
                      View case study <span className={styles.arrow} aria-hidden="true">↗</span>
                    </span>
                  </div>
                </article>
              </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
