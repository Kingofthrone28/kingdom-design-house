# Kingdom Design House — 11-Page Authority Rewrite Specification

**Version:** 1.0  r
**Prepared for:** Kingdom Design House  
**Primary goal:** Replace generic/template-like service copy with unique, experience-based, commercially useful content while preserving the existing KDH visual identity.  
**Implementation target:** Existing Kingdom Design House Next.js production repository  
**Suggested path:** `docs/specs/kdh-11-page-authority-rewrite.md`

---

# 1. Objective

This specification covers the 11 KDH service pages that should be reviewed for content authority, uniqueness, commercial intent, and AI-search citation readiness.

The goal is **not** to make content "look human" to AI detectors.

The goal is to make each page materially different because it contains:

- service-specific expertise
- real implementation detail
- KDH-specific process
- buyer-specific questions
- scope boundaries
- real tradeoffs
- relevant proof
- pricing context
- technical or operational judgment
- useful next steps

Preserve the existing KDH visual system unless a structural change is required for semantic accessibility or conversion clarity.

---

# 2. Global Editorial Rule

Every page should target roughly:

```text
20–30% shared KDH brand/process language
70–80% page-specific authority content
```

This is an internal editorial guideline, not a Google ranking formula.

The shared visual framework may continue to use themes such as:

```text
PLAN.
BUILD.
TEST.
GROW.
```

However, repeated supporting paragraphs must not dominate each page.

---

# 3. Global Page Structure

Use this content architecture for primary service pages while keeping the existing design system:

```text
H1
Exact service + buyer + geography

DIRECT ANSWER
What KDH actually provides

PROBLEM
When a client needs this service

HOW KDH DIAGNOSES IT
Questions, inputs, metrics, constraints

WHAT KDH DELIVERS
Specific deliverables

HOW IT WORKS
Service-specific technical/process detail

REAL EXPERIENCE / PROOF
Relevant project, demo, or case study

TRADEOFFS / WHEN NOT TO USE THIS
Demonstrate judgment

SCOPE BOUNDARIES
What is and is not included

PRICING / COST DRIVERS
How project scope affects price

FAQ
Real buyer questions

CTA
Specific valuable next step
```

Do not force every page into identical visual section ordering if the current layout works better.

The **content responsibilities** must remain unique even when shared components are used.

---

# 4. Global Rewrite Rules

## KEEP

Preserve:

- current KDH branding
- color system
- large typography
- existing visual rhythm
- existing approved URLs
- useful service-specific content
- existing approved pricing
- accurate case-study references
- valuable internal links
- legitimate structured data

## REWRITE

Rewrite content that relies heavily on:

- "results-driven"
- "innovative solutions"
- "future-ready"
- "scalable solutions"
- "cutting-edge"
- "unlock potential"
- "transform your business"
- "seamless experience"
- "tailored solutions"
- "industry best practices"
- "peace of mind"
- "grow with you"
- "from idea to reality"

These phrases are not forbidden individually.

They become a problem when they replace concrete information.

## DELETE

Remove or consolidate content that:

- repeats the same claim elsewhere on the same page
- exists only to increase word count
- describes obvious steps without useful detail
- makes unsupported guarantees
- makes broad performance claims without evidence
- uses generic AI/technology language that could fit any agency
- duplicates another service page almost word-for-word

## ADD

Add:

- first-hand implementation detail
- actual questions KDH asks clients
- real decision frameworks
- technical tradeoffs
- scope boundaries
- examples
- cost drivers
- proof
- relevant case studies
- process artifacts
- diagrams where helpful
- contextual CTA

---

# 5. Rewrite Priority

## Sprint 1 — Rewrite Now

1. `/services/`
2. `/ai-group/services/ai-consulting/`
3. `/ai-group/services/ai-support/`
4. `/network-group/services/network-support/`

## Sprint 2 — Major Strengthening

5. `/web-group/services/digital-marketing/`
6. `/network-group/services/network-optimization/`
7. `/network-group/services/network-design/`

## Sprint 3 — Refine Existing Strong Pages

8. `/web-group/services/web-design/`
9. `/web-group/services/web-development/`
10. `/web-group/services/support/`
11. `/ai-group/services/ai-development/`

---

# 6. Page 1 — `/services/`

## Priority

**Rewrite Priority: CRITICAL**

## Authority Goal

Turn the page from a generic services directory into the clearest high-level explanation of what KDH actually does.

Primary positioning:

> Web Development & AI Automation for Long Island Businesses

Secondary capability:

> Business networking and infrastructure.

