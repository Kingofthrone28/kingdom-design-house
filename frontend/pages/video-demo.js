import React from 'react';
import VideoPlayer from '../components/Organisms/VideoPlayer';
import VideoShowcase from '../components/VideoShowcase';
import SEOHead from '../components/SEOHead';
import { pageSeoData } from '../lib/seo';

const VideoDemoPage = () => {
  const seoData = {
    ...pageSeoData.videoDemo,
    title: 'Video Demo - Kingdom Design House',
    description: 'Experience our video components and see how we showcase our work through engaging video content.',
    keywords: 'video demo, web development showcase, business transformation videos, Kingdom Design House',
    noindex: true
  };

  return (
    <>
      <SEOHead {...seoData} />
      
      <main style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '40px', color: '#2c3e50' }}>
          Video Component Demo
        </h1>
        
        <div style={{ marginBottom: '60px' }}>
          <h2 style={{ marginBottom: '20px', color: '#34495e' }}>Basic Video Player</h2>
          <VideoPlayer
            src="/videos/jarvis.mp4"
            poster="/images/jarvis_poster.png"
            autoplay={false}
            loop={false}
            controls={true}
            className="videoPlayer--16-9"
            width="100%"
            height="400px"
            onPlay={() => console.log('Video started')}
            onPause={() => console.log('Video paused')}
            onEnded={() => console.log('Video ended')}
            onError={(error) => console.error('Video error:', error)}
          />
        </div>

        <div style={{ marginBottom: '60px' }}>
          <h2 style={{ marginBottom: '20px', color: '#34495e' }}>Custom Controls Video</h2>
          <VideoPlayer
            src="/videos/jarvis.mp4"
            poster="/images/jarvis_poster.png"
            autoplay={false}
            loop={false}
            controls={false}
            className="videoPlayer--4-3"
            width="100%"
            height="300px"
          />
        </div>

        <div style={{ marginBottom: '60px' }}>
          <h2 style={{ marginBottom: '20px', color: '#34495e' }}>Square Format Video</h2>
          <VideoPlayer
            src="/videos/jarvis.mp4"
            poster="/images/jarvis_poster.png"
            autoplay={false}
            loop={false}
            controls={true}
            className="videoPlayer--1-1"
            width="300px"
            height="300px"
          />
        </div>

        <div style={{ marginBottom: '60px' }}>
          <h2 style={{ marginBottom: '20px', color: '#34495e' }}>Video Showcase Component</h2>
          <VideoShowcase />
        </div>

        <div style={{ 
          background: '#f8f9fa', 
          padding: '40px', 
          borderRadius: '8px',
          marginTop: '40px'
        }}>
          <h3 style={{ marginBottom: '20px', color: '#2c3e50' }}>Usage Examples</h3>
          <div style={{ display: 'grid', gap: '20px' }}>
            <div>
              <h4>Basic Usage:</h4>
              <pre style={{ 
                background: '#2c3e50', 
                color: '#ecf0f1', 
                padding: '15px', 
                borderRadius: '4px',
                overflow: 'auto'
              }}>
{`<VideoPlayer
  src="/videos/your-video.mp4"
  poster="/images/poster.jpg"
  controls={true}
  className="videoPlayer--16-9"
/>`}
              </pre>
            </div>
            
            <div>
              <h4>Custom Controls:</h4>
              <pre style={{ 
                background: '#2c3e50', 
                color: '#ecf0f1', 
                padding: '15px', 
                borderRadius: '4px',
                overflow: 'auto'
              }}>
{`<VideoPlayer
  src="/videos/your-video.mp4"
  controls={false}
  autoplay={false}
  loop={true}
  onPlay={() => console.log('Playing')}
  onPause={() => console.log('Paused')}
/>`}
              </pre>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default VideoDemoPage;
