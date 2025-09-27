import React from 'react';
import styles from '../styles/WhyChooseUs.module.scss';

const WhyChooseUs = () => {
  return (
    <section className={styles.whyChooseUs}>
      <div className={styles.whyChooseUs__container}>
        <div className={styles.whyChooseUs__header}>
          <h2 className={styles.whyChooseUs__title}>
            Why <span className={styles.whyChooseUs__title__highlight}>Choose Us</span>
          </h2>
        </div>

        <div className={styles.whyChooseUs__content}>
          <p className={styles.whyChooseUs__description}>
            With over 10 years of experience in web development and software engineering, 
            <span className={styles.whyChooseUs__highlight}> Kingdom Design House</span> has 
            established itself as a trusted partner for businesses seeking innovative digital solutions. 
            Our team specializes in creating scalable web applications, automating complex workflows, 
            and implementing cutting-edge AI-driven tools that transform how organizations operate. 
            We pride ourselves on delivering robust system architectures that not only meet current 
            needs but also adapt to future growth. Our commitment to client satisfaction is reflected 
            in our results-driven approach, where every project is tailored to maximize efficiency 
            and drive measurable business outcomes.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;