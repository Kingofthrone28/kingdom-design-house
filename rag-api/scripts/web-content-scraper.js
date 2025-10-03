#!/usr/bin/env node

/**
 * Web Content Scraper
 * Scrapes website content and processes it for RAG system
 */

require('dotenv').config();
const path = require('path');
const fs = require('fs');
const { processHTML, chunkText } = require('../services/documentProcessor');
const { uploadChunksToPinecone } = require('../services/documentProcessor');
const { initializePinecone } = require('../services/pinecone');

// Web scraping libraries (optional)
let axios = null;
let cheerio = null;

// Lazy load libraries
const loadLibraries = () => {
  try {
    axios = require('axios');
  } catch (e) {
    console.warn('axios not installed. Web scraping disabled.');
  }
  
  try {
    cheerio = require('cheerio');
  } catch (e) {
    console.warn('cheerio not installed. HTML processing disabled.');
  }
};

/**
 * Determines the correct base URL based on environment
 * @returns {string} The appropriate base URL for scraping
 */
const getBaseUrl = () => {
  // Check for custom URL from command line
  const args = process.argv.slice(2);
  const urlIndex = args.indexOf('--url');
  if (urlIndex !== -1 && urlIndex + 1 < args.length) {
    return args[urlIndex + 1];
  }
  
  // Check environment variables
  if (process.env.WEB_SCRAPING_URL) {
    return process.env.WEB_SCRAPING_URL;
  }
  
  // Check if we're in development mode (RAG API running locally)
  if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'dev') {
    return 'http://localhost:3000';
  }
  
  // Check if we're running in a local development environment
  if (process.env.PORT && process.env.PORT !== '3001') {
    return 'http://localhost:3000';
  }
  
  // Default to production Netlify URL
  return 'https://kingdom-design-house.netlify.app';
};

// Configuration for website scraping
const WEB_CONFIG = {
  // Base URL for the website - will be determined dynamically
  baseUrl: null,
  
  // Pages to scrape
  pages: [
    {
      path: '/',
      title: 'Home Page',
      category: 'website',
      tags: ['home', 'landing', 'overview']
    },
    {
      path: '/about',
      title: 'About Us',
      category: 'website',
      tags: ['about', 'company', 'team']
    },
    {
      path: '/pricing',
      title: 'Pricing Plans',
      category: 'website',
      tags: ['pricing', 'plans', 'cost']
    },
    {
      path: '/web-group',
      title: 'Web Group Services',
      category: 'website',
      tags: ['web', 'development', 'design']
    },
    {
      path: '/network-group',
      title: 'Network Group Services',
      category: 'website',
      tags: ['network', 'it', 'infrastructure']
    },
    {
      path: '/ai-group',
      title: 'AI Group Services',
      category: 'website',
      tags: ['ai', 'artificial intelligence', 'automation']
    }
  ],
  
  // Service pages to scrape
  servicePages: [
    // Web Group Services
    { path: '/web-group/services/web-design', title: 'Web Design Services' },
    { path: '/web-group/services/web-development', title: 'Web Development Services' },
    { path: '/web-group/services/digital-marketing', title: 'Digital Marketing Services' },
    { path: '/web-group/services/support', title: 'Web Support Services' },
    
    // Network Group Services
    { path: '/network-group/services/network-design', title: 'Network Design Services' },
    { path: '/network-group/services/network-optimization', title: 'Network Optimization Services' },
    { path: '/network-group/services/network-support', title: 'Network Support Services' },
    
    // AI Group Services
    { path: '/ai-group/services/ai-consulting', title: 'AI Consulting Services' },
    { path: '/ai-group/services/ai-development', title: 'AI Development Services' },
    { path: '/ai-group/services/ai-support', title: 'AI Support Services' }
  ],
  
  // Processing options
  options: {
    chunkSize: 800,
    overlap: 150,
    timeout: 10000, // 10 seconds
    retries: 3
  }
};

/**
 * Fetches content from a URL
 * @param {string} url - URL to fetch
 * @returns {Promise<string>} HTML content
 */
