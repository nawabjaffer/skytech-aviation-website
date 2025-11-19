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

i18n
  // Detect user language
  .use(LanguageDetector)
  // Pass the i18n instance to react-i18next
  .use(initReactI18next)
  // Initialize i18next
  .init({
    resources,
    fallbackLng: 'en', // Fallback language
    debug: false, // Set to true for debugging
    
    // Language detection options
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
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
