# Authority rewrite: discovery and section decisions

Discovery completed before implementation. No AGENTS.md exists in this repository (including hidden directories) or its ancestor directories. Existing untracked specification files are user inputs and are preserved.

## Requirement-to-implementation map

| Responsibility | Actual implementation | Planned treatment |
|---|---|---|
| Ten service routes | frontend/pages/{ai,web,network}-group/services/*.js | Keep route wrappers and URLs; AgencyServicePage supplies content, SEO and schema |
| Services directory | frontend/pages/services.js | Keep Hero, GroupHeading, service cards, video; remove duplicate ProcessSteps / WhyChooseUs; add capability and decision content |
| Service content, headlines, buyer guidance | frontend/data/siteData.js | Consolidate current overrides into serviceContent; preserve strong buyerGuide fields; rewrite service-specific approach/expertise; add tables, workflows and boundaries |
| Shared layout and animation | AgencyServiceTemplate.js, AgencyAnimatedTitle.js, useSectionMotion.js, AgencyServiceTemplate.module.scss | Keep typography, section rhythm, images and motion; coherent hidden H1 text, visual characters aria-hidden |
| Buyer guidance, pricing and CTA | ServiceDecisionContent.js, PricingSummary.js, InquiryCTA.js, Acquisition.module.scss | Extend existing UI for unique authority sections; fix Network group pricing (currently falls back to Web); preserve approved amounts and ranges |
| Metadata | frontend/lib/seo.js, SEOHead.js, utils/url.js | Unique intent titles/descriptions and OG for all 11; retain trailing-slash canonicals; use existing service imagery |
| Schema | StructuredData.js, lib/structuredData.js | Keep legitimate graph/entity IDs, service and breadcrumbs; pass Services page title/description; no fabricated reviews/FAQ ratings |
| Proof | data/caseStudies/*, caseStudies/summaries.js, EditorialCaseStudy*, ai-group/solutions/ai-lead-assistant.js | Preserve portfolio attribution and Jarvis boundaries; Network uses a labeled example artifact, never invented deployment proof |
| Contextual links and guidance | buyerGuide.related, pages/guides/custom-ai-assistant-vs-chatbot.js, pages/industries/healthcare-websites.js | Keep existing links; add useful web-project, network-review and search-measurement guides through AcquisitionPage and destinations |
| Lead flows and analytics | InquiryCTA.js, ContactForm.js, JarvisContext.js, utils/acquisition.js, utils/analytics.js, server/leadService.js | Reuse contextual CTA helper and allowlisted service/CTA IDs; no API or conversion-contract changes |
| Guide publication | data/site/publication.json, scripts/generate-sitemap.mjs | Register added guides, regenerate sitemap; preserve all existing published URLs |
| Assistant knowledge | scripts/generate-jarvis-knowledge.mjs, rag-api/data/sample-documents.json | Adapt offline exporter to consolidated content and added guides; no external index write |
| Validation | frontend/package.json, root package.json, Jest configs | npm run lint, npm test (frontend and root), npm run build; no typecheck script or tsconfig exists (JavaScript repository); browser desktop/mobile review |

## Shared section policy

KEEP Hero, facts, intro split layout, expandable approach, expertise/image stage, delivery band, final CTA styling and motion. REWRITE intro, process rows, expertise descriptions and final CTA to each service. DELETE duplicate reassurance block and generic expertise intro; use delivery band for page-specific decision questions instead of a second generic process. ADD service-specific tables/workflows/examples in existing buyer-guidance UI. No case-study data, approved prices, fonts, colors, animation hooks or lead endpoints will be redesigned.

## Sprint 1 — /services/

Current H1: OUR TECHNOLOGY SERVICES IN LONG ISLAND & NYC. Sections: Hero; GroupHeading; ServicesSection (AI/ Web/Network cards); VideoShowcase; ProcessSteps; WhyChooseUs. No per-page FAQ or pricing table. Existing links: ten service cards, /case-studies/, Contact and Jarvis. Schema: site graph via StructuredData; page SEO from pageSeoData.services.

KEEP video, three families, all ten service links, Hero and CTA placement. REWRITE positioning to Web platforms and AI workflows first; Network secondary. DELETE repeated generic ProcessSteps and WhyChooseUs from this route only. ADD concrete Web/AI/Network scenarios, IIN/Jarvis proof, a labeled Network planning artifact, technology-review CTA, cost drivers, scope and buyer FAQs.

## Sprint 1 — ai-consulting

Route: frontend/pages/ai-group/services/ai-consulting.js. Current H1: AI CONSULTING SERVICES FOR NYC BUSINESSES.

Current sections and decisions:

- KEEP hero/facts and existing imagery; REWRITE H1 only where intent or geography needs clarification.
- REWRITE generic introduction into a direct service answer.
- REWRITE approach: Strategic Assessment; Building an AI Roadmap; Collaborative Guidance. Preserve technical topics, replace generic descriptions with inputs, decisions and acceptance checks.
- REWRITE expertise: Strategic Assessment - In-depth review of workflows, data, and technology stack; AI Roadmap Development - Step-by-step implementation planning with clear metrics; Collaborative Guidance - Partnership approach with training and support; Practical AI Applications - Focus on real-world business solutions.
- DELETE repeated shared reassurance and generic expertise filler; REWRITE shared delivery band into unique buyer questions.
- ADD buyer guide with deliverables, scope, pricing context, proof artifact and buyer FAQs.

Existing proof: None on this route.

Existing pricing: No page-specific pricing; retain published group prices and qualify service scope.

Existing FAQs: None.

Current CTA: Discuss your project; Contact fallback + Jarvis via InquiryCTA. Links: No contextual guide links.

Structured data: page-specific Service, WebPage, Organization, LocalBusiness and BreadcrumbList through AgencyServicePage. Metadata: serviceSeoData via presentation.seoKey; canonical remains unchanged.

## Sprint 1 — ai-support

Route: frontend/pages/ai-group/services/ai-support.js. Current H1: ONGOING AI SUPPORT & OPTIMIZATION IN NEW YORK.

Current sections and decisions:

- KEEP hero/facts and existing imagery; REWRITE H1 only where intent or geography needs clarification.
- REWRITE generic introduction into a direct service answer.
- REWRITE approach: Continuous Monitoring & Fine-Tuning; Updating With New Data; Advisory & Feature Expansion. Preserve technical topics, replace generic descriptions with inputs, decisions and acceptance checks.
- REWRITE expertise: Continuous Monitoring - Track performance and prevent model decay; Data Updates - Keep AI current with latest business information; Feature Expansion - Advisory services for growing AI capabilities; Future-Proof Systems - AI that stays sharp, relevant, and ahead of the curve.
- DELETE repeated shared reassurance and generic expertise filler; REWRITE shared delivery band into unique buyer questions.
- ADD buyer guide with deliverables, scope, pricing context, proof artifact and buyer FAQs.

Existing proof: None on this route.

Existing pricing: No page-specific pricing; retain published group prices and qualify service scope.

Existing FAQs: None.

Current CTA: Discuss your project; Contact fallback + Jarvis via InquiryCTA. Links: No contextual guide links.

Structured data: page-specific Service, WebPage, Organization, LocalBusiness and BreadcrumbList through AgencyServicePage. Metadata: serviceSeoData via presentation.seoKey; canonical remains unchanged.

## Sprint 1 — network-support

Route: frontend/pages/network-group/services/network-support.js. Current H1: MANAGED NETWORK SUPPORT FOR NYC BUSINESSES.

Current sections and decisions:

- KEEP hero/facts and existing imagery; REWRITE H1 only where intent or geography needs clarification.
- REWRITE generic introduction into a direct service answer.
- REWRITE approach: Proactive Support That Prevents Problems; Routine Updates & System Care; Responsive Troubleshooting When You Need It; A Long-Term Partnership. Preserve technical topics, replace generic descriptions with inputs, decisions and acceptance checks.
- REWRITE expertise: Proactive Support - Monitoring and prevention before problems occur; Routine Updates & System Care - Regular maintenance and optimization; Responsive Troubleshooting - Quick diagnosis and resolution of issues; Long-Term Partnership - Growing with your business needs.
- DELETE repeated shared reassurance and generic expertise filler; REWRITE shared delivery band into unique buyer questions.
- ADD buyer guide with deliverables, scope, pricing context, proof artifact and buyer FAQs.

Existing proof: None on this route.

Existing pricing: No page-specific pricing; retain published group prices and qualify service scope.

Existing FAQs: None.

Current CTA: Discuss your project; Contact fallback + Jarvis via InquiryCTA. Links: No contextual guide links.

Structured data: page-specific Service, WebPage, Organization, LocalBusiness and BreadcrumbList through AgencyServicePage. Metadata: serviceSeoData via presentation.seoKey; canonical remains unchanged.

## Sprint 2 — digital-marketing

Route: frontend/pages/web-group/services/digital-marketing.js. Current H1: DIGITAL MARKETING & SEO SERVICES IN LONG ISLAND & NYC.

Current sections and decisions:

- KEEP hero/facts and existing imagery; REWRITE H1 only where intent or geography needs clarification.
- KEEP concrete introduction and strong buyer guidance; refine wording only.
- REWRITE approach: Site Architecture & Crawlability; Page Speed & Performance; Mobile Optimization; On-Page Technical Elements; Indexing & Error Resolution. Preserve technical topics, replace generic descriptions with inputs, decisions and acceptance checks.
- REWRITE expertise: Technical SEO - Site architecture, performance, and technical optimization; Content Strategy - Aligning messaging with target keywords for organic traffic; Analytics & Reporting - Tracking performance and measuring success; Continuous Optimization - Adapting strategies as search algorithms evolve.
- DELETE repeated shared reassurance and generic expertise filler; REWRITE shared delivery band into unique buyer questions.
- KEEP existing deliverables, scope, pricing context, proof and FAQs; ADD missing authority detail.

Existing proof: Assistant comparison guide (/guides/custom-ai-assistant-vs-chatbot/): Useful buyer education connected to a relevant service and inquiry path.

Existing pricing: SEO setup is part of the relevant published Web package scope. Ongoing marketing work depends on the audit, pages, content production, and reporting cadence; a support price is not an unlimited marketing retainer.

Existing FAQs: Do you guarantee a first-page ranking?; How do you measure success?; Can you optimize for AI search?; Do I need paid ads?; When should we review progress?

Current CTA: Discuss your organic acquisition goals; Contact fallback + Jarvis via InquiryCTA. Links: /web-group/services/support/, /locations/freeport-ny/

Structured data: page-specific Service, WebPage, Organization, LocalBusiness and BreadcrumbList through AgencyServicePage. Metadata: serviceSeoData via presentation.seoKey; canonical remains unchanged.

## Sprint 2 — network-optimization

Route: frontend/pages/network-group/services/network-optimization.js. Current H1: WIRELESS INFRASTRUCTURE OPTIMIZATION FOR NYC OFFICES.

Current sections and decisions:

- KEEP hero/facts and existing imagery; REWRITE H1 only where intent or geography needs clarification.
- REWRITE generic introduction into a direct service answer.
- REWRITE approach: Real-World Performance Testing; Coverage & Signal Verification; Bandwidth & Load Optimization; Continuous Improvement. Preserve technical topics, replace generic descriptions with inputs, decisions and acceptance checks.
- REWRITE expertise: Real-World Performance Testing - Comprehensive stress testing and benchmarking; Coverage & Signal Verification - Eliminating dead zones and weak spots; Bandwidth & Load Optimization - Efficient distribution and prioritization; Continuous Improvement - Ongoing monitoring and proactive adjustments.
- DELETE repeated shared reassurance and generic expertise filler; REWRITE shared delivery band into unique buyer questions.
- ADD buyer guide with deliverables, scope, pricing context, proof artifact and buyer FAQs.

Existing proof: None on this route.

Existing pricing: No page-specific pricing; retain published group prices and qualify service scope.

Existing FAQs: None.

Current CTA: Discuss your project; Contact fallback + Jarvis via InquiryCTA. Links: No contextual guide links.

Structured data: page-specific Service, WebPage, Organization, LocalBusiness and BreadcrumbList through AgencyServicePage. Metadata: serviceSeoData via presentation.seoKey; canonical remains unchanged.

## Sprint 2 — network-design

Route: frontend/pages/network-group/services/network-design.js. Current H1: NETWORK DESIGN & IMPLEMENTATION IN LONG ISLAND NY.

Current sections and decisions:

- KEEP hero/facts and existing imagery; REWRITE H1 only where intent or geography needs clarification.
- REWRITE generic introduction into a direct service answer.
- REWRITE approach: Router & Switch Configuration; WiFi Design & Optimization; Network Load Balancing; Redundancy & Uptime Assurance. Preserve technical topics, replace generic descriptions with inputs, decisions and acceptance checks.
- REWRITE expertise: Router & Switch Configuration - Custom setups for optimal performance; WiFi Design & Optimization - Seamless coverage and roaming; Network Load Balancing - Intelligent traffic distribution; Redundancy & Uptime Assurance - Business continuity planning.
- DELETE repeated shared reassurance and generic expertise filler; REWRITE shared delivery band into unique buyer questions.
- ADD buyer guide with deliverables, scope, pricing context, proof artifact and buyer FAQs.

Existing proof: None on this route.

Existing pricing: No page-specific pricing; retain published group prices and qualify service scope.

Existing FAQs: None.

Current CTA: Discuss your project; Contact fallback + Jarvis via InquiryCTA. Links: No contextual guide links.

Structured data: page-specific Service, WebPage, Organization, LocalBusiness and BreadcrumbList through AgencyServicePage. Metadata: serviceSeoData via presentation.seoKey; canonical remains unchanged.

## Sprint 3 — web-design

Route: frontend/pages/web-group/services/web-design.js. Current H1: WEB DESIGN SERVICES FOR LONG ISLAND & NYC.

Current sections and decisions:

- KEEP hero/facts and existing imagery; REWRITE H1 only where intent or geography needs clarification.
- KEEP concrete introduction and strong buyer guidance; refine wording only.
- REWRITE approach: Discovery; Research & Insight; UX & Structure; Content Alignment; Design Execution. Preserve technical topics, replace generic descriptions with inputs, decisions and acceptance checks.
- REWRITE expertise: UX/UI Design - Intuitive and user-first experiences; Creative Direction - Visual storytelling that fits your brand; Mobile-Responsive Development - Optimized for every device.
- DELETE repeated shared reassurance and generic expertise filler; REWRITE shared delivery band into unique buyer questions.
- KEEP existing deliverables, scope, pricing context, proof and FAQs; ADD missing authority detail.

Existing proof: David Dare MD portfolio (/case-studies/daremd/): Treatment information hierarchy and appointment pathways; contribution details are described in the portfolio.

Existing pricing: Web package totals below cover the published package scope. A design-only engagement or larger redesign is quoted by templates, content needs, implementation work, and review rounds.

Existing FAQs: Can you redesign without replacing everything?; Is development included?; Can you help organize our content?; Will the design work on phones?; Does a redesign guarantee more inquiries?

Current CTA: Plan your website redesign; Contact fallback + Jarvis via InquiryCTA. Links: /web-group/services/web-development/, /industries/healthcare-websites/

Structured data: page-specific Service, WebPage, Organization, LocalBusiness and BreadcrumbList through AgencyServicePage. Metadata: serviceSeoData via presentation.seoKey; canonical remains unchanged.

## Sprint 3 — web-development

Route: frontend/pages/web-group/services/web-development.js. Current H1: CUSTOM WEB DEVELOPMENT FOR LONG ISLAND & NYC.

Current sections and decisions:

- KEEP hero/facts and existing imagery; REWRITE H1 only where intent or geography needs clarification.
- KEEP concrete introduction and strong buyer guidance; refine wording only.
- REWRITE approach: Technical Planning; Architecture Design; Development & Testing. Preserve technical topics, replace generic descriptions with inputs, decisions and acceptance checks.
- REWRITE expertise: Front-end Development - React, Next.js, Vue.js; Back-end Development - Node.js, Python, PHP; Database Design - MySQL, PostgreSQL, MongoDB.
- DELETE repeated shared reassurance and generic expertise filler; REWRITE shared delivery band into unique buyer questions.
- KEEP existing deliverables, scope, pricing context, proof and FAQs; ADD missing authority detail.

Existing proof: IIN contribution overview (/case-studies/iin/): Professional engineering contributions to enrollment workflows; not presented as a verified KDH agency engagement.

Existing pricing: Published Web packages provide a starting point for websites. Application pricing depends on roles, workflows, data, integrations, and testing requirements. Confirm what is included in a written proposal.

Existing FAQs: Can you build a business application instead of a marketing site?; Can we keep our existing CMS?; How long will development take?; Will the site generate leads automatically?; Do you work outside Long Island?

Current CTA: Discuss your website or business app; Contact fallback + Jarvis via InquiryCTA. Links: /web-group/services/web-design/, /ai-group/services/ai-development/

Structured data: page-specific Service, WebPage, Organization, LocalBusiness and BreadcrumbList through AgencyServicePage. Metadata: serviceSeoData via presentation.seoKey; canonical remains unchanged.

## Sprint 3 — support

Route: frontend/pages/web-group/services/support.js. Current H1: WEBSITE SUPPORT & MAINTENANCE IN LONG ISLAND & NYC.

Current sections and decisions:

- KEEP hero/facts and existing imagery; REWRITE H1 only where intent or geography needs clarification.
- KEEP concrete introduction and strong buyer guidance; refine wording only.
- REWRITE approach: Ongoing Technical Monitoring; Updates & Security Patching; Content & Page Edits; Performance Improvements; Support Planning. Preserve technical topics, replace generic descriptions with inputs, decisions and acceptance checks.
- REWRITE expertise: Reliable Uptime - Keep your site available for leads and customers; Stronger Security - Reduce risk with consistent updates and monitoring; Faster Site Performance - Improve user experience across devices; Lower Long-Term Cost - Prevent larger issues with proactive maintenance.
- DELETE repeated shared reassurance and generic expertise filler; REWRITE shared delivery band into unique buyer questions.
- KEEP existing deliverables, scope, pricing context, proof and FAQs; ADD missing authority detail.

Existing proof: DermCare Management portfolio (/case-studies/dermcare/): Modular content and responsive templates illustrate a maintainable structure; no ongoing support contract or uptime result is asserted.

Existing pricing: Published Web support prices are $150, $250, and $500 per month for the corresponding package scope. Existing websites are assessed before recommending a plan. Setup totals below apply to website projects, not automatically to support-only work.

Existing FAQs: Can you support a site you did not build?; Are content edits included?; Is support available 24/7?; Will you check our contact form?; Can we add features later?

Current CTA: Discuss website support; Contact fallback + Jarvis via InquiryCTA. Links: /web-group/services/web-development/, /web-group/services/digital-marketing/

Structured data: page-specific Service, WebPage, Organization, LocalBusiness and BreadcrumbList through AgencyServicePage. Metadata: serviceSeoData via presentation.seoKey; canonical remains unchanged.

## Sprint 3 — ai-development

Route: frontend/pages/ai-group/services/ai-development.js. Current H1: CUSTOM AI DEVELOPMENT FOR LONG ISLAND & NYC.

Current sections and decisions:

- KEEP hero/facts and existing imagery; REWRITE H1 only where intent or geography needs clarification.
- KEEP concrete introduction and strong buyer guidance; refine wording only.
- REWRITE approach: Custom-Built AI Applications; The Power of RAG (Retrieval-Augmented Generation); Testing & Deployment. Preserve technical topics, replace generic descriptions with inputs, decisions and acceptance checks.
- REWRITE expertise: Custom-Built AI Applications - Tailored solutions for unique business needs; RAG Implementation - Retrieval-Augmented Generation with proprietary data; Testing & Deployment - Rigorous evaluation and seamless integration; Workflow Enhancement - AI systems that improve daily operations.
- DELETE repeated shared reassurance and generic expertise filler; REWRITE shared delivery band into unique buyer questions.
- KEEP existing deliverables, scope, pricing context, proof and FAQs; ADD missing authority detail.

Existing proof: Jarvis lead assistant (/ai-group/solutions/ai-lead-assistant/): A working KDH assistant with retrieval, structured inquiry extraction, Contact fallback, and a HubSpot handoff implemented in this repository.; IIN contribution overview (/case-studies/iin/): Professional integration and enrollment workflow experience; not an AI deployment claim or verified KDH agency engagement.

Existing pricing: Published AI setup totals start at $4,000 with support from $300 per month. The final scope depends on retrieval sources, integrations, actions, evaluation, and operating requirements. Third-party usage charges are separate and vary with traffic and configuration.

Existing FAQs: How is a custom assistant different from a basic chatbot?; Can it connect to our CRM?; Will it always answer correctly?; What costs continue after launch?; Can I try an example?

Current CTA: Scope your AI assistant or workflow; Contact fallback + Jarvis via InquiryCTA. Links: /ai-group/solutions/ai-lead-assistant/, /guides/custom-ai-assistant-vs-chatbot/

Structured data: page-specific Service, WebPage, Organization, LocalBusiness and BreadcrumbList through AgencyServicePage. Metadata: serviceSeoData via presentation.seoKey; canonical remains unchanged.

## Unique additions and specification coverage

| Sprint / Page | Required additions mapped to serviceContent |
|---|---|
| 1 / AI Consulting | Decision table: workflow, frequency, data, deterministic rules, risk, review, integration, cost, MVP, measurement; four industry examples; non-AI recommendation; workflow/data/risk/MVP/integration/cost artifacts; consulting vs implementation; Jarvis and assistant guide |
| 1 / AI Support | Twelve operating signals; seven update types distinguishing retrieval from retraining; evaluation loop; failure cases; support exclusions; Jarvis |
| 1 / Network Support | Supported devices/protocols; incident workflow; diagnostic issue examples; hours/hardware/ISP/cabling/SOC/vendor boundaries; artifact link and review CTA |
| 2 / Digital Marketing | Ten-step SEO workflow; seven-stage measurement table; GA4/GTM/Search Console; variable AI citations and fixed prompt benchmark; precise authority acquisition wording; no ranking/traffic/lead/citation/placement guarantees |
| 2 / Network Optimization | RSSI/SNR/utilization/loss/latency/throughput/jitter/roaming/interference/density; speed-test limitations; baseline-to-documentation workflow; reuse vs replacement tradeoff |
| 2 / Network Design | ISP→gateway→switch→staff/voice/guest/IoT VLANs→AP example; explicit example disclaimer; ten design questions; retain routing/switching/failover/load-balancing judgment |
| 3 / Web Design | Current-site/conversion review: pages, landing pages, inquiries, form friction, mobile, search intent, proof, CTA, analytics; service-page checklist; retain deliverables/portfolio/pricing/FAQs |
| 3 / Web Development | Ten architecture questions incl rendering/auth/data/CMS/idempotency/retries; seven failure cases; retain workflow/testing/handoff/migration/licensing/integration guidance |
| 3 / Website Support | Eight-area measurable operational support table; separate-project examples; preserve access/dependencies/hours/emergency/hosting/license boundaries and prices |
| 3 / AI Development | Evaluation loop; nine failure cases; human escalation/context/restricted actions/contact/logging; preserve RAG, approved sources, permissions, costs, Jarvis and incorrect-answer warning |

All pages: service-specific direct answer, diagnostic process, concrete deliverables, tradeoff, scope, cost drivers, buyer FAQ, proof/artifact, related service + relevant guide + contextual conversion CTA; coherent H1; unique title/description/OG/canonical. Editorial review targets 70–80% page-specific core copy, not a computed SEO guarantee. New guides will identify examples as planning artifacts, not customer results. No unsupported client, review, metric, location, certification, ranking or result will be added.

## Sprint 1 review gate

Completed before Sprint 2. Lint passed with no warnings. All 68 frontend tests passed after regenerating the sitemap for the new guide. Local HTTP review confirmed one H1, rendered authority content and no Next error page for Services, AI Consulting, AI Support, Network Support and the new Network guide. The Consulting canonical is unchanged. Updated unsupported AI learning / Network certainty display slogans. Browser runtime setup succeeded but discovery returned no browsers, so responsive screenshot verification remains unavailable in this session; no visual pass is asserted.

## Sprint 2 review gate

Completed before Sprint 3. SEO now includes all ten workflow stages, seven funnel definitions, fixed AI prompt benchmarking and explicit non-guarantees. Optimization explains ten metrics and repeatable baseline/post-change tests; Design preserves routing/switching, VLANs, Wi-Fi, redundancy and load balancing with a labeled architecture example. Added a search measurement guide; changed only the vague Web package feature label “Back linking,” preserving prices. Lint passed. A repeated headline-edit operation temporarily produced malformed data; replaced the fragile operation with bounded JSON parsing, restored untouched group navigation, and reran all 68 frontend tests successfully. Local HTTP checks confirmed one H1 and required rendered content on all three Sprint 2 routes and the new guide. Browser visual verification remains unavailable.

## Sprint 3 review gate

Retained the effective lower-page buyer guidance, approved prices and portfolio roles on all four pages. Replaced generic process/expertise copy with diagnostic UX review, architecture and failure planning, an eight-area maintenance table, and RAG evaluation/handoff detail. Added a Web planning guide. Existing AI source/permission/wrong-answer/cost boundaries remain. Website support keeps service hours, access, emergency, hosting and license exclusions. Local HTTP checks confirmed one H1 and required rendered content for all four routes and the new Web guide. All existing frontend tests and all 48 root API/integration tests passed; added semantic, pricing-selection, metadata and contextual-link regression coverage for the final review. Offline Jarvis export now includes all ten target services, all seven supporting destinations, package facts and the Services overview (22 documents); no index upload was performed.
