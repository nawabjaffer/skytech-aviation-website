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
  partNumber?: string; // e.g., "CFM56-7B-001"
  category: string;
  description: string;
  imageUrl: string;
  availability: 'In Stock' | 'On Request' | 'Limited';
  link?: string;
  specifications?: string; // JSON string or comma-separated specs
  manufacturer?: string; // e.g., "CFM International", "Honeywell"
  aircraftModel?: string; // e.g., "Boeing 737", "Airbus A320"
  active: boolean;
}

export interface DistributorApplication {
  id: string;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  address: string;
  website?: string;
  yearEstablished: string;
  numberOfEmployees: string;
  annualRevenue?: string;
  businessLicense: string; // URL or file reference
  taxId: string;
  industryExperience: string; // Years
  currentAircraftClients?: string; // Comma-separated list
  territoryPreferences: string; // Comma-separated countries/regions
  warehouseFacilities: string; // Yes/No
  certifications?: string; // Comma-separated (ISO, AS9120, etc.)
  references: string; // JSON string or pipe-separated references
  businessPlan?: string; // URL or file reference
  status: 'Pending' | 'Under Review' | 'Approved' | 'Rejected';
  submittedDate: string;
  notes?: string;
}

export interface ExistingDistributor {
  id: string;
  companyName: string;
  country: string;
  city: string;
  region: string; // e.g., "Middle East", "Europe", "Asia"
  latitude: number;
  longitude: number;
  yearsPartner: number;
  specializations: string; // Comma-separated categories
  website?: string;
  logo?: string;
  active: boolean;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  keywords?: string; // Comma-separated keywords for better matching
  category?: string; // e.g., "Products", "Services", "Company", "Support"
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
  products: 'Products!A2:L100', // Extended to L for new fields
  distributorApplications: 'DistributorApplications!A2:Z100', // Application submissions
  existingDistributors: 'ExistingDistributors!A2:L100', // Current distributors for map
  faq: 'FAQ!A2:F100', // FAQ entries for chatbot
};

