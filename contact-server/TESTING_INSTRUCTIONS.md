# Local Testing Instructions

## 🧪 Quick Test Guide

### Step 1: Update Environment Variables

Make sure your `contact-server/.env` file has:
```bash
SENDGRID_API_KEY=your-sendgrid-api-key
SENDGRID_FROM_EMAIL=info@kingdomdesignhouse.com  # or noreply@kingdomdesignhouse.com
BUSINESS_EMAIL=info@kingdomdesignhouse.com
PORT=8081
```

### Step 2: Verify SendGrid Configuration

Test SendGrid setup before testing the full contact form:
```bash
cd contact-server
node test-sendgrid-config.js
```

This script will:
- ✅ Check API key is configured
- ✅ Test sending a test email
- ✅ Show detailed errors if something fails
- ✅ Provide troubleshooting tips

### Step 3: Start the Server

```bash
cd contact-server
npm run dev
```

The server will start on port 8081. Watch the console for:
```
SendGrid configuration check:
- SENDGRID_API_KEY exists: true
- SENDGRID_FROM_EMAIL: info@kingdomdesignhouse.com
SendGrid initialized successfully
Contact form server running on port 8081
```

### Step 4: Test Contact Form

**Option 1: Quick Test Script**
```bash
./test-quick.sh
```

**Option 2: Comprehensive Test**
```bash
./test-curl.sh
```

**Option 3: Manual cURL**
```bash
curl -X POST http://localhost:8081/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "service": "web-development",
    "message": "Testing info@ email configuration"
  }'
```

### Step 5: Verify Emails Received

1. **Check `info@kingdomdesignhouse.com` inbox (NEO)** for business notification
2. **Check test email inbox** (`test@example.com`) for confirmation

## 🔍 Troubleshooting

### Issue: SendGrid test email fails
**Solution**: Run `node test-sendgrid-config.js` for detailed error messages and solutions

### Issue: Emails not received
**Check**:
1. SendGrid Activity dashboard for delivery status
2. Spam folder
3. Verify `info@kingdomdesignhouse.com` is verified in SendGrid
4. Check NEO email service configuration

### Issue: Server not starting
**Check**:
1. Port 8081 is not in use: `lsof -ti:8081`
2. `.env` file exists and has correct values
3. Node modules installed: `npm install`

## 📋 Test Checklist

- [ ] `.env` file updated with correct email addresses
- [ ] `node test-sendgrid-config.js` passes
- [ ] Server starts without errors
- [ ] Health check returns 200: `curl http://localhost:8081/api/health`
- [ ] Contact form test succeeds
- [ ] Email received at `info@kingdomdesignhouse.com`
- [ ] Confirmation email received at test address
- [ ] Reply-to headers work correctly

