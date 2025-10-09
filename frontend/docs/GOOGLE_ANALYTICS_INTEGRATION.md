# Google Analytics Integration with GDPR Compliance

This document explains how Google Analytics is integrated into Kingdom Design House with full GDPR compliance.

## 📊 Overview

Our Google Analytics implementation:
- ✅ **GDPR Compliant** - Only loads when user consents
- ✅ **Privacy First** - IP anonymization enabled by default
- ✅ **Page View Tracking** - Automatic tracking on route changes
- ✅ **Custom Events** - Track user interactions and conversions
- ✅ **Consent Management** - Integrated with GDPR consent system

## 🔧 Configuration

**Measurement ID**: `G-BEKZ5DH50B`

## 🚀 How It Works

### 1. **Consent-Based Loading**

Google Analytics only loads when the user has given analytics consent through the GDPR banner:

```jsx
// GoogleAnalytics.js checks consent before loading
if (!canTrackAnalytics()) {
  return null; // Don't load GA scripts
}
```

### 2. **Automatic Page View Tracking**

Page views are automatically tracked when:
- User visits a page for the first time
- User navigates between pages (Next.js route changes)

```javascript
router.events.on('routeChangeComplete', handleRouteChange);
```

### 3. **Privacy Features**

- **IP Anonymization**: Enabled by default (`anonymize_ip: true`)
- **Consent Management**: Updates GA consent settings based on user preferences
- **Secure Cookies**: Uses `SameSite=None;Secure` cookie flags

## 📈 Tracking Custom Events

### Basic Event Tracking

```javascript
import { trackEvent } from '../utils/analytics';

// Track any custom event
trackEvent('click', 'Button', 'Contact Us');
```

### Pre-built Event Trackers

#### Button Clicks
```javascript
import { trackButtonClick } from '../utils/analytics';

const handleClick = () => {
  trackButtonClick('Get Started');
  // Your logic here
};
```

#### Form Submissions
```javascript
import { trackFormSubmission } from '../utils/analytics';

const handleSubmit = (e) => {
  e.preventDefault();
  trackFormSubmission('Contact Form');
  // Your form logic here
};
```

#### Chat Interactions
```javascript
import { trackChatInteraction } from '../utils/analytics';

// When user opens chat
trackChatInteraction('open');

// When user sends a message
trackChatInteraction('send_message');

// When user closes chat
trackChatInteraction('close');
```

#### Video Interactions
```javascript
import { trackVideoInteraction } from '../utils/analytics';

const handleVideoPlay = () => {
  trackVideoInteraction('play', 'Product Demo Video');
};

const handleVideoComplete = () => {
  trackVideoInteraction('complete', 'Product Demo Video');
};
```

#### Pricing Plan Views
```javascript
import { trackPricingView } from '../utils/analytics';

const handlePlanClick = (planName) => {
  trackPricingView(planName); // 'Starter', 'Growth', 'Enterprise'
};
```

#### Service Interest
```javascript
import { trackServiceInterest } from '../utils/analytics';

const handleServiceClick = (service) => {
  trackServiceInterest(service); // 'Web Development', 'AI Integration', etc.
};
```

#### Lead Generation
```javascript
import { trackLeadGeneration } from '../utils/analytics';

const handleLeadCapture = () => {
  trackLeadGeneration('contact_form'); // or 'chat', 'phone', etc.
};
```

#### Scroll Depth
```javascript
import { trackScrollDepth } from '../utils/analytics';

// Track when user scrolls 50% down the page
useEffect(() => {
  const handleScroll = () => {
    const scrollPercent = (window.scrollY / document.body.scrollHeight) * 100;
    if (scrollPercent >= 50) {
      trackScrollDepth(50);
    }
  };

  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
```

#### External Link Clicks
```javascript
import { trackExternalLink } from '../utils/analytics';

const handleExternalClick = (url) => {
  trackExternalLink(url);
  window.open(url, '_blank');
};
```

#### File Downloads
```javascript
import { trackFileDownload } from '../utils/analytics';

const handleDownload = (fileName) => {
  trackFileDownload(fileName);
  // Trigger download
};
```

#### Search Queries
```javascript
import { trackSearch } from '../utils/analytics';

const handleSearch = (query) => {
  trackSearch(query);
  // Execute search
};
```

#### Error Tracking
```javascript
import { trackError } from '../utils/analytics';

try {
  // Your code
} catch (error) {
  trackError(error.message, 'ComponentName');
}
```

#### Conversions
```javascript
import { trackConversion } from '../utils/analytics';

const handleSuccessfulLead = () => {
  trackConversion('Lead Capture', 500); // Type and optional value
};
```

#### Performance Timing
```javascript
import { trackTiming } from '../utils/analytics';

const startTime = performance.now();
// Your async operation
const endTime = performance.now();
trackTiming('API', 'load_time', endTime - startTime, 'Chat API');
```

