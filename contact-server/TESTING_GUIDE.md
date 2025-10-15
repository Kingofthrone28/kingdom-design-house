# 🧪 Contact Form Testing Guide

Complete guide for testing your contact form server locally and in production.

## 🚀 Quick Start Testing

### **1. Local Server Testing**

```bash
# 1. Install dependencies
cd contact-server
npm install

# 2. Set up environment variables
cp env.example .env
# Edit .env with your Gmail credentials

# 3. Start the server
npm run dev

# 4. Run automated tests
npm test

# 5. Open browser testing page
npm run test:frontend
```

### **2. Frontend Integration Testing**

```bash
# In your frontend directory
cd ../frontend

# Set environment variable for local testing
echo "NEXT_PUBLIC_CONTACT_SERVER_URL=http://localhost:3001" >> .env.local

# Start frontend development server
npm run dev

# Visit http://localhost:3000/contact to test the form
```

## 📋 Testing Checklist

### **✅ Local Development Tests**

- [ ] **Server Health Check**
  ```bash
  curl http://localhost:3001/api/health
  ```

- [ ] **Valid Form Submission**
  ```bash
  curl -X POST http://localhost:3001/api/contact \
    -H "Content-Type: application/json" \
    -d '{
      "name": "John Doe",
      "email": "john@example.com",
      "service": "web-development",
      "message": "Test message for contact form"
    }'
  ```

- [ ] **Validation Error Testing**
  ```bash
  curl -X POST http://localhost:3001/api/contact \
    -H "Content-Type: application/json" \
    -d '{
      "name": "A",
      "email": "invalid-email",
      "service": "",
      "message": "Short"
    }'
  ```

- [ ] **Rate Limiting Test**
  ```bash
  # Run this command 6 times quickly to test rate limiting
  for i in {1..6}; do
    curl -X POST http://localhost:3001/api/contact \
      -H "Content-Type: application/json" \
      -d '{"name":"Test","email":"test@example.com","service":"web-development","message":"Rate limit test"}'
    echo "Request $i completed"
  done
  ```

### **✅ Email Testing**

- [ ] **Business Notification Email**
  - Check your business email inbox
  - Verify email contains all form data
  - Test reply-to functionality
  - Verify action buttons work

- [ ] **User Confirmation Email**
  - Check the test email address
  - Verify professional appearance
  - Confirm contact information is correct
  - Check business hours display

### **✅ Frontend Integration Tests**

- [ ] **Form Validation**
  - Test required field validation
  - Test email format validation
  - Test phone number validation
  - Test message length validation

- [ ] **Form Submission**
  - Test successful submission
  - Test error handling
  - Test loading states
  - Test success messages

- [ ] **Error Handling**
  - Test network errors
  - Test server errors
  - Test validation errors
  - Test rate limiting

## 🛠️ Testing Tools

### **1. Automated Test Script**

```bash
# Run comprehensive tests
cd contact-server
node test-local.js
```

**What it tests:**
- Server health check
- Valid form submission
- Minimal form submission
- Validation error handling
- Email delivery confirmation

### **2. Browser Testing Page**

```bash
# Open interactive testing page
cd contact-server
npm run test:frontend
```

**Features:**
- Visual form interface
- Pre-filled test data buttons
- Real-time validation testing
- Server URL configuration
- Response display

### **3. cURL Commands**

```bash
# Health check
curl http://localhost:3001/api/health

# Valid submission
curl -X POST http://localhost:3001/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+1234567890",
    "company": "Test Company",
    "service": "web-development",
    "message": "This is a test message for the contact form."
  }'
```

## 🌐 Production Testing

### **1. Deploy to Railway**

```bash
# 1. Push to GitHub
git add .
git commit -m "Add contact form server"
git push origin main

# 2. Connect to Railway
# - Go to railway.app
# - Connect GitHub repository
# - Add environment variables
# - Deploy automatically
```

### **2. Update Frontend Configuration**

```bash
# Update frontend environment variable
echo "NEXT_PUBLIC_CONTACT_SERVER_URL=https://your-app.railway.app" >> .env.production
```

### **3. Production Testing Checklist**

- [ ] **Server Health**
  ```bash
  curl https://your-app.railway.app/api/health
  ```

- [ ] **Form Submission**
  - Test with real email addresses
  - Verify email delivery
  - Check email templates
  - Test from different devices

- [ ] **Security Testing**
  - Test rate limiting
  - Test CORS configuration
  - Test input sanitization
  - Test validation

- [ ] **Performance Testing**
  - Test response times
  - Test concurrent requests
  - Monitor server logs
  - Check error rates

## 🐛 Troubleshooting

### **Common Issues**

#### **1. Gmail Authentication Failed**
```
Error: Invalid login: 535-5.7.8 Username and Password not accepted
```

**Solution:**
- Enable 2-Factor Authentication on Gmail
- Generate App Password (not regular password)
- Update GMAIL_APP_PASSWORD in .env

#### **2. CORS Errors**
```
Access to fetch at 'http://localhost:3001/api/contact' from origin 'http://localhost:3000' has been blocked by CORS policy
```

**Solution:**
- Check ALLOWED_ORIGINS in .env
- Include both localhost:3000 and localhost:3001
- Restart server after changes

#### **3. Rate Limiting Issues**
```
Too many form submissions from this IP, please try again later.
```

**Solution:**
- Wait 15 minutes or change IP
- Adjust rate limit settings in server.js
- Test with different IP addresses

#### **4. Email Not Delivered**
```
Message sent successfully but no email received
```

**Solution:**
- Check spam/junk folders
- Verify Gmail credentials
- Check server logs for errors
- Test with different email addresses

### **Debug Mode**

```bash
# Enable debug logging
NODE_ENV=development npm run dev
```

This will show detailed error messages and request logs.

## 📊 Monitoring

### **1. Server Logs**

```bash
# Railway
railway logs

# Heroku
heroku logs --tail

# Local development
npm run dev
```

### **2. Health Monitoring**

```bash
# Check server status
curl https://your-app.railway.app/api/health

# Expected response:
{
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "service": "Contact Form Server"
}
```

### **3. Email Delivery Monitoring**

- Monitor your business email for form submissions
- Check user confirmation emails are being sent
- Verify email templates render correctly
- Test reply-to functionality

## 🎯 Success Criteria

Your contact form is working correctly when:

- ✅ Server responds to health checks
- ✅ Valid form submissions return success
- ✅ Invalid submissions return proper errors
- ✅ Business notification emails are received
- ✅ User confirmation emails are sent
- ✅ Rate limiting prevents abuse
- ✅ CORS allows frontend requests
- ✅ Email templates look professional
- ✅ Reply-to functionality works
- ✅ All validation rules are enforced

## 📞 Support

If you encounter issues:

1. Check the troubleshooting section above
2. Review server logs for error messages
3. Test with the provided test scripts
4. Verify environment variables are set correctly
5. Check Gmail App Password configuration

Remember to test thoroughly before deploying to production! 🚀
