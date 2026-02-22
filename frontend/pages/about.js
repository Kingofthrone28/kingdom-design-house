import React from 'react';
import Image from 'next/image';
import Layout from '../components/Layout';
import SEOHead from '../components/SEOHead';
import StructuredData from '../components/StructuredData';
import GroupHero from '../components/GroupHero';
import GroupHeading from '../components/Molecules/GroupHeading';
import ProcessSteps from '../components/ProcessSteps';
import ChatJarvis from '../components/ChatJarvis';
import WhyChooseUs from '../components/WhyChooseUs';
import { getAboutData } from '../data/siteData';
import { pageSeoData } from '../lib/seo';
import styles from '../styles/About.module.scss';

export default function About() {
  const aboutData = getAboutData();
  const { title, subTitle, content } = aboutData;
  const seoData = pageSeoData.about;

  return (
    <>
      <SEOHead {...seoData} />
      <StructuredData />
      
      <Layout>
        <GroupHero groupName="web-group" />
        <section className={styles.about}>
          <div className={styles.about__container}>
            <div className={styles.about__grid}>
              {/* Left side - Profile Image */}
              <div className={styles.about__imageContainer}>
                <Image
                  src="/images/paul-profile.png"
                  alt="Paul Solomon - Founder of Kingdom Design House"
                  width={400}
                  height={400}
                  className={styles.about__image}
                  priority
                />
              </div>
              
              {/* Right side - Content */}
              <div className={styles.about__content}>
                <h1 className={styles.about__title}>
                  {title}
                </h1>
                <h2 className={styles.about__subTitle}>
                  {subTitle}
                </h2>
                
                <div className={styles.about__text}>
                  {content.map((paragraph, index) => (
                    <p key={index} className={styles.about__paragraph}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        <ProcessSteps />
        <ChatJarvis />
        <WhyChooseUs />  
      </Layout>
    </>
  );
}
