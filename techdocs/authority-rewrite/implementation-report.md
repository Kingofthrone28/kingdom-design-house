# 11-page authority rewrite — implementation report

Implemented Sprint 1, then reviewed it before Sprint 2; implemented and reviewed Sprint 2 before Sprint 3. No deployment, live form submission, CRM test inquiry or external assistant-index upload was performed.

The implementation is complete in the working tree. Responsive screenshot and keyboard review remains unverified because Browser runtime discovery returned no available browser. This is an outstanding acceptance check, not a claimed visual pass.

## Discovery and decisions

See [discovery-and-decisions.md](discovery-and-decisions.md) for the pre-edit dependency map, current-section inventories, KEEP/REWRITE/DELETE/ADD decisions and sprint review gates. [before-content.json](before-content.json) preserves the effective original content, headlines, service cards and pricing for comparison. No applicable repository or ancestor AGENTS.md was found.

## Routes and section decisions

| Sprint | Route | KEEP | REWRITE / DELETE | ADD |
|---|---|---|---|---|
| 1 | /services/ | Hero/video, family cards, ten service URLs, Contact/Jarvis | Web/AI-first positioning and use cases; remove this route’s repeated ProcessSteps and WhyChooseUs | Capability map, Web/AI proof, Network example, scope/cost context, buyer FAQs and technology-review CTA |
| 1 | /ai-group/services/ai-consulting/ | Assessment/roadmap intent, AI visual identity/navigation | Replace buzzword/innovation/collaboration filler | Ten-area decision framework, non-AI option, four industry examples, consulting artifacts, build-vs-buy and MVP scope |
| 1 | /ai-group/services/ai-support/ | Monitoring, source/integration support intent, approved group pricing | Remove self-learning/model-decay/retraining conflation and automatic improvement claims | Twelve operating signals, seven update types, evaluation loop, failure cases and support exclusions |
| 1 | /network-group/services/network-support/ | Network style, monitoring, firmware/configuration and troubleshooting topics | Remove repeated reassurance and implied certainty | Supported devices/protocols, seven-step incident workflow, specific symptoms, coverage and third-party boundaries |
| 2 | /web-group/services/digital-marketing/ | Useful introduction, scope, non-guarantees, inquiry measurement, prices | Replace generic SEO process/performance claims; replace vague package label “Back linking” | Ten-stage SEO workflow, seven funnel definitions, GA4/GTM/Search Console responsibilities, fixed AI-prompt benchmark and explicit non-guarantees |
| 2 | /network-group/services/network-optimization/ | Throughput/stress tests, coverage, placement and channel-tuning topics | Remove flawless/universal performance and speed guarantees | Ten explained metrics, speed-test limitations, controlled baseline-to-retest workflow and reuse/replacement tradeoff |
| 2 | /network-group/services/network-design/ | VLANs, routing, switching, Wi-Fi, load balancing, redundancy/failover | Tighten long basic metaphors and unsupported uninterrupted-operation promises | Labeled architecture example, ten design questions, equipment reuse, failure domains, installation responsibilities |
| 3 | /web-group/services/web-design/ | Lower buyer guide, deliverables, scope/pricing, mobile/inquiry guidance, David Dare MD proof and FAQs | Replace generic discovery/research/design process and expertise filler | Current-site/conversion review, Search Console and CRM delivery checks, journey map and service-site checklist |
| 3 | /web-group/services/web-development/ | Workflow-first introduction, existing deliverables, CMS/auth/migration/API/license scope, IIN attribution and FAQs | Replace generic architecture/testing wording | Ten architecture questions, seven failure cases, rendering/data tradeoffs, idempotency/retries and ownership FAQ |
| 3 | /web-group/services/support/ | Access/dependency review, content/monitoring scope, prices, hours/emergency/hosting/license boundaries, DermCare attribution and FAQs | Replace always-on and generic reassurance wording | Eight-area operational table, change verification, backup/restore ownership, separate-project examples |
| 3 | /ai-group/services/ai-development/ | Approved sources, permissions, representative tests, incorrect-answer warning, retrieval limits, costs, Jarvis and IIN attribution | Replace generic product/testing/integration filler | Evaluation workflow, nine failure cases, explicit human handoff, escalation context, restricted decisions, redacted failure-log responsibilities |

Shared service sections keep the existing hero, facts strip, split introduction, expandable process rows, expertise image stage, delivery band, final CTA, animation hooks, typography and color tokens. The delivery band now asks service-specific scope questions. Repeated reassurance is suppressed when buyer guidance is available. Core copy was reviewed against the page’s distinct authority theme; no numerical SEO claim is made about a computed content-uniqueness percentage.