// Fallback hero slides when Google Sheets is not configured
export const DEFAULT_HERO_SLIDES: HeroSlide[] = [
  {
    id: '1',
    title: 'Premium Aircraft Parts & Components',
    subtitle: 'Certified OEM Parts with Full Traceability',
    description:
      'Specializing in CFM56, PW4000, and GE90 engine components. Serving airlines, MROs, and aircraft operators worldwide with genuine parts and comprehensive documentation.',
    mediaType: 'video',
    mediaUrl: 'https://www.pexels.com/download/video/4207979/',
    ctaText1: 'Browse Inventory',
    ctaLink1: '/products',
    ctaText2: 'Request Quote',
    ctaLink2: '/contacts',
    trustBadge: 'FAA & EASA Approved',
    active: true,
  },
  {
    id: '2',
    title: 'Rapid AOG Solutions',
    subtitle: 'Get Your Aircraft Back in Service',
    description:
      'Critical parts delivery within 24-48 hours worldwide. Our AOG team provides immediate assistance with hard-to-find components and emergency logistics support.',
    mediaType: 'video',
    mediaUrl: 'https://www.pexels.com/download/video/16386289/',
    ctaText1: 'AOG Hotline',
    ctaLink1: '/contacts',
    ctaText2: 'Emergency Services',
    ctaLink2: '/services',
    trustBadge: '24/7/365 Support',
    active: true,
  },
  {
    id: '3',
    title: 'Expand Your Aviation Business',
    subtitle: 'Join Our Global Distribution Network',
    description:
      'Partner with Skytech Aviation to access premium inventory, competitive pricing, and comprehensive support. Exclusive territories available in high-growth markets.',
    mediaType: 'video',
    mediaUrl: 'https://www.pexels.com/download/video/19546327/',
    ctaText1: 'Apply Now',
    ctaLink1: '/distributors',
    ctaText2: 'Partner Benefits',
    ctaLink2: '/about',
    trustBadge: '25+ Countries Covered',
    active: true,
  },
  {
    id: '4',
    title: 'Complete Avionics Solutions',
    subtitle: 'Advanced Flight Systems & Navigation',
    description:
      'From Honeywell to Collins Aerospace, we supply cutting-edge avionics including Pro Line Fusion, Primus Epic, and integrated flight management systems.',
    mediaType: 'image',
    mediaUrl:
      'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1920&q=80',
    ctaText1: 'View Avionics',
    ctaLink1: '/products',
    ctaText2: 'Technical Support',
    ctaLink2: '/contacts',
    trustBadge: 'AS9120 Certified',
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
    partNumber: 'CFM56-7B-27',
    category: 'Aircraft Engines',
    manufacturer: 'CFM International',
    aircraftModel: 'Boeing 737NG',
    description:
      'Genuine CFM56-7B engine parts and components with full certification and traceability documentation',
    imageUrl:
      'https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=800&q=80',
    availability: 'In Stock',
    specifications:
      'Thrust: 20,000-27,300 lbf | Weight: 5,216 lb | Length: 98.9 in',
    link: '/products/cfm56-7b',
    active: true,
  },
  {
    id: '2',
    name: 'Boeing 737 Landing Gear Assembly',
    partNumber: 'B737-LG-001',
    category: 'Landing Gear',
    manufacturer: 'Boeing',
    aircraftModel: 'Boeing 737',
    description:
      'OEM landing gear components and assemblies for Boeing 737 series aircraft with complete inspection records',
    imageUrl:
      'https://plus.unsplash.com/premium_photo-1682142209920-c40d4eb175ab?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    availability: 'On Request',
    specifications:
      'Material: High-strength steel | Certification: FAA/EASA approved',
    link: '/products/b737-landing-gear',
    active: true,
  },
  {
    id: '3',
    name: 'Honeywell Primus Epic Avionics Suite',
    partNumber: 'HON-PE-2000',
    category: 'Avionics',
    manufacturer: 'Honeywell',
    aircraftModel: 'Various Business Jets',
    description:
      'Advanced integrated avionics system with flight management, navigation, and communication capabilities',
    imageUrl:
      'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80',
    availability: 'In Stock',
    specifications: 'Display: 15" LCD | Features: WAAS GPS, TCAS, TAWS',
    link: '/products/honeywell-primus',
    active: true,
  },
  {
    id: '4',
    name: 'Airbus A320 Hydraulic Pump',
    partNumber: 'A320-HYD-4500',
    category: 'Flight Control Systems',
    manufacturer: 'Airbus',
    aircraftModel: 'Airbus A320 Family',
    description:
      'Certified hydraulic pumps and systems for Airbus A320 family with zero-time warranty',
    imageUrl:
      'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80',
    availability: 'Limited',
    specifications:
      'Pressure: 3000 PSI | Flow Rate: 30 GPM | Type: Variable Displacement',
    link: '/products/a320-hydraulic',
    active: true,
  },
  {
    id: '5',
    name: 'Pratt & Whitney PW4000 Components',
    partNumber: 'PW4000-112',
    category: 'Aircraft Engines',
    manufacturer: 'Pratt & Whitney',
    aircraftModel: 'Boeing 747/767/777',
    description:
      'Genuine PW4000 engine components including turbine blades, combustion chambers, and fuel nozzles',
    imageUrl:
      'https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=800&q=80',
    availability: 'In Stock',
    specifications:
      'Thrust: 52,000-99,040 lbf | Applications: Wide-body aircraft',
    link: '/products/pw4000',
    active: true,
  },
  {
    id: '6',
    name: 'Airbus A380 Fuel Management System',
    partNumber: 'A380-FMS-7800',
    category: 'Fuel Systems',
    manufacturer: 'Airbus',
    aircraftModel: 'Airbus A380',
    description:
      'Complete fuel management and distribution system with electronic controls and monitoring',
    imageUrl:
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80',
    availability: 'On Request',
    specifications:
      'Capacity: 320,000 liters | Tanks: 11 fuel tanks | Control: Digital FADEC',
    link: '/products/a380-fuel',
    active: true,
  },
  {
    id: '7',
    name: 'Collins Aerospace Pro Line Fusion',
    partNumber: 'COL-PLF-5000',
    category: 'Avionics',
    manufacturer: 'Collins Aerospace',
    aircraftModel: 'Business Jets',
    description:
      'Next-generation integrated avionics suite with touchscreen controls and synthetic vision',
    imageUrl:
      'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80',
    availability: 'In Stock',
    specifications:
      'Display: Multi-touch 15" | Features: SVS, XM Weather, ADS-B',
    link: '/products/proline-fusion',
    active: true,
  },
  {
    id: '8',
    name: 'Boeing 787 Dreamliner Cabin Interior',
    partNumber: 'B787-INT-2100',
    category: 'Interior Components',
    manufacturer: 'Boeing',
    aircraftModel: 'Boeing 787',
    description:
      'Premium cabin interior components including seats, galleys, lavatories, and overhead bins',
    imageUrl:
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80',
    availability: 'Limited',
    specifications:
      'Configuration: Business/Economy | Material: Lightweight composites',
    link: '/products/b787-interior',
    active: true,
  },
  {
    id: '9',
    name: 'GE90-115B Engine Parts',
    partNumber: 'GE90-115B-45',
    category: 'Aircraft Engines',
    manufacturer: 'GE Aviation',
    aircraftModel: 'Boeing 777',
    description:
      "World's most powerful jet engine components with complete documentation and certification",
    imageUrl:
      'https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=800&q=80',
    availability: 'On Request',
    specifications:
      'Thrust: 115,000 lbf | Bypass Ratio: 8.7:1 | Fan Diameter: 128 in',
    link: '/products/ge90-115b',
    active: true,
  },
  {
    id: '10',
    name: 'Airbus A350 Carbon Brakes',
    partNumber: 'A350-BRK-9000',
    category: 'Landing Gear',
    manufacturer: 'Safran Landing Systems',
    aircraftModel: 'Airbus A350',
    description:
      'Advanced carbon brake system with anti-skid technology and wear monitoring',
    imageUrl:
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80',
    availability: 'In Stock',
    specifications:
      'Material: Carbon-carbon composite | Weight: 40% lighter | Life: 2000 landings',
    link: '/products/a350-brakes',
    active: true,
  },
  {
    id: '11',
    name: 'Thales TopFlight Avionics',
    partNumber: 'THA-TF-3500',
    category: 'Avionics',
    manufacturer: 'Thales',
    aircraftModel: 'Regional Jets',
    description:
      'Integrated avionics solution for regional aircraft with full IFR capability',
    imageUrl:
      'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80',
    availability: 'In Stock',
    specifications:
      'Display: Dual 12" screens | Navigation: Multi-sensor GPS/IRS',
    link: '/products/thales-topflight',
    active: true,
  },
  {
    id: '12',
    name: 'Boeing 737 MAX APU',
    partNumber: 'B737MAX-APU-7200',
    category: 'Aircraft Engines',
    manufacturer: 'Honeywell',
    aircraftModel: 'Boeing 737 MAX',
    description:
      'Auxiliary Power Unit providing electrical power and compressed air for aircraft systems',
    imageUrl:
      'https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=800&q=80',
    availability: 'Limited',
    specifications:
      'Power Output: 90 kVA | Operating Altitude: Up to 43,000 ft',
    link: '/products/b737max-apu',
    active: true,
  },
];

