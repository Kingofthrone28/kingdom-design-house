require('dotenv').config();
const { testConnection, createLead } = require('./services/hubspot');

async function testCompleteHubSpotIntegration() {
  try {
    console.log('🎯 Testing Complete HubSpot Integration...');
    console.log('📊 Testing: Contacts + Deals + Tickets');
    
    // Test basic connection
    const connectionSuccess = await testConnection();
    
    if (!connectionSuccess) {
      console.log('❌ HubSpot connection failed');
      return;
    }
    
    console.log('\n🧪 Testing complete lead creation...');
    
    // Test creating a comprehensive lead
    const sampleLead = {
      email: 'complete-test@kingdomdesignhouse.com',
      first_name: 'Complete',
      last_name: 'Test',
      phone: '555-999-8888',
      company: 'Complete Test Company',
      website: 'https://completetest.com',
      service_requested: 'Web Development',
      budget_range: '$10k-15k',
      timeline: 'next 2 months',
      project_description: 'Need a complete e-commerce website with payment integration'
    };
    
    console.log('📝 Creating lead with:');
    console.log(`   Name: ${sampleLead.first_name} ${sampleLead.last_name}`);
    console.log(`   Email: ${sampleLead.email}`);
    console.log(`   Company: ${sampleLead.company}`);
    console.log(`   Service: ${sampleLead.service_requested}`);
    console.log(`   Budget: ${sampleLead.budget_range}`);
    console.log(`   Timeline: ${sampleLead.timeline}`);
    
    const result = await createLead(sampleLead);
    
    if (result.success) {
      console.log('\n🎉 SUCCESS! Complete HubSpot integration is working!');
      console.log('✅ Contact created:', result.contact.id);
      
      if (result.deal) {
        console.log('✅ Deal created:', result.deal.id);
        console.log('   Deal Name:', result.deal.properties?.dealname);
        console.log('   Amount:', result.deal.properties?.amount);
        console.log('   Stage:', result.deal.properties?.dealstage);
      }
      
      if (result.ticket) {
        console.log('✅ Ticket created:', result.ticket.id);
        console.log('   Subject:', result.ticket.properties?.subject);
        console.log('   Priority:', result.ticket.properties?.hs_ticket_priority);
        console.log('   Stage:', result.ticket.properties?.hs_pipeline_stage);
      }
      
      console.log('\n🚀 Your RAG API now creates:');
      console.log('   📞 Contacts (with full lead info)');
      console.log('   💼 Deals (for sales pipeline)');
      console.log('   🎫 Tickets (for follow-up)');
      console.log('\n🎯 Complete lead management system is ready!');
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    if (error.response?.data) {
      console.error('HubSpot Error:', error.response.data);
    }
  }
}

testCompleteHubSpotIntegration();