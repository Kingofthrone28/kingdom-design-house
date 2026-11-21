import Link from 'next/link';
import Image from 'next/image';
import Layout from '../Layout';
import SEOHead from '../SEOHead';
import StructuredData from '../StructuredData';
import InquiryCTA from '../InquiryCTA';
import PricingSummary from '../PricingSummary';
import AgencyAnimatedTitle from '../Atoms/AgencyAnimatedTitle';
import useSectionMotion from '../../hooks/useSectionMotion';
import { siteData } from '../../data/siteData';
import { caseStudySummaries } from '../../data/caseStudies/summaries';
import groupStyles from '../../styles/AgencyServiceTemplate.module.scss';
import styles from '../../styles/AcquisitionPage.module.scss';

const presentations = {
  'web-planning': { group: 'web', lines: ['Map the journey.', 'Define the scope.', 'Plan the handoff.'] },
  'search-measurement': { group: 'web', lines: ['Measure the search.', 'Verify the inquiry.', 'Review the opportunity.'] },
  'network-review': { group: 'network', lines: ['Review the devices.', 'Trace the path.', 'Plan the change.'] },
  'assistant-guide': { group: 'ai', lines: ['Custom AI assistant', 'or chatbot?', 'Start with the task.'] },
  'lead-assistant': { group: 'ai', lines: ['A service conversation', 'with a clear', 'next step.'] },
  healthcare: { group: 'web', lines: ['Help visitors find', 'the right', 'information.'] },
  freeport: { group: 'web', lines: ['Based in Freeport.', 'Built around', 'your business.'] }
};

const number = value => String(value).padStart(2, '0');
const Heading = ({ children, light = false }) => (
  <h2 className={`${groupStyles.displayHeading} ${light ? groupStyles.lightHeading : ''}`}>{children}</h2>
);

