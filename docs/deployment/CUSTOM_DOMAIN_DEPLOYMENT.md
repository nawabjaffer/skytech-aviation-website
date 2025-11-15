# Custom Domain Deployment Guide (nic.ae)

## 🌐 Deploying to Custom Domain from nic.ae

This guide explains how to deploy your Skytech Aviation website to a custom domain registered with nic.ae (UAE domain registrar).

---

## 📋 Prerequisites

1. ✅ Domain registered with nic.ae (e.g., `skytechaviation.ae`)
2. ✅ Access to nic.ae DNS management panel
3. ✅ Hosting provider account (choose one below)
4. ✅ Website built and ready (`npm run build`)

---

## 🎯 Deployment Options

### Option 1: GitHub Pages + Custom Domain (Recommended - FREE)

#### Step 1: Configure Vite for Custom Domain

Update `vite.config.ts`:

```typescript
export default defineConfig({
  base: '/', // Change from '/skytech-aviation-website/' to '/' for custom domain
  // ... rest of config
});
```

Update `src/app.tsx`:

```tsx
<Router basename="/"> {/* Change from basename="/skytech-aviation-website" */}
  {/* Routes */}
</Router>
```

#### Step 2: Add CNAME File

Create `public/CNAME` file:

```
skytechaviation.ae
```

Or if using subdomain:
```
www.skytechaviation.ae
```

#### Step 3: Configure DNS at nic.ae

Login to nic.ae DNS management and add these records:

**For Apex Domain (skytechaviation.ae):**
```
Type: A
Name: @
Value: 185.199.108.153
TTL: 3600

Type: A
Name: @
Value: 185.199.109.153
TTL: 3600

Type: A
Name: @
Value: 185.199.110.153
TTL: 3600

Type: A
Name: @
Value: 185.199.111.153
TTL: 3600
```

**For WWW Subdomain:**
```
Type: CNAME
Name: www
Value: nawabjaffer.github.io
TTL: 3600
```

#### Step 4: Configure GitHub Pages

1. Go to Repository Settings → Pages
2. Under "Custom domain", enter: `skytechaviation.ae` or `www.skytechaviation.ae`
3. Check "Enforce HTTPS" (wait for SSL certificate to provision - takes 24 hours)
4. Save settings

#### Step 5: Rebuild and Deploy

```bash
# Rebuild with new base path
npm run build

# Commit and push
git add -A
git commit -m "Configure for custom domain deployment"
git push
```

**Site will be live at:** `https://skytechaviation.ae` or `https://www.skytechaviation.ae`

---

### Option 2: Netlify (Easy, Free Tier Available)

#### Step 1: Prepare Build Configuration

Create `netlify.toml` in project root:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "18"
```

Update `vite.config.ts`:
```typescript
export default defineConfig({
  base: '/', // Use root path for custom domain
  // ... rest of config
});
```

Update `src/app.tsx`:
```tsx
<Router basename="/"> {/* Use root basename */}
  {/* Routes */}
</Router>
```

#### Step 2: Deploy to Netlify

**Method A: Netlify CLI**
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Initialize new site
netlify init

# Deploy
netlify deploy --prod
```

**Method B: Netlify Dashboard**
1. Go to https://app.netlify.com
2. Click "Add new site" → "Import an existing project"
3. Connect your GitHub repository
4. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Click "Deploy site"

#### Step 3: Configure Custom Domain in Netlify

1. In Netlify dashboard, go to Site settings → Domain management
2. Click "Add custom domain"
3. Enter your domain: `skytechaviation.ae`
4. Netlify will provide DNS records

#### Step 4: Configure DNS at nic.ae

Add the DNS records provided by Netlify (example):

```
Type: A
Name: @
Value: 75.2.60.5 (Netlify's IP - check your Netlify dashboard)
TTL: 3600

Type: CNAME
Name: www
Value: your-site-name.netlify.app
TTL: 3600
```

**Site will be live at:** `https://skytechaviation.ae`

---

### Option 3: Vercel (Excellent for React, Free Tier)

#### Step 1: Prepare Configuration

Create `vercel.json` in project root:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

Update `vite.config.ts`:
```typescript
export default defineConfig({
  base: '/', // Use root path
  // ... rest of config
});
```

Update `src/app.tsx`:
```tsx
<Router basename="/"> {/* Use root basename */}
  {/* Routes */}
</Router>
```

#### Step 2: Deploy to Vercel

**Method A: Vercel CLI**
```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

**Method B: Vercel Dashboard**
1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Configure project:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Click "Deploy"

#### Step 3: Add Custom Domain in Vercel

1. In Vercel dashboard, go to Project Settings → Domains
2. Add domain: `skytechaviation.ae`
3. Vercel will provide DNS records

#### Step 4: Configure DNS at nic.ae

Add the DNS records from Vercel (example):

```
Type: A
Name: @
Value: 76.76.19.19 (Vercel's IP - check your dashboard)
TTL: 3600

Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

**Site will be live at:** `https://skytechaviation.ae`

---

### Option 4: Traditional UAE Hosting (cPanel/WHM)

Popular UAE hosting providers:
- **Emirati** (https://www.emirati.ae)
- **Web.ae** (https://web.ae)
- **GulfNet** (https://www.gulf.net.ae)
- **DU Business** (https://business.du.ae)

#### Step 1: Prepare Static Files

```bash
# Build production files
npm run build

# This creates dist/ folder with:
# - index.html
# - assets/ (CSS, JS files)
```

Update `vite.config.ts`:
```typescript
export default defineConfig({
  base: '/', // Use root path for domain root
  // OR
  base: '/skytech/', // If deploying to subdirectory
});
```

#### Step 2: Upload Files via FTP/cPanel

**Using cPanel File Manager:**
1. Login to your cPanel
2. Go to File Manager
3. Navigate to `public_html/` (or `www/` or `httpdocs/`)
4. Upload all files from `dist/` folder
5. Ensure `.htaccess` file exists (see below)

**Using FTP:**
```bash
# Using FileZilla or similar FTP client
Host: ftp.skytechaviation.ae
Username: (from hosting provider)
Password: (from hosting provider)
Port: 21

# Upload dist/* to public_html/
```

#### Step 3: Create .htaccess for React Router

Create `.htaccess` in `public_html/`:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME} !-l
  RewriteRule . /index.html [L]
</IfModule>

# Compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript
</IfModule>

# Browser Caching
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  ExpiresByType text/html "access plus 0 seconds"
</IfModule>

# Security Headers
<IfModule mod_headers.c>
  Header set X-Content-Type-Options "nosniff"
  Header set X-Frame-Options "SAMEORIGIN"
  Header set X-XSS-Protection "1; mode=block"
</IfModule>
```

#### Step 4: Configure DNS at nic.ae

Point your domain to hosting server:

```
Type: A
Name: @
Value: (IP address from your hosting provider)
TTL: 3600

Type: CNAME
Name: www
Value: skytechaviation.ae
TTL: 3600
```

**Site will be live at:** `https://skytechaviation.ae`

---

### Option 5: AWS S3 + CloudFront (Scalable, Professional)

#### Step 1: Create S3 Bucket

```bash
# Install AWS CLI
brew install awscli  # macOS
# or download from aws.amazon.com/cli

# Configure AWS credentials
aws configure

# Create bucket (use your domain name)
aws s3 mb s3://skytechaviation.ae

# Enable static website hosting
aws s3 website s3://skytechaviation.ae --index-document index.html --error-document index.html
```

#### Step 2: Build and Upload

Update `vite.config.ts`:
```typescript
export default defineConfig({
  base: '/',
});
```

Build and upload:
```bash
# Build
npm run build

# Upload to S3
aws s3 sync dist/ s3://skytechaviation.ae --delete

# Make files public
aws s3api put-bucket-policy --bucket skytechaviation.ae --policy '{
  "Version": "2012-10-17",
  "Statement": [{
    "Sid": "PublicReadGetObject",
    "Effect": "Allow",
    "Principal": "*",
    "Action": "s3:GetObject",
    "Resource": "arn:aws:s3:::skytechaviation.ae/*"
  }]
}'
```

#### Step 3: Create CloudFront Distribution

1. Go to AWS CloudFront console
2. Create distribution:
   - Origin: `skytechaviation.ae.s3-website-us-east-1.amazonaws.com`
   - Viewer Protocol Policy: Redirect HTTP to HTTPS
   - Alternate Domain Names (CNAMEs): `skytechaviation.ae`, `www.skytechaviation.ae`
   - SSL Certificate: Request certificate from ACM
3. Note the CloudFront domain name (e.g., `d123abc.cloudfront.net`)

#### Step 4: Configure DNS at nic.ae

```
Type: CNAME
Name: @
Value: d123abc.cloudfront.net (your CloudFront domain)
TTL: 3600

Type: CNAME
Name: www
Value: d123abc.cloudfront.net
TTL: 3600
```

**Site will be live at:** `https://skytechaviation.ae`

---

## 🔒 SSL Certificate (HTTPS)

### For GitHub Pages
- Automatic (free Let's Encrypt certificate)
- Enable "Enforce HTTPS" in repository settings

### For Netlify/Vercel
- Automatic (free Let's Encrypt certificate)
- Enabled by default

### For UAE Hosting (cPanel)
Most UAE hosting providers offer free SSL:
1. Login to cPanel
2. Go to "SSL/TLS" or "Let's Encrypt SSL"
3. Select your domain
4. Click "Install" or "Enable"

### For AWS CloudFront
1. Go to AWS Certificate Manager (ACM)
2. Request certificate for `skytechaviation.ae` and `*.skytechaviation.ae`
3. Verify domain ownership via DNS (add CNAME records from ACM to nic.ae)
4. Attach certificate to CloudFront distribution

---

## 📊 Comparison Table

| Provider | Cost | Setup Difficulty | Speed | UAE-Optimized | SSL |
|----------|------|------------------|-------|---------------|-----|
| **GitHub Pages** | Free | Easy | Good | No | Free |
| **Netlify** | Free/Paid | Very Easy | Excellent | No | Free |
| **Vercel** | Free/Paid | Very Easy | Excellent | No | Free |
| **UAE Hosting** | ~$50-200/year | Medium | Good | Yes | Included |
| **AWS S3+CF** | ~$5-50/month | Hard | Excellent | Configurable | Free |

---

## 🚀 Recommended Deployment Flow

### Best for UAE Audience: AWS CloudFront (Dubai Region)

1. **Build optimized version**
```bash
npm run build
```

2. **Deploy to S3 (Dubai region)**
```bash
aws s3 mb s3://skytechaviation.ae --region me-south-1
aws s3 sync dist/ s3://skytechaviation.ae
```

3. **Configure CloudFront with Dubai edge location**

4. **Point DNS to CloudFront**

This ensures fastest load times for UAE visitors.

---

## 🛠️ Automated Deployment Scripts

### Deploy to Netlify Script

Create `deploy-netlify.sh`:
```bash
#!/bin/bash

# Build the project
echo "Building project..."
npm run build

# Deploy to Netlify
echo "Deploying to Netlify..."
netlify deploy --prod --dir=dist

echo "Deployment complete!"
```

Make executable: `chmod +x deploy-netlify.sh`

Run: `./deploy-netlify.sh`

### Deploy to S3 Script

Create `deploy-s3.sh`:
```bash
#!/bin/bash

BUCKET_NAME="skytechaviation.ae"
REGION="me-south-1"

# Build
echo "Building project..."
npm run build

# Upload to S3
echo "Uploading to S3..."
aws s3 sync dist/ s3://$BUCKET_NAME --region $REGION --delete

# Invalidate CloudFront cache
DISTRIBUTION_ID="YOUR_CLOUDFRONT_ID"
echo "Invalidating CloudFront cache..."
aws cloudfront create-invalidation --distribution-id $DISTRIBUTION_ID --paths "/*"

echo "Deployment complete!"
echo "Site: https://$BUCKET_NAME"
```

Make executable: `chmod +x deploy-s3.sh`

Run: `./deploy-s3.sh`

---

## 📝 Pre-Deployment Checklist

- [ ] Update `vite.config.ts` base path
- [ ] Update `src/app.tsx` Router basename
- [ ] Run `npm run build` successfully
- [ ] Test build locally: `npm run serve`
- [ ] Configure DNS records at nic.ae
- [ ] Set up SSL certificate
- [ ] Test all routes work correctly
- [ ] Verify Google Sheets integration (if configured)
- [ ] Check responsive design on mobile
- [ ] Test dark mode toggle
- [ ] Verify language switching (EN/AR/RU)
- [ ] Check all images load correctly
- [ ] Test contact form submission
- [ ] Verify SEO meta tags
- [ ] Check browser console for errors

---

## 🔍 Testing Custom Domain

After DNS propagation (24-48 hours), test:

```bash
# Check DNS resolution
nslookup skytechaviation.ae

# Check SSL certificate
curl -I https://skytechaviation.ae

# Check if site loads
curl https://skytechaviation.ae
```

---

## 📞 Support Contacts

### nic.ae Support
- Website: https://www.nic.ae
- Email: support@nic.ae
- Phone: +971 2 6913333

### Hosting Providers UAE
- **Emirati**: +971 4 447 7711
- **Web.ae**: +971 4 391 4888
- **GulfNet**: +971 4 391 1114

---

## 🎯 Recommended Setup for Production

**For Skytech Aviation, I recommend:**

1. **Primary Option: Netlify** (easiest, free, fast)
   - Automatic deployments on git push
   - Free SSL
   - Global CDN
   - Easy custom domain setup

2. **If UAE-specific hosting required: AWS CloudFront (Dubai)**
   - Fastest for UAE users
   - Professional setup
   - Scalable
   - ~$10-20/month

3. **Budget Option: GitHub Pages**
   - Completely free
   - Good for simple sites
   - Works with custom domain

---

**Next Steps:**
1. Choose deployment option from above
2. Follow the specific guide for that option
3. Configure DNS at nic.ae
4. Wait for DNS propagation (24-48 hours)
5. Test the live site

---

**Last Updated:** November 15, 2025  
**Your Domain:** Register at https://www.nic.ae
