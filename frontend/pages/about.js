import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Layout from '../components/Layout';
import GroupHero from '../components/GroupHero';
import GroupHeading from '../components/Molecules/GroupHeading';
import ProcessSteps from '../components/ProcessSteps';
import ChatJarvis from '../components/ChatJarvis';
import WhyChooseUs from '../components/WhyChooseUs';
import { getAboutData } from '../data/siteData';
import styles from '../styles/About.module.scss';

export default function About() {
  const aboutData = getAboutData();
  const { title, subTitle, content } = aboutData;

  return (
    <>
      <Head>
        <title>About - Kingdom Design House</title>
        <meta name="description" content="Learn about the founder and story behind Kingdom Design House, a technology company dedicated to solving problems through innovative web development, digital marketing, and network solutions." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
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
                <h1 className={styles.about__subTitle}>
                  {subTitle}
                </h1>
                
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