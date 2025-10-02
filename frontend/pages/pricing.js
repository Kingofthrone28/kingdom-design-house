import React, { useState } from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import PricingGroup from '../components/PricingGroup';
import PlanTypeSelector from '../components/Molecules/PlanTypeSelector';
import PricingToggle from '../components/Atoms/PricingToggle';
import PricingPlans from '../components/Organisms/PricingPlans';
import { getPricingData } from '../data/siteData';
import styles from '../styles/Pricing.module.scss';

export default function Pricing() {
  const [isMonthly, setIsMonthly] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState('web');
  
  const pricingData = getPricingData(selectedGroup);
  const { plans } = pricingData;

  const handleToggle = () => {
    setIsMonthly(!isMonthly);
  };

  const handleGroupChange = (groupType) => {
    setSelectedGroup(groupType);
  };

  return (
    <>
      <Head>
        <title>Pricing - Kingdom Design House</title>
        <meta name="description" content="Choose the perfect plan for your business needs. Web development, network solutions, and AI services with flexible pricing options." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
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
      </Layout>
    </>
  );
}