## KEEP

Keep:

- three-category visual structure where useful
- existing Web / AI / Network navigation
- current KDH design treatment
- existing service cards if they remain useful navigational elements
- existing CTA placement if it converts well

## REWRITE

Rewrite broad language such as:

- comprehensive services
- help your business grow
- innovative solutions
- scalable applications
- future growth
- measurable outcomes

Replace with concrete service descriptions.

## DELETE

Delete or consolidate:

- repetitive "why choose us" claims that do not add evidence
- duplicate summaries already explained on hub pages
- generic benefit statements without service context

## ADD

### Section: What KDH Primarily Builds

```text
KINGDOM DESIGN HOUSE

Primary:
1. Web platforms that convert and connect business systems
2. AI workflows that reduce repetitive manual work

Secondary:
3. Business network infrastructure and support
```

### Web scenarios

Add concrete examples:

- redesigning a service-business website
- building a custom portal
- connecting forms to CRM
- creating quote/booking workflows
- rebuilding outdated frontend architecture

### AI scenarios

Add:

- internal knowledge assistant
- customer support assistant
- CRM automation
- intake/qualification workflows
- document retrieval
- structured AI workflow

### Network scenarios

Add:

- office Wi-Fi redesign
- VLAN segmentation
- redundancy/failover
- routing/switching
- network troubleshooting

### Proof module

For each service family, show one relevant project or demonstration.

## CTA

Primary:

```text
Explore Web Solutions
Explore AI Solutions
```

Secondary:

```text
Not sure where to start? Get a technology review.
```

## Acceptance Criteria

- A first-time visitor can identify KDH's two strongest commercial services within 5 seconds.
- Web and AI receive stronger visual and internal-link priority than Network.
- Every service category includes concrete use cases.
- No generic "full-service technology partner" language dominates the page.
- At least one proof element appears for Web and AI.
- The page does not duplicate hub-page copy.

---

# 7. Page 2 — `/ai-group/services/ai-consulting/`

## Priority

**Rewrite Priority: CRITICAL**

## Authority Goal

Position AI Consulting as a disciplined process for deciding whether AI is appropriate, rather than selling AI for every problem.

## KEEP

Keep:

- AI consulting visual theme
- service category
- existing AI navigation
- accurate mentions of assessment and roadmap work
- approved pricing if present

## REWRITE

Rewrite generic ideas such as:

- AI is more than a buzzword
- cut through the hype
- unlock AI opportunities
- bring AI from idea to reality
- strategic roadmap
- collaborative guidance

These concepts may remain only if followed immediately by concrete methodology.

## DELETE

Remove:

- repeated "AI transformation" language
- vague innovation claims
- statements implying every business needs AI

## ADD

### Section: Before We Recommend AI

Add an evaluation framework:

| Area | KDH Question |
|---|---|
| Workflow | What repetitive task are we solving? |
| Frequency | How often does it occur? |
| Data | Where does the source information live? |
| Rules | Could normal automation solve this more reliably? |
| Risk | What must never be automated? |
| Human review | Where must a person approve the result? |
| Integration | Which systems need to connect? |
| Cost | What does the manual workflow consume today? |
| MVP | What is the smallest useful version? |
| Measurement | How will success be evaluated? |

### Section: Sometimes AI Is Not the Best Tool

Add explicit judgment:

> If a deterministic form, database query, integration, or rule-based workflow solves the problem more reliably, KDH should recommend that instead of adding an AI layer.

### Section: Example Business Workflows

#### Healthcare

- knowledge retrieval
- administrative intake
- prior-authorization workflow support
- FAQ assistance
- internal document search

Avoid implying clinical diagnosis or autonomous care decisions.

#### Manufacturing

- product discovery
- quote qualification
- documentation search
- sales knowledge retrieval

#### Professional Services

- lead qualification
- document retrieval
- internal knowledge assistant
- CRM workflow support

#### Real Estate

- inquiry routing
- property FAQ
- CRM enrichment
- internal document search

### Section: What the Client Leaves With

Examples:

- workflow map
- data-source inventory
- risk/approval matrix
- MVP recommendation
- integration map
- estimated implementation scope
- build-vs-buy recommendation
- operating-cost assumptions

## CTA

Primary:

```text
Get an AI Workflow Review
```

Secondary:

```text
See a Custom AI Development Example
```

## Acceptance Criteria

- The page clearly states that KDH may recommend not using AI.
- At least one decision framework appears.
- At least four industry/use-case examples are included.
- The page distinguishes consulting from development.
- Generic "AI transformation" wording is reduced substantially.
- The page links naturally to AI Development and Jarvis.