// Default existing distributors for world map
export const DEFAULT_DISTRIBUTORS: ExistingDistributor[] = [
  {
    id: '1',
    companyName: 'Gulf Aviation Parts LLC',
    country: 'United Arab Emirates',
    city: 'Dubai',
    region: 'Middle East',
    latitude: 25.2048,
    longitude: 55.2708,
    yearsPartner: 8,
    specializations: 'Aircraft Engines, Avionics, Landing Gear',
    website: 'https://example.com',
    active: true,
  },
  {
    id: '2',
    companyName: 'Euro Aero Supply',
    country: 'Germany',
    city: 'Frankfurt',
    region: 'Europe',
    latitude: 50.1109,
    longitude: 8.6821,
    yearsPartner: 5,
    specializations: 'Flight Control Systems, Fuel Systems',
    website: 'https://example.com',
    active: true,
  },
  {
    id: '3',
    companyName: 'Asia Pacific Aviation Parts',
    country: 'Singapore',
    city: 'Singapore',
    region: 'Asia Pacific',
    latitude: 1.3521,
    longitude: 103.8198,
    yearsPartner: 6,
    specializations: 'Avionics, Interior Components',
    website: 'https://example.com',
    active: true,
  },
  {
    id: '4',
    companyName: 'African Aviation Solutions',
    country: 'South Africa',
    city: 'Johannesburg',
    region: 'Africa',
    latitude: -26.2041,
    longitude: 28.0473,
    yearsPartner: 4,
    specializations: 'Aircraft Engines, Landing Gear',
    website: 'https://example.com',
    active: true,
  },
  {
    id: '5',
    companyName: 'Americas Aviation Group',
    country: 'United States',
    city: 'Miami',
    region: 'Americas',
    latitude: 25.7617,
    longitude: -80.1918,
    yearsPartner: 7,
    specializations: 'All Categories',
    website: 'https://example.com',
    active: true,
  },
  {
    id: '6',
    companyName: 'Middle East Aero Trading',
    country: 'Saudi Arabia',
    city: 'Riyadh',
    region: 'Middle East',
    latitude: 24.7136,
    longitude: 46.6753,
    yearsPartner: 3,
    specializations: 'Aircraft Engines, Fuel Systems',
    website: 'https://example.com',
    active: true,
  },
];

