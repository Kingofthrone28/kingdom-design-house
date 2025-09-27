import React from 'react';
import NextImage from 'next/image';
import styles from '../styles/Hero.module.scss';
import { useSiteData } from '../contexts/SiteDataContext';

const Hero = () => {
  const { getHeroData } = useSiteData();
  const heroData = getHeroData();
  const { 
    main, 
    sub, 
    subHighlight, 
    highlight 
  } = heroData.headline;

  return (
    <section className={styles.hero}>
      <div className={styles.hero__container}>
        {/* Logo */}
        <div className={styles.hero__logo}>
          <div className={styles.hero__logo__image}>
            <NextImage 
              src="/images/kdh_logo.svg" 
              alt="Kingdom Design House" 
              width={350} 
              height={350}
              priority
            />
          </div>
        </div>  

        {/* Tagline */}
        <p className={styles.hero__tagline}>
          Your All-In-One Partner for <span className={styles.hero__headline__highlight}>Web Development / IT / Networking & AI Solutions</span>
        </p>

        {/* Main Headline */}
        <div className={styles.hero__headline}>
          <h1 className={styles.hero__headline__main}>{main} {''}
            <span className={styles.hero__headline__highlight}>{highlight}</span>
          </h1>
          <h1 className={styles.hero__headline__sub}>
           {sub} {''}
            <span className={styles.hero__headline__highlight}>{subHighlight}</span>
          </h1>
        </div>
      </div>

      {/* Diagonal Separator */}
      <div className={styles.hero__separator}/>
    </section>
  );
};

export default Hero;