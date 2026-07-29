import { promises as fs } from 'node:fs';
import path from 'node:path';

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://kingdomdesignhouse.com').replace(/\/+$/, '');
const ROOT_DIR = process.cwd();
const PAGES_DIR = path.join(ROOT_DIR, 'pages');
const SITEMAP_PATH = path.join(ROOT_DIR, 'public', 'sitemap.xml');

const EXCLUDED_FILES = new Set([
  '_app.js',
  '_document.js',
  '_error.js',
  '404.js',
  '500.js'
]);

const PAGE_EXTENSIONS = new Set(['.js', '.jsx', '.ts', '.tsx']);

const toPosixPath = (filePath) => filePath.split(path.sep).join('/');

const toRoute = (relativeFilePath) => {
  const normalized = toPosixPath(relativeFilePath);
  const extension = path.extname(normalized);

  if (!PAGE_EXTENSIONS.has(extension)) {
    return null;
  }

  const fileName = path.basename(normalized);
  if (EXCLUDED_FILES.has(fileName)) {
    return null;
  }

  if (normalized.startsWith('api/')) {
    return null;
  }

  const routeWithoutExt = normalized.slice(0, -extension.length);
  const segments = routeWithoutExt.split('/');

  if (segments.some((segment) => segment.startsWith('[') && segment.endsWith(']'))) {
    return null;
  }

  if (segments[segments.length - 1] === 'index') {
    segments.pop();
  }

  if (segments.length === 0) {
    return '/';
  }

  return `/${segments.join('/')}/`;
};

const collectPageFiles = async (directoryPath) => {
  const entries = await fs.readdir(directoryPath, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const absolutePath = path.join(directoryPath, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'api') {
        continue;
      }
      files.push(...(await collectPageFiles(absolutePath)));
      continue;
    }

    files.push(absolutePath);
  }

  return files;
};

const main = async () => {
  const pageFiles = await collectPageFiles(PAGES_DIR);
  const routes = [...new Set(
    pageFiles
      .map((absoluteFilePath) => path.relative(PAGES_DIR, absoluteFilePath))
      .map(toRoute)
      .filter(Boolean)
  )]
    .sort();

  const urlsXml = routes
    .map((route) => {
      const loc = `${SITE_URL}${route === '/' ? '/' : route}`;
      return [
        '  <url>',
        `    <loc>${loc}</loc>`,
        '  </url>'
      ].join('\n');
    })
    .join('\n');

  const sitemapXml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    urlsXml,
    '</urlset>',
    ''
  ].join('\n');

  await fs.writeFile(SITEMAP_PATH, sitemapXml, 'utf8');
  console.log(`Generated sitemap with ${routes.length} routes at ${SITEMAP_PATH}`);
};

main().catch((error) => {
  console.error('Failed to generate sitemap:', error);
  process.exitCode = 1;
});