---

# 8. Page 3 — `/ai-group/services/ai-support/`

## Priority

**Rewrite Priority: CRITICAL**

## Authority Goal

Transform the page from broad "AI maintenance" language into a production AI operations and evaluation page.

## KEEP

Keep:

- AI support service concept
- valid ongoing-support pricing
- integrations/support information that is accurate
- monitoring references

## REWRITE

Rewrite or qualify phrases such as:

- AI that keeps learning
- continually train your AI
- future-proof your system
- eliminate model decay
- constantly feed new information into the model

## DELETE

Delete:

- language that conflates retrieval updates with model retraining
- unsupported promises about continuous improvement
- guarantees that AI accuracy will increase automatically

## ADD

### Section: What We Actually Monitor

Add:

- failed retrieval
- empty retrieval
- irrelevant source retrieval
- unsupported answers
- latency
- provider/API failures
- integration failures
- token usage
- cost changes
- stale knowledge
- escalation events
- tool-call failures

### Section: How an AI Assistant Gets Updated

Explain differences between:

#### Knowledge refresh

Documents or database content changes.

#### Embedding refresh

New/changed source material is re-indexed.

#### Retrieval tuning

Search/filter/ranking logic changes.

#### Prompt/configuration update

Behavior instructions change.

#### Model change

Provider or model version changes.

#### Fine-tuning

Model behavior is adjusted using training examples.

#### Retraining

A significantly different activity and not the default maintenance process for most KDH RAG-style systems.

### Section: Evaluation Loop

```text
Representative test set
        ↓
Expected answer/source
        ↓
Retrieval result
        ↓
Generated answer
        ↓
Source verification
        ↓
Human review
        ↓
Issue classification
        ↓
Configuration/content update
```

### Section: Common Failure Modes

Add examples:

- source document is outdated
- retrieval finds the wrong policy
- model gives an unsupported answer
- CRM/API integration is unavailable
- token usage spikes
- user asks the system to perform an unsupported action
- provider changes behavior

## CTA

```text
Review My Existing AI Assistant
```

## Acceptance Criteria

- The page correctly distinguishes knowledge updates from retraining.
- Evaluation becomes a core concept.
- At least six real operational signals are named.
- Failure modes are discussed.
- No claim suggests AI automatically improves by itself.
- Support scope and exclusions are clear.

---

# 9. Page 4 — `/network-group/services/network-support/`

## Priority

**Rewrite Priority: HIGH**

## Authority Goal

Make the page operational and specific enough that a business understands what network support actually includes.

## KEEP

Keep:

- existing support positioning
- current network design
- any valid monitoring/support plans
- current CTA structure if useful

## REWRITE

Rewrite generic claims such as:

- proactive, not reactive
- peace of mind
- always in capable hands
- support that grows with you

## DELETE

Remove:

- repeated reassurance copy
- unsupported uptime guarantees
- vague "we handle everything" language

## ADD

### Section: Supported Environment

Where accurate, include:

- routers
- switches
- wireless access points
- VLANs
- DNS/DHCP
- ISP/failover
- business Wi-Fi
- routing
- switching
- device configuration
- connectivity troubleshooting

### Section: Incident Workflow

```text
Alert / reported issue
        ↓
Triage
        ↓
Identify device or network path
        ↓
Review logs/configuration
        ↓
Remediation
        ↓
Connectivity test
        ↓
Documentation
```

### Section: Support Boundaries

Clarify:

- 24/7 support only if explicitly contracted
- replacement hardware is separate
- ISP fees are separate
- cabling projects require separate scope
- cybersecurity/SOC services are separate unless included
- third-party vendor SLAs are not controlled by KDH

### Section: Examples of Issues We Diagnose

- intermittent Wi-Fi
- poor roaming
- ISP failover issue
- VLAN routing problem
- DNS issue
- overloaded access point
- switch configuration
- connectivity loss

## CTA

```text
Review My Network Support Needs
```

## Acceptance Criteria

- Page names actual systems supported.
- Incident workflow is visible.
- Scope boundaries are clear.
- No blanket uptime guarantee exists.
- Copy is operational rather than reassurance-heavy.

---

# 10. Page 5 — `/web-group/services/digital-marketing/`

## Priority

**Rewrite Priority: HIGH**

## Authority Goal

Make the page reflect KDH's actual SEO/GEO/conversion methodology instead of generic digital-marketing copy.

## KEEP

Keep:

