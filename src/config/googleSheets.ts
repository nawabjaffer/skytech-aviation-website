/**
 * Google Sheets Configuration
 * 
 * Setup Instructions:
 * 1. Create a Google Sheet with your hero carousel data
 * 2. Make the sheet publicly accessible (File > Share > Anyone with the link can view)
 * 3. Get the Sheet ID from the URL: https://docs.google.com/spreadsheets/d/{SHEET_ID}/edit
 * 4. Create a .env file in the root directory with:
 *    VITE_GOOGLE_SHEET_ID=your_sheet_id_here
 *    VITE_GOOGLE_API_KEY=your_api_key_here (optional, for private sheets)
 * 
 * Sheet Structure (columns):
 * - id: Unique identifier for the slide
 * - title: Hero headline text
 * - subtitle: Secondary text
 * - description: Detailed description
 * - mediaType: "image" or "video"
 * - mediaUrl: URL to the image or video
 * - ctaText1: First CTA button text (e.g., "View Products")
 * - ctaLink1: First CTA button link
 * - ctaText2: Second CTA button text (e.g., "Become a Distributor")
 * - ctaLink2: Second CTA button link
 * - trustBadge: Trust badge text (e.g., "ASA Member Since 2015")
 * - active: "true" or "false" (whether to show this slide)
 */

export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  mediaType: 'image' | 'video';
  mediaUrl: string;
  ctaText1?: string;
  ctaLink1?: string;
  ctaText2?: string;
  ctaLink2?: string;
  trustBadge?: string;
  active: boolean;
}

export interface GoogleSheetsConfig {
  sheetId: string;
  apiKey?: string;
  range: string; // e.g., "Sheet1!A2:L100" (skip header row)
  webhookUrl?: string; // Optional: webhook URL for real-time updates
}

// Default configuration
const config: GoogleSheetsConfig = {
  sheetId: import.meta.env.VITE_GOOGLE_SHEET_ID || '',
  apiKey: import.meta.env.VITE_GOOGLE_API_KEY || '',
  range: import.meta.env.VITE_GOOGLE_SHEET_RANGE || 'Sheet1!A2:L100',
  webhookUrl: import.meta.env.VITE_GOOGLE_WEBHOOK_URL || '',
};

// Fallback hero slides when Google Sheets is not configured
export const DEFAULT_HERO_SLIDES: HeroSlide[] = [
  {
    id: '1',
    title: 'Authorized Civil Aircraft Parts Supplier',
    subtitle: 'Your Trusted Partner for Authentic Aviation Components',
    description: 'Providing premium quality aircraft parts and components to airlines, MROs, and distributors across the Middle East, Africa, and beyond.',
    mediaType: 'image',
    mediaUrl: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920&q=80',
    ctaText1: 'View Products',
    ctaLink1: '/products',
    ctaText2: 'Become a Distributor',
    ctaLink2: '/distributors',
    trustBadge: 'ASA Member Since 2015',
    active: true,
  },
  {
    id: '2',
    title: '24/7 AOG Support',
    subtitle: 'Aircraft on Ground? We\'re Here to Help',
    description: 'Emergency parts sourcing and delivery with our dedicated AOG support team. Fast response times and global logistics network.',
    mediaType: 'image',
    mediaUrl: 'https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=1920&q=80',
    ctaText1: 'Contact AOG Team',
    ctaLink1: '/contact',
    ctaText2: 'View Services',
    ctaLink2: '/services',
    trustBadge: 'ISO 9001:2015 Certified',
    active: true,
  },
  {
    id: '3',
    title: 'Global Distribution Network',
    subtitle: 'Serving Airlines Worldwide',
    description: 'Partner with us to access authentic OEM parts with full traceability and certification documentation.',
    mediaType: 'image',
    mediaUrl: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1920&q=80',
    ctaText1: 'Become a Partner',
    ctaLink1: '/distributors',
    ctaText2: 'Learn More',
    ctaLink2: '/about',
    trustBadge: 'Trusted by 50+ Airlines',
    active: true,
  },
];

export default config;
