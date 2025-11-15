#!/bin/bash

# Restore GitHub Pages Configuration
# This script restores the configuration needed for GitHub Pages deployment

set -e  # Exit on error

echo "🔄 Restoring GitHub Pages configuration..."
echo ""

# Check if backups exist
if [ ! -f "vite.config.ts.backup" ] && [ ! -f "src/app.tsx.backup" ]; then
    echo "⚠️  No backup files found."
    echo "   Manually updating configuration to GitHub Pages settings..."
    echo ""
fi

# Restore vite.config.ts
if [ -f "vite.config.ts.backup" ]; then
    echo "📝 Restoring vite.config.ts from backup..."
    mv vite.config.ts.backup vite.config.ts
else
    echo "📝 Updating vite.config.ts for GitHub Pages..."
    # Update base path to GitHub Pages
    sed -i.bak "s|base: '/'|base: '/skytech-aviation-website/'|g" vite.config.ts
fi

# Restore app.tsx
if [ -f "src/app.tsx.backup" ]; then
    echo "📝 Restoring src/app.tsx from backup..."
    mv src/app.tsx.backup src/app.tsx
else
    echo "📝 Updating src/app.tsx for GitHub Pages..."
    # Update Router basename to GitHub Pages
    sed -i.bak 's|basename="/"|basename="/skytech-aviation-website"|g' src/app.tsx
fi

# Clean up .bak files
rm -f vite.config.ts.bak
rm -f src/app.tsx.bak

# Rebuild for GitHub Pages
echo ""
echo "🔨 Rebuilding for GitHub Pages..."
npm run build

echo ""
echo "✅ GitHub Pages configuration restored!"
echo ""
echo "📊 Next steps:"
echo "1. Review the changes in vite.config.ts and src/app.tsx"
echo "2. Commit the changes: git add -A && git commit -m 'Restore GitHub Pages config'"
echo "3. Push to GitHub: git push"
echo "4. Your site will be live at: https://nawabjaffer.github.io/skytech-aviation-website/"
echo ""
