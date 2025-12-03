# GitHub Pages Deployment Guide

This guide explains how to deploy the Skytech Aviation website to GitHub Pages with automatic version management and cache busting.

## Quick Start

### Basic Deployment (Recommended)
```bash
npm run deploy
```

This will:
1. ✅ Generate version metadata with build hash and timestamp
2. ✅ Build the project with Vite
3. ✅ Create/update the gh-pages branch
4. ✅ Push to GitHub Pages

### Deployment with Locale Sync
```bash
npm run deploy:sync-locales
```

This will do everything above plus sync locales from Google Sheets before building.

---

## What Happens During Deployment

### Step 1: Version Generation (`scripts/generate-version.js`)
- Generates unique build hash using SHA256(version + timestamp)
- Creates `public/version.json` with build metadata
- Creates `.env.build` with environment variables
- **Duration:** < 1 second

### Step 2: Build (`npm run build`)
- Compiles React + TypeScript with Vite
- Applies CSS/JS minification and compression
- Generates service worker with Workbox
- Creates versioned assets (hash in filenames)
- **Duration:** 3-5 seconds

### Step 3: Deploy to GitHub Pages
- Creates/switches to `gh-pages` branch
- Copies `dist/` build files
- Commits with build metadata
- Pushes to `origin/gh-pages` with `--force`
- Returns to main branch
- **Duration:** 5-10 seconds

---

## Setup (One-Time)

### 1. Configure Git (if not already done)
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### 2. Ensure GitHub Repo is Set Up for Pages
1. Go to: **GitHub Repo → Settings → Pages**
2. Set **Source** to: **Deploy from a branch**
3. Set **Branch** to: `gh-pages` / `root`
4. Click **Save**

### 3. Verify Remote
```bash
git remote -v
# Should show: origin  https://github.com/nawabjaffer/skytech-aviation-website.git
```

---

## File Structure

```
scripts/
├── deploy.js                    # NPM wrapper (calls deploy-github-pages.sh)
├── deploy-github-pages.sh       # Main deployment script
├── generate-version.js          # Version metadata generator
└── sync-locales.js             # Locale sync (optional)

public/
└── version.json                # Generated: build version metadata

.env.build                       # Generated: environment variables
```

---

## Environment Variables

During deployment, these variables are automatically generated:

```env
VITE_APP_VERSION=1.0.0           # From package.json
VITE_BUILD_TIME=1733271600000    # Timestamp in milliseconds
VITE_BUILD_HASH=abc123def456     # SHA256 hash (first 12 chars)
VITE_BUILD_DATE=2025-12-03T...   # ISO timestamp
```

These are injected into the build and used by the cache management system.

---

## Cache Busting

The deployment system includes intelligent cache busting:

1. **Every build gets a unique hash** (based on version + timestamp)
2. **Service worker caches are invalidated** when version changes
3. **Users see new content** on their first visit after deployment
4. **User preferences preserved** (theme, language selection)

See `src/utils/cacheManager.ts` for implementation details.

---

## Troubleshooting

### "Git user not configured"
```bash
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
```

### "gh-pages branch doesn't exist"
The script will create it automatically on first deploy.

### "Push rejected"
The script uses `--force` flag. If still rejected:
```bash
git push origin gh-pages --force
```

### Build fails
Check for TypeScript/syntax errors:
```bash
npm run build
# Fix any errors, then run deploy again
```

### Site not updating
1. Clear browser cache (Cmd+Shift+R on macOS)
2. Check GitHub Pages is enabled in repo settings
3. Verify build was pushed to gh-pages branch:
   ```bash
   git log origin/gh-pages --oneline -5
   ```

---

## Advanced Usage

### Manual Deployment Steps

If you want to deploy manually:

```bash
# 1. Generate version
node scripts/generate-version.js

# 2. Build
npm run build

# 3. Push to gh-pages manually
git checkout gh-pages
cp -r dist/* .
git add -A
git commit -m "Deploy: $(date)"
git push origin gh-pages --force
git checkout main
```

### Viewing Deployment Logs

```bash
# See last 5 gh-pages commits
git log origin/gh-pages --oneline -5

# See deployment timestamps
git log origin/gh-pages --format="%h %aI %s"
```

### Reverting a Deployment

```bash
# Go back to previous commit on gh-pages
git revert <commit-hash>
git push origin gh-pages
```

---

## GitHub Pages URL

Your site will be available at:

```
https://nawabjaffer.github.io/skytech-aviation-website/
```

(Replace `nawabjaffer` with your GitHub username)

---

## Performance Notes

- **Build time:** ~5 seconds
- **Deployment time:** ~10 seconds
- **Total:** ~15 seconds per deployment
- **Assets cached:** Hashed filenames (30 days)
- **HTML/version.json:** No cache (checked every load)

---

## Questions?

Refer to:
- `scripts/deploy-github-pages.sh` — Deployment logic
- `scripts/generate-version.js` — Version generation
- `src/utils/cacheManager.ts` — Cache management
- `vite.config.ts` — Build configuration
