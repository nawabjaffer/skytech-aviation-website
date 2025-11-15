# Deployment Scripts

This folder contains automated deployment scripts for the Skytech Aviation website.

## 📜 Available Scripts

### 1. deploy-netlify.sh
**Purpose:** Automated deployment to Netlify with custom domain configuration

**Features:**
- Checks for netlify-cli installation (auto-installs if missing)
- Backs up configuration files (vite.config.ts, app.tsx)
- Updates base path to `/` for custom domain
- Updates Router basename to `/`
- Builds the project
- Deploys to Netlify
- Restores configuration on failure
- Cleanup of temporary files

**Usage:**
```bash
chmod +x scripts/deploy-netlify.sh
./scripts/deploy-netlify.sh
```

**Prerequisites:**
- Node.js and npm installed
- Netlify account (free tier available)

**Post-deployment:**
1. Configure custom domain in Netlify dashboard
2. Add DNS records at nic.ae
3. Enable HTTPS (automatic)

---

### 2. deploy-aws.sh
**Purpose:** Automated deployment to AWS S3 + CloudFront (Dubai region)

**Features:**
- Verifies AWS CLI installation
- Validates AWS credentials
- Creates S3 bucket in Dubai region (me-south-1)
- Configures static website hosting
- Sets up public bucket policy
- Uploads files with smart cache control
  - Static assets: 1-year cache
  - HTML files: no cache (always fresh)
- Invalidates CloudFront cache
- Configuration backup/restore

**Usage:**
```bash
chmod +x scripts/deploy-aws.sh
# Edit script to add CloudFront distribution ID
./scripts/deploy-aws.sh
```

**Configuration:**
```bash
BUCKET_NAME="skytechaviation.ae"
REGION="me-south-1"  # Dubai region
CLOUDFRONT_DISTRIBUTION_ID=""  # Fill this from AWS Console
```

**Prerequisites:**
- AWS CLI installed and configured
- AWS account with appropriate permissions
- CloudFront distribution created

**Post-deployment:**
1. Create CloudFront distribution pointing to S3 bucket
2. Request SSL certificate from AWS Certificate Manager
3. Configure DNS at nic.ae with CloudFront domain
4. Wait for DNS propagation (24-48 hours)

---

### 3. restore-github-pages.sh
**Purpose:** Restore configuration for GitHub Pages deployment

**Features:**
- Restores `vite.config.ts` with base path `/skytech-aviation-website/`
- Restores `app.tsx` with basename `/skytech-aviation-website`
- Uses backups if available, otherwise updates manually
- Rebuilds project for GitHub Pages
- Cleanup of temporary files

**Usage:**
```bash
chmod +x scripts/restore-github-pages.sh
./scripts/restore-github-pages.sh
```

**When to use:**
- After deploying to custom domain
- When switching back to GitHub Pages
- To reset to default GitHub Pages configuration

**Post-restore:**
```bash
git add -A
git commit -m "Restore GitHub Pages configuration"
git push origin main
```

---

## 🔄 Deployment Workflow

### Switching Between Deployments

**From GitHub Pages to Custom Domain (Netlify):**
```bash
./scripts/deploy-netlify.sh
# Configure custom domain in Netlify
# Update DNS at nic.ae
```

**From GitHub Pages to Custom Domain (AWS):**
```bash
# Edit deploy-aws.sh with CloudFront ID
./scripts/deploy-aws.sh
# Update DNS at nic.ae
```

**Back to GitHub Pages:**
```bash
./scripts/restore-github-pages.sh
git push origin main
```

---

## ⚙️ Configuration Changes

Each deployment script modifies two key files:

### vite.config.ts
```typescript
// GitHub Pages
base: '/skytech-aviation-website/'

// Custom Domain
base: '/'
```

### src/app.tsx
```typescript
// GitHub Pages
<Router basename="/skytech-aviation-website">

// Custom Domain
<Router basename="/">
```

Scripts automatically backup and restore these configurations.

---

## 🛡️ Safety Features

All scripts include:
- ✅ **Backup/Restore** - Automatic configuration backups
- ✅ **Error Handling** - Restores on failure
- ✅ **Validation** - Checks prerequisites before starting
- ✅ **Cleanup** - Removes temporary files
- ✅ **User Guidance** - Clear next steps after completion

---

## 📊 Deployment Comparison

| Script | Platform | Cost | Setup | Speed | UAE-Optimized |
|--------|----------|------|-------|-------|---------------|
| deploy-netlify.sh | Netlify | FREE | Very Easy | Excellent | No |
| deploy-aws.sh | AWS S3+CF | $5-50/mo | Medium | Excellent | Yes (Dubai) |
| restore-github-pages.sh | GitHub Pages | FREE | Easy | Good | No |

**Recommendation:**
- **For ease of use:** `deploy-netlify.sh`
- **For UAE audience:** `deploy-aws.sh` (Dubai region)
- **For free hosting:** `restore-github-pages.sh`

---

## 🐛 Troubleshooting

### Script Permission Denied
```bash
chmod +x scripts/*.sh
```

### Netlify CLI Not Found
Script will auto-install, or manually:
```bash
npm install -g netlify-cli
```

### AWS CLI Not Found
Install from: https://aws.amazon.com/cli/
```bash
# macOS
brew install awscli

# Configure credentials
aws configure
```

### Backup Files Not Found
Scripts will use sed to update files directly.

### Build Fails
Check Node.js version (requires 20.19+ or 22.12+):
```bash
node --version
```

---

## 📚 Related Documentation

- [Deployment Guides](../docs/deployment/) - Comprehensive deployment documentation
- [GitHub Pages Guide](../docs/deployment/GITHUB_PAGES_DEPLOYMENT.md) - GitHub Pages setup
- [Custom Domain Guide](../docs/deployment/CUSTOM_DOMAIN_DEPLOYMENT.md) - All custom domain options

---

## 🔒 Security Notes

- **Never commit** `.env` files with API keys
- **Keep AWS credentials** secure (use IAM roles when possible)
- **Use HTTPS** for all production deployments
- **Rotate API keys** periodically
- **Review bucket policies** before making public

---

*All scripts are designed to be idempotent and can be run multiple times safely.*
