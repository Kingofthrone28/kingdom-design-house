# Contact Form Server

Express.js server for handling contact form submissions with Gmail integration and automated confirmation emails.

## Features

- ✅ **Form Validation** - Server-side validation with express-validator
- ✅ **Gmail Integration** - Send emails via Gmail SMTP
- ✅ **Dual Emails** - Business notification + user confirmation
- ✅ **Rate Limiting** - Prevent spam and abuse
- ✅ **Security** - Helmet, CORS, input sanitization
- ✅ **HTML Templates** - Beautiful responsive email templates
- ✅ **Error Handling** - Comprehensive error management

## Setup Instructions

### 1. Gmail App Password Setup

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate App Password**:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
   - Copy the 16-character password

### 2. Environment Configuration

```bash
# Copy the example environment file
cp env.example .env

# Edit .env with your Gmail credentials
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-16-char-app-password
BUSINESS_EMAIL=info@kingdomdesignhouse.com
PORT=3001
ALLOWED_ORIGINS=https://kingdomdesignhouse.com,http://localhost:3000
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start Server

```bash
# Development
npm run dev

# Production
npm start
```

## API Endpoints

### POST /api/contact

Submit contact form data.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "company": "Acme Corp",
  "service": "web-development",
  "message": "I need a new website..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Message sent successfully! We'll get back to you soon.",
  "data": {
    "name": "John Doe",
    "email": "john@example.com",
    "service": "web-development",
    "timestamp": "2024-01-15T10:30:00.000Z"
  }
}
```

### GET /api/health

Health check endpoint.

## Email Templates

### Business Notification Email
- **Recipient**: Your business email
- **Content**: Complete form data with contact info
- **Action Buttons**: Reply to client, Call client

### User Confirmation Email
- **Recipient**: Form submitter's email
- **Content**: Thank you message with next steps
- **Contact Info**: Phone, email, business hours

## Security Features

- **Rate Limiting**: 5 requests per 15 minutes per IP
- **CORS Protection**: Configurable allowed origins
- **Input Validation**: Server-side validation with express-validator
- **Helmet**: Security headers
- **Input Sanitization**: XSS prevention

## Deployment

### Railway (Recommended)

1. Connect your GitHub repository
2. Add environment variables in Railway dashboard
3. Deploy automatically

### Heroku

```bash
# Create Heroku app
heroku create your-contact-server

# Set environment variables
heroku config:set GMAIL_USER=your-email@gmail.com
heroku config:set GMAIL_APP_PASSWORD=your-app-password
heroku config:set BUSINESS_EMAIL=info@kingdomdesignhouse.com

# Deploy
git push heroku main
```

### DigitalOcean App Platform

1. Create new app from GitHub
2. Configure environment variables
3. Set build command: `npm install`
4. Set run command: `npm start`

## Integration with Frontend

Update your frontend form submission service to use the new Express endpoint:

```javascript
// In formSubmissionService.js
export const submitContactForm = async (formData) => {
  const response = await fetch('https://your-server.railway.app/api/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to submit form.');
  }

  return await response.json();
};
```

## Monitoring

Check server health:
```bash
curl https://your-server.railway.app/api/health
```

View logs:
```bash
# Railway
railway logs

# Heroku
heroku logs --tail
```

## Troubleshooting

### Gmail Authentication Issues
- Ensure 2FA is enabled
- Use App Password, not regular password
- Check Gmail security settings

### Rate Limiting Issues
- Adjust rate limit settings in server.js
- Check IP blocking

### Email Delivery Issues
- Verify Gmail credentials
- Check spam folders
- Monitor server logs for errors
