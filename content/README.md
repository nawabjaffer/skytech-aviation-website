# Skytech Aviation Website Content Guide

## Overview

This folder contains the editable content files for the Skytech Aviation website. These files allow you to update website text, descriptions, and contact information without needing to modify code.

## Files

| File | Description |
|------|-------------|
| `website-content-en.json` | English content for all website pages |

## How to Edit Content

### Step 1: Open the JSON File
Open `website-content-en.json` in any text editor (Notepad, VS Code, etc.)

### Step 2: Locate the Section
The file is organized by page/section:

- `companyInfo` - Company details, contact info, address
- `homepage` - Homepage content (hero, features, track records)
- `aboutPage` - About page (mission, vision, team, milestones)
- `servicesPage` - Services page content
- `productsPage` - Products page labels
- `distributorsPage` - Distributor program content
- `contactPage` - Contact page content
- `footer` - Footer content
- `chatbot` - Chat assistant messages
- `errorPages` - Error page messages

### Step 3: Edit Values Only
**Important**: Only edit the text on the RIGHT side of the colon (`:`). Never change the text on the left side (the keys).

✅ **Correct:**
```json
"title": "Your New Title Here"
```

❌ **Incorrect:**
```json
"newTitle": "Your New Title Here"
```

### Step 4: Save and Share
Save the file and share it with the development team for deployment.

---

## Content Sections Reference

### Company Information
```json
"companyInfo": {
  "name": "Skytech Aviation",
  "tagline": "Your tagline here",
  "contact": {
    "primaryPhone": "+971 XXX XXX XXX",
    "primaryEmail": "email@domain.com"
  }
}
```

### Homepage Hero
```json
"hero": {
  "title": "Main headline",
  "subtitle": "Supporting text",
  "primaryButton": "Button text",
  "secondaryButton": "Button text"
}
```

### Services
```json
"serviceCategories": {
  "items": [
    {
      "title": "Service Name",
      "description": "Service description",
      "benefits": ["Benefit 1", "Benefit 2", "Benefit 3"]
    }
  ]
}
```

### Team Members
```json
"leadershipTeam": {
  "members": [
    {
      "name": "Full Name",
      "position": "Job Title",
      "bio": "Brief biography"
    }
  ]
}
```

### Awards
```json
"awards": {
  "items": [
    {
      "title": "Award Name",
      "year": "2023",
      "issuer": "Issuing Organization"
    }
  ]
}
```

---

## Tips for Good Content

1. **Be Concise** - Keep headlines short and impactful
2. **Be Consistent** - Use the same tone throughout
3. **Include Numbers** - Statistics build credibility (e.g., "50+ countries")
4. **Action Words** - Use verbs in buttons ("Get Started", "Contact Us")
5. **Proofread** - Check for spelling and grammar errors

---

## What NOT to Edit

The following are handled by the development team:
- Dynamic product data (from Google Sheets)
- Hero carousel images/videos
- Statistics displayed on homepage
- Testimonials (from database)

---

## Need Help?

Contact the development team if you:
- Need to add new sections
- Want to change the structure
- Have questions about formatting
- Need content in additional languages

---

## File Validation

Before sharing, ensure:
- [ ] File opens without errors
- [ ] All quotes are properly closed (`"text"`)
- [ ] No trailing commas after last items
- [ ] Special characters are escaped (use `\"` for quotes inside text)

You can validate your JSON at: https://jsonlint.com/

---

**Last Updated:** January 2026  
**Version:** 1.0