const fetchPageContent = async (url) => {
  if (!axios) {
    throw new Error('axios not installed. Cannot fetch web content.');
  }
  
  try {
    const response = await axios.get(url, {
      timeout: WEB_CONFIG.options.timeout,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Kingdom Design House Bot/1.0)'
      }
    });
    
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch ${url}:`, error.message);
    throw error;
  }
};

/**
 * Extracts meaningful content from HTML
 * @param {string} html - HTML content
 * @param {string} url - Source URL
 * @returns {Object} Extracted content with metadata
 */
const extractPageContent = (html, url) => {
  if (!cheerio) {
    // Fallback: simple text extraction
    const text = html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
    return {
      title: 'Web Content',
      content: text,
      url
    };
  }
  
  const $ = cheerio.load(html);
  
  // Extract title
  let title = $('title').text() || $('h1').first().text() || 'Web Content';
  title = title.replace(/\s+/g, ' ').trim();
  
  // Remove unwanted elements
  $('script, style, nav, footer, .navigation, .sidebar, .ads, .advertisement').remove();
  
  // Extract main content
  const contentSelectors = [
    'main', 'article', '.content', '.main-content', 
    '#content', '.post-content', '.entry-content',
    '.service-content', '.page-content'
  ];
  
  let content = '';
  for (const selector of contentSelectors) {
    const element = $(selector);
    if (element.length > 0) {
      content = element.text();
      break;
    }
  }
  
  // Fallback to body if no content area found
  if (!content) {
    content = $('body').text();
  }
  
  // Clean up content
  content = content.replace(/\s+/g, ' ').trim();
  
  return {
    title,
    content,
    url
  };
};

/**
 * Processes a single web page
 * @param {Object} pageConfig - Page configuration
 * @returns {Promise<Array>} Array of content chunks
 */
const processWebPage = async (pageConfig) => {
  const baseUrl = getBaseUrl();
  const url = `${baseUrl}${pageConfig.path}`;
  
  try {
    console.log(`📄 Processing: ${pageConfig.title} (${url})`);
    
    // Fetch page content
    const html = await fetchPageContent(url);
    
    // Extract content
    const extracted = extractPageContent(html, url);
    
    if (!extracted.content || extracted.content.length < 100) {
      console.warn(`⚠️  Minimal content extracted from ${url}`);
      return [];
    }
    
    // Chunk the content
    const chunks = chunkText(
      extracted.content,
      WEB_CONFIG.options.chunkSize,
      WEB_CONFIG.options.overlap
    );
    
    // Create chunks with metadata
    const pageChunks = chunks.map((chunk, index) => ({
      id: `web-${pageConfig.path.replace(/[^a-zA-Z0-9]/g, '-')}-chunk-${index}`,
      content: chunk,
      metadata: {
        title: pageConfig.title || extracted.title,
        category: pageConfig.category || 'website',
        tags: (pageConfig.tags || []).join(', '),
        source: url,
        chunkIndex: index,
        totalChunks: chunks.length,
        fileType: 'html',
        scrapedAt: new Date().toISOString()
      }
    }));
    
    console.log(`✅ Extracted ${chunks.length} chunks from ${pageConfig.title}`);
    return pageChunks;
    
  } catch (error) {
    console.error(`❌ Failed to process ${url}:`, error.message);
    return [];
  }
};

/**
 * Processes all configured web pages
 * @returns {Promise<Array>} Array of all content chunks
 */
const processAllWebPages = async () => {
  loadLibraries();
  
  if (!axios) {
    throw new Error('Web scraping requires axios package. Install with: npm install axios');
  }
  
  // Initialize base URL
  const baseUrl = getBaseUrl();
  console.log(`🌐 Using base URL: ${baseUrl}`);
  
  const allChunks = [];
  
  // Process main pages
  console.log('🌐 Processing main website pages...');
  for (const page of WEB_CONFIG.pages) {
    const chunks = await processWebPage(page);
    allChunks.push(...chunks);
  }
  
  // Process service pages
  console.log('\n🔧 Processing service pages...');
  for (const page of WEB_CONFIG.servicePages) {
    const chunks = await processWebPage({
      ...page,
      category: 'services',
      tags: ['services', 'offerings']
    });
    allChunks.push(...chunks);
  }
  
  return allChunks;
};

/**
 * Main scraping function
 */
async function scrapeWebsite() {
  try {
    console.log('🚀 Starting website content scraping...');
    
    // Initialize Pinecone
    console.log('🔗 Initializing Pinecone...');
    await initializePinecone();
    
    // Process all web pages
    const allChunks = await processAllWebPages();
    
    if (allChunks.length === 0) {
      console.log('⚠️  No content extracted from website');
      return;
    }
    
    // Upload to Pinecone
    console.log(`\n📤 Uploading ${allChunks.length} chunks to Pinecone...`);
    await uploadChunksToPinecone(allChunks);
    
    console.log('\n🎉 Website scraping completed successfully!');
    console.log(`📊 Total chunks processed: ${allChunks.length}`);
    
  } catch (error) {
    console.error('❌ Website scraping failed:', error);
    process.exit(1);
  }
}

/**
 * CLI interface
 */
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
Website Content Scraper

Usage: node web-content-scraper.js [options]

Options:
  --help, -h          Show this help message
  --dry-run          Scrape content but don't upload to Pinecone
  --url <url>        Override base URL (default: auto-detected)
  --verbose          Show detailed processing information

Base URL Detection:
  - Development: http://localhost:3000
  - Production: https://kingdom-design-house.netlify.app
  - Custom: Use --url flag or WEB_SCRAPING_URL environment variable

Pages to scrape:
${WEB_CONFIG.pages.map(page => `  - ${page.path} (${page.title})`).join('\n')}

Service pages:
${WEB_CONFIG.servicePages.map(page => `  - ${page.path} (${page.title})`).join('\n')}

Example:
  node web-content-scraper.js --verbose
  node web-content-scraper.js --url https://staging.kingdomdesignhouse.com
    `);
    process.exit(0);
  }
  
  // URL is now handled by getBaseUrl() function
  const baseUrl = getBaseUrl();
  console.log(`🌐 Using base URL: ${baseUrl}`);
  
  if (args.includes('--dry-run')) {
    console.log('🔍 Dry run mode - content will be scraped but not uploaded');
    // TODO: Implement dry run mode
  }
  
  if (args.includes('--verbose')) {
    console.log('📝 Verbose mode enabled');
    // TODO: Implement verbose logging
  }
  
  scrapeWebsite();
}

module.exports = {
  scrapeWebsite,
  processWebPage,
  processAllWebPages,
  WEB_CONFIG
};