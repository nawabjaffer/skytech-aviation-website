import React from 'react';
import { useTranslation } from 'react-i18next';
import SEOHead from '../components/SEOHead';
import HeroCarousel from '../components/HeroCarousel';
import FeaturesSection from '../components/FeaturesSection';
import TrackRecordsSection from '../components/TrackRecordsSection';
import TestimonialsCarousel from '../components/TestimonialsCarousel';
import LatestProductsSection from '../components/LatestProductsSection';
import CTASection from '../components/CTASection';

const Home: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      {/* SEO Meta Tags */}
      <SEOHead
        page="home"
        breadcrumbs={[
          { name: 'Home', url: '/' }
        ]}
      />

      {/* Hero Carousel - Full-screen with Google Sheets integration */}
      {/* Auto-advance timing configured in src/config/googleSheets.ts (CAROUSEL_TIMING) */}
      <HeroCarousel />

      {/* Features Section - Why Choose Skytech Aviation */}
      <FeaturesSection />

      {/* Track Records Section - Our Success Story */}
      <TrackRecordsSection />

      {/* Testimonials Carousel - Customer reviews */}
      <TestimonialsCarousel />

      {/* Latest Products Showcase */}
      <LatestProductsSection />

      {/* Call-to-Action Section */}
      <CTASection />
    </>
  );
};

export default Home;