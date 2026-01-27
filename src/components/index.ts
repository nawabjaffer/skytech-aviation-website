/**
 * Components Index
 * Central export point for all components
 */

// Layout components
export { default as Layout } from './Layout';
export { default as Navbar } from './Navbar';
export { default as Footer } from './Footer';

// UI components
export { default as HeroCarousel } from './HeroCarousel';
export { default as FeaturesSection } from './FeaturesSection';
export { default as StatsSection } from './StatsSection';
export { default as TrackRecordsSection } from './TrackRecordsSection';
export { default as TestimonialsCarousel } from './TestimonialsCarousel';
export { default as LatestProductsSection } from './LatestProductsSection';
export { default as CTASection } from './CTASection';

// Interactive components
export { default as ChatbotWidget } from './ChatbotWidget';
export { default as LanguageSelector } from './LanguageSelector';
export { default as DarkModeToggle } from './DarkModeToggle';
export { default as ScrollToTop } from './ScrollToTop';

// Document Viewer components
export { default as FlipbookViewer, FlipbookCard, FlipbookEmbed, FlipbookModal, DocumentViewer, FLIPBOOK_CONFIGS } from './FlipbookViewer';

// SEO components
export { default as SEOHead } from './SEOHead';

// Performance components
export * from './performance';