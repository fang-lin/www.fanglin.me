# Story-009: Dynamic Footer with Year and Version

- **Status:** done
- **Epic:** [Epic-001](../epic/001-aws-to-vercel-migration.md)
- **Created:** 2026-05-04

## Description

Make the footer copyright year dynamic and display the app version from package.json.

### Implementation

- Year: `new Date().getFullYear()` injected via inline `<script type="module">`
- Version: `__APP_VERSION__` defined in `vite.config.js`, reads from `package.json` at build time
- semantic-release bumps `package.json` version, so the footer version stays in sync automatically

## Acceptance Criteria

- [x] Copyright year updates automatically
- [x] App version displayed in footer
- [x] Version sourced from package.json via Vite define
