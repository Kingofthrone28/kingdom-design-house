import React, { useState } from 'react';
import Image from 'next/image';
import ChatInterface from './ChatInterface';
import styles from '../styles/JarvisFloat.module.scss';

const JarvisFloat = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      <button
        className={styles.jarvisFloat}
        onClick={() => setIsChatOpen(!isChatOpen)}
        aria-label="Chat with Jarvis"
      >
        <Image
          src="/images/Jarvis.png"
          alt="Chat with Jarvis"
          width={56}
          height={56}
          className={styles.jarvisFloat__image}
        />
      </button>

      <ChatInterface
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />
    </>
  );
};

export default JarvisFloat;
