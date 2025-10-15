# 🛡️ Bot Protection Quick Start

> **Status:** ✅ IMPLEMENTED | ⏸️ DISABLED (awaiting activation)

## TL;DR

Bot protection is **ready but turned OFF**. Enable when you see spam.

## 🚀 To Enable (When Ready)

### Step 1: Check if You Need It

Look for these signs:
- Spam leads in HubSpot (fake emails, repeated submissions)
- Unexpected OpenAI cost spikes
- >10 suspicious chat messages per week

### Step 2: Enable in Netlify

Go to: **Netlify Dashboard → Site Settings → Environment Variables**

**Option A: Start Gentle** (Recommended)
```
ENABLE_HONEYPOT=true
ENABLE_PATTERN_DETECTION=true
```

**Option B: Full Protection**
```
ENABLE_RATE_LIMITING=true
ENABLE_HONEYPOT=true
ENABLE_TIME_VALIDATION=true
ENABLE_PATTERN_DETECTION=true
```

### Step 3: Monitor

```bash
netlify functions:log chat-jarvis
```

Look for: `"Bot Protection Check"` entries

## 📊 What Each Layer Does

| Layer | Blocks | Impact | Cost Savings |
|-------|--------|--------|--------------|
| **Honeypot** | Auto-fill bots | None | High |
| **Rate Limiting** | Spam floods | None* | High |
| **Time Validation** | Instant submissions | None | Medium |
| **Pattern Detection** | Spam content | None | Medium |

\* May affect power users sending 5+ messages/minute

## 🎯 Default Settings (Reasonable)

- **Rate Limit**: 5 msgs/min, 30/hour, 100/day
- **Time Check**: 2 seconds after page load
- **Pattern Check**: Links, spam words, repeated chars

## ⚙️ Customize (Optional)

```
RATE_LIMIT_PER_MINUTE=10      # Increase if needed
MIN_SECONDS_BEFORE_SUBMIT=3   # Stricter timing
```

## 🔍 Check Status

All protection layers log to Netlify function logs:
- ✅ Enabled layers shown in logs
- 🚫 Blocked attempts logged with reasons
- 💰 Cost savings (skipped AI calls)

## 📖 Full Documentation

See: `techdocs/BOT_PROTECTION_GUIDE.md`

## 🧪 Test It

```javascript
// Test honeypot (when enabled)
fetch('/.netlify/functions/chat-jarvis', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    message: 'Test',
    website: 'http://spam.com', // This triggers honeypot
    conversationHistory: []
  })
});
// Should work but skip lead creation
```

## 🚨 Rollback

Just remove the environment variables:
1. Go to Netlify Environment Variables
2. Delete the `ENABLE_*` variables
3. Done - protections disabled immediately

## 💡 Recommendation

**Week 1-4**: Monitor only (current state)  
**Week 4+**: Enable if seeing spam  
**Week 8+**: Adjust thresholds based on data  

---

**Questions?** Check `techdocs/BOT_PROTECTION_GUIDE.md` for detailed info.

