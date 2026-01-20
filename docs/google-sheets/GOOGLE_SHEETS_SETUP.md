# Google Sheets Integration

This guide explains how to set up Google Sheets to dynamically control content on your Skytech Aviation website.

## 📋 Overview

The website integrates with Google Sheets to manage multiple sections:
- **Hero Carousel**: Rotating hero slides with images/videos and CTAs
- **Statistics Section**: Animated counters showing company metrics
- **Testimonials Carousel**: Customer reviews and ratings
- **Featured Products**: Latest products showcase

Benefits:
- Update content without deploying code
- Add/remove items dynamically
- Schedule content by toggling the "active" column
- 5-minute caching for optimal performance

## 🚀 Setup Instructions

### Step 1: Create Your Google Sheet

1. Create a new Google Sheet
2. Name it something like "Skytech Aviation - Website Content"
3. Create **4 separate sheets** (tabs) within this document:
   - `HeroSlides`
   - `Stats`
   - `Testimonials`
   - `Products`

### Step 2: Configure Each Sheet

#### Sheet 1: HeroSlides

**Add these columns in Row 1:**

| Column | Header | Type | Example | Required |
|--------|--------|------|---------|----------|
| A | id | text | "slide1" | ✅ |
| B | title | text | "Authorized Civil Aircraft Parts Supplier" | ✅ |
| C | subtitle | text | "Your Trusted Partner" | ❌ |
| D | description | text | "Providing premium quality..." | ❌ |
| E | mediaType | text | "image" or "video" | ✅ |
| F | mediaUrl | url | https://images.unsplash.com/... | ✅ |
| G | ctaText1 | text | "View Products" | ❌ |
| H | ctaLink1 | url | /products | ❌ |
| I | ctaText2 | text | "Become a Distributor" | ❌ |
| J | ctaLink2 | url | /distributors | ❌ |
| K | trustBadge | text | "ASA Member Since 2022" | ❌ |
| L | active | boolean | "TRUE" or "FALSE" | ✅ |

**Carousel Timing:**
- Image slides: 5 seconds
- Video slides: 10 seconds
- Transition: 700ms fade

**Example Row 2:**
```
1 | Authorized Civil Aircraft Parts Supplier | Your Trusted Partner | Providing premium quality... | image | https://images.unsplash.com/photo-1436491865332 | View Products | /products | Become a Distributor | /distributors | ASA Member Since 2015 | TRUE
```

---

#### Sheet 2: Stats

**Add these columns in Row 1:**

| Column | Header | Type | Example | Required |
|--------|--------|------|---------|----------|
| A | id | text | "years" | ✅ |
| B | value | number | 15 | ✅ |
| C | label | text | "Years of Excellence" | ✅ |
| D | suffix | text | "+" | ❌ |
| E | prefix | text | "$" | ❌ |
| F | active | boolean | "TRUE" or "FALSE" | ✅ |

**Example Rows:**
```
Row 2: years | 15 | Years of Excellence | + | | TRUE
Row 3: parts | 10000 | Parts Available | + | | TRUE
Row 4: countries | 25 | Countries Served | + | | TRUE
Row 5: airlines | 50 | Airline Partners | + | | TRUE
```

---

#### Sheet 3: Testimonials

**Add these columns in Row 1:**

| Column | Header | Type | Example | Required |
|--------|--------|------|---------|----------|
| A | id | text | "testimonial1" | ✅ |
| B | name | text | "Ahmed Al-Mansouri" | ✅ |
| C | role | text | "Procurement Manager" | ✅ |
| D | company | text | "Gulf Airlines" | ✅ |
| E | content | text | "Exceptional service and quality..." | ✅ |
| F | rating | number | 5 (1-5 stars) | ✅ |
| G | imageUrl | url | https://... | ❌ |
| H | active | boolean | "TRUE" or "FALSE" | ✅ |

