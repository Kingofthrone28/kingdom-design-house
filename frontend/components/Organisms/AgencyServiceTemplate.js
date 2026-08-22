import Image from 'next/image';
import Link from 'next/link';
import AgencyAnimatedTitle from '../Atoms/AgencyAnimatedTitle';
import useSectionMotion from '../../hooks/useSectionMotion';
import styles from '../../styles/AgencyServiceTemplate.module.scss';

const whyChooseUs = [
  'With over 10 years of experience in web development and software engineering, Kingdom Design House has established itself as a trusted partner for businesses seeking innovative digital solutions.',
  'Our team creates scalable applications, automates complex workflows, and implements modern technology on robust system architectures designed to adapt to future growth. Every engagement is tailored to improve efficiency and produce measurable business outcomes.'
];

const Arrow = () => <span aria-hidden="true">↗</span>;

const splitExpertiseItem = (item) => {
  const separatorIndex = item.indexOf(' - ');
  if (separatorIndex === -1) return [item, ''];
  return [item.slice(0, separatorIndex), item.slice(separatorIndex + 3)];
};

const createPreview = (description, maximum = 150) => {
  if (description.length <= maximum) return description;
  const shortened = description.slice(0, maximum);
  const lastSpace = shortened.lastIndexOf(' ');
  return `${shortened.slice(0, lastSpace > 80 ? lastSpace : maximum).trim()}…`;
};

