# CLAUDE.md

This is the AnchorSpec marketing/docs site (Astro), deployed to GitHub Pages via `.github/workflows/pages.yml` on push to `main`. Deliberately kept as a separate repo/history from [AnchorSpec/AnchorSpec](https://github.com/AnchorSpec/AnchorSpec) (the CLI) — consolidating into one repo would simplify docs sync but was rejected to keep this repo's history independent of the CLI's release/PR churn.

## Versioned docs (`src/docs/v{version}/`)

These are mirrored from `AnchorSpec/AnchorSpec`'s rebranded `docs/` output, not authored here. Do not hand-edit content under `src/docs/` — edit it upstream in `AnchorSpec/AnchorSpec/docs/` instead and let the sync bring it over, or your change will be overwritten by the next sync.

The mirror is automated: `AnchorSpec/AnchorSpec`'s `release-prepare.yml` fires a `repository_dispatch` (`anchorspec-release`) to this repo on every actual publish, which runs `.github/workflows/sync-docs.yml` here. That workflow copies the new version's `docs/` into `src/docs/v{version}/` and rewrites the `VERSIONS` array + redirect in `src/pages/docs/` (via `scripts/add-doc-version.mjs`), then opens a PR — merging is still manual, which is what triggers the GH Pages deploy.

Both repos share the "AnchorSpec Release" GitHub App and its org secrets (`RELEASE_APP_ID`, `RELEASE_APP_PRIVATE_KEY`) for this — see `AnchorSpec/AnchorSpec`'s CLAUDE.md "Documentation" and "Release token" sections for the full auth story.

To backfill a version that was missed, or re-run by hand: trigger `sync-docs.yml` via `workflow_dispatch` with the version number, or run `node scripts/add-doc-version.mjs <version> <path-to-docs-dir>` locally against a checkout of `AnchorSpec/AnchorSpec` at that tag.
