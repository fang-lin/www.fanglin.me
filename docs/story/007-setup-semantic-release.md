# Story-007: Setup Semantic Release

- **Status:** done
- **Epic:** [Epic-001](../epic/001-aws-to-vercel-migration.md)
- **Created:** 2026-05-04

## Description

Add semantic-release, commitlint, husky, eslint, prettier, and npm audit to align with other repos (function-plotter, game-of-life, leben-in-de).

### Pipeline structure: CI → Release → Deploy

- **CI:** lint, prettier check, npm audit, build
- **Release:** semantic-release (version bump, changelog, GitHub release)
- **Deploy:** Vercel production deploy

## Acceptance Criteria

- [x] semantic-release configured with conventionalcommits preset
- [x] commitlint enforcing conventional commits via husky
- [x] GitHub Actions release job added to pipeline
- [x] CHANGELOG.md generated on release
- [x] ESLint configured with prettier integration
- [x] Prettier configured (shared config from leben-in-de)
- [x] npm audit in CI pipeline
- [x] Node.js upgraded to 22
