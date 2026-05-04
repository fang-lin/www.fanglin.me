# Runbook-002: AWS Resource Cleanup

- **Last updated:** 2026-05-04
- **Owner:** Fang Lin

## When to Use

After DNS cutover is verified and stable (wait at least 48h).

## Prerequisites

- [ ] DNS cutover completed and verified ([Runbook-001](001-dns-cutover.md))
- [ ] All sites working on Vercel for at least 48h
- [ ] Email verified working
- [ ] AWS CLI configured with Account 234939717553

## Steps

### 1. Delete me-in.xyz Hosted Zone

```bash
# List records first
aws route53 list-resource-record-sets --hosted-zone-id Z04547053SKLPRTQSXF72

# Delete non-default records, then delete the zone
aws route53 delete-hosted-zone --id Z04547053SKLPRTQSXF72
```

### 2. Disable and Delete CloudFront Distributions

For each distribution: disable first, wait for status "Deployed", then delete.

| ID | Alias |
|----|-------|
| E1CN3NIPJAF6TQ | fanglin.me |
| E20RCSS5GCVIT9 | plotter.fanglin.me |
| E2D1KX31FV85Q1 | game-of-life.fanglin.me |
| E2JLEK4PGP9QBN | algorythm.fanglin.me |
| E1UAQPR8AR7TBM | www.fanglin.me |

```bash
# For each distribution:
aws cloudfront get-distribution-config --id <ID> > config.json
# Edit config: set Enabled=false, use ETag for update
aws cloudfront update-distribution --id <ID> --if-match <ETag> --distribution-config file://config.json
# Wait for deployment, then:
aws cloudfront delete-distribution --id <ID> --if-match <ETag>
```

### 3. Empty and Delete S3 Buckets

| Bucket |
|--------|
| fanglin.me |
| www.fanglin.me |
| plotter.fanglin.me |
| algorythm.fanglin.me |
| game-of-life.fanglin.me |
| blog.fanglin.me |
| gen-ai-test-file |
| terraform-state.fanglin.me |

```bash
# For each bucket:
aws s3 rm s3://<bucket-name> --recursive
aws s3 rb s3://<bucket-name>
```

> **Warning:** Back up terraform-state.fanglin.me before deleting if you want to keep the state history.

### 4. Delete fanglin.me Hosted Zone

```bash
# Delete all non-NS/SOA records first
aws route53 list-resource-record-sets --hosted-zone-id Z00276222VO273SVPQVKF
# Delete each record set, then:
aws route53 delete-hosted-zone --id Z00276222VO273SVPQVKF
```

### 5. Delete ACM Certificates

```bash
aws acm list-certificates --region us-east-1
# Delete each certificate:
aws acm delete-certificate --certificate-arn <arn> --region us-east-1
```

## Verification

```bash
# Confirm no remaining resources
aws s3 ls
aws cloudfront list-distributions
aws route53 list-hosted-zones
aws acm list-certificates --region us-east-1
```

- Next month's AWS bill should be $0

## Rollback

If you need to revert mid-cleanup, the remaining AWS resources will still be intact. The critical point of no return is deleting the Route 53 hosted zone — before that, you can always switch NS back.
