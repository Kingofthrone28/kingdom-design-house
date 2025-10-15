/**
 * Local Testing Script for Contact Form Server
 * 
 * This script helps test the contact form server locally before deployment.
 * Run this after starting the server with: npm run dev
 */

const testFormData = {
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+1234567890",
  company: "Acme Corporation",
  service: "web-development",
  message: "I need a new website for my business. We're looking for a modern, responsive design with e-commerce capabilities. Our timeline is flexible but we'd like to launch within 3 months."
};

const testFormDataMinimal = {
  name: "Jane Smith",
  email: "jane.smith@example.com",
  service: "ai-solutions",
  message: "I'm interested in AI automation for my business processes. Can you help me understand what's possible?"
};

async function testContactForm(serverUrl = 'http://localhost:3002', formData = testFormData) {
  console.log('🧪 Testing Contact Form Submission...');
  console.log('📊 Test Data:', JSON.stringify(formData, null, 2));
  console.log('🌐 Server URL:', serverUrl);
  
  try {
    const response = await fetch(`${serverUrl}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    
    if (response.ok) {
      console.log('✅ SUCCESS!');
      console.log('📧 Response:', JSON.stringify(result, null, 2));
      console.log('📨 Check your email inbox for the business notification');
      console.log('📬 Check the user email for the confirmation message');
    } else {
      console.log('❌ FAILED!');
      console.log('🔴 Status:', response.status);
      console.log('🔴 Error:', JSON.stringify(result, null, 2));
    }
    
  } catch (error) {
    console.log('💥 ERROR!');
    console.log('🔴 Error:', error.message);
    console.log('💡 Make sure the server is running with: npm run dev');
  }
}

async function testHealthCheck(serverUrl = 'http://localhost:3002') {
  console.log('🏥 Testing Health Check...');
  
  try {
    const response = await fetch(`${serverUrl}/api/health`);
    const result = await response.json();
    
    if (response.ok) {
      console.log('✅ Server is healthy!');
      console.log('📊 Status:', JSON.stringify(result, null, 2));
    } else {
      console.log('❌ Health check failed!');
      console.log('🔴 Response:', JSON.stringify(result, null, 2));
    }
    
  } catch (error) {
    console.log('💥 Server is not responding!');
    console.log('🔴 Error:', error.message);
  }
}

async function testValidationErrors(serverUrl = 'http://localhost:3002') {
  console.log('🔍 Testing Validation Errors...');
  
  const invalidData = {
    name: "A", // Too short
    email: "invalid-email", // Invalid format
    service: "", // Required field missing
    message: "Short" // Too short
  };
  
  try {
    const response = await fetch(`${serverUrl}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(invalidData),
    });

    const result = await response.json();
    
    if (response.status === 400) {
      console.log('✅ Validation working correctly!');
      console.log('🔴 Expected errors:', JSON.stringify(result, null, 2));
    } else {
      console.log('❌ Validation should have failed but didn\'t!');
      console.log('📊 Unexpected success:', JSON.stringify(result, null, 2));
    }
    
  } catch (error) {
    console.log('💥 Error testing validation:', error.message);
  }
}

async function runAllTests() {
  console.log('🚀 Starting Contact Form Tests...\n');
  
  // Test 1: Health Check
  await testHealthCheck();
  console.log('\n' + '='.repeat(50) + '\n');
  
  // Test 2: Valid Form Submission
  await testContactForm();
  console.log('\n' + '='.repeat(50) + '\n');
  
  // Test 3: Minimal Form Submission
  await testContactForm('http://localhost:3002', testFormDataMinimal);
  console.log('\n' + '='.repeat(50) + '\n');
  
  // Test 4: Validation Errors
  await testValidationErrors();
  
  console.log('\n🎉 All tests completed!');
  console.log('\n📋 Next Steps:');
  console.log('1. Check your email inbox for business notification');
  console.log('2. Check the test email address for user confirmation');
  console.log('3. Verify email templates look correct');
  console.log('4. Test the frontend form integration');
}

// Run tests if this script is executed directly
if (require.main === module) {
  runAllTests().catch(console.error);
}

module.exports = {
  testContactForm,
  testHealthCheck,
  testValidationErrors,
  runAllTests,
  testFormData,
  testFormDataMinimal
};
