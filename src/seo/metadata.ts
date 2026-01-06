/**
 * SEO Metadata for Skytech Aviation
 * Optimized for UAE market and multilingual support
 */

import { siteConfig as appSiteConfig } from '../config/siteConfig';

export interface PageMeta {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  canonical?: string;
}

export interface SEOConfig {
  siteName: string;
  siteUrl: string;
  defaultImage: string;
  twitterHandle: string;
  languages: string[];
  defaultLanguage: string;
}

// Site configuration
export const siteConfig: SEOConfig = {
  siteName: "Skytech Aviation",
  siteUrl: "https://aviation.skytech.ae",
  defaultImage: "/assets/og-image.jpg",
  twitterHandle: "@SkytechAviation",
  languages: ["en", "ar", "ru"],
  defaultLanguage: "en"
};

// Organization structured data
export const organizationData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Skytech Aviation",
  "url": siteConfig.siteUrl,
  "logo": `${siteConfig.siteUrl}/assets/logo.png`,
  "description": "Authorized civil aircraft parts supplier and proud member of the Aviation Suppliers Association (ASA)",
  "email": appSiteConfig.contact.primaryEmail || "info@skytech.ae",
  "telephone": (appSiteConfig.contact.primaryPhone || "+971 561 611 002").replace(/[\s()-]/g, ''),
  "address": {
    "@type": "PostalAddress",
    "streetAddress": appSiteConfig.address.street || "Meydan Free Zone, The Meydan Hotel",
    "addressLocality": appSiteConfig.address.city || "Dubai",
    "addressRegion": "Dubai",
    "postalCode": "",
    "addressCountry": "AE"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "25.1772",
    "longitude": "55.3093"
  },
  "sameAs": [
    appSiteConfig.socialMedia.linkedin || "https://www.linkedin.com/company/skytech-aviation",
    appSiteConfig.socialMedia.twitter || "https://twitter.com/SkytechAviation"
  ],
  "memberOf": {
    "@type": "Organization",
    "name": "Aviation Suppliers Association (ASA)"
  }
};

// LocalBusiness structured data
export const localBusinessData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Skytech Aviation",
  "image": `${siteConfig.siteUrl}/assets/business-image.jpg`,
  "url": siteConfig.siteUrl,
  "telephone": (appSiteConfig.contact.primaryPhone || "+971 561 611 002").replace(/[\s()-]/g, ''),
  "email": appSiteConfig.contact.primaryEmail || "info@skytech.ae",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": appSiteConfig.address.street || "Meydan Free Zone, The Meydan Hotel",
    "addressLocality": appSiteConfig.address.city || "Dubai",
    "addressRegion": "Dubai",
    "addressCountry": "AE"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "25.1772",
    "longitude": "55.3093"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
      "opens": "09:00",
      "closes": "18:00"
    }
  ],
  "priceRange": "$$",
  "areaServed": [
    {
      "@type": "City",
      "name": "Dubai"
    },
    {
      "@type": "City",
      "name": "Abu Dhabi"
    },
    {
      "@type": "City",
      "name": "Sharjah"
    },
    {
      "@type": "Country",
      "name": "United Arab Emirates"
    }
  ]
};