## Metadata and semantic headings

All eleven pages have unique titles, descriptions, explicit Open Graph titles/descriptions and existing relevant share images. Canonical URLs are unchanged. Page-specific Service/breadcrumb graphs and existing organization IDs are preserved; Services now supplies its own page name and description to the schema component. No review/rating or invented FAQ evidence was added.

Animated service H1s now contain a complete visually hidden sentence while visual characters remain aria-hidden. The parent no longer relies on aria-label alone; screen readers get one heading rather than duplicate text. The same repair applies to the shared guide layout, including existing guide/destination pages. The Services Hero already contained coherent text and retains it. Motion and reduced-motion behavior are retained.

| Route | H1 | Title | Share image |
|---|---|---|---|
| /services/ | WEB DEVELOPMENT & AI AUTOMATIONFOR LONG ISLAND BUSINESSES  | Web Development & AI Automation for Long Island Businesses \| Kingdom Design House | /images/iin_devices_new.png |
| /ai-group/services/ai-consulting/ | AI CONSULTING FOR LONG ISLAND & NYC BUSINESSES | AI Consulting: Decide What to Automate \| Long Island & NYC \| Kingdom Design House | /images/rocket.png |
| /ai-group/services/ai-support/ | AI ASSISTANT SUPPORT, EVALUATION & MONITORING FOR LONG ISLAND & NYC | AI Assistant Support, Evaluation & Monitoring \| KDH \| Kingdom Design House | /images/AI_data.png |
| /network-group/services/network-support/ | BUSINESS NETWORK SUPPORT FOR LONG ISLAND & NYC | Business Network Support \| Long Island & NYC \| Kingdom Design House | /images/maintenance.png |
| /web-group/services/digital-marketing/ | TECHNICAL SEO & ORGANIC GROWTH FOR LONG ISLAND BUSINESSES | Technical SEO, GEO & Lead Measurement \| Long Island \| Kingdom Design House | /images/seo.png |
| /network-group/services/network-optimization/ | BUSINESS WI-FI & NETWORK OPTIMIZATION FOR LONG ISLAND & NYC | Business Wi-Fi & Network Optimization \| Long Island & NYC \| Kingdom Design House | /images/discovery.png |
| /network-group/services/network-design/ | BUSINESS NETWORK DESIGN & INFRASTRUCTURE PLANNING FOR LONG ISLAND & NYC | Network Architecture & Office Infrastructure Planning \| KDH \| Kingdom Design House | /images/bg_cable.png |
| /web-group/services/web-design/ | WEBSITE DESIGN & REDESIGN FOR LONG ISLAND BUSINESSES | Website Design & Redesign for Long Island Businesses \| Kingdom Design House | /images/design.png |
| /web-group/services/web-development/ | CUSTOM WEB DEVELOPMENT FOR LONG ISLAND & NYC | Custom Web Development: Workflows & Integrations \| KDH \| Kingdom Design House | /images/iin_devices_new.png |
| /web-group/services/support/ | WEBSITE MAINTENANCE & SUPPORT FOR LONG ISLAND BUSINESSES | Website Maintenance: Checks, Scope & Monthly Prices \| KDH \| Kingdom Design House | /images/maintenance.png |
| /ai-group/services/ai-development/ | CUSTOM AI DEVELOPMENT FOR LONG ISLAND & NYC BUSINESSES | Custom AI Development: RAG, Evaluation & Handoff \| KDH \| Kingdom Design House | /images/Jarvis.png |

The exact resulting descriptions, Open Graph text, canonicals and H1s are recorded in [html-verification.json](html-verification.json).

## Contextual links and conversion

Every target service now links to a related service, relevant guide, proof or a clearly labeled planning artifact, and the existing contextual Contact/Jarvis CTA. All existing service URLs and case-study content remain available. New guides use the existing AcquisitionPage design, layout, schema and CTA helpers:

- `/guides/business-network-review/`: device inventory, segmentation example, incident records and baseline measurement.
- `/guides/search-and-lead-measurement/`: intent mapping, confirmed delivery, business-reviewed funnel and repeatable citation benchmarking.
- `/guides/web-project-planning/`: visitor journey, ownership, CMS/database decisions, failure handling and operating scope.

The three guides are registered in publication.json and the regenerated sitemap, so analytics normalization recognizes their source paths. They are local implementation additions, not deployed publications.

