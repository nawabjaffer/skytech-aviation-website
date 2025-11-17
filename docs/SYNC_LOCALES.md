# Sync Locales Feature

## Overview
The sync-locales feature ensures all translation files maintain the same structure as the English (source) translation file.

## Files Created

### 1. `scripts/sync-locales.js`
- Main synchronization script
- Compares all locale files against `en/translation.json`
- Adds missing keys with `[MISSING]` prefix
- Preserves existing translations
- Removes obsolete keys
- Provides detailed statistics

### 2. Updated `package.json`
- Added new script: `"sync-locales": "node scripts/sync-locales.js"`

### 3. Updated `scripts/README.md`
- Added documentation for the sync-locales feature

## Usage

```bash
npm run sync-locales
```

Or run directly:

```bash
node scripts/sync-locales.js
```

## How It Works

1. **Source of Truth**: The `src/locales/en/translation.json` file is the reference
2. **Target Files**: All other locale directories (`ar`, `ru`, etc.)
3. **Synchronization Process**:
   - Reads the English translation structure
   - Compares with each target locale file
   - Preserves existing translations (does not overwrite)
   - Adds missing keys marked as `[MISSING] <English text>`
   - Removes keys that don't exist in English
   - Maintains nested object structure
   - Reports statistics for each file

## Example Workflow

1. **Add new keys to English**:
   ```json
   // src/locales/en/translation.json
   {
     "newFeature": {
       "title": "New Feature",
       "description": "This is a new feature"
     }
   }
   ```

2. **Run sync**:
   ```bash
   npm run sync-locales
   ```

3. **Output**:
   ```
   🌍 Syncing locale files...
   
   📖 Source: en/translation.json
      Total keys: 471
   
   🔄 Syncing ar/translation.json...
      ✅ Synced successfully
      📊 Stats:
         - Total keys: 471
         - Preserved: 469
         - Added: 2 (marked with [MISSING])
   
   ✨ Sync complete! Total changes: 2
   
   ⚠️  Please translate all keys marked with "[MISSING]"
   ```

4. **Check target file**:
   ```json
   // src/locales/ar/translation.json
   {
     "newFeature": {
       "title": "[MISSING] New Feature",
       "description": "[MISSING] This is a new feature"
     }
   }
   ```

5. **Translate missing keys**:
   ```json
   // src/locales/ar/translation.json
   {
     "newFeature": {
       "title": "ميزة جديدة",
       "description": "هذه ميزة جديدة"
     }
   }
   ```

## Features

✅ **Automatic Structure Sync**: Ensures all locales have identical key structure
✅ **Safe**: Never overwrites existing translations
✅ **Clear Indicators**: Missing translations are clearly marked
✅ **Cleanup**: Removes obsolete keys automatically
✅ **Statistics**: Shows exactly what changed
✅ **Nested Support**: Works with deeply nested translation objects
✅ **Multiple Locales**: Syncs all locale directories in one command

## When to Use

- **After adding new translation keys** to the English file
- **Before deployment** to catch missing translations
- **When restructuring** translation files
- **Regular maintenance** to ensure consistency
- **Onboarding new languages** to get the base structure

## Benefits

1. **Consistency**: All languages always have the same keys
2. **No Runtime Errors**: Missing translation keys are caught before deployment
3. **Easy Translation**: Translators can easily find what needs translation
4. **Automation**: Reduces manual work and human error
5. **Scalability**: Easy to add new languages
6. **Maintenance**: Simple to keep translations in sync

## Technical Details

- **Language**: JavaScript (Node.js)
- **Dependencies**: None (uses only Node.js built-in modules)
- **Input**: `src/locales/en/translation.json`
- **Output**: All `src/locales/*/translation.json` files
- **Nested Keys**: Uses dot notation (e.g., `footer.companyInfo`)
- **Preservation**: Uses deep object comparison
- **Structure**: Maintains JSON formatting (2-space indent)
