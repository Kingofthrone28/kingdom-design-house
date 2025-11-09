import React, { useState, useRef } from 'react';
import styles from '../../styles/VideoPlayer.module.scss';

const VideoPlayer = ({ 
  src, 
  poster, 
  autoplay = false, 
  loop = false, 
  muted = false, 
  playsInline = true,
  controls = true,
  showOverlay = true,
  showLoading = true,
  className = '',
  width = '100%',
  height = 'auto',
  preload = 'auto',
  onPlay,
  onPause,
  onEnded,
  onError
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(showLoading);
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef(null);

  // Fallback timeout to hide loading spinner
  React.useEffect(() => {
    if (!showLoading) {
      setIsLoading(false);
      return;
    }

    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 5000); // Hide loading after 5 seconds

    return () => clearTimeout(timeout);
  }, [showLoading]);

  const handlePlay = () => {
    setIsPlaying(true);
    onPlay && onPlay();
  };

  const handlePause = () => {
    setIsPlaying(false);
    onPause && onPause();
  };

  const restartVideo = () => {
    if (!videoRef.current) return;

    try {
      // Jump slightly into the timeline to avoid displaying a blank frame
      videoRef.current.currentTime = 0.01;
    } catch (error) {
      console.warn('Unable to set video currentTime:', error);
    }

    const playPromise = videoRef.current.play();
    if (playPromise && typeof playPromise.then === 'function') {
      playPromise.catch((error) => {
        console.warn('Video autoplay prevented on loop restart:', error);
      });
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);

    if (loop) {
      restartVideo();
      return;
    }

    onEnded && onEnded();
  };

  const handleError = (error) => {
    setHasError(true);
    setIsLoading(false);
    console.error('Video error:', error);
    onError && onError(error);
  };

  const handleLoadedData = () => {
    console.log('Video loaded data');
    setIsLoading(false);
    setHasError(false);
  };

  const handleCanPlay = () => {
    console.log('Video can play');
    setIsLoading(false);
    setHasError(false);
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      togglePlayPause();
    }
  };

  if (hasError) {
    return (
      <div className={`${styles.videoPlayer} ${styles.videoPlayer__error} ${className}`}>
        <div className={styles.videoPlayer__errorContent}>
          <p>Unable to load video</p>
          <button 
            onClick={() => {
              setHasError(false);
              setIsLoading(true);
              if (videoRef.current) {
                videoRef.current.load();
              }
            }}
            className={styles.videoPlayer__retryButton}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`${styles.videoPlayer} ${className}`}
      style={{ width, height }}
    >
      <video
        ref={videoRef}
        className={styles.videoPlayer__video}
        src={src}
        poster={poster}
        autoPlay={autoplay}
        muted={muted}
        playsInline={playsInline}
        controls={controls}
        preload={preload}
        onPlay={handlePlay}
        onPause={handlePause}
        onEnded={handleEnded}
        onError={handleError}
        onLoadedData={handleLoadedData}
        onCanPlay={handleCanPlay}
        onKeyDown={handleKeyPress}
        tabIndex={0}
      />
      
      {isLoading && (
        <div className={styles.videoPlayer__loading}>
          <div className={styles.videoPlayer__spinner}></div>
          <p>Loading video...</p>
        </div>
      )}

      {!controls && showOverlay && (
        <div 
          className={styles.videoPlayer__overlay}
          onClick={togglePlayPause}
          onKeyDown={handleKeyPress}
          tabIndex={0}
          role="button"
          aria-label={isPlaying ? 'Pause video' : 'Play video'}
        >
          <div className={styles.videoPlayer__playButton}>
            {isPlaying ? (
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z"/>
              </svg>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