## 🔒 GDPR Compliance

### Consent Flow

1. **User Visits Site** → GDPR banner appears
2. **User Accepts Analytics** → Google Analytics loads
3. **User Browses** → Page views and events tracked
4. **User Withdraws Consent** → Google Analytics disabled

### Consent Updates

The system automatically updates Google Analytics consent when user changes preferences:

```javascript
// In GDPRContext.js
window.gtag('consent', 'update', {
  analytics_storage: state.consent.analytics ? 'granted' : 'denied',
  ad_storage: state.consent.marketing ? 'granted' : 'denied',
});
```

### Data Privacy

- **IP Anonymization**: Last octet removed before storage
- **Cookie Flags**: Secure and SameSite attributes set
- **Consent Audit**: All consent changes logged
- **Data Retention**: Follows GDPR guidelines

## 🎯 Example Implementation

### Track Button Click in Component

```jsx
import React from 'react';
import { trackButtonClick } from '../utils/analytics';

const ContactButton = () => {
  const handleClick = () => {
    // Track the click
    trackButtonClick('Contact Us - Hero Section');
    
    // Your logic here
    window.location.href = '/contact';
  };

  return (
    <button onClick={handleClick}>
      Contact Us
    </button>
  );
};

export default ContactButton;
```

### Track Form Submission

```jsx
import React, { useState } from 'react';
import { trackFormSubmission, trackLeadGeneration } from '../utils/analytics';

const ContactForm = () => {
  const [formData, setFormData] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Track form submission
    trackFormSubmission('Contact Form');
    
    // Submit form
    const result = await submitForm(formData);
    
    if (result.success) {
      // Track successful lead generation
      trackLeadGeneration('contact_form');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <button type="submit">Submit</button>
    </form>
  );
};

export default ContactForm;
```

### Track Chat Interactions

```jsx
import React, { useEffect } from 'react';
import { trackChatInteraction } from '../utils/analytics';

const ChatInterface = ({ isOpen }) => {
  useEffect(() => {
    if (isOpen) {
      trackChatInteraction('open');
    }
  }, [isOpen]);

  const handleSendMessage = (message) => {
    trackChatInteraction('send_message');
    // Send message logic
  };

  const handleClose = () => {
    trackChatInteraction('close');
    // Close chat logic
  };

  return (
    // Chat UI
  );
};

export default ChatInterface;
```

## 📊 Custom Dimensions & User Properties

### Set User Properties

```javascript
import { setUserProperties } from '../utils/analytics';

// After user logs in or identifies
setUserProperties({
  user_type: 'premium',
  industry: 'technology',
  company_size: '50-100'
});
```

### Track Custom Dimensions

```javascript
import { trackCustomDimension } from '../utils/analytics';

trackCustomDimension('dimension1', 'Long Island');
trackCustomDimension('dimension2', 'Web Development');
```

## 🧪 Testing

### Check if GA is Loaded

```javascript
// In browser console
console.log(typeof window.gtag); // Should be 'function'
console.log(window.dataLayer); // Should be an array
```

### Test Event Tracking

```javascript
// In browser console
import { trackEvent } from '../utils/analytics';
trackEvent('test', 'Test Category', 'Test Label', 100);
```

### Verify Consent

```javascript
// In browser console
const { canTrackAnalytics } = useGDPRConsent();
console.log(canTrackAnalytics()); // Should return true/false
```

## 🚨 Important Notes

1. **Consent First**: Google Analytics will NOT load unless user gives consent
2. **Privacy by Default**: IP anonymization is always enabled
3. **GDPR Audit**: All tracking respects GDPR consent settings
4. **Page Views**: Automatically tracked on route changes
5. **Custom Events**: Must be manually implemented per component

## 📚 Resources

- [Google Analytics 4 Documentation](https://developers.google.com/analytics/devguides/collection/ga4)
- [GDPR Compliance Guide](https://support.google.com/analytics/answer/9019185)
- [Cookie Consent Best Practices](https://developers.google.com/tag-platform/security/guides/consent)

## 🔧 Troubleshooting

### GA Not Loading

1. Check if user has given analytics consent
2. Verify `G-BEKZ5DH50B` measurement ID is correct
3. Check browser console for errors
4. Ensure ad blockers are disabled for testing

### Events Not Tracking

1. Verify GA is loaded: `typeof window.gtag === 'function'`
2. Check if user has given analytics consent
3. Review browser console for event logs
4. Use GA Debug View in Google Analytics

### Consent Not Updating

1. Clear browser localStorage
2. Check GDPR banner appears on first visit
3. Verify consent changes are logged in console
4. Test with different browsers/incognito mode

---

**Last Updated**: 2024
**Version**: 1.0.0
**Measurement ID**: G-BEKZ5DH50B
