# Story-004: Cut Over Nameservers at name.com

- **Status:** done
- **Epic:** [Epic-001](../epic/001-aws-to-vercel-migration.md)
- **Created:** 2026-05-04

## Description

Update fanglin.me nameservers at name.com from AWS Route 53 to Vercel nameservers.

## Acceptance Criteria

- [x] NS records updated at name.com to point to Vercel (ns1.vercel-dns.com, ns2.vercel-dns.com)
- [x] DNS propagation verified
- [x] Main site resolves correctly via new nameservers

## Notes

- Consider lowering TTL on Route 53 records 24-48h before cutover to reduce propagation impact
- See [Runbook-001](../runbook/001-dns-cutover.md) for detailed procedure