- statements that rankings are not guaranteed
- GA4 / GTM / Search Console references
- local SEO positioning
- technical SEO concepts
- valid service pricing

## REWRITE

Rewrite generic phrases such as:

- search engines reward fast websites
- lightning-fast performance
- continuously optimize
- fine-tune every element
- mobile-first world
- improve visibility everywhere

## DELETE

Remove:

- generic SEO education that does not explain KDH methodology
- inflated ranking promises
- vague backlink language

Replace "backlinking" as a package term with more precise language such as:

```text
Digital authority and relevant link acquisition
```

## ADD

### Section: KDH SEO Workflow

```text
1. Search Console opportunity analysis
2. Query-to-page intent mapping
3. Crawl/indexability review
4. Landing-page optimization
5. Internal linking
6. Technical SEO
7. Local entity consistency
8. Conversion measurement
9. Authority acquisition
10. AI citation monitoring
```

### Section: What the Metrics Mean

| Metric | Meaning |
|---|---|
| Impression | Search engine displayed the page |
| Click | Searcher visited the site |
| CTA engagement | User interacted with a next step |
| Successful lead | Form/assistant successfully delivered |
| Qualified lead | Business confirmed a real opportunity |
| Booked meeting | Prospect scheduled an appointment |
| Client | Revenue outcome |

### Section: GEO / AI Search

Explain:

- AI visibility is not a single permanent ranking
- citations vary by prompt and engine
- strong SEO fundamentals still matter
- original evidence and third-party authority improve citation potential
- KDH should measure a fixed prompt benchmark over time

### Section: What KDH Does Not Promise

- number-one ranking
- guaranteed traffic
- guaranteed leads
- guaranteed AI citations
- guaranteed backlink placement

## CTA

```text
Get an SEO & Lead Review
```

## Acceptance Criteria

- The methodology is unique enough to reflect actual KDH operations.
- Conversion measurement is distinguished from traffic.
- GEO is discussed accurately.
- Generic SEO copy is significantly reduced.
- No ranking guarantees exist.

---

# 11. Page 6 — `/network-group/services/network-optimization/`

## Priority

**Rewrite Priority: MEDIUM-HIGH**

## Authority Goal

Replace broad network-performance claims with measurable optimization criteria.

## KEEP

Keep useful content about:

- speed tests
- throughput testing
- stress testing
- coverage verification
- access-point placement
- frequency/channel tuning

## REWRITE

Rewrite:

- guaranteed smooth performance
- maximum speed everywhere
- flawless network
- optimized for anything

## DELETE

Remove unsupported performance guarantees.

## ADD

### Section: Metrics We Review

Where applicable:

- RSSI
- SNR
- channel utilization
- packet loss
- latency
- throughput
- jitter
- roaming behavior
- interference
- client density

### Section: Why Speed Tests Are Not Enough

Suggested copy direction:

> A speed test measures one path at one moment. Wi-Fi quality can still be poor because of weak signal, interference, channel contention, client density, roaming behavior, or upstream network configuration.

### Section: Optimization Workflow

```text
Baseline measurement
        ↓
Coverage / RF review
        ↓
Channel analysis
        ↓
Capacity review
        ↓
Configuration changes
        ↓
Post-change testing
        ↓
Documentation
```

## CTA

```text
Review My Network Performance
```

## Acceptance Criteria

- At least five real network metrics are explained.
- Speed-test limitations are discussed.
- No performance guarantee is made.
- Optimization process is measurable.

---

# 12. Page 7 — `/network-group/services/network-design/`

## Priority

**Rewrite Priority: MEDIUM**

## Authority Goal

Keep the useful technical base but replace explanatory filler with architecture examples and decision criteria.

## KEEP

Keep:

- VLAN discussion
- routing
- switching
- redundancy
- failover
- access-point placement
- load balancing where applicable

## REWRITE

Tighten phrases such as:

- routers are the backbone
- traffic controllers
- invisible network
- technology that grows with you

## DELETE

Remove redundant explanations of basic networking concepts if they do not help a buyer make a decision.

## ADD

### Section: Example Small-Business Network Architecture

```text
Internet / ISP
     |
Firewall / Gateway
     |
Core Switch
     |
     +-- VLAN 10 — Staff
     |
     +-- VLAN 20 — Voice
     |
     +-- VLAN 30 — Guest
     |
     +-- VLAN 40 — IoT
     |
Wireless Access Points
```

Add disclaimer:

> This is an example only. Actual segmentation depends on devices, business requirements, risk, building layout, and existing systems.

