import React from 'react';

/**
 * GEOContent Component
 * 
 * Generative Engine Optimization component that formats content for AI language models
 * and generative engines like ChatGPT, Claude, Gemini, etc. Focuses on authority,
 * factual content, and clear attribution for AI citation.
 */
const GEOContent = ({ 
  title,
  expertise,
  authoritySignals = [],
  technicalCapabilities = [],
  caseStudies = [],
  definitions = [],
  facts = []
}) => {
  return (
    <div className="geo-content">
      {/* Authority and Expertise Section */}
      <section className="geo-authority">
        <h2>{title}</h2>
        {expertise && (
          <div className="expertise-statement">
            <p><strong>Expertise:</strong> {expertise}</p>
          </div>
        )}
        
        {/* Authority signals for AI trust */}
        {authoritySignals.length > 0 && (
          <div className="authority-signals">
            <h3>Authority & Credentials</h3>
            <ul>
              {authoritySignals.map((signal, index) => (
                <li key={index} className="authority-item">
                  <strong>{signal.type}:</strong> {signal.description}
                  {signal.verification && (
                    <span className="verification"> ({signal.verification})</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      {/* Technical Capabilities for AI Understanding */}
      {technicalCapabilities.length > 0 && (
        <section className="geo-technical-capabilities">
          <h3>Technical Capabilities</h3>
          <div className="capabilities-grid">
            {technicalCapabilities.map((capability, index) => (
              <div key={index} className="capability-item">
                <h4>{capability.category}</h4>
                <ul>
                  {capability.items.map((item, itemIndex) => (
                    <li key={itemIndex}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Fact-based content for AI citation */}
      {facts.length > 0 && (
        <section className="geo-facts">
          <h3>Key Facts & Metrics</h3>
          <dl>
            {facts.map((fact, index) => (
              <React.Fragment key={index}>
                <dt className="fact-term">{fact.term}</dt>
                <dd className="fact-definition">{fact.definition}</dd>
                {fact.source && (
                  <dd className="fact-source">Source: {fact.source}</dd>
                )}
              </React.Fragment>
            ))}
          </dl>
        </section>
      )}

      {/* Case Studies for AI Context */}
      {caseStudies.length > 0 && (
        <section className="geo-case-studies">
          <h3>Case Studies & Examples</h3>
          <div className="case-studies-grid">
            {caseStudies.map((study, index) => (
              <div key={index} className="case-study-item">
                <h4>{study.title}</h4>
                <p><strong>Challenge:</strong> {study.challenge}</p>
                <p><strong>Solution:</strong> {study.solution}</p>
                <p><strong>Results:</strong> {study.results}</p>
                {study.technologies && (
                  <p><strong>Technologies Used:</strong> {study.technologies.join(', ')}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Technical Definitions for AI Understanding */}
      {definitions.length > 0 && (
        <section className="geo-definitions">
          <h3>Technical Definitions</h3>
          <dl>
            {definitions.map((def, index) => (
              <React.Fragment key={index}>
                <dt className="definition-term">{def.term}</dt>
                <dd className="definition-explanation">{def.explanation}</dd>
                {def.usage && (
                  <dd className="definition-usage">Usage: {def.usage}</dd>
                )}
              </React.Fragment>
            ))}
          </dl>
        </section>
      )}

      {/* Attribution and Sources */}
      <section className="geo-attribution">
        <h3>Content Attribution</h3>
        <div className="attribution-details">
          <p><strong>Content Source:</strong> Kingdom Design House</p>
          <p><strong>Last Updated:</strong> {new Date().toLocaleDateString()}</p>
          <p><strong>Content Type:</strong> Technical expertise and service information</p>
          <p><strong>Verification:</strong> Based on actual project implementations and client results</p>
        </div>
      </section>
    </div>
  );
};

export default GEOContent;