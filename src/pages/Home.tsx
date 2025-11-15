import React from 'react';
import { useTranslation } from 'react-i18next';
import SEOHead from '../components/SEOHead';
import HeroCarousel from '../components/HeroCarousel';
import FeaturesSection from '../components/FeaturesSection';
import StatsSection from '../components/StatsSection';
import TestimonialsCarousel from '../components/TestimonialsCarousel';
import LatestProductsSection from '../components/LatestProductsSection';
import CTASection from '../components/CTASection';

const Home: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      {/* SEO Meta Tags */}
      <SEOHead
        title={t('home.title')}
        description={t('home.description')}
      />

      {/* Hero Carousel - Full-screen with Google Sheets integration */}
      <HeroCarousel autoPlayInterval={5000} />

      {/* Features Section - Why Choose Skytech Aviation */}
      <FeaturesSection />

      {/* Stats Counter - Animated on scroll */}
      <StatsSection />

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