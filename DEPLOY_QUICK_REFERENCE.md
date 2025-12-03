# GitHub Pages Deployment - Quick Reference

## Usage

```bash
# Deploy to GitHub Pages (basic)
npm run deploy

# Deploy with locale sync
npm run deploy:sync-locales

# Manual help
bash scripts/deploy-github-pages.sh --help
```

## What It Does

The `npm run deploy` command automatically:

1. **Generates Version Metadata**
   - Creates unique build hash (SHA256)
   - Generates `public/version.json`
   - Creates `.env.build` with env vars

2. **Builds the Project**
   - Compiles React/TypeScript with Vite
   - Minifies and compresses assets
   - Generates service worker

3. **Deploys to GitHub Pages**
   - Creates/updates `gh-pages` branch
   - Pushes build to `origin/gh-pages`
   - Automatically invalidates user caches

4. **Returns to Main Branch**
   - No changes left in working directory
   - Safe to continue development

## Deployment Flow

```
npm run deploy
    ↓
Check Git config
    ↓
Setup gh-pages branch (if needed)
    ↓
Generate version metadata
    ↓
npm run build
    ↓
Switch to gh-pages branch
    ↓
Copy dist/* to gh-pages
    ↓
Commit with build hash + timestamp
    ↓
git push origin gh-pages --force
    ↓
Switch back to main
    ↓
✓ Deployed to GitHub Pages!
```

## Files Created/Modified

- `public/version.json` — Build metadata (regenerated each time)
- `.env.build` — Environment variables (regenerated each time)
- `gh-pages` branch — Deployment branch on GitHub

## Site URL

https://nawabjaffer.github.io/skytech-aviation-website/

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Git user not configured | `git config --global user.name "Name"` |
| Push rejected | Run with git credentials configured |
| Build fails | Fix TypeScript errors: `npm run build` |
| Site not updating | Clear browser cache: Cmd+Shift+R |
| Check deployment status | `git log origin/gh-pages --oneline -5` |

## Advanced

```bash
# See deployment history
git log origin/gh-pages --oneline -10

# See what was deployed
git show origin/gh-pages:index.html

# Revert to previous deployment
git revert <commit-hash>
git push origin gh-pages
```

---

See `DEPLOYMENT.md` for complete documentation.
