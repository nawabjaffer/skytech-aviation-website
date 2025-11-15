import axios from 'axios';
import googleSheetsConfig, { 
  HeroSlide, 
  StatItem,
  Testimonial,
  Product,
  DEFAULT_HERO_SLIDES,
  DEFAULT_STATS,
  DEFAULT_TESTIMONIALS,
  DEFAULT_PRODUCTS,
  SHEET_RANGES,
} from '../config/googleSheets';

/**
 * Google Sheets Service
 * Fetches dynamic content from Google Sheets API
 */

interface CacheItem<T> {
  data: T[];
  timestamp: number;
}

class GoogleSheetsService {
  private baseUrl = 'https://sheets.googleapis.com/v4/spreadsheets';
  private heroCache: CacheItem<HeroSlide> | null = null;
  private statsCache: CacheItem<StatItem> | null = null;
  private testimonialsCache: CacheItem<Testimonial> | null = null;
  private productsCache: CacheItem<Product> | null = null;
  private cacheDuration = 5 * 60 * 1000; // 5 minutes

  /**
   * Fetch hero slides from Google Sheets
   * Uses cache to reduce API calls
   */
  async getHeroSlides(): Promise<HeroSlide[]> {
    // Return cached data if still valid
    if (this.heroCache && Date.now() - this.heroCache.timestamp < this.cacheDuration) {
      return this.heroCache.data;
    }

    // If no sheet ID configured, return default slides
    if (!googleSheetsConfig.sheetId) {
      console.warn('Google Sheets not configured. Using default hero slides.');
      return DEFAULT_HERO_SLIDES;
    }

    try {
      const url = this.buildUrl(SHEET_RANGES.heroSlides);
      const response = await axios.get(url, {
        timeout: 10000, // 10 second timeout
      });

      const slides = this.parseHeroSlides(response.data.values);
      
      // Update cache
      this.heroCache = {
        data: slides,
        timestamp: Date.now(),
      };

      return slides;
    } catch (error) {
      console.error('Error fetching hero slides:', error);
      
      // Return cached data if available, otherwise use defaults
      if (this.heroCache) {
        console.warn('Using cached hero slides due to fetch error');
        return this.heroCache.data;
      }
      
      console.warn('Falling back to default hero slides');
      return DEFAULT_HERO_SLIDES;
    }
  }

  /**
   * Fetch stats from Google Sheets
   */
  async getStats(): Promise<StatItem[]> {
    if (this.statsCache && Date.now() - this.statsCache.timestamp < this.cacheDuration) {
      return this.statsCache.data;
    }

    if (!googleSheetsConfig.sheetId) {
      return DEFAULT_STATS;
    }

    try {
      const url = this.buildUrl(SHEET_RANGES.stats);
      const response = await axios.get(url, { timeout: 10000 });
      const stats = this.parseStats(response.data.values);
      
      this.statsCache = {
        data: stats,
        timestamp: Date.now(),
      };

      return stats;
    } catch (error) {
      console.error('Error fetching stats:', error);
      return this.statsCache?.data || DEFAULT_STATS;
    }
  }

  /**
   * Fetch testimonials from Google Sheets
   */
  async getTestimonials(): Promise<Testimonial[]> {
    if (this.testimonialsCache && Date.now() - this.testimonialsCache.timestamp < this.cacheDuration) {
      return this.testimonialsCache.data;
    }

    if (!googleSheetsConfig.sheetId) {
      return DEFAULT_TESTIMONIALS;
    }

    try {
      const url = this.buildUrl(SHEET_RANGES.testimonials);
      const response = await axios.get(url, { timeout: 10000 });
      const testimonials = this.parseTestimonials(response.data.values);
      
      this.testimonialsCache = {
        data: testimonials,
        timestamp: Date.now(),
      };

      return testimonials;
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      return this.testimonialsCache?.data || DEFAULT_TESTIMONIALS;
    }
  }

