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
import translate from 'translate';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- Translation Configuration ---
// This script now uses the 'translate' package, which can use various engines.
// By default, it may use Google Translate's public endpoint without needing an API key,
// but this is not guaranteed and may be rate-limited.
// For more robust options, you can configure it to use other engines.
// See: https://www.npmjs.com/package/translate
translate.engine = 'google'; // or 'yandex', 'libre', 'deepl'
// ---

// Configuration
const LOCALES_DIR = path.join(__dirname, '../src/locales');
const SOURCE_LOCALE = 'en';
const MISSING_TRANSLATION_PREFIX = '[MISSING]';

/**
 * Simple check for technical terms that should not be translated.
 */
function isTechnicalTerm(text) {
  const cleanText = text.replace(/^\[MISSING\]\s*/, '').trim();
  const technicalTerms = [
    'AS9120', 'ISO 9001:2015', 'EASA Part-145', 'OEM', 'PMA', 'AOG', 'ASA', 'FAA', 'EASA', 'MRO',
    // Add any other terms that should not be translated
  ];
  // Also avoid translating things that look like variables or placeholders
  if (cleanText.startsWith('{{') && cleanText.endsWith('}}')) return true;
  if (cleanText.startsWith('+')) return true; // Phone numbers
  return technicalTerms.includes(cleanText);
}

/**
 * Translates text using the 'translate' package.
 * Falls back to placeholder on failure.
 */
async function translateText(text, targetLocale) {
  const textToTranslate = text.replace(/^\[MISSING\]\s*/, '').trim();

  if (!textToTranslate || typeof textToTranslate !== 'string' || isTechnicalTerm(textToTranslate)) {
    return textToTranslate;
  }

  try {
    const translation = await translate(textToTranslate, { from: SOURCE_LOCALE, to: targetLocale });
    return translation;
  } catch (error) {
    console.error(`   - ❌ Translation Error for "${textToTranslate.substring(0, 20)}...": ${error.message}`);
    return `${MISSING_TRANSLATION_PREFIX} ${textToTranslate}`;
  }
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
  const translationPromises = [];

  // Add all keys from source
  for (const key of sourceKeys) {
    const sourceValue = getNestedValue(sourceData, key);
    const targetValue = getNestedValue(targetData, key);

    if (targetValue !== undefined) {
      // Check if it's marked as [MISSING] or is empty
      if (typeof targetValue === 'string' && (targetValue.startsWith(MISSING_TRANSLATION_PREFIX) || targetValue.trim() === '')) {
        translationPromises.push(
          translateText(sourceValue, targetLocale).then(translated => {
            setNestedValue(result, key, translated);
            translatedCount++;
            cleanedCount++;
          })
        );
      } else {
        // Preserve existing translation
        setNestedValue(result, key, targetValue);
        preservedCount++;
      }
    } else {
      // New key - try to auto-translate
      translationPromises.push(
        translateText(sourceValue, targetLocale).then(translated => {
          setNestedValue(result, key, translated);
          translatedCount++;
          addedCount++;
        })
      );
    }
  }

  // Count removed keys
  removedCount = targetKeys.filter(key => !sourceKeys.includes(key)).length;

  return Promise.all(translationPromises).then(() => ({
    data: result,
    stats: {
      added: addedCount,
      removed: removedCount,
      preserved: preservedCount,
      translated: translatedCount,
      cleaned: cleanedCount,
      total: sourceKeys.length
    }
  }));
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
async function syncLocales() {
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
      try {
        const fileContent = fs.readFileSync(targetFilePath, 'utf-8').trim();
        if (fileContent === '') {
          console.log(`   - ⚠️  File is empty, starting fresh`);
          targetData = {};
        } else {
          targetData = JSON.parse(fileContent);
        }
      } catch (error) {
        console.log(`   - ⚠️  File has invalid JSON, starting fresh`);
        console.log(`   - Error: ${error.message}`);
        targetData = {};
      }
    } else {
      console.log(`   - ⚠️  File does not exist, creating new file`);
    }
    
    // Sync the file
    const { data: syncedData, stats } = await syncLocaleFile(sourceData, targetData, locale);
    
    // Write the synced file
    fs.writeFileSync(targetFilePath, JSON.stringify(syncedData, null, 2) + '\n', 'utf-8');
    
    // Display stats
    console.log(`   - ✅ Synced successfully`);
    console.log(`   - 📊 Stats:`);
    console.log(`      - Total keys: ${stats.total}`);
    console.log(`      - Preserved: ${stats.preserved}`);
    if (stats.translated > 0) {
      console.log(`      - Auto-translated (API): ${stats.translated}`);
    }
    const stillMissing = stats.added - (stats.translated - stats.cleaned);
    if (stillMissing > 0) {
      console.log(`      - Still missing: ${stillMissing} (marked with ${MISSING_TRANSLATION_PREFIX})`);
    }
    if (stats.removed > 0) {
      console.log(`      - Removed (obsolete): ${stats.removed}`);
    }
    totalChanges += (stats.added + stats.removed);
    console.log('');
  }
  
  if (totalChanges > 0) {
    console.log(`\n✨ Sync complete!`);
    console.log(`\n💡 Note: Translations were automatically generated by Google Translate API. Please review them for accuracy and context.`);
  } else {
    console.log('\n✅ All locale files are already in sync!');
  }
}

// Run the sync
(async () => {
  try {
    await syncLocales();
  } catch (error) {
    console.error('❌ An unexpected error occurred:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
})();
