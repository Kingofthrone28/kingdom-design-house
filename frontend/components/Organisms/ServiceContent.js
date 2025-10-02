import React from 'react';
import Image from 'next/image';
import styles from '../../styles/ServiceContent.module.scss';
import stylesProcessSteps from '../../styles/ProcessSteps.module.scss';
import { getServiceContentData } from '../../data/siteData';
import { useLayout } from '../../contexts/LayoutContext';
import Button from '../Atoms/Button';
import LayoutToggle from '../Molecules/LayoutToggle';

const ServiceContent = ({ serviceType = 'web-design', layout = null }) => {
  const serviceData = getServiceContentData(serviceType);
  const { 
    title, 
    icon, 
    mainContent, 
    approach, 
    expertise 
  } = serviceData;

  // Use layout from context if not provided as prop
  const { serviceLayout } = useLayout();
  const currentLayout = layout || serviceLayout;

  // Determine layout class
  const layoutClass = currentLayout === '2-column' ? styles['serviceContent__approachSteps--2column'] : styles['serviceContent__approachSteps--3column'];
  
  const scrollToChat = () => {
    const chatSection = document.getElementById('chat-jarvis');
    if (chatSection) {
      chatSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Debug logging
  console.log('ServiceContent Debug:', {
    currentLayout,
    layoutClass,
    availableStyles: Object.keys(styles).filter(key => key.includes('approachSteps'))
  });

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

        {/* Approach Section - Only render if approach exists */}
        {approach && (
          <div className={styles.serviceContent__approach}>
            <div className={styles.serviceContent__approachHeader}>
              <h2 className={styles.serviceContent__approachTitle}>
                {approach.title}
              </h2>
              <LayoutToggle className={styles.serviceContent__layoutToggle} />
            </div>
            
            <div className={`${styles.serviceContent__approachSteps} ${layoutClass}`}>
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
        )}

        {/* Expertise Section - Only render if expertise exists */}
        {expertise && (
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
        )}

        {/* CTA Section */}
        <div className={styles.serviceContent__cta}>
          <Button variant="primary" size="large" onClick={scrollToChat}>
            Get Started Today
          </Button>
        </div>
        {/* Diagonal Separator */}
        <div className={stylesProcessSteps.processSteps__decoration__separator}/>
      </div>
    </section>
  );
};

export default ServiceContent;