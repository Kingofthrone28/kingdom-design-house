import React from 'react';
import Link from 'next/link';
import VideoPlayer from './VideoPlayer';
import styles from '../../styles/EditorialCaseStudy.module.scss';

const renderLines = (lines) => lines.map((line, lineIndex) => (
  <React.Fragment key={lineIndex}>
    {line.map((part, partIndex) => (
      part.emphasis
        ? <em key={partIndex}>{part.text}</em>
        : <React.Fragment key={partIndex}>{part.text}</React.Fragment>
    ))}
    {lineIndex < lines.length - 1 && <br />}
  </React.Fragment>
));

const EditorialCaseStudy = ({ data }) => {
  const {
    hero,
    projectDetails,
    opportunity,
    video,
    impact,
    approach,
    experience,
    callToAction
  } = data;

  return (
    <article className={styles.caseStudy}>
      <header className={styles.hero}>
        <div className={styles.topography} aria-hidden="true" />
        <div className={styles.shell}>
          <div className={styles.eyebrow}>{hero.eyebrow}</div>
          <h1>
            {hero.title.map((line, index) => (
              <React.Fragment key={line.text}>
                {line.accent ? <span>{line.text}</span> : line.text}
                {index < hero.title.length - 1 && <br />}
              </React.Fragment>
            ))}
          </h1>
          <p className={styles.heroCopy}>{hero.copy}</p>
          <a className={styles.jumpLink} href={hero.link.href}>
            {hero.link.label} <span aria-hidden="true">{hero.link.icon}</span>
          </a>
        </div>
      </header>

      <section className={styles.projectBar} aria-label="Project details">
        <div className={styles.shell}>
          <dl>
            {projectDetails.map((detail) => (
              <div key={detail.label}>
                <dt>{detail.label}</dt>
                <dd>{detail.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className={styles.intro} id="story">
        <div className={styles.shell}>
          <div className={styles.statement}>
            <span className={styles.sectionNumber}>{opportunity.sectionLabel}</span>
            <h2>{renderLines(opportunity.heading)}</h2>
          </div>
          <div className={styles.narrative}>
            <p className={styles.lead}>{opportunity.lead}</p>
            {opportunity.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </div>
      </section>

      <section className={styles.featureVisual}>
        <div className={styles.shell}>
          <div className={styles.videoFrame}>
            <VideoPlayer {...video} />
          </div>
        </div>
      </section>

      {impact?.metrics?.length > 0 && (
        <section className={styles.metrics}>
          <div className={styles.shell}>
            <span className={styles.sectionNumber}>{impact.sectionLabel}</span>
            <div className={styles.statsGrid}>
              {impact.metrics.map((stat) => (
                <div className={styles.stat} key={stat.label}>
                  <strong>
                    <span>{stat.from}</span>
                    <i aria-hidden="true">→</i>
                    <span>{stat.to}<small>{stat.suffix}</small></span>
                  </strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className={styles.approach}>
        <div className={styles.shell}>
          <div className={styles.approachHeading}>
            <span className={styles.sectionNumber}>{approach.sectionLabel}</span>
            <h2>{renderLines(approach.heading)}</h2>
          </div>
          <div className={styles.pillars}>
            {approach.pillars.map((pillar) => (
              <div className={styles.pillar} key={pillar.number}>
                <span>{pillar.number}</span>
                <h3>{pillar.title}</h3>
                <p>{pillar.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.system}>
        <div className={styles.shell}>
          <div className={styles.systemCopy}>
            <span className={styles.sectionNumber}>{experience.sectionLabel}</span>
            <h2>{renderLines(experience.heading)}</h2>
            <p>{experience.description}</p>
            <ul>
              {experience.features.map((feature) => <li key={feature}>{feature}</li>)}
            </ul>
          </div>
          <div className={styles.deviceStage}>
            <img src={experience.devicePreview.src} alt={experience.devicePreview.alt} />
          </div>
        </div>
      </section>

      <section className={styles.nextStep}>
        <div className={styles.shell}>
          <span>{callToAction.eyebrow}</span>
          <h2>{renderLines(callToAction.heading)}</h2>
          <Link href={callToAction.link.href} className={styles.cta}>
            {callToAction.link.label} <span aria-hidden="true">{callToAction.link.icon}</span>
          </Link>
        </div>
      </section>
    </article>
  );
};

export default EditorialCaseStudy;
