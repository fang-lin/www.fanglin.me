# ADR-003: Use Cloudflare R2 for Image Hosting

- **Status:** proposed
- **Date:** 2026-05-04
- **Spike:** [Spike-001](../spike/001-image-hosting-solution.md)

## Context

The site currently loads images from Flickr (`live.staticflickr.com`). This is a third-party dependency with limited control over URLs, caching, and availability. The user plans to share more photos, so a scalable self-hosted solution is needed.

## Options Considered

### Option A: Cloudflare R2

- Pros: 10GB free, zero egress fees, global CDN included, custom domain, S3-compatible API, SEO-friendly URLs
- Cons: Adds Cloudflare as a new vendor, DNS split (Vercel DNS for site, CNAME to Cloudflare for images)

### Option B: Vercel Blob

- Pros: Same platform as the site
- Cons: No free tier on Hobby plan ($20/mo minimum), no custom domain, non-SEO-friendly URLs

### Option C: Stay on Flickr

- Pros: No work needed
- Cons: Third-party dependency, 1000 photo limit, no URL control, no SEO benefit

## Decision

Cloudflare R2 (Option A).

Images will be served from `img.fanglin.me`, backed by a Cloudflare R2 bucket with public access and Cloudflare CDN.

## Implementation

1. Create Cloudflare account and R2 bucket
2. Configure custom domain `img.fanglin.me` on Cloudflare
3. Add CNAME record in Vercel DNS: `img` → Cloudflare R2 endpoint
4. Upload images to R2 (via wrangler CLI or dashboard)
5. Update index.html to use `img.fanglin.me` URLs instead of Flickr

## Consequences

- Self-hosted images with full control over URLs and caching
- Zero cost within free tier (10GB storage, unlimited reads)
- SEO-friendly URLs (`img.fanglin.me/photos/castle.jpg`)
- Adds Cloudflare as a vendor, but limited to image storage only
- Can migrate away easily since R2 uses S3-compatible API
