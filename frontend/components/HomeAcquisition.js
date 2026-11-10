import Link from 'next/link';
import Image from 'next/image';
import InquiryCTA from './InquiryCTA';
import { caseStudySummaries } from '../data/caseStudies/summaries';
import styles from '../styles/Acquisition.module.scss';

export default function HomeAcquisition() {
  const featured = ['dermcare', 'daremd', 'iin'].map(slug => caseStudySummaries.find(item => item.slug === slug)).filter(Boolean);
  return <section className={styles.section}>
    <p className={styles.eyebrow}>Based in Freeport • Long Island and NYC • Remote delivery</p>
    <h2>Make your next business task easier.</h2>
    <div className={styles.grid}>
      <div><h3>Websites and business applications</h3><p>Help customers understand your offer, find the right service, and send an inquiry. Build a business application when your team needs a clearer workflow across data and tools.</p><Link href="/web-group/">Explore Web services ↗</Link></div>
      <div><h3>AI assistants and automation</h3><p>Start with a repetitive question or process. Define the information, integration, and human handoff before building. Try Jarvis to see a working assistant for service questions and business inquiries.</p><Link href="/ai-group/">Explore AI services ↗</Link></div>
    </div>
    <h3>Project work and professional contributions</h3>
    <div className={styles.cards}>{featured.map(item => <article key={item.slug}>
      <Image src={item.imageSrc} alt={item.imageAlt} width={340} height={180} />
      <h3><Link href={item.href}>{item.title} ↗</Link></h3><p>{item.description}</p>
    </article>)}</div>
    <InquiryCTA cta="homepage" label="Talk through your project" starter="I would like help choosing a starting point for my website or automation project." />
    <nav className={styles.related} aria-label="Explore KDH"><Link href="/locations/freeport-ny/">Our Freeport base and service area ↗</Link><Link href="/industries/healthcare-websites/">Healthcare website work ↗</Link><Link href="/ai-group/solutions/ai-lead-assistant/">Explore the Jarvis demo ↗</Link></nav>
  </section>;
}
