# Requirement-to-source map

Paths below are relative to the repository root.

| Requirement | Implementation | Verification / dependency |
| --- | --- | --- |
| Freeport base, Long Island and NYC, remote delivery | `frontend/data/siteData.js`, `frontend/lib/seo.js`, `HomeAcquisition.js`, `Hero.js`, `Footer.js` | User-confirmed positioning; no new office addresses or geographic outcome claims |
| Homepage service → proof → inquiry paths | `frontend/pages/index.js`, `components/HomeAcquisition.js`, `components/InquiryCTA.js` | HTML link check and production build |
| Web and AI hubs | `components/Organisms/AgencyGroupLanding.js` | Service links, proof, scope, pricing, inquiry options in HTML |
| Five priority service pages | Existing route files → `AgencyServicePage.js` → `AgencyServiceTemplate.js` → `ServiceDecisionContent.js`; `siteData.serviceContent[*].buyerGuide` | Each has buyer problem, deliverables, process, proof, boundaries, pricing basis, five FAQs, contextual CTA |
| Four evidence-ready destinations | `siteData.destinations`, `components/Organisms/AcquisitionPage.js`, four route wrappers | Static HTML, metadata, links, JSON-LD |
| CRM automation stays unpublished | `frontend/data/site/publication.json`, `techdocs/organic-acquisition/crm-automation.draft.md` | No route file; 404; staging gate pending |
| Remove unsupported claims | `VideoShowcase.js`, `GroupHero.js`, `agencyServicePresentation.js`, `siteData.js`, `lib/seo.js`, `lib/structuredData.js`, portfolio data | “300%,” awards, rankings, invented metrics, certifications, employee counts, coordinates, and hours removed from affected shared content / schema |
| Accurate portfolio relationships | `data/caseStudies/{iin,northwell,daremd,dermcare,factory,summaries}.js`, `EditorialCaseStudyPage.js` | Northwell employment; IIN professional contribution; no unverified agency relationship or quantitative outcomes |
| All prices preserved; initial Web/AI pricing | `PricingSummary.js`, `PricingPlans.js`, `pages/pricing.js`, hubs, service guidance | Numeric comparison against prior snapshot; initial HTML inspection |
| Shared Jarvis and browser session | `contexts/JarvisContext.js`, `pages/_app.js`, `ChatInterface.js`, `ChatJarvis.js`, `JarvisFloat.js` | Single mount; session ID/history; native dialog. Browser interaction check pending |
| Service starters, Contact fallback, keyboard/mobile | `InquiryCTA.js`, `ChatInterface.js`, `ChatInterface.module.scss` | Starters only populate a draft; native modal, Escape, focus restoration, reachable controls. Visual/keyboard QA pending |
| Editable Contact prefill; optional source/context | `ContactForm.js`, `utils/acquisition.js`, `siteData.contactForm`, `formSubmissionService.js`, `server/contactService.js` | Allowlist tests; existing required validation, reCAPTCHA, rate limiting, endpoint, and destinations preserved |
| Context in existing CRM descriptions | `server/chatService.js`, `server/leadService.js` | No new HubSpot properties; existing conversation association property unchanged |
| Consent, attribution, event privacy | `utils/analytics.js`, `GoogleAnalytics.js`, `contexts/GDPRContext.js` | Denied consent, allowed payload, unknown/direct, purge on withdrawal tests; GA account setup still required |
| Confirmed lead events and deduplication | `analytics.trackConfirmedLead`, `utils/inquirySession.js`, `ContactForm.js`, `ChatInterface.js` | Submission mutex, confirmation guards, persisted conversation guard, failure and repeated callback tests |
| Canonicals, social metadata, headings, entity IDs | `SEOHead.js`, `lib/seo.js`, `lib/structuredData.js`, page wrappers | Production HTML; preserved organization/localbusiness/website/service IDs; page-specific Service and BreadcrumbList |
| Published-only sitemap; no broken breadcrumb parents | `data/site/publication.json`, `scripts/generate-sitemap.mjs`, `utils/breadcrumbs.js`, `Breadcrumbs.js` | 28 eligible routes; drafts/redirects/unpublished absent; no guessed dates |
| Jarvis knowledge and scraper coverage | `scripts/generate-jarvis-knowledge.mjs`, `rag-api/data/sample-documents.json`, `rag-api/scripts/web-content-scraper.js`, `rag-api/routes/chat.js` | Offline knowledge export; coverage uses publication registry; refresh/reindex procedure documented, not executed |
| 90-day content and measurement operation | `operating-calendar.md`, `measurement.md`, `prompt-cohorts.json` | Drafts and review instructions only. Exact historical specification cohort and account baselines are external dependencies |
| Validation and rollback | Tests in `frontend/__tests__`, `scripts/verify-acquisition.mjs`, `verification.md`, `rollback.md` | Mock-backed suites, lint, build, HTML and HTTP checks; browser QA explicitly pending |
