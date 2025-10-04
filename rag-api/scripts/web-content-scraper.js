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
  
  // Default to production primary domain
  return 'https://kingdomdesignhouse.com';
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
  
  // Processing options - Aggressive memory optimization
  options: {
    chunkSize: 300,  // Further reduced for memory efficiency
    overlap: 50,     // Minimal overlap to save memory
    timeout: 5000,   // Reduced timeout
    retries: 2,      // Reduced retries
    maxContentSize: 500 * 1024, // 500KB limit (much smaller)
    maxChunksPerPage: 10, // Limit chunks per page
    maxPagesPerBatch: 3,  // Process fewer pages at once
    memoryThreshold: 100 * 1024 * 1024, // 100MB memory threshold
    forceGCInterval: 2    // Force GC every 2 pages
  }
};

/**
 * Fetches content from a URL with memory optimization
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
      maxContentLength: WEB_CONFIG.options.maxContentSize,
      maxBodyLength: WEB_CONFIG.options.maxContentSize,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Kingdom Design House Bot/1.0)'
      }
    });
    
    // Check content size
    const contentSize = Buffer.byteLength(response.data, 'utf8');
    if (contentSize > WEB_CONFIG.options.maxContentSize) {
      throw new Error(`Content too large: ${Math.round(contentSize / 1024)}KB (limit: ${Math.round(WEB_CONFIG.options.maxContentSize / 1024)}KB)`);
    }
    
    return response.data;
  } catch (error) {
    if (error.code === 'ECONNABORTED') {
      throw new Error(`Timeout after ${WEB_CONFIG.options.timeout}ms`);
    } else if (error.code === 'ENOTFOUND') {
      throw new Error('Host not found');
    } else if (error.response?.status) {
      throw new Error(`HTTP ${error.response.status}: ${error.response.statusText}`);
    }
    throw error;
  }
};

/**
 * Extracts meaningful content from HTML with aggressive memory optimization
 * @param {string} html - HTML content
 * @param {string} url - Source URL
 * @returns {Object} Extracted content with metadata
 */
const extractPageContent = (html, url) => {
  // Immediate size check to prevent memory issues
  if (html.length > WEB_CONFIG.options.maxContentSize) {
    console.warn(`⚠️  HTML too large (${Math.round(html.length / 1024)}KB), truncating for ${url}`);
    html = html.substring(0, WEB_CONFIG.options.maxContentSize);
  }
  
  if (!cheerio) {
    // Fallback: simple text extraction with memory optimization
    const text = html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
    const maxLength = 10000; // 10KB limit for fallback
    const truncatedText = text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    
    return {
      title: 'Web Content',
      content: truncatedText,
      url
    };
  }
  
  let $;
  try {
    $ = cheerio.load(html, {
      normalizeWhitespace: true,
      decodeEntities: false // Prevent memory issues with entity decoding
    });
  } catch (error) {
    console.warn(`⚠️  Cheerio parsing failed for ${url}, using fallback`);
    const text = html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
    return {
      title: 'Web Content',
      content: text.substring(0, 10000),
      url
    };
  }
  
  // Extract title with memory optimization
  let title = 'Web Content';
  try {
    const titleText = $('title').text() || $('h1').first().text();
    if (titleText) {
      title = titleText.replace(/\s+/g, ' ').trim().substring(0, 200); // Limit title length
    }
  } catch (error) {
    console.warn(`⚠️  Title extraction failed for ${url}`);
  }
  
  // Remove unwanted elements to reduce memory usage
  try {
    $('script, style, nav, footer, .navigation, .sidebar, .ads, .advertisement, .header, .menu').remove();
  } catch (error) {
    console.warn(`⚠️  Element removal failed for ${url}`);
  }
  
  // Extract main content with memory optimization
  const contentSelectors = [
    'main', 'article', '.content', '.main-content', 
    '#content', '.post-content', '.entry-content',
    '.service-content', '.page-content'
  ];
  
  let content = '';
  try {
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
  } catch (error) {
    console.warn(`⚠️  Content extraction failed for ${url}, using fallback`);
    content = html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
  }
  
  // Aggressive content cleanup and truncation
  content = content.replace(/\s+/g, ' ').trim();
  
  // Much smaller content limit to prevent memory issues
  const maxContentLength = 20000; // 20KB limit (reduced from 50KB)
  if (content.length > maxContentLength) {
    content = content.substring(0, maxContentLength) + '...';
    console.warn(`⚠️  Content truncated to ${maxContentLength} characters for ${url}`);
  }
  
  // Clear cheerio instance to free memory
  $.html = null;
  $ = null;
  
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
    
    // Limit number of chunks to prevent memory issues
    const maxChunks = WEB_CONFIG.options.maxChunksPerPage;
    const limitedChunks = chunks.slice(0, maxChunks);
    
    if (chunks.length > maxChunks) {
      console.warn(`⚠️  Limited to ${maxChunks} chunks (from ${chunks.length}) for ${pageConfig.title}`);
    }
    
    // Create chunks with metadata
    const pageChunks = limitedChunks.map((chunk, index) => ({
      id: `web-${pageConfig.path.replace(/[^a-zA-Z0-9]/g, '-')}-chunk-${index}`,
      content: chunk,
      metadata: {
        title: pageConfig.title || extracted.title,
        category: pageConfig.category || 'website',
        tags: (pageConfig.tags || []).join(', '),
        source: url,
        chunkIndex: index,
        totalChunks: limitedChunks.length,
        fileType: 'html',
        scrapedAt: new Date().toISOString()
      }
    }));
    
    console.log(`✅ Extracted ${limitedChunks.length} chunks from ${pageConfig.title}`);
    return pageChunks;
    
  } catch (error) {
    console.error(`❌ Failed to process ${url}:`, error.message);
    return [];
  }
};

