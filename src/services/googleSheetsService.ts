import axios from 'axios';
import googleSheetsConfig, { 
  HeroSlide, 
  StatItem,
  Testimonial,
  Product,
  ExistingDistributor,
  DistributorApplication,
  FAQ,
  DEFAULT_HERO_SLIDES,
  DEFAULT_STATS,
  DEFAULT_TESTIMONIALS,
  DEFAULT_PRODUCTS,
  DEFAULT_DISTRIBUTORS,
  DEFAULT_FAQ,
  SHEET_RANGES,
  SHEET_GIDS,
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
  private distributorsCache: CacheItem<ExistingDistributor> | null = null;
  private faqCache: CacheItem<FAQ> | null = null;
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
      const rows = await this.fetchCsvData(SHEET_GIDS.heroSlides);
      const slides = this.parseHeroSlides(rows);
      
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
      const rows = await this.fetchCsvData(SHEET_GIDS.stats);
      console.log('✓ Loaded stats:', rows);
      const stats = this.parseStats(rows);

      console.log('✓ Loaded stats:', stats);
      
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
      const rows = await this.fetchCsvData(SHEET_GIDS.testimonials);
      const testimonials = this.parseTestimonials(rows);
      
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
      const rows = await this.fetchCsvData(SHEET_GIDS.products);
      const products = this.parseProducts(rows);
      
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
   * Fetch FAQs from Google Sheets
   */
  async getFAQs(): Promise<FAQ[]> {
    if (this.faqCache && Date.now() - this.faqCache.timestamp < this.cacheDuration) {
      return this.faqCache.data;
    }

    if (!googleSheetsConfig.sheetId) {
      return DEFAULT_FAQ;
    }

    try {
      const rows = await this.fetchCsvData(SHEET_GIDS.faq);
      const faqs = this.parseFAQs(rows);
      
      this.faqCache = {
        data: faqs,
        timestamp: Date.now(),
      };

      return faqs;
    } catch (error) {
      console.error('Error fetching FAQs:', error);
      return this.faqCache?.data || DEFAULT_FAQ;
    }
  }

  /**
   * Build Google Sheets CSV export URL with GID parameter
   * @param gid - The sheet GID (tab identifier)
   */
  private buildCsvUrl(gid: string): string {
    const { sheetId } = googleSheetsConfig;
    return `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&gid=${gid}`;
  }

  /**
   * Fetch CSV data from public Google Sheet (no API key required)
   * @param gid - The sheet GID (tab identifier from URL)
   */
  private async fetchCsvData(gid: string): Promise<string[][]> {
    try {
      const csvUrl = this.buildCsvUrl(gid);
      
      const response = await axios.get(csvUrl, {
        timeout: 10000,
        responseType: 'text',
      });

      // Parse CSV with proper quoted field handling
      const rows: string[][] = this.parseCSV(response.data);
      
      // Skip header row (first row) - data starts from row 2
      return rows.slice(1);
    } catch (error) {
      console.error('Error fetching CSV data for gid:', gid, error);
      throw error;
    }
  }

  /**
   * Parse CSV data properly handling quoted fields and commas within quotes
   */
  private parseCSV(csvData: string): string[][] {
    const rows: string[][] = [];
    let currentRow: string[] = [];
    let currentField = '';
    let insideQuotes = false;

    for (let i = 0; i < csvData.length; i++) {
      const char = csvData[i];
      const nextChar = csvData[i + 1];

      if (char === '"') {
        if (insideQuotes && nextChar === '"') {
          // Handle escaped quotes
          currentField += '"';
          i++; // Skip next quote
        } else {
          // Toggle quote state
          insideQuotes = !insideQuotes;
        }
      } else if (char === ',' && !insideQuotes) {
        // Field separator
        currentRow.push(currentField.trim());
        currentField = '';
      } else if ((char === '\n' || char === '\r') && !insideQuotes) {
        // Row separator
        if (currentField || currentRow.length > 0) {
          currentRow.push(currentField.trim());
          if (currentRow.some(field => field.length > 0)) {
            rows.push(currentRow);
          }
          currentRow = [];
          currentField = '';
        }
        // Skip \r\n combination
        if (char === '\r' && nextChar === '\n') {
          i++;
        }
      } else {
        currentField += char;
      }
    }

    // Handle last field and row
    if (currentField || currentRow.length > 0) {
      currentRow.push(currentField.trim());
      if (currentRow.some(field => field.length > 0)) {
        rows.push(currentRow);
      }
    }

    return rows;
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

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      
      // Skip empty rows
      if (!row || row.length === 0 || row.every(cell => !cell)) continue;

      // Expected: id, title, subtitle, description, mediaType, mediaUrl, ctaText1, ctaLink1, ctaText2, ctaLink2, trustBadge, active
      const id = row[0]?.trim();
      const title = row[1]?.trim();
      const subtitle = row[2]?.trim();
      const description = row[3]?.trim();
      const mediaType = row[4]?.trim();
      const mediaUrl = row[5]?.trim();
      const ctaText1 = row[6]?.trim();
      const ctaLink1 = row[7]?.trim();
      const ctaText2 = row[8]?.trim();
      const ctaLink2 = row[9]?.trim();
      const trustBadge = row[10]?.trim();
      const active = row[11]?.trim();

      // Skip inactive slides
      if (active?.toLowerCase() !== 'true') continue;

      // Validate required fields
      if (!id || !title || !mediaUrl) {
        console.warn('Skipping hero slide row with missing required fields:', row);
        continue;
      }

      // Validate mediaType
      const validMediaType = mediaType === 'video' ? 'video' : 'image';

      slides.push({
        id: String(id),
        title: String(title),
        subtitle: String(subtitle || ''),
        description: String(description || ''),
        mediaType: validMediaType,
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
      console.warn('No valid slides found in Google Sheet, using defaults');
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
      if (!row || row.length === 0 || row.every(cell => !cell)) continue;

      const id = row[0]?.trim();
      const value = row[1]?.trim();
      const label = row[2]?.trim();
      const suffix = row[3]?.trim();
      const prefix = row[4]?.trim();
      const active = row[5]?.trim();

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
      if (!row || row.length === 0 || row.every(cell => !cell)) continue;

      const id = row[0]?.trim();
      const name = row[1]?.trim();
      const role = row[2]?.trim();
      const company = row[3]?.trim();
      const content = row[4]?.trim();
      const rating = row[5]?.trim();
      const imageUrl = row[6]?.trim();
      const active = row[7]?.trim();

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
   * Expected columns: id, name, partNumber, category, manufacturer, aircraftModel, description, imageUrl, availability, specifications, link, active
   */
  private parseProducts(rows: any[][]): Product[] {
    if (!rows || rows.length === 0) {
      return DEFAULT_PRODUCTS;
    }

    const products: Product[] = [];

    for (const row of rows) {
      if (!row || row.length === 0 || row.every(cell => !cell)) continue;

      const id = row[0]?.trim();
      const name = row[1]?.trim();
      const partNumber = row[2]?.trim();
      const category = row[3]?.trim();
      const manufacturer = row[4]?.trim();
      const aircraftModel = row[5]?.trim();
      const description = row[6]?.trim();
      const imageUrl = row[7]?.trim();
      const availability = row[8]?.trim();
      const specifications = row[9]?.trim();
      const link = row[10]?.trim();
      const active = row[11]?.trim();

      if (active?.toLowerCase() !== 'true') continue;
      if (!id || !name || !imageUrl) continue;

      const validAvailability = ['In Stock', 'On Request', 'Limited'].includes(availability)
        ? availability
        : 'On Request';

      products.push({
        id: String(id),
        name: String(name),
        partNumber: partNumber ? String(partNumber) : undefined,
        category: String(category || ''),
        manufacturer: manufacturer ? String(manufacturer) : undefined,
        aircraftModel: aircraftModel ? String(aircraftModel) : undefined,
        description: String(description || ''),
        imageUrl: String(imageUrl),
        availability: validAvailability as 'In Stock' | 'On Request' | 'Limited',
        specifications: specifications ? String(specifications) : undefined,
        link: link ? String(link) : undefined,
        active: true,
      });
    }

    return products.length > 0 ? products : DEFAULT_PRODUCTS;
  }

  /**
   * Parse raw sheet data into FAQ objects
   * Expected columns: id, question, answer, keywords, category, active
   */
  private parseFAQs(rows: any[][]): FAQ[] {
    if (!rows || rows.length === 0) {
      return DEFAULT_FAQ;
    }

    const faqs: FAQ[] = [];

    for (const row of rows) {
      if (!row || row.length === 0 || row.every(cell => !cell)) continue;

      const id = row[0]?.trim();
      const question = row[1]?.trim();
      const answer = row[2]?.trim();
      const keywords = row[3]?.trim();
      const category = row[4]?.trim();
      const active = row[5]?.trim();

      if (active?.toLowerCase() !== 'true') continue;
      if (!id || !question || !answer) continue;

      faqs.push({
        id: String(id),
        question: String(question),
        answer: String(answer),
        keywords: keywords ? String(keywords) : undefined,
        category: category ? String(category) : undefined,
        active: true,
      });
    }

    return faqs.length > 0 ? faqs : DEFAULT_FAQ;
  }

  /**
   * Fetch existing distributors for world map display
   */
  async getExistingDistributors(): Promise<ExistingDistributor[]> {
    // Return cached data if still valid
    if (this.distributorsCache && Date.now() - this.distributorsCache.timestamp < this.cacheDuration) {
      return this.distributorsCache.data;
    }

    if (!googleSheetsConfig.sheetId) {
      return DEFAULT_DISTRIBUTORS;
    }

    try {
      const rows = await this.fetchCsvData(SHEET_GIDS.existingDistributors);
      const distributors = this.parseExistingDistributors(rows);
      
      this.distributorsCache = {
        data: distributors,
        timestamp: Date.now(),
      };

      return distributors;
    } catch (error) {
      console.error('Error fetching distributors:', error);
      if (this.distributorsCache) {
        return this.distributorsCache.data;
      }
      return DEFAULT_DISTRIBUTORS;
    }
  }

  /**
   * Submit distributor application to Google Sheets
   * This requires Google Apps Script Web App endpoint
   */
  async submitDistributorApplication(application: Omit<DistributorApplication, 'id' | 'status' | 'submittedDate'>): Promise<{ success: boolean; message: string }> {
    const webAppUrl = googleSheetsConfig.webhookUrl || import.meta.env.VITE_GOOGLE_WEBAPP_URL;
    
    if (!webAppUrl) {
      console.error('Google Apps Script Web App URL not configured');
      return {
        success: false,
        message: 'Form submission endpoint not configured. Please contact support.',
      };
    }

    try {
      const submissionData = {
        ...application,
        id: `APP-${Date.now()}`,
        status: 'Pending',
        submittedDate: new Date().toISOString(),
      };

      const response = await axios.post(webAppUrl, submissionData, {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 15000, // 15 second timeout
      });

      if (response.data.success) {
        return {
          success: true,
          message: 'Application submitted successfully! We will review your application and contact you within 5 business days.',
        };
      } else {
        return {
          success: false,
          message: response.data.message || 'Submission failed. Please try again.',
        };
      }
    } catch (error) {
      console.error('Error submitting distributor application:', error);
      return {
        success: false,
        message: 'Failed to submit application. Please try again or contact support.',
      };
    }
  }

  /**
   * Parse existing distributors data from sheets
   * Expected columns: id, companyName, country, city, region, latitude, longitude, yearsPartner, specializations, website, logo, active
   */
  private parseExistingDistributors(rows: any[][]): ExistingDistributor[] {
    if (!rows || rows.length === 0) {
      return DEFAULT_DISTRIBUTORS;
    }

    const distributors: ExistingDistributor[] = [];

    for (const row of rows) {
      if (!row || row.length === 0 || row.every(cell => !cell)) continue;

      const id = row[0]?.trim();
      const companyName = row[1]?.trim();
      const country = row[2]?.trim();
      const city = row[3]?.trim();
      const region = row[4]?.trim();
      const latitude = row[5]?.trim();
      const longitude = row[6]?.trim();
      const yearsPartner = row[7]?.trim();
      const specializations = row[8]?.trim();
      const website = row[9]?.trim();
      const logo = row[10]?.trim();
      const active = row[11]?.trim();

      if (active?.toLowerCase() !== 'true') continue;
      if (!id || !companyName || !country) continue;

      distributors.push({
        id: String(id),
        companyName: String(companyName),
        country: String(country),
        city: String(city || ''),
        region: String(region || ''),
        latitude: parseFloat(latitude) || 0,
        longitude: parseFloat(longitude) || 0,
        yearsPartner: parseInt(yearsPartner) || 0,
        specializations: String(specializations || ''),
        website: website ? String(website) : undefined,
        logo: logo ? String(logo) : undefined,
        active: true,
      });
    }

    return distributors.length > 0 ? distributors : DEFAULT_DISTRIBUTORS;
  }

  /**
   * Clear the cache (useful for testing or manual refresh)
   */
  clearCache(): void {
    this.heroCache = null;
    this.statsCache = null;
    this.testimonialsCache = null;
    this.productsCache = null;
    this.distributorsCache = null;
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
      this.getExistingDistributors(),
    ]);
  }
}

// Export singleton instance
export const googleSheetsService = new GoogleSheetsService();
export default googleSheetsService;
