import { generateSitemapUrls } from '../lib/seo';

/**
 * Dynamic sitemap.xml generation
 * This creates a sitemap with all pages and their SEO priorities
 */
function SiteMap() {
  // This will be handled by Next.js getServerSideProps
  return null;
}

export async function getServerSideProps({ res }) {
  const baseUrl = 'https://kingdomdesignhouse.com';
  const urls = generateSitemapUrls();
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${urls.map(url => `  <url>
    <loc>${baseUrl}${url.url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  res.setHeader('Content-Type', 'text/xml');
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
