#!/usr/bin/env node

/**
 * Sync Locales Script
 * 
 * This script ensures all translation files have the same structure as the English (en) translation file.
 * It will:
 * - Add missing keys from en/translation.json to other locale files
 * - Auto-translate missing values using basic translations
 * - Preserve existing translations
 * - Remove keys that don't exist in en/translation.json
 * - Maintain the same nested structure
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const LOCALES_DIR = path.join(__dirname, '../src/locales');
const SOURCE_LOCALE = 'en';
const MISSING_TRANSLATION_PREFIX = '[MISSING]';

// Basic translation dictionaries for common terms
const TRANSLATIONS = {
  ar: {
    // Long phrases first for better matching
    'To deliver top-quality aircraft spare parts and accessories with expert advice and outstanding service, maintaining a broad product range at competitive rates while building lasting customer relationships': 'لتقديم قطع غيار وملحقات طائرات عالية الجودة مع مشورة خبيرة وخدمة متميزة، مع الحفاظ على مجموعة واسعة من المنتجات بأسعار تنافسية وبناء علاقات دائمة مع العملاء',
    'Professional Aviation Services': 'خدمات الطيران المهنية',
    'Complete solutions from nose to tail - supplying OEM & PMA parts for commercial and business aircraft': 'حلول كاملة من الأنف إلى الذيل - توريد قطع OEM و PMA للطائرات التجارية وطائرات الأعمال',
    'Our Service Categories': 'فئات خدماتنا',
    'Comprehensive aviation parts supply and professional services': 'توريد شامل لقطع غيار الطيران والخدمات المهنية',
    'Key Offerings': 'العروض الرئيسية',
    'Aerospace Quality Management': 'إدارة جودة الفضاء الجوي',
    'Quality Management System': 'نظام إدارة الجودة',
    'European Aviation Safety Agency': 'وكالة سلامة الطيران الأوروبية',
    'Federal Aviation Administration': 'إدارة الطيران الفيدرالية',
    // Standards and codes (keep as-is)
    'AS9120': 'AS9120',
    'ISO 9001:2015': 'ISO 9001:2015',
    'EASA Part-145': 'EASA الجزء-145',
    'FAA Approved': 'معتمد من FAA',
    // Common words and phrases
    'To deliver': 'لتقديم',
    'top-quality': 'عالية الجودة',
    'aircraft': 'الطائرات',
    'spare parts': 'قطع الغيار',
    'accessories': 'الملحقات',
    'expert advice': 'المشورة الخبيرة',
    'outstanding service': 'خدمة متميزة',
    'maintaining': 'الحفاظ على',
    'broad product range': 'مجموعة واسعة من المنتجات',
    'competitive rates': 'أسعار تنافسية',
    'building lasting': 'بناء دائم',
    'customer relationships': 'علاقات العملاء',
    'and': 'و',
    'with': 'مع',
    'while': 'بينما',
    'at': 'في',
  },
  ru: {
    // Long phrases first
    'To deliver top-quality aircraft spare parts and accessories with expert advice and outstanding service, maintaining a broad product range at competitive rates while building lasting customer relationships': 'Поставлять высококачественные авиационные запасные части и аксессуары с экспертными консультациями и выдающимся сервисом, поддерживая широкий ассортимент продукции по конкурентным ценам и строя долгосрочные отношения с клиентами',
    'Professional Aviation Services': 'Профессиональные авиационные услуги',
    'Complete solutions from nose to tail - supplying OEM & PMA parts for commercial and business aircraft': 'Комплексные решения от носа до хвоста - поставка OEM и PMA запчастей для коммерческих и бизнес-самолетов',
    'Our Service Categories': 'Категории наших услуг',
    'Comprehensive aviation parts supply and professional services': 'Комплексные поставки авиационных запчастей и профессиональные услуги',
    'Key Offerings': 'Ключевые предложения',
    'Aerospace Quality Management': 'Управление качеством в аэрокосмической отрасли',
    'Quality Management System': 'Система управления качеством',
    'European Aviation Safety Agency': 'Европейское агентство по безопасности полетов',
    'Federal Aviation Administration': 'Федеральное управление гражданской авиации',
    // Standards and codes (keep as-is)
    'AS9120': 'AS9120',
    'ISO 9001:2015': 'ISO 9001:2015',
    'EASA Part-145': 'EASA Part-145',
    'FAA Approved': 'Утверждено FAA',
    // Common words
    'To deliver': 'Поставлять',
    'top-quality': 'высококачественные',
    'aircraft': 'авиационные',
    'spare parts': 'запасные части',
    'accessories': 'аксессуары',
    'expert advice': 'экспертные консультации',
    'outstanding service': 'выдающийся сервис',
    'maintaining': 'поддерживая',
    'broad product range': 'широкий ассортимент продукции',
    'competitive rates': 'конкурентные цены',
    'building lasting': 'строя долгосрочные',
    'customer relationships': 'отношения с клиентами',
    'and': 'и',
    'with': 'с',
    'while': 'поддерживая',
    'at': 'по',
  }
};

/**
 * Check if text is a technical term that should remain unchanged
 */