**Example Row 2:**
```
testimonial1 | Ahmed Al-Mansouri | Procurement Manager | Gulf Airlines | Exceptional service and quality parts. Skytech has been our trusted partner for over 5 years. | 5 | https://ui-avatars.com/api/?name=Ahmed+Al-Mansouri | TRUE
```

---

#### Sheet 4: Products

**Add these columns in Row 1:**

| Column | Header | Type | Example | Required |
|--------|--------|------|---------|----------|
| A | id | text | "product1" | ✅ |
| B | name | text | "CFM56-7B Engine" | ✅ |
| C | partNumber | text | "CFM56-7B-27" | ❌ |
| D | category | text | "Aircraft Engines" | ✅ |
| E | manufacturer | text | "CFM International" | ❌ |
| F | aircraftModel | text | "Boeing 737NG" | ❌ |
| G | description | text | "High-performance turbofan engine..." | ✅ |
| H | imageUrl | url | https://... | ✅ |
| I | availability | text | "In Stock", "On Request", or "Limited" | ✅ |
| J | specifications | text | "Thrust: 20,000 lbf \| Weight: 5,216 lb" | ❌ |
| K | link | url | /products/cfm56 | ❌ |
| L | active | boolean | "TRUE" or "FALSE" | ✅ |

**Availability Badge Colors:**
- "In Stock" → Green badge
- "On Request" → Yellow badge
- "Limited" → Orange badge

**Example Row 2:**
```
product1 | CFM56-7B Engine Components | CFM56-7B-27 | Aircraft Engines | CFM International | Boeing 737NG | High-performance turbofan engine for Boeing 737NG series | https://... | In Stock | Thrust: 20,000-27,300 lbf | Weight: 5,216 lb | Length: 98.9 in | /products/cfm56 | TRUE
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
   ```

3. Restart your development server:
   ```bash
   npm start
   ```

## 📊 Sheet Ranges Configuration

The application automatically reads from these ranges:

```typescript
SHEET_RANGES = {
  heroSlides: 'HeroSlides!A2:L100',      // Hero carousel slides
  stats: 'Stats!A2:F100',                // Statistics counters
  testimonials: 'Testimonials!A2:H100',  // Customer testimonials
  products: 'Products!A2:H100',          // Featured products
}
```

**Note:** Row 1 is always the header row. Data starts from Row 2.

## 🎯 Default Fallback Data

If Google Sheets is not configured or unavailable, the application will display default content:

- **Hero Slides**: 3 slides showcasing company services
- **Stats**: 4 metrics (Years, Parts, Countries, Airlines)
- **Testimonials**: 4 customer reviews
- **Products**: 4 featured products

To update defaults, edit: `src/config/googleSheets.ts`

## ⚡ Performance & Caching

- **Cache Duration**: 5 minutes per data type
- **Separate Caches**: Each section (Hero, Stats, Testimonials, Products) has independent caching
- **Manual Refresh**: Cache can be cleared via service methods:
  ```typescript
  import { googleSheetsService } from '@/services/googleSheetsService';
  
  // Clear all caches
  googleSheetsService.clearCache();
  
  // Refresh all data
  await googleSheetsService.refresh();
  ```

## 📝 Sample Data Templates

### HeroSlides Sample Data

**Slide 1: Main Hero**
```
1 | Authorized Civil Aircraft Parts Supplier | Your Trusted Partner for Authentic Aviation Components | Providing premium quality aircraft parts and components to airlines, MROs, and distributors across the Middle East, Africa, and beyond. | image | https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920&q=80 | View Products | /products | Become a Distributor | /distributors | ASA Member Since 2015 | true
```

**Slide 2: AOG Support**
```
2 | 24/7 AOG Support | Aircraft on Ground? We're Here to Help | Emergency parts sourcing and delivery with our dedicated AOG support team. | image | https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=1920&q=80 | Contact AOG Team | /contact | View Services | /services | ISO 9001:2015 Certified | TRUE
```

