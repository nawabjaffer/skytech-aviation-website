# Google Sheets Integration

This folder contains documentation and configuration for the Google Sheets API integration used throughout the Skytech Aviation website.

## 📄 Documentation

### [GOOGLE_SHEETS_SETUP.md](./GOOGLE_SHEETS_SETUP.md)
**Complete setup guide** for Google Sheets integration, including:
- 4-sheet structure (HeroSlides, Stats, Testimonials, Products)
- Column definitions for each sheet
- Google Cloud Console setup
- API key generation
- Environment variable configuration
- Sample data templates
- Testing and troubleshooting

### [CAROUSEL_TIMING_UPDATE.md](./CAROUSEL_TIMING_UPDATE.md)
**Carousel timing configuration** documentation:
- Configurable slide intervals
- Image slides: 5 seconds
- Video slides: 10 seconds
- Transition duration: 700ms
- Implementation details

### [DYNAMIC_DATA_INTEGRATION.md](./DYNAMIC_DATA_INTEGRATION.md)
**Technical summary** of dynamic data integration:
- Architecture overview
- Data flow diagrams
- TypeScript interfaces
- Caching strategy
- Default fallback data
- Files modified
- Performance metrics

## 🎯 Integrated Sections

The website uses Google Sheets to manage content for:

1. **Hero Carousel** - Rotating hero slides with images/videos and CTAs
2. **Statistics Section** - Animated counters showing company metrics
3. **Testimonials Carousel** - Customer reviews and ratings
4. **Featured Products** - Latest products showcase

All sections support:
- ✅ Dynamic content updates without code deployment
- ✅ 5-minute caching for optimal performance
- ✅ Automatic fallback to default data
- ✅ Active/inactive toggle per item

## 🔧 Configuration Files

### .env.example
Template for environment variables required for Google Sheets integration.

**Required variables:**
```env
VITE_GOOGLE_SHEET_ID=your_sheet_id_here
VITE_GOOGLE_API_KEY=your_api_key_here  # Optional for public sheets
```

**Deprecated variables** (ranges now hardcoded in config):
```env
# VITE_GOOGLE_SHEET_RANGE=Sheet1!A2:L100  # No longer used
# VITE_GOOGLE_WEBHOOK_URL=optional_webhook_url  # Reserved for future use
```

## 📊 Sheet Structure Overview

The Google Sheets document should contain **4 separate sheets**:

### 1. HeroSlides (A-L, 12 columns)
- id, title, subtitle, description
- mediaType, mediaUrl
- ctaText1, ctaLink1, ctaText2, ctaLink2
- trustBadge, active

### 2. Stats (A-F, 6 columns)
- id, value, label
- suffix, prefix, active

### 3. Testimonials (A-H, 8 columns)
- id, name, role, company
- content, rating, imageUrl, active

### 4. Products (A-H, 8 columns)
- id, name, category, description
- imageUrl, availability, link, active

📖 **For detailed column specifications, see [GOOGLE_SHEETS_SETUP.md](./GOOGLE_SHEETS_SETUP.md)**

## 🚀 Quick Start

1. **Read the setup guide** - See [GOOGLE_SHEETS_SETUP.md](./GOOGLE_SHEETS_SETUP.md)
2. **Create Google Sheet** - Create 4 sheets: HeroSlides, Stats, Testimonials, Products
3. **Get Sheet ID** - Copy from your Google Sheets URL
4. **Configure environment** - Add to `.env` file:
   ```bash
   VITE_GOOGLE_SHEET_ID=your_sheet_id_here
   VITE_GOOGLE_API_KEY=your_api_key_here  # Optional
   ```
5. **Restart dev server** - `npm run dev`

## 🎨 Features

### Carousel Timing
- **Image slides:** 5 seconds
- **Video slides:** 10 seconds (more time to watch)
- **Transition:** 700ms smooth fade
- **Configurable:** See `src/config/googleSheets.ts`

