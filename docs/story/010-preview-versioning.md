# Story-010: Preview Versioning for PR Deployments

- **Status:** in-progress
- **Epic:** [Epic-001](../epic/001-aws-to-vercel-migration.md)
- **Created:** 2026-05-04
- **ADR:** [ADR-002](../adr/002-preview-versioning.md)

## Description

Generate a SemVer-compliant preview version for PR deployments and display it in the footer and PR comment.

### Implementation Steps

1. Update `vite.config.js` to read `VITE_APP_VERSION` env var with fallback to package.json
2. Update `deploy-preview` job to:
    - Compute preview version: `{version}-pr.{PR#}.{short_sha}`
    - Pass as `VITE_APP_VERSION` to `vercel build`
    - Include version in PR comment alongside preview URL

## Acceptance Criteria

- [ ] vite.config.js supports VITE_APP_VERSION override
- [ ] Preview builds show version like `1.2.0-pr.1.abc1234` in footer
- [ ] PR comment includes both version and preview URL
- [ ] Production builds are unaffected (still use package.json version)