**Slide 3: Partnership**
```
3 | Global Distribution Network | Serving Airlines Worldwide | Partner with us to access authentic OEM parts with full traceability and certification. | image | https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1920&q=80 | Become a Partner | /distributors | Learn More | /about | Trusted by 50+ Airlines | TRUE
```

### Stats Sample Data

```
years | 15 | Years of Excellence | + | | TRUE
parts | 10000 | Parts Available | + | | TRUE
countries | 25 | Countries Served | + | | TRUE
airlines | 50 | Airline Partners | + | | TRUE
```

### Testimonials Sample Data

```
testimonial1 | Ahmed Al-Mansouri | Procurement Manager | Gulf Airlines | Exceptional service and quality parts. Skytech has been our trusted partner for over 5 years. Their team understands the urgency of our industry. | 5 | https://ui-avatars.com/api/?name=Ahmed+Al-Mansouri | TRUE

testimonial2 | Sarah Johnson | Supply Chain Director | Atlantic Air | The professionalism and reliability of Skytech Aviation is unmatched. They consistently deliver authentic parts with complete documentation. | 5 | https://ui-avatars.com/api/?name=Sarah+Johnson | TRUE
```

### Products Sample Data

```
product1 | CFM56-7B Engine | Engines | High-performance turbofan engine for Boeing 737NG series with full documentation and certification | https://images.unsplash.com/photo-1540962351504-03099e0a754b | In Stock | /products/cfm56 | TRUE

product2 | Boeing 737 Landing Gear | Landing Systems | Complete landing gear assembly with inspection reports and airworthiness certificates | https://images.unsplash.com/photo-1583939003579-730e3918a45a | On Request | /products/landing-gear | TRUE

product3 | Honeywell Avionics Suite | Avionics | State-of-the-art avionics systems for modern commercial aircraft | https://images.unsplash.com/photo-1559827260-dc66d52bef19 | Limited | /products/avionics | TRUE
```

## 🎥 Using Videos (Hero Slides Only)

To use a video background instead of an image:

1. Set `mediaType` to `video`
2. Use a direct video URL in `mediaUrl`
3. Supported formats: MP4 (recommended), WebM
4. **Video slides display for 10 seconds** (vs 5 seconds for images)

**Example:**
```
slide4 | Experience Our Facility | State-of-the-Art Warehousing | ... | video | https://your-cdn.com/warehouse-tour.mp4 | ... | TRUE
```

## 🔄 Updating Content

### To Add New Items:
1. Add a new row to the appropriate sheet
2. Fill in all required columns
3. Set `active` to `TRUE`
4. Wait 5 minutes for cache to refresh (or force refresh)

### To Remove Items:
1. Set `active` to `FALSE` (recommended - preserves data)
2. OR delete the row entirely
3. Changes appear within 5 minutes

### To Reorder Items:
1. Simply rearrange rows in the sheet
2. Items display in the order they appear
3. Changes appear within 5 minutes

3. Changes appear within 5 minutes

## 🎨 Media Guidelines

### Images (Hero Slides & Products)

**Recommended Specifications:**
- **Format**: JPG or WebP
- **Dimensions**: 1920×1080 (Full HD) or higher
- **Aspect Ratio**: 16:9
- **File Size**: < 500KB (optimized)
- **Quality**: 80-85% compression