// Default FAQs when Google Sheets is not configured
export const DEFAULT_FAQ: FAQ[] = [
  {
    id: '1',
    question: "What types of aircraft parts do you supply?",
    answer: "We supply a comprehensive range of aircraft parts from nose to tail, including Brakes & Wheels, Airframe Components, Engine Parts, Aircraft Tools, Lubricants, Adhesives, Avionics, and more. We specialize in OEM & PMA parts for mid-life narrow-body business and commercial aircraft.",
    keywords: "parts, supply, OEM, PMA, brakes, wheels, airframe, engine, tools, lubricants, adhesives, avionics",
    category: "Products",
    active: true,
  },
  {
    id: '2',
    question: "Are you ASA certified?",
    answer: "Yes, Skytech Aviation is a proud member of the Aviation Suppliers Association (ASA), demonstrating our commitment to quality, safety, and ethical business practices in the aviation industry.",
    keywords: "ASA, certification, certified, member, quality, safety",
    category: "Company",
    active: true,
  },
  {
    id: '3',
    question: "How can I request a quote?",
    answer: "You can request a quote by contacting us at +971 561 611 002, emailing info@skytech.ae or sales@skytech.ae, or filling out the contact form on our website. Our professional team will respond quickly with expert advice and competitive pricing.",
    keywords: "quote, request, contact, email, phone, pricing, RFQ",
    category: "Support",
    active: true,
  },
  {
    id: '4',
    question: "Where are you located?",
    answer: "We are located at Meydan Free Zone, The Meydan Hotel, Dubai, United Arab Emirates. Our business hours are Sunday to Thursday, 9:00 AM - 6:00 PM GST.",
    keywords: "location, address, Dubai, UAE, office, hours, business hours",
    category: "Company",
    active: true,
  },
  {
    id: '5',
    question: "Do you offer AOG (Aircraft on Ground) support?",
    answer: "Yes, we provide emergency support to get your aircraft back in service quickly with priority handling and expedited shipping for critical situations.",
    keywords: "AOG, emergency, support, aircraft on ground, urgent, priority",
    category: "Services",
    active: true,
  },
  {
    id: '6',
    question: "What are your payment terms?",
    answer: "We offer flexible payment options. Please contact our sales team at sales@skytech.ae or +971 561 611 002 to discuss specific payment terms for your order.",
    keywords: "payment, terms, pricing, cost, invoice, billing",
    category: "Support",
    active: true,
  },
  {
    id: '7',
    question: "How can I become a distributor?",
    answer: "To become a distributor, you need to meet requirements including business registration, industry experience, financial stability, proper facilities, and regulatory compliance. Visit our Distributors page or contact us for more information about partnership opportunities.",
    keywords: "distributor, partner, partnership, become, apply, requirements",
    category: "Distributors",
    active: true,
  },
  {
    id: '8',
    question: "Do you ship internationally?",
    answer: "Yes, we provide worldwide shipping with real-time tracking and customs clearance support. We have global links with major manufacturers to ensure efficient delivery.",
    keywords: "shipping, international, worldwide, global, delivery, logistics",
    category: "Services",
    active: true,
  },
  {
    id: '9',
    question: "What certifications do your parts have?",
    answer: "We supply authentic OEM (Original Equipment Manufacturer) and PMA (Parts Manufacturer Approval) certified parts with full traceability and documentation.",
    keywords: "certification, certified, OEM, PMA, traceability, documentation, authentic",
    category: "Products",
    active: true,
  },
  {
    id: '10',
    question: "What are your contact details?",
    answer: "Phone: +971 561 611 002 (primary), +971 508 640 842 (secondary). Email: info@skytech.ae, sales@skytech.ae. Address: Meydan Free Zone, The Meydan Hotel, Dubai, UAE. Business Hours: Sunday to Thursday, 9:00 AM - 6:00 PM GST.",
    keywords: "contact, phone, email, address, hours, reach, communicate",
    category: "Support",
    active: true,
  },
];

export default config;