### Section: Design Questions

- How many users/devices?
- What applications are latency-sensitive?
- Is guest access required?
- Is failover required?
- Are voice systems present?
- Is remote management needed?
- Are IoT devices present?
- What segmentation is necessary?
- What ISP options exist?
- What equipment can be reused?

## CTA

```text
Plan My Business Network
```

## Acceptance Criteria

- Architecture example appears.
- Real planning questions appear.
- Generic metaphor-heavy copy is reduced.
- No one-size-fits-all architecture is presented as mandatory.

---

# 13. Page 8 — `/web-group/services/web-design/`

## Priority

**Rewrite Priority: MEDIUM — REFINE, DO NOT REBUILD**

## Authority Goal

Preserve the stronger lower-page content while replacing generic process copy with real UX/conversion methodology.

## KEEP

Keep:

- Long Island / Freeport positioning
- practical starting point
- page-structure content
- mobile-navigation guidance
- inquiry-path discussion
- concrete deliverables
- pricing
- case-study references
- relevant FAQs

## REWRITE

Rewrite generic process sections such as:

- Discovery
- Research & Insight
- UX & Structure
- Content Alignment
- Design Execution

when the supporting content is generic.

## DELETE

Remove phrases such as:

- build trust and inspire action
- visually striking and strategically effective

unless followed by real examples.

## ADD

### Replace "Discovery" With

#### Current-Site & Conversion Review

Include:

- current pages
- top landing pages
- mobile navigation
- forms
- CTA visibility
- Search Console queries
- analytics
- content inventory
- CRM/inquiry flow

### Replace "Research & Insight" With

#### Search Intent + Customer Journey

Example:

```text
Google Search
      ↓
Service Landing Page
      ↓
Proof / Case Study
      ↓
Pricing / Scope
      ↓
Inquiry
```

### Section: What We Look For in a Service Website

- clear H1
- understandable service offer
- visible location/service area
- trust evidence
- mobile CTA
- easy navigation
- useful pricing context
- low-friction form
- analytics
- search-friendly content

## CTA

```text
Get a Website Growth Review
```

## Acceptance Criteria

- Existing strong lower-page sections remain.
- Generic design-process descriptions are replaced with diagnostic detail.
- Search intent and conversion are directly connected.
- The page remains visually consistent.

---

# 14. Page 9 — `/web-group/services/web-development/`

## Priority

**Rewrite Priority: LOW-MEDIUM — STRONG PAGE**

## Authority Goal

Retain strong workflow/integration content and make architecture decisions even more explicit.

## KEEP

Keep:

- "start with the workflow" positioning
- workflow maps
- integrations
- CMS/application features
- testing
- handoff
- authentication discussion
- migration considerations
- API dependencies
- licensing
- pricing factors
- scope boundaries

## REWRITE

Rewrite generic wording such as:

- comprehensive technical roadmap
- scalable system architecture
- industry best practices
- future-ready implementation

## DELETE

Remove generic statements that do not identify a technical decision.

## ADD

### Section: Architecture Questions We Answer

```text
Does the page need server-side rendering?
Does it benefit from static generation?
Does the system need authentication?
Who owns the data?
What happens if an API fails?
What actions must be idempotent?
How should retries work?
What happens after a failed form submission?
What data belongs in the CMS?
What belongs in an application database?
```

### Section: Failure Planning

Add examples:

- CRM unavailable
- API timeout
- duplicate webhook
- failed form notification
- deployment failure
- stale cache
- authentication/session expiry

## CTA

```text
Review My Web Application or Workflow
```

## Acceptance Criteria

- Existing unique workflow content is preserved.
- At least five real architecture questions appear.
- Failure planning is discussed.
- Generic development-agency language is reduced.

---

# 15. Page 10 — `/web-group/services/support/`

## Priority

**Rewrite Priority: LOW-MEDIUM — STRONG FOUNDATION**

## Authority Goal

Make support packages operationally transparent.

## KEEP

Keep:

- access/dependency review
- maintenance scope
- content changes
- monitoring
- service hours
- exclusions
- emergency recovery separation
- hosting/license separation
- current pricing

## REWRITE

Rewrite broad service-card language that says things like:

- keep your site running smoothly
- peace of mind
- worry-free maintenance

## ADD

### Operational Support Table

| Area | Example Checks |
|---|---|
| Availability | HTTP/endpoint checks |
| Forms | successful test submission |
| Dependencies | package/plugin update review |
| Performance | Core Web Vitals / asset regressions |
| Content | agreed updates |
| Errors | build/runtime/log review |
| SEO | indexability / broken links where included |
| Integrations | API/form/CRM health where included |

