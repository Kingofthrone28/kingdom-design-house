import Link from 'next/link';
import styles from '../../styles/UIUXExperience.module.scss';

const experienceItems = [
  {
    number: '01',
    company: 'Institute for Integrative Nutrition',
    context: 'Wellness education · Enrollment',
    description: 'Collaborated with Product, Marketing, and engineering stakeholders to translate enrollment and digital-learning requirements into Figma-based user flows, responsive page layouts, reusable interface patterns, and implementation-ready specifications supporting customer acquisition and engagement.',
    capabilities: ['User flows', 'Responsive UI', 'Design systems', 'Product collaboration'],
    href: '/case-studies/iin/'
  },
  {
    number: '02',
    company: 'Kingdom Design House',
    context: 'Agency systems · Product delivery',
    description: 'Documented the end-to-end product process in Figma—from discovery and strategy through wireframing, system development, optimization, launch, training, and ongoing maintenance—connecting UX decisions with technical delivery and measurable business growth.',
    capabilities: ['Product strategy', 'Wireframing', 'Delivery systems', 'Optimization']
  }
];

const Arrow = () => <span aria-hidden="true">↗</span>;

export default function UIUXExperience() {
  return (
    <section className={styles.experience} aria-labelledby="ui-ux-experience-title">
      <div className={styles.shell}>
        <header className={styles.header}>
          <div>
            <p className={styles.eyebrow}>Selected product work · UI/UX</p>
            <h2 id="ui-ux-experience-title">UI/UX<br /><span>Experience.</span></h2>
          </div>
          <p className={styles.intro}>
            Turning business requirements into clear user journeys, reusable interface systems, and implementation-ready product decisions.
          </p>
        </header>

        <ol className={styles.experienceList}>
          {experienceItems.map((item) => (
            <li key={item.company} className={styles.experienceItem}>
              <div className={styles.meta}>
                <span>{item.number}</span>
                <p>{item.context}</p>
              </div>

              <div className={styles.entry}>
                <div className={styles.entryHeading}>
                  <h3>{item.company}</h3>
                  {item.href && (
                    <Link href={item.href} className={styles.caseStudyLink}>
                      View case study <Arrow />
                    </Link>
                  )}
                </div>
                <p className={styles.description}>{item.description}</p>
                <ul className={styles.capabilities} aria-label={`${item.company} UI and UX capabilities`}>
                  {item.capabilities.map((capability) => <li key={capability}>{capability}</li>)}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export { experienceItems };
