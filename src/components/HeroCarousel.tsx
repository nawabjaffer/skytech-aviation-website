import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { HeroSlide } from '../config/googleSheets';
import googleSheetsService from '../services/googleSheetsService';

interface HeroCarouselProps {
  autoPlayInterval?: number; // milliseconds
}

const HeroCarousel: React.FC<HeroCarouselProps> = ({ autoPlayInterval = 5000 }) => {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Fetch slides from Google Sheets
  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const data = await googleSheetsService.getHeroSlides();
        setSlides(data);
      } catch (error) {
        console.error('Error loading hero slides:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSlides();
  }, []);

  // Auto-advance slides
  useEffect(() => {
    if (slides.length <= 1) return;

    const interval = setInterval(() => {
      nextSlide();
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [currentIndex, slides.length, autoPlayInterval]);

  const nextSlide = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
      setIsTransitioning(false);
    }, 300);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
      setIsTransitioning(false);
    }, 300);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    if (index === currentIndex) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsTransitioning(false);
    }, 300);
  };

  if (loading) {
    return (
      <div className="relative w-full h-screen bg-gradient-to-br from-blue-900 to-blue-700 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-white mx-auto mb-4"></div>
          <p className="text-xl">Loading...</p>
        </div>
      </div>
    );
  }

  if (slides.length === 0) {
    return null;
  }

  const currentSlide = slides[currentIndex];

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Media */}
      <div className="absolute inset-0 z-0">
        {currentSlide.mediaType === 'video' ? (
          <video
            key={currentSlide.id}
            className={`w-full h-full object-cover transition-opacity duration-700 ${
              isTransitioning ? 'opacity-0' : 'opacity-100'
            }`}
            autoPlay
            muted
            loop
            playsInline
          >
            <source src={currentSlide.mediaUrl} type="video/mp4" />
          </video>
        ) : (
          <img
            key={currentSlide.id}
            src={currentSlide.mediaUrl}
            alt={currentSlide.title}
            className={`w-full h-full object-cover transition-opacity duration-700 ${
              isTransitioning ? 'opacity-0' : 'opacity-100'
            }`}
          />
        )}
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            {/* Animated Content */}
            <div
              className={`transform transition-all duration-700 ${
                isTransitioning
                  ? 'translate-y-8 opacity-0'
                  : 'translate-y-0 opacity-100'
              }`}
            >
              {/* Trust Badge */}
              {currentSlide.trustBadge && (
                <div className="inline-block mb-4 px-4 py-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-full">
                  <span className="text-white text-sm font-semibold flex items-center">
                    <svg
                      className="w-5 h-5 mr-2 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {currentSlide.trustBadge}
                  </span>
                </div>
              )}

              {/* Title */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight">
                {currentSlide.title}
              </h1>

              {/* Subtitle */}
              {currentSlide.subtitle && (
                <h2 className="text-xl sm:text-2xl md:text-3xl text-blue-100 mb-6 font-light">
                  {currentSlide.subtitle}
                </h2>
              )}

              {/* Description */}
              {currentSlide.description && (
                <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl leading-relaxed">
                  {currentSlide.description}
                </p>
              )}

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                {currentSlide.ctaText1 && currentSlide.ctaLink1 && (
                  <Link
                    to={currentSlide.ctaLink1}
                    className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300"
                  >
                    {currentSlide.ctaText1}
                    <svg
                      className="w-5 h-5 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </Link>
                )}

                {currentSlide.ctaText2 && currentSlide.ctaLink2 && (
                  <Link
                    to={currentSlide.ctaLink2}
                    className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-blue-600 bg-white hover:bg-gray-100 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300"
                  >
                    {currentSlide.ctaText2}
                    <svg
                      className="w-5 h-5 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      {slides.length > 1 && (
        <>
          {/* Previous Button */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 group"
            aria-label="Previous slide"
          >
            <svg
              className="w-6 h-6 transform group-hover:-translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Next Button */}
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 group"
            aria-label="Next slide"
          >
            <svg
              className="w-6 h-6 transform group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-white w-8'
                    : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <svg
          className="w-8 h-8 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </div>
  );
};

export default HeroCarousel;
