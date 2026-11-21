import React from 'react';
import Image from 'next/image';
import { useJarvis } from '../contexts/JarvisContext';
import { trackAcquisition } from '../utils/analytics';
import styles from '../styles/JarvisFloat.module.scss';

const JarvisFloat = () => {
  const { openJarvis, isOpen } = useJarvis();

  return (
    <>
      <button
        className={styles.jarvisFloat}
        onClick={() => { trackAcquisition('service_cta_click', { cta: 'floating' }); openJarvis({ cta: 'floating' }); }}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
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

    </>
  );
};

export default JarvisFloat;
