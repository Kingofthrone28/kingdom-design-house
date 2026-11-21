import { promises as fs } from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const publication = require('../data/site/publication.json');
const nextConfig = require('../next.config.js');
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://kingdomdesignhouse.com').replace(/\/+$/, '');
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const redirects = new Set((await nextConfig.redirects()).map(item => item.source));
const routes = [];
for (const page of publication) {
  if (!page.published || !page.indexable || page.redirect || redirects.has(page.path) || /[\[\]]/.test(page.path)) continue;
  const route = page.path === '/' ? 'index' : page.path.replace(/^\/|\/$/g, '');
  const candidates = [path.join(root, 'pages', `${route}.js`), path.join(root, 'pages', route, 'index.js')];
  let source;
  for (const candidate of candidates) {
    try { source = await fs.readFile(candidate, 'utf8'); break; } catch { /* try index */ }
  }
  if (!source) throw new Error(`Published page has no route: ${page.path}`);
  if (/noindex\s*(?:=\s*(?:\{\s*)?|:\s*)true/.test(source)) continue;
  routes.push(page.path);
}
const escapeXml = text => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
const entries = [...new Set(routes)].sort().map(route => `  <url><loc>${escapeXml(`${SITE_URL}${route}`)}</loc></url>`);
await fs.writeFile(path.join(root, 'public/sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join('\n')}\n</urlset>\n`);
console.log(`Generated sitemap with ${entries.length} eligible published routes.`);