function isTechnicalTerm(text) {
  const cleanText = text.replace(/^\[MISSING\]\s*/, '').trim();
  const technicalTerms = [
    'AS9120',
    'ISO 9001:2015',
    'EASA Part-145',
    'FAA Approved',
    'OEM',
    'PMA',
    'AOG',
    'ASA',
    'FAA',
    'EASA',
    'MRO'
  ];
  return technicalTerms.includes(cleanText);
}

/**
 * Simple translation function using dictionary
 */
function translateText(text, targetLocale) {
  if (!text || typeof text !== 'string') return text;
  
  // Remove [MISSING] prefix if exists
  const cleanText = text.replace(/^\[MISSING\]\s*/, '');
  
  // Check if the text is a technical term (return as-is)
  if (isTechnicalTerm(cleanText)) {
    return cleanText;
  }
  
  const dictionary = TRANSLATIONS[targetLocale];
  if (!dictionary) return cleanText;
  
  let translated = cleanText;
  
  // Replace known phrases (longer phrases first)
  const phrases = Object.keys(dictionary).sort((a, b) => b.length - a.length);
  for (const phrase of phrases) {
    const translation = dictionary[phrase];
    // Case-insensitive replacement
    const regex = new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
    translated = translated.replace(regex, translation);
  }
  
  return translated;
}

/**
 * Recursively get all keys from an object with dot notation
 */
