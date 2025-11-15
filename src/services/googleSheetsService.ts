import axios from 'axios';
import googleSheetsConfig, { HeroSlide, DEFAULT_HERO_SLIDES } from '../config/googleSheets';

/**
 * Google Sheets Service
 * Fetches hero carousel data from Google Sheets API
 */

class GoogleSheetsService {
  private baseUrl = 'https://sheets.googleapis.com/v4/spreadsheets';
  private cache: HeroSlide[] | null = null;
  private cacheTimestamp: number = 0;
  private cacheDuration = 5 * 60 * 1000; // 5 minutes

  /**
   * Fetch hero slides from Google Sheets
   * Uses cache to reduce API calls
   */
  async getHeroSlides(): Promise<HeroSlide[]> {
    // Return cached data if still valid
    if (this.cache && Date.now() - this.cacheTimestamp < this.cacheDuration) {
      return this.cache;
    }

    // If no sheet ID configured, return default slides
    if (!googleSheetsConfig.sheetId) {
      console.warn('Google Sheets not configured. Using default hero slides.');
      return DEFAULT_HERO_SLIDES;
    }

    try {
      const url = this.buildUrl();
      const response = await axios.get(url, {
        timeout: 10000, // 10 second timeout
      });

      const slides = this.parseSheetData(response.data.values);
      
      // Update cache
      this.cache = slides;
      this.cacheTimestamp = Date.now();

      return slides;
    } catch (error) {
      console.error('Error fetching Google Sheets data:', error);
      
      // Return cached data if available, otherwise use defaults
      if (this.cache) {
        console.warn('Using cached data due to fetch error');
        return this.cache;
      }
      
      console.warn('Falling back to default hero slides');
      return DEFAULT_HERO_SLIDES;
    }
  }

  /**
   * Build Google Sheets API URL
   */
  private buildUrl(): string {
    const { sheetId, range, apiKey } = googleSheetsConfig;
    let url = `${this.baseUrl}/${sheetId}/values/${range}`;
    
    if (apiKey) {
      url += `?key=${apiKey}`;
    }
    
    return url;
  }

  /**
   * Parse raw sheet data into HeroSlide objects
   * Expected columns: id, title, subtitle, description, mediaType, mediaUrl, 
   *                   ctaText1, ctaLink1, ctaText2, ctaLink2, trustBadge, active
   */
  private parseSheetData(rows: any[][]): HeroSlide[] {
    if (!rows || rows.length === 0) {
      console.warn('No data found in Google Sheet');
      return DEFAULT_HERO_SLIDES;
    }

    const slides: HeroSlide[] = [];

    for (const row of rows) {
      // Skip empty rows
      if (!row || row.length === 0) continue;

      const [
        id,
        title,
        subtitle,
        description,
        mediaType,
        mediaUrl,
        ctaText1,
        ctaLink1,
        ctaText2,
        ctaLink2,
        trustBadge,
        active,
      ] = row;

      // Skip inactive slides
      if (active?.toLowerCase() !== 'true') continue;

      // Validate required fields
      if (!id || !title || !mediaUrl) {
        console.warn('Skipping row with missing required fields:', row);
        continue;
      }

      // Validate mediaType
      if (mediaType !== 'image' && mediaType !== 'video') {
        console.warn('Invalid mediaType, defaulting to image:', mediaType);
      }

      slides.push({
        id: String(id),
        title: String(title),
        subtitle: String(subtitle || ''),
        description: String(description || ''),
        mediaType: mediaType === 'video' ? 'video' : 'image',
        mediaUrl: String(mediaUrl),
        ctaText1: ctaText1 ? String(ctaText1) : undefined,
        ctaLink1: ctaLink1 ? String(ctaLink1) : undefined,
        ctaText2: ctaText2 ? String(ctaText2) : undefined,
        ctaLink2: ctaLink2 ? String(ctaLink2) : undefined,
        trustBadge: trustBadge ? String(trustBadge) : undefined,
        active: true,
      });
    }

    // Return defaults if no valid slides found
    if (slides.length === 0) {
      console.warn('No valid slides found in Google Sheet');
      return DEFAULT_HERO_SLIDES;
    }

    return slides;
  }

  /**
   * Clear the cache (useful for testing or manual refresh)
   */
  clearCache(): void {
    this.cache = null;
    this.cacheTimestamp = 0;
  }

  /**
   * Manually refresh data from Google Sheets
   */
  async refresh(): Promise<HeroSlide[]> {
    this.clearCache();
    return this.getHeroSlides();
  }
}

// Export singleton instance
export const googleSheetsService = new GoogleSheetsService();
export default googleSheetsService;
