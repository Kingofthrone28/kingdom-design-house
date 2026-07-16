# SendGrid Email Authentication Setup Guide

## Overview

After updating from `kingdomdesignhouse@gmail.com` to `info@kingdomdesignhouse.com`, you need to verify SendGrid domain authentication for your custom domain email address.

## ✅ Code Changes Complete

All code references have been updated:
- ✅ Email templates updated to use `info@kingdomdesignhouse.com`
- ✅ Reply-to headers added for proper email flow
- ✅ Environment variables updated in examples
- ✅ Documentation updated

## 🔐 SendGrid Domain Authentication Required

### Critical: Domain Authentication Setup

You **must** authenticate your domain (`kingdomdesignhouse.com`) in SendGrid to send from `info@kingdomdesignhouse.com` or any `@kingdomdesignhouse.com` address.

### Steps to Authenticate Domain in SendGrid

1. **Log into SendGrid Dashboard**
   - Go to: https://app.sendgrid.com
   - Navigate to: **Settings → Sender Authentication → Domain Authentication**

2. **Add Domain Authentication**
   - Click **"Authenticate Your Domain"**
   - Enter: `kingdomdesignhouse.com`
   - Select **Brand Indicator for Message Identification (BIMI)** if desired
   - Choose **Automatic Security (Recommended)**

3. **Add DNS Records**
   SendGrid will provide DNS records to add to your domain:
   
   **Required Records:**
   - **CNAME records** for domain authentication
   - **SPF record** (or update existing)
   - **DKIM record** (provided by SendGrid)
   - **DMARC record** (recommended for security)

4. **Verify Domain**
   - After adding DNS records, click **"Verify"** in SendGrid
   - Wait 24-48 hours for DNS propagation
   - SendGrid will confirm when authentication is complete

### DNS Records Example (SendGrid will provide exact values)

```
Type: CNAME
Host: em1234.kingdomdesignhouse.com
Value: u123456.wl123.sendgrid.net

Type: CNAME  
Host: s1._domainkey.kingdomdesignhouse.com
Value: s1.domainkey.u123456.wl123.sendgrid.net

Type: CNAME
Host: s2._domainkey.kingdomdesignhouse.com
Value: s2.domainkey.u123456.wl123.sendgrid.net

Type: TXT (SPF)
Host: @ (or domain name)
Value: v=spf1 include:sendgrid.net ~all

Type: TXT (DMARC)
Host: _dmarc
Value: v=DMARC1; p=none; rua=mailto:dmarc@kingdomdesignhouse.com
```

## 📧 Email Addresses Configuration

### Current SendGrid Configuration

- **From Email**: `noreply@kingdomdesignhouse.com` (Set via `SENDGRID_FROM_EMAIL`)
- **Business Email**: `info@kingdomdesignhouse.com` (Set via `BUSINESS_EMAIL`)
- **Reply-To (Business emails)**: Form sender's email
- **Reply-To (Confirmation emails)**: `info@kingdomdesignhouse.com`

### Required Email Setup

1. **Create `info@kingdomdesignhouse.com` Mailbox**
   - Set up email forwarding or mailbox at your email provider
   - Ensure this address can receive emails
   - Configure email client if needed

2. **Verify Single Sender (Alternative to Domain Auth)**
   If you prefer not to authenticate the entire domain:
   - Go to: **Settings → Sender Authentication → Single Sender Verification**
   - Add: `info@kingdomdesignhouse.com`
   - Verify via email link
   - **Note**: Domain authentication is preferred for multiple addresses

## 🔧 Environment Variables

Update these in your production environment:

```bash
# SendGrid Configuration
SENDGRID_API_KEY=your-sendgrid-api-key-here
SENDGRID_FROM_EMAIL=noreply@kingdomdesignhouse.com

# Business Email (where form submissions are sent)
BUSINESS_EMAIL=info@kingdomdesignhouse.com
```

## ✅ Verification Checklist

After completing the above steps:

- [ ] Domain authenticated in SendGrid dashboard
- [ ] DNS records added and verified
- [ ] `info@kingdomdesignhouse.com` mailbox configured
- [ ] Environment variables updated in production
- [ ] Test email sent successfully from `noreply@kingdomdesignhouse.com`
- [ ] Form submission email received at `info@kingdomdesignhouse.com`
- [ ] Reply-to functionality tested

## 🧪 Testing

1. **Test Form Submission**
   ```bash
   curl -X POST https://your-api-url/api/contact \
     -H "Content-Type: application/json" \
     -d '{
       "name": "Test User",
       "email": "test@example.com",
       "message": "Test message"
     }'
   ```

2. **Verify Email Delivery**
   - Check `info@kingdomdesignhouse.com` inbox
   - Verify reply-to header works correctly
   - Test reply functionality

## ⚠️ Important Notes

1. **Gmail Address No Longer Used**
   - `kingdomdesignhouse@gmail.com` is no longer referenced in code
   - Remove if it was used for SendGrid sender verification
   - Domain authentication supersedes single sender verification

2. **SPF Record Conflict**
   - If you have existing SPF records, add `include:sendgrid.net`
   - Example: `v=spf1 include:sendgrid.net include:_spf.google.com ~all`
   - Only one SPF record per domain is allowed

3. **DNS Propagation Time**
   - DNS changes can take 24-48 hours to propagate globally
   - SendGrid verification may fail initially
   - Be patient and re-verify after DNS propagation

4. **Email Deliverability**
   - Domain authentication improves deliverability
   - Reduces spam folder placement
   - Increases sender reputation

## 🔗 Resources

- [SendGrid Domain Authentication Guide](https://docs.sendgrid.com/ui/account-and-settings/how-to-set-up-domain-authentication)
- [SendGrid DNS Records Guide](https://docs.sendgrid.com/ui/account-and-settings/dns-records)
- [SPF Record Setup](https://docs.sendgrid.com/ui/account-and-settings/spf-records)
- [DKIM Setup](https://docs.sendgrid.com/ui/account-and-settings/dkim-records)
- [DMARC Setup](https://docs.sendgrid.com/ui/account-and-settings/dmarc-records)

## 📞 Support

If you encounter issues:
1. Check SendGrid dashboard for authentication status
2. Verify DNS records using tools like `dig` or online DNS checkers
3. Contact SendGrid support if authentication fails after 48 hours
4. Verify email provider settings for `info@kingdomdesignhouse.com`

