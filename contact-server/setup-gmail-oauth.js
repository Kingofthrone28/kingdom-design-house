#!/usr/bin/env node

/**
 * Gmail OAuth 2.0 Setup Script
 * 
 * This script helps you get the OAuth credentials needed for Gmail API access.
 * Run this once to get your refresh token, then use it in Railway.
 */

const { google } = require('googleapis');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function setupGmailOAuth() {
  console.log('🔧 Gmail OAuth 2.0 Setup\n');
  
  console.log('📋 Prerequisites:');
  console.log('1. Go to https://console.developers.google.com/');
  console.log('2. Create a new project or select existing one');
  console.log('3. Enable Gmail API');
  console.log('4. Create OAuth 2.0 credentials (Desktop Application)');
  console.log('5. Download the credentials JSON file\n');
  
  rl.question('Enter your Gmail Client ID: ', (clientId) => {
    rl.question('Enter your Gmail Client Secret: ', async (clientSecret) => {
      rl.question('Enter your Gmail address (the one you want to send from): ', async (email) => {
        
        console.log('\n🔗 Opening browser for OAuth consent...');
        
        const oauth2Client = new google.auth.OAuth2(
          clientId,
          clientSecret,
          'urn:ietf:wg:oauth:2.0:oob'
        );

        const authUrl = oauth2Client.generateAuthUrl({
          access_type: 'offline',
          scope: ['https://www.googleapis.com/auth/gmail.send'],
          prompt: 'consent'
        });

        console.log(`\n🌐 Please visit this URL and authorize the application:`);
        console.log(`\n${authUrl}\n`);
        
        rl.question('After authorization, paste the authorization code here: ', async (code) => {
          try {
            const { tokens } = await oauth2Client.getToken(code);
            
            console.log('\n✅ OAuth setup successful!\n');
            console.log('📝 Add these environment variables to Railway:\n');
            console.log(`GMAIL_CLIENT_ID=${clientId}`);
            console.log(`GMAIL_CLIENT_SECRET=${clientSecret}`);
            console.log(`GMAIL_REFRESH_TOKEN=${tokens.refresh_token}`);
            console.log(`BUSINESS_EMAIL=${email}\n`);
            
            console.log('🚀 Your contact form will now work with Gmail API!');
            
          } catch (error) {
            console.error('❌ Error getting tokens:', error.message);
          }
          
          rl.close();
        });
      });
    });
  });
}

setupGmailOAuth().catch(console.error);
