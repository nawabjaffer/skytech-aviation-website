#!/usr/bin/env bash

# ============================================================================
# Skytech Aviation - GitHub Pages Deployment Script
# ============================================================================
# This script:
# 1. Syncs locales from Google Sheets (optional)
# 2. Runs prebuild (generates version metadata)
# 3. Builds the project with Vite
# 4. Deploys to GitHub Pages gh-pages branch
# ============================================================================

set -euo pipefail

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DIST_DIR="$ROOT/dist"
GH_PAGES_BRANCH="gh-pages"
MAIN_BRANCH="main"

# Functions
log_info() {
  echo -e "${BLUE}ℹ${NC} $1"
}

log_success() {
  echo -e "${GREEN}✓${NC} $1"
}

log_warn() {
  echo -e "${YELLOW}⚠${NC} $1"
}

log_error() {
  echo -e "${RED}✗${NC} $1"
}

# Check if git is configured
check_git_config() {
  log_info "Checking git configuration..."
  
  if ! git config --get user.name > /dev/null; then
    log_error "Git user.name not configured"
    echo "Run: git config --global user.name 'Your Name'"
    exit 1
  fi
  
  if ! git config --get user.email > /dev/null; then
    log_error "Git user.email not configured"
    echo "Run: git config --global user.email 'your.email@example.com'"
    exit 1
  fi
  
  log_success "Git configuration OK"
}

# Check if gh-pages branch exists, create if not
setup_gh_pages_branch() {
  log_info "Checking gh-pages branch..."
  
  if git show-ref --quiet refs/heads/$GH_PAGES_BRANCH; then
    log_success "gh-pages branch exists"
  else
    log_warn "gh-pages branch doesn't exist, creating..."
    git checkout --orphan $GH_PAGES_BRANCH
    git rm -rf .
    touch .gitkeep
    git add .gitkeep
    git commit -m "Initial gh-pages commit"
    git checkout $MAIN_BRANCH
    log_success "gh-pages branch created"
  fi
}

# Sync locales (optional)
sync_locales() {
  if [ "$SYNC_LOCALES" = "true" ]; then
    log_info "Syncing locales..."
    
    if [ -f "$ROOT/scripts/sync-locales.js" ]; then
      node "$ROOT/scripts/sync-locales.js" && log_success "Locales synced" || log_warn "Locale sync failed (continuing)"
    else
      log_warn "sync-locales.js not found, skipping"
    fi
  else
    log_info "Skipping locale sync (use --sync-locales to enable)"
  fi
}

# Generate version metadata
generate_version() {
  log_info "Generating version metadata..."
  
  if [ -f "$ROOT/scripts/generate-version.js" ]; then
    node "$ROOT/scripts/generate-version.js" && log_success "Version metadata generated" || {
      log_error "Failed to generate version metadata"
      exit 1
    }
  else
    log_error "generate-version.js not found"
    exit 1
  fi
}

# Build the project
build_project() {
  log_info "Building project..."
  
  cd "$ROOT"
  npm run build || {
    log_error "Build failed"
    exit 1
  }
  
  log_success "Build completed"
}

# Deploy to gh-pages
deploy_to_github_pages() {
  log_info "Deploying to GitHub Pages..."
  
  if [ ! -d "$DIST_DIR" ]; then
    log_error "dist/ directory not found. Build failed?"
    exit 1
  fi
  
  # Save current branch
  CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
  
  log_info "Checking out gh-pages branch..."
  git checkout $GH_PAGES_BRANCH
  
  log_info "Copying build files..."
  # Remove all files except .git
  find . -maxdepth 1 -type f -not -name '.git*' -delete
  find . -maxdepth 1 -type d -not -name '.git' -delete
  
  # Copy dist contents
  cp -r "$DIST_DIR"/* .
  
  # Create .nojekyll to skip Jekyll processing on GitHub Pages
  touch .nojekyll
  
  log_info "Staging files for commit..."
  git add -A
  
  # Check if there are changes
  if git diff --cached --quiet; then
    log_warn "No changes to commit"
    git checkout $CURRENT_BRANCH
    return 0
  fi
  
  # Create commit with version info
  BUILD_HASH=$(cat "$ROOT/.env.build" 2>/dev/null | grep VITE_BUILD_HASH | cut -d'=' -f2 || echo "unknown")
  BUILD_TIME=$(date -u '+%Y-%m-%d %H:%M:%S UTC')
  
  log_info "Committing changes..."
  git commit -m "Deploy: $BUILD_TIME

Build Hash: $BUILD_HASH
Deployed from branch: $CURRENT_BRANCH" || {
    log_error "Failed to commit"
    git checkout $CURRENT_BRANCH
    exit 1
  }
  
  log_info "Pushing to GitHub Pages..."
  git push origin $GH_PAGES_BRANCH --force || {
    log_error "Failed to push to GitHub Pages"
    git checkout $CURRENT_BRANCH
    exit 1
  }
  
  # Return to original branch
  git checkout $CURRENT_BRANCH
  
  log_success "Deployed to GitHub Pages successfully!"
  log_info "Site URL: $(git config --get remote.origin.url | sed 's/git@github.com:/https:\/\/github.com\//' | sed 's/\.git$//')/tree/gh-pages"
}

# Cleanup
cleanup() {
  log_info "Cleaning up temporary files..."
  # Add any cleanup tasks here
}

# Main deployment flow
main() {
  log_info "=========================================="
  log_info "Starting GitHub Pages Deployment"
  log_info "=========================================="
  
  # Parse command line arguments
  SYNC_LOCALES=false
  while [[ $# -gt 0 ]]; do
    case $1 in
      --sync-locales)
        SYNC_LOCALES=true
        shift
        ;;
      --help)
        echo "Usage: $0 [OPTIONS]"
        echo "Options:"
        echo "  --sync-locales    Sync locales from Google Sheets before building"
        echo "  --help            Show this help message"
        exit 0
        ;;
      *)
        log_error "Unknown option: $1"
        exit 1
        ;;
    esac
  done
  
  # Execute deployment steps
  check_git_config
  setup_gh_pages_branch
  sync_locales
  generate_version
  build_project
  deploy_to_github_pages
  cleanup
  
  log_info "=========================================="
  log_success "Deployment completed successfully!"
  log_info "=========================================="
}

# Run main
main "$@"
