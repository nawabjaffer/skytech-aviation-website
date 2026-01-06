import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslation from './locales/en/translation.json';
import arTranslation from './locales/ar/translation.json';
import ruTranslation from './locales/ru/translation.json';
import zhTranslation from './locales/zh/translation.json';

// Define resources
const resources = {
  en: {
    translation: enTranslation,
  },
  ar: {
    translation: arTranslation,
  },
  ru: {
    translation: ruTranslation,
  },
  zh: {
    translation: zhTranslation,
  },
};

const supportedLanguages = ['en', 'ar', 'ru', 'zh'] as const;
type SupportedLanguage = (typeof supportedLanguages)[number];

const pickSupported = (lng?: string | null): SupportedLanguage | null => {
  if (!lng) return null;
  const normalized = lng.toLowerCase().split('-')[0];
  return (supportedLanguages as readonly string[]).includes(normalized) ? (normalized as SupportedLanguage) : null;
};

const detectFromTimezone = (): SupportedLanguage | null => {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    const upper = tz.toUpperCase();

    // Best-effort mapping by region/timezone naming.
    // (No geolocation permission required; falls back to navigator + English.)
    if (upper.startsWith('ASIA/SHANGHAI') || upper.startsWith('ASIA/CHONGQING') || upper.startsWith('ASIA/HARBIN') || upper.startsWith('ASIA/HONG_KONG') || upper.startsWith('ASIA/MACAU')) {
      return 'zh';
    }

    if (
      upper.startsWith('EUROPE/MOSCOW') ||
      upper.startsWith('EUROPE/KALININGRAD') ||
      upper.startsWith('EUROPE/SAMARA') ||
      upper.startsWith('ASIA/YEKATERINBURG') ||
      upper.startsWith('ASIA/OMSK') ||
      upper.startsWith('ASIA/NOVOSIBIRSK') ||
      upper.startsWith('ASIA/KRASNOYARSK') ||
      upper.startsWith('ASIA/IRKUTSK') ||
      upper.startsWith('ASIA/YAKUTSK') ||
      upper.startsWith('ASIA/VLADIVOSTOK')
    ) {
      return 'ru';
    }

    if (
      upper.startsWith('ASIA/DUBAI') ||
      upper.startsWith('ASIA/RIYADH') ||
      upper.startsWith('ASIA/KUWAIT') ||
      upper.startsWith('ASIA/QATAR') ||
      upper.startsWith('ASIA/BAHRAIN') ||
      upper.startsWith('ASIA/AMMAN') ||
      upper.startsWith('ASIA/BAGHDAD') ||
      upper.startsWith('AFRICA/CAIRO') ||
      upper.startsWith('AFRICA/CASABLANCA')
    ) {
      return 'ar';
    }

    return null;
  } catch {
    return null;
  }
};

const languageDetector = new LanguageDetector();
languageDetector.addDetector({
  name: 'timezone',
  lookup: () => {
    // If browser language is already supported, prefer it.
    const nav = typeof navigator !== 'undefined' ? pickSupported(navigator.language) : null;
    if (nav) return nav;
    return detectFromTimezone();
  },
  cacheUserLanguage: (lng) => {
    try {
      localStorage.setItem('i18nextLng', lng);
    } catch {
      // ignore
    }
  },
});

i18n
  // Detect user language
  .use(languageDetector)
  // Pass the i18n instance to react-i18next
  .use(initReactI18next)
  // Initialize i18next
  .init({
    resources,
    fallbackLng: 'en', // Fallback language
    debug: false, // Set to true for debugging
    
    // Language detection options
    detection: {
      order: ['localStorage', 'timezone', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },

    interpolation: {
      escapeValue: false, // React already escapes values
    },

    react: {
      useSuspense: false, // Disable suspense for now
    },
  });

// Handle RTL languages and language-specific styling
i18n.on('languageChanged', (lng) => {
  const isRTL = lng === 'ar';
  const isChinese = lng === 'zh';
  document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
  document.documentElement.lang = lng;
  
  // Add language-specific data attributes for CSS styling
  document.documentElement.setAttribute('data-lang', lng);
  if (isChinese) {
    document.documentElement.classList.add('lang-zh');
    document.documentElement.classList.remove('lang-ar', 'lang-ru', 'lang-en');
  } else if (isRTL) {
    document.documentElement.classList.add('lang-ar');
    document.documentElement.classList.remove('lang-zh', 'lang-ru', 'lang-en');
  } else {
    document.documentElement.classList.add('lang-en');
    document.documentElement.classList.remove('lang-zh', 'lang-ar', 'lang-ru');
  }
});

// Set initial direction based on current language
const currentLang = i18n.language;
const isRTL = currentLang === 'ar';
const isChinese = currentLang === 'zh';
document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
document.documentElement.lang = currentLang;
document.documentElement.setAttribute('data-lang', currentLang);
if (isChinese) {
  document.documentElement.classList.add('lang-zh');
} else if (isRTL) {
  document.documentElement.classList.add('lang-ar');
} else {
  document.documentElement.classList.add('lang-en');
}

export default i18n;
