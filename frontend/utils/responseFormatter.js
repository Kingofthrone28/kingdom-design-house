import React from 'react';

const keywordPatterns = [
  /\b(web development|web design|digital marketing|IT services|AI integration|networking|support)\b/gi,
  /\b(React|Next\.js|Node\.js|JavaScript|TypeScript|HTML|CSS|API|database|cloud|AWS|Azure)\b/gi,
  /\b(budget|timeline|project|requirements|features|scalable|responsive|e-commerce|CMS)\b/gi,
  /\b(urgent|asap|quickly|immediately|priority|important|essential|critical)\b/gi
];

const extractKeywords = (text) => {
  const keywords = new Set();
  keywordPatterns.forEach((pattern) => {
    text.match(pattern)?.forEach((match) => keywords.add(match.toLowerCase()));
  });
  return [...keywords];
};

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export const tokenizeHighlightedText = (text, keywords) => {
  if (!keywords.length) return [{ text, highlighted: false }];
  const matcher = new RegExp(`\\b(${keywords.map(escapeRegExp).join('|')})\\b`, 'gi');

  return text
    .split(matcher)
    .filter(Boolean)
    .map((part) => ({
      text: part,
      highlighted: keywords.includes(part.toLowerCase())
    }));
};

export const formatResponse = (text) => {
  if (!text || typeof text !== 'string') {
    return [{ type: 'paragraph', content: [{ text: 'No response available', highlighted: false }] }];
  }

  const keywords = extractKeywords(text);
  return text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      if (line.startsWith('-') || line.startsWith('•')) {
        return {
          type: 'bullet',
          content: tokenizeHighlightedText(line.replace(/^[-•]\s*/, ''), keywords)
        };
      }
      return {
        type: line.endsWith('?') ? 'question' : 'paragraph',
        content: tokenizeHighlightedText(line, keywords)
      };
    });
};

const HighlightedText = ({ tokens }) => (
  <>
    {tokens.map((token, index) => (
      token.highlighted
        ? <mark className="keyword-pill" key={`${token.text}-${index}`}>{token.text}</mark>
        : <React.Fragment key={`${token.text}-${index}`}>{token.text}</React.Fragment>
    ))}
  </>
);

export const renderFormattedResponse = (formattedResponse) => {
  if (!formattedResponse) return <div>No response available</div>;
  if (typeof formattedResponse === 'string') return <div>{formattedResponse}</div>;
  if (!Array.isArray(formattedResponse)) return <div>Invalid response format</div>;

  const bullets = formattedResponse.filter((item) => item.type === 'bullet');
  const content = formattedResponse.filter((item) => item.type !== 'bullet');

  return (
    <>
      {content.map((item, index) => (
        <div
          key={`${item.type}-${index}`}
          className={item.type === 'question' ? 'formatted-question' : 'formatted-paragraph'}
        >
          <HighlightedText tokens={item.content} />
        </div>
      ))}
      {bullets.length > 0 && (
        <ul className="formatted-bullet-list">
          {bullets.map((item, index) => (
            <li className="formatted-bullet-item" key={`bullet-${index}`}>
              <HighlightedText tokens={item.content} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
