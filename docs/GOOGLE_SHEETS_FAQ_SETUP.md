# Google Sheets FAQ Integration Guide

## Overview

The chatbot now integrates FAQ data from Google Sheets, allowing you to update chatbot responses without modifying code. The system automatically merges:
- **Dynamic FAQs** from Google Sheets (updateable without code deployment)
- **Static FAQs** from `chatbotKnowledge.ts` (fallback when Sheets unavailable)

## Features

✅ **5-minute caching** - Reduces API calls and improves performance  
✅ **Automatic fallback** - Uses static FAQs if Google Sheets is unavailable  
✅ **Keyword matching** - Enhanced search using keywords for better responses  
✅ **Category filtering** - Organize FAQs by category (Products, Services, Support, etc.)  
✅ **Priority merging** - Google Sheets FAQs override static FAQs with same questions  

## Google Sheets Setup

### 1. Create FAQ Sheet

Add a new sheet named "FAQ" to your existing Google Sheets document with these columns:

| Column | Name | Type | Required | Description |
|--------|------|------|----------|-------------|
| A | id | Text | ✅ Yes | Unique identifier (e.g., "1", "2", "faq-001") |
| B | question | Text | ✅ Yes | The FAQ question |
| C | answer | Text | ✅ Yes | The detailed answer to show users |
| D | keywords | Text | ⚠️ Optional | Comma-separated keywords for matching (e.g., "parts, supply, OEM, PMA") |
| E | category | Text | ⚠️ Optional | Category for grouping (e.g., "Products", "Services", "Support", "Company", "Distributors") |
| F | active | Boolean | ✅ Yes | Set to "true" to enable, "false" to disable |

### 2. Example FAQ Data

```
| id  | question                                    | answer                                                                                                                                                          | keywords                                              | category    | active |
|-----|---------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------|-------------|--------|
| 1   | What types of aircraft parts do you supply? | We supply a comprehensive range of aircraft parts from nose to tail, including Brakes & Wheels, Airframe Components, Engine Parts, Aircraft Tools, Lubricants... | parts, supply, OEM, PMA, brakes, wheels, engine      | Products    | true   |
| 2   | Are you ASA certified?                      | Yes, Skytech Aviation is a proud member of the Aviation Suppliers Association (ASA), demonstrating our commitment to quality, safety...                         | ASA, certification, certified, member, quality, safety | Company     | true   |
| 3   | How can I request a quote?                  | You can request a quote by contacting us at +971 561 611 002, emailing info@skytech.ae or sales@skytech.ae...                                                  | quote, request, contact, email, phone, pricing, RFQ   | Support     | true   |
| 4   | What is your return policy?                 | We accept returns within 30 days for unused parts with original packaging. Contact sales@skytech.ae for RMA authorization.                                      | return, refund, exchange, warranty, RMA               | Support     | false  |
```

### 3. Configure Sheet ID

The sheet ID is already configured in your `.env` file:

```env
VITE_GOOGLE_SHEET_ID=your_sheet_id_here
VITE_GOOGLE_API_KEY=your_api_key_here  # Optional
```

The FAQ range is automatically set to `FAQ!A2:F100` (skips header row).

### 4. Make Sheet Public

1. Click **Share** button in Google Sheets
2. Under "General access", select **Anyone with the link** → **Viewer**
3. Click **Copy link** and save (for reference)

## How It Works

### FAQ Loading Flow

```
User sends message
       ↓
Chatbot checks merged FAQs (Google Sheets + static)
       ↓
╔══════════════════════════════════════╗
║  1. Question partial match           ║
║  2. Keyword matching (if provided)   ║
║  3. Question word overlap validation ║
╚══════════════════════════════════════╝
       ↓
FAQ match found? → Return answer
       ↓
No match → Check knowledge base
       ↓
Still no match → Use Ollama AI (if running)
       ↓
Ollama unavailable → Generic response
```

### Caching Mechanism

- **Cache Duration**: 5 minutes
- **Cache Location**: In-memory on client browser
- **Cache Refresh**: Automatic after expiration
- **Fallback**: Uses static FAQs if Sheets API fails

### Keyword Matching

Keywords improve response accuracy:

```typescript
// Example: User asks "Do you have OEM parts?"
Query: "Do you have OEM parts?"
       ↓
Keywords in FAQ: "parts, supply, OEM, PMA, brakes, wheels"
       ↓
Match found: "OEM" keyword matches
       ↓
Validate: Check question overlap ("types of aircraft parts")
       ↓
Return: FAQ answer about parts supply
```

## Adding New FAQs

### Via Google Sheets (Recommended)

1. Open your Google Sheets document
2. Go to the "FAQ" sheet
3. Add a new row with required fields:
   - `id`: Unique (e.g., "11", "12", "faq-payment")
   - `question`: Clear, concise question
   - `answer`: Detailed, helpful answer
   - `keywords`: Relevant search terms (comma-separated)
   - `category`: One of: Products, Services, Support, Company, Distributors
   - `active`: `true`
4. Save (auto-saves in Google Sheets)
5. **Wait 5 minutes** for cache to refresh (or clear browser cache)

### Via Code (Fallback)

Edit `src/config/googleSheets.ts` → `DEFAULT_FAQ` array:

```typescript
{
  id: '11',
  question: "What is your warranty policy?",
  answer: "All parts come with manufacturer's warranty. Contact us for specific warranty terms for your parts.",
  keywords: "warranty, guarantee, policy, coverage",
  category: "Support",
  active: true,
}
```

