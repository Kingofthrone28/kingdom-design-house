import React from 'react';
import NextImage from 'next/image';
import styles from '../styles/Hero.module.scss';
import { useSiteData } from '../contexts/SiteDataContext';
import VideoPlayer from './Organisms/VideoPlayer';
import Button from './Atoms/Button';
import Link from 'next/link';

const Hero = ({ pageHeadline = null }) => {
  const { getHeroData } = useSiteData();
  const heroData = getHeroData();
  
  // Use page-specific headline or fall back to default
  const { 
    main, 
    sub, 
    subHighlight, 
    highlight 
  } = pageHeadline || heroData.headline;

  return (
    <section className={styles.hero}>
      <div className={styles.hero__video}>
        <VideoPlayer
          src="/videos/kdh_promo.mp4"
          autoplay
          loop
          muted
          controls={false}
          showOverlay={false}
          showLoading={false}
          width="100%"
          height="100%"
        />
      </div>

      <div className={styles.hero__overlay} />

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
          Your All-In-One Partner for <span className={styles.hero__headline__highlight}>Web Development / IT / Networking & AI Solutions in NY</span>
        </p>

        {/* Main Headline */}
        <div className={styles.hero__headline}>
          <h1 className={styles.hero__headline__main}>
            {main} {''}
            <span className={styles.hero__headline__highlight}>{highlight}</span>
            <br />
            {sub} {''}
            <span className={styles.hero__headline__highlight}>{subHighlight}</span>
          </h1>
        </div>
      </div>

      {/* CTA Button */}
      
        <Button href="/case-studies/" variant="secondary" size="large">
          Discover Our Work
        </Button>

      {/* Diagonal Separator */}
      <div className={styles.hero__separator}/>
    </section>
  );
};

export default Hero;