### Section: What Requires Separate Project Scope

Examples:

- redesign
- new feature development
- major CMS migration
- custom integration
- emergency incident outside plan
- substantial content production
- hosting/provider migration

## CTA

```text
Review My Website Support Setup
```

## Acceptance Criteria

- Support activities are measurable.
- Plan boundaries are easy to understand.
- Generic reassurance language is minimized.
- Separate-project work is clearly identified.

---

# 16. Page 11 — `/ai-group/services/ai-development/`

## Priority

**Rewrite Priority: LOW-MEDIUM — STRONGEST AI PAGE**

## Authority Goal

Preserve existing RAG/permission/human-fallback content and deepen evaluation/failure handling.

## KEEP

Keep:

- approved knowledge sources
- permissions
- integration requirements
- representative test questions
- human fallback
- retrieval limitations
- explicit statement that generated answers can be wrong
- pricing/scope
- Jarvis references
- operating-cost considerations

## REWRITE

Rewrite generic phrases such as:

- no two businesses are alike
- no two AI solutions should be either
- rigorously test
- minimal disruption
- enhances the way your business operates

## DELETE

Remove generic AI product-development filler when a concrete technical example can replace it.

## ADD

### Section: Evaluation Workflow

```text
Representative question
        ↓
Expected source
        ↓
Retrieved chunks
        ↓
Generated response
        ↓
Citation/source validation
        ↓
Human rating
        ↓
Failure classification
```

### Section: Common Failure Cases

- no relevant retrieval
- wrong source ranks first
- stale source wins
- user requests unsupported action
- CRM/API unavailable
- tool call fails
- model refuses request
- output is incomplete
- answer conflicts with source material

### Section: Human Handoff

Explain:

- when escalation occurs
- what context is transferred
- what the assistant must never decide
- how users reach a human
- how failed automation is logged

## CTA

```text
Find an AI Workflow to Automate
```

## Acceptance Criteria

- Existing technical content remains.
- Evaluation becomes visible.
- Failure modes are documented.
- Human handoff is explicit.
- Generic AI-development language is reduced.

---

# 17. Cross-Page Content Differentiation Matrix

Use this matrix to prevent the pages from collapsing into the same template.

| Page | Unique Authority Theme |
|---|---|
| Services | KDH business capability map |
| AI Consulting | AI decision framework |
| AI Support | AI operations/evaluation |
| Network Support | incident/support operations |
| Digital Marketing | SEO/GEO/conversion methodology |
| Network Optimization | measurable network performance |
| Network Design | architecture/planning |
| Web Design | customer journey + conversion UX |
| Web Development | architecture + integrations + failure planning |
| Website Support | operational maintenance scope |
| AI Development | RAG/integration/evaluation/handoff |

No two pages should lead with the same framework.

---

# 18. Shared Components vs Unique Content

Codex may reuse shared UI components.

Examples:

```text
ServiceHero
ProofCard
ProcessStrip
PricingCard
FAQ
CTASection
CaseStudyPreview
```

However, page content must remain page-specific.

Do not implement one generic service-copy object and reuse it across all services.

Shared presentation is acceptable.

Shared generic content is not.

---

# 19. Semantic Heading Requirement

Animated typography must not produce broken crawler/accessibility text.

Good:

```html
<h1>AI Consulting for Long Island & NYC Businesses</h1>
```

If visual letter animation is required:

```html
<h1>
  <span class="sr-only">
    AI Consulting for Long Island & NYC Businesses
  </span>

  <span aria-hidden="true">
    <!-- visual character animation -->
  </span>
</h1>
```

Acceptance:

- one coherent H1
- correct accessibility-tree text
- no duplicated screen-reader heading
- visual design preserved

---

# 20. Proof Requirements

Every Tier 1 Web/AI page should include one or more of:

- approved case study
- KDH project example
- Jarvis technical demonstration
- architecture example
- implementation screenshot
- approved metric
- process artifact

Avoid unsupported numerical claims.

If proof is unavailable:

```text
Do not invent it.
Use a factual capability/example instead.
```

---

# 21. FAQ Rules

FAQ content should come from real buyer concerns.

Avoid:

```text
Why is KDH the best agency?
Why should I choose KDH?
```

Prefer:

### Web Development

- Who owns the code?
- Can you work with our current CMS?
- What happens if a third-party API fails?
- Do you handle hosting?
- Can you integrate with our CRM?

### AI

