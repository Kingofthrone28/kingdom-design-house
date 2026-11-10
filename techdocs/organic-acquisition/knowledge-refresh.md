# Jarvis knowledge refresh and production reindex handoff

Only the offline knowledge export was executed. No live index was populated, refreshed, deleted, or switched. A deployed Jarvis can continue retrieving stale vectors until the separate reindex is completed; changing source files alone does not remove old indexed claims.

Approved sources are the public `siteData` guidance/destinations, portfolio wording, published price facts, and the explicit behavior rules in `rag-api/routes/chat.js`. `frontend/data/site/publication.json` supplies the scraper's 28-route coverage, including eligible services, case studies, guides, location, pricing, and Contact. CRM automation, mock drafts, and redirects are excluded. Never index `prior-metadata-and-content.json`, this handoff directory, private environment files, conversation logs, or customer records.

Regenerate the repository-controlled knowledge JSON offline, from the repository root:

```sh
node frontend/scripts/generate-jarvis-knowledge.mjs
node frontend/scripts/generate-sitemap.mjs
```

The export updates `rag-api/data/sample-documents.json` with 13 approved documents. This step makes no network requests or CRM/index writes. Review its diff for prices, positioning, contribution boundaries, and forbidden performance/credential claims. The production HTML check is `node frontend/scripts/verify-acquisition.mjs` after a successful frontend build.

Staging refresh procedure (future work requiring appropriate staging access):

1. Use an isolated staging RAG service and a new, empty staging Pinecone index configured for the current embedding model's dimensions. Set `PINECONE_INDEX_NAME` in that staging environment. The current client supports an index name, not a configurable namespace. Keep the production index and credentials separate.
2. Verify the staging website is the intended reviewed build and has no private or unpublished content in its eligible route list. A protected preview requires an explicitly supported access method; do not weaken preview protection to scrape it.
3. First read-scrape only: `node rag-api/scripts/web-content-scraper.js --dry-run --url <reviewed-staging-origin>`. This scraper's dry run avoids index uploads. Confirm the origin and excluded routes in its output. Do not use `process-documents.js --dry-run`: that separate legacy command has an unimplemented dry-run option.
4. After separate authorization, run `node rag-api/scripts/populate-index.js` and the scraper without `--dry-run`, both against the isolated staging index and reviewed staging origin. These commands incur embedding/index usage. Inspect upload errors; the legacy scraper can log a failed batch and continue, so an exit code alone is not proof that every vector was uploaded.
5. Test retrieval for package prices, six-payment/support distinction, Freeport/remote delivery, Northwell employment, IIN contribution context, healthcare boundaries, assistant limitations, unknown answers, and Contact fallback. Check citations/metadata and compare to the approved text. Staging CRM handoff tests use an isolated portal and controlled synthetic records only after separate authorization; use the unpublished CRM checklist.
6. Record the build revision, index name, corpus version/hash, vector counts, representative retrieval results, and any failed batches. Keep personal inquiry content out of repository evidence. Confirm no stale vectors can return the removed claims.

Production reindex procedure (not performed):

1. Obtain separate authorization and an approved maintenance/change window. Keep the previous build/index configuration and last reviewed corpus for rollback. Do not delete a production index as part of this implementation.
2. Prepare a fresh production candidate index rather than only upserting changed IDs into the old index. Legacy sample IDs and scraped chunk IDs can leave obsolete documents behind; an additive upload cannot prove old unsupported claims are gone.
3. Populate the approved sample corpus and scrape the reviewed public production origin into the candidate index. Validate coverage and upload counts, then run the same retrieval/evidence checks used for staging.
4. Switch the production RAG service's index configuration only after the candidate has passed review. Deploy the updated assistant behavior prompt with it. Verify actual retrieved answers and follow-up delivery using the separately authorized production validation protocol.
5. Monitor errors manually during the change window. If rollback is needed, select a reviewed code/index pair that contains approved claims; restoring an old unreviewed index can reintroduce removed content. Index retention/deletion is a separate owner-controlled action.

The Google search sitemap/recrawl process is separate from Jarvis retrieval indexing. Search Console submission, profile edits, live production queries that create leads, production reindexing, and ongoing monitoring are not part of this implementation.
