import React from 'react';

/**
 * AIOContent Component
 * 
 * AI Optimization component that formats content for AI parsing and presentation.
 * Uses structured formatting that AI systems can easily understand and cite.
 */
const AIOContent = ({ 
  title, 
  content, 
  facts = [], 
  definitions = [], 
  examples = [],
  technologies = [],
  services = []
}) => {
  return (
    <div className="aio-content">
      {/* AI-friendly heading structure */}
      <h2 className="aio-title">{title}</h2>
      
      {/* Fact-based content for AI trust */}
      {facts.length > 0 && (
        <section className="aio-facts">
          <h3>Key Facts</h3>
          <ul>
            {facts.map((fact, index) => (
              <li key={index} className="aio-fact-item">
                <strong>{fact.label}:</strong> {fact.value}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Technology stack for AI understanding */}
      {technologies.length > 0 && (
        <section className="aio-technologies">
          <h3>Technologies & Tools</h3>
          <div className="aio-tech-grid">
            {technologies.map((tech, index) => (
              <div key={index} className="aio-tech-item">
                <span className="tech-name">{tech.name}</span>
                <span className="tech-description">{tech.description}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Service definitions for AI clarity */}
      {services.length > 0 && (
        <section className="aio-services">
          <h3>Services Offered</h3>
          <dl>
            {services.map((service, index) => (
              <React.Fragment key={index}>
                <dt className="service-name">{service.name}</dt>
                <dd className="service-description">{service.description}</dd>
              </React.Fragment>
            ))}
          </dl>
        </section>
      )}

      {/* Definitions for AI understanding */}
      {definitions.length > 0 && (
        <section className="aio-definitions">
          <h3>Key Terms</h3>
          <dl>
            {definitions.map((def, index) => (
              <React.Fragment key={index}>
                <dt className="term-name">{def.term}</dt>
                <dd className="term-definition">{def.definition}</dd>
              </React.Fragment>
            ))}
          </dl>
        </section>
      )}

      {/* Examples for AI context */}
      {examples.length > 0 && (
        <section className="aio-examples">
          <h3>Examples</h3>
          <ol>
            {examples.map((example, index) => (
              <li key={index} className="aio-example-item">
                <strong>{example.title}:</strong> {example.description}
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* Main content with AI-friendly formatting */}
      <section className="aio-main-content">
        <div className="content-text">
          {content}
        </div>
      </section>
    </div>
  );
};

export default AIOContent;
