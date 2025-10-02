import React, { useState } from 'react';
import ChatInterface from './ChatInterface';
import styles from '../styles/ChatJarvis.module.scss';
import Button from './Atoms/Button';
import { useSiteData } from '../contexts/SiteDataContext';
import Image from 'next/image';

const ChatJarvis = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { getChatData } = useSiteData();
  const chatData = getChatData();
  const { buttonText } = chatData || { buttonText: "Chat with Jarvis" };
    

  const handleChatClick = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <section id="chat-jarvis" className={styles.chatJarvis}>
      <div className={styles.chatJarvis__container}>
        <Image src="/images/Jarvis.png" alt="Chat with Jarvis" width={250} height={250} />
        <Button variant="secondary" size="large" onClick={handleChatClick}>
          {buttonText}
        </Button>
      </div>
      <p className={styles.chatJarvis__subtext}>Meet your AI Assistant, Jarvis, who is here to help you with any questions starting your project with questions about our group services, packages, and more.</p>


      {/* Splashes */}
      <div className={styles.chatJarvis__decoration}>
        <div className={`${styles.chatJarvis__splash} ${styles['chatJarvis__splash--left']}`}/>
        <div className={`${styles.chatJarvis__splash} ${styles['chatJarvis__splash--right']}`}/>
      </div>

      {/* Chat Interface Modal */}
      <ChatInterface 
        isOpen={isChatOpen} 
        onClose={() => handleChatClick()} 
      />
    </section>
  );
};

export default ChatJarvis;