  /**
   * Fetch products from Google Sheets
   */
  async getProducts(): Promise<Product[]> {
    if (this.productsCache && Date.now() - this.productsCache.timestamp < this.cacheDuration) {
      return this.productsCache.data;
    }

    if (!googleSheetsConfig.sheetId) {
      return DEFAULT_PRODUCTS;
    }

    try {
      const url = this.buildUrl(SHEET_RANGES.products);
      const response = await axios.get(url, { timeout: 10000 });
      const products = this.parseProducts(response.data.values);
      
      this.productsCache = {
        data: products,
        timestamp: Date.now(),
      };

      return products;
    } catch (error) {
      console.error('Error fetching products:', error);
      return this.productsCache?.data || DEFAULT_PRODUCTS;
    }
  }

  /**
   * Build Google Sheets API URL
   */
  private buildUrl(range: string): string {
    const { sheetId, apiKey } = googleSheetsConfig;
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
  private parseHeroSlides(rows: any[][]): HeroSlide[] {
    if (!rows || rows.length === 0) {
      console.warn('No data found in HeroSlides sheet');
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
   * Parse raw sheet data into StatItem objects
   * Expected columns: id, value, label, suffix, prefix, active
   */
  private parseStats(rows: any[][]): StatItem[] {
    if (!rows || rows.length === 0) {
      return DEFAULT_STATS;
    }

    const stats: StatItem[] = [];

    for (const row of rows) {
      if (!row || row.length === 0) continue;

      const [id, value, label, suffix, prefix, active] = row;

      if (active?.toLowerCase() !== 'true') continue;
      if (!id || !value || !label) continue;

      stats.push({
        id: String(id),
        value: Number(value) || 0,
        label: String(label),
        suffix: suffix ? String(suffix) : undefined,
        prefix: prefix ? String(prefix) : undefined,
        active: true,
      });
    }

    return stats.length > 0 ? stats : DEFAULT_STATS;
  }

  /**
   * Parse raw sheet data into Testimonial objects
   * Expected columns: id, name, role, company, content, rating, imageUrl, active
   */
  private parseTestimonials(rows: any[][]): Testimonial[] {
    if (!rows || rows.length === 0) {
      return DEFAULT_TESTIMONIALS;
    }

    const testimonials: Testimonial[] = [];

    for (const row of rows) {
      if (!row || row.length === 0) continue;

      const [id, name, role, company, content, rating, imageUrl, active] = row;

      if (active?.toLowerCase() !== 'true') continue;
      if (!id || !name || !content) continue;

      testimonials.push({
        id: String(id),
        name: String(name),
        role: String(role || ''),
        company: String(company || ''),
        content: String(content),
        rating: Math.min(5, Math.max(1, Number(rating) || 5)),
        imageUrl: imageUrl ? String(imageUrl) : undefined,
        active: true,
      });
    }

    return testimonials.length > 0 ? testimonials : DEFAULT_TESTIMONIALS;
  }

  /**
   * Parse raw sheet data into Product objects
   * Expected columns: id, name, category, description, imageUrl, availability, link, active
   */
  private parseProducts(rows: any[][]): Product[] {
    if (!rows || rows.length === 0) {
      return DEFAULT_PRODUCTS;
    }

    const products: Product[] = [];

    for (const row of rows) {
      if (!row || row.length === 0) continue;

      const [id, name, category, description, imageUrl, availability, link, active] = row;

      if (active?.toLowerCase() !== 'true') continue;
      if (!id || !name || !imageUrl) continue;

      const validAvailability = ['In Stock', 'On Request', 'Limited'].includes(availability)
        ? availability
        : 'On Request';

      products.push({
        id: String(id),
        name: String(name),
        category: String(category || ''),
        description: String(description || ''),
        imageUrl: String(imageUrl),
        availability: validAvailability as 'In Stock' | 'On Request' | 'Limited',
        link: link ? String(link) : undefined,
        active: true,
      });
    }

    return products.length > 0 ? products : DEFAULT_PRODUCTS;
  }

  /**
   * Clear the cache (useful for testing or manual refresh)
   */
  clearCache(): void {
    this.heroCache = null;
    this.statsCache = null;
    this.testimonialsCache = null;
    this.productsCache = null;
  }

  /**
   * Manually refresh data from Google Sheets
   */
  async refresh(): Promise<void> {
    this.clearCache();
    await Promise.all([
      this.getHeroSlides(),
      this.getStats(),
      this.getTestimonials(),
      this.getProducts(),
    ]);
  }
}

// Export singleton instance
export const googleSheetsService = new GoogleSheetsService();
export default googleSheetsService;