- Does a custom assistant train on our data?
- Can it still give a wrong answer?
- What happens when it cannot answer?
- How much does model usage cost?
- Can we change AI providers later?

### SEO

- How long does SEO take?
- Can you guarantee page one?
- What is the difference between traffic and a qualified lead?
- How do AI citations differ from Google rankings?

### Network

- Do we need new hardware?
- Can existing access points be reused?
- How do you measure Wi-Fi performance?
- Do you offer 24/7 support?

---

# 22. Author / Expertise Signals

Where editorially appropriate, connect substantive guides and technical resources to a real author.

Author profile should include only accurate information.

Relevant expertise may include:

- full-stack web development
- frontend architecture
- Node.js
- React / Next.js
- integrations
- AI/RAG systems
- infrastructure
- analytics
- technical SEO

Do not create artificial expert identities.

---

# 23. Internal Link Requirements

Each service page should link to:

```text
1 related service
1 relevant authority guide
1 relevant proof/case study
1 conversion CTA
```

Example:

```text
AI Consulting
    ↓
AI Development
    ↓
Custom AI Assistant vs Chatbot
    ↓
Jarvis Case Study
    ↓
AI Workflow Review
```

Example:

```text
Web Design
    ↓
Web Development
    ↓
Website Redesign Cost Guide
    ↓
Relevant Case Study
    ↓
Website Growth Review
```

---

# 24. Metadata Requirements

Every page must have:

- unique title
- unique meta description
- coherent H1
- canonical
- Open Graph title
- Open Graph description
- relevant image where available

Avoid repeatedly swapping only the service name into the same title template if better intent-specific language is available.

---

# 25. Suggested H1 Direction

These are directionally recommended and should be adjusted to current page intent.

| URL | Suggested H1 Direction |
|---|---|
| `/services/` | Web, AI & Technology Services for Long Island Businesses |
| `/ai-group/services/ai-consulting/` | AI Consulting for Long Island & NYC Businesses |
| `/ai-group/services/ai-support/` | AI Assistant Support, Evaluation & Monitoring |
| `/network-group/services/network-support/` | Business Network Support for Long Island & NYC |
| `/web-group/services/digital-marketing/` | Technical SEO & Organic Growth for Long Island Businesses |
| `/network-group/services/network-optimization/` | Business Wi-Fi & Network Optimization |
| `/network-group/services/network-design/` | Business Network Design & Infrastructure Planning |
| `/web-group/services/web-design/` | Website Design & Redesign for Long Island Businesses |
| `/web-group/services/web-development/` | Custom Web Development for Long Island & NYC |
| `/web-group/services/support/` | Website Maintenance & Support for Long Island Businesses |
| `/ai-group/services/ai-development/` | Custom AI Development for Long Island & NYC Businesses |

---

# 26. Codex Implementation Strategy

## Step 1 — Repository Discovery

Codex must first identify:

- route files
- content sources
- shared service components
- metadata configuration
- schema utilities
- animation components
- case-study components
- CTA components
- analytics helpers

Do not invent file paths before repository discovery.

## Step 2 — Create Content Inventory

For each of the 11 URLs, record:

```text
Current H1
Current sections
Shared sections
Page-specific sections
Generic sections
Existing proof
Existing pricing
Existing FAQs
Current CTA
Internal links
Structured data
```

## Step 3 — Classify Existing Content

Mark every major section:

```text
KEEP
REWRITE
DELETE
ADD
```

Do not remove strong content simply because a rewrite was requested.

## Step 4 — Implement Sprint 1

```text
/services/
/ai-group/services/ai-consulting/
/ai-group/services/ai-support/
/network-group/services/network-support/
```

Review before proceeding.

## Step 5 — Implement Sprint 2

```text
/web-group/services/digital-marketing/
/network-group/services/network-optimization/
/network-group/services/network-design/
```

## Step 6 — Implement Sprint 3

```text
/web-group/services/web-design/
/web-group/services/web-development/
/web-group/services/support/
/ai-group/services/ai-development/
```

Sprint 3 is primarily refinement.

---

# 27. Codex Guardrails

Codex must NOT:

- fabricate testimonials
- fabricate case-study results
- invent review text
- invent clients
- invent locations
- invent certifications
- invent service guarantees
- generate hundreds of city pages
- keyword-stuff
- mass-produce FAQs
- change existing approved prices without instruction
- replace strong existing technical content with generic prose
- remove current search-performing URLs
- hide important content behind client-only rendering
- use fake structured-data reviews

---

# 28. Content Quality Test

