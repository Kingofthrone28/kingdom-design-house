// Offline export only: no API calls or index writes. Reuses approved site data.
import { readFile, writeFile } from 'node:fs/promises';
const source = await readFile(new URL('../data/siteData.js', import.meta.url), 'utf8');
const docs = [];
for (const match of source.matchAll(/siteData\.serviceContent\["([^"]+)"\]\.buyerGuide = (\{[\s\S]*?\n\});/g)) {
  const guide = JSON.parse(match[2]);
  docs.push({
    id: `${match[1]}-1`, title: guide.heading, category: match[1], tags: [match[1], 'approved-service-content'],
    content: [guide.problem, 'Deliverables:', ...guide.deliverables, 'Scope:', guide.boundaries, 'Pricing basis:', guide.pricingBasis, ...guide.faqs.map(pair => pair.join(' ')), ...guide.proof.map(item => `${item.label}: ${item.detail} https://kingdomdesignhouse.com${item.href}`)].join('\n'),
  });
}
const destinations = JSON.parse(source.match(/siteData\.destinations = (\{[\s\S]*?\n\});/)[1]);
for (const [key, page] of Object.entries(destinations)) docs.push({
  id: `destination-${key}`, title: page.title, category: 'website', tags: [key, 'approved-public-content'],
  content: [page.intro, ...page.sections.flatMap(section => [section.title, ...section.paragraphs]), ...page.faqs.map(pair => pair.join(' ')), ...page.proof.map(item => `${item.label}: ${item.detail}`), `https://kingdomdesignhouse.com${page.path}`].join('\n'),
});
const pricing = source.match(/  pricing: (\{[\s\S]*?\n  \}),\n\n  about:/)[1];
// Read only the existing numeric package facts without executing the content module.
for (const [group, block] of [...pricing.matchAll(/    (web|ai|network): \{([\s\S]*?)(?=\n    (?:web|ai|network):|\n  \}$)/g)].map(match => [match[1], match[2]])) {
  const plans = [...block.matchAll(/title: "([^"]+)"[\s\S]*?setupPrice: (\d+)[\s\S]*?monthlySupport: (\d+)/g)];
  const content = plans.map(match => {
    const [, name, setup, support] = match;
    const range = match[0].match(/priceRange: "([^"]+)"/)?.[1];
    const basis = range ? `${range} setup range` : `$${Number(setup).toLocaleString('en-US')} setup total`;
    return `${name}: ${basis}; $${Number(support).toLocaleString('en-US')}/month recurring support.`;
  }).join('\n');
  docs.push({ id: `pricing-${group}`, title: `${group} package pricing`, category: 'pricing', tags: ['pricing', group], content: content + '\nSix-month setup payment option: setup total split across six payments; rounding may require a final adjustment. Support is separate. Scope and third-party costs must be confirmed in the proposal. Network package ranges remain subject to the published pricing page.' });
}
docs.push({ id: 'company-approved', title: 'KDH positioning and evidence boundaries', category: 'company', tags: ['company', 'portfolio'], content: 'Kingdom Design House is based in Freeport, serving Long Island and NYC, with remote delivery. Services include websites, business applications, AI automation, and networking. Northwell is Paul Solomon’s professional employment experience, not a KDH agency engagement. IIN represents professional contributions; a KDH agency engagement is not verified. David Dare MD and DermCare are portfolio contributions; do not invent engagement details, outcomes, certifications, or compliance claims. No sales or lead growth percentage is verified. Contact: info@kingdomdesignhouse.com; 347.927.8846. Use Contact or Jarvis for business inquiries only; never solicit patient records or credentials.' });
if (docs.length !== 13) throw new Error(`Unexpected knowledge export count: ${docs.length}`);
await writeFile(new URL('../../rag-api/data/sample-documents.json', import.meta.url), `${JSON.stringify(docs, null, 2)}\n`);
console.log(`Exported ${docs.length} approved knowledge documents without contacting external services.`);
