# Story-003: Add Email DNS Records on Vercel

- **Status:** done
- **Epic:** [Epic-001](../epic/001-aws-to-vercel-migration.md)
- **Created:** 2026-05-04

## Description

Add MX, SPF, and DKIM records on Vercel DNS to preserve 163 email functionality.

### Records to Add

| Type | Name | Value |
|------|------|-------|
| MX | fanglin.me | 1 mx.ym.163.com |
| TXT | fanglin.me | v=spf1 include:spf.163.com ~all |
| TXT | s1._domainkey.fanglin.me | k=rsa; p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDq9zA5n5fij4yxUR6IDdNbFdixOWZu1MxESl+R7HivnX4zh/7Nk7idfxl2XkAwg8wXsyQAsHWpfGivpDuGDNQvSSEKGKFbtd/3ih4mSTTZWdeF8Y3ROTx4Q/bCTA8P6hdfVfWv+jXGbzkJkxlmwDygQCb4BdAnfrBy4DcmeJhEEQIDAQAB |

## Acceptance Criteria

- [x] All three email DNS records created on Vercel
- [x] Records verified via Vercel API
