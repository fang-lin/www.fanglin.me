# Story-001: Deploy www.fanglin.me to Vercel

- **Status:** done
- **Epic:** [Epic-001](../epic/001-aws-to-vercel-migration.md)
- **Created:** 2026-05-04

## Description

Replace the existing GitHub Actions pipeline (Terraform → AWS S3/CloudFront) with a Vercel deployment pipeline.

### Current State
- Pipeline: `.github/workflows/build-and-deploy.yml`
- Build: `npm run build` → copies index.html to `build/`
- Deploy: Terraform applies to AWS (S3 + CloudFront)
- Secrets: `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`

### Target State
- Deploy to Vercel via GitHub Actions using `vercel deploy --prod`
- Secrets: `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`

## Acceptance Criteria

- [x] GitHub Actions pipeline updated to deploy to Vercel
- [x] Push to main triggers production deployment
- [x] PR triggers preview deployment
- [x] Site renders correctly on Vercel
- [x] Old AWS/Terraform deploy steps removed
- [x] GitHub secrets configured: VERCEL_TOKEN, VERCEL_ORG_ID, VERCEL_PROJECT_ID
