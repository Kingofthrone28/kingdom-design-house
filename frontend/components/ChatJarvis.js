import React from 'react';
import { useJarvis } from '../contexts/JarvisContext';
import { trackAcquisition } from '../utils/analytics';
import styles from '../styles/ChatJarvis.module.scss';
import Button from './Atoms/Button';
import { useSiteData } from '../contexts/SiteDataContext';
import Image from 'next/image';

const ChatJarvis = () => {
  const { openJarvis } = useJarvis();
  const { getChatData } = useSiteData();
  const chatData = getChatData();
  const { buttonText } = chatData || { buttonText: "Chat with Jarvis" };
    

  const handleChatClick = () => {
    const context = { cta: 'homepage', sourcePath: '/' };
    trackAcquisition('service_cta_click', context);
    openJarvis(context);
  };

  return (
    <section id="chat-jarvis" className={styles.chatJarvis}>
      <div className={styles.chatJarvis__container}>
        <Image src="/images/Jarvis.png" alt="Chat with Jarvis" width={250} height={250} />
        <Button variant="secondary" size="large" onClick={handleChatClick}>
          {buttonText}
        </Button>
      </div>
      <p className={styles.chatJarvis__subtext}>Meet your AI Assistant, Jarvis, who is here to help you with starting your project with questions about our group services, packages, and more.</p>


      {/* Splashes */}
      <div className={styles.chatJarvis__decoration}>
        <div className={`${styles.chatJarvis__splash} ${styles['chatJarvis__splash--left']}`}/>
        <div className={`${styles.chatJarvis__splash} ${styles['chatJarvis__splash--right']}`}/>
      </div>

    </section>
  );
};

export default ChatJarvis;