function getAllKeys(obj, prefix = '') {
  const keys = [];
  
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      keys.push(...getAllKeys(value, fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  
  return keys;
}

/**
 * Get a nested value from an object using dot notation
 */
function getNestedValue(obj, path) {
  return path.split('.').reduce((current, key) => current?.[key], obj);
}

/**
 * Set a nested value in an object using dot notation
 */
function setNestedValue(obj, path, value) {
  const keys = path.split('.');
  const lastKey = keys.pop();
  const target = keys.reduce((current, key) => {
    if (!current[key] || typeof current[key] !== 'object') {
      current[key] = {};
    }
    return current[key];
  }, obj);
  
  target[lastKey] = value;
}

/**
 * Deep clone an object
 */
function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Sync a target locale file with the source locale structure
 */
function syncLocaleFile(sourceData, targetData, targetLocale) {
  const result = {};
  const sourceKeys = getAllKeys(sourceData);
  const targetKeys = getAllKeys(targetData);
  
  let addedCount = 0;
  let removedCount = 0;
  let preservedCount = 0;
  let translatedCount = 0;
  let cleanedCount = 0;
  
  // Add all keys from source
  for (const key of sourceKeys) {
    const sourceValue = getNestedValue(sourceData, key);
    const targetValue = getNestedValue(targetData, key);
    
    if (targetValue !== undefined) {
      // Check if it's marked as [MISSING]
      if (typeof targetValue === 'string' && targetValue.startsWith(MISSING_TRANSLATION_PREFIX)) {
        // Try to auto-translate
        const translated = translateText(sourceValue, targetLocale);
        
        // Check if translation was successful (different from source OR it's the same because it's a technical term)
        // If translated === sourceValue, it means it's either a technical term or untranslatable
        // We want to use it if it's a technical term (no [MISSING] prefix needed)
        const cleanSourceValue = sourceValue.replace(/^\[MISSING\]\s*/, '');
        if (translated === cleanSourceValue || translated !== sourceValue) {
          // Successfully translated or it's a technical term
          setNestedValue(result, key, translated);
          translatedCount++;
          cleanedCount++;
        } else {
          // No translation available, keep [MISSING] marker
          setNestedValue(result, key, targetValue);
          preservedCount++;
        }
      } else {
        // Preserve existing translation (not marked as missing)
        setNestedValue(result, key, targetValue);
        preservedCount++;
      }
    } else {
      // New key - try to auto-translate or add with placeholder
      const translated = translateText(sourceValue, targetLocale);
      
      // Check if translation was successful (changed from original)
      if (translated !== sourceValue) {
        setNestedValue(result, key, translated);
        translatedCount++;
        addedCount++;
      } else {
        // No translation available, add with [MISSING] marker
        const placeholder = `${MISSING_TRANSLATION_PREFIX} ${sourceValue}`;
        setNestedValue(result, key, placeholder);
        addedCount++;
      }
    }
  }
  
  // Count removed keys
  removedCount = targetKeys.filter(key => !sourceKeys.includes(key)).length;
  
  return {
    data: result,
    stats: {
      added: addedCount,
      removed: removedCount,
      preserved: preservedCount,
      translated: translatedCount,
      cleaned: cleanedCount,
      total: sourceKeys.length
    }
  };
}

/**
 * Get all locale directories
 */
function getLocaleDirectories() {
  return fs.readdirSync(LOCALES_DIR)
    .filter(item => {
      const itemPath = path.join(LOCALES_DIR, item);
      return fs.statSync(itemPath).isDirectory() && item !== SOURCE_LOCALE;
    });
}

/**
 * Main sync function
 */
function syncLocales() {
  console.log('🌍 Syncing locale files...\n');
  
  // Read source locale file
  const sourceFilePath = path.join(LOCALES_DIR, SOURCE_LOCALE, 'translation.json');
  
  if (!fs.existsSync(sourceFilePath)) {
    console.error(`❌ Source locale file not found: ${sourceFilePath}`);
    process.exit(1);
  }
  
  const sourceData = JSON.parse(fs.readFileSync(sourceFilePath, 'utf-8'));
  console.log(`📖 Source: ${SOURCE_LOCALE}/translation.json`);
  console.log(`   Total keys: ${getAllKeys(sourceData).length}\n`);
  
  // Get all locale directories
  const locales = getLocaleDirectories();
  
  if (locales.length === 0) {
    console.log('ℹ️  No other locale directories found.');
    return;
  }
  
  let totalChanges = 0;
  
  // Sync each locale
  for (const locale of locales) {
    const targetFilePath = path.join(LOCALES_DIR, locale, 'translation.json');
    
    console.log(`🔄 Syncing ${locale}/translation.json...`);
    
    // Read existing target file or create empty object
    let targetData = {};
    if (fs.existsSync(targetFilePath)) {
      targetData = JSON.parse(fs.readFileSync(targetFilePath, 'utf-8'));
    } else {
      console.log(`   ⚠️  File does not exist, creating new file`);
    }
    
    // Sync the file
    const { data: syncedData, stats } = syncLocaleFile(sourceData, targetData, locale);
    
    // Write the synced file
    fs.writeFileSync(targetFilePath, JSON.stringify(syncedData, null, 2) + '\n', 'utf-8');
    
    // Display stats
    console.log(`   ✅ Synced successfully`);
    console.log(`   📊 Stats:`);
    console.log(`      - Total keys: ${stats.total}`);
    console.log(`      - Preserved: ${stats.preserved}`);
    if (stats.translated > 0 || stats.cleaned > 0) {
      console.log(`      - Auto-translated/cleaned: ${stats.translated}`);
    }
    if (stats.added > 0) {
      const stillMissing = stats.added - (stats.translated - stats.cleaned);
      if (stillMissing > 0) {
        console.log(`      - Still missing: ${stillMissing} (marked with ${MISSING_TRANSLATION_PREFIX})`);
      }
      totalChanges += stats.added;
    }
    if (stats.removed > 0) {
      console.log(`      - Removed: ${stats.removed}`);
      totalChanges += stats.removed;
    }
    console.log('');
  }
  
  if (totalChanges > 0) {
    console.log(`\n✨ Sync complete! Total changes: ${totalChanges}`);
    console.log(`\n💡 Note: Some translations were auto-generated. Please review and refine as needed.`);
    console.log(`⚠️  Keys still marked with "${MISSING_TRANSLATION_PREFIX}" need manual translation.`);
  } else {
    console.log('\n✅ All locale files are already in sync!');
  }
}

// Run the sync
try {
  syncLocales();
} catch (error) {
  console.error('❌ Error syncing locales:', error.message);
  process.exit(1);
}
