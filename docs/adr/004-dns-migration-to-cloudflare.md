# ADR-004: Migrate DNS from Vercel to Cloudflare

- **Status:** accepted
- **Date:** 2026-05-04
- **Supersedes:** Parts of ADR-001 (DNS section)

## Context

After migrating from AWS Route 53 to Vercel DNS (ADR-001), the domain registrar (name.com) was subsequently moved to Cloudflare, which automatically took over DNS management. This made the Vercel DNS zone redundant.

Additionally, Cloudflare DNS is a prerequisite for future use of Cloudflare R2 image hosting (ADR-003).

## Options Considered

### Option A: Keep Vercel DNS

- Pros: No migration work
- Cons: Redundant — registrar already on Cloudflare, two DNS providers is confusing

### Option B: Use Cloudflare DNS

- Pros: Unified with registrar, prerequisite for R2, more DNS features (proxy, page rules)
- Cons: DNS records need to be reconfigured on Cloudflare

## Decision

Cloudflare DNS (Option B). All DNS records managed on Cloudflare.

## Configuration

### DNS Records on Cloudflare

| Type  | Name           | Target                              | Proxy |
| ----- | -------------- | ----------------------------------- | ----- |
| A     | fanglin.me     | 216.198.79.1                        | off   |
| CNAME | www            | bb27722402bd6af9.vercel-dns-017.com | off   |
| CNAME | algorythm      | cname.vercel-dns.com                | off   |
| CNAME | plotter        | cname.vercel-dns.com                | off   |
| CNAME | game-of-life   | cname.vercel-dns.com                | off   |
| MX    | fanglin.me     | 1 mx.ym.163.com                     | -     |
| TXT   | fanglin.me     | v=spf1 include:spf.163.com ~all     | -     |
| TXT   | s1.\_domainkey | (DKIM key)                          | -     |
| CAA   | fanglin.me     | 0 issue "letsencrypt.org"           | -     |

### Key Decisions

- **Proxy off** for all Vercel-served domains — avoid double CDN (Cloudflare + Vercel)
- **Proxy on** for future `img.fanglin.me` (Cloudflare R2) — needs Cloudflare CDN
- **CAA** restricted to letsencrypt.org only (Vercel's certificate issuer)
- **Vercel DNS zone disabled** — records and zone cleaned up

## Consequences

- Single place to manage all DNS (Cloudflare Dashboard)
- Vercel handles SSL certificates via Let's Encrypt
- Ready for Cloudflare R2 integration (ADR-003)
- Sub-site repos need CNAME records pointing to `cname.vercel-dns.com`