**Free Stock Photo Sources:**
- [Unsplash](https://unsplash.com/s/photos/aircraft)
- [Pexels](https://www.pexels.com/search/aviation/)
- [Pixabay](https://pixabay.com/images/search/airplane/)

### Videos (Hero Slides Only)

**Recommended Specifications:**
- **Format**: MP4 (H.264 codec)
- **Dimensions**: 1920×1080 or 1280×720
- **Duration**: 10-30 seconds
- **File Size**: < 5MB
- **Auto-play**: Videos loop automatically, muted

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

### Content not updating

**Solutions:**
1. Check browser console for errors
2. Verify Sheet ID is correct in `.env`
3. Ensure sheet is publicly accessible
4. Wait 5 minutes for cache to expire
5. Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
6. Force refresh via console: `googleSheetsService.clearCache()`

### "No data found" error

**Solutions:**
1. Verify sheet names match exactly: `HeroSlides`, `Stats`, `Testimonials`, `Products`
2. Ensure column headers match exactly (case-sensitive)
3. Ensure data starts in Row 2 (Row 1 is headers)
4. Verify at least one item has `active: TRUE`
5. Check sheet is published/shared properly

### Images not loading

**Solutions:**
1. Use HTTPS URLs only (not HTTP)
2. Check image URL is publicly accessible
3. Verify CORS headers (use CDN or Unsplash)
4. Test URL directly in browser
5. Use proper URL encoding for special characters

### Stats counter not animating

**Solutions:**
1. Ensure `value` column contains numbers only
2. Check scroll position (animation triggers on scroll)
3. Verify IntersectionObserver is supported
4. Check browser console for JavaScript errors

### Testimonials carousel not rotating

**Solutions:**
1. Ensure at least 2 testimonials are active
2. Check `rating` column has values 1-5
3. Verify JavaScript is enabled
4. Check browser console for errors

### Products not displaying

**Solutions:**
1. Verify `availability` column has exact values: "In Stock", "On Request", or "Limited"
2. Check `link` column has valid URLs
3. Ensure `imageUrl` is publicly accessible
4. Verify at least 1 product has `active: TRUE`

### API quota exceeded

**Solutions:**
- Increase cache duration in `src/config/googleSheets.ts`
- Current: 5 minutes (300,000ms)
- Suggested: 15-30 minutes for production
- Consider upgrading Google Cloud quota limits

## 📱 Testing Checklist

### Development Testing:
```bash
npm run dev
```

**Verify:**
- [ ] Hero carousel displays all active slides
- [ ] Image slides advance after 5 seconds
- [ ] Video slides advance after 10 seconds
- [ ] Stats counter animates on scroll
- [ ] Testimonials carousel auto-rotates every 6 seconds
- [ ] Products grid shows first 4 active products
- [ ] Loading states appear during fetch
- [ ] Fallback data displays when sheets not configured

### Production Testing:
```bash
npm run build
npm run preview
```

**Verify:**
- [ ] All sections render correctly
- [ ] No console errors
- [ ] Images load properly
- [ ] Links work correctly
- [ ] Mobile responsive design
- [ ] Performance metrics acceptable

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

## ⏱️ Carousel Timing Configuration

The Hero Carousel auto-advance timing is configured in `src/config/googleSheets.ts`:

```typescript
export const CAROUSEL_TIMING: CarouselTimingConfig = {
  imageSlideInterval: 5000,  // 5 seconds for image slides
  videoSlideInterval: 10000, // 10 seconds for video slides (longer to show video content)
  transitionDuration: 700,   // 700ms smooth transition
};
```

### Customizing Timing

To change how long each slide displays:

1. Open `src/config/googleSheets.ts`
2. Modify the `CAROUSEL_TIMING` values:
   - `imageSlideInterval` - Milliseconds to show image slides (default: 5000ms = 5 seconds)
   - `videoSlideInterval` - Milliseconds to show video slides (default: 10000ms = 10 seconds)
   - `transitionDuration` - Milliseconds for fade transition (default: 700ms)

**Examples:**

```typescript
// Fast carousel (3s images, 7s videos)
imageSlideInterval: 3000,
videoSlideInterval: 7000,

// Slow carousel (8s images, 15s videos)
imageSlideInterval: 8000,
videoSlideInterval: 15000,

// Quick transitions
transitionDuration: 400,

// Smooth slow transitions
transitionDuration: 1000,
```

**Note:** Video slides automatically get more time to allow users to watch the video content. Adjust based on your video duration.

## 🤝 Support

For issues or questions:
1. Check the troubleshooting section above
2. Review browser console for errors
3. Verify Google Sheets permissions
4. Contact development team

---

**Last Updated:** November 2025  
**Version:** 1.1.0
