import raw from './siteConfig.json';

export type SupportedLanguageCode = 'en' | 'ar' | 'ru' | 'zh';

export interface SiteConfig {
  contact: {
    primaryEmail: string;
    salesEmail?: string;
    supportEmail?: string;
    primaryPhone: string;
    secondaryPhone?: string;
  };
  address: {
    street: string;
    city: string;
    country: string;
    fullAddress: string;
  };
  socialMedia: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    instagram?: string;
  };
  downloads: {
    productCatalogUrl?: string;
    companyBrochureUrl?: string;
  };
}

export const siteConfig = raw as SiteConfig;

export const asTelHref = (phone: string) => {
  const normalized = phone.replace(/[\s()-]/g, '');
  return `tel:${normalized}`;
};

export const asMailtoHref = (email: string) => `mailto:${email}`;
