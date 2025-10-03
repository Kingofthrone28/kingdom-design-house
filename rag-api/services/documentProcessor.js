/**
 * Document Processing Service
 * Handles various document types for RAG system ingestion
 */

const fs = require('fs');
const path = require('path');
const { upsertDocument } = require('./pinecone');

// Document processing libraries (to be installed)
let pdfParse = null;
let mammoth = null;
let cheerio = null;

// Lazy load libraries to avoid errors if not installed
const loadLibraries = () => {
  try {
    pdfParse = require('pdf-parse');
  } catch (e) {
    console.warn('pdf-parse not installed. PDF processing disabled.');
  }
  
  try {
    mammoth = require('mammoth');
  } catch (e) {
    console.warn('mammoth not installed. DOCX processing disabled.');
  }
  
  try {
    cheerio = require('cheerio');
  } catch (e) {
    console.warn('cheerio not installed. HTML processing disabled.');
  }
};

/**
 * Chunks text into smaller pieces for better vector search
 * @param {string} text - Text to chunk
 * @param {number} chunkSize - Maximum characters per chunk
 * @param {number} overlap - Character overlap between chunks
 * @returns {Array} Array of text chunks
 */
const chunkText = (text, chunkSize = 1000, overlap = 200) => {
  const chunks = [];
  let start = 0;
  
  while (start < text.length) {
    const end = Math.min(start + chunkSize, text.length);
    let chunk = text.slice(start, end);
    
    // Try to break at sentence boundaries
    if (end < text.length) {
      const lastSentence = chunk.lastIndexOf('.');
      const lastNewline = chunk.lastIndexOf('\n');
      const breakPoint = Math.max(lastSentence, lastNewline);
      
      if (breakPoint > start + chunkSize * 0.5) {
        chunk = chunk.slice(0, breakPoint + 1);
      }
    }
    
    chunks.push(chunk.trim());
    start = start + chunk.length - overlap;
  }
  
  return chunks.filter(chunk => chunk.length > 50); // Filter out very small chunks
};

/**
 * Processes PDF documents with streaming for large files
 * @param {string} filePath - Path to PDF file
 * @returns {Promise<string>} Extracted text
 */
const processPDF = async (filePath) => {
  if (!pdfParse) {
    throw new Error('PDF processing not available. Install pdf-parse package.');
  }
  
  // Check file size to determine processing method
  const stats = fs.statSync(filePath);
  const fileSizeMB = stats.size / (1024 * 1024);
  
  if (fileSizeMB > 50) { // Files larger than 50MB
    console.warn(`⚠️  Large PDF file detected (${fileSizeMB.toFixed(1)}MB): ${path.basename(filePath)}`);
    console.warn('⚠️  Consider splitting large PDFs to prevent memory issues');
  }
  
  // Use streaming for large files
  if (fileSizeMB > 10) {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(filePath);
      const chunks = [];
      
      stream.on('data', (chunk) => {
        chunks.push(chunk);
      });
      
      stream.on('end', async () => {
        try {
          const buffer = Buffer.concat(chunks);
          const data = await pdfParse(buffer);
          resolve(data.text);
        } catch (error) {
          reject(error);
        }
      });
      
      stream.on('error', reject);
    });
  } else {
    // Use synchronous read for small files
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdfParse(dataBuffer);
    return data.text;
  }
};

/**
 * Processes DOCX documents
 * @param {string} filePath - Path to DOCX file
 * @returns {Promise<string>} Extracted text
 */
const processDOCX = async (filePath) => {
  if (!mammoth) {
    throw new Error('DOCX processing not available. Install mammoth package.');
  }
  
  const result = await mammoth.extractRawText({ path: filePath });
  return result.value;
};

/**
 * Processes HTML content with memory optimization
 * @param {string} html - HTML content
 * @returns {string} Extracted text
 */
const processHTML = (html) => {
  // Check HTML size to determine processing method
  const htmlSizeKB = html.length / 1024;
  
  if (htmlSizeKB > 100) { // HTML larger than 100KB
    console.warn(`⚠️  Large HTML content detected (${htmlSizeKB.toFixed(1)}KB)`);
    console.warn('⚠️  Using lightweight text extraction to prevent memory issues');
  }
  
  if (!cheerio || htmlSizeKB > 500) {
    // Use lightweight regex-based extraction for large HTML or when cheerio is unavailable
    return extractTextFromHTML(html);
  }
  
  try {
    const $ = cheerio.load(html, {
      normalizeWhitespace: true,
      decodeEntities: false // Prevent memory issues with entity decoding
    });
    
    // Remove script and style elements
    $('script, style, nav, footer, .navigation, .sidebar, .ads').remove();
    
    // Extract text from main content areas
    const contentSelectors = [
      'main', 'article', '.content', '.main-content', 
      '#content', '.post-content', '.entry-content'
    ];
    
    let text = '';
    for (const selector of contentSelectors) {
      const element = $(selector);
      if (element.length > 0) {
        text = element.text();
        break;
      }
    }
    
    // Fallback to body if no content area found
    if (!text) {
      text = $('body').text();
    }
    
    // Clear cheerio instance to free memory
    $.html = null;
    
    return text.replace(/\s+/g, ' ').trim();
    
  } catch (error) {
    console.warn('⚠️  Cheerio processing failed, using fallback extraction');
    return extractTextFromHTML(html);
  }
};