**Note**: Static FAQs are overridden by Google Sheets FAQs with the same question.

## Testing FAQ Integration

### 1. Test in Development

```bash
npm run dev
```

Open chatbot widget and test queries:
- "What types of parts do you supply?"
- "Are you ASA certified?"
- "How can I request a quote?"

### 2. Check Console Logs

Open browser DevTools → Console to see:

```
✅ Loaded 15 FAQs (10 from Sheets, 10 static)
```

This confirms:
- Number of FAQs loaded
- Source breakdown (Sheets vs. static)

### 3. Test Keyword Matching

Try variations:
- "Do you have OEM parts?" → Should match "What types of aircraft parts..."
- "ASA member?" → Should match "Are you ASA certified?"
- "Get a quote" → Should match "How can I request a quote?"

### 4. Test Fallback Behavior

Disable Google Sheets (set `VITE_GOOGLE_SHEET_ID=""` in `.env`):

```bash
# Rebuild after changing .env
npm run build
```

Chatbot should still work using static FAQs from `chatbotKnowledge.ts`.

## Best Practices

### 1. Writing Good Questions

✅ **Good**: "What types of aircraft parts do you supply?"  
❌ **Bad**: "Parts?"

✅ **Good**: "How can I become a distributor?"  
❌ **Bad**: "Distributor info"

### 2. Writing Good Answers

- Be specific and detailed
- Include contact information when relevant
- Use proper formatting (line breaks with `\n`)
- Keep answers under 500 characters for readability
- Link to relevant pages when possible

### 3. Choosing Keywords

✅ **Good**: "quote, request, contact, email, phone, pricing, RFQ"  
❌ **Bad**: "a, the, and, or"

- Use 5-10 relevant keywords
- Include synonyms and variations
- Include industry terms (AOG, OEM, PMA, etc.)
- Separate with commas
- No special characters

### 4. Categories

Use consistent categories:
- **Products**: Parts, inventory, specifications
- **Services**: AOG, maintenance, delivery
- **Support**: Contact, quotes, payments, returns
- **Company**: About, certifications, ASA, location
- **Distributors**: Partnerships, requirements, benefits

## Troubleshooting

### FAQ Not Appearing in Chatbot

**Check:**
1. `active` column is set to `true`
2. Question and answer are not empty
3. Sheet name is exactly "FAQ" (case-sensitive)
4. Sheet ID in `.env` is correct
5. Sheet is public (Anyone with link can view)
6. Wait 5 minutes for cache to refresh

**Force Cache Refresh:**
```javascript
// In browser console
localStorage.clear();
location.reload();
```

### Duplicate FAQs

Google Sheets FAQs **override** static FAQs with the same question. To prevent duplicates:

1. Use unique questions in Google Sheets
2. Or update static FAQs to different questions
3. Check for case-insensitive duplicates

### Keywords Not Matching

- Ensure keywords are lowercase
- Use comma separation: `keyword1, keyword2, keyword3`
- Avoid too generic keywords (a, the, and, etc.)
- Test with exact keyword in user query

### Performance Issues

- Keep FAQ count under 100 for optimal performance
- Use concise answers (under 500 characters)
- Avoid very long keyword lists
- Consider disabling inactive FAQs instead of deleting

## Advanced Configuration

### Custom Cache Duration

Edit `src/services/googleSheetsService.ts`:

```typescript
private cacheDuration = 10 * 60 * 1000; // 10 minutes instead of 5
```

### Custom Sheet Range

Edit `src/config/googleSheets.ts`:

```typescript
export const SHEET_RANGES = {
  faq: 'FAQ!A2:F200', // Increase from 100 to 200 rows
}
```

### Add FAQ Priority/Weight

1. Add column G: `priority` (number 1-10)
2. Update FAQ interface in `googleSheets.ts`
3. Sort FAQs by priority in `chatService.ts`

## Integration Summary

### Files Modified

1. **`src/config/googleSheets.ts`**
   - Added `FAQ` interface
   - Added `DEFAULT_FAQ` fallback data
   - Added `SHEET_RANGES.faq`

2. **`src/services/googleSheetsService.ts`**
   - Added `getFAQs()` method
   - Added `parseFAQs()` method
   - Added FAQ caching

3. **`src/services/chatService.ts`**
   - Added `loadMergedFAQs()` method
   - Added `mergedFAQs` property
   - Enhanced `getSuggestedResponse()` with keyword matching
   - Merged Google Sheets + static FAQs

### Data Flow

```
Google Sheets (FAQ sheet)
       ↓
googleSheetsService.getFAQs() [5-min cache]
       ↓
chatService.loadMergedFAQs() [merge with static]
       ↓
chatService.getSuggestedResponse() [keyword matching]
       ↓
User receives answer
```

## Next Steps

1. ✅ Build successful - FAQ integration complete
2. 📝 Add FAQs to Google Sheets "FAQ" sheet
3. 🧪 Test chatbot with various queries
4. 📊 Monitor console logs for FAQ loading
5. 🔄 Update FAQs as needed (no code deployment required)

## Support

For issues or questions:
- **Email**: info@skytech.ae
- **Phone**: +971 561 611 002
- **GitHub**: Check project issues

---

**Last Updated**: 2024-11-17  
**Version**: 1.0  
**Feature**: Google Sheets FAQ Integration
