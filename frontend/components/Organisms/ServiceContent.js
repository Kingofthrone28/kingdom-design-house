import React from 'react';
import Image from 'next/image';
import styles from '../../styles/ServiceContent.module.scss';
import { getServiceContentData } from '../../data/siteData';
import Button from '../Atoms/Button';

const ServiceContent = ({ serviceType = 'web-design' }) => {
  const serviceData = getServiceContentData(serviceType);
  const { 
    title, 
    icon, 
    mainContent, 
    approach, 
    expertise 
  } = serviceData;

  return (
    <section className={styles.serviceContent}>
      <div className={styles.serviceContent__container}>
      

        {/* Main Content Section */}
        <div className={styles.serviceContent__main}>
          <h2 className={styles.serviceContent__mainTitle}>
            {mainContent.title}
          </h2>
          
          <div className={styles.serviceContent__mainText}>
            {mainContent.paragraphs.map((paragraph, index) => (
              <p 
                key={index} 
                className={styles.serviceContent__paragraph}
                dangerouslySetInnerHTML={{ __html: paragraph }}
              />
            ))}
          </div>
        </div>

        {/* Approach Section */}
        <div className={styles.serviceContent__approach}>
          <h2 className={styles.serviceContent__approachTitle}>
            {approach.title}
          </h2>
          
          <div className={styles.serviceContent__approachSteps}>
            {approach.steps.map((step, index) => (
              <div key={index} className={styles.serviceContent__step}>
                <div className={styles.serviceContent__stepContent}>
                  <h3 className={styles.serviceContent__stepTitle}>
                    {step.title}
                  </h3>
                  <p className={styles.serviceContent__stepDescription}>
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Expertise Section */}
        <div className={styles.serviceContent__expertise}>
          <h2 className={styles.serviceContent__expertiseTitle}>
            {expertise.title}
          </h2>
          
          <ul className={styles.serviceContent__expertiseList}>
            {expertise.items.map((item, index) => (
              <li key={index} className={styles.serviceContent__expertiseItem}>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* CTA Section */}
        <div className={styles.serviceContent__cta}>
          <Button variant="primary" size="large">
            Get Started Today
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServiceContent;