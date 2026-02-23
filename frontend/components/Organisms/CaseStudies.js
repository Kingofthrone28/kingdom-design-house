import React from 'react';
import CaseStudyOverview from '../Molecules/CaseStudyOverview';
import CaseStudyProjectOverview from '../Molecules/CaseStudyProjectOverview';
import CaseStudyLetsTalk from '../Molecules/CaseStudyLetsTalk';
import CaseStudyThreeStep from '../Molecules/CaseStudyThreeStep';
import VideoPlayer from './VideoPlayer';
import styles from '../../styles/CaseStudies.module.scss';

const CaseStudies = ({ caseStudyData }) => {
  const {
    overview,
    projectOverview,
    letsTalk,
    threeStep,
    video
  } = caseStudyData;

  const handleLetsTalkClick = () => {
    const chatSection = document.getElementById('chat-jarvis');
    if (chatSection) {
      chatSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    } else {
      // Fallback: navigate to contact page
      window.location.href = '/contact/';
    }
  };

  return (
    <div className={styles.caseStudies}>
      {overview && (
        <CaseStudyOverview
          title={overview.title}
          text={overview.text}
          imageSrc={overview.imageSrc}
          imageAlt={overview.imageAlt}
        />
      )}
      
      {projectOverview && (
        <CaseStudyProjectOverview
          title={projectOverview.title}
          industry={projectOverview.industry}
          services={projectOverview.services}
          imageSrc={projectOverview.imageSrc}
          imageAlt={projectOverview.imageAlt}
        />
      )}
      
      {letsTalk && (
        <CaseStudyLetsTalk
          question={letsTalk.question}
          heading={letsTalk.heading}
          onClick={handleLetsTalkClick}
        />
      )}

      {video && (
        <section className={styles.caseStudies__video}>
          <div className={styles.caseStudies__videoContainer}>
            <VideoPlayer
              src={caseStudyData.video.src}
              poster={caseStudyData.video.poster}
              autoplay={caseStudyData.video.autoplay || false}
              loop={caseStudyData.video.loop || true}
              muted={caseStudyData.video.muted || true}
              controls={caseStudyData.video.controls !== undefined ? caseStudyData.video.controls : true}
              showOverlay={caseStudyData.video.showOverlay !== undefined ? caseStudyData.video.showOverlay : true}
              showLoading={caseStudyData.video.showLoading !== undefined ? caseStudyData.video.showLoading : true}
              playsInline={true}
            />
          </div>
        </section>
      )}
      
      {threeStep && (
        <CaseStudyThreeStep
          steps={threeStep.steps}
        />
      )}

    </div>
  );
};

export default CaseStudies;

