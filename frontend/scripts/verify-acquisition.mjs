// Offline inspection of production HTML; never submits a form, chat, or CRM inquiry.
import { readFile, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const publication = JSON.parse(await readFile(path.join(root, 'data/site/publication.json'), 'utf8'));
const eligible = publication.filter(page => page.published && page.indexable && !page.redirect).map(page => page.path);
const failures = [];
const checks = [];
const preExistingFindings = [];
const origin = 'https://kingdomdesignhouse.com';
const attrs = tag => Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map(match => [match[1], match[2]]));
const decode = value => value.replace(/&amp;/g, '&').replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"');
const verify = (condition, message) => { if (!condition) failures.push(message); };
for (const route of eligible) {
  const file = path.join(root, '.next/server/pages', route === '/' ? 'index.html' : `${route.slice(1, -1)}.html`);
  const html = await readFile(file, 'utf8');
  const metadata = [...html.matchAll(/<meta\b[^>]*>/g)].map(match => attrs(match[0]));
  const canonicals = [...html.matchAll(/<link\b[^>]*>/g)].map(match => attrs(match[0])).filter(item => item.rel === 'canonical');
  verify(canonicals.length === 1 && canonicals[0].href === `${origin}${route}`, `${route}: canonical mismatch`);
  verify(metadata.some(meta => meta.name === 'description' && meta.content), `${route}: no description`);
  verify(!metadata.some(meta => meta.name === 'robots' && meta.content.includes('noindex')), `${route}: public page has noindex`);
  const titles = [...html.matchAll(/<title>([\s\S]*?)<\/title>/g)];
  verify(titles.length === 1 && titles[0][1].includes('Kingdom Design House'), `${route}: title identity mismatch`);
  const h1Count = [...html.matchAll(/<h1\b/g)].length;
  if (route === '/about/' && h1Count === 2) preExistingFindings.push('/about/: two existing H1 headings preserved with the user-owned About work.');
  else verify(h1Count === 1, `${route}: expected one H1`);
  const graphs = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(match => JSON.parse(match[1]));
  verify(graphs.length === 1, `${route}: expected one structured-data graph`);
  for (const graph of graphs) {
    verify(graph['@graph']?.some(item => item['@id'] === `${origin}/#organization`), `${route}: missing shared entity`);
    verify(!JSON.stringify(graph).match(/numberOfEmployees|GeoCoordinates|openingHoursSpecification|98%|300%/), `${route}: unsupported structured details`);
  }
  for (const match of html.matchAll(/<a\b[^>]*href="([^"]*)"[^>]*>/g)) {
    const href = decode(match[1]);
    if (!href.startsWith('/') || href.startsWith('//') || href.startsWith('/_next/')) continue;
    const target = href.split(/[?#]/)[0] || '/';
    if (/\.[a-z0-9]+$/i.test(target)) {
      try { await stat(path.join(root, 'public', target)); } catch { failures.push(`${route}: missing asset link ${target}`); }
    } else {
      verify(eligible.includes(target), `${route}: ineligible internal link ${target}`);
    }
  }
  checks.push({ route, title: decode(titles[0]?.[1] || ''), canonical: canonicals[0]?.href, structuredGraphs: graphs.length });
}
for (const route of ['/web-group/', '/ai-group/', '/pricing/']) {
  const html = await readFile(path.join(root, '.next/server/pages', `${route.slice(1, -1)}.html`), 'utf8');
  const prices = route === '/web-group/' ? ['$2,500', '$3,800', '$5,500', '$150', '$250', '$500'] : route === '/ai-group/' ? ['$4,000', '$6,000', '$8,000', '$300', '$500', '$800'] : ['$2,500', '$5,500', '$4,000', '$8,000', '$150', '$800'];
  prices.forEach(price => verify(html.includes(price), `${route}: missing price in initial HTML: ${price}`));
}
for (const route of ['/web-group/services/web-development/', '/web-group/services/web-design/', '/web-group/services/digital-marketing/', '/web-group/services/support/', '/ai-group/services/ai-development/']) {
  const html = await readFile(path.join(root, '.next/server/pages', `${route.slice(1, -1)}.html`), 'utf8');
  verify(html.includes('Scope and responsibilities') && html.includes('Questions before you start'), `${route}: missing buyer guidance in initial HTML`);
  verify([...html.matchAll(/<details\b/g)].length >= 4, `${route}: missing FAQs`);
  verify(!/300%|Award-Winning|Your #1|98%/.test(html), `${route}: unsupported claim`);
  const graph = JSON.parse([...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)][0][1]);
  verify(graph['@graph'].some(item => item['@id'] === `${origin}${route}#service`), `${route}: missing page Service`);
}
const sitemap = await readFile(path.join(root, 'public/sitemap.xml'), 'utf8');
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1]);
verify(JSON.stringify(sitemapUrls.sort()) === JSON.stringify(eligible.map(route => `${origin}${route}`).sort()), 'Sitemap differs from eligible publication');
verify(!/<(?:lastmod|priority|changefreq)>/.test(sitemap), 'Sitemap has unsupported date or priority metadata');
const result = { eligibleRoutes: eligible.length, failures, preExistingFindings, checks, browserPreview: 'Pending: no browser backend was available. No visual or keyboard verification is claimed.' };
await writeFile(path.join(root, '../techdocs/organic-acquisition/html-verification.json'), `${JSON.stringify(result, null, 2)}\n`);
if (failures.length) { console.error(failures.join('\n')); process.exitCode = 1; }
else console.log(`Verified ${eligible.length} production HTML pages: metadata, JSON-LD, initial pricing, buyer guidance, internal links, and sitemap eligibility.`);
