# 📁 Skytech Aviation Project Structure# Project Structure



## Root Directory StructureComplete directory structure of the Skytech Aviation website project.



```## 📁 Root Directory

skytech-aviation-website/

├── 📁 .github/                 # GitHub Actions workflows```

│   └── workflows/skytech-aviation-website/

│       └── deploy.yml         # Automated deployment├── .env.example                    # Environment variables template

├── 📁 docs/                   # Documentation├── .git/                          # Git repository

│   ├── 📁 deployment/         # Deployment guides├── .github/

│   ├── 📁 development/        # Technical documentation│   └── workflows/

│   ├── 📁 google-sheets/      # Google Sheets integration│       └── deploy.yml             # GitHub Actions deployment workflow

│   ├── 📁 phases/            # Development phases├── .gitignore                     # Git ignore rules

│   └── *.md                  # Project documentation├── .npmrc                         # NPM configuration

├── 📁 public/                # Static assets├── DevelopmentGuide.md            # Main development roadmap

│   ├── sitemap.xml           # SEO sitemap├── README.md                      # Project overview and quick start

│   ├── robots.txt            # Search engine directives├── PROJECT_STRUCTURE.md           # This file

│   ├── CNAME                 # Custom domain configuration├── docs/                          # 📚 All documentation

│   └── assets/               # Images, icons, etc.├── scripts/                       # 🔧 Deployment automation

├── 📁 scripts/               # Build and deployment scripts├── public/

├── 📁 src/                   # Source code│   └── index.html                 # HTML entry point

│   ├── 📁 chatbot/           # AI chatbot functionality├── src/                           # Source code

│   ├── 📁 components/        # React components├── dist/                          # Build output (generated)

│   │   ├── 📁 performance/   # Performance-optimized components├── node_modules/                  # Dependencies (generated)

│   │   └── *.tsx            # UI components├── package.json                   # NPM package configuration

│   ├── 📁 config/            # Configuration files├── package-lock.json              # NPM lock file

│   ├── 📁 contexts/          # React contexts├── postcss.config.js              # PostCSS configuration

│   ├── 📁 data/              # Static data and content├── tailwind.config.js             # TailwindCSS configuration

│   ├── 📁 hooks/             # Custom React hooks├── tsconfig.json                  # TypeScript configuration

│   ├── 📁 locales/           # Internationalization files└── vite.config.ts                 # Vite build configuration

│   ├── 📁 pages/             # Page components```

│   ├── 📁 seo/               # SEO utilities and metadata

│   ├── 📁 services/          # API services and external integrations## 📚 Documentation (`docs/`)

│   ├── 📁 styles/            # CSS and styling

│   ├── 📁 tests/             # Test files```

│   ├── 📁 utils/             # Utility functionsdocs/

│   │   ├── 📁 performance/   # Performance utilities├── README.md                      # Documentation index

│   │   └── *.ts             # General utilities├── deployment/                    # Deployment guides

│   ├── app.tsx              # Main App component│   ├── README.md                 # Deployment overview

│   ├── main.tsx             # Entry point│   ├── GITHUB_PAGES_DEPLOYMENT.md

│   └── i18n.ts              # Internationalization setup│   └── CUSTOM_DOMAIN_DEPLOYMENT.md

├── 📄 index.html             # HTML template├── google-sheets/                 # Google Sheets integration

├── 📄 package.json           # Dependencies and scripts│   ├── README.md                 # Integration overview

├── 📄 vite.config.ts         # Vite configuration│   ├── GOOGLE_SHEETS_SETUP.md

├── 📄 tailwind.config.js     # TailwindCSS configuration│   └── .env.example

├── 📄 tsconfig.json          # TypeScript configuration└── phases/                        # Development history

├── 📄 DevelopmentGuide.md    # Main development guide    ├── README.md                 # Phase overview

└── 📄 README.md              # Project overview    ├── PHASE1-COMPLETE.md        # Initial setup

```    ├── PHASE1.2-COMPLETE.md      # Enhanced setup

    ├── PHASE1.3-COMPLETE.md      # Foundation completion

## Source Code Organization    ├── PHASE2.1-COMPLETE.md      # Core features (milestone 1)

    ├── PHASE2.2-COMPLETE.md      # Core features (milestone 2)

### 📁 components/    └── PHASE5.1-COMPLETE.md      # Home page implementation ⭐

``````

components/

├── 📁 performance/           # Performance-optimized components## 🔧 Scripts (`scripts/`)

│   ├── LazyImage.tsx        # Lazy loading images

│   └── index.ts            # Performance components exports```

├── Layout.tsx              # Main layout wrapperscripts/

├── Navbar.tsx              # Navigation component├── README.md                      # Scripts documentation

├── Footer.tsx              # Footer component├── deploy-netlify.sh              # Automated Netlify deployment