/**
 * Lightweight HTML text extraction without DOM parsing
 * @param {string} html - HTML content
 * @returns {string} Extracted text
 */
const extractTextFromHTML = (html) => {
  // Remove script and style tags first
  html = html.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
  html = html.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');
  html = html.replace(/<nav[^>]*>[\s\S]*?<\/nav>/gi, '');
  html = html.replace(/<footer[^>]*>[\s\S]*?<\/footer>/gi, '');
  
  // Extract text content
  let text = html.replace(/<[^>]*>/g, '');
  
  // Clean up whitespace
  text = text.replace(/\s+/g, ' ').trim();
  
  // Limit content size to prevent memory issues
  const maxLength = 50000; // 50KB limit
  if (text.length > maxLength) {
    text = text.substring(0, maxLength) + '...';
    console.warn(`⚠️  HTML content truncated to ${maxLength} characters`);
  }
  
  return text;
};

/**
 * Processes plain text files with streaming for large files
 * @param {string} filePath - Path to text file
 * @returns {Promise<string>} File content
 */
const processText = async (filePath) => {
  // Check file size to determine processing method
  const stats = fs.statSync(filePath);
  const fileSizeMB = stats.size / (1024 * 1024);
  
  if (fileSizeMB > 10) { // Files larger than 10MB
    console.warn(`⚠️  Large text file detected (${fileSizeMB.toFixed(1)}MB): ${path.basename(filePath)}`);
    
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(filePath, 'utf8');
      let content = '';
      
      stream.on('data', (chunk) => {
        content += chunk;
      });
      
      stream.on('end', () => {
        resolve(content);
      });
      
      stream.on('error', reject);
    });
  } else {
    // Use synchronous read for small files
    return fs.readFileSync(filePath, 'utf8');
  }
};

/**
 * Processes Markdown files
 * @param {string} filePath - Path to Markdown file
 * @returns {string} File content (can be enhanced with markdown parsing)
 */
const processMarkdown = (filePath) => {
  const content = fs.readFileSync(filePath, 'utf8');
  // For now, return raw markdown. Can be enhanced with markdown-to-text conversion
  return content;
};

/**
 * Processes a single document file
 * @param {string} filePath - Path to document
 * @param {Object} options - Processing options
 * @returns {Promise<Array>} Array of processed chunks with metadata
 */
const processDocument = async (filePath, options = {}) => {
  const {
    chunkSize = 1000,
    overlap = 200,
    category = 'document',
    tags = [],
    title = null
  } = options;
  
  loadLibraries();
  
  const ext = path.extname(filePath).toLowerCase();
  const fileName = path.basename(filePath, ext);
  const docTitle = title || fileName;
  
  let text = '';
  
  try {
    switch (ext) {
      case '.pdf':
        text = await processPDF(filePath);
        break;
      case '.docx':
        text = await processDOCX(filePath);
        break;
      case '.html':
      case '.htm':
        text = processHTML(fs.readFileSync(filePath, 'utf8'));
        break;
      case '.txt':
        text = await processText(filePath);
        break;
      case '.md':
        text = processMarkdown(filePath);
        break;
      default:
        throw new Error(`Unsupported file type: ${ext}`);
    }
    
    if (!text || text.trim().length === 0) {
      throw new Error('No text content extracted from document');
    }
    
    // Chunk the text
    const chunks = chunkText(text, chunkSize, overlap);
    
    // Create document chunks with optimized metadata (no full text duplication)
    const documentChunks = chunks.map((chunk, index) => ({
      id: `${fileName}-chunk-${index}`,
      content: chunk,
      metadata: {
        title: docTitle,
        category,
        tags: tags.join(', '),
        source: path.basename(filePath), // Store only filename, not full path
        chunkIndex: index,
        totalChunks: chunks.length,
        fileType: ext.substring(1),
        // Remove full text from metadata to save memory
        // Content is stored in Pinecone values, not metadata
        processedAt: new Date().toISOString()
      }
    }));
    
    return documentChunks;
    
  } catch (error) {
    console.error(`Error processing document ${filePath}:`, error.message);
    throw error;
  }
};

/**
 * Processes all documents in a directory
 * @param {string} directoryPath - Path to directory containing documents
 * @param {Object} options - Processing options
 * @returns {Promise<Array>} Array of all processed document chunks
 */
