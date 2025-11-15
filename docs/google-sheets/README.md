# Google Sheets Integration

This folder contains documentation and configuration for the Google Sheets API integration used in the Hero Carousel.

## 📄 Documentation

### GOOGLE_SHEETS_SETUP.md
Complete setup guide for Google Sheets integration, including:
- Google Cloud Console project setup
- Google Sheets API enablement
- API key generation
- Sheet structure and column definitions
- Environment variable configuration
- Testing and troubleshooting

## 🔧 Configuration Files

### .env.example
Template for environment variables required for Google Sheets integration.

**Required variables:**
```env
VITE_GOOGLE_SHEET_ID=your_sheet_id_here
VITE_GOOGLE_API_KEY=your_api_key_here
VITE_GOOGLE_SHEET_RANGE=HeroSlides!A2:L100
VITE_GOOGLE_WEBHOOK_URL=optional_webhook_url
```

## 📊 Sheet Structure

The Google Sheet should have the following columns (A-L):

| Column | Field | Type | Required | Description |
|--------|-------|------|----------|-------------|
| A | id | string | Yes | Unique identifier for the slide |
| B | title | string | Yes | Main heading text |
| C | subtitle | string | No | Secondary heading text |
| D | description | string | No | Body text description |
| E | mediaType | 'image'\|'video' | Yes | Type of background media |
| F | mediaUrl | string | Yes | URL to media file |
| G | ctaText1 | string | No | First call-to-action button text |
| H | ctaLink1 | string | No | First button link |
| I | ctaText2 | string | No | Second call-to-action button text |
| J | ctaLink2 | string | No | Second button link |
| K | trustBadge | string | No | Trust indicator text |
| L | active | 'TRUE'\|'FALSE' | Yes | Whether slide is active |

## 🚀 Quick Start

1. **Create a copy** of `.env.example` in the root directory as `.env`
2. **Follow the setup guide** in `GOOGLE_SHEETS_SETUP.md`
3. **Add your credentials** to the `.env` file
4. **Restart the development server** to apply changes

```bash
# Copy environment template
cp docs/google-sheets/.env.example .env

# Edit .env with your credentials
nano .env

# Restart dev server
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
