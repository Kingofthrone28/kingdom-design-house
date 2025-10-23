import React from 'react';

/**
 * GEOContent Component
 * 
 * Geographic Entity Optimization component that aligns entities, facts, and 
 * offsite signals so AI trusts and cites the business location and service areas.
 */
const GEOContent = ({ 
  primaryLocation,
  serviceAreas = [],
  businessFacts = [],
  localSignals = []
}) => {
  return (
    <div className="geo-content">
      {/* Primary location with enhanced geographic data */}
      <section className="geo-primary-location">
        <h2>Service Location</h2>
        <div className="location-details">
          <div className="location-name">
            <strong>{primaryLocation.name}</strong>
          </div>
          <div className="location-address">
            {primaryLocation.address}
          </div>
          <div className="location-coordinates">
            Coordinates: {primaryLocation.coordinates.latitude}, {primaryLocation.coordinates.longitude}
          </div>
          <div className="location-region">
            Region: {primaryLocation.region}
          </div>
        </div>
      </section>

      {/* Service areas with geographic hierarchy */}
      <section className="geo-service-areas">
        <h3>Service Areas</h3>
        <div className="service-areas-grid">
          {serviceAreas.map((area, index) => (
            <div key={index} className="service-area-item">
              <div className="area-name">{area.name}</div>
              <div className="area-type">{area.type}</div>
              <div className="area-distance">{area.distance}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Business facts for local credibility */}
      {businessFacts.length > 0 && (
        <section className="geo-business-facts">
          <h3>Local Business Facts</h3>
          <ul>
            {businessFacts.map((fact, index) => (
              <li key={index} className="business-fact-item">
                <span className="fact-label">{fact.label}:</span>
                <span className="fact-value">{fact.value}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Local signals and credibility indicators */}
      {localSignals.length > 0 && (
        <section className="geo-local-signals">
          <h3>Local Presence & Trust Signals</h3>
          <div className="signals-grid">
            {localSignals.map((signal, index) => (
              <div key={index} className="signal-item">
                <div className="signal-type">{signal.type}</div>
                <div className="signal-description">{signal.description}</div>
                <div className="signal-verification">{signal.verification}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Geographic entity relationships */}
      <section className="geo-relationships">
        <h3>Geographic Service Coverage</h3>
        <div className="coverage-hierarchy">
          <div className="coverage-level">
            <strong>Primary:</strong> {primaryLocation.name}
          </div>
          <div className="coverage-level">
            <strong>Secondary:</strong> {serviceAreas.map(area => area.name).join(', ')}
          </div>
          <div className="coverage-level">
            <strong>Extended:</strong> New York Metropolitan Area
          </div>
        </div>
      </section>
    </div>
  );
};

export default GEOContent;
