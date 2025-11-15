# Deployment Documentation

This folder contains comprehensive deployment guides for the Skytech Aviation website.

## 📄 Available Guides

### 1. GitHub Pages Deployment
**File:** `GITHUB_PAGES_DEPLOYMENT.md`

Step-by-step guide for deploying to GitHub Pages, including:
- Configuration requirements
- Troubleshooting 404 errors
- Asset path configuration
- GitHub Actions workflow

**Current deployment:** https://nawabjaffer.github.io/skytech-aviation-website/

---

### 2. Custom Domain Deployment
**File:** `CUSTOM_DOMAIN_DEPLOYMENT.md`

Comprehensive guide for deploying with a custom domain from nic.ae (UAE domain registrar).

**Includes 5 deployment options:**

#### Option 1: GitHub Pages + Custom Domain (FREE)
- Easiest setup
- Free SSL certificate
- DNS configuration for nic.ae

#### Option 2: Netlify (FREE tier)
- Auto-deployments from Git
- Free SSL certificate
- Best for continuous deployment
- **Automated script:** `../../scripts/deploy-netlify.sh`

#### Option 3: Vercel (FREE tier)
- React-optimized
- Serverless functions support
- Global CDN

#### Option 4: UAE Traditional Hosting
- cPanel hosting
- Local UAE servers
- $50-200/year

#### Option 5: AWS S3 + CloudFront
- Professional scalable solution
- Dubai region (me-south-1) for UAE optimization
- ~$5-50/month
- **Automated script:** `../../scripts/deploy-aws.sh`

---

## 🚀 Quick Start

### For GitHub Pages
```bash
# Already configured - just push to main branch
git push origin main
```

### For Custom Domain (Netlify)
```bash
chmod +x ../../scripts/deploy-netlify.sh
../../scripts/deploy-netlify.sh
```

### For Custom Domain (AWS)
```bash
chmod +x ../../scripts/deploy-aws.sh
# Edit script to add CloudFront distribution ID
../../scripts/deploy-aws.sh
```

---

## 📋 Deployment Checklist

- [ ] Choose deployment platform
- [ ] Register domain (if using custom domain)
- [ ] Configure DNS records at nic.ae
- [ ] Run deployment script or manual deployment
- [ ] Enable HTTPS/SSL certificate
- [ ] Test all pages and routes
- [ ] Verify Google Sheets integration works
- [ ] Check mobile responsiveness
- [ ] Test dark mode
- [ ] Verify multilingual support (EN/AR/RU)

---

## 🔧 Related Files

- **Deployment Scripts:** `../../scripts/`
  - `deploy-netlify.sh` - Automated Netlify deployment
  - `deploy-aws.sh` - Automated AWS S3+CloudFront deployment
  - `restore-github-pages.sh` - Restore GitHub Pages configuration

- **Configuration Files:**
  - `../../vite.config.ts` - Build configuration with base path
  - `../../src/app.tsx` - Router configuration with basename
  - `../../.github/workflows/deploy.yml` - GitHub Actions workflow

---

## 📞 Support

For deployment issues or questions:
- Check troubleshooting sections in the guides
- Review GitHub Actions logs
- Contact nic.ae support for domain/DNS issues
- AWS/Netlify/Vercel support for platform-specific issues
