# KDH organic acquisition implementation

This is the local implementation of the user-approved Organic Lead Acquisition Strategy. Deployment, live CRM inquiries, production indexing, profile edits, social publishing, outreach, and scheduled monitoring are outside this change. No increase in leads or revenue has been measured or claimed.

Start with [verification and preview](verification.md), [requirements and sources](requirement-map.md), [evidence](evidence-ledger.md), [measurement](measurement.md), [90-day operating calendar](operating-calendar.md), and [knowledge refresh](knowledge-refresh.md). [CRM automation](crm-automation.draft.md) is an unpublished content draft with a staging acceptance gate.

The implementation extends `frontend/data/siteData.js`, the shared agency templates, and the existing Pages Router. The Vercel deployment model, Contact endpoint and email destinations, and Jarvis CRM ownership remain in place. There is one Jarvis provider in `_app.js`, with one mounted conversation and a native modal dialog. Homepage, floating, and contextual triggers use it.

Four new public routes are eligible in `frontend/data/site/publication.json`:

- `/locations/freeport-ny/`
- `/ai-group/solutions/ai-lead-assistant/`
- `/industries/healthcare-websites/`
- `/guides/custom-ai-assistant-vs-chatbot/`

`/ai-group/solutions/crm-automation/` has no route file and remains a 404. The sitemap contains 28 eligible routes. Drafts, redirects, and unpublished entries are excluded. No modification dates are invented.

Updated routes: `/`, `/web-group/`, `/ai-group/`, the five priority service pages, `/pricing/`, `/contact/`, `/case-studies/`, and the IIN, Northwell, David Dare MD, and DermCare portfolio entries. Shared breadcrumbs, inquiry buttons, footer links, structured data, and truthful business positioning also apply to existing pages.

All setup prices, monthly support prices, and network price ranges retain their original numbers. Web and AI essentials render in initial HTML on the hubs and pricing page. Six-month setup payments are described separately from recurring support, with the authoritative project total and rounding adjustment explained.

The user's existing About work and root Jest configuration were recorded in `preserved-work.json` before editing and verified unchanged. `prior-metadata-and-content.json` records the previous SEO configuration, shared content, Contact metadata, JSON-LD implementation, and IIN/Northwell copy for review. Historical unsupported claims in that snapshot are retained as audit evidence, not public content or approved Jarvis knowledge.

The technical search approach follows [Google's AI features guidance](https://developers.google.com/search/docs/appearance/ai-features): crawlable, useful text, clear internal links, and structured data matching visible information. Google specifies no special AI markup requirement. This does not guarantee crawling, indexing, or inclusion in AI answers.
