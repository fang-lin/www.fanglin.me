# Runbook-001: DNS Cutover (Route 53 → Vercel)

- **Last updated:** 2026-05-04
- **Owner:** Fang Lin

## When to Use

When ready to switch fanglin.me nameservers from AWS Route 53 to Vercel.

## Prerequisites

- [ ] All sites deployed and working on Vercel preview URLs
- [ ] Custom domains configured on Vercel
- [ ] Email DNS records (MX, SPF, DKIM) added on Vercel DNS
- [ ] name.com account access confirmed
- [ ] Vercel nameserver addresses obtained from Vercel dashboard

## Steps

1. **Lower TTL (24-48h before cutover)**
    - In Route 53, lower TTL on all A/CNAME records to 60s
    - Wait for old TTL to expire

2. **Verify Vercel readiness**

    ```bash
    # Check each site on Vercel preview URL
    curl -I https://<vercel-preview-url>
    ```

3. **Verify email records on Vercel DNS**

    ```bash
    # These should return correct values from Vercel DNS
    dig MX fanglin.me @<vercel-ns>
    dig TXT fanglin.me @<vercel-ns>
    dig TXT s1._domainkey.fanglin.me @<vercel-ns>
    ```

4. **Update nameservers at name.com**
    - Log in to https://www.name.com/
    - Navigate to fanglin.me domain settings
    - Change NS records to Vercel nameservers
    - Save changes

5. **Monitor propagation**

    ```bash
    # Check NS propagation
    dig NS fanglin.me

    # Check main site (本 repo 范围)
    curl -I https://fanglin.me
    curl -I https://www.fanglin.me

    # Check sub-sites (各自 repo 负责验证，这里仅做冒烟测试)
    curl -I https://plotter.fanglin.me
    curl -I https://algorythm.fanglin.me
    curl -I https://game-of-life.fanglin.me
    curl -I https://blog.fanglin.me
    ```

6. **Test email**
    - Send a test email TO @fanglin.me
    - Send a test email FROM @fanglin.me

## Verification

- All sites load with valid SSL
- Email send/receive works
- `dig NS fanglin.me` returns Vercel nameservers

## Rollback

1. Revert NS records at name.com back to AWS Route 53 nameservers:
    - ns-xxx.awsdns-xx.org
    - ns-xxx.awsdns-xx.co.uk
    - ns-xxx.awsdns-xx.com
    - ns-xxx.awsdns-xx.net
2. Wait for propagation (up to 48h, but usually faster with low TTL)
3. Verify sites resolve via CloudFront again