const processDirectory = async (directoryPath, options = {}) => {
  const {
    recursive = true,
    fileExtensions = ['.pdf', '.docx', '.html', '.htm', '.txt', '.md'],
    ...processOptions
  } = options;
  
  const allChunks = [];
  
  const processFile = async (filePath) => {
    try {
      const chunks = await processDocument(filePath, processOptions);
      allChunks.push(...chunks);
      console.log(`✅ Processed ${filePath}: ${chunks.length} chunks`);
    } catch (error) {
      console.error(`❌ Failed to process ${filePath}:`, error.message);
    }
  };
  
  const scanDirectory = async (dir) => {
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const itemPath = path.join(dir, item);
      const stat = fs.statSync(itemPath);
      
      if (stat.isDirectory() && recursive) {
        await scanDirectory(itemPath);
      } else if (stat.isFile()) {
        const ext = path.extname(item).toLowerCase();
        if (fileExtensions.includes(ext)) {
          await processFile(itemPath);
        }
      }
    }
  };
  
  await scanDirectory(directoryPath);
  return allChunks;
};

/**
 * Processes web content (HTML from URLs)
 * @param {string} url - URL to process
 * @param {Object} options - Processing options
 * @returns {Promise<Array>} Array of processed chunks
 */
const processWebContent = async (url, options = {}) => {
  const {
    chunkSize = 1000,
    overlap = 200,
    category = 'web-content',
    tags = [],
    title = null
  } = options;
  
  // This would require additional setup for web scraping
  // For now, return a placeholder implementation
  console.warn('Web content processing not yet implemented');
  return [];
};

/**
 * Uploads processed chunks to Pinecone in batches to prevent memory issues
 * @param {Array} chunks - Array of document chunks
 * @param {number} batchSize - Number of chunks to upload at once
 * @returns {Promise<void>}
 */
const uploadChunksToPinecone = async (chunks, batchSize = 50) => {
  console.log(`Uploading ${chunks.length} chunks to Pinecone in batches of ${batchSize}...`);
  
  for (let i = 0; i < chunks.length; i += batchSize) {
    const batch = chunks.slice(i, i + batchSize);
    console.log(`📤 Uploading batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(chunks.length / batchSize)} (${batch.length} chunks)`);
    
    try {
      // Upload batch in parallel
      await Promise.all(batch.map(chunk => 
        upsertDocument(chunk.id, chunk.content, chunk.metadata)
      ));
      
      console.log(`✅ Batch ${Math.floor(i / batchSize) + 1} uploaded successfully`);
      
      // Clear batch from memory
      batch.length = 0;
      
      // Force GC after each batch
      if (global.gc) {
        global.gc();
      }
      
      // Small delay between batches
      await new Promise(resolve => setTimeout(resolve, 100));
      
    } catch (error) {
      console.error(`❌ Failed to upload batch ${Math.floor(i / batchSize) + 1}:`, error.message);
    }
  }
  
  console.log('✅ All chunks uploaded successfully');
};

/**
 * Memory-optimized directory processing with immediate upload
 * @param {string} directoryPath - Path to directory containing documents
 * @param {Object} options - Processing options
 * @returns {Promise<Object>} Processing results with counts
 */
const processDirectoryWithUpload = async (directoryPath, options = {}) => {
  const {
    recursive = true,
    fileExtensions = ['.pdf', '.docx', '.html', '.htm', '.txt', '.md'],
    ...processOptions
  } = options;
  
  let totalChunks = 0;
  let processedFiles = 0;
  
  const processFile = async (filePath) => {
    try {
      console.log(`📄 Processing: ${path.basename(filePath)}`);
      const chunks = await processDocument(filePath, processOptions);
      
      if (chunks.length > 0) {
        // Upload immediately to prevent memory accumulation
        await uploadChunksToPinecone(chunks, 25); // Smaller batch size for individual files
        totalChunks += chunks.length;
        processedFiles++;
        
        console.log(`✅ Processed ${path.basename(filePath)}: ${chunks.length} chunks uploaded`);
        
        // Clear chunks from memory
        chunks.length = 0;
        
        // Force GC after each file
        if (global.gc) {
          global.gc();
        }
      }
    } catch (error) {
      console.error(`❌ Failed to process ${filePath}:`, error.message);
    }
  };
  
  const scanDirectory = async (dir) => {
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const itemPath = path.join(dir, item);
      const stat = fs.statSync(itemPath);
      
      if (stat.isDirectory() && recursive) {
        await scanDirectory(itemPath);
      } else if (stat.isFile()) {
        const ext = path.extname(item).toLowerCase();
        if (fileExtensions.includes(ext)) {
          await processFile(itemPath);
        }
      }
    }
  };
  
  await scanDirectory(directoryPath);
  
  return {
    chunksProcessed: totalChunks,
    filesProcessed: processedFiles
  };
};

module.exports = {
  processDocument,
  processDirectory,
  processDirectoryWithUpload,
  processWebContent,
  uploadChunksToPinecone,
  chunkText,
  processPDF,
  processDOCX,
  processHTML,
  processText,
  processMarkdown
};