/**
 * Memory monitoring and cleanup utility
 */
const checkMemoryUsage = () => {
  const used = process.memoryUsage();
  const heapUsedMB = Math.round(used.heapUsed / 1024 / 1024);
  const heapTotalMB = Math.round(used.heapTotal / 1024 / 1024);
  
  console.log(`💾 Memory: Heap ${heapUsedMB}MB/${heapTotalMB}MB, RSS ${Math.round(used.rss / 1024 / 1024)}MB`);
  
  // Force GC if memory usage is high
  if (used.heapUsed > WEB_CONFIG.options.memoryThreshold && global.gc) {
    console.log('🧹 High memory usage detected, forcing garbage collection...');
    global.gc();
    const afterGC = process.memoryUsage();
    console.log(`💾 After GC: Heap ${Math.round(afterGC.heapUsed / 1024 / 1024)}MB`);
  }
  
  return used;
};

/**
 * Processes all configured web pages with streaming approach
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
  let processedPages = 0;
  
  // Process main pages with aggressive memory management
  console.log('🌐 Processing main website pages...');
  for (let i = 0; i < WEB_CONFIG.pages.length; i++) {
    const page = WEB_CONFIG.pages[i];
    console.log(`📄 Processing page ${i + 1}/${WEB_CONFIG.pages.length}: ${page.title}`);
    
    try {
      const chunks = await processWebPage(page);
      allChunks.push(...chunks);
      processedPages++;
      
      // Check memory usage after each page
      checkMemoryUsage();
      
      // Force garbage collection more frequently
      if (processedPages % WEB_CONFIG.options.forceGCInterval === 0 && global.gc) {
        console.log('🧹 Forcing garbage collection...');
        global.gc();
      }
      
      // Longer delay to allow memory cleanup
      await new Promise(resolve => setTimeout(resolve, 500));
      
    } catch (error) {
      console.error(`❌ Failed to process ${page.title}:`, error.message);
      // Continue with next page instead of failing completely
    }
  }
  
  // Process service pages in much smaller batches
  console.log('\n🔧 Processing service pages...');
  const batchSize = WEB_CONFIG.options.maxPagesPerBatch; // Process only 3 pages at a time
  for (let i = 0; i < WEB_CONFIG.servicePages.length; i += batchSize) {
    const batch = WEB_CONFIG.servicePages.slice(i, i + batchSize);
    console.log(`📄 Processing service batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(WEB_CONFIG.servicePages.length / batchSize)}`);
    
    for (const page of batch) {
      try {
        const chunks = await processWebPage({
          ...page,
          category: 'services',
          tags: ['services', 'offerings']
        });
        allChunks.push(...chunks);
        processedPages++;
        
        // Check memory after each page
        checkMemoryUsage();
        
        // Force GC after each page in service batch
        if (global.gc) {
          global.gc();
        }
        
        // Delay between pages
        await new Promise(resolve => setTimeout(resolve, 300));
        
      } catch (error) {
        console.error(`❌ Failed to process service page ${page.title}:`, error.message);
      }
    }
    
    // Longer delay between batches
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log(`✅ Processed ${processedPages} pages total`);
  return allChunks;
};

/**
 * Memory monitoring utility
 */
