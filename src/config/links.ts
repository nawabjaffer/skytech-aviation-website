/**
 * Centralized Links Configuration
 * ================================
 * All external and internal links are managed here for easy maintenance.
 * When you need to change a link, update it here and it will reflect everywhere.
 */

// ==================== EMAIL ADDRESSES ====================
export const EMAIL_LINKS = {
  // Primary contact emails
  info: 'info@skytech.ae',
  sales: 'sales@skytech.ae',
  enquiry: 'enquiry@skytech.ae',
  support: 'support@skytechaviation.com',
  
  // Mailto helper
  mailto: (email: string, subject?: string, body?: string) => {
    let href = `mailto:${email}`;
    const params: string[] = [];
    if (subject) params.push(`subject=${encodeURIComponent(subject)}`);
    if (body) params.push(`body=${encodeURIComponent(body)}`);
    if (params.length > 0) href += `?${params.join('&')}`;
    return href;
  }
} as const;

// ==================== PHONE NUMBERS ====================
export const PHONE_LINKS = {
  primary: '+971 561 611 002',
  secondary: '+971 508 640 842',
  
  // Tel helper - converts phone to tel: link
  tel: (phone: string) => `tel:${phone.replace(/[\s()-]/g, '')}`
} as const;

// ==================== INTERNAL NAVIGATION ====================
export const NAV_LINKS = {
  home: '/',
  products: '/products',
  services: '/services',
  distributors: '/distributors',
  about: '/about',
  contact: '/contact',
} as const;

// ==================== EXTERNAL LINKS ====================
export const EXTERNAL_LINKS = {
  // Association memberships
  asa: 'https://www.aviationsuppliers.org',
  asaLogo: 'https://www.aviationsuppliers.org/images/ASA-logo-wt.png',
  
  // Partner websites
  globconLogistics: 'https://globconlogistics.com',
  globconLogo: 'https://globconlogistics.com/assets/images/logo-v2.png',
  
  // Google Maps
  officeLocation: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d462560.6828072805!2d54.89782999414062!3d25.076280535204924!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43496ad9c645%3A0xbde66e5084295162!2sDubai!5e0!3m2!1sen!2sae!4v1635849271234!5m2!1sen!2sae',
} as const;

// ==================== SOCIAL MEDIA ====================
export const SOCIAL_LINKS = {
  linkedin: '',
  twitter: '',
  facebook: '',
  instagram: '',
  whatsapp: (phone: string, message?: string) => {
    const cleanPhone = phone.replace(/[\s+()-]/g, '');
    let url = `https://wa.me/${cleanPhone}`;
    if (message) url += `?text=${encodeURIComponent(message)}`;
    return url;
  }
} as const;

// ==================== DOCUMENT DOWNLOADS ====================
export const DOWNLOAD_LINKS = {
  // Company profile/brochure document
  companyProfile: 'https://drive.google.com/file/d/YOUR_COMPANY_PROFILE_FILE_ID/view?usp=sharing',
  productCatalog: 'https://drive.google.com/file/d/YOUR_PRODUCT_CATALOG_FILE_ID/view?usp=sharing',
  companyBrochure: 'https://drive.google.com/file/d/YOUR_COMPANY_BROCHURE_FILE_ID/view?usp=sharing',
  certifications: 'https://drive.google.com/file/d/YOUR_CERTIFICATIONS_FILE_ID/view?usp=sharing',
  capabilities: 'https://drive.google.com/file/d/YOUR_CAPABILITIES_FILE_ID/view?usp=sharing',
} as const;

// ==================== COMPANY INFO ====================
export const COMPANY_INFO = {
  name: 'Skytech Aviation',
  fullName: 'Skytech Aviation LLC',
  tagline: 'Your trusted partner in aircraft parts and services',
  address: {
    street: 'Meydan Free Zone, The Meydan Hotel',
    city: 'Dubai',
    country: 'United Arab Emirates',
    full: 'Meydan Free Zone, The Meydan Hotel, Dubai, UAE'
  },
  asaMemberSince: '2022',
} as const;

// ==================== REQUEST QUOTE CONFIG ====================
export const QUOTE_CONFIG = {
  recipientEmail: 'enquiry@skytech.ae',
  ccEmails: ['sales@skytech.ae'],
  defaultSubject: 'Product Inquiry - Skytech Aviation',
  
  // Generate email body with product details
  generateEmailBody: (product: { name: string; category?: string; partNumber?: string }, userDetails: { name: string; email: string; phone?: string; company?: string; message?: string }) => {
    return `
Product Inquiry

PRODUCT DETAILS:
----------------
Product Name: ${product.name}
${product.category ? `Category: ${product.category}` : ''}
${product.partNumber ? `Part Number: ${product.partNumber}` : ''}

CUSTOMER DETAILS:
-----------------
Name: ${userDetails.name}
Email: ${userDetails.email}
${userDetails.phone ? `Phone: ${userDetails.phone}` : ''}
${userDetails.company ? `Company: ${userDetails.company}` : ''}

${userDetails.message ? `MESSAGE:\n${userDetails.message}` : ''}

---
Sent from Skytech Aviation Website
    `.trim();
  }
} as const;

export default {
  EMAIL_LINKS,
  PHONE_LINKS,
  NAV_LINKS,
  EXTERNAL_LINKS,
  SOCIAL_LINKS,
  DOWNLOAD_LINKS,
  COMPANY_INFO,
  QUOTE_CONFIG,
};
