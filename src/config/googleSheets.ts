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

export interface StatItem {
  id: string;
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
  active: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number; // 1-5
  imageUrl?: string;
  active: boolean;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  imageUrl: string;
  availability: 'In Stock' | 'On Request' | 'Limited';
  link?: string;
  active: boolean;
}

export interface GoogleSheetsConfig {
  sheetId: string;
  apiKey?: string;
  range: string; // e.g., "Sheet1!A2:L100" (skip header row)
  webhookUrl?: string; // Optional: webhook URL for real-time updates
}

export interface CarouselTimingConfig {
  imageSlideInterval: number; // milliseconds for image slides
  videoSlideInterval: number; // milliseconds for video slides
  transitionDuration: number; // milliseconds for transition animation
}

// Carousel timing configuration
export const CAROUSEL_TIMING: CarouselTimingConfig = {
  imageSlideInterval: 5000,  // 5 seconds for images
  videoSlideInterval: 10000, // 10 seconds for videos (longer to show video content)
  transitionDuration: 700,   // 700ms smooth transition
};

// Default configuration
const config: GoogleSheetsConfig = {
  sheetId: import.meta.env.VITE_GOOGLE_SHEET_ID || '',
  apiKey: import.meta.env.VITE_GOOGLE_API_KEY || '',
  range: import.meta.env.VITE_GOOGLE_SHEET_RANGE || 'HeroSlides!A2:L100',
  webhookUrl: import.meta.env.VITE_GOOGLE_WEBHOOK_URL || '',
};

// Sheet ranges for different sections
export const SHEET_RANGES = {
  heroSlides: 'HeroSlides!A2:L100',
  stats: 'Stats!A2:F100',
  testimonials: 'Testimonials!A2:H100',
  products: 'Products!A2:H100',
};

// Fallback hero slides when Google Sheets is not configured
export const DEFAULT_HERO_SLIDES: HeroSlide[] = [
  {
    id: '1',
    title: 'Authorized Civil Aircraft Parts Supplier',
    subtitle: 'Your Trusted Partner for Authentic Aviation Components',
    description: 'Providing premium quality aircraft parts and components to airlines, MROs, and distributors across the Middle East, Africa, and beyond.',
    mediaType: 'video',
    mediaUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
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
    mediaType: 'video',
    mediaUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
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

// Fallback stats when Google Sheets is not configured
export const DEFAULT_STATS: StatItem[] = [
  {
    id: '1',
    value: 15,
    label: 'Years of Experience',
    suffix: '+',
    active: true,
  },
  {
    id: '2',
    value: 10000,
    label: 'Parts in Inventory',
    suffix: '+',
    active: true,
  },
  {
    id: '3',
    value: 25,
    label: 'Countries Served',
    suffix: '+',
    active: true,
  },
  {
    id: '4',
    value: 50,
    label: 'Airline Partners',
    suffix: '+',
    active: true,
  },
];

// Fallback testimonials when Google Sheets is not configured
export const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Ahmed Al-Mansouri',
    role: 'Supply Chain Director',
    company: 'Middle East Aviation Services',
    content: 'Skytech Aviation has been our trusted partner for over 5 years. Their commitment to quality and quick response times have helped us maintain our fleet efficiently.',
    rating: 5,
    active: true,
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    role: 'MRO Manager',
    company: 'Global Airlines MRO',
    content: 'Excellent service and genuine parts. The AOG support team saved us multiple times with their rapid response and worldwide logistics network.',
    rating: 5,
    active: true,
  },
  {
    id: '3',
    name: 'Mohamed Hassan',
    role: 'Procurement Head',
    company: 'Emirates Aviation Solutions',
    content: 'Professional service, competitive pricing, and full traceability documentation. Skytech Aviation is our go-to supplier for critical aircraft components.',
    rating: 5,
    active: true,
  },
  {
    id: '4',
    name: 'Elena Volkov',
    role: 'Technical Director',
    company: 'Eastern European Airlines',
    content: 'Reliable partner with extensive inventory. Their technical expertise and certification support make them stand out in the industry.',
    rating: 5,
    active: true,
  },
];

// Fallback products when Google Sheets is not configured
export const DEFAULT_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'CFM56-7B Engine Components',
    category: 'Engines',
    description: 'Genuine CFM56-7B engine parts and components with full certification',
    imageUrl: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=800&q=80',
    availability: 'In Stock',
    link: '/products',
    active: true,
  },
  {
    id: '2',
    name: 'Boeing 737 Landing Gear',
    category: 'Landing Gear',
    description: 'OEM landing gear components for Boeing 737 series aircraft',
    imageUrl: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80',
    availability: 'On Request',
    link: '/products',
    active: true,
  },
  {
    id: '3',
    name: 'Honeywell Avionics Systems',
    category: 'Avionics',
    description: 'Advanced avionics and navigation systems from Honeywell',
    imageUrl: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80',
    availability: 'In Stock',
    link: '/products',
    active: true,
  },
  {
    id: '4',
    name: 'Airbus A320 Hydraulic Pump',
    category: 'Hydraulics',
    description: 'Certified hydraulic pumps and systems for Airbus A320 family',
    imageUrl: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80',
    availability: 'Limited',
    link: '/products',
    active: true,
  },
];

export default config;
