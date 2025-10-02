import React from 'react';
import styles from '../../styles/PricingPlans.module.scss';
import Link from 'next/link';
import {navbarData} from '../../data/navbarData';
import Button from '../Atoms/Button';

const PricingPlans = ({ 
  plans = [], 
  isMonthly = false, 
  className = '' 
}) => {
  const formatPrice = (price, isMonthly) => {
    if (isMonthly) {
      // Calculate monthly price (assuming 3-6 month financing)
      const monthlyPrice = Math.round(price / 4); // 4 months average
      return `$${monthlyPrice.toLocaleString()}`;
    }
    return `$${price.toLocaleString()}`;
  };

  return (
    <div className={`${styles.pricingPlans} ${className}`}>
      <div className={styles.pricingPlans__container}>
        {plans.map((plan, index) => (
          <div key={index} className={styles.pricingPlans__plan}>
            <div className={styles.pricingPlans__planHeader}>
              <h3 className={styles.pricingPlans__planTitle}>
                {plan.title}
              </h3>
              <p className={styles.pricingPlans__planDescription}>
                {plan.description}
              </p>
            </div>

            <div className={styles.pricingPlans__planPricing}>
              <div className={styles.pricingPlans__price}>
                {formatPrice(plan.setupPrice, isMonthly)}
              </div>
              <div className={styles.pricingPlans__priceLabel}>
                {isMonthly ? '(monthly payment)' : '(one time setup)'}
              </div>
            </div>

            <div className={styles.pricingPlans__planFeatures}>
              <h4 className={styles.pricingPlans__featuresTitle}>
                Included Services:
              </h4>
              <ul className={styles.pricingPlans__featuresList}>
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className={styles.pricingPlans__feature}>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.pricingPlans__planSupport}>
              <h4 className={styles.pricingPlans__supportTitle}>
                Monthly support: {formatPrice(plan.monthlySupport, false)}/mo
              </h4>
              <ul className={styles.pricingPlans__supportList}>
                {plan.supportFeatures.map((feature, featureIndex) => (
                  <li key={featureIndex} className={styles.pricingPlans__supportFeature}>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.pricingPlans__planAction}>
              <Button variant="primary" size="large">
                Get Started
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Enterprise Section */}
      <div className={styles.pricingPlans__enterprise}>
        <h3 className={styles.pricingPlans__enterpriseTitle}>
          Enterprise
        </h3>
        <h4 className={styles.pricingPlans__enterpriseSubtitle}>
          Fully Custom Solution - Schedule a Call
        </h4>
        <p className={styles.pricingPlans__enterpriseDescription}>
          The Enterprise Package is designed for corporations with unique requirements that need custom development, interactive features, and integration with other tools or systems. This is a fully tailored solution with no upfront cost. Payment terms are discussed based on the scope and complexity of the project. May include SaaS tools, CI/CD pipelines, backend or frontend frameworks or systems to integrate RESTFUL API, reporting dashboards, OAuth, 2FA Authentication, LLM solutions and more.
        </p>
        <div className={styles.pricingPlans__enterpriseAction}>
          <Link href={`tel:${navbarData.contact.phone}`}>
            <Button variant="secondary" size="large">
              Schedule a Call
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PricingPlans;