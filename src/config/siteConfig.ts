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

  /**
   * Optional page-level copy/labels.
   * This is used for simple, non-localized configuration and chatbot context.
    * UI pages primarily use i18n keys from src/locales/<lang>/translation.json.
   */
  pages?: {
    about?: {
      sections?: {
        milestonesTitle?: string;
        certificationsTitle?: string;
        coreValuesTitle?: string;
        coreValuesSubtitle?: string;
        leadershipTeamTitle?: string;
        awardsTitle?: string;
        partnershipBenefitsTitle?: string;
      };
    };
    services?: {
      sections?: {
        serviceCategoriesTitle?: string;
      };
    };
  };
}

export const siteConfig = raw as SiteConfig;

export const asTelHref = (phone: string) => {
  const normalized = phone.replace(/[\s()-]/g, '');
  return `tel:${normalized}`;
};

export const asMailtoHref = (email: string) => `mailto:${email}`;
