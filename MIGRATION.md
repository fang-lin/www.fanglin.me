# AWS to Vercel Migration Plan

## AWS Account
- Account ID: 234939717553
- Region: ap-northeast-1 (primary)
- Domain registrar: https://www.name.com/

## Current AWS Resources

### S3 Buckets (8)
| Bucket | Purpose |
|--------|---------|
| fanglin.me | 主站（空） |
| www.fanglin.me | www 跳转 |
| plotter.fanglin.me | Function Plotter |
| algorythm.fanglin.me | 算法可视化 |
| game-of-life.fanglin.me | Game of Life |
| blog.fanglin.me | 博客 |
| gen-ai-test-file | 测试用 |
| terraform-state.fanglin.me | Terraform state |

### CloudFront Distributions (5)
| ID | Alias | Origin |
|----|-------|--------|
| E1CN3NIPJAF6TQ | fanglin.me | fanglin.me.s3-website-ap-northeast-1.amazonaws.com |
| E20RCSS5GCVIT9 | plotter.fanglin.me | plotter.fanglin.me.s3.ap-northeast-1.amazonaws.com |
| E2D1KX31FV85Q1 | game-of-life.fanglin.me | game-of-life.fanglin.me.s3.ap-northeast-1.amazonaws.com |
| E2JLEK4PGP9QBN | algorythm.fanglin.me | algorythm.fanglin.me.s3.ap-northeast-1.amazonaws.com |
| E1UAQPR8AR7TBM | www.fanglin.me | www.fanglin.me.s3.ap-northeast-1.amazonaws.com |

### Route 53 Hosted Zones (2)
#### fanglin.me (Zone ID: Z00276222VO273SVPQVKF) - 12 records
| Type | Name | Value |
|------|------|-------|
| A | fanglin.me | d13lj5579hlgko.cloudfront.net (alias) |
| MX | fanglin.me | 1 mx.ym.163.com |
| TXT | fanglin.me | "v=spf1 include:spf.163.com ~all" |
| CNAME | _57a46d7d2d8e28d2c9d5c4c3a3eea92d.fanglin.me | _526acf3d4af46fcec21f6cd83d5e9046.nhqijqilxf.acm-validations.aws. |
| TXT | s1._domainkey.fanglin.me | (DKIM key for 163 email) |
| CNAME | algorythm.fanglin.me | d3uhkk2i6b4kjy.cloudfront.net |
| CNAME | game-of-life.fanglin.me | dalc5rh51poc8.cloudfront.net |
| A | oauth.fanglin.me | dualstack.tutorial-lb-739290325.us-east-1.elb.amazonaws.com (ELB已不存在) |
| CNAME | plotter.fanglin.me | d2sy90g6irp9us.cloudfront.net |
| CNAME | www.fanglin.me | d1xhop4r1jkejh.cloudfront.net |
| NS | fanglin.me | (AWS nameservers) |
| SOA | fanglin.me | (SOA record) |

#### me-in.xyz (Zone ID: Z04547053SKLPRTQSXF72) - 3 records — TO BE DELETED
| Type | Name | Value |
|------|------|-------|
| A | me-in.xyz | 15.168.38.34 (EC2 已关闭) |
| NS | me-in.xyz | (AWS nameservers) |
| SOA | me-in.xyz | (SOA record) |

### Other
- ACM certificates (for CloudFront SSL)
- No running EC2 instances
- No RDS, Lambda, or ELB

## Vercel Account
- Team: "fang-lin's projects"
- Team ID: team_RFZOa8Hu64bBj05QK3LXXA69
- Existing projects: leben-in-de, x-wind-frontend

## Email Records (MUST PRESERVE)
These records must be recreated on Vercel DNS:
- MX: `fanglin.me` → `1 mx.ym.163.com`
- TXT (SPF): `fanglin.me` → `v=spf1 include:spf.163.com ~all`
- TXT (DKIM): `s1._domainkey.fanglin.me` → `k=rsa; p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDq9zA5n5fij4yxUR6IDdNbFdixOWZu1MxESl+R7HivnX4zh/7Nk7idfxl2XkAwg8wXsyQAsHWpfGivpDuGDNQvSSEKGKFbtd/3ih4mSTTZWdeF8Y3ROTx4Q/bCTA8P6hdfVfWv+jXGbzkJkxlmwDygQCb4BdAnfrBy4DcmeJhEEQIDAQAB`

## GitHub Repos (all sites are on GitHub)
- plotter.fanglin.me → ~/Projects/function-plotter
- www.fanglin.me → ~/Projects/www.fanglin.me
- Other repos need to be identified

## Migration Steps

### Step 1: Deploy sites to Vercel
Import each GitHub repo as a Vercel project and configure build settings.

### Step 2: Configure custom domains on Vercel
Bind each subdomain to the corresponding Vercel project.

### Step 3: Add email DNS records on Vercel
Add MX, SPF, and DKIM records for 163 email.

### Step 4: Change nameservers at name.com
Update fanglin.me NS from AWS to Vercel nameservers.

### Step 5: Verify everything works
- All sites resolve correctly
- Email still works (test sending/receiving)

### Step 6: Delete AWS resources (in order)
1. Delete me-in.xyz Route 53 zone
2. Disable and delete CloudFront distributions (5)
3. Empty and delete S3 buckets (8)
4. Delete fanglin.me Route 53 zone
5. Delete ACM certificates
6. Verify $0 bill next month

## Decisions Made
- me-in.xyz: 不保留，直接删除
- 163邮箱: 仍在使用，必须保留 MX/SPF/DKIM 记录
- oauth.fanglin.me: ELB 已不存在，不迁移

## Monthly Cost Savings
- Route 53: ~$1.00/month (2 hosted zones)
- EC2-Other: ~$0.88/month
- S3/CloudFront: negligible
- Total savings: ~$2/month
