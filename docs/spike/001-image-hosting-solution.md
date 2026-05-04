# Spike-001: Image Hosting Solution

- **Status:** concluded
- **Time-box:** 1 day
- **Created:** 2026-05-04

## Question

What is the best way to host and serve images for fanglin.me, replacing the current Flickr dependency?

## Background

Current state: images are loaded from `live.staticflickr.com`. Problems:

- Third-party dependency — Flickr can change API/terms/pricing
- Free account limited to 1000 photos
- URLs not human-readable, bad for SEO
- No control over image format, caching, or optimization

## Requirements

- Self-hosted, no dependency on third-party image services
- CDN delivery for fast global access
- Custom domain support (e.g., `img.fanglin.me`)
- Low/zero cost for personal use
- Simple to upload and manage images

## Candidates

1. Cloudflare R2
2. Vercel Blob
3. AWS S3 + CloudFront (what we just left)

## Investigation

### 1. Cloudflare R2

**Pricing (free tier):**

- Storage: 10 GB/month free
- Class A operations (writes): 1M/month free
- Class B operations (reads): 10M/month free
- Egress: always free (zero egress fees)

**Features:**

- S3-compatible API
- Custom domain via Cloudflare (free CDN included)
- Public bucket support
- Dashboard + CLI (`wrangler`) for management
- No vendor lock-in (S3 API)

**Setup needed:**

- Cloudflare account (free)
- Create R2 bucket
- Bind custom domain `img.fanglin.me`
- DNS: add CNAME in Vercel DNS pointing to Cloudflare
- Upload images via wrangler CLI or dashboard

**Concerns:**

- DNS split: fanglin.me on Vercel DNS, img.fanglin.me pointing to Cloudflare
- Need Cloudflare account (new vendor)

### 2. Vercel Blob

**Pricing:**

- Hobby plan: no Blob storage included
- Pro plan ($20/mo): includes some storage
- Pay-as-you-go after that

**Features:**

- Vercel CLI / SDK management
- Public and private blob support
- No custom domain — URL is `*.public.blob.vercel-storage.com`

**Concerns:**

- No free tier for Hobby plan
- No custom domain support
- URL not SEO-friendly

### 3. AWS S3 + CloudFront

- We just migrated away from AWS to reduce complexity
- Would re-introduce AWS dependency
- Not considered further

## Findings

| Criteria              | Cloudflare R2                    | Vercel Blob           |
| --------------------- | -------------------------------- | --------------------- |
| Free tier             | 10GB storage, unlimited egress   | None on Hobby         |
| Custom domain         | Yes (`img.fanglin.me`)           | No                    |
| CDN                   | Cloudflare global CDN, free      | Vercel Edge           |
| SEO-friendly URLs     | Yes (`img.fanglin.me/photo.jpg`) | No (random hash URLs) |
| Management            | wrangler CLI, Dashboard, S3 API  | Vercel CLI, SDK       |
| Platform consistency  | Different vendor                 | Same vendor           |
| Cost for personal use | $0                               | $20/mo minimum        |

## Recommendation

**Cloudflare R2** is the clear choice:

- Zero cost for personal use
- Custom domain with CDN included
- S3-compatible API (no lock-in)
- SEO-friendly URLs
- Only trade-off is adding Cloudflare as a vendor, but it's limited to image hosting

Next step: write ADR and create implementation story.
