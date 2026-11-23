import { useState } from 'react';
import Link from 'next/link';
import PricingGroup from '../PricingGroup';
import styles from '../../styles/PricingTeaser.module.scss';
import processStyles from '../../styles/ProcessSteps.module.scss';

const groups = {
  web: {
    label: 'Web',
    description: 'Build your online presence with a website designed around your business, your customers, and your next stage of growth.'
  },
  network: {
    label: 'Network',
    description: 'Keep your team connected with network design, reliable office Wi-Fi, and support for your business infrastructure.'
  },
  ai: {
    label: 'AI',
    description: 'Put AI to work with intelligent assistants, connected workflows, and automation that helps your team spend less time on repetitive tasks.'
  }
};

export default function PricingTeaser() {
  const [selectedGroup, setSelectedGroup] = useState('web');
  const group = groups[selectedGroup];

  return (
    <section id="pricing" className={styles.teaser} aria-labelledby="pricing-teaser-title">
      <div className={styles.container}>
        <p className={styles.eyebrow}>Work with Kingdom Technologies</p>
        <div className={styles.heading}>
          <h2 id="pricing-teaser-title" className={processStyles.processSteps__title}>
            Three ways to <span className={processStyles.processSteps__title__highlight}>level up</span>
          </h2>
        </div>
        <p className={styles.description}>
          Whether you need a website that works harder, a reliable network, or AI that handles the busywork, choose your group and explore the packages.
        </p>
        <PricingGroup
          className={styles.groups}
          selectedGroup={selectedGroup}
          onGroupChange={setSelectedGroup}
          showTitle={false}
        />
        <div className={styles.selection}>
          <p className={styles.groupDescription} aria-live="polite">{group.description}</p>
          <Link
            href={{ pathname: '/pricing/', query: { group: selectedGroup } }}
            className={styles.cta}
          >
            Explore {group.label} packages <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
      <div className={styles.divider} aria-hidden="true" />
    </section>
  );
}
