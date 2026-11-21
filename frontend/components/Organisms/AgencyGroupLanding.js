import Image from 'next/image';
import Link from 'next/link';
import AgencyAnimatedTitle from '../Atoms/AgencyAnimatedTitle';
import useSectionMotion from '../../hooks/useSectionMotion';
import { getPageHeadline, getProcessData, getServiceContentData } from '../../data/siteData';
import { getAgencyGroupPresentation } from '../../data/agencyGroupPresentation';
import styles from '../../styles/AgencyServiceTemplate.module.scss';
import PricingSummary from '../PricingSummary';
import InquiryCTA from '../InquiryCTA';
import acquisitionStyles from '../../styles/Acquisition.module.scss';

const Arrow = () => <span aria-hidden="true">↗</span>;

const DisplayHeading = ({ lines, light = false }) => (
  <h2 className={`${styles.displayHeading} ${light ? styles.lightHeading : ''}`}>
    {lines.map((line, index) => (
      <span key={line} className={index === lines.length - 1 ? styles.displayAccentLine : styles.displayLine}>
        {line}
      </span>
    ))}
  </h2>
);

export default function AgencyGroupLanding({ groupType }) {

  const motionRootRef = useSectionMotion();
  const presentation = getAgencyGroupPresentation(groupType);
  const headline = getPageHeadline(presentation.headlineKey);
  const process = getProcessData();
  const heroLines = [headline.main, headline.highlight, headline.sub].filter(Boolean);

  const services = presentation.services.items.map((config) => ({
    ...config,
    content: getServiceContentData(config.serviceType)
  }));
  const capabilities = services.flatMap(({ content }) => content.expertise.items).slice(0, 8);
  const themeClass = styles[`${presentation.theme}LandingHero`];

  return (
    <article ref={motionRootRef} className={styles.page} data-page-type={`${groupType}-group-landing`}>
      <section className={`${styles.hero} ${styles.groupLandingHero} ${themeClass}`} data-parallax-section>
        <div className={styles.rings} aria-hidden="true" />
        <div className={styles.shell}>
          <p className={styles.eyebrow}>{presentation.eyebrow}</p>
          <h1 className={styles.heroTitle} aria-label={heroLines.join(' ')}>
            <AgencyAnimatedTitle lines={heroLines} />
          </h1>
          <div className={styles.heroFooter}>
            <p>{presentation.heroDescription}</p>
            <InquiryCTA cta="hub" service={groupType === 'ai' ? 'ai-development' : groupType === 'web' ? 'web-development' : 'network-design'} label={presentation.heroCta} />
          </div>
        </div>
      </section>

      <dl className={`${styles.facts} ${styles.groupLandingFacts}`}>
        {presentation.facts.map((fact, index) => (
          <div key={fact}>
            <dt>{String(index + 1).padStart(2, '0')}</dt>
            <dd>{fact}</dd>
          </div>
        ))}
      </dl>

      <section className={`${styles.intro} ${styles.motionSection}`} data-motion-section data-parallax-section>
        <div className={`${styles.shell} ${styles.twoColumn} ${styles.motionContent}`}>
          <div className={styles.parallaxSlow}>
            <p className={styles.label}>01 / {presentation.intro.label}</p>
            <DisplayHeading lines={presentation.intro.title} />
          </div>
          <div className={`${styles.prose} ${styles.parallaxReverse}`}>
            <h3>{presentation.intro.lead}</h3>
            {presentation.intro.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </div>
      </section>

      <section className={`${styles.groupServicesSection} ${styles.motionSection}`} data-motion-section data-parallax-section>
        <div className={`${styles.shell} ${styles.motionContent}`}>
          <div className={styles.groupServicesHeader}>
            <div className={styles.parallaxSlow}>
              <p className={styles.label}>02 / {presentation.services.label}</p>
              <DisplayHeading lines={presentation.services.title} light />
            </div>
            <p className={styles.groupServicesIntro}>{presentation.services.intro}</p>
          </div>

          <div className={styles.groupServiceList}>
            {services.map(({ number, stage, displayTitle, href, content }) => (
              <article key={stage} className={styles.groupServiceCard}>
                <div className={styles.groupServiceCardTop}>
                  <span>{number}</span>
                  <p>{stage}</p>
                </div>
                <div className={styles.groupServiceCardBody}>
                  <div>
                    <p className={styles.groupServiceName}>{content.title}</p>
                    <h3>{displayTitle}</h3>
                    <p className={styles.groupServiceDescription} dangerouslySetInnerHTML={{ __html: content.mainContent.paragraphs[0] }} />
                    <Link href={href} className={styles.groupServiceLink}>Explore {content.title} <Arrow /></Link>
                  </div>
                  <ol className={styles.groupTopicList}>
                    {content.approach.steps.map((step, index) => (
                      <li key={step.title}>
                        <span>{String(index + 1).padStart(2, '0')}</span>
                        <strong>{step.title}</strong>
                      </li>
                    ))}
                  </ol>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.expertiseSection} ${styles.motionSection}`} data-motion-section data-parallax-section>
        <div className={`${styles.shell} ${styles.expertiseGrid} ${styles.motionContent}`}>
          <div className={`${styles.expertiseCopy} ${styles.parallaxReverse}`}>
            <p className={styles.label}>03 / {presentation.capabilities.label}</p>
            <DisplayHeading lines={presentation.capabilities.title} />
            <p className={styles.expertiseIntro}>{presentation.capabilities.intro}</p>
            <ul>
              {capabilities.map((item) => {
                const [title, detail = ''] = item.split(' - ');
                return <li key={item}><strong>{title}</strong><span>{detail}</span></li>;
              })}
            </ul>
          </div>
          <div className={`${styles.deviceStage} ${styles.groupVisualStage} ${styles.parallaxSlow}`}>
            <span className={styles.stageCode}>{presentation.capabilities.stageCode}</span>
            <Image
              src={presentation.capabilities.asset}
              alt={presentation.capabilities.assetAlt}
              fill
              sizes="(max-width: 900px) 92vw, 52vw"
              className={`${styles.deviceImage} ${styles.groupVisualImage}`}
            />
          </div>
        </div>
      </section>

      <section className={`${styles.delivery} ${styles.motionSection}`} data-motion-section data-parallax-section>
        <div className={`${styles.shell} ${styles.motionContent}`}>
          <div className={styles.deliveryHeader}>
            <div className={styles.parallaxSlow}>
              <p className={styles.label}>04 / {process.title}</p>
              <DisplayHeading lines={['Clear at', 'every stage.']} />
            </div>
            <div className={`${styles.principles} ${styles.parallaxReverse}`}>
              <p>{process.principlesTitle}</p>
              <ul>{process.principles.map((principle) => <li key={principle}>{principle}</li>)}</ul>
            </div>
          </div>
          <ol className={styles.deliveryList}>
            {process.steps.map((step) => (
              <li key={step.number}><span>{String(step.number).padStart(2, '0')}</span><strong>{step.title}</strong></li>
            ))}
          </ol>
        </div>
      </section>

      {['web', 'ai'].includes(groupType) && <section className={acquisitionStyles.section}>
        <p className={acquisitionStyles.eyebrow}>Based in Freeport • Serving Long Island and NYC • Remote delivery</p>
        <h2>{groupType === 'web' ? 'Choose the next step for your website.' : 'See what an assistant can do.'}</h2>
        <p>{groupType === 'web' ? 'Start with design for a clearer customer journey, development for a website or business application, digital marketing for content and measurement, or support for ongoing care. Each service page explains deliverables, scope boundaries, project evidence, and questions to ask before committing.' : 'Start with a workflow assessment, build a scoped assistant, and agree on ongoing evaluation and maintenance. Jarvis is a working example of answering service questions, gathering project information, and handing inquiries to HubSpot. Responses can be incorrect; a person should review consequential decisions.'}</p>
        <div className={acquisitionStyles.proof}>
          {groupType === 'web' ? <><p><Link href="/industries/healthcare-websites/">Healthcare websites</Link> — existing David Dare MD and DermCare portfolio examples.</p></> : <><p><Link href="/ai-group/solutions/ai-lead-assistant/">Explore and try the Jarvis lead assistant</Link></p><p><Link href="/guides/custom-ai-assistant-vs-chatbot/">Compare a custom assistant and a chatbot</Link></p></>}
        </div>
        <PricingSummary group={groupType} />
        <p>Scope, content readiness, integrations, and review cycles determine the schedule. Published packages do not include unlimited development, third-party usage charges, or a guaranteed business outcome.</p>
        <InquiryCTA cta="hub" service={groupType === 'ai' ? 'ai-development' : 'web-development'} label={groupType === 'ai' ? 'Discuss your AI workflow' : 'Plan your website or business app'} />
        <Link href="/locations/freeport-ny/">Our Freeport base and regional coverage ↗</Link>
      </section>}

      <section className={`${styles.cta} ${styles.motionSection}`} data-motion-section data-parallax-section>
        <div className={`${styles.ctaInner} ${styles.motionContent} ${styles.parallaxSlow}`}>
          <p className={styles.label}>{presentation.cta.label}</p>
          <h2>{presentation.cta.title[0]}<br /><span>{presentation.cta.title[1]}</span></h2>
          <InquiryCTA cta="hub" service={groupType === 'ai' ? 'ai-development' : groupType === 'web' ? 'web-development' : 'network-design'} label={presentation.cta.button} />
        </div>
      </section>
    </article>
  );
}
