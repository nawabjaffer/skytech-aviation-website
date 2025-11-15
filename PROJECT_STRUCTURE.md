# Project Structure

Complete directory structure of the Skytech Aviation website project.

## 📁 Root Directory

```
skytech-aviation-website/
├── .env.example                    # Environment variables template
├── .git/                          # Git repository
├── .github/
│   └── workflows/
│       └── deploy.yml             # GitHub Actions deployment workflow
├── .gitignore                     # Git ignore rules
├── .npmrc                         # NPM configuration
├── DevelopmentGuide.md            # Main development roadmap
├── README.md                      # Project overview and quick start
├── PROJECT_STRUCTURE.md           # This file
├── docs/                          # 📚 All documentation
├── scripts/                       # 🔧 Deployment automation
├── public/
│   └── index.html                 # HTML entry point
├── src/                           # Source code
├── dist/                          # Build output (generated)
├── node_modules/                  # Dependencies (generated)
├── package.json                   # NPM package configuration
├── package-lock.json              # NPM lock file
├── postcss.config.js              # PostCSS configuration
├── tailwind.config.js             # TailwindCSS configuration
├── tsconfig.json                  # TypeScript configuration
└── vite.config.ts                 # Vite build configuration
```

## 📚 Documentation (`docs/`)

```
docs/
├── README.md                      # Documentation index
├── deployment/                    # Deployment guides
│   ├── README.md                 # Deployment overview
│   ├── GITHUB_PAGES_DEPLOYMENT.md
│   └── CUSTOM_DOMAIN_DEPLOYMENT.md
├── google-sheets/                 # Google Sheets integration
│   ├── README.md                 # Integration overview
│   ├── GOOGLE_SHEETS_SETUP.md
│   └── .env.example
└── phases/                        # Development history
    ├── README.md                 # Phase overview
    ├── PHASE1-COMPLETE.md        # Initial setup
    ├── PHASE1.2-COMPLETE.md      # Enhanced setup
    ├── PHASE1.3-COMPLETE.md      # Foundation completion
    ├── PHASE2.1-COMPLETE.md      # Core features (milestone 1)
    ├── PHASE2.2-COMPLETE.md      # Core features (milestone 2)
    └── PHASE5.1-COMPLETE.md      # Home page implementation ⭐
```

## 🔧 Scripts (`scripts/`)

```
scripts/
├── README.md                      # Scripts documentation
├── deploy-netlify.sh              # Automated Netlify deployment
├── deploy-aws.sh                  # Automated AWS S3+CloudFront deployment
└── restore-github-pages.sh        # Restore GitHub Pages configuration
```

## 💻 Source Code (`src/`)

```
src/
├── app.tsx                        # Main application component
├── main.tsx                       # React entry point
├── vite-env.d.ts                 # Vite environment types
├── chatbot/                       # 🤖 Chatbot feature
│   ├── llmClient.ts              # LLM client integration
│   ├── modelConfig.ts            # Model configuration
│   └── prompts.ts                # Chatbot prompts
├── components/                    # ⚛️ React components
│   ├── ChatbotWidget.tsx         # Chatbot UI widget
│   ├── CTASection.tsx            # Call-to-action section
│   ├── FeaturesSection.tsx       # Features grid (4 columns)
│   ├── Footer.tsx                # Site footer
│   ├── HeroCarousel.tsx          # Google Sheets powered carousel
│   ├── LatestProductsSection.tsx # Products showcase
│   ├── Layout.tsx                # Main layout wrapper
│   ├── Navbar.tsx                # Navigation bar
│   ├── SEOHead.tsx               # SEO meta tags component
│   ├── StatsSection.tsx          # Animated statistics counter
│   └── TestimonialsCarousel.tsx  # Customer testimonials
├── config/                        # ⚙️ Configuration
│   └── googleSheets.ts           # Google Sheets config & interfaces
├── contexts/                      # 🔄 React contexts
│   └── ThemeContext.tsx          # Dark mode theme context
├── hooks/                         # 🎣 Custom React hooks
│   ├── useChatbot.ts             # Chatbot state management
│   └── useTheme.ts               # Theme switching hook
├── locales/                       # 🌐 Translations
│   ├── en/
│   │   └── translation.json      # English translations
│   ├── ar/
│   │   └── translation.json      # Arabic translations
│   └── ru/
│       └── translation.json      # Russian translations
├── pages/                         # 📄 Page components
│   ├── Home.tsx                  # Home page (7 sections) ⭐
│   ├── About.tsx                 # About page
│   ├── Contacts.tsx              # Contact page
│   ├── Distributors.tsx          # Distributors page
│   ├── Products.tsx              # Products catalog
│   └── Services.tsx              # Services page
├── seo/                          # 🔍 SEO utilities
│   ├── metadata.ts               # SEO metadata
│   └── sitemapGenerator.ts       # Sitemap generation
├── services/                      # 🌐 API services
│   └── googleSheetsService.ts    # Google Sheets API integration
├── styles/                        # 🎨 Stylesheets
│   ├── globals.css               # Global styles
│   └── variables.css             # CSS variables
├── tests/                         # 🧪 Test suites
│   ├── accessibility.test.ts     # Accessibility tests
│   ├── components.test.ts        # Component tests
│   └── pages.test.ts             # Page tests
└── utils/                         # 🛠️ Utility functions
    ├── api.ts                    # API utilities
    └── validators.ts             # Validation functions
```

