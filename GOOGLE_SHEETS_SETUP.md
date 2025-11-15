# Google Sheets Integration for Hero Carousel

This guide explains how to set up Google Sheets to dynamically control the Hero Carousel content on your Skytech Aviation website.

## 📋 Overview

The Hero Carousel can be controlled through Google Sheets, allowing you to:
- Update hero slides without deploying code
- Add/remove slides dynamically
- Change images, videos, headlines, and CTAs
- Schedule content by toggling the "active" column

## 🚀 Setup Instructions

### Step 1: Create Your Google Sheet

1. Create a new Google Sheet
2. Name it something like "Skytech Aviation - Hero Slides"
3. Add the following columns in Row 1 (header row):

| Column | Description | Example |
|--------|-------------|---------|
| id | Unique identifier | 1, 2, 3, etc. |
| title | Main headline | "Authorized Civil Aircraft Parts Supplier" |
| subtitle | Secondary text | "Your Trusted Partner for Authentic Aviation Components" |
| description | Detailed description | "Providing premium quality aircraft parts..." |
| mediaType | "image" or "video" | image |
| mediaUrl | Full URL to media | https://images.unsplash.com/photo-... |
| ctaText1 | First button text | "View Products" |
| ctaLink1 | First button link | /products |
| ctaText2 | Second button text | "Become a Distributor" |
| ctaLink2 | Second button link | /distributors |
| trustBadge | Trust badge text | "ASA Member Since 2015" |
| active | "true" or "false" | true |

### Step 2: Fill in Your Data

**Example Row 2:**
```
id: 1
title: Authorized Civil Aircraft Parts Supplier
subtitle: Your Trusted Partner for Authentic Aviation Components
description: Providing premium quality aircraft parts and components to airlines, MROs, and distributors across the Middle East, Africa, and beyond.
mediaType: image
mediaUrl: https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920&q=80
ctaText1: View Products
ctaLink1: /products
ctaText2: Become a Distributor
ctaLink2: /distributors
trustBadge: ASA Member Since 2015
active: true
```

### Step 3: Make Sheet Public

#### Option A: Public Sheet (Recommended for Read-Only)

1. Click **File** → **Share** → **Publish to web**
2. Select "Entire Document" or specific sheet
3. Click **Publish**
4. Alternatively: Click **Share** → Change to "Anyone with the link can view"

#### Option B: Private Sheet (Requires API Key)

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable **Google Sheets API**
4. Create credentials (API Key)
5. Copy the API key

### Step 4: Get Sheet ID

From your Google Sheets URL:
```
https://docs.google.com/spreadsheets/d/{SHEET_ID}/edit
```

Copy the `{SHEET_ID}` portion.

### Step 5: Configure Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your values:
   ```env
   VITE_GOOGLE_SHEET_ID=your_sheet_id_here
   VITE_GOOGLE_API_KEY=your_api_key_here (optional for public sheets)
   VITE_GOOGLE_SHEET_RANGE=Sheet1!A2:L100
   ```

3. Restart your development server:
   ```bash
   npm start
   ```

## 📊 Google Sheets Template

### Header Row (Row 1)
```
id | title | subtitle | description | mediaType | mediaUrl | ctaText1 | ctaLink1 | ctaText2 | ctaLink2 | trustBadge | active
```

### Sample Data Rows

**Slide 1: Main Hero**
```
1 | Authorized Civil Aircraft Parts Supplier | Your Trusted Partner for Authentic Aviation Components | Providing premium quality aircraft parts and components to airlines, MROs, and distributors across the Middle East, Africa, and beyond. | image | https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920&q=80 | View Products | /products | Become a Distributor | /distributors | ASA Member Since 2015 | true
```

**Slide 2: AOG Support**
```
2 | 24/7 AOG Support | Aircraft on Ground? We're Here to Help | Emergency parts sourcing and delivery with our dedicated AOG support team. | image | https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=1920&q=80 | Contact AOG Team | /contact | View Services | /services | ISO 9001:2015 Certified | true
```

**Slide 3: Partnership**
```
3 | Global Distribution Network | Serving Airlines Worldwide | Partner with us to access authentic OEM parts with full traceability and certification. | image | https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1920&q=80 | Become a Partner | /distributors | Learn More | /about | Trusted by 50+ Airlines | true
```

## 🎥 Using Videos