// Page-specific metadata
export const pageMetadata: Record<string, PageMeta> = {
  home: {
    title: "Skytech Aviation | Authorized Aircraft Parts Supplier UAE | Dubai",
    description: `Leading aircraft parts supplier in Dubai, UAE. Authorized distributor of OEM & PMA certified parts for civil aircraft. ASA member. Contact: ${appSiteConfig.contact.primaryPhone}`,
    keywords: [
      "aircraft parts UAE",
      "aviation parts Dubai",
      "aircraft spare parts",
      "OEM aircraft parts",
      "PMA certified parts",
      "aircraft parts supplier Dubai",
      "aviation suppliers UAE",
      "ASA member",
      "aircraft wheels brakes",
      "airframe components",
      "engine parts Dubai",
      "aircraft maintenance UAE"
    ],
    ogImage: "/assets/home-og.jpg"
  },
  products: {
    title: "Aircraft Parts Catalog | Brakes, Wheels, Engine Parts | Skytech Aviation",
    description: "Browse our extensive catalog of OEM & PMA certified aircraft parts. Brakes, wheels, airframe components, engine parts, and more. Serving Dubai, Abu Dhabi, and UAE.",
    keywords: [
      "aircraft parts catalog",
      "aircraft brakes UAE",
      "aircraft wheels Dubai",
      "engine parts",
      "airframe components",
      "aviation lubricants",
      "aircraft tools",
      "adhesives aviation",
      "OEM parts",
      "PMA parts",
      "aircraft spare parts UAE"
    ],
    ogImage: "/assets/products-og.jpg"
  },
  services: {
    title: "Aviation Services | Parts Sourcing, AOG Support | Dubai UAE",
    description: "Professional aviation services including parts sourcing, technical support, AOG support, logistics, and quality assurance. 24/7 service in UAE.",
    keywords: [
      "aviation services UAE",
      "aircraft parts sourcing",
      "AOG support Dubai",
      "technical support aviation",
      "aircraft logistics UAE",
      "quality assurance aviation",
      "documentation support",
      "aircraft maintenance support"
    ],
    ogImage: "/assets/services-og.jpg"
  },
  distributors: {
    title: "Become a Distributor | Aviation Parts Partnership | Skytech Aviation",
    description: "Join our global network of aviation parts distributors. Competitive pricing, technical support, and comprehensive product range. Apply now for partnership.",
    keywords: [
      "aviation distributor",
      "aircraft parts distributor",
      "partnership aviation",
      "distributor UAE",
      "aviation business opportunity",
      "aircraft parts wholesale"
    ],
    ogImage: "/assets/distributors-og.jpg"
  },
  about: {
    title: "About Us | ASA Member | Authorized Aircraft Parts Supplier UAE",
    description: "Skytech Aviation - Authorized civil aircraft parts supplier in Dubai, UAE. Proud member of Aviation Suppliers Association (ASA). Learn about our mission and certifications.",
    keywords: [
      "about Skytech Aviation",
      "ASA member UAE",
      "aircraft parts supplier",
      "aviation company Dubai",
      "authorized supplier",
      "aviation certifications"
    ],
    ogImage: "/assets/about-og.jpg"
  },
  contact: {
    title: `Contact Us | Skytech Aviation Dubai | ${appSiteConfig.contact.primaryPhone}`,
    description: `Contact Skytech Aviation in Dubai, UAE. ${appSiteConfig.address.street} location. Email: ${appSiteConfig.contact.primaryEmail} | Phone: ${appSiteConfig.contact.primaryPhone}. Get a quote for aircraft parts.`,
    keywords: [
      "contact Skytech Aviation",
      "aviation Dubai contact",
      "aircraft parts inquiry",
      "Meydan Free Zone",
      "Dubai aviation company",
      "get quote aircraft parts"
    ],
    ogImage: "/assets/contact-og.jpg"
  }
};

// Default fallback metadata
export const defaultMetadata: PageMeta = {
  title: "Skytech Aviation - Authorized Civil Aircraft Parts Supplier UAE",
  description: "Skytech Aviation is a trusted supplier of civil aircraft parts in Dubai, UAE. ASA member committed to quality and service excellence.",
  keywords: [
    "Skytech Aviation",
    "aircraft parts UAE",
    "civil aviation Dubai",
    "aviation services",
    "aircraft maintenance",
    "authorized supplier",
    "ASA member"
  ]
};

// Generate breadcrumb structured data
export const generateBreadcrumbData = (items: Array<{ name: string; url: string }>) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `${siteConfig.siteUrl}${item.url}`
    }))
  };
};

// Product catalog structured data
export const productCatalogData = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Aircraft Parts Catalog",
  "description": "Comprehensive catalog of OEM and PMA certified aircraft parts",
  "numberOfItems": 13,
  "itemListElement": [
    {
      "@type": "Product",
      "name": "Brakes & Wheels",
      "description": "High-quality braking systems and wheels for helicopters and airplanes"
    },
    {
      "@type": "Product",
      "name": "Airframe Components",
      "description": "Structural parts, landing gear assemblies, wing components"
    },
    {
      "@type": "Product",
      "name": "Engine Parts",
      "description": "Turbine engines, piston engines, and engine accessories"
    },
    {
      "@type": "Product",
      "name": "Aircraft Tools",
      "description": "Professional maintenance and repair equipment"
    },
    {
      "@type": "Product",
      "name": "Lubricants",
      "description": "Aviation-grade oils, greases, and hydraulic fluids"
    },
    {
      "@type": "Product",
      "name": "Adhesives & Fuel Supply",
      "description": "Structural adhesives, sealants, and aviation fuel services"
    }
  ]
};

export const seoMetadata = {
  title: "Skytech Aviation - Authorized Civil Aircraft Parts Supplier",
  description: "Skytech Aviation is a trusted supplier of civil aircraft parts, committed to quality and service excellence.",
  keywords: [
    "Skytech Aviation",
    "aircraft parts",
    "civil aviation",
    "aviation services",
    "aircraft maintenance",
    "authorized supplier",
    "ASA member"
  ],
  author: "Skytech Aviation",
  og: {
    title: "Skytech Aviation",
    description: "Your trusted partner in civil aircraft parts supply.",
    url: "https://www.skytechaviation.com",
    image: "https://www.skytechaviation.com/assets/og-image.jpg",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    site: "@SkytechAviation",
    title: "Skytech Aviation",
    description: "Your trusted partner in civil aircraft parts supply.",
    image: "https://www.skytechaviation.com/assets/twitter-image.jpg"
  }
};