## 🚀 Build Output (`dist/`)

```
dist/                              # Generated by: npm run build
├── index.html                     # Main HTML file
├── assets/
│   ├── index-[hash].js           # Bundled JavaScript
│   ├── index-[hash].css          # Bundled CSS
│   └── [other-assets]            # Images, fonts, etc.
└── ...
```

## 📊 Key Features by Directory

### `/docs/deployment/`
- **GitHub Pages** - Free hosting with automated deployment
- **Netlify** - Free tier with auto-deployments
- **Vercel** - React-optimized hosting
- **AWS S3+CloudFront** - Professional scalable solution (Dubai region)
- **UAE Hosting** - Traditional cPanel hosting

### `/docs/google-sheets/`
- Complete Google Sheets API setup guide
- Environment configuration
- Sheet structure (12 columns)
- Default fallback data
- 5-minute caching strategy

### `/docs/phases/`
- **Phase 1-2**: Foundation & core features
- **Phase 5.1**: Home page with 7 sections
  - Hero Carousel (Google Sheets)
  - Features (4 cards)
  - Stats (animated counter)
  - Testimonials (carousel)
  - Products (showcase)
  - CTA (conversion)

### `/scripts/`
- **deploy-netlify.sh** - One-command Netlify deployment
- **deploy-aws.sh** - AWS deployment with Dubai region optimization
- **restore-github-pages.sh** - Restore default GitHub Pages config

### `/src/components/`
- **7 Home page sections** - Fully implemented with animations
- **Layout components** - Navbar, Footer, Layout, SEOHead
- **Interactive features** - Chatbot, Theme switcher
- **Responsive design** - Mobile-first approach
- **Dark mode support** - All components

### `/src/locales/`
- **3 languages** - English, Arabic, Russian
- **Comprehensive translations** - All UI text
- **RTL support** - Arabic language
- **Language detector** - Auto-detect user language

## 🎯 File Count Summary

| Category | Count | Description |
|----------|-------|-------------|
| Documentation | 13 files | Guides, READMEs, phase docs |
| Scripts | 4 files | Deployment automation |
| React Components | 20+ files | UI components |
| Pages | 6 files | Main pages |
| Services | 1 file | Google Sheets API |
| Tests | 3 files | Test suites |
| Locales | 3 files | Translation files |
| Config | 6 files | Build & app config |

## 📖 Quick Links

- **Getting Started:** [README.md](../README.md)
- **Development Roadmap:** [DevelopmentGuide.md](../DevelopmentGuide.md)
- **Deployment:** [docs/deployment/](../docs/deployment/)
- **Google Sheets Setup:** [docs/google-sheets/](../docs/google-sheets/)
- **Phase History:** [docs/phases/](../docs/phases/)
- **Scripts:** [scripts/](../scripts/)

## 🔄 Version Control

**Current deployment:** https://nawabjaffer.github.io/skytech-aviation-website/

**Git branches:**
- `main` - Production branch (auto-deploys to GitHub Pages)
- Feature branches as needed

## 📝 Notes

- All deployment documentation moved to `docs/deployment/`
- All Google Sheets docs moved to `docs/google-sheets/`
- All phase completion docs moved to `docs/phases/`
- All deployment scripts moved to `scripts/`
- Root directory now clean and organized
- Each folder has its own README for navigation

---

**Last updated:** November 15, 2025
**Project version:** Phase 5.1 Complete
**Build tool:** Vite 7.2.2
**Framework:** React 18.0.0 + TypeScript 5.9.3
