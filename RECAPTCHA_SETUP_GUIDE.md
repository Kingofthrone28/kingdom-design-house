# 🛡️ reCAPTCHA Setup Guide

## 📋 Overview

This guide will help you set up Google reCAPTCHA v3 for your contact form to prevent spam submissions and add an extra layer of security.

## 🔧 Step 1: Create Google reCAPTCHA Keys

### 1.1 Go to Google reCAPTCHA Admin Console
- Visit: https://www.google.com/recaptcha/admin
- Sign in with your Google account

### 1.2 Create a New Site
1. Click **"+"** to create a new site
2. Fill in the form:
   - **Label**: `Kingdom Design House Contact Form`
   - **reCAPTCHA type**: Select **"reCAPTCHA v3"**
   - **Domains**: Add your domains:
     - `kingdomdesignhouse.com`
     - `www.kingdomdesignhouse.com`
     - `localhost` (for local development)
   - **Accept Terms**: Check the terms acceptance box
   - Click **"Submit"**

### 1.3 Get Your Keys
After creating the site, you'll get:
- **Site Key** (public) - goes in frontend
- **Secret Key** (private) - goes in backend

## 🔑 Step 2: Configure Environment Variables

### 2.1 Frontend Configuration

Create or update your environment files:

**For Local Development** (`frontend/.env.local`):
```bash
NEXT_PUBLIC_CONTACT_SERVER_URL=http://localhost:3002
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your-site-key-here
```

**For Production** (`frontend/.env.production`):
```bash
NEXT_PUBLIC_CONTACT_SERVER_URL=https://kingdom-design-house-production.up.railway.app
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your-site-key-here
```

### 2.2 Backend Configuration (Railway)

In your Railway project dashboard:

1. Go to **Variables** tab
2. Add these environment variables:

```bash
# Existing variables...
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-app-password
BUSINESS_EMAIL=info@kingdomdesignhouse.com

# Add these new variables:
RECAPTCHA_SECRET_KEY=your-secret-key-here
RECAPTCHA_MIN_SCORE=0.5
```

## 🧪 Step 3: Test the Integration

### 3.1 Local Testing

1. **Start the contact server**:
   ```bash
   cd contact-server
   npm start
   ```

2. **Start the frontend**:
   ```bash
   cd frontend
   npm run dev
   ```

3. **Test the form**:
   - Visit `http://localhost:3000/contact`
   - Fill out the contact form
   - Submit and check the server logs for reCAPTCHA validation

### 3.2 Production Testing

1. **Deploy your changes** to Railway
2. **Visit your live site**: `https://kingdomdesignhouse.com/contact`
3. **Test form submission**
4. **Check server logs** in Railway dashboard

## 📊 Step 4: Monitor reCAPTCHA Performance

### 4.1 Google reCAPTCHA Admin Console
- Visit your site in the admin console
- Check the **Analytics** tab for:
  - Request count
  - Score distribution
  - Top actions

### 4.2 Server Logs
Monitor your Railway logs for:
```
reCAPTCHA validation successful. Score: 0.9, Action: contact_form_submit
```

## ⚙️ Step 5: Configure reCAPTCHA Settings

### 5.1 Score Threshold
The default minimum score is `0.5`. You can adjust this in Railway:

- **0.9-1.0**: Very likely human
- **0.7-0.9**: Likely human  
- **0.5-0.7**: Neutral
- **0.1-0.5**: Likely bot
- **0.0-0.1**: Very likely bot

### 5.2 Recommended Settings
```bash
RECAPTCHA_MIN_SCORE=0.5  # Good balance for most sites
```

## 🔍 Troubleshooting

### Common Issues

#### 1. "reCAPTCHA not available" Error
**Cause**: Site key not configured properly
**Solution**: 
- Check `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` in environment
- Verify the key is correct in Google reCAPTCHA console

#### 2. "reCAPTCHA validation failed" Error
**Cause**: Secret key incorrect or domain not allowed
**Solution**:
- Verify `RECAPTCHA_SECRET_KEY` in Railway
- Check domains in reCAPTCHA console include your production domain

#### 3. Low Score Warnings
**Cause**: reCAPTCHA thinks submission might be from a bot
**Solution**:
- Lower `RECAPTCHA_MIN_SCORE` if legitimate users are being blocked
- Monitor analytics to see if this is a pattern

### Debug Mode

To see detailed reCAPTCHA logs, check your Railway server logs:

```bash
# In Railway dashboard, check logs for:
reCAPTCHA validation successful. Score: 0.9, Action: contact_form_submit
reCAPTCHA validation failed for IP xxx.xxx.xxx.xxx: { valid: false, reason: 'score too low' }
```

## 🚀 Deployment Checklist

- [ ] Created reCAPTCHA v3 site in Google console
- [ ] Added domains to reCAPTCHA configuration
- [ ] Set `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` in frontend environment
- [ ] Set `RECAPTCHA_SECRET_KEY` in Railway environment
- [ ] Set `RECAPTCHA_MIN_SCORE` in Railway environment
- [ ] Tested locally with reCAPTCHA
- [ ] Deployed and tested in production
- [ ] Monitored reCAPTCHA analytics

## 📈 Performance Impact

### Benefits
- ✅ **Spam Protection**: Blocks automated form submissions
- ✅ **User-Friendly**: Invisible to legitimate users
- ✅ **Analytics**: Detailed insights into traffic patterns
- ✅ **Customizable**: Adjustable score thresholds

### Considerations
- ⚠️ **Third-Party Dependency**: Relies on Google services
- ⚠️ **Privacy**: Google processes user interactions
- ⚠️ **Blocking Risk**: Legitimate users with low scores might be blocked

## 🔒 Security Notes

1. **Keep Secret Key Private**: Never expose the secret key in frontend code
2. **Monitor Logs**: Regularly check for failed validation attempts
3. **Adjust Score**: Fine-tune the minimum score based on your traffic
4. **Backup Plan**: Form still works without reCAPTCHA if it fails

---

**Next Steps**: Once configured, your contact form will have enterprise-level spam protection! 🎉
