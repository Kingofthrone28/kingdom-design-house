import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PricingGroup from '../PricingGroup';
import PlanTypeSelector from '../Molecules/PlanTypeSelector';
import PricingToggle from '../Atoms/PricingToggle';
import PricingPlans from './PricingPlans';
import { getPricingData } from '../../data/siteData';
import styles from '../../styles/Pricing.module.scss';

export default function PricingSection() {
  const router = useRouter();
  const requestedGroup = router.query.group;
  const [isMonthly, setIsMonthly] = useState(true);
  const [selectedGroup, setSelectedGroup] = useState('web');
  const { plans } = getPricingData(selectedGroup);

  useEffect(() => {
    if (router.isReady && ['web', 'network', 'ai'].includes(requestedGroup)) {
      setSelectedGroup(requestedGroup);
    }
  }, [router.isReady, requestedGroup]);

  return (
    <section id="pricing" className={styles.pricing} aria-label="Pricing and packages">
      <div className={styles.pricing__container}>
        <PricingGroup
          selectedGroup={selectedGroup}
          onGroupChange={setSelectedGroup}
          className={styles.pricing__groupSelector}
        />
        <div className={styles.pricing__header}>
          <PlanTypeSelector className={styles.pricing__planType} />
          <PricingToggle
            isMonthly={isMonthly}
            onToggle={() => setIsMonthly(current => !current)}
            className={styles.pricing__toggle}
          />
        </div>
        <PricingPlans
          plans={plans}
          isMonthly={isMonthly}
          className={styles.pricing__plans}
        />
      </div>
    </section>
  );
}