| Target | Related guidance / proof | Conversion label |
|---|---|---|
| /services/ | Explore Web Solutions (`/web-group/`); Explore AI Solutions (`/ai-group/`); Compare published package scope (`/pricing/`); Compare AI with a simpler workflow (`/guides/custom-ai-assistant-vs-chatbot/`); Web: IIN contribution overview (`/case-studies/iin/`); AI: Jarvis working demonstration (`/ai-group/solutions/ai-lead-assistant/`); Network: example planning artifact (`/guides/business-network-review/#network-example`) | Get a technology review |
| /ai-group/services/ai-consulting/ | See a Custom AI Development Example (`/ai-group/services/ai-development/`); Custom AI assistant vs chatbot (`/guides/custom-ai-assistant-vs-chatbot/`); Jarvis: the KDH working assistant (`/ai-group/solutions/ai-lead-assistant/`) | Get an AI Workflow Review |
| /ai-group/services/ai-support/ | AI development for new capabilities (`/ai-group/services/ai-development/`); Custom AI assistant vs chatbot (`/guides/custom-ai-assistant-vs-chatbot/`); Jarvis: the KDH working assistant (`/ai-group/solutions/ai-lead-assistant/`) | Review My Existing AI Assistant |
| /network-group/services/network-support/ | Network optimization for recurring performance issues (`/network-group/services/network-optimization/`); Business network review checklist (`/guides/business-network-review/`); Example network planning artifact (`/guides/business-network-review/#network-example`) | Review My Network Support Needs |
| /web-group/services/digital-marketing/ | Improve the landing-page journey (`/web-group/services/web-design/`); Search and lead measurement guide (`/guides/search-and-lead-measurement/`); KDH measurement planning example (`/guides/search-and-lead-measurement/`); Jarvis inquiry handoff example (`/ai-group/solutions/ai-lead-assistant/`) | Get an SEO & Lead Review |
| /network-group/services/network-optimization/ | Network design when tuning is insufficient (`/network-group/services/network-design/`); Business network review checklist (`/guides/business-network-review/`); Network baseline and change-record artifact (`/guides/business-network-review/`) | Review My Network Performance |
| /network-group/services/network-design/ | Network performance testing (`/network-group/services/network-optimization/`); Business network review checklist (`/guides/business-network-review/`); Example small-business architecture (`/guides/business-network-review/#network-example`) | Plan My Business Network |
| /web-group/services/web-design/ | Web development (`/web-group/services/web-development/`); Healthcare website guidance (`/industries/healthcare-websites/`); Website and application planning guide (`/guides/web-project-planning/`); David Dare MD portfolio (`/case-studies/daremd/`) | Get a Website Growth Review |
| /web-group/services/web-development/ | Web design (`/web-group/services/web-design/`); AI development (`/ai-group/services/ai-development/`); Website and application planning guide (`/guides/web-project-planning/`); IIN contribution overview (`/case-studies/iin/`) | Review My Web Application or Workflow |
| /web-group/services/support/ | Development for new features (`/web-group/services/web-development/`); Organic content and measurement (`/web-group/services/digital-marketing/`); Website and application planning guide (`/guides/web-project-planning/`); DermCare Management portfolio (`/case-studies/dermcare/`) | Review My Website Support Setup |
| /ai-group/services/ai-development/ | Try the lead assistant (`/ai-group/solutions/ai-lead-assistant/`); Custom assistant vs chatbot (`/guides/custom-ai-assistant-vs-chatbot/`); Production AI support and evaluation (`/ai-group/services/ai-support/`); Jarvis lead assistant (`/ai-group/solutions/ai-lead-assistant/`); IIN contribution overview (`/case-studies/iin/`) | Find an AI Workflow to Automate |

InquiryCTA still supplies allowlisted service/CTA/source context and retains the Contact fallback and Jarvis dialog. Analytics consent, delivered-lead confirmation, deduplication, SMTP and CRM code were not changed. No live inquiry was submitted during verification. Network pages now select Network package ranges/support rather than incorrectly falling back to Web pricing. All original setup amounts, monthly amounts and Network ranges remain unchanged.

## Claims intentionally omitted

