#!/bin/bash

# Netlify Deployment Script for Skytech Aviation Website
# This script builds and deploys the website to Netlify

set -e  # Exit on error

echo "🚀 Starting Netlify deployment..."
echo ""

# Check if netlify-cli is installed
if ! command -v netlify &> /dev/null
then
    echo "⚠️  Netlify CLI not found. Installing..."
    npm install -g netlify-cli
fi

# Step 1: Clean previous build
echo "🧹 Cleaning previous build..."
rm -rf dist

# Step 2: Update configuration for custom domain
echo "📝 Updating configuration for root path..."

# Backup current vite.config.ts
cp vite.config.ts vite.config.ts.backup

# Update base path to root (for custom domain)
sed -i.bak "s|base: '/skytech-aviation-website/'|base: '/'|g" vite.config.ts || true
sed -i.bak "s|base: \"/skytech-aviation-website/\"|base: '/'|g" vite.config.ts || true

# Backup current app.tsx
cp src/app.tsx src/app.tsx.backup

# Update Router basename to root
sed -i.bak 's|basename="/skytech-aviation-website"|basename="/"|g' src/app.tsx || true

# Step 3: Install dependencies
echo "📦 Installing dependencies..."
npm install

# Step 4: Build the project
echo "🔨 Building project..."
npm run build

# Check if build was successful
if [ ! -d "dist" ]; then
    echo "❌ Build failed! dist folder not created."
    # Restore backups
    mv vite.config.ts.backup vite.config.ts
    mv src/app.tsx.backup src/app.tsx
    exit 1
fi

echo "✅ Build successful!"
echo ""

# Step 5: Deploy to Netlify
echo "🌐 Deploying to Netlify..."
netlify deploy --prod --dir=dist

# Check deployment status
if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Deployment successful!"
    echo ""
    echo "📊 Next steps:"
    echo "1. Go to your Netlify dashboard"
    echo "2. Add your custom domain (e.g., skytechaviation.ae)"
    echo "3. Configure DNS at nic.ae with the records provided by Netlify"
    echo "4. Wait 24-48 hours for DNS propagation"
    echo ""
else
    echo "❌ Deployment failed!"
    # Restore backups
    mv vite.config.ts.backup vite.config.ts
    mv src/app.tsx.backup src/app.tsx
    exit 1
fi

# Step 6: Cleanup
echo "🧹 Cleaning up backup files..."
rm -f vite.config.ts.bak
rm -f src/app.tsx.bak

echo ""
echo "✨ All done! Your site is now live on Netlify."
echo ""
echo "To restore GitHub Pages configuration, run: ./restore-github-pages.sh"
