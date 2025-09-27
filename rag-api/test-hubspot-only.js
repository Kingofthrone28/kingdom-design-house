require('dotenv').config();
const { testConnection, createLead } = require('./services/hubspot');

async function testHubSpotOnly() {
  console.log('🧪 Testing HubSpot integration only...\n');
  
  // Test connection
  console.log('1. Testing HubSpot connection...');
  const connectionResult = await testConnection();
  console.log('Connection result:', connectionResult);
  
  if (connectionResult) {
    console.log('\n2. Testing lead creation...');
    try {
      const testLead = {
        email: 'test@example.com',
        first_name: 'Test',
        last_name: 'User',
        phone: '555-123-4567',
        company: 'Test Company',
        website: 'https://testcompany.com',
        service_requested: 'web development',
        project_description: 'Need help with website development',
        source_of_lead: 'Website Chat',
        preferred_communication_method: 'Email',
        contact_type: 'Lead'
      };
      
      const result = await createLead(testLead);
      console.log('✅ Lead creation successful!');
      console.log('Contact ID:', result.contact?.id);
      console.log('Deal ID:', result.deal?.id);
      console.log('Ticket ID:', result.ticket?.id);
      
    } catch (error) {
      console.error('❌ Lead creation failed:', error.message);
    }
  }
}

testHubSpotOnly().catch(console.error);