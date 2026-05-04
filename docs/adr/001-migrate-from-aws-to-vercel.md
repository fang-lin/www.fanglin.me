# ADR-001: Migrate from AWS to Vercel

- **Status:** accepted
- **Date:** 2026-05-04

## Context

Personal website (fanglin.me) and several subdomains are hosted on AWS using S3 + CloudFront + Route 53. The setup works but:

- Monthly cost ~$2 for essentially static sites
- AWS infrastructure is over-provisioned for the use case (8 S3 buckets, 5 CloudFront distributions, 2 Route 53 zones)
- Vercel provides simpler deployment workflow with GitHub integration
- Already using Vercel for other projects (leben-in-de, x-wind-frontend)

## Options Considered

### Option A: Stay on AWS

- Pros: No migration effort, already working
- Cons: Ongoing cost, complex infrastructure for simple static sites, two hosting platforms to manage

### Option B: Migrate to Vercel

- Pros: Zero cost for static sites, simpler deployment, unified platform, automatic SSL, GitHub integration
- Cons: Migration effort, DNS cutover risk, Vercel DNS limitations vs Route 53

### Option C: Migrate to Cloudflare Pages

- Pros: Free, good performance, strong DNS
- Cons: Yet another platform, no existing projects there

## Decision

Migrate to Vercel (Option B). Consolidate all static sites onto one platform.

## Consequences

- Simpler infrastructure: one platform instead of S3 + CloudFront + Route 53
- Must preserve email DNS records (MX, SPF, DKIM for 163 email)
- me-in.xyz domain will not be migrated (decision to let it go)
- oauth.fanglin.me will not be migrated (ELB already gone)
- Save ~$2/month on AWS
