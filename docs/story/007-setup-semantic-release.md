# Story-007: Setup Semantic Release

- **Status:** done
- **Epic:** [Epic-001](../epic/001-aws-to-vercel-migration.md)
- **Created:** 2026-05-04

## Description

Add semantic-release, commitlint, and husky to align with other repos (function-plotter, game-of-life, leben-in-de).

### Configuration Pattern (from leben-in-de)
- `.commitlintrc.json` — extends `@commitlint/config-conventional`
- `.releaserc.json` — conventionalcommits preset, changelog, git, github plugins
- Husky for pre-commit hooks
- Branch: `main`

## Acceptance Criteria

- [x] semantic-release configured with conventionalcommits preset
- [x] commitlint enforcing conventional commits via husky
- [x] GitHub Actions release job added to pipeline
- [x] CHANGELOG.md generated on release
