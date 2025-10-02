import React from 'react';
import styles from '../styles/Hero.module.scss';
import { useSiteData } from '../contexts/SiteDataContext';
import Button from './Atoms/Button';
import { getGroupsData } from '../data/siteData';

const GroupHero = ({ groupName = 'default' }) => {
    /*
    Get the current group data  (groupName)
    Get the background image for the current group (bgImage)
    Get the tagline for the current group (tagline)
    Get the button text for the current group (buttonText)
    Get the main headline for the current group (main)
    Get the sub headline for the current group (sub)
    Get the sub highlight for the current group (subHighlight)
    Get the highlight for the current group (highlight)
  */
  const { getHeroData } = useSiteData();
  const heroData = getHeroData();
  const groupData = getGroupsData();
  const currentGroup = groupData.find(group => group.id === groupName) || groupData[0];
  const { bgImage } = currentGroup;
  const { tagline } = currentGroup;
  const buttonData = heroData.chat; 
  const { buttonText } = buttonData || { buttonText: "Start a Project" };

  const { 
    main, 
    sub, 
    subHighlight, 
    highlight 
  } = heroData.headline;

  const scrollToChat = () => {
    const chatSection = document.getElementById('chat-jarvis');
    if (chatSection) {
      chatSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section className={styles.hero} style={{ backgroundImage: `url(${bgImage})` }}>
      <div className={styles[`hero__container--${groupName}`] || styles.hero__container}>
       
        {/* Tagline */}
        <p className={styles.hero__tagline}>

          Your #1 Partner for  <span className={styles.hero__headline__highlight}>{tagline}</span>
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

      {/* CTA Button */}
      <Button variant="primary" size="large" onClick={scrollToChat}>
          {buttonText}
      </Button>

      {/* Diagonal Separator */}
      <div className={styles.hero__separator}/>
    </section>
  );
};

export default GroupHero;