To use a video background instead of an image:

1. Set `mediaType` to `video`
2. Use a direct video URL in `mediaUrl`
3. Supported formats: MP4 (recommended), WebM
4. Recommended: Host videos on a CDN or use services like Vimeo/YouTube direct links

**Example:**
```
mediaType: video
mediaUrl: https://your-cdn.com/hero-video.mp4
```

## 🔄 Updating Content

### To Add a New Slide:
1. Add a new row to your Google Sheet
2. Fill in all required columns (id, title, mediaUrl)
3. Set `active` to `true`
4. Wait 5 minutes for cache to refresh (or clear cache manually)

### To Remove a Slide:
1. Set `active` to `false` in the sheet
2. Or delete the entire row

### To Reorder Slides:
The carousel displays slides in the order they appear in the sheet (top to bottom).

## ⚡ Performance & Caching

- **Cache Duration**: 5 minutes
- **Fallback**: If Google Sheets fails, default slides are shown
- **Auto-retry**: Failed requests fall back to cached data

### Manual Cache Refresh

In browser console:
```javascript
// Clear cache and fetch fresh data
googleSheetsService.refresh()
```

## 🎨 Image Guidelines

### Recommended Specifications:
- **Format**: JPG or WebP
- **Dimensions**: 1920×1080 (Full HD) or higher
- **Aspect Ratio**: 16:9
- **File Size**: < 500KB (optimized)
- **Quality**: 80-85% compression

### Free Stock Photo Sources:
- [Unsplash](https://unsplash.com/s/photos/aircraft)
- [Pexels](https://www.pexels.com/search/aviation/)
- [Pixabay](https://pixabay.com/images/search/airplane/)

### Image URL Format:
Use direct image URLs from Unsplash with size parameters:
```
https://images.unsplash.com/photo-{id}?w=1920&q=80
```

## 🔐 Security Considerations

### Public Sheets:
- ✅ No API key required
- ✅ Easy to set up
- ⚠️ Anyone with the link can view data
- ✅ Suitable for public content

### Private Sheets:
- ✅ Requires authentication
- ✅ More secure
- ⚠️ Requires API key setup
- ✅ Better for sensitive content

## 🐛 Troubleshooting

### Issue: Slides not updating

**Solution:**
1. Check browser console for errors
2. Verify Sheet ID is correct in `.env`
3. Ensure sheet is publicly accessible
4. Wait 5 minutes for cache to expire
5. Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)

### Issue: "No data found" error

**Solutions:**
1. Verify column headers match exactly
2. Ensure data starts in Row 2 (Row 1 is headers)
3. Check sheet range in `.env` (default: `Sheet1!A2:L100`)
4. Verify at least one slide has `active: true`

### Issue: Images not loading

**Solutions:**
1. Use HTTPS URLs only
2. Check image URL is accessible
3. Verify CORS headers (use CDN or Unsplash)
4. Test URL directly in browser

### Issue: API quota exceeded

**Solution:**
- Increase cache duration in `googleSheetsService.ts`
- Current: 5 minutes (300,000ms)
- Suggested: 15-30 minutes for production

## 📱 Testing

### Local Testing:
```bash
npm start
```

### Production Testing:
```bash
npm run build
npm run serve
```

## 🔗 API Reference

### Google Sheets API Endpoint:
```
https://sheets.googleapis.com/v4/spreadsheets/{SHEET_ID}/values/{RANGE}
```

### Example Request:
```
https://sheets.googleapis.com/v4/spreadsheets/abc123/values/Sheet1!A2:L100?key=YOUR_API_KEY
```

### Response Format:
```json
{
  "values": [
    ["1", "Title", "Subtitle", "Description", "image", "https://...", "CTA1", "/link1", "CTA2", "/link2", "Badge", "true"],
    ["2", "Title 2", "Subtitle 2", "Description 2", "video", "https://...", "CTA1", "/link1", "CTA2", "/link2", "Badge", "true"]
  ]
}
```

## 📚 Additional Resources

- [Google Sheets API Documentation](https://developers.google.com/sheets/api)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
- [React Best Practices](https://react.dev/learn)

## 🤝 Support

For issues or questions:
1. Check the troubleshooting section above
2. Review browser console for errors
3. Verify Google Sheets permissions
4. Contact development team

---

**Last Updated:** November 2025  
**Version:** 1.0.0
