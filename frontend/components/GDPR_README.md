# GDPR Compliance System

A comprehensive GDPR compliance solution for Kingdom Design House, providing cookie consent management, privacy controls, and data rights management.

## 🏗️ Architecture

```
GDPR Compliance System
├── GDPRCompliance.js          # Main UI component
├── GDPRContext.js             # State management
├── useGDPRConsent.js          # Custom hook
├── gdprUtils.js               # Utility functions
└── GDPRCompliance.module.scss # Styling
```

## 🚀 Quick Start

### 1. Wrap your app with the GDPR Provider

```jsx
// In your main App component or _app.js
import { GDPRProvider } from './contexts/GDPRContext';
import GDPRCompliance from './components/GDPRCompliance';

function App({ Component, pageProps }) {
  return (
    <GDPRProvider>
      <Component {...pageProps} />
      <GDPRCompliance />
    </GDPRProvider>
  );
}
```

### 2. Use the GDPR hook in components

```jsx
import { useGDPRConsent } from '../hooks/useGDPRConsent';

function MyComponent() {
  const { 
    canTrackAnalytics, 
    canTrackMarketing, 
    acceptAllConsent,
    openPrivacyModal 
  } = useGDPRConsent();

  // Only track analytics if user consented
  useEffect(() => {
    if (canTrackAnalytics()) {
      // Initialize Google Analytics
      gtag('config', 'GA_MEASUREMENT_ID');
    }
  }, [canTrackAnalytics]);

  return (
    <div>
      <button onClick={openPrivacyModal}>
        Privacy Settings
      </button>
    </div>
  );
}
```

## 📋 Features

### ✅ Cookie Consent Management
- **Granular consent** for different cookie categories
- **Necessary cookies** (always enabled)
- **Analytics cookies** (optional)
- **Marketing cookies** (optional)
- **Personalization cookies** (optional)
- **Third-party cookies** (optional)

### ✅ Privacy Controls
- **Data processing consent** management
- **Marketing email preferences**
- **Analytics tracking preferences**
- **Cookie storage preferences**

### ✅ Data Rights (GDPR Article 15-22)
- **Right to Access** - Request data copy
- **Right to Rectification** - Correct inaccurate data
- **Right to Erasure** - Request data deletion
- **Right to Portability** - Export data
- **Right to Object** - Object to processing
- **Right to Restrict** - Limit processing

### ✅ Audit & Compliance
- **Consent audit trail** with timestamps
- **Event logging** for compliance
- **Data anonymization** utilities
- **Retention policy** management
- **Compliance validation** tools

## 🎯 Usage Examples

### Basic Consent Check

```jsx
import { useGDPRConsent } from '../hooks/useGDPRConsent';

function AnalyticsComponent() {
  const { canTrackAnalytics } = useGDPRConsent();

  if (!canTrackAnalytics()) {
    return <div>Analytics disabled by user preference</div>;
  }

  return <AnalyticsWidget />;
}
```

### Marketing Email Management

```jsx
function NewsletterSignup() {
  const { 
    canSendMarketingEmails, 
    enableMarketingEmails,
    disableMarketingEmails 
  } = useGDPRConsent();

  const handleNewsletterSignup = (email) => {
    if (canSendMarketingEmails()) {
      // Add to newsletter
      addToNewsletter(email);
    } else {
      // Show consent request
      enableMarketingEmails();
    }
  };

  return (
    <form onSubmit={handleNewsletterSignup}>
      <input type="email" placeholder="Your email" />
      <button type="submit">Subscribe</button>
    </form>
  );
}
```

### Data Rights Request

```jsx
function DataRightsPanel() {
  const { 
    requestDataAccess,
    requestDataDeletion,
    requestDataPortability 
  } = useGDPRConsent();

  const handleDataRequest = async (type) => {
    let result;
    switch (type) {
      case 'access':
        result = requestDataAccess();
        break;
      case 'deletion':
        result = requestDataDeletion();
        break;
      case 'portability':
        result = requestDataPortability();
        break;
    }
    
    alert(result.message);
  };

  return (
    <div>
      <button onClick={() => handleDataRequest('access')}>
        Request My Data
      </button>
      <button onClick={() => handleDataRequest('deletion')}>
        Delete My Data
      </button>
      <button onClick={() => handleDataRequest('portability')}>
        Export My Data
      </button>
    </div>
  );
}
```

### Consent Banner Customization

