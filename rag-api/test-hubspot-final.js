require('dotenv').config();
const { testConnection, createLead } = require('./services/hubspot-contacts-only');

async function testHubSpotIntegration() {
  try {
    console.log('🎯 Testing HubSpot integration (contacts only)...');
    
    // Test basic connection
    const connectionSuccess = await testConnection();
    
    if (!connectionSuccess) {
      console.log('❌ HubSpot connection failed');
      return;
    }
    
    console.log('\n🧪 Testing lead creation...');
    
    // Test creating a sample lead
    const sampleLead = {
      email: 'test@kingdomdesignhouse.com',
      first_name: 'Test',
      last_name: 'Lead',
      phone: '555-123-4567',
      company: 'Test Company',
      website: 'https://testcompany.com',
      service_requested: 'Web Development',
      budget_range: '$5k-10k'
    };
    
    const result = await createLead(sampleLead);
    
    if (result.success) {
      console.log('\n🎉 SUCCESS! HubSpot integration is working perfectly!');
      console.log('✅ Your RAG API can now send leads to HubSpot CRM');
      console.log('✅ Contact created with ID:', result.contact.id);
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testHubSpotIntegration();