export default function AcquisitionPage({ destination }) {
  const page = siteData.destinations[destination];
  const presentation = presentations[destination];
  const motionRootRef = useSectionMotion();
  const inquiry = <InquiryCTA service={page.service} cta={page.cta} label={page.ctaLabel} starter={page.starter} demo={page.demo} />;
  const topics = [
    ['Overview', '#overview'], ['Evidence', '#evidence'],
    ...(page.pricingGroup ? [['Pricing', '#packages']] : []), ['Questions', '#questions']
  ];

  return <>
    <SEOHead title={page.title} description={page.description} canonical={page.path} />
    <StructuredData page={{ url: page.path, name: page.title, description: page.description, service: page.serviceSchema, breadcrumbs: [{ name: 'Home', url: '/' }, { name: page.title, url: page.path }] }} />
    <Layout groupName={presentation.group === 'ai' ? 'aigroup' : presentation.group === 'network' ? 'networkgroup' : 'webgroup'}>
      <article ref={motionRootRef} className={`${groupStyles.page} ${styles.page}`}>
        <header className={`${groupStyles.hero} ${groupStyles.groupLandingHero} ${groupStyles[`${presentation.group}LandingHero`]}`} data-parallax-section>
          <div className={groupStyles.rings} aria-hidden="true" />
          <div className={groupStyles.shell}>
            <p className={groupStyles.eyebrow}>{page.eyebrow}</p>
            <h1 className={groupStyles.heroTitle}>
              <span className={groupStyles.srOnly}>{page.heading}</span>
              <AgencyAnimatedTitle lines={presentation.lines} />
            </h1>
            <div className={groupStyles.heroFooter}><p>{page.intro}</p>{inquiry}</div>
          </div>
        </header>

        <nav aria-label="On this page" className={styles.topicNav}>
          <ol className={`${groupStyles.facts} ${groupStyles.groupLandingFacts} ${styles.topics}`}>
            {topics.map(([label, href], index) => <li key={href}><a href={href}><span>{number(index + 1)}</span><strong>{label} <span aria-hidden="true">↘</span></strong></a></li>)}
          </ol>
        </nav>

        <section id="overview" className={groupStyles.intro}>
          <div className={groupStyles.shell}>
            {page.sections.map((section, index) => <section id={section.id} key={section.title} className={`${styles.contentRow} ${groupStyles.motionSection}`} data-motion-section>
              <div className={`${groupStyles.twoColumn} ${groupStyles.motionContent}`}>
                <div><p className={groupStyles.label}>{number(index + 1)} / Overview</p><Heading>{section.title}</Heading></div>
                <div className={groupStyles.prose}>{section.paragraphs.map(text => <p key={text}>{text}</p>)}</div>
              </div>
            </section>)}
            {page.comparison && <div className={styles.comparison}>
              <div className={styles.tableScroll} tabIndex={0} role="region" aria-label="Assistant and chatbot comparison">
                <table><caption>Compare the task and operating requirements</caption>
                  <thead><tr><th scope="col">Consideration</th><th scope="col">Fixed flow or FAQ chatbot</th><th scope="col">Custom retrieval and integration assistant</th></tr></thead>
                  <tbody>{page.comparison.map(([label, simple, custom]) => <tr key={label}><th scope="row">{label}</th><td>{simple}</td><td>{custom}</td></tr>)}</tbody>
                </table>
              </div>
            </div>}
          </div>
        </section>

        <section id="evidence" className={`${groupStyles.groupServicesSection} ${groupStyles.motionSection}`} data-motion-section>
          <div className={`${groupStyles.shell} ${groupStyles.motionContent}`}>
            <p className={groupStyles.label}>Evidence / Selected work and guidance</p>
            <Heading light>Explore <span>the evidence.</span></Heading>
            <div className={groupStyles.groupServiceList}>{page.proof.map((item, index) => {
              const caseStudy = caseStudySummaries.find(study => study.href === item.href);
              return <article key={item.href} className={groupStyles.groupServiceCard}>
              <div className={groupStyles.groupServiceCardTop}><span>{number(index + 1)}</span><p>Explore the work</p></div>
              <div className={styles.proofRow}>
                <h3><Link href={item.href} className={styles.proofLink}>
                  {caseStudy && <span className={styles.thumbnail}>
                    <Image src={caseStudy.imageSrc} alt={caseStudy.imageAlt} fill sizes="(max-width: 600px) 240px, 180px" />
                  </span>}
                  <span className={styles.proofTitle}>{item.label} <span className={styles.proofArrow} aria-hidden="true">↗</span></span>
                </Link></h3>
                <p>{item.detail}</p>
              </div>
            </article>;
            })}</div>
          </div>
        </section>

        {page.pricingGroup && <section id="packages" className={groupStyles.expertiseSection}>
          <div className={groupStyles.shell}>
            <p className={groupStyles.label}>Investment / Setup and ongoing care</p>
            <Heading>Plan your <span>next step.</span></Heading>
            <div className={styles.packages}><PricingSummary group={page.pricingGroup} /></div>
          </div>
        </section>}

        <section id="questions" className={groupStyles.delivery}>
          <div className={`${groupStyles.shell} ${groupStyles.twoColumn}`}>
            <div><p className={groupStyles.label}>Questions / Before you start</p><Heading>Clear before <span>we begin.</span></Heading></div>
            <div className={styles.faqs}>{page.faqs.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div>
          </div>
        </section>

        <section className={groupStyles.cta}>
          <div className={groupStyles.ctaInner}>
            <p className={groupStyles.label}>Have a project in mind?</p>
            <h2>Let’s find your<br /><span>next step.</span></h2>
            {inquiry}
            <nav className={styles.related} aria-label="Related services and guidance">{page.related.map(link => <Link key={link.href} href={link.href}>{link.label} <span aria-hidden="true">↗</span></Link>)}</nav>
          </div>
        </section>
      </article>
    </Layout>
  </>;
}