├── SEOHead.tsx             # SEO meta tags├── deploy-aws.sh                  # Automated AWS S3+CloudFront deployment

├── ChatbotWidget.tsx       # AI chatbot UI└── restore-github-pages.sh        # Restore GitHub Pages configuration

├── HeroCarousel.tsx        # Homepage hero section```

├── FeaturesSection.tsx     # Features display

├── StatsSection.tsx        # Statistics counter## 💻 Source Code (`src/`)

├── TestimonialsCarousel.tsx # Customer testimonials

├── LatestProductsSection.tsx # Products showcase```

├── CTASection.tsx          # Call-to-action sectionssrc/

├── LanguageSelector.tsx    # Language switcher├── app.tsx                        # Main application component

├── DarkModeToggle.tsx      # Theme toggle├── main.tsx                       # React entry point

├── ScrollToTop.tsx         # Scroll to top button├── vite-env.d.ts                 # Vite environment types

└── index.ts               # Main components exports├── chatbot/                       # 🤖 Chatbot feature

```│   ├── llmClient.ts              # LLM client integration

│   ├── modelConfig.ts            # Model configuration

### 📁 utils/│   └── prompts.ts                # Chatbot prompts

```├── components/                    # ⚛️ React components

utils/│   ├── ChatbotWidget.tsx         # Chatbot UI widget

├── 📁 performance/         # Performance utilities│   ├── CTASection.tsx            # Call-to-action section

│   ├── imageOptimization.ts # Image optimization helpers│   ├── FeaturesSection.tsx       # Features grid (4 columns)

│   └── index.ts           # Performance exports│   ├── Footer.tsx                # Site footer

├── api.ts                 # API functions│   ├── HeroCarousel.tsx          # Google Sheets powered carousel

├── validators.ts          # Form validation│   ├── LatestProductsSection.tsx # Products showcase

└── index.ts              # Main utils exports│   ├── Layout.tsx                # Main layout wrapper

```│   ├── Navbar.tsx                # Navigation bar

│   ├── SEOHead.tsx               # SEO meta tags component

### 📁 pages/│   ├── StatsSection.tsx          # Animated statistics counter

```│   └── TestimonialsCarousel.tsx  # Customer testimonials

pages/├── config/                        # ⚙️ Configuration

├── Home.tsx               # Homepage│   └── googleSheets.ts           # Google Sheets config & interfaces

├── Products.tsx           # Products catalog├── contexts/                      # 🔄 React contexts

├── Services.tsx           # Services overview│   └── ThemeContext.tsx          # Dark mode theme context

├── DistributorsEnhanced.tsx # Partnership information├── hooks/                         # 🎣 Custom React hooks

├── About.tsx              # Company information│   ├── useChatbot.ts             # Chatbot state management

└── Contacts.tsx           # Contact information│   └── useTheme.ts               # Theme switching hook

```├── locales/                       # 🌐 Translations

│   ├── en/

### 📁 seo/│   │   └── translation.json      # English translations

```│   ├── ar/

seo/│   │   └── translation.json      # Arabic translations

├── metadata.ts            # SEO metadata and configuration│   └── ru/

└── sitemapGenerator.ts    # Sitemap generation utilities│       └── translation.json      # Russian translations

```├── pages/                         # 📄 Page components

│   ├── Home.tsx                  # Home page (7 sections) ⭐

### 📁 chatbot/│   ├── About.tsx                 # About page

```│   ├── Contacts.tsx              # Contact page

chatbot/│   ├── Distributors.tsx          # Distributors page

├── llmClient.ts           # LLM integration│   ├── Products.tsx              # Products catalog

├── modelConfig.ts         # AI model configuration│   └── Services.tsx              # Services page

└── prompts.ts            # Chat prompts and responses├── seo/                          # 🔍 SEO utilities

```│   ├── metadata.ts               # SEO metadata

│   └── sitemapGenerator.ts       # Sitemap generation

### 📁 services/├── services/                      # 🌐 API services

```│   └── googleSheetsService.ts    # Google Sheets API integration

services/├── styles/                        # 🎨 Stylesheets

├── chatService.ts         # Chat functionality│   ├── globals.css               # Global styles

└── googleSheetsService.ts # Google Sheets integration│   └── variables.css             # CSS variables

```├── tests/                         # 🧪 Test suites

│   ├── accessibility.test.ts     # Accessibility tests

### 📁 data/│   ├── components.test.ts        # Component tests

```│   └── pages.test.ts             # Page tests

data/└── utils/                         # 🛠️ Utility functions

├── chatbotKnowledge.ts    # AI knowledge base    ├── api.ts                    # API utilities

├── featuresData.ts        # Features information    └── validators.ts             # Validation functions

├── productsData.ts        # Products catalog```

├── servicesData.ts        # Services information

├── statsData.ts           # Statistics data## 🚀 Build Output (`dist/`)

