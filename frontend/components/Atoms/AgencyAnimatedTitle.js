import styles from '../../styles/AgencyServiceTemplate.module.scss';

const AnimatedTitleLine = ({ text, offset, accent = false, compact = false }) => {
  let characterCursor = offset;

  return (
    <span
      className={`${styles.heroLine} ${accent ? styles.yellow : ''} ${compact ? styles.heroLineCompact : ''}`}
      aria-hidden="true"
    >
      {text.split(' ').map((word, wordIndex) => {
        const wordOffset = characterCursor;
        characterCursor += word.length + 1;

        return (
          <span key={`${word}-${wordIndex}`} className={styles.heroWord}>
            {Array.from(word).map((character, characterIndex) => (
              <span
                key={`${character}-${characterIndex}`}
                className={styles.heroCharacter}
                style={{ '--char-delay': `${(wordOffset + characterIndex) * 18}ms` }}
              >
                {character}
              </span>
            ))}
          </span>
        );
      })}
    </span>
  );
};

export default function AgencyAnimatedTitle({ lines, accentIndex = 1, compactLast = true }) {
  let characterOffset = 0;

  return lines.map((line, index) => {
    const offset = characterOffset;
    characterOffset += line.length + 1;

    return (
      <AnimatedTitleLine
        key={line}
        text={line}
        offset={offset}
        accent={index === accentIndex}
        compact={compactLast && index === lines.length - 1 && lines.length > 2}
      />
    );
  });
}
