import React from 'react';
import VideoPlayer from './Organisms/VideoPlayer';
import styles from '../styles/VideoShowcase.module.scss';

const VideoShowcase = () => {
  const handleVideoPlay = () => {
    console.log('Video started playing');
  };

  const handleVideoPause = () => {
    console.log('Video paused');
  };

  const handleVideoEnded = () => {
    console.log('Video ended');
  };

  const handleVideoError = (error) => {
    console.error('Video error:', error);
  };

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
              onPlay={handleVideoPlay}
              onPause={handleVideoPause}
              onEnded={handleVideoEnded}
              onError={handleVideoError}
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