└── testimonialsData.ts    # Customer testimonials

``````

dist/                              # Generated by: npm run build

### 📁 locales/├── index.html                     # Main HTML file

```├── assets/

locales/│   ├── index-[hash].js           # Bundled JavaScript

├── 📁 en/                # English translations│   ├── index-[hash].css          # Bundled CSS

├── 📁 ar/                # Arabic translations│   └── [other-assets]            # Images, fonts, etc.

└── 📁 ru/                # Russian translations└── ...

``````



## Documentation Organization## 📊 Key Features by Directory



### 📁 docs/### `/docs/deployment/`

```- **GitHub Pages** - Free hosting with automated deployment

docs/- **Netlify** - Free tier with auto-deployments

├── 📁 deployment/         # Deployment guides- **Vercel** - React-optimized hosting

│   ├── aws-deployment.md- **AWS S3+CloudFront** - Professional scalable solution (Dubai region)

│   ├── netlify-deployment.md- **UAE Hosting** - Traditional cPanel hosting

│   └── github-pages.md

├── 📁 development/        # Technical documentation### `/docs/google-sheets/`

│   ├── PERFORMANCE_OPTIMIZATION.md- Complete Google Sheets API setup guide

│   └── SEO_IMPLEMENTATION.md- Environment configuration

├── 📁 google-sheets/      # Google Sheets setup- Sheet structure (12 columns)

├── 📁 phases/            # Development phases- Default fallback data

├── CUSTOM_DOMAIN_SETUP.md # Domain configuration- 5-minute caching strategy

├── PRODUCTS_PAGE.md       # Products page documentation

├── DISTRIBUTORS_PAGE.md   # Distributors page documentation### `/docs/phases/`

├── GOOGLE_APPS_SCRIPT_SETUP.md # Google Apps Script setup- **Phase 1-2**: Foundation & core features

└── README.md             # Documentation index- **Phase 5.1**: Home page with 7 sections

```  - Hero Carousel (Google Sheets)

  - Features (4 cards)

## Key Features by Folder  - Stats (animated counter)

  - Testimonials (carousel)

### 🚀 Performance Features (`components/performance/`, `utils/performance/`)  - Products (showcase)

- Lazy loading images with Intersection Observer  - CTA (conversion)

- WebP image optimization with fallbacks

- Code splitting and dynamic imports### `/scripts/`

- Service worker for offline support- **deploy-netlify.sh** - One-command Netlify deployment

- Brotli/Gzip compression- **deploy-aws.sh** - AWS deployment with Dubai region optimization

- **restore-github-pages.sh** - Restore default GitHub Pages config

### 🌐 SEO Features (`seo/`)

- Dynamic meta tags per page### `/src/components/`

- JSON-LD structured data- **7 Home page sections** - Fully implemented with animations

- Multilingual hreflang tags- **Layout components** - Navbar, Footer, Layout, SEOHead

- Geo-targeting for UAE market- **Interactive features** - Chatbot, Theme switcher

- Automatic sitemap generation- **Responsive design** - Mobile-first approach

- **Dark mode support** - All components

### 🤖 AI Features (`chatbot/`)

- LangChain integration### `/src/locales/`

- Ollama local LLM support- **3 languages** - English, Arabic, Russian

- Context-aware responses- **Comprehensive translations** - All UI text

- Multilingual chat support- **RTL support** - Arabic language

- Persistent chat history- **Language detector** - Auto-detect user language



### 🌍 i18n Features (`locales/`)## 🎯 File Count Summary

- English, Arabic, Russian support

- RTL layout for Arabic| Category | Count | Description |

- Dynamic language switching|----------|-------|-------------|

- SEO-optimized language detection| Documentation | 13 files | Guides, READMEs, phase docs |

| Scripts | 4 files | Deployment automation |

### 📱 UI Components (`components/`)| React Components | 20+ files | UI components |

- Responsive design (mobile-first)| Pages | 6 files | Main pages |

- Dark/light mode support| Services | 1 file | Google Sheets API |

- TailwindCSS styling| Tests | 3 files | Test suites |

- Smooth animations| Locales | 3 files | Translation files |

- Accessibility features| Config | 6 files | Build & app config |



This organized structure ensures:## 📖 Quick Links

- ✅ Clear separation of concerns

- ✅ Easy maintenance and updates- **Getting Started:** [README.md](../README.md)

- ✅ Scalable architecture- **Development Roadmap:** [DevelopmentGuide.md](../DevelopmentGuide.md)

- ✅ Performance optimization- **Deployment:** [docs/deployment/](../docs/deployment/)

- ✅ SEO best practices- **Google Sheets Setup:** [docs/google-sheets/](../docs/google-sheets/)

- ✅ Comprehensive documentation- **Phase History:** [docs/phases/](../docs/phases/)
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