- No new clients, testimonials, reviews, certifications, locations, rankings, guarantees or project results.
- No invented network deployment, measured before/after Wi-Fi gain, uptime result or performance guarantee. Network evidence is expressly an illustrative planning artifact.
- No SEO traffic, lead, revenue, citation or backlink-placement guarantee. The measurement artifact demonstrates a method, not a campaign result.
- No assertion that AI learns automatically, that knowledge refresh retrains model weights, or that monitoring guarantees accuracy.
- The four industry workflows are assessment examples, not customer deployments. Healthcare examples exclude autonomous clinical decisions.
- IIN remains professional contribution experience, not a verified KDH agency engagement. Existing David Dare MD and DermCare portfolio attribution is preserved. No new Northwell agency claim or customer metric was introduced.
- Jarvis remains a working demonstration, not evidence of revenue lift, guaranteed response time or a booked meeting.
- No artificial expert identity or unverified author credential was added.

## Verification

| Check | Result |
|---|---|
| Frontend `npm run lint` | Pass, no lint warnings/errors |
| Frontend `npm test -- --runInBand` | Pass: 8 suites, 72 tests |
| Root `npm test -- --runInBand` | Pass: 7 suites, 48 tests, including contact delivery, CRM synchronization, chat ownership and lead-flow integration |
| Frontend `npm run build` | Pass: production compilation, validity checks and 33 generated static pages |
| Separate typecheck | No typecheck script or tsconfig exists; JavaScript repository. Next build’s validity checks passed |
| Initial production HTML audit | Pass: all 11 targets, coherent single H1, unique title/description/OG, canonical, schema, published internal links and valid linked guide anchors |
| Approved prices / ranges | Unchanged; existing regression tests plus original/current data comparison passed |
| Unrelated content / navigation | Original/current comparison found no unrelated siteData changes; legacy network-it content and non-target headlines preserved |
| Offline knowledge export | Pass: 22 documents; all ten target services, seven destinations, three package groups, entity boundaries and Services overview; no remote writes |
| Responsive visual / keyboard review | Not verified: Browser runtime returned no available browsers |
| Deployment | Not performed |

The first build compiled but the sandbox blocked Next.js’s local IPC listener during page generation. The authorized rerun outside that restriction passed. Existing development warnings include Next 14/React’s fetchPriority warning, old browser-data notices and a root Jest package-name collision warning; these did not fail tests or the successful production build. Dependency upgrades were left outside this content rewrite.

Contact-server’s mail test and rag-api’s provider connection script were not invoked: they require live external services and are not offline regression checks. Root tests exercise the relevant submission contracts with local fixtures.

## Files changed

- `frontend/components/Hero.js`
- `frontend/components/Organisms/AcquisitionPage.js`
- `frontend/components/Organisms/AgencyServiceTemplate.js`
- `frontend/components/Organisms/ServicesSection.js`
- `frontend/components/PricingSummary.js`
- `frontend/components/ServiceDecisionContent.js`
- `frontend/components/VideoShowcase.js`
- `frontend/data/agencyServicePresentation.js`
- `frontend/data/site/publication.json`
- `frontend/data/siteData.js`
- `frontend/lib/seo.js`
- `frontend/pages/services.js`
- `frontend/public/sitemap.xml`
- `frontend/scripts/generate-jarvis-knowledge.mjs`
- `frontend/styles/AgencyServiceTemplate.module.scss`
- `rag-api/data/sample-documents.json`
- `frontend/__tests__/authority-rewrite.frontend.test.js`
- `frontend/data/authorityGuides.json`
- `frontend/data/servicesOverview.json`
- `frontend/pages/guides/business-network-review.js`
- `frontend/pages/guides/search-and-lead-measurement.js`
- `frontend/pages/guides/web-project-planning.js`
- `techdocs/authority-rewrite/before-content.json`
- `techdocs/authority-rewrite/discovery-and-decisions.md`
- `techdocs/authority-rewrite/html-verification.json`
- `techdocs/authority-rewrite/implementation-report.md`

The two pre-existing untracked specification documents were read/preserved and are not implementation changes. No package/lockfile, contact/CRM handler, case-study data, approved route wrapper or deployment configuration changed.

## Recommended follow-up

1. Complete desktop/mobile screenshots and keyboard review when a browser is connected, particularly longer animated headings, tables, focus states and CTA wrapping. This remains the final visual acceptance check.
2. Have the service owner confirm proposed review cadence, response hours and contract-specific inclusions in each actual proposal; the pages deliberately avoid uncontracted SLAs.
3. Add approved project screenshots or measured outcomes only when evidence and permission exist, especially for Network. Keep illustrative artifacts labeled until then.
4. After separate authorization, refresh the external Jarvis index using the reviewed local export and deploy through the normal release process. Neither was done here.
5. After release, compare a fixed Search Console period, delivered inquiries, business qualification and the same AI-prompt benchmark; do not infer performance from this copy change alone.
