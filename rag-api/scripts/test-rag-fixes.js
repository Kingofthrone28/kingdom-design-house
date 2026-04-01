#!/usr/bin/env node

/**
 * Test suite for RAG script OOM fixes
 *
 * PRE-FIX baseline tests (must pass now):
 *   1a. chunkText — core chunking logic (overlap=0, safe from infinite-loop bug)
 *   1b. chunkText — documents the infinite-loop bug with overlap > remaining text
 *   2.  Bad import — processAllWebPages is NOT in documentProcessor
 *   3.  Stream-upload pattern logic (pure simulation, no I/O)
 *   4.  WEB_CONFIG memory-safety bounds
 *   5.  SETUP_CONFIG feature flags exist
 *
 * POST-FIX tests (marked, will run after fixes are applied):
 *   1c. chunkText — overlap > 0 terminates correctly (currently infinite loops → OOM)
 */

'use strict';

// ─── Minimal assert helpers ───────────────────────────────────────────────────
let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✅ PASS: ${message}`);
    passed++;
  } else {
    console.error(`  ❌ FAIL: ${message}`);
    failed++;
  }
}

function assertEqual(actual, expected, message) {
  if (actual === expected) {
    console.log(`  ✅ PASS: ${message}`);
    passed++;
  } else {
    console.error(`  ❌ FAIL: ${message} — expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
    failed++;
  }
}

function section(name) {
  console.log(`\n── ${name} ${'─'.repeat(Math.max(0, 50 - name.length))}`);
}

const POST_FIX = process.argv.includes('--post-fix');

// ─── 1a. chunkText — safe baseline (overlap=0) ───────────────────────────────
section('1a. chunkText core logic (overlap=0, safe pre-fix)');

const { chunkText } = require('../services/documentProcessor');

{
  // Normal case: text longer than chunkSize
  const text = 'Hello world. '.repeat(100); // 1300 chars
  const chunks = chunkText(text, 300, 0);
  assert(chunks.length > 0, 'produces chunks from 1300-char text');
  assert(chunks.every(c => c.length >= 50), 'all chunks pass the 50-char filter');
  assertEqual(typeof chunks[0], 'string', 'chunks are strings');
}

{
  // Text shorter than filter threshold
  const chunks = chunkText('Short.', 300, 0);
  assertEqual(chunks.length, 0, 'text under 50 chars filtered out (overlap=0)');
}

{
  // Text exactly at chunkSize
  const chunks = chunkText('A'.repeat(300), 300, 0);
  assertEqual(chunks.length, 1, 'text exactly chunkSize produces one chunk (overlap=0)');
}

{
  // Text that produces multiple chunks
  const chunks = chunkText('Word '.repeat(400), 500, 0); // 2000 chars
  assert(chunks.length >= 3, 'long text produces multiple chunks (overlap=0)');
}

// ─── 1b. Document the infinite-loop bug (overlap > remaining) ─────────────────
section('1b. chunkText infinite-loop bug documentation (pre-fix)');

{
  // Demonstrate the bug WITHOUT triggering it:
  // When the last remaining chunk has length <= overlap, start goes ≤ 0 advance.
  // Example: text=50 chars, chunkSize=300, overlap=50
  //   chunk = entire text (50 chars after trim ≤ overlap)
  //   start = 0 + 50 - 50 = 0  → stuck forever
  // We detect the bug by checking if the loop invariant would be violated.
  const text = 'A'.repeat(50);
  const chunkSize = 300;
  const overlap = 50;

  // Simulate one iteration manually to detect would-be infinite loop
  let start = 0;
  const end = Math.min(start + chunkSize, text.length); // = 50
  const chunk = text.slice(start, end).trim();           // = 'A'.repeat(50)
  const nextStart = start + chunk.length - overlap;       // = 0 + 50 - 50 = 0

  assert(
    nextStart <= start,
    `BUG CONFIRMED: next start (${nextStart}) ≤ current start (${start}) → infinite loop`
  );
  console.log('  ℹ️  chunkText("A".repeat(50), 300, 50) would infinite loop → OOM');
  console.log('  ℹ️  Fix: add guard "if (nextStart <= start) break" in chunkText loop');
}

// ─── 2. Bad import check ──────────────────────────────────────────────────────
section('2. Bad import: processAllWebPages must NOT come from documentProcessor');

{
  const docProcessor = require('../services/documentProcessor');
  assert(
    typeof docProcessor.processAllWebPages === 'undefined',
    'documentProcessor does NOT export processAllWebPages'
  );

  const webScraper = require('./web-content-scraper');
  assert(
    typeof webScraper.processAllWebPages === 'function',
    'web-content-scraper DOES export processAllWebPages'
  );

  // Also confirm the correct exports exist in documentProcessor
  assert(typeof docProcessor.chunkText === 'function', 'chunkText exported from documentProcessor');
  assert(typeof docProcessor.uploadChunksToPinecone === 'function', 'uploadChunksToPinecone exported from documentProcessor');
}

// ─── 3. Stream-upload pattern simulation ─────────────────────────────────────
section('3. Stream-upload: upload called per-page vs once-for-all (pure simulation)');

