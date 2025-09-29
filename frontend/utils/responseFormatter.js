/**
 * Response Formatter Utility
 * Formats AI responses with keyword highlighting and improved structure
 */

/**
 * Extracts keywords from text based on common business/service terms
 */
const extractKeywords = (text) => {
  const keywordPatterns = [
    // Services
    /\b(web development|web design|digital marketing|IT services|AI integration|networking|support)\b/gi,
    // Technologies
    /\b(React|Next\.js|Node\.js|JavaScript|TypeScript|HTML|CSS|API|database|cloud|AWS|Azure)\b/gi,
    // Business terms
    /\b(budget|timeline|project|requirements|features|scalable|responsive|e-commerce|CMS)\b/gi,
    // Action words
    /\b(urgent|asap|quickly|immediately|priority|important|essential|critical)\b/gi
  ];

  const keywords = new Set();
  
  keywordPatterns.forEach(pattern => {
    const matches = text.match(pattern);
    if (matches) {
      matches.forEach(match => keywords.add(match.toLowerCase()));
    }
  });

  return Array.from(keywords);
};

/**
 * Formats text with keyword highlighting and bullet points
 */
export const formatResponse = (text) => {
  if (!text) return text;

  // Extract keywords
  const keywords = extractKeywords(text);
  
  // Split text into paragraphs
  const paragraphs = text.split('\n').filter(p => p.trim());
  
  // Process each paragraph
  const formattedParagraphs = paragraphs.map(paragraph => {
    // Check if paragraph contains bullet points
    if (paragraph.includes('-') || paragraph.includes('•')) {
      return formatBulletPoints(paragraph, keywords);
    }
    
    // Check if paragraph contains questions
    if (paragraph.includes('?')) {
      return formatQuestions(paragraph, keywords);
    }
    
    // Regular paragraph with keyword highlighting
    return formatParagraph(paragraph, keywords);
  });

  return formattedParagraphs;
};

/**
 * Formats bullet points with proper structure
 */
const formatBulletPoints = (text, keywords) => {
  const lines = text.split('\n');
  const formattedLines = lines.map(line => {
    if (line.trim().startsWith('-') || line.trim().startsWith('•')) {
      const content = line.replace(/^[-•]\s*/, '').trim();
      const highlightedContent = highlightKeywords(content, keywords);
      return {
        type: 'bullet',
        content: highlightedContent
      };
    }
    return {
      type: 'text',
      content: highlightKeywords(line, keywords)
    };
  });

  return {
    type: 'bullet-list',
    items: formattedLines.filter(item => item.content.trim())
  };
};

/**
 * Formats questions with proper structure
 */
const formatQuestions = (text, keywords) => {
  // Split by question marks and filter out empty strings
  const questionParts = text.split('?').filter(part => part.trim());
  const formattedQuestions = questionParts.map(question => {
    const cleanQuestion = question.trim();
    if (cleanQuestion) {
      return {
        type: 'question',
        content: highlightKeywords(cleanQuestion + '?', keywords)
      };
    }
    return null;
  }).filter(Boolean);

  return {
    type: 'question-list',
    items: formattedQuestions
  };
};

/**
 * Formats regular paragraphs with keyword highlighting
 */
const formatParagraph = (text, keywords) => {
  return {
    type: 'paragraph',
    content: highlightKeywords(text, keywords)
  };
};

/**
 * Highlights keywords in text
 */
const highlightKeywords = (text, keywords) => {
  if (!keywords.length) return text;

  let highlightedText = text;
  
  keywords.forEach(keyword => {
    const regex = new RegExp(`\\b(${keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})\\b`, 'gi');
    highlightedText = highlightedText.replace(regex, `<span class="keyword-pill">$1</span>`);
  });

  return highlightedText;
};

/**
 * Renders formatted response as JSX
 */
export const renderFormattedResponse = (formattedResponse) => {
  if (!Array.isArray(formattedResponse)) {
    return <div dangerouslySetInnerHTML={{ __html: formattedResponse.content }} />;
  }

  return formattedResponse.map((item, index) => {
    switch (item.type) {
      case 'bullet-list':
        return (
          <div key={index} className="formatted-bullet-list">
            {item.items.map((bulletItem, bulletIndex) => (
              <div key={bulletIndex} className="formatted-bullet-item">
                {bulletItem.type === 'bullet' ? (
                  <div className="formatted-bullet">
                    <span className="bullet-marker">•</span>
                    <span dangerouslySetInnerHTML={{ __html: bulletItem.content }} />
                  </div>
                ) : (
                  <div dangerouslySetInnerHTML={{ __html: bulletItem.content }} />
                )}
              </div>
            ))}
          </div>
        );
      
      case 'question-list':
        return (
          <div key={index} className="formatted-question-list">
            {item.items.map((questionItem, questionIndex) => (
              <div key={questionIndex} className="formatted-question">
                <span dangerouslySetInnerHTML={{ __html: questionItem.content }} />
              </div>
            ))}
          </div>
        );
      
      case 'paragraph':
      default:
        return (
          <div key={index} className="formatted-paragraph">
            <div dangerouslySetInnerHTML={{ __html: item.content }} />
          </div>
        );
    }
  });
};