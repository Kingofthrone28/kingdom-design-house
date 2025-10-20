/**
 * Express.js Contact Form Server
 * 
 * Handles contact form submissions, processes data, and sends emails
 * via Gmail service with confirmation messages.
 */

const express = require('express');
const cors = require('cors');
const sgMail = require('@sendgrid/mail');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const axios = require('axios');
const { body, validationResult } = require('express-validator');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8081;

// Trust proxy for Railway deployment
app.set('trust proxy', 1);

// SendGrid Configuration
const hasSendgridKey = !!process.env.SENDGRID_API_KEY;
const sendgridFromEmail = process.env.SENDGRID_FROM_EMAIL || 'noreply@kingdomdesignhouse.com';

console.log('SendGrid configuration check:');
console.log('- SENDGRID_API_KEY exists:', !!process.env.SENDGRID_API_KEY);
console.log('- SENDGRID_FROM_EMAIL:', process.env.SENDGRID_FROM_EMAIL);

if (hasSendgridKey) {
  try {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    console.log('SendGrid initialized successfully');
  } catch (e) {
    console.error('SendGrid initialization error:', e?.message || e);
  }
} else {
  console.log('SendGrid API key not found. Please set SENDGRID_API_KEY');
}

// Security middleware
app.use(helmet());
app.use(cors({
  origin: true, // Allow all origins for development/testing
  credentials: true,
  optionsSuccessStatus: 200
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: {
    error: 'Too many form submissions from this IP, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/contact', limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// reCAPTCHA validation function
async function validateRecaptcha(token, ip) {
  try {
    const response = await axios.post('https://www.google.com/recaptcha/api/siteverify', null, {
      params: {
        secret: process.env.RECAPTCHA_SECRET_KEY,
        response: token,
        remoteip: ip
      }
    });

    const { success, score, action, 'error-codes': errorCodes } = response.data;

    if (!success) {
      console.log('reCAPTCHA validation failed:', errorCodes);
      return {
        valid: false,
        reason: 'reCAPTCHA validation failed',
        errors: errorCodes
      };
    }

    // For reCAPTCHA v3, check score (0.0 to 1.0, higher is more likely human)
    const minScore = parseFloat(process.env.RECAPTCHA_MIN_SCORE) || 0.5;
    if (score < minScore) {
      console.log(`reCAPTCHA score too low: ${score} (minimum: ${minScore})`);
      return {
        valid: false,
        reason: 'reCAPTCHA score too low',
        score: score
      };
    }

    // Verify the action matches what we expect
    if (action !== 'contact_form_submit') {
      console.log(`reCAPTCHA action mismatch: expected 'contact_form_submit', got '${action}'`);
      return {
        valid: false,
        reason: 'reCAPTCHA action mismatch',
        action: action
      };
    }

    console.log(`reCAPTCHA validation successful. Score: ${score}, Action: ${action}`);
    return {
      valid: true,
      score: score,
      action: action
    };

  } catch (error) {
    console.error('reCAPTCHA validation error:', error.message);
    return {
      valid: false,
      reason: 'reCAPTCHA validation error',
      error: error.message
    };
  }
}

// SendGrid email function
const sendEmailWithSendGrid = async (to, subject, html, text) => {
  const msg = {
    to: to,
    from: {
      email: sendgridFromEmail,
      name: 'Kingdom Design House'
    },
    subject: subject,
    html: html,
    text: text
  };

  try {
    await sgMail.send(msg);
    console.log(`SendGrid email sent successfully to ${to}`);
    return { success: true };
  } catch (error) {
    console.error('SendGrid email error:', error);
    throw error;
  }
};


// Email templates
const createEmailTemplates = (formData) => {
  const timestamp = new Date().toLocaleString();
  
  // Email to business (you)
  const businessEmail = {
    subject: `New Contact Form Submission - ${formData.service || 'General Inquiry'}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0;">
          <h1 style="margin: 0; font-size: 24px;">New Contact Form Submission</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">Kingdom Design House</p>
        </div>
        
        <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e9ecef;">
          <div style="background: white; padding: 25px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h2 style="color: #2c3e50; margin: 0 0 20px 0; font-size: 20px;">Contact Information</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #495057; width: 30%;">Name:</td>
                <td style="padding: 8px 0; color: #212529;">${formData.name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #495057;">Email:</td>
                <td style="padding: 8px 0; color: #212529;"><a href="mailto:${formData.email}" style="color: #007bff;">${formData.email}</a></td>
              </tr>
              ${formData.phone ? `
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #495057;">Phone:</td>
                <td style="padding: 8px 0; color: #212529;"><a href="tel:${formData.phone}" style="color: #007bff;">${formData.phone}</a></td>
              </tr>
              ` : ''}
              ${formData.company ? `
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #495057;">Company:</td>
                <td style="padding: 8px 0; color: #212529;">${formData.company}</td>
              </tr>
              ` : ''}
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #495057;">Service:</td>
                <td style="padding: 8px 0; color: #212529;">${formData.service || 'Not specified'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #495057;">Submitted:</td>
                <td style="padding: 8px 0; color: #212529;">${timestamp}</td>
              </tr>
            </table>
          </div>
          
          <div style="background: white; padding: 25px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h2 style="color: #2c3e50; margin: 0 0 15px 0; font-size: 20px;">Project Details</h2>
            <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; border-left: 4px solid #007bff;">
              <p style="margin: 0; line-height: 1.6; color: #495057;">${formData.message.replace(/\n/g, '<br>')}</p>
            </div>
          </div>
          
          <div style="margin-top: 20px; text-align: center;">
            <a href="mailto:${formData.email}" style="background: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; margin-right: 10px;">Reply to Client</a>
            <a href="tel:${formData.phone || '347.927.8846'}" style="background: #28a745; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">Call Client</a>
          </div>
        </div>
      </div>
    `,
    text: `
New Contact Form Submission - Kingdom Design House

Contact Information:
Name: ${formData.name}
Email: ${formData.email}
${formData.phone ? `Phone: ${formData.phone}` : ''}
${formData.company ? `Company: ${formData.company}` : ''}
Service: ${formData.service || 'Not specified'}
Submitted: ${timestamp}

Project Details:
${formData.message}

Reply to: ${formData.email}
    `
  };

  // Confirmation email to user
  const userEmail = {
    subject: 'Thank you for contacting Kingdom Design House',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
          <h1 style="margin: 0; font-size: 28px;">Thank You!</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9; font-size: 16px;">Kingdom Design House</p>
        </div>
        
        <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e9ecef;">
          <div style="background: white; padding: 25px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h2 style="color: #2c3e50; margin: 0 0 20px 0; font-size: 20px;">Your message has been received!</h2>
            <p style="color: #495057; line-height: 1.6; margin: 0 0 20px 0;">
              Hi ${formData.name},
            </p>
            <p style="color: #495057; line-height: 1.6; margin: 0 0 20px 0;">
              Thank you for reaching out to Kingdom Design House! We've received your inquiry about <strong>${formData.service || 'our services'}</strong> and will get back to you within 24 hours.
            </p>
            <p style="color: #495057; line-height: 1.6; margin: 0 0 20px 0;">
              In the meantime, feel free to explore our services or contact us directly if you have any urgent questions.
            </p>
          </div>
          
          <div style="background: white; padding: 25px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h3 style="color: #2c3e50; margin: 0 0 15px 0; font-size: 18px;">Quick Contact</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #495057;">Phone:</td>
                <td style="padding: 8px 0; color: #212529;"><a href="tel:347.927.8846" style="color: #007bff;">347.927.8846</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #495057;">Email:</td>
                <td style="padding: 8px 0; color: #212529;"><a href="mailto:kingdomdesignhouse@gmail.com" style="color: #007bff;">kingdomdesignhouse@gmail.com</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #495057;">Hours:</td>
                <td style="padding: 8px 0; color: #212529;">Mon-Fri 9AM-6PM EST</td>
              </tr>
            </table>
          </div>
          
          <div style="background: #e3f2fd; padding: 20px; border-radius: 8px; border-left: 4px solid #2196f3;">
            <h3 style="color: #1976d2; margin: 0 0 10px 0; font-size: 16px;">What's Next?</h3>
            <ul style="color: #1976d2; margin: 0; padding-left: 20px;">
              <li>We'll review your project requirements</li>
              <li>Our team will prepare a customized proposal</li>
              <li>We'll schedule a consultation call if needed</li>
              <li>You'll receive a detailed response within 24 hours</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e9ecef;">
            <p style="color: #6c757d; font-size: 14px; margin: 0;">
              This is an automated confirmation. Please do not reply to this email.
            </p>
          </div>
        </div>
      </div>
    `,
    text: `
Thank you for contacting Kingdom Design House!

Hi ${formData.name},

Thank you for reaching out to Kingdom Design House! We've received your inquiry about ${formData.service || 'our services'} and will get back to you within 24 hours.

Quick Contact:
Phone: 347.927.8846
Email: kingdomdesignhouse@gmail.com
Hours: Mon-Fri 9AM-6PM EST

What's Next?
- We'll review your project requirements
- Our team will prepare a customized proposal
- We'll schedule a consultation call if needed
- You'll receive a detailed response within 24 hours

This is an automated confirmation. Please do not reply to this email.
    `
  };

  return { businessEmail, userEmail };
};

// Validation rules
const contactValidation = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters')
    .matches(/^[a-zA-Z\s'-]+$/)
    .withMessage('Name can only contain letters, spaces, hyphens, and apostrophes'),
  
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  
  body('phone')
    .optional()
    .matches(/^[\+]?[1-9][\d]{0,15}$/)
    .withMessage('Please provide a valid phone number'),
  
  body('company')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Company name must be less than 100 characters'),
  
  body('service')
    .notEmpty()
    .withMessage('Please select a service'),
  
  body('message')
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage('Message must be between 10 and 2000 characters')
];

// Contact form submission endpoint
app.post('/api/contact', contactValidation, async (req, res) => {
  try {
    // Check validation results
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const formData = req.body;
    const clientIP = req.ip || req.connection.remoteAddress || req.socket.remoteAddress;

    // Validate reCAPTCHA if token is provided
    if (formData.recaptchaToken) {
      const recaptchaResult = await validateRecaptcha(formData.recaptchaToken, clientIP);
      
      if (!recaptchaResult.valid) {
        console.log(`reCAPTCHA validation failed for IP ${clientIP}:`, recaptchaResult);
        return res.status(400).json({
          success: false,
          message: 'Security validation failed. Please try again.',
          error: 'reCAPTCHA validation failed'
        });
      }
      
      console.log(`reCAPTCHA validation passed for ${formData.name} (${formData.email}). Score: ${recaptchaResult.score}`);
    } else {
      console.log(`No reCAPTCHA token provided for submission from ${formData.name} (${formData.email})`);
      // In production, you might want to require reCAPTCHA
      // return res.status(400).json({ success: false, message: 'Security validation required' });
    }
    
    // Create email templates
    const { businessEmail, userEmail } = createEmailTemplates(formData);
    
    // Send emails using SendGrid
    if (!hasSendgridKey) {
      return res.status(503).json({ 
        success: false, 
        message: 'Email service not configured. Please contact support.' 
      });
    }

    const emailPromises = [
      // Email to business
      sendEmailWithSendGrid(
        process.env.BUSINESS_EMAIL || 'kingdomdesignhouse@gmail.com',
        businessEmail.subject,
        businessEmail.html,
        businessEmail.text
      ),
      
      // Confirmation email to user
      sendEmailWithSendGrid(
        formData.email,
        userEmail.subject,
        userEmail.html,
        userEmail.text
      )
    ];

    await Promise.all(emailPromises);

    // Log successful submission
    console.log(`Contact form submitted by: ${formData.name} (${formData.email}) - Service: ${formData.service}`);

    res.json({
      success: true,
      message: 'Message sent successfully! We\'ll get back to you soon.',
      data: {
        name: formData.name,
        email: formData.email,
        service: formData.service,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Contact form error:', error);
    
    res.status(500).json({
      success: false,
      message: 'Failed to send message. Please try again or contact us directly.',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'Contact Form Server'
  });
});

// Env check endpoint (no secrets, only booleans/metadata)
app.get('/api/env-check', (req, res) => {
  return res.json({
    hasSENDGRID_API_KEY: !!process.env.SENDGRID_API_KEY,
    sendgridFromEmail: !!process.env.SENDGRID_FROM_EMAIL,
    nodeEnv: process.env.NODE_ENV || 'development'
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Contact form server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});

module.exports = app;
// Force redeploy - Wed Oct 15 18:06:45 EDT 2025
