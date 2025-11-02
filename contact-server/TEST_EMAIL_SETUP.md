# Testing Email Configuration After Migration

## ✅ Setup Complete

You've successfully:
- Updated single sender authentication in SendGrid to `info@kingdomdesignhouse.com`
- Updated environment variables in Railway production:
  - `BUSINESS_EMAIL=info@kingdomdesignhouse.com`
  - `SENDGRID_FROM_EMAIL=noreply@kingdomdesignhouse.com`
- Verified old Gmail sender (`kingdomdesignhouse@gmail.com`) is still verified (can be removed later)

## 🧪 Local Testing

### Prerequisites

1. **Start the server locally:**
   ```bash
   cd contact-server
   npm install  # If needed
   npm run dev  # Starts server on port 8081
   ```

2. **Set up local environment variables:**
   Create a `.env` file in `contact-server/`:
   ```bash
   SENDGRID_API_KEY=your-sendgrid-api-key
   SENDGRID_FROM_EMAIL=noreply@kingdomdesignhouse.com
   BUSINESS_EMAIL=info@kingdomdesignhouse.com
   PORT=8081
   ```

### Test Scripts Available

#### Option 1: Quick Test (Recommended)
```bash
cd contact-server
./test-quick.sh
```

#### Option 2: Comprehensive Test
```bash
cd contact-server
./test-curl.sh
```

#### Option 3: Manual cURL
```bash
curl -X POST http://localhost:8081/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "service": "web-development",
    "message": "Testing email configuration with info@ address."
  }'
```

#### Option 4: Using Node.js Test Script
```bash
cd contact-server
npm test
```

### Expected Results

#### ✅ Success Response (200 OK)
```json
{
  "success": true,
  "message": "Message sent successfully! We'll get back to you soon.",
  "data": {
    "name": "Test User",
    "email": "test@example.com",
    "service": "web-development",
    "timestamp": "2025-11-02T..."
  }
}
```

#### 📧 Email Verification Checklist

**Business Notification Email:**
- ✅ **To**: `info@kingdomdesignhouse.com`
- ✅ **From**: `noreply@kingdomdesignhouse.com` (or your SENDGRID_FROM_EMAIL)
- ✅ **Reply-To**: `test@example.com` (form sender's email)
- ✅ **Subject**: "New Contact Form Submission - web-development"
- ✅ **Contains**: Form submission details

**Confirmation Email (to form submitter):**
- ✅ **To**: `test@example.com` (form sender)
- ✅ **From**: `noreply@kingdomdesignhouse.com`
- ✅ **Reply-To**: `info@kingdomdesignhouse.com`
- ✅ **Subject**: "Thank you for contacting Kingdom Design House"
- ✅ **Contains**: Confirmation message

### Common Issues

#### ❌ Error: "Email service not configured"
**Solution**: Set `SENDGRID_API_KEY` in your `.env` file

#### ❌ Error: SendGrid authentication failed
**Solution**: 
- Verify `info@kingdomdesignhouse.com` is verified in SendGrid
- Check that domain authentication is set up (if using domain)
- Ensure API key has proper permissions

#### ❌ Error: Rate limiting
**Solution**: Wait 15 minutes or adjust rate limit in code

#### ❌ Emails not received
**Solution**:
- Check spam folder
- Verify `info@kingdomdesignhouse.com` mailbox is set up
- Check SendGrid activity dashboard
- Verify email address can receive emails

### Testing Production (Railway)

After local testing, verify production:

```bash
# Replace with your Railway production URL
PROD_URL="https://your-railway-app.up.railway.app"

curl -X POST "${PROD_URL}/api/contact" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Production Test",
    "email": "test@example.com",
    "service": "web-development",
    "message": "Production email test"
  }'
```

### Health Check

Test server health:
```bash
curl http://localhost:8081/api/health
```

Expected response includes SendGrid configuration status.

## 📋 Verification Checklist

- [ ] Server starts without errors
- [ ] Health check endpoint returns 200
- [ ] Contact form submission returns 200
- [ ] Business email received at `info@kingdomdesignhouse.com`
- [ ] Confirmation email received at test email
- [ ] Reply-to header works correctly in business email
- [ ] Reply-to header works correctly in confirmation email
- [ ] SendGrid activity dashboard shows emails sent
- [ ] No errors in server logs

## 🔍 Debugging

Check server logs for detailed information:
```bash
# Server logs will show:
# - SendGrid configuration status
# - Email sending results
# - Any errors or warnings
```

Monitor SendGrid dashboard:
- Activity feed shows sent emails
- Can verify delivery status
- Can see any bounces or blocks