Before accepting a rewritten section, ask:

## Test 1 — Competitor Swap

Could the paragraph appear unchanged on another agency website?

If yes:

```text
REWRITE
```

## Test 2 — Experience

Does the section demonstrate something KDH actually knows how to do?

If no:

```text
ADD DETAIL
```

## Test 3 — Buyer Value

Does the section help a buyer decide whether they need the service?

If no:

```text
REWRITE
```

## Test 4 — Specificity

Does it name tools, inputs, risks, decisions, deliverables, boundaries, or measurements where relevant?

If no:

```text
ADD SPECIFICITY
```

## Test 5 — Evidence

Is a performance/result claim supported?

If no:

```text
REMOVE OR QUALIFY
```

---

# 29. Acceptance Criteria — Per Page

A page passes when:

- H1 is unique and coherent.
- Service, buyer, and geography are understandable.
- At least 70% of core body content is meaningfully page-specific by editorial review.
- At least one section demonstrates service-specific expertise.
- At least one real tradeoff or limitation appears.
- Deliverables are concrete.
- Scope boundaries are visible.
- CTA is service-specific.
- Pricing/cost drivers are accurate where included.
- Relevant proof is linked.
- FAQs answer buyer questions.
- Page does not rely on generic marketing language.
- Page remains visually consistent with KDH.
- Accessibility is preserved.
- Metadata is unique.
- Internal links are intentional.
- No unsupported claims are introduced.

---

# 30. Acceptance Criteria — Whole 11-Page Set

The project is complete when:

- all 11 pages have distinct authority themes
- AI Consulting and AI Support no longer read like generic AI-agency pages
- Web Development and AI Development retain their strongest existing technical content
- generic shared copy is reduced
- Web and AI receive the strongest commercial focus
- service pages link into guides/case studies
- contextual conversion CTAs exist
- heading semantics are repaired
- metadata is unique
- no rankings or leads are guaranteed
- no fake evidence exists
- lint/type/build checks pass
- responsive visual review passes

---

# 31. Codex Kickoff Prompt

Use this instruction after saving the file into the repository:

```text
Read docs/specs/kdh-11-page-authority-rewrite.md and the repository's
applicable AGENTS.md files.

Implement the 11-page authority rewrite specification in three sprints.

Begin with repository discovery. Map every requirement to actual routes,
components, content files, metadata utilities, schema utilities, analytics
helpers, and shared UI before editing.

Do not redesign Kingdom Design House. Preserve the current brand, typography,
color system, animations, working routes, approved pricing, case studies,
and functioning lead flows.

For every target page:
1. inventory current sections
2. classify sections KEEP / REWRITE / DELETE / ADD
3. preserve strong existing technical content
4. replace generic content with service-specific experience, decisions,
   deliverables, tradeoffs, examples, boundaries, and buyer questions
5. repair semantic headings where animation fragments crawler/accessibility text
6. maintain unique metadata and contextual internal links
7. connect relevant pages to proof, guides, and conversion CTAs

Do not fabricate:
clients, reviews, metrics, locations, certifications, testimonials,
rankings, guarantees, or project results.

Complete Sprint 1 first:
- /services/
- /ai-group/services/ai-consulting/
- /ai-group/services/ai-support/
- /network-group/services/network-support/

Then Sprint 2:
- /web-group/services/digital-marketing/
- /network-group/services/network-optimization/
- /network-group/services/network-design/

Then Sprint 3:
- /web-group/services/web-design/
- /web-group/services/web-development/
- /web-group/services/support/
- /ai-group/services/ai-development/

Run the repository's lint, typecheck, tests, and build commands where available.

Report:
- files changed
- routes updated
- KEEP/REWRITE/DELETE/ADD decisions
- metadata changes
- internal-link changes
- semantic heading fixes
- claims intentionally omitted because proof was unavailable
- test/build results
- recommended follow-up work

Do not deploy production unless separately instructed.
```

---

# 32. Final Principle

Do not optimize these pages to appear "non-AI."

Optimize them to contain information that generic AI content would not know without KDH's experience.

The target transformation is:

```text
GENERIC SERVICE CLAIM
        ↓
REAL BUSINESS PROBLEM
        ↓
KDH DECISION PROCESS
        ↓
TECHNICAL / OPERATIONAL DETAIL
        ↓
TRADEOFFS
        ↓
PROOF
        ↓
CLEAR NEXT STEP
```

That structure creates stronger content for:

- prospective buyers
- traditional search
- AI search systems
- internal sales
- external citations
- long-term authority