export default function AgencyServiceTemplate({
  serviceType,
  presentation,
  content,
  headline,
  process,
  draftMode = false
}) {
  const motionRootRef = useSectionMotion();
  const heroLines = [headline.main, headline.highlight, headline.sub].filter(Boolean);
  const expertiseItems = content.expertise?.items || [];
  const approachSteps = content.approach?.steps || [];

  return (
    <article
      ref={motionRootRef}
      className={`${styles.page} ${draftMode ? styles.draftMode : ''}`}
      data-service-type={serviceType}
    >
      {draftMode && <p className={styles.draftBadge}>Design sandbox · Noindex</p>}

      <section className={styles.hero} data-parallax-section>
        <div className={styles.rings} aria-hidden="true" />
        <div className={styles.shell}>
          <p className={styles.eyebrow}>{presentation.eyebrow}</p>
          <h1 className={styles.heroTitle} aria-label={heroLines.join(' ')}>
            <AgencyAnimatedTitle lines={heroLines} />
          </h1>
          <div className={styles.heroFooter}>
            <p>{content.mainContent.paragraphs[0].replace(/<[^>]+>/g, '')}</p>
            <Link href="/contact/" className={styles.textLink}>Start a project <Arrow /></Link>
          </div>
        </div>
      </section>

      <dl className={styles.facts}>
        <div><dt>Group</dt><dd>{presentation.groupLabel}</dd></div>
        <div><dt>Service</dt><dd>{presentation.serviceLabel}</dd></div>
        <div><dt>Market</dt><dd>{presentation.market}</dd></div>
        <div><dt>Focus</dt><dd>{presentation.focus}</dd></div>
      </dl>

      <section className={`${styles.intro} ${styles.motionSection}`} data-motion-section data-parallax-section>
        <div className={`${styles.shell} ${styles.twoColumn} ${styles.motionContent}`}>
          <div className={styles.parallaxSlow}>
            <p className={styles.label}>01 / {presentation.groupLabel}</p>
            <h2 className={styles.displayHeading}>
              {presentation.displayTitle[0]}<br />
              <span>{presentation.displayTitle[1]}</span><br />
              {presentation.displayTitle[2]}
            </h2>
          </div>
          <div className={`${styles.prose} ${styles.parallaxReverse}`}>
            <h3>{content.mainContent.title}</h3>
            {content.mainContent.paragraphs.map((paragraph) => (
              <p key={paragraph} dangerouslySetInnerHTML={{ __html: paragraph }} />
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.process} ${styles.motionSection}`} data-motion-section data-parallax-section>
        <div className={`${styles.shell} ${styles.twoColumn} ${styles.motionContent}`}>
          <div className={styles.parallaxSlow}>
            <p className={styles.label}>02 / {content.approach?.title || 'Our Approach'}</p>
            <h2 className={`${styles.displayHeading} ${styles.lightHeading}`}>
              Plan. Build.<br /><span>Test. Grow.</span>
            </h2>
          </div>
          <ol className={`${styles.processList} ${styles.parallaxReverse}`}>
            {approachSteps.map((step, index) => (
              <li key={step.title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <details className={styles.processDetails}>
                  <summary>
                    <span className={styles.processSummaryCopy}>
                      <strong>{step.title}</strong>
                      <span>{createPreview(step.description)}</span>
                    </span>
                    <span className={styles.processToggle} aria-hidden="true">+</span>
                  </summary>
                  <p>{step.description}</p>
                </details>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={`${styles.expertiseSection} ${styles.motionSection}`} data-motion-section data-parallax-section>
        <div className={`${styles.shell} ${styles.expertiseGrid} ${styles.motionContent}`}>
          <div className={`${styles.expertiseCopy} ${styles.parallaxReverse}`}>
            <p className={styles.label}>03 / {content.expertise?.title || 'Service Expertise'}</p>
            <h2 className={styles.displayHeading}>Built for now.<br /><span>Ready for next.</span></h2>
            <p className={styles.expertiseIntro}>
              The right tools, architecture, and operating discipline come together as one connected service built around your goals.
            </p>
            <ul>
              {expertiseItems.map((item) => {
                const [title, detail] = splitExpertiseItem(item);
                return (
                  <li key={item}>
                    <strong>{title}</strong>
                    <span>{detail}</span>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className={`${styles.deviceStage} ${styles.parallaxSlow}`}>
            <span className={styles.stageCode}>{presentation.groupLabel} / {presentation.serviceLabel}</span>
            <Image
              src={presentation.showcaseAsset}
              alt={presentation.showcaseAlt}
              fill
              sizes="(max-width: 900px) 92vw, 52vw"
              className={styles.deviceImage}
            />
          </div>
        </div>
      </section>

      <section className={`${styles.delivery} ${styles.motionSection}`} data-motion-section data-parallax-section>
        <div className={`${styles.shell} ${styles.motionContent}`}>
          <div className={styles.deliveryHeader}>
            <div className={styles.parallaxSlow}>
              <p className={styles.label}>04 / {process.title}</p>
              <h2 className={styles.displayHeading}>Clear at<br /><span>every stage.</span></h2>
            </div>
            <div className={`${styles.principles} ${styles.parallaxReverse}`}>
              <p>{process.principlesTitle}</p>
              <ul>{process.principles.map((principle) => <li key={principle}>{principle}</li>)}</ul>
            </div>
          </div>
          <ol className={styles.deliveryList}>
            {process.steps.map((step) => (
              <li key={step.number}>
                <span>{String(step.number).padStart(2, '0')}</span>
                <strong>{step.title}</strong>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={`${styles.whyUs} ${styles.motionSection}`} data-motion-section data-parallax-section>
        <div className={`${styles.shell} ${styles.motionContent}`}>
          <p className={styles.label}>05 / Why choose us</p>
          <div className={styles.whyGrid}>
            <h2 className={styles.parallaxSlow}>Experience<br />that keeps<br /><span>building.</span></h2>
            <div className={styles.parallaxReverse}>
              {whyChooseUs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.cta} ${styles.motionSection}`} data-motion-section data-parallax-section>
        <div className={`${styles.ctaInner} ${styles.motionContent} ${styles.parallaxSlow}`}>
          <p className={styles.label}>Ready to build what’s next?</p>
          <h2>Let’s make your<br /><span>next move matter.</span></h2>
          <Link href="/contact/" className={styles.ctaButton}>Get started today <Arrow /></Link>
        </div>
      </section>
    </article>
  );
}