const logMemoryUsage = () => {
  const used = process.memoryUsage();
  const formatBytes = (bytes) => Math.round(bytes / 1024 / 1024 * 100) / 100;
  console.log(`💾 Memory: RSS ${formatBytes(used.rss)}MB, Heap ${formatBytes(used.heapUsed)}/${formatBytes(used.heapTotal)}MB`);
};

/**
 * Streaming upload function to prevent memory accumulation
 * @param {Array} chunks - Array of chunks to upload
 * @param {number} batchSize - Number of chunks to upload at once
 */
const uploadChunksInBatches = async (chunks, batchSize = 5) => {
  console.log(`📤 Uploading ${chunks.length} chunks in batches of ${batchSize}...`);
  
  for (let i = 0; i < chunks.length; i += batchSize) {
    const batch = chunks.slice(i, i + batchSize);
    console.log(`📤 Uploading batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(chunks.length / batchSize)} (${batch.length} chunks)`);
    
    try {
      await uploadChunksToPinecone(batch);
      console.log(`✅ Batch ${Math.floor(i / batchSize) + 1} uploaded successfully`);
      
      // Force GC after each batch to free memory
      if (global.gc) {
        global.gc();
      }
      
      // Delay between batches
      await new Promise(resolve => setTimeout(resolve, 1000));
      
    } catch (error) {
      console.error(`❌ Failed to upload batch ${Math.floor(i / batchSize) + 1}:`, error.message);
      // Continue with next batch instead of failing completely
    }
  }
};

/**
 * Main scraping function with streaming approach
 */
async function scrapeWebsite() {
  try {
    console.log('🚀 Starting website content scraping...');
    checkMemoryUsage();
    
    // Initialize Pinecone
    console.log('🔗 Initializing Pinecone...');
    await initializePinecone();
    
    // Process all web pages with streaming approach
    const allChunks = await processAllWebPages();
    checkMemoryUsage();
    
    if (allChunks.length === 0) {
      console.log('⚠️  No content extracted from website');
      return;
    }
    
    // Upload to Pinecone (unless in dry-run mode)
    if (global.DRY_RUN) {
      console.log(`\n🔍 Dry run: Would upload ${allChunks.length} chunks to Pinecone`);
      console.log('📋 Sample chunks:');
      allChunks.slice(0, 3).forEach((chunk, index) => {
        console.log(`\n--- Chunk ${index + 1} ---`);
        console.log(`ID: ${chunk.id}`);
        console.log(`Title: ${chunk.metadata.title}`);
        console.log(`Content: ${chunk.content.substring(0, 200)}...`);
      });
    } else {
      // Upload in small batches to prevent memory issues
      await uploadChunksInBatches(allChunks, 3); // Upload 3 chunks at a time
      checkMemoryUsage();
    }
    
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
  
  const isDryRun = args.includes('--dry-run');
  const isVerbose = args.includes('--verbose');
  
  if (isDryRun) {
    console.log('🔍 Dry run mode - content will be scraped but not uploaded');
  }
  
  if (isVerbose) {
    console.log('📝 Verbose mode enabled');
  }
  
  // Set global flags for the scraping process
  global.DRY_RUN = isDryRun;
  global.VERBOSE = isVerbose;
  
  scrapeWebsite();
}

module.exports = {
  scrapeWebsite,
  processWebPage,
  processAllWebPages,
  WEB_CONFIG
};