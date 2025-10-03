import React, { useState } from 'react';
import Layout from '../components/Layout';
import SEOHead from '../components/SEOHead';
import ChatJarvis from '../components/ChatJarvis';
import PricingGroup from '../components/PricingGroup';
import PlanTypeSelector from '../components/Molecules/PlanTypeSelector';
import PricingToggle from '../components/Atoms/PricingToggle';
import PricingPlans from '../components/Organisms/PricingPlans';
import { getPricingData } from '../data/siteData';
import { pageSeoData } from '../lib/seo';
import styles from '../styles/Pricing.module.scss';

export default function Pricing() {
  const [isMonthly, setIsMonthly] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState('web');
  
  const pricingData = getPricingData(selectedGroup);
  const { plans } = pricingData;
  const seoData = pageSeoData.pricing;

  const handleToggle = () => {
    setIsMonthly(!isMonthly);
  };

  const handleGroupChange = (groupType) => {
    setSelectedGroup(groupType);
  };

  return (
    <>
      <SEOHead {...seoData} />
      
      <Layout>
        <section className={styles.pricing}>
          <div className={styles.pricing__container}>
            {/* Group Selection */}
            <PricingGroup 
              selectedGroup={selectedGroup}
              onGroupChange={handleGroupChange}
              className={styles.pricing__groupSelector}
            />

            {/* Plan Type Selector and Toggle */}
            <div className={styles.pricing__header}>
              <PlanTypeSelector className={styles.pricing__planType} />
              <PricingToggle 
                isMonthly={isMonthly}
                onToggle={handleToggle}
                className={styles.pricing__toggle}
              />
            </div>

            {/* Pricing Plans */}
            <PricingPlans 
              plans={plans}
              isMonthly={isMonthly}
              className={styles.pricing__plans}
            />
          </div>
        </section>
        <ChatJarvis />
      </Layout>
    </>
  );
}