```jsx
function CustomConsentBanner() {
  const { 
    showConsentBanner,
    acceptAllConsent,
    acceptNecessaryOnly,
    openPrivacyModal 
  } = useGDPRConsent();

  if (!showConsentBanner) return null;

  return (
    <div className="custom-consent-banner">
      <p>We use cookies to enhance your experience.</p>
      <button onClick={acceptNecessaryOnly}>
        Necessary Only
      </button>
      <button onClick={openPrivacyModal}>
        Customize
      </button>
      <button onClick={acceptAllConsent}>
        Accept All
      </button>
    </div>
  );
}
```

## 🔧 Configuration

### Environment Variables

```bash
# GDPR Configuration
GDPR_CONSENT_MAX_AGE_DAYS=365
GDPR_AUDIT_LOG_ENABLED=true
GDPR_DATA_RETENTION_DAYS=2555  # 7 years
```

### Custom Styling

The component uses SCSS modules with CSS variables. Customize by overriding the variables in your `variables.scss`:

```scss
// Override GDPR colors
$primary-color: #ffd700;
$primary-black: #1a1a1a;
$primary-white: #ffffff;
$border-color: #e0e0e0;
$background-light: #f8f9fa;
```

## 📊 State Management

### Consent State Structure

```javascript
{
  consent: {
    necessary: true,        // Always true
    analytics: false,       // User choice
    marketing: false,       // User choice
    personalization: false, // User choice
    thirdParty: false      // User choice
  },
  preferences: {
    dataProcessing: false,    // User choice
    marketingEmails: false,   // User choice
    analyticsTracking: false, // User choice
    cookieStorage: false      // User choice
  },
  ui: {
    showConsentBanner: false,
    showPrivacyModal: false,
    showDataRightsModal: false
  },
  audit: {
    consentGiven: false,
    consentDate: null,
    lastUpdated: null,
    events: []
  }
}
```

## 🛡️ Security Features

### Data Anonymization
- **IP address anonymization** (removes last octet)
- **Email anonymization** (masks local part)
- **Phone number anonymization** (masks middle digits)
- **Sensitive data redaction** in audit logs

### Audit Trail
- **Consent events** with timestamps
- **User actions** logging
- **Data access** tracking
- **Compliance validation** checks

### Local Storage
- **Encrypted consent data** storage
- **Automatic cleanup** of expired data
- **Privacy-first** data handling

## 🔍 Compliance Validation

### Built-in Validation

```javascript
import { validateGDPRCompliance } from '../utils/gdprUtils';

const compliance = validateGDPRCompliance(gdprState);

if (!compliance.compliant) {
  console.error('GDPR compliance issues:', compliance.issues);
}

if (compliance.warnings.length > 0) {
  console.warn('GDPR warnings:', compliance.warnings);
}
```

### Manual Compliance Check

```javascript
const { isGDPRCompliant, getComplianceStatus } = useGDPRConsent();

const status = getComplianceStatus();
console.log('Compliance Status:', status);
```

## 📱 Responsive Design

The GDPR component is fully responsive and includes:
- **Mobile-first** design approach
- **Touch-friendly** interface elements
- **Accessible** keyboard navigation
- **Screen reader** compatibility
- **Dark mode** support

## 🌐 Browser Support

- **Chrome** 60+
- **Firefox** 55+
- **Safari** 12+
- **Edge** 79+
- **Mobile browsers** (iOS Safari, Chrome Mobile)

## 📚 Legal Compliance

This implementation follows:
- **GDPR** (General Data Protection Regulation)
- **CCPA** (California Consumer Privacy Act)
- **ePrivacy Directive** (Cookie Law)
- **PECR** (Privacy and Electronic Communications Regulations)

## 🚨 Important Notes

1. **Legal Review**: Have your legal team review the privacy policy and consent text
2. **Data Mapping**: Ensure all data processing activities are properly documented
3. **Retention Policies**: Implement appropriate data retention periods
4. **Third-party Services**: Update third-party service configurations based on consent
5. **Regular Audits**: Conduct regular compliance audits and updates

## 📞 Support

For GDPR compliance questions:
- **Email**: privacy@kingdomdesignhouse.com
- **Phone**: 347.927.8846
- **Address**: Kingdom Design House, Long Island, NY

---

**Last Updated**: 2024
**Version**: 1.0.0
**License**: Proprietary - Kingdom Design House
