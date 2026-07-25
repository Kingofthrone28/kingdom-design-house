import React from 'react';
import VideoPlayer from './Organisms/VideoPlayer';
import styles from '../styles/VideoShowcase.module.scss';

const VideoShowcase = () => {
  return (
    <section className={styles.videoShowcase}>
      <div className={styles.videoShowcase__container}>
        <h2 className={styles.videoShowcase__title}>
          Jarvis in <span className={styles.videoShowcase__title__highlight}>Action</span>
        </h2>
        <p className={styles.videoShowcase__description}>
          See how we transform businesses through innovative web solutions and AI integration with Jarvis capturing real-time data.
        </p>
        
        <div className={styles.videoShowcase__grid}>
          {/* Main featured video */}
          <div className={styles.videoShowcase__featured}>
            <VideoPlayer
              src="/videos/jarvis.mp4"
              poster="/images/jarvis_poster.png"
              autoplay={false}
              loop={false}
              controls={true}
              className="videoPlayer--16-9"
            />
            <div className={styles.videoShowcase__featuredInfo}>
              <h3>Complete Business Transformation</h3>
              <p>Watch Jarvis help a local business increase their sales conversion rate by 300%</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoShowcase;