### Caching System
- **Duration:** 5 minutes per section
- **Strategy:** Separate cache for each data type
- **Fallback:** Automatic default data if fetch fails
- **Manual control:** `googleSheetsService.clearCache()`

### Data Validation
- Type-safe TypeScript interfaces
- Active/inactive filtering
- Required field validation
- Rating bounds (1-5 stars)
- Availability enum validation

## 🏗️ Technical Architecture

```
Google Sheets API
       ↓
src/services/googleSheetsService.ts (fetch + parse + cache)
       ↓
src/config/googleSheets.ts (interfaces + defaults)
       ↓
React Components (Hero, Stats, Testimonials, Products)
       ↓
User Interface (with loading states + error handling)
```

## 📦 Related Files

### Configuration
- `src/config/googleSheets.ts` - Interfaces, ranges, defaults, timing
- `.env` - Environment variables

### Services
- `src/services/googleSheetsService.ts` - API integration

### Components
- `src/components/HeroCarousel.tsx` - Hero slides
- `src/components/StatsSection.tsx` - Statistics counters
- `src/components/TestimonialsCarousel.tsx` - Customer reviews
- `src/components/LatestProductsSection.tsx` - Product showcase

## 🔍 Troubleshooting

Common issues and solutions:

**Content not updating?**
- Wait 5 minutes for cache expiration
- Hard refresh: Ctrl+Shift+R (Win) or Cmd+Shift+R (Mac)
- Check browser console for errors

**"No data found"?**
- Verify sheet names are exact: `HeroSlides`, `Stats`, `Testimonials`, `Products`
- Ensure data starts in Row 2 (Row 1 = headers)
- Check at least one item has `active: TRUE`

**Images not loading?**
- Use HTTPS URLs only
- Verify public accessibility
- Test URL in browser directly

📖 **For detailed troubleshooting, see [GOOGLE_SHEETS_SETUP.md](./GOOGLE_SHEETS_SETUP.md)**

## 📚 Additional Resources

- [Google Sheets API Documentation](https://developers.google.com/sheets/api)
- [Google Cloud Console](https://console.cloud.google.com/)
- [Unsplash](https://unsplash.com/) - Free stock aviation photos

## ✅ Status

**Current Version:** v1.0.0  
**Last Updated:** December 2024  
**Status:** ✅ Production Ready

**Integrated Sections:**
- ✅ Hero Carousel with image/video support
- ✅ Statistics Section with animated counters
- ✅ Testimonials Carousel with ratings
- ✅ Featured Products with availability badges

**Build Status:** ✅ Passing (364.83 kB gzipped)  
**TypeScript:** ✅ No errors  
**Tests:** ⏳ Pending manual testing

npm run dev
```

## 🔍 Related Code

**Service Layer:**
- `src/services/googleSheetsService.ts` - API integration with caching
- `src/config/googleSheets.ts` - Configuration and TypeScript interfaces

**Components:**
- `src/components/HeroCarousel.tsx` - Uses the Google Sheets data

**Default Data:**
- `src/config/googleSheets.ts` - Contains `DEFAULT_HERO_SLIDES` as fallback

## ⚡ Features

- **5-minute caching** - Reduces API calls and improves performance
- **Automatic fallback** - Uses default slides if Sheet not configured
- **Error handling** - Graceful degradation on network failures
- **Real-time updates** - Changes in Google Sheets reflect after cache expires
- **Type safety** - Full TypeScript support with interfaces

## 🐛 Troubleshooting

**No slides showing:**
- Check `.env` file exists in root with correct credentials
- Verify Google Sheets API is enabled in Google Cloud Console
- Check browser console for API errors
- Verify sheet ID and range are correct

**Slides not updating:**
- Clear the 5-minute cache by refreshing the page
- Check the `active` column is set to `TRUE`
- Verify row data is complete (required fields filled)

**API quota exceeded:**
- Default quota: 100 requests/100 seconds/user
- Caching reduces requests to ~12 per hour max
- Consider upgrading quota if needed

For detailed troubleshooting, see `GOOGLE_SHEETS_SETUP.md`.
