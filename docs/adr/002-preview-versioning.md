# ADR-002: Preview Versioning for PR Deployments

- **Status:** accepted
- **Date:** 2026-05-04

## Context

After migrating to Vercel with a CI/CD pipeline (lint → release → deploy), PR preview deployments have no version identifier. The footer displays the last released version from package.json, making it impossible to tell which PR/commit a preview corresponds to.

Vercel preview URLs contain random hashes (`fanglin-xstrr4inu-...vercel.app`) that are not human-readable.

## Options Considered

### Option A: semantic-release pre-release branches

- Pros: Built-in semver support, integrates with npm ecosystem
- Cons: Designed for named branches (beta, next), not arbitrary PR branches. Would require a dedicated pre-release branch per PR — too heavy.

### Option B: Pipeline-generated preview version string

- Pros: Simple, no new dependencies, follows SemVer pre-release spec, version only exists during build — no git history pollution
- Cons: Not managed by semantic-release, version is ephemeral

### Option C: No preview versioning

- Pros: No work needed
- Cons: Can't distinguish preview deployments, poor traceability

## Decision

Option B — generate preview version in the pipeline.

Format: `{current_version}-pr.{pr_number}.{short_sha}`
Example: `1.2.0-pr.1.abc1234`

This follows the [SemVer pre-release specification](https://semver.org/#spec-item-9).

### How it works

1. `deploy-preview` job reads current version from package.json
2. Appends `-pr.{PR#}.{commit_hash}` to form the preview version
3. Passes it to Vite build via `VITE_APP_VERSION` environment variable
4. `vite.config.js` reads `VITE_APP_VERSION` if set, otherwise falls back to package.json version
5. Preview version is displayed in the footer and included in the PR comment alongside the preview URL

### What semantic-release still does

semantic-release remains responsible for production versioning only — analyzing commit messages on main, bumping package.json, creating tags, and generating the changelog. It is not involved in preview versioning at all.

## Consequences

- Every PR preview deployment has a traceable version identifier
- PR comments show both version and preview URL
- No changes to the release flow — semantic-release continues to manage production versions
- Preview versions are ephemeral — they exist only in the deployed build, never in git