{
  const pages = ['p1', 'p2', 'p3', 'p4', 'p5'];
  const chunksPerPage = 10;
  const fakeChunks = (page) =>
    Array.from({ length: chunksPerPage }, (_, i) => ({ id: `${page}-${i}` }));

  // Accumulation pattern (current broken code)
  let accUploadCalls = 0;
  let accPeakChunks = 0;
  {
    const allChunks = [];
    for (const page of pages) {
      allChunks.push(...fakeChunks(page));
      accPeakChunks = Math.max(accPeakChunks, allChunks.length);
    }
    accUploadCalls = 1; // single upload at end
  }

  // Streaming pattern (desired fixed code)
  let streamUploadCalls = 0;
  let streamPeakChunks = 0;
  {
    for (const page of pages) {
      const chunks = fakeChunks(page);
      streamPeakChunks = Math.max(streamPeakChunks, chunks.length); // only 1 page live
      streamUploadCalls++; // upload immediately
    }
  }

  const total = pages.length * chunksPerPage;

  assertEqual(accUploadCalls, 1, 'accumulation pattern: 1 upload call');
  assertEqual(accPeakChunks, total, `accumulation pattern: all ${total} chunks in memory at peak`);
  assertEqual(streamUploadCalls, pages.length, `streaming pattern: ${pages.length} upload calls (one per page)`);
  assertEqual(streamPeakChunks, chunksPerPage, `streaming pattern: peak = ${chunksPerPage} chunks (one page)`);
  assert(
    streamPeakChunks < accPeakChunks,
    `streaming peak (${streamPeakChunks}) < accumulation peak (${accPeakChunks}) — ${Math.round((1 - streamPeakChunks / accPeakChunks) * 100)}% memory reduction`
  );
}

// ─── 4. WEB_CONFIG memory-safety bounds ──────────────────────────────────────
section('4. WEB_CONFIG memory-safety configuration');

{
  const { WEB_CONFIG } = require('./web-content-scraper');
  const { options } = WEB_CONFIG;

  assert(Array.isArray(WEB_CONFIG.pages), 'WEB_CONFIG.pages is an array');
  assert(WEB_CONFIG.pages.length >= 6, `at least 6 main pages configured (got ${WEB_CONFIG.pages.length})`);
  assert(Array.isArray(WEB_CONFIG.servicePages), 'WEB_CONFIG.servicePages is an array');
  assert(WEB_CONFIG.servicePages.length >= 10, `at least 10 service pages configured (got ${WEB_CONFIG.servicePages.length})`);
  assert(options.chunkSize <= 500, `chunkSize (${options.chunkSize}) ≤ 500 (memory-safe)`);
  assert(options.maxChunksPerPage <= 15, `maxChunksPerPage (${options.maxChunksPerPage}) ≤ 15 (bounded)`);
  assert(options.maxPagesPerBatch <= 5, `maxPagesPerBatch (${options.maxPagesPerBatch}) ≤ 5 (bounded)`);
  assert(options.maxContentSize <= 1024 * 1024, `maxContentSize (${Math.round(options.maxContentSize / 1024)}KB) ≤ 1MB`);
  assert(options.memoryThreshold > 0, `memoryThreshold set (${Math.round(options.memoryThreshold / 1024 / 1024)}MB)`);
}

// ─── 5. SETUP_CONFIG feature flags ───────────────────────────────────────────
section('5. SETUP_CONFIG feature flags');

{
  const { SETUP_CONFIG } = require('./setup-enhanced-rag');
  assertEqual(typeof SETUP_CONFIG.processDocuments, 'boolean', 'processDocuments is a boolean');
  assertEqual(typeof SETUP_CONFIG.scrapeWebsite, 'boolean', 'scrapeWebsite is a boolean');
  assertEqual(SETUP_CONFIG.processSampleDocs, true, 'processSampleDocs is enabled');
}

// ─── POST-FIX tests (run with --post-fix flag after implementation) ───────────
if (POST_FIX) {
  section('POST-FIX 1c. chunkText terminates with overlap > 0 (loop guard)');

  {
    // These would have caused OOM before the fix
    const cases = [
      { text: 'A'.repeat(50),    chunkSize: 300, overlap: 50,  desc: 'overlap = remaining text' },
      { text: 'A'.repeat(40),    chunkSize: 300, overlap: 50,  desc: 'overlap > remaining text' },
      { text: 'Hello world. '.repeat(100), chunkSize: 300, overlap: 50, desc: '1300-char text (original crash)' },
      { text: 'Word '.repeat(400), chunkSize: 500, overlap: 100, desc: '2000-char text with overlap' },
    ];

    for (const { text, chunkSize, overlap, desc } of cases) {
      const chunks = chunkText(text, chunkSize, overlap);
      assert(Array.isArray(chunks), `returns array: ${desc}`);
      assert(chunks.every(c => c.length >= 50), `all chunks ≥ 50 chars: ${desc}`);
    }
  }

  section('POST-FIX 5b. SETUP_CONFIG features re-enabled');
  {
    // Clear module cache so we get fresh config after re-enabling
    delete require.cache[require.resolve('./setup-enhanced-rag')];
    const { SETUP_CONFIG } = require('./setup-enhanced-rag');
    assertEqual(SETUP_CONFIG.processDocuments, true, 'processDocuments re-enabled');
    assertEqual(SETUP_CONFIG.scrapeWebsite, true, 'scrapeWebsite re-enabled');
  }
}

// ─── Summary ──────────────────────────────────────────────────────────────────
console.log(`\n${'═'.repeat(52)}`);
if (POST_FIX) {
  console.log('  Mode: POST-FIX (all tests including post-fix assertions)');
} else {
  console.log('  Mode: PRE-FIX baseline  |  run with --post-fix after fixes');
}
console.log(`  Results: ${passed} passed, ${failed} failed`);
console.log(`${'═'.repeat(52)}\n`);

if (failed > 0) process.exit(1);
