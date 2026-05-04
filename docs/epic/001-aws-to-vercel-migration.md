# Epic-001: www.fanglin.me AWS to Vercel Migration

- **Status:** in-progress
- **Created:** 2026-05-04
- **ADR:** [ADR-001](../adr/001-migrate-from-aws-to-vercel.md)

## Goal

Migrate the main portal site (www.fanglin.me / fanglin.me) from AWS (S3 + CloudFront) to Vercel, then decommission the corresponding AWS resources.

## Background

This repo is the entry point for fanglin.me. Sub-sites (plotter, algorythm, game-of-life, blog) are independent microservices that manage their own deployments.

### Key Constraints

- 163 email must keep working (MX/SPF/DKIM records)
- Domain registrar is name.com (NS change happens there)
- DNS and NS cutover affects all sub-sites, requires coordination

## Scope

### In Scope

- Deploy www.fanglin.me to Vercel
- Configure fanglin.me / www.fanglin.me custom domains
- Migrate DNS records (including email records)
- Cut over nameservers at name.com
- Decommission AWS resources for this site (S3 buckets: fanglin.me, www.fanglin.me; CloudFront: E1CN3NIPJAF6TQ, E1UAQPR8AR7TBM)

### Out of Scope

- Sub-site deployments (plotter, algorythm, game-of-life, blog) — each repo handles its own migration
- me-in.xyz (will be deleted separately)
- oauth.fanglin.me (ELB already gone)

## Stories

| #   | Story                                                                                  | Status  |
| --- | -------------------------------------------------------------------------------------- | ------- |
| 001 | [Deploy www.fanglin.me to Vercel](../story/001-deploy-www-to-vercel.md)                | done    |
| 002 | [Configure custom domains on Vercel](../story/002-configure-custom-domains.md)         | done    |
| 003 | [Add email DNS records on Vercel](../story/003-add-email-dns-records.md)               | done    |
| 004 | [Cut over nameservers at name.com](../story/004-cutover-nameservers.md)                | done    |
| 005 | [Verify site and email](../story/005-verify-site-and-email.md)                         | blocked |
| 006 | [Decommission AWS resources for main site](../story/006-decommission-aws-resources.md) | done    |

| 007 | [Setup semantic release](../story/007-setup-semantic-release.md) | done |
| 008 | [Migrate to Vite](../story/008-migrate-to-vite.md) | done |
| 009 | [Dynamic footer with year and version](../story/009-dynamic-footer.md) | done |
| 010 | [Preview versioning for PR deployments](../story/010-preview-versioning.md) | done |

## Risks & Dependencies

- DNS/NS cutover affects all sub-sites — coordinate with other repos before switching
- Email disruption if DNS records are misconfigured during cutover
- TTL propagation delay during NS change (mitigate by lowering TTL in advance)

## Decisions

- [ADR-001: Migrate from AWS to Vercel](../adr/001-migrate-from-aws-to-vercel.md)
