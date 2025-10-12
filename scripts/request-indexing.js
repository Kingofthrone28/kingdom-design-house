/**
 * Google Search Console Indexing Request Script
 * 
 * This script helps automate the process of requesting indexing for service pages.
 * It generates the URLs that need to be manually submitted to Google Search Console.
 * 
 * Usage:
 *   node scripts/request-indexing.js
 * 
 * @author Kingdom Design House Development Team
 * @version 1.0.0
 */

const servicePages = {
  'AI Group Services': [
    'https://kingdomdesignhouse.com/ai-group/services/ai-consulting/',
    'https://kingdomdesignhouse.com/ai-group/services/ai-support/'
  ],
  'Web Group Services': [
    'https://kingdomdesignhouse.com/web-group/services/web-development/',
    'https://kingdomdesignhouse.com/web-group/services/web-design/',
    'https://kingdomdesignhouse.com/web-group/services/digital-marketing/',
    'https://kingdomdesignhouse.com/web-group/services/support/'
  ],
  'Network Group Services': [
    'https://kingdomdesignhouse.com/network-group/services/network-design/',
    'https://kingdomdesignhouse.com/network-group/services/network-optimization/',
    'https://kingdomdesignhouse.com/network-group/services/network-support/'
  ]
};

console.log('\n🔍 Google Search Console Indexing Request URLs\n');
console.log('='.repeat(70));
console.log('\nFollow these steps to request indexing:\n');
console.log('1. Go to: https://search.google.com/search-console');
console.log('2. Select your property: kingdomdesignhouse.com');
console.log('3. Use the "URL Inspection" tool (top search bar)');
console.log('4. Paste each URL below and click "Request Indexing"\n');
console.log('='.repeat(70));
console.log('\n');

let totalUrls = 0;

Object.entries(servicePages).forEach(([groupName, urls]) => {
  console.log(`\n📁 ${groupName} (${urls.length} pages):`);
  console.log('-'.repeat(70));
  
  urls.forEach((url, index) => {
    console.log(`  ${index + 1}. ${url}`);
    totalUrls++;
  });
});

console.log('\n' + '='.repeat(70));
console.log(`\n✅ Total URLs to index: ${totalUrls}`);
console.log('\n💡 Pro Tips:');
console.log('  - Request indexing in batches of 3-5 URLs per day');
console.log('  - Wait for previous requests to process before submitting more');
console.log('  - Check back in 1-2 weeks to see indexing status');
console.log('  - Prioritize high-value service pages first\n');

// Export URLs for programmatic use
module.exports = { servicePages };

