# Review and rollback

No deployment, commit, push, profile change, social post, CRM test inquiry, or production reindex was performed by this implementation. The working tree remains available for review.

Before any future release, create a deliberate commit/patch containing only acquisition work. The checkout already had five user-owned files recorded in `preserved-work.json`: About page changes, its component/styles/test, and the root Jest configuration. Keep those changes intact when selecting a release or rollback scope. Do not run a broad reset/checkout/clean against this mixed working tree.

For a local rollback, first save the full current diff and untracked files to a separate review artifact. Revert only reviewed acquisition edits through a patch or editor; remove only the new acquisition files selected in that patch. Use `prior-metadata-and-content.json` as a comparison source for prior metadata/content, not as an automated overwrite script. It does not cover every changed file. Re-run the preserved-work hash check and the original suites after rollback.

For a later deployed release, use the hosting provider's previous reviewed deployment or revert the dedicated acquisition commit in a new release. Keep Contact's SMTP configuration and Jarvis's CRM/RAG settings intact. No schema migration or new CRM properties are introduced here. If code and retrieval data have both changed, coordinate a reviewed code/index pair; an older unreviewed index may contain removed unsupported claims. Follow the separate knowledge-refresh procedure for any index rollback or change.

Re-run tests, lint, production build, initial HTML/link checks, and the browser smoke checklist after a rollback. Account configuration changes and externally published posts are separate changes with their own audit/rollback process; none were made here.
