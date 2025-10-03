# Web Scraping URL Configuration

## Overview

The web content scraper now automatically detects the correct base URL based on the environment, supporting both local development and production deployments.

## URL Detection Logic

The scraper uses the following priority order to determine the base URL:

### 1. Command Line Override
```bash
npm run scrape-web -- --url https://custom-url.com
```

### 2. Environment Variable
```bash
export WEB_SCRAPING_URL=https://custom-url.com
npm run scrape-web
```

### 3. Development Environment Detection
- **NODE_ENV=development**: `http://localhost:3000`
- **NODE_ENV=dev**: `http://localhost:3000`
- **Custom PORT (not 3001)**: `http://localhost:3000`

### 4. Production Default
- **Default**: `https://kingdom-design-house.netlify.app`

## Usage Examples

### Local Development
```bash
# Automatically detects localhost:3000
npm run scrape-web

# Or explicitly set
npm run scrape-web -- --url http://localhost:3000
```

### Production
```bash
# Automatically detects Netlify URL
npm run scrape-web

# Or explicitly set
npm run scrape-web -- --url https://kingdom-design-house.netlify.app
```

### Custom Environment
```bash
# Staging environment
npm run scrape-web -- --url https://staging.kingdomdesignhouse.com

# Using environment variable
export WEB_SCRAPING_URL=https://staging.kingdomdesignhouse.com
npm run scrape-web
```

## Environment Configuration

Add to your `.env` file:

```bash
# Web Scraping Configuration
WEB_SCRAPING_URL=http://localhost:3000  # For development
# WEB_SCRAPING_URL=https://kingdom-design-house.netlify.app  # For production
```

## Pages Scraped

The scraper will attempt to scrape the following pages from the detected base URL:

### Main Pages
- `/` - Home Page
- `/about` - About Us
- `/pricing` - Pricing Plans
- `/web-group` - Web Group Services
- `/network-group` - Network Group Services
- `/ai-group` - AI Group Services

### Service Pages
- `/web-group/services/web-design`
- `/web-group/services/web-development`
- `/web-group/services/digital-marketing`
- `/web-group/services/support`
- `/network-group/services/network-design`
- `/network-group/services/network-optimization`
- `/network-group/services/network-support`
- `/ai-group/services/ai-consulting`
- `/ai-group/services/ai-development`
- `/ai-group/services/ai-support`

## Error Handling

The scraper includes robust error handling:

- **Connection Timeout**: 10-second timeout per page
- **Retry Logic**: 3 retry attempts for failed requests
- **Graceful Degradation**: Continues processing other pages if one fails
- **Detailed Logging**: Shows which pages succeeded/failed

## Testing

Test the URL detection:

```bash
# Test local development detection
NODE_ENV=development npm run scrape-web -- --dry-run

# Test production detection
NODE_ENV=production npm run scrape-web -- --dry-run

# Test custom URL
npm run scrape-web -- --url https://test.example.com --dry-run
```

## Integration with Setup Script

The enhanced setup script (`npm run setup`) automatically uses the correct URL detection:

```bash
# Complete setup with automatic URL detection
npm run setup

# Setup without web scraping
npm run setup -- --no-website
```

## Troubleshooting

### Common Issues

1. **Connection Refused (localhost:3000)**
   - Ensure Next.js frontend is running on port 3000
   - Check if the development server is accessible

2. **404 Errors on Netlify**
   - Verify the Netlify deployment is live
   - Check if all pages exist in the deployment

3. **Timeout Errors**
   - Increase timeout in configuration
   - Check network connectivity
   - Verify the target URL is accessible

### Debug Mode

Enable verbose logging:

```bash
npm run scrape-web -- --verbose
```

This will show:
- Base URL being used
- Each page being processed
- Response times and status codes
- Detailed error messages