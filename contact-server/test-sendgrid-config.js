/**
 * SendGrid Configuration and Verification Test Script
 * 
 * This script tests SendGrid configuration and helps verify email setup.
 * Run: node test-sendgrid-config.js
 */

require('dotenv').config();
const sgMail = require('@sendgrid/mail');

// Configuration from environment
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const SENDGRID_FROM_EMAIL = process.env.SENDGRID_FROM_EMAIL || 'no-reply@kingdomdesignhouse.com';
const BUSINESS_EMAIL = process.env.BUSINESS_EMAIL || 'info@kingdomdesignhouse.com';

console.log('🔍 SendGrid Configuration Test');
console.log('================================\n');

// Test 1: API Key Check
console.log('Test 1: API Key Configuration');
console.log('--------------------------------');
if (SENDGRID_API_KEY) {
  console.log('✅ SENDGRID_API_KEY: Found');
  console.log(`   Key length: ${SENDGRID_API_KEY.length} characters`);
  console.log(`   Key starts with: ${SENDGRID_API_KEY.substring(0, 5)}...`);
  
  // Initialize SendGrid
  try {
    sgMail.setApiKey(SENDGRID_API_KEY);
    console.log('✅ SendGrid API initialized successfully');
  } catch (error) {
    console.log('❌ Failed to initialize SendGrid API:', error.message);
    process.exit(1);
  }
} else {
  console.log('❌ SENDGRID_API_KEY: NOT FOUND');
  console.log('   Please set SENDGRID_API_KEY in your .env file');
  process.exit(1);
}
console.log('');

// Test 2: Email Addresses Configuration
console.log('Test 2: Email Addresses Configuration');
console.log('-------------------------------------');
console.log(`FROM Email: ${SENDGRID_FROM_EMAIL}`);
console.log(`BUSINESS Email: ${BUSINESS_EMAIL}`);
console.log('');

// Test 3: Send Test Email
console.log('Test 3: Send Test Email');
console.log('------------------------');

// Use a different FROM address for test to avoid spam filters
// Test emails from same address to same address often go to spam
const testFromEmail = SENDGRID_FROM_EMAIL === BUSINESS_EMAIL 
      ? 'no-reply@kingdomdesignhouse.com' 
      : SENDGRID_FROM_EMAIL;

console.log(`Attempting to send test email from: ${testFromEmail}`);
console.log(`Attempting to send test email to: ${BUSINESS_EMAIL}`);
if (SENDGRID_FROM_EMAIL === BUSINESS_EMAIL) {
  console.log(`⚠️  Note: Using noreply@ instead of info@ as FROM to avoid spam filters`);
}
console.log('');

const testEmail = {
  to: BUSINESS_EMAIL,
  from: {
    email: testFromEmail,
    name: 'Kingdom Design House'
  },
  subject: 'SendGrid Configuration Test',
  text: `This is a test email to verify SendGrid configuration.

Configuration Details:
- FROM Email: ${SENDGRID_FROM_EMAIL}
- TO Email: ${BUSINESS_EMAIL}
- Sent at: ${new Date().toISOString()}

If you receive this email, SendGrid is configured correctly!`,
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2 style="color: #2c3e50;">SendGrid Configuration Test</h2>
      <p>This is a test email to verify SendGrid configuration.</p>
      <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <h3 style="margin-top: 0;">Configuration Details:</h3>
        <ul>
          <li><strong>FROM Email:</strong> ${SENDGRID_FROM_EMAIL}</li>
          <li><strong>TO Email:</strong> ${BUSINESS_EMAIL}</li>
          <li><strong>Sent at:</strong> ${new Date().toISOString()}</li>
        </ul>
      </div>
      <p style="color: #28a745; font-weight: bold;">✅ If you receive this email, SendGrid is configured correctly!</p>
    </div>
  `
};

async function testSendEmail() {
  try {
    console.log('⏳ Sending test email...');
    await sgMail.send(testEmail);
    console.log('✅ Test email sent successfully!');
    console.log(`   Check ${BUSINESS_EMAIL} inbox for the test email`);
    console.log('');
    console.log('📋 Next Steps:');
    console.log('   1. Check your NEO inbox at info@kingdomdesignhouse.com');
    console.log('   2. Verify you received the test email');
    console.log('   3. If email not received, check SendGrid Activity dashboard');
    console.log('   4. Verify info@ is verified in SendGrid admin panel');
  } catch (error) {
    console.log('❌ Failed to send test email!');
    console.log('');
    console.log('Error Details:');
    console.log('--------------');
    console.log(`Error Code: ${error.code || 'N/A'}`);
    console.log(`Error Message: ${error.message || 'N/A'}`);
    console.log('');
    
    if (error.response) {
      console.log('SendGrid API Response:');
      console.log('---------------------');
      if (error.response.body) {
        console.log(JSON.stringify(error.response.body, null, 2));
        
        if (error.response.body.errors) {
          console.log('');
          console.log('Specific Errors:');
          error.response.body.errors.forEach((err, index) => {
            console.log(`\nError ${index + 1}:`);
            console.log(`  Field: ${err.field || 'N/A'}`);
            console.log(`  Message: ${err.message || 'N/A'}`);
            if (err.help) {
              console.log(`  Help: ${err.help}`);
            }
            
            // Common error messages and solutions
            if (err.message && err.message.includes('sender')) {
              console.log(`\n  💡 Solution: Verify ${SENDGRID_FROM_EMAIL} in SendGrid Single Sender Verification`);
            }
            if (err.message && err.message.includes('authenticated')) {
              console.log(`\n  💡 Solution: Authenticate domain or verify single sender in SendGrid`);
            }
            if (err.message && err.message.includes('forbidden')) {
              console.log(`\n  💡 Solution: Check API key permissions in SendGrid dashboard`);
            }
          });
        }
      }
    }
    
    console.log('');
    console.log('🔧 Troubleshooting:');
    console.log('--------------------');
    console.log('1. Verify sender email in SendGrid:');
    console.log(`   - Go to: Settings → Sender Authentication → Single Sender Verification`);
    console.log(`   - Find: ${SENDGRID_FROM_EMAIL}`);
    console.log(`   - Verify it shows green checkmark (verified)`);
    console.log('');
    console.log('2. Verify info@ address in SendGrid:');
    console.log(`   - Find: info@kingdomdesignhouse.com`);
    console.log(`   - Click "Verify" if not verified`);
    console.log(`   - Check NEO inbox for verification email`);
    console.log('');
    console.log('3. Check SendGrid Activity Dashboard:');
    console.log('   - Go to: Activity → Activity Feed');
    console.log('   - Look for failed email attempts');
    console.log('   - Review error messages');
    console.log('');
    console.log('4. Alternative: Domain Authentication');
    console.log('   - Authenticate entire kingdomdesignhouse.com domain');
    console.log('   - Allows sending from any @kingdomdesignhouse.com address');
    console.log('   - Better deliverability than single sender verification');
    
    process.exit(1);
  }
}

// Run the test
testSendEmail();

