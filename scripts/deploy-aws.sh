#!/bin/bash

# AWS S3 + CloudFront Deployment Script for Skytech Aviation Website
# This script builds and deploys the website to AWS S3 with CloudFront CDN

set -e  # Exit on error

echo "🚀 Starting AWS deployment..."
echo ""

# Configuration (Update these values)
BUCKET_NAME="skytechaviation.ae"  # Your S3 bucket name (use your domain)
REGION="me-south-1"  # Dubai region for UAE
CLOUDFRONT_DISTRIBUTION_ID=""  # Add your CloudFront distribution ID here

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null
then
    echo "❌ AWS CLI not found. Please install it first:"
    echo "   macOS: brew install awscli"
    echo "   Linux: sudo apt-get install awscli"
    echo "   Or download from: https://aws.amazon.com/cli/"
    exit 1
fi

# Check if AWS credentials are configured
if ! aws sts get-caller-identity &> /dev/null
then
    echo "❌ AWS credentials not configured. Please run: aws configure"
    exit 1
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

# Step 5: Check if S3 bucket exists
echo "🔍 Checking S3 bucket..."
if aws s3 ls "s3://$BUCKET_NAME" 2>&1 | grep -q 'NoSuchBucket'
then
    echo "📦 Creating S3 bucket: $BUCKET_NAME in $REGION..."
    aws s3 mb "s3://$BUCKET_NAME" --region $REGION
    
    # Enable static website hosting
    echo "🌐 Enabling static website hosting..."
    aws s3 website "s3://$BUCKET_NAME" \
        --index-document index.html \
        --error-document index.html
    
    # Make bucket public
    echo "🔓 Configuring bucket policy..."
    aws s3api put-bucket-policy --bucket $BUCKET_NAME --policy "{
      \"Version\": \"2012-10-17\",
      \"Statement\": [{
        \"Sid\": \"PublicReadGetObject\",
        \"Effect\": \"Allow\",
        \"Principal\": \"*\",
        \"Action\": \"s3:GetObject\",
        \"Resource\": \"arn:aws:s3:::$BUCKET_NAME/*\"
      }]
    }"
fi

# Step 6: Upload to S3
echo "☁️  Uploading files to S3..."
aws s3 sync dist/ "s3://$BUCKET_NAME" --region $REGION --delete \
    --cache-control "public, max-age=31536000, immutable" \
    --exclude "*.html" \
    --exclude "service-worker.js"

# Upload HTML files with shorter cache
aws s3 sync dist/ "s3://$BUCKET_NAME" --region $REGION \
    --cache-control "public, max-age=0, must-revalidate" \
    --exclude "*" \
    --include "*.html" \
    --include "service-worker.js"

echo "✅ Files uploaded successfully!"

# Step 7: Invalidate CloudFront cache (if distribution ID provided)
if [ -n "$CLOUDFRONT_DISTRIBUTION_ID" ]; then
    echo "🔄 Invalidating CloudFront cache..."
    INVALIDATION_ID=$(aws cloudfront create-invalidation \
        --distribution-id $CLOUDFRONT_DISTRIBUTION_ID \
        --paths "/*" \
        --query 'Invalidation.Id' \
        --output text)
    
    echo "✅ CloudFront invalidation created: $INVALIDATION_ID"
else
    echo "⚠️  CloudFront distribution ID not set. Skipping cache invalidation."
    echo "   Set CLOUDFRONT_DISTRIBUTION_ID in this script to enable it."
fi

# Step 8: Cleanup
echo "🧹 Cleaning up backup files..."
rm -f vite.config.ts.bak
rm -f src/app.tsx.bak

echo ""
echo "✅ Deployment successful!"
echo ""
echo "📊 Your website is now live:"
echo "   S3 URL: http://$BUCKET_NAME.s3-website-$REGION.amazonaws.com"
if [ -n "$CLOUDFRONT_DISTRIBUTION_ID" ]; then
    echo "   CloudFront: Check your CloudFront distribution for HTTPS URL"
fi
echo ""
echo "📝 Next steps:"
echo "1. If you haven't already, create a CloudFront distribution"
echo "2. Configure DNS at nic.ae to point to CloudFront"
echo "3. Set up SSL certificate in AWS Certificate Manager"
echo "4. Update CLOUDFRONT_DISTRIBUTION_ID in this script"
echo ""
echo "To restore GitHub Pages configuration, run: ./restore-github-pages.sh"
