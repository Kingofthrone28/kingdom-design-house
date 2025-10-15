#!/usr/bin/env node

/**
 * Fix Redirects and Re-indexing Script
 * 
 * This script helps fix Google Search Console validation failures
 * by ensuring proper redirects and triggering re-indexing.
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG = {
  baseUrl: 'https://kingdomdesignhouse.com',
  urls: [
    'https://kingdomdesignhouse.com/',
    'https://kingdomdesignhouse.com/about/',
    'https://kingdomdesignhouse.com/services/',
    'https://kingdomdesignhouse.com/contact/',
    'https://kingdomdesignhouse.com/pricing/',
    'https://kingdomdesignhouse.com/web-group/',
    'https://kingdomdesignhouse.com/network-group/',
    'https://kingdomdesignhouse.com/ai-group/'
  ],
  googleIndexingApi: {
    // Note: This requires Google Search Console API setup
    // For now, we'll provide manual instructions
    endpoint: 'https://indexing.googleapis.com/v3/urlNotifications:publish'
  }
};

/**
 * Test redirects for problematic URLs
 */
async function testRedirects() {
  console.log('🧪 Testing redirects for problematic URLs...\n');
  
  const problematicUrls = [
    'http://www.kingdomdesignhouse.com/',
    'https://www.kingdomdesignhouse.com/',
    'http://kingdomdesignhouse.com/'
  ];
  
  for (const url of problematicUrls) {
    try {
      console.log(`Testing: ${url}`);
      await testRedirect(url);
    } catch (error) {
      console.log(`❌ Error testing ${url}: ${error.message}`);
    }
  }
}

/**
 * Test a single redirect
 */
function testRedirect(url) {
  return new Promise((resolve, reject) => {
    const req = https.request(url, { method: 'HEAD' }, (res) => {
      console.log(`  Status: ${res.statusCode}`);
      console.log(`  Location: ${res.headers.location || 'No redirect'}`);
      
      if (res.statusCode === 301 || res.statusCode === 302) {
        console.log(`  ✅ Redirect working`);
      } else if (res.statusCode === 200) {
        console.log(`  ⚠️  No redirect (might be okay if already canonical)`);
      } else {
        console.log(`  ❌ Unexpected status`);
      }
      
      console.log('');
      resolve();
    });
    
    req.on('error', reject);
    req.setTimeout(10000, () => {
      req.destroy();
      reject(new Error('Timeout'));
    });
    
    req.end();
  });
}

/**
 * Generate sitemap with proper canonical URLs
 */
function generateSitemap() {
  console.log('🗺️  Generating sitemap with canonical URLs...\n');
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${CONFIG.urls.map(url => `  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>`).join('\n')}
</urlset>`;

  const sitemapPath = path.join(__dirname, '../frontend/public/sitemap.xml');
  fs.writeFileSync(sitemapPath, sitemap);
  console.log(`✅ Sitemap updated: ${sitemapPath}`);
}

/**
 * Generate robots.txt with proper directives
 */
function generateRobotsTxt() {
  console.log('🤖 Generating robots.txt...\n');
  
  const robotsTxt = `User-agent: *
Allow: /

# Canonical URL
Host: ${CONFIG.baseUrl}

# Sitemap
Sitemap: ${CONFIG.baseUrl}/sitemap.xml

# Disallow problematic paths
Disallow: /api/
Disallow: /.netlify/
Disallow: /_next/
`;

  const robotsPath = path.join(__dirname, '../frontend/public/robots.txt');
  fs.writeFileSync(robotsPath, robotsTxt);
  console.log(`✅ Robots.txt updated: ${robotsPath}`);
}

/**
 * Print manual re-indexing instructions
 */
function printReindexingInstructions() {
  console.log('📋 Manual Re-indexing Instructions:\n');
  
  console.log('1. Google Search Console Actions:');
  console.log('   - Go to Google Search Console');
  console.log('   - Navigate to "URL Inspection" tool');
  console.log('   - Test these URLs individually:');
  CONFIG.urls.forEach(url => console.log(`     • ${url}`));
  console.log('');
  
  console.log('2. Request Re-indexing:');
  console.log('   - For each URL, click "Request Indexing"');
  console.log('   - Wait for validation to complete');
  console.log('');
  
  console.log('3. Monitor Progress:');
  console.log('   - Check "Coverage" report in Search Console');
  console.log('   - Look for "Valid" status instead of "Validation failed"');
  console.log('   - This may take 24-48 hours');
  console.log('');
  
  console.log('4. Verify Redirects:');
  console.log('   - Test these URLs in browser:');
  console.log('     • http://www.kingdomdesignhouse.com/');
  console.log('     • https://www.kingdomdesignhouse.com/');
  console.log('     • http://kingdomdesignhouse.com/');
  console.log('   - All should redirect to https://kingdomdesignhouse.com/');
}

/**
 * Main execution
 */
async function main() {
  console.log('🚀 Fix Redirects and Re-indexing Script\n');
  console.log('=' .repeat(50));
  
  try {
    // Generate updated files
    generateSitemap();
    generateRobotsTxt();
    
    // Test redirects
    await testRedirects();
    
    // Print instructions
    printReindexingInstructions();
    
    console.log('✅ Script completed successfully!');
    console.log('\n📝 Next Steps:');
    console.log('1. Deploy the updated netlify.toml and sitemap.xml');
    console.log('2. Follow the manual re-indexing instructions above');
    console.log('3. Monitor Google Search Console for validation success');
    
  } catch (error) {
    console.error('❌ Script failed:', error.message);
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = {
  testRedirects,
  generateSitemap,
  generateRobotsTxt,
  printReindexingInstructions
};
