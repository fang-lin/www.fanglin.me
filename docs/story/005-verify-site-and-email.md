# Story-005: Verify Site and Email

- **Status:** blocked
- **Epic:** [Epic-001](../epic/001-aws-to-vercel-migration.md)
- **Created:** 2026-05-04

## Description

After DNS cutover, verify that the main site resolves correctly and email still works.

## Acceptance Criteria

- [x] https://fanglin.me loads correctly (200)
- [x] https://www.fanglin.me redirects to fanglin.me (307)
- [x] SSL certificates valid on both domains (HTTP/2)
- [ ] Send test email TO @fanglin.me — received (待手动测试)
- [ ] Send test email FROM @fanglin.me — delivered (待手动测试)
