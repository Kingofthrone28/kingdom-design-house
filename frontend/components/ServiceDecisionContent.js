import Link from 'next/link';
import InquiryCTA from './InquiryCTA';
import PricingSummary from './PricingSummary';
import styles from '../styles/Acquisition.module.scss';

export default function ServiceDecisionContent({ guide, service, group }) {
  if (!guide) return null;
  return <section className={styles.section} aria-label="Plan your project">
    <div className={styles.grid}>
      <div><p className={styles.eyebrow}>A practical starting point</p><h2>{guide.heading}</h2><p>{guide.problem}</p></div>
      <div><h3>What we deliver</h3><ul>{guide.deliverables.map(item => <li key={item}>{item}</li>)}</ul><h3>Scope and responsibilities</h3><p>{guide.boundaries}</p></div>
    </div>
    <div className={styles.proof}><h3>Relevant work</h3>{guide.proof.map(item => <p key={item.href}><Link href={item.href}>{item.label} ↗</Link> — {item.detail}</p>)}</div>
    <h3>How pricing is scoped</h3><p>{guide.pricingBasis}</p>
    <PricingSummary group={group} />
    <h3>Questions before you start</h3>
    <div className={styles.faqs}>{guide.faqs.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div>
    <InquiryCTA service={service} label={guide.cta} starter={guide.starter} />
    {guide.related?.length > 0 && <nav className={styles.related} aria-label="Related services and guidance">{guide.related.map(link => <Link key={link.href} href={link.href}>{link.label} ↗</Link>)}</nav>}
  </section>;
}
