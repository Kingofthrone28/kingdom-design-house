import publication from '../data/site/publication.json';
const eligible = new Set(publication.filter(page => page.published && page.indexable && !page.redirect).map(page => page.path));
const labels = { 'web-group': 'The Web Group', 'ai-group': 'The AI Group', 'network-group': 'The Network Group', 'support': 'Website Support', 'freeport-ny': 'Freeport, NY' };
export function buildBreadcrumbs(path = '/') {
  const segments = path.split(/[?#]/)[0].split('/').filter(Boolean);
  const crumbs = [{ name: 'Home', url: '/' }];
  segments.forEach((segment, index) => {
    const url = `/${segments.slice(0, index + 1).join('/')}/`;
    if (!eligible.has(url)) return;
    const name = labels[segment] || segment.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    crumbs.push({ name, url });
  });
  return crumbs;
}
