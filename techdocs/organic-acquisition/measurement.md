# Measurement contract and account dependencies

The existing GA4 measurement ID remains `G-BEKZ5DH50B`. `frontend/utils/analytics.js` is the only application tracking source. `GoogleAnalytics` loads the existing GA script only after analytics consent and explicitly controls page views. The consent provider also updates the vendor's consent settings on later changes.

| Event | Trigger | Counts as an inquiry? |
| --- | --- | --- |
| `service_cta_click` | Select a contextual Contact or Jarvis CTA | No |
| `chat_open` | Open the single Jarvis dialog | No |
| `chat_message_sent` | Submit a visitor message, after the synchronous request guard | No |
| `demo_request_start` | Start the assistant demo flow or arrive at its contextual inquiry form; guarded once per mounted application | No |
| `generate_lead` with `method=contact_form` | `/api/contact` reports `success=true` and `notificationDelivered=true`, after SMTP accepts a business notification recipient | Yes; once per confirmed local submission receipt |
| `generate_lead` with `method=chat` | `/api/chat` reports `leadCreated=true` and successful owning CRM acceptance | Yes; once per conversation, including later CRM updates |

SMTP acceptance confirms the notification was accepted for delivery, not that a human read the email. A failed visitor acknowledgment does not undo successful business notification acceptance. SMTP rejection or delivery exceptions never confirm a lead. HubSpot contact acceptance confirms the inquiry even if an optional deal/ticket operation has a warning; those downstream operational failures need follow-up.

Contact's synchronous submission guard blocks concurrent clicks, reentrant callbacks, and immediate resubmission after success. A deliberate edit after success creates a new receipt. A failed attempt can retry under the same local receipt. Jarvis also guards an in-flight message synchronously. Local session confirmation markers suppress repeated lead events across reopenings, reloads, and subsequent updates. No internal receipt or conversation key is sent to GA4.

These are browser conversion guards, not a new global transaction service. Clearing session storage starts a new browser state; blocked storage falls back to memory for the mounted application. An ambiguous network failure after email/CRM acceptance still needs an operational delivery check. CRM server-side identity/association deduplication continues to use the existing conversation property; no new HubSpot properties are required. No claim of global exactly-once email delivery or cross-device visitor identification is made.

Privacy and attribution:

- All event data is allowlisted. Service values match the Contact options; CTA codes come from `utils/acquisition.js`. Paths are stripped of query/fragment and checked against eligible publication paths; unknown paths become `/unknown/`.
- Analytics overrides `page_location` and `page_referrer` with sanitized values. Names, email addresses, phone numbers, company names, free text, messages, transcripts, receipt IDs, conversation IDs, CRM IDs, arbitrary query strings, and user-supplied properties have no event field.
- Attribution is captured only after analytics consent in the existing consent model. Session storage contains only an approved landing path, a coarse referrer category, and one of four approved campaign codes. Denial/withdrawal clears the attribution record. Events during denied consent are dropped, not buffered or replayed after consent.
- Referrer categories are `google`, `bing`, `linkedin`, `instagram`, `referral`, and `unknown_direct`. An absent referrer stays `unknown_direct`, including visitors who might have used an AI tool. Never relabel missing attribution as AI traffic.
- Approved `utm_campaign` codes: `organic-acquisition`, `web-services`, `ai-assistant`, `healthcare-websites`. Other campaign strings and arbitrary `utm_source`, `utm_term`, or `utm_content` values are not stored. Optional attribution is included in the existing notification / CRM description, not new HubSpot fields.
- “How did you hear about us?” is a separate optional free-text field in Contact. It is sanitized, limited to 200 characters, and delivered to the business; it is never merged into referrer attribution or sent to analytics. Chat/API payloads can carry the same optional field into existing CRM descriptions.
- Chat history and a conversation ID live in the tab's session storage for conversation continuity; lead confirmation markers are operational deduplication state. They are not marketing attribution. Closing the browser tab ends that session. No transcripts are written to analytics.

Account configuration and baselines are not completed by this code change. Before treating GA4 as a lead report, the owner must verify the intended property, consent setup, retention, internal-traffic exclusions, and key-event configuration. Mark `generate_lead` as the lead key event; do not mark `chat_open` or `demo_request_start` as leads. Disable GA4 enhanced-measurement form interactions and automatic browser-history page views (and any other automatic collection that can bypass this allowlist) in the data stream; check for duplicate tags/GTM. Keep only the reviewed application events for the inquiry funnel. Use mocks and a staging/debug property to verify the outgoing payload before public launch; do not enter real personal data into analytics debug tests.

Baseline exports required from the owner: 28 complete days of Search Console Web impressions/clicks/CTR/position by page and query, GA4 consented sessions and confirmed inquiry events by normalized page/service/method, and business counts for qualified inquiries, consultations, proposals, and revenue. Keep search geography/device filters, time zone, consent coverage, and reporting lag explicit. If tracking is newly added, record a new prospective baseline rather than reconstructing leads from old chat opens.

Weekly review: compare service CTA selection → chat engagement or Contact attempt → confirmed inquiry → qualified inquiry → consultation → proposal → won revenue. Review failures and missing data alongside success. A visitor may create both a Contact and chat inquiry: count those as two confirmed channel submissions in analytics, then have the business deduplicate people/opportunities in the pipeline. Store personal pipeline details in the existing business system, not in analytics or a public repository. Apply consistent business definitions and report counts with denominators; do not infer attribution solely from timing.
