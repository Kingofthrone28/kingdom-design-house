import React, { useState } from 'react';
import styles from '../styles/OurGroups.module.scss';
import { useSiteData } from '../contexts/SiteDataContext';
import Button from './Atoms/Button';
import Link from 'next/link';

const OurGroups = () => {
  const [activeGroup, setActiveGroup] = useState('web');
  const { getGroupsData } = useSiteData();
  const groups = getGroupsData() || [];

  const handleGroupClick = (groupId) => {
    setActiveGroup(groupId);
  };

  return (
    <section className={styles.ourGroups}>
      <div className={styles.ourGroups__container}>
        <div className={styles.ourGroups__header}>
          <h2 className={styles.ourGroups__title}>
            Our <span className={styles.ourGroups__title__highlight}>Groups</span>
          </h2>
          <p className={styles.ourGroups__subtext}>Our groups are designed to help you grow your business and achieve your goals. Whether you're looking to start a new business, expand your existing business, or just need some help, you have a choice between our groups below to take you to the next level.</p>
        </div>

        <div className={styles.ourGroups__grid}>
            {groups.map((group) => (
              <div
                key={group.id}
                className={`${styles.ourGroups__card} ${
                  activeGroup === group.id ? styles['ourGroups__card--active'] : ''
                }`}
                onClick={() => handleGroupClick(group.id)}
              >
              <div 
                className={styles.ourGroups__card__logo}
                style={{ 
                    backgroundImage: `url(${group.logo})`, 
                    backgroundPosition: 'center', 
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'contain',
                    height: '310px'
                }}
              >
              </div>

              <p className={styles.ourGroups__card__description}>
                {group.description}
              </p>
              <Link href={group.route}> 
                <Button className={styles.ourGroups__card__button} variant="primary" size="large" onClick={() => handleGroupClick(group.id)}>{group.buttonText}</Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurGroups;