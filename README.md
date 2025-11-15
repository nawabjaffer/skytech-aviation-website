# SKYTECH AVIATION Website

Modern, responsive website for SKYTECH AVIATION - an authorized civil aircraft parts supplier and ASA member. Built with React, TypeScript, and Vite, featuring multilingual support (EN/AR/RU), dark mode, Google Sheets integration, and comprehensive deployment options.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Set up environment variables (optional - for Google Sheets)
cp .env.example .env
# Edit .env with your Google Sheets credentials

# Start development server
npm run dev
# Open http://localhost:3000/skytech-aviation-website/

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
skytech-aviation-website/
├── docs/                           # 📚 All documentation
│   ├── deployment/                 # Deployment guides
│   │   ├── GITHUB_PAGES_DEPLOYMENT.md
│   │   ├── CUSTOM_DOMAIN_DEPLOYMENT.md
│   │   └── README.md
│   ├── google-sheets/              # Google Sheets integration
│   │   ├── GOOGLE_SHEETS_SETUP.md
│   │   ├── .env.example
│   │   └── README.md
│   ├── phases/                     # Development phases
│   │   ├── PHASE1-COMPLETE.md
│   │   ├── PHASE5.1-COMPLETE.md
│   │   └── README.md
│   └── README.md
├── scripts/                        # 🔧 Deployment automation
│   ├── deploy-netlify.sh
│   ├── deploy-aws.sh
│   ├── restore-github-pages.sh
│   └── README.md
├── src/
│   ├── pages/                      # Page components
│   │   ├── Home.tsx               # ⭐ Hero, Features, Stats, Testimonials
│   │   ├── Products.tsx
│   │   ├── Services.tsx
│   │   ├── About.tsx
│   │   ├── Distributors.tsx
│   │   └── Contacts.tsx
│   ├── components/                 # Reusable components
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── Layout.tsx
│   │   ├── SEOHead.tsx
│   │   ├── ChatbotWidget.tsx
│   │   ├── HeroCarousel.tsx       # Google Sheets powered
│   │   ├── FeaturesSection.tsx
│   │   ├── StatsSection.tsx
│   │   ├── TestimonialsCarousel.tsx
│   │   ├── LatestProductsSection.tsx
│   │   └── CTASection.tsx
│   ├── services/                   # API services
│   │   └── googleSheetsService.ts # Google Sheets integration
│   ├── config/                     # Configuration
│   │   └── googleSheets.ts
│   ├── chatbot/                    # Chatbot feature
│   │   ├── llmClient.ts
│   │   ├── modelConfig.ts
│   │   └── prompts.ts
│   ├── seo/                        # SEO utilities
│   │   ├── metadata.ts
│   │   └── sitemapGenerator.ts
│   ├── styles/                     # Global styles
│   │   ├── globals.css
│   │   └── variables.css
│   ├── hooks/                      # Custom React hooks
│   │   └── useChatbot.ts
│   ├── utils/                      # Utility functions
│   │   ├── api.ts
│   │   └── validators.ts
│   ├── tests/                      # Test suites
│   │   ├── pages.test.ts
│   │   ├── components.test.ts
│   │   └── accessibility.test.ts
│   ├── app.tsx                     # Main app component
│   └── main.tsx                    # Entry point
├── .env.example                    # Environment variables template
├── DevelopmentGuide.md            # Complete development roadmap
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```


## ✨ Features

### Implemented (Phase 5.1) ✅
- **🎯 Hero Carousel** - Google Sheets powered, auto-sliding, video/image support
- **💎 Features Section** - 4-column grid showcasing company benefits
- **📊 Stats Counter** - Animated on scroll with easing effects
- **💬 Testimonials** - Auto-rotating customer reviews
- **🛒 Latest Products** - Product showcase with hover effects
- **📢 CTA Section** - Conversion-optimized call-to-action
- **🌐 Multilingual** - EN/AR/RU support with react-i18next
- **🌙 Dark Mode** - Automatic theme switching
- **📱 Responsive** - Mobile-first design
- **♿ Accessible** - WCAG 2.1 compliant
- **🔍 SEO Optimized** - Meta tags, sitemap, structured data
- **🤖 Chatbot** - AI-powered assistance (LLM integration)

### Coming Soon 🔄
- **Phase 5.2:** Products page with filtering and search
- **Phase 5.3:** Services page with detailed offerings
- **Phase 5.4:** Distributors partnership program
- **Phase 5.5:** About page with company story
- **Phase 5.6:** Contact page with form and map

## 🚀 Deployment

### Current Deployment
**GitHub Pages:** https://nawabjaffer.github.io/skytech-aviation-website/

### Deploy to Custom Domain

#### Option 1: Netlify (Easiest - FREE)
```bash
chmod +x scripts/deploy-netlify.sh
./scripts/deploy-netlify.sh
```

#### Option 2: AWS S3 + CloudFront (UAE Optimized)
```bash
chmod +x scripts/deploy-aws.sh
# Edit script to add CloudFront distribution ID
./scripts/deploy-aws.sh
```

#### Option 3: Restore GitHub Pages
```bash
chmod +x scripts/restore-github-pages.sh
./scripts/restore-github-pages.sh
git push origin main
```

**📖 Full deployment guides:** See [docs/deployment/](docs/deployment/)

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
# Google Sheets Integration (Optional)
VITE_GOOGLE_SHEET_ID=your_sheet_id_here
VITE_GOOGLE_API_KEY=your_api_key_here
VITE_GOOGLE_SHEET_RANGE=HeroSlides!A2:L100
VITE_GOOGLE_WEBHOOK_URL=optional_webhook_url
```

**📖 Setup guide:** See [docs/google-sheets/GOOGLE_SHEETS_SETUP.md](docs/google-sheets/GOOGLE_SHEETS_SETUP.md)

### Build Configuration

**For GitHub Pages:**
```typescript
// vite.config.ts
base: '/skytech-aviation-website/'

// src/app.tsx
<Router basename="/skytech-aviation-website">
```

**For Custom Domain:**
```typescript
// vite.config.ts
base: '/'

// src/app.tsx
<Router basename="/">
```

## 📚 Documentation

- **[Development Guide](DevelopmentGuide.md)** - Complete development roadmap
- **[Deployment Guides](docs/deployment/)** - All deployment options
- **[Google Sheets Setup](docs/google-sheets/)** - Integration documentation
- **[Phase Documentation](docs/phases/)** - Development history
- **[Deployment Scripts](scripts/)** - Automation scripts

## 🛠️ Tech Stack

**Core:**
- React 18.0.0
- TypeScript 5.9.3
- Vite 7.2.2

**Styling:**
- TailwindCSS 3.4.18
- PostCSS 8.5.1

**Internationalization:**
- react-i18next 16.3.3
- i18next 25.0.2

**Routing:**
- react-router-dom 7.4.1

**API:**
- Axios 1.13.2

**Build & Optimization:**
- ESLint 9.19.0
- TypeScript ESLint
- Vite plugins

## 📊 Build Stats

**Latest build:**
- JavaScript: 361.02 kB (114.67 kB gzipped)
- CSS: Optimized with Tailwind
- Images: Lazy loaded
- Fonts: Self-hosted

## 🧪 Testing

```bash
# Run all tests
npm test

# Test specific suites
npm test -- pages.test.ts
npm test -- components.test.ts
npm test -- accessibility.test.ts
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

**Development phases:** See [DevelopmentGuide.md](DevelopmentGuide.md)

## 📄 License

This project is licensed under the MIT License. See the LICENSE file for more details.

## 🔗 Links

- **Live Site:** https://nawabjaffer.github.io/skytech-aviation-website/
- **Documentation:** [docs/](docs/)
- **Deployment Scripts:** [scripts/](scripts/)

---

**Built with ❤️ for SKYTECH AVIATION**