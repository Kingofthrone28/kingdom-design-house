# HubSpot CRM Integration Setup Guide

## 🎯 Overview
Your RAG API is now configured to automatically create leads in HubSpot CRM when users provide contact information during chat conversations.

## 📊 Data Model Integration
Based on your HubSpot configuration, the system will track:

### **Contact Information:**
- ✅ **Preferred Communication Method** - Email, Phone, etc.
- ✅ **Contact Type** - Lead, Customer, Partner
- ✅ **Last Interaction Date** - Automatically set
- ✅ **Source of Lead** - "Website Chat"

### **Deal Information:**
- ✅ **Technology Stack** - To be determined
- ✅ **Project Type** - Web Development, IT Services, Networking, AI Solutions
- ✅ **Estimated Delivery Date** - Based on timeline provided
- ✅ **Project Budget** - From user input

### **Ticket Information:**
- ✅ **Priority Level** - High (for new leads)
- ✅ **Resolution Deadline** - Set based on timeline
- ✅ **Assigned Team** - Sales Team
- ✅ **Issue Type** - Lead Follow-up

## 🔧 Setup Steps

### **Step 1: Get HubSpot Credentials**

1. **Access Token:**
   - Go to HubSpot Settings → Integrations → Private Apps
   - Create new app: "Kingdom Design House RAG API"
   - Permissions: Contacts (Read, Write), Deals (Read, Write), Tickets (Read, Write)
   - Copy the access token

2. **Portal ID:**
   - In HubSpot Settings → Account Setup
   - Copy the "Hub ID" number

### **Step 2: Update Environment Variables**

Edit your `rag-api/.env` file:

```bash
HUBSPOT_ACCESS_TOKEN=your_actual_access_token_here
HUBSPOT_PORTAL_ID=your_actual_portal_id_here
```

### **Step 3: Test Integration**

```bash
node test-hubspot.js
```

## 🚀 How It Works

### **Automatic Lead Creation:**
When a user provides:
- ✅ Email address
- ✅ Service interest (Web Development, IT Services, etc.)
- ✅ Any additional details (budget, timeline, company)

The system automatically:
1. **Creates a Contact** in HubSpot with all provided information
2. **Creates a Deal** if service and budget information is available
3. **Creates a Ticket** for follow-up if project description is provided
4. **Links everything together** for complete lead management

### **Lead Data Captured:**
- **Contact Details:** Name, email, phone, company, website
- **Service Interest:** What they're looking for
- **Budget Range:** How much they're willing to spend
- **Timeline:** When they need the project completed
- **Project Description:** Details about their needs
- **Communication Preferences:** How they want to be contacted

## 🎉 Benefits

### **For You:**
- ✅ **Automatic lead capture** from website chat
- ✅ **Complete lead profiles** with all conversation context
- ✅ **Organized pipeline** with deals and tickets
- ✅ **No manual data entry** required
- ✅ **Follow-up automation** ready

### **For Your Customers:**
- ✅ **Seamless experience** - no forms to fill out
- ✅ **Natural conversation** with Jarvis AI
- ✅ **Immediate response** to their questions
- ✅ **Professional follow-up** process

## 🔍 Testing Your Integration

### **Test Lead Creation:**
```bash
node test-hubspot.js
```

### **Test Full RAG Pipeline:**
1. Start your RAG API server
2. Send a chat message with contact info
3. Check HubSpot for the new lead

## 📈 Next Steps

1. **Add your HubSpot credentials** to the `.env` file
2. **Test the integration** with the test script
3. **Start your RAG API server** for production use
4. **Monitor your HubSpot CRM** for incoming leads

Your Kingdom Design House RAG system is now a complete lead generation and management solution! 🚀