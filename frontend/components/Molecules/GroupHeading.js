import React from 'react';
import styles from '../../styles/GroupHeading.module.scss';
import { getGroupHeadingData } from '../../data/siteData';

const GroupHeading = ({ groupName = 'ourGroups', groupIntent = null }) => {
  const headingData = getGroupHeadingData(groupName);
  const { title, content, highlightedText } = headingData;

  // Split the title to separate the highlighted part
  const titleParts = title.split(highlightedText);
  const beforeHighlight = titleParts[0];
  const afterHighlight = titleParts[1];

  return (
    <section className={styles.groupHeading}>
      <div className={styles.groupHeading__container}>
        {/* Heading with highlighted text and optional groupIntent */}
        <h2 className={styles.groupHeading__title}>
          {beforeHighlight}
          <span className={styles.groupHeading__highlight}>
            {highlightedText}
          </span>
          {afterHighlight}
          {groupIntent && (
            <>
              <br />
              <span className={styles.groupHeading__intent}>
                {groupIntent}
              </span>
            </>
          )}
        </h2>
        
        {/* Content paragraph with HTML support */}
        <div 
          className={styles.groupHeading__content}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </section>
  );
};

export default GroupHeading;