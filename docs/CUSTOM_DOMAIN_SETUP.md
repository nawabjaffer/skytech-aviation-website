# Custom Domain Setup Guide - aviation.skytech.ae

## ✅ Configuration Completed

All necessary files have been updated to use the custom domain `aviation.skytech.ae`.

---

## 📋 What Was Changed

### 1. **Vite Configuration** (`vite.config.ts`)
- Changed `base` from `/skytech-aviation-website/` to `/`
- This ensures all assets use correct paths for custom domain

### 2. **React Router** (`src/app.tsx`)
- Changed `basename` from `/skytech-aviation-website` to `/`
- Routes now work correctly on custom domain

### 3. **SEO Metadata** (`src/seo/metadata.ts`)
- Updated `siteUrl` to `https://aviation.skytech.ae`
- All structured data now uses correct domain

### 4. **Sitemap** (`public/sitemap.xml`)
- All URLs updated to `https://aviation.skytech.ae/`
- Multilingual hreflang tags updated

### 5. **robots.txt** (`public/robots.txt`)
- Sitemap URL updated to `https://aviation.skytech.ae/sitemap.xml`

### 6. **CNAME File**
- Created in `public/CNAME` (copied to dist during build)
- GitHub Actions also creates it automatically
- Contains: `aviation.skytech.ae`

### 7. **GitHub Actions** (`.github/workflows/deploy.yml`)
- Already configured to add CNAME file during deployment
- Builds and deploys automatically on push to `main` branch

---

## 🌐 DNS Configuration Required at nic.ae

You need to configure DNS at your domain provider (nic.ae). Follow these steps:

### Step-by-Step DNS Setup:

1. **Log in to nic.ae**
   - Go to www.nic.ae
   - Sign in to your account

2. **Navigate to DNS Manager**
   - Find your domain: `skytech.ae`
   - Click on **DNS Manager** or **Edit DNS**

3. **Add CNAME Record**

   Create a new record with these **exact** values:

   | Field | Value |
   |-------|-------|
   | **Type** | `CNAME` |
   | **Host/Name** | `aviation` |
   | **Value/Target** | `nawabjaffer.github.io` |
   | **TTL** | 3600 (or leave default) |

   ⚠️ **Important:**
   - Do NOT include the full domain `aviation.skytech.ae` in the Host field
   - Do NOT include `https://` in the Value
   - Do NOT add a trailing `/` to the Value
   - The correct value is just: `nawabjaffer.github.io`

4. **Save the DNS Record**

5. **Wait for Propagation**
   - DNS changes can take 15 minutes to 48 hours
   - Usually completes within 30 minutes

---

## 🔍 Verify DNS Configuration

### Check DNS Propagation:

```bash
# In your terminal
dig aviation.skytech.ae +short
```

**Expected output:**
```
nawabjaffer.github.io
```

### Online DNS Checker:

1. Go to: https://dnschecker.org/
2. Enter: `aviation.skytech.ae`
3. Select: **CNAME** record type
4. Click: **Search**

You should see green checkmarks showing `nawabjaffer.github.io` worldwide.

---

## 📝 GitHub Pages Configuration

### Configure Custom Domain in GitHub:

1. Go to: https://github.com/nawabjaffer/skytech-aviation-website
2. Click: **Settings** tab
3. Click: **Pages** (left sidebar)
4. Under **Custom domain**:
   - Enter: `aviation.skytech.ae`
   - Click: **Save**
5. Wait for DNS check to complete (green checkmark)
6. Enable: ✅ **Enforce HTTPS**

---

## 🚀 Deployment Process

### Automatic Deployment:

Every time you push to the `main` branch:

1. GitHub Actions triggers automatically
2. Project builds with Vite
3. CNAME file is created/verified
4. Files deployed to `gh-pages` branch
5. Site available at `https://aviation.skytech.ae`

### Manual Deployment:

If needed, you can trigger deployment manually:

1. Go to: **Actions** tab in GitHub
2. Select: **Deploy Skytech Aviation Website to GitHub Pages**
3. Click: **Run workflow**
4. Select: `main` branch
5. Click: **Run workflow**

---

## ✅ Verification Checklist

After DNS propagates, verify everything works:

- [ ] `aviation.skytech.ae` loads the website
- [ ] All pages accessible (Home, Products, Services, etc.)
- [ ] HTTPS is enabled (padlock in browser)
- [ ] No mixed content warnings
- [ ] Images load correctly
- [ ] Chatbot works
- [ ] Language switcher works (EN/AR/RU)
- [ ] Sitemap accessible: `aviation.skytech.ae/sitemap.xml`
- [ ] Robots.txt accessible: `aviation.skytech.ae/robots.txt`

---

## 🔧 Troubleshooting

### "DNS check unsuccessful" in GitHub Pages

**Solution:**
1. Verify CNAME record at nic.ae is correct
2. Wait 30-60 minutes for DNS propagation
3. Use https://dnschecker.org/ to verify propagation
4. Remove and re-add custom domain in GitHub Pages settings

### Site shows 404 error

**Solution:**
1. Check if CNAME file exists in `gh-pages` branch
2. Verify GitHub Actions deployment completed successfully
3. Check that `base: '/'` in `vite.config.ts`
4. Check that `basename="/"` in `app.tsx`

### HTTPS not working

**Solution:**
1. Wait for DNS to fully propagate (can take up to 24 hours)
2. In GitHub Pages settings, uncheck and re-check "Enforce HTTPS"
3. Clear browser cache and try again

### Assets (CSS/JS) not loading

**Solution:**
1. Verify `base: '/'` in `vite.config.ts`
2. Check browser console for errors
3. Rebuild and redeploy: `git commit --allow-empty -m "Trigger rebuild" && git push`

---

## 📊 Next Steps After DNS Setup

Once your site is live:

1. **Submit to Google Search Console**
   - Add property: `https://aviation.skytech.ae`
   - Verify ownership
   - Submit sitemap: `https://aviation.skytech.ae/sitemap.xml`

2. **Setup Google Analytics**
   - Create GA4 property
   - Add tracking code to site
   - Monitor traffic

3. **Monitor Performance**
   - Run Lighthouse audit
   - Check Core Web Vitals
   - Optimize as needed

4. **SSL Certificate**
   - GitHub Pages provides free SSL via Let's Encrypt
   - Automatically renewed
   - No action required

---

## 📞 Support

If you encounter issues:

1. Check GitHub Actions logs for deployment errors
2. Verify DNS configuration at nic.ae
3. Use browser DevTools to check for errors
4. Check GitHub Pages settings

---

## 🎯 Summary

**Current Status:** ✅ Ready for DNS configuration

**What you need to do:**
1. Add CNAME record at nic.ae: `aviation` → `nawabjaffer.github.io`
2. Configure custom domain in GitHub Pages: `aviation.skytech.ae`
3. Wait for DNS propagation (15-60 minutes)
4. Verify site is accessible at `https://aviation.skytech.ae`

**What happens automatically:**
- Every push to `main` branch deploys to GitHub Pages
- CNAME file created during build
- SSL certificate managed by GitHub
- Site cached and served via CDN

Your website is now ready to go live on your custom domain! 🚀
