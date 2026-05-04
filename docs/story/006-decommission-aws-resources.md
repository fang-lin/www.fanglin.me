# Story-006: Decommission AWS Resources for Main Site

- **Status:** todo
- **Epic:** [Epic-001](../epic/001-aws-to-vercel-migration.md)
- **Created:** 2026-05-04

## Description

After successful migration verification, delete the AWS resources that served the main site.

### Resources to Delete

| Resource   | ID / Name                       |
| ---------- | ------------------------------- |
| CloudFront | E1CN3NIPJAF6TQ (fanglin.me)     |
| CloudFront | E1UAQPR8AR7TBM (www.fanglin.me) |
| S3 Bucket  | fanglin.me                      |
| S3 Bucket  | www.fanglin.me                  |

## Acceptance Criteria

- [ ] Both CloudFront distributions disabled and deleted
- [ ] Both S3 buckets emptied and deleted
- [ ] No AWS costs from these resources next month

## Notes

- Wait at least 48h after DNS cutover before deleting
- See [Runbook-002](../runbook/002-aws-resource-cleanup.md) for procedure
- Route 53 zone deletion and NS-level cleanup is a cross-cutting concern, do after all sub-sites have migrated
