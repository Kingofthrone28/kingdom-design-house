const nodemailer = require('nodemailer');

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const submissionsByIp = new Map();

const cleanText = (value, maxLength) => (
  typeof value === 'string'
    ? value.trim().replace(/\u0000/g, '').slice(0, maxLength)
    : ''
);

const escapeHtml = (value) => cleanText(value, 2000)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#039;');

const normalizeFormData = (body = {}) => ({
  name: cleanText(body.name, 100),
  email: cleanText(body.email, 254).toLowerCase(),
  phone: cleanText(body.phone, 30),
  company: cleanText(body.company, 100),
  service: cleanText(body.service, 100),
  message: cleanText(body.message, 2000),
  recaptchaToken: cleanText(body.recaptchaToken, 4096),
});

const validateFormData = (data) => {
  const errors = {};
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const namePattern = /^[a-zA-Z\s'-]+$/;
  const phonePattern = /^\+?[1-9][\d\s().-]{6,20}$/;

  if (data.name.length < 2 || !namePattern.test(data.name)) {
    errors.name = 'Please provide a valid name.';
  }
  if (!emailPattern.test(data.email)) {
    errors.email = 'Please provide a valid email address.';
  }
  if (data.phone && !phonePattern.test(data.phone)) {
    errors.phone = 'Please provide a valid phone number.';
  }
  if (!data.service) {
    errors.service = 'Please select a service.';
  }
  if (data.message.length < 10) {
    errors.message = 'Message must be at least 10 characters.';
  }

  return errors;
};

const getClientIp = (req) => {
  const forwarded = req.headers?.['x-forwarded-for'];
  return (Array.isArray(forwarded) ? forwarded[0] : forwarded?.split(',')[0])
    || req.socket?.remoteAddress
    || 'unknown';
};

const checkRateLimit = (ip, now = Date.now()) => {
  const recent = (submissionsByIp.get(ip) || [])
    .filter(timestamp => now - timestamp < RATE_LIMIT_WINDOW_MS);

  if (recent.length >= RATE_LIMIT_MAX) {
    const retryAfter = Math.ceil((RATE_LIMIT_WINDOW_MS - (now - recent[0])) / 1000);
    submissionsByIp.set(ip, recent);
    return { allowed: false, retryAfter };
  }

  recent.push(now);
  submissionsByIp.set(ip, recent);
  return { allowed: true };
};

const verifyRecaptcha = async (token, ip) => {
  if (!process.env.RECAPTCHA_SECRET_KEY) {
    throw new Error('Contact form security is not configured.');
  }
  if (!token) {
    return false;
  }

  const params = new URLSearchParams({
    secret: process.env.RECAPTCHA_SECRET_KEY,
    response: token,
    remoteip: ip,
  });
  const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params,
  });
  if (!response.ok) {
    throw new Error('reCAPTCHA verification request failed.');
  }

  const result = await response.json();
  const minScore = Number.parseFloat(process.env.RECAPTCHA_MIN_SCORE || '0.5');
  const valid = Boolean(
    result.success
    && result.action === 'contact_form_submit'
    && Number(result.score) >= minScore
  );

  if (!valid) {
    console.warn('Contact reCAPTCHA rejected:', {
      success: Boolean(result.success),
      score: Number.isFinite(Number(result.score)) ? Number(result.score) : null,
      action: result.action || null,
      errorCodes: result['error-codes'] || [],
      minScore,
      tokenLength: token.length,
    });
  }

  return valid;
};

const createTransporter = () => {
  const user = process.env.NEO_SMTP_USER;
  const pass = process.env.NEO_SMTP_PASSWORD;
  if (!user || !pass) {
    throw new Error('Neo SMTP is not configured.');
  }

  return nodemailer.createTransport({
    host: 'smtp0001.neo.space',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: { user, pass },
  });
};

const createMessages = (data) => {
  const from = `"Kingdom Design House" <${process.env.NEO_SMTP_USER}>`;
  const businessEmail = process.env.BUSINESS_EMAIL || process.env.NEO_SMTP_USER;
  const safe = Object.fromEntries(
    Object.entries(data).map(([key, value]) => [key, escapeHtml(value)])
  );
  const submitted = new Date().toISOString();

  return {
    business: {
      from,
      to: businessEmail,
      replyTo: data.email,
      subject: `New Contact Form Submission - ${data.service}`,
      text: [
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        data.phone && `Phone: ${data.phone}`,
        data.company && `Company: ${data.company}`,
        `Service: ${data.service}`,
        `Submitted: ${submitted}`,
        '',
        data.message,
      ].filter(Boolean).join('\n'),
      html: `<h1>New Contact Form Submission</h1>
        <p><strong>Name:</strong> ${safe.name}</p>
        <p><strong>Email:</strong> ${safe.email}</p>
        ${safe.phone ? `<p><strong>Phone:</strong> ${safe.phone}</p>` : ''}
        ${safe.company ? `<p><strong>Company:</strong> ${safe.company}</p>` : ''}
        <p><strong>Service:</strong> ${safe.service}</p>
        <p><strong>Submitted:</strong> ${submitted}</p>
        <h2>Project Details</h2><p>${safe.message.replace(/\n/g, '<br>')}</p>`,
    },
    confirmation: {
      from,
      to: data.email,
      replyTo: businessEmail,
      subject: 'Thank you for contacting Kingdom Design House',
      text: `Hi ${data.name},\n\nWe received your inquiry about ${data.service} and will get back to you within 24 hours.\n\nKingdom Design House`,
      html: `<h1>Thank you, ${safe.name}!</h1>
        <p>We received your inquiry about <strong>${safe.service}</strong> and will get back to you within 24 hours.</p>
        <p>Kingdom Design House</p>`,
    },
  };
};

const processContactSubmission = async (req) => {
  const ip = getClientIp(req);
  const rateLimit = checkRateLimit(ip);
  if (!rateLimit.allowed) {
    return {
      status: 429,
      headers: { 'Retry-After': String(rateLimit.retryAfter) },
      body: { success: false, message: 'Too many submissions. Please try again later.' },
    };
  }

  const data = normalizeFormData(req.body);
  const errors = validateFormData(data);
  if (Object.keys(errors).length) {
    return { status: 400, body: { success: false, message: 'Validation failed', errors } };
  }

  const recaptchaValid = await verifyRecaptcha(data.recaptchaToken, ip);
  if (!recaptchaValid) {
    return {
      status: 400,
      body: { success: false, message: 'Security validation failed. Please try again.' },
    };
  }

  const transporter = createTransporter();
  const messages = createMessages(data);
  await transporter.sendMail(messages.business);

  try {
    await transporter.sendMail(messages.confirmation);
  } catch (error) {
    console.error('Contact confirmation email failed:', error.message);
  }

  return {
    status: 200,
    body: {
      success: true,
      message: 'Message sent successfully! We\'ll get back to you soon.',
      data: {
        name: data.name,
        email: data.email,
        service: data.service,
        timestamp: new Date().toISOString(),
      },
    },
  };
};

const resetRateLimits = () => submissionsByIp.clear();

module.exports = {
  processContactSubmission,
  normalizeFormData,
  validateFormData,
  createMessages,
  resetRateLimits,
};
