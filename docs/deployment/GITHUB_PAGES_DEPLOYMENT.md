# GitHub Pages Deployment Guide

## ✅ Fixed Issues

### Problem: 404 Errors for Assets
**Error Messages:**
```
Failed to load resource: the server responded with a status of 404 ()
index-DUxyL6Za.css:1 Failed to load resource: the server responded with a status of 404 ()
```

**Root Cause:**
Vite was building assets with absolute paths (`/assets/...`) but GitHub Pages serves the site from a subdirectory (`/skytech-aviation-website/`).

**Solution Applied:**
Added `base: '/skytech-aviation-website/'` to `vite.config.ts`

## 🚀 Deployment Configuration

### Current Setup

**Site URL:** https://nawabjaffer.github.io/skytech-aviation-website/

**Key Files:**

1. **vite.config.ts**
```typescript
export default defineConfig({
  base: '/skytech-aviation-website/', // GitHub Pages base path
  // ... other config
});
```

2. **src/app.tsx**
```tsx
<Router basename="/skytech-aviation-website">
  {/* Routes */}
</Router>
```

3. **package.json**
```json
{
  "homepage": "https://nawabjaffer.github.io/skytech-aviation-website/"
}
```

4. **.github/workflows/deploy.yml**
- Automatically builds on push to main
- Creates `.nojekyll` file to disable Jekyll
- Uploads dist folder to GitHub Pages

## 📋 Deployment Checklist

After pushing code, check:

1. ✅ GitHub Actions workflow runs successfully
   - Go to: https://github.com/nawabjaffer/skytech-aviation-website/actions
   - Check that "Deploy Skytech Aviation Website to GitHub Pages" completes

2. ✅ GitHub Pages settings are correct
   - Go to: Repository Settings → Pages
   - Source should be: "GitHub Actions"
   
3. ✅ Site loads correctly
   - Visit: https://nawabjaffer.github.io/skytech-aviation-website/
   - Check browser console for errors (F12 → Console)

## 🐛 Troubleshooting

### Issue: Site shows 404 page

**Solution:**
1. Check GitHub Pages is enabled in repository settings
2. Verify deployment workflow completed successfully
3. Wait 2-3 minutes for deployment to propagate

### Issue: Assets still show 404

**Solution:**
1. Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)
2. Check built files in dist/ have correct paths
3. Run `npm run build` locally and verify index.html shows:
   ```html
   <script src="/skytech-aviation-website/assets/..."></script>
   ```

### Issue: Routing doesn't work (404 on page refresh)

**Solution:**
GitHub Pages doesn't support client-side routing by default. The current setup handles this by:
1. Using `basename` in BrowserRouter
2. All routes are handled by the SPA

If direct URLs still don't work, you may need to add a 404.html redirect:

**Create `public/404.html`:**
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Skytech Aviation</title>
    <script type="text/javascript">
      var pathSegmentsToKeep = 1;
      var l = window.location;
      l.replace(
        l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
        l.pathname.split('/').slice(0, 1 + pathSegmentsToKeep).join('/') + '/?/' +
        l.pathname.slice(1).split('/').slice(pathSegmentsToKeep).join('/').replace(/&/g, '~and~') +
        (l.search ? '&' + l.search.slice(1).replace(/&/g, '~and~') : '') +
        l.hash
      );
    </script>
  </head>
  <body></body>
</html>
```

### Issue: Images or external resources not loading

**Solution:**
1. Use full URLs for external images (already done in Hero Carousel)
2. For local images, place them in `public/` folder
3. Reference them as `/skytech-aviation-website/image.jpg`

### Issue: Google Sheets integration not working

**Solution:**
1. This is client-side API call, should work fine
2. Check browser console for CORS errors
3. Verify Sheet ID in `.env` file (if using)
4. Make sure Google Sheet is publicly accessible

## 🔧 Local Testing

To test the build locally as it would appear on GitHub Pages:

```bash
# Build with production config
npm run build

# Preview the build (simulates GitHub Pages environment)
npm run serve
```

Then visit: http://localhost:4173/skytech-aviation-website/

## 📦 Build Output

After `npm run build`, verify:

```
dist/
├── index.html (should have /skytech-aviation-website/ in script/link tags)
├── assets/
│   ├── index-[hash].js
│   └── index-[hash].css
└── .nojekyll (created by GitHub Actions)
```

## 🚀 Manual Deployment (if needed)

If GitHub Actions doesn't work, you can deploy manually:

```bash
# Build the project
npm run build

# Create .nojekyll file
echo "" > dist/.nojekyll

# Deploy to gh-pages branch (install gh-pages if needed)
npx gh-pages -d dist
```

## 📚 Additional Resources

- [Vite GitHub Pages Guide](https://vitejs.dev/guide/static-deploy.html#github-pages)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [React Router GitHub Pages](https://create-react-app.dev/docs/deployment/#github-pages)

## 🎯 Current Status

✅ Configuration fixed  
✅ Pushed to repository  
✅ GitHub Actions will deploy automatically  
✅ Site should be live at: https://nawabjaffer.github.io/skytech-aviation-website/

**Next Steps:**
1. Wait 2-3 minutes for GitHub Actions to complete
2. Visit the site URL
3. If any issues persist, check the troubleshooting section above

---

**Last Updated:** November 15, 2025  
**Repository:** https://github.com/nawabjaffer/skytech-aviation-website
