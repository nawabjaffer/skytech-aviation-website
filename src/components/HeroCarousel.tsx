import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { HeroSlide, CAROUSEL_TIMING } from '../config/googleSheets';
import googleSheetsService from '../services/googleSheetsService';
import { videoPreloader } from '../utils/videoPreloader';

interface HeroCarouselProps {
  autoPlayInterval?: number; // milliseconds (deprecated - use CAROUSEL_TIMING config instead)
}

const HeroCarousel: React.FC<HeroCarouselProps> = ({ autoPlayInterval }) => {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [videosLoaded, setVideosLoaded] = useState<Set<number>>(new Set());
  const [firstVideoReady, setFirstVideoReady] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState<Set<number>>(new Set());
  const [failedMedia, setFailedMedia] = useState<Set<number>>(new Set());
  const [placeholderMinTimeReached, setPlaceholderMinTimeReached] = useState(false);
  const videoRefs = useRef<Map<number, HTMLVideoElement>>(new Map());
  
  // Placeholder images to show immediately (no gray screen)
  const placeholderImages = [
    '/hero-section/SKYTECH1.jpeg.png',
    '/hero-section/SKYTECH.jpeg'
  ];
  const [currentPlaceholder, setCurrentPlaceholder] = useState(0);
  
  // Keep placeholders visible for at least 5 seconds
  useEffect(() => {
    const minTimer = setTimeout(() => {
      setPlaceholderMinTimeReached(true);
    }, 5000); // 5 seconds minimum
    return () => clearTimeout(minTimer);
  }, []);
  
  // Cycle through placeholder images while loading
  useEffect(() => {
    if (loading === false && placeholderMinTimeReached) return;
    const interval = setInterval(() => {
      setCurrentPlaceholder(prev => (prev + 1) % placeholderImages.length);
    }, 3000); // Change every 3 seconds
    return () => clearInterval(interval);
  }, [loading, placeholderMinTimeReached]);
  
  // Static fallback to show instantly while loading (eliminates gray flash)
  const fallbackSlide: HeroSlide = {
    id: 'fallback',
    title: 'Skytech Aviation',
    subtitle: 'Authorized Civil Aircraft Parts Supplier',
    description: 'ASA Member - Trusted by airlines and distributors worldwide',
    mediaType: 'image',
    mediaUrl: placeholderImages[currentPlaceholder],
    active: true,
    ctaText1: 'View Products',
    ctaLink1: '/products',
    ctaText2: 'Contact Us',
    ctaLink2: '/contacts'
  };

  // Get the current slide's auto-advance interval based on media type
  const getCurrentSlideInterval = useCallback(() => {
    if (slides.length === 0) return CAROUSEL_TIMING.imageSlideInterval;
    const currentSlide = slides[currentIndex];
    return currentSlide.mediaType === 'video' 
      ? CAROUSEL_TIMING.videoSlideInterval 
      : CAROUSEL_TIMING.imageSlideInterval;
  }, [slides, currentIndex]);

  // Fetch slides from Google Sheets
  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const data = await googleSheetsService.getHeroSlides();
        
        if (data.length > 0) {
          setSlides(data);
          
          // Check if videos were already preloaded during loading screen
          data.forEach((slide, index) => {
            if (slide.mediaType === 'video' && videoPreloader.isPreloaded(slide.mediaUrl)) {
              setVideosLoaded(prev => new Set(prev).add(index));
              if (index === 0) {
                setFirstVideoReady(true);
              }
            }
          });
          
          // Preload first video if not already preloaded
          if (data[0].mediaType === 'video') {
            if (videoPreloader.isPreloaded(data[0].mediaUrl)) {
              // Already preloaded during loading screen
              setVideosLoaded(prev => new Set(prev).add(0));
              setFirstVideoReady(true);
              setLoading(false);
            } else {
              // Fallback: preload now if not done during loading
              const firstVideo = document.createElement('video');
              firstVideo.src = data[0].mediaUrl;
              firstVideo.preload = 'auto';
              firstVideo.muted = true;
              firstVideo.playsInline = true;
              
              // Optimize for mobile
              firstVideo.setAttribute('webkit-playsinline', 'true');
              firstVideo.setAttribute('x5-playsinline', 'true'); // WeChat browser
              
              firstVideo.load();
              
              // Use canplaythrough for smoother mobile playback
              const handleReady = () => {
                setVideosLoaded(prev => new Set(prev).add(0));
                setFirstVideoReady(true);
                setLoading(false);
              };
              
              firstVideo.addEventListener('canplaythrough', handleReady, { once: true });
              firstVideo.addEventListener('canplay', handleReady, { once: true });
              
              // Fallback: show after 5s minimum or when video is ready, whichever is later
              setTimeout(() => {
                setLoading(false);
              }, 5000); // Increased to 5 seconds for placeholder visibility
            }
          } else {
            // For images, no wait needed
            setLoading(false);
          }
        } else {
          setLoading(false);
        }
      } catch {
        setLoading(false);
      }
    };

    fetchSlides();
  }, []);

  const nextSlide = useCallback(() => {
    setIsTransitioning(true);
    const nextIndex = (currentIndex + 1) % slides.length;
    
    // Preload next video before transition
    if (slides[nextIndex]?.mediaType === 'video' && !videosLoaded.has(nextIndex)) {
      const videoEl = videoRefs.current.get(nextIndex);
      if (videoEl) {
        videoEl.load();
      }
    }
    
    setTimeout(() => {
      setCurrentIndex(nextIndex);
      setIsTransitioning(false);
      
      // Auto-play video when it becomes active
      const videoEl = videoRefs.current.get(nextIndex);
      if (videoEl && slides[nextIndex]?.mediaType === 'video') {
        // Better mobile video handling
        videoEl.currentTime = 0; // Reset to start for smooth playback
        const playPromise = videoEl.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // Silently handle autoplay prevention
          });
        }
      }
    }, CAROUSEL_TIMING.transitionDuration);
  }, [slides, currentIndex, videosLoaded]);

  const prevSlide = useCallback(() => {
    setIsTransitioning(true);
    const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
    
    // Preload previous video before transition
    if (slides[prevIndex]?.mediaType === 'video' && !videosLoaded.has(prevIndex)) {
      const videoEl = videoRefs.current.get(prevIndex);
      if (videoEl) {
        videoEl.load();
      }
    }
    
    setTimeout(() => {
      setCurrentIndex(prevIndex);
      setIsTransitioning(false);
      
      // Auto-play video when it becomes active
      const videoEl = videoRefs.current.get(prevIndex);
      if (videoEl && slides[prevIndex]?.mediaType === 'video') {
        // Better mobile video handling
        videoEl.currentTime = 0; // Reset to start for smooth playback
        const playPromise = videoEl.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // Silently handle autoplay prevention
          });
        }
      }
    }, CAROUSEL_TIMING.transitionDuration);
  }, [slides, currentIndex, videosLoaded]);

  const goToSlide = (index: number) => {
    if (index === currentIndex) return;
    
    // Preload target video before transition
    if (slides[index]?.mediaType === 'video' && !videosLoaded.has(index)) {
      const videoEl = videoRefs.current.get(index);
      if (videoEl) {
        videoEl.load();
      }
    }
    
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsTransitioning(false);
      
      // Auto-play video when it becomes active
      const videoEl = videoRefs.current.get(index);
      if (videoEl && slides[index]?.mediaType === 'video') {
        // Better mobile video handling
        videoEl.currentTime = 0; // Reset to start for smooth playback
        const playPromise = videoEl.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // Silently handle autoplay prevention
          });
        }
      }
    }, CAROUSEL_TIMING.transitionDuration);
  };

  // Auto-advance slides with different timing for videos and images
  useEffect(() => {
    if (slides.length <= 1) return;

    // Only auto-advance if current video is loaded or it's an image
    const currentSlide = slides[currentIndex];
    if (currentSlide?.mediaType === 'video' && !videosLoaded.has(currentIndex)) {
      return; // Wait for video to load before auto-advancing
    }

    const interval = setInterval(() => {
      nextSlide();
    }, getCurrentSlideInterval());

    return () => clearInterval(interval);
  }, [currentIndex, slides, getCurrentSlideInterval, nextSlide, videosLoaded]);
  
  // Preload adjacent videos for smooth transitions
  useEffect(() => {
    if (slides.length === 0) return;
    
    const preloadAdjacentVideos = () => {
      const nextIndex = (currentIndex + 1) % slides.length;
      const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
      
      [nextIndex, prevIndex].forEach(index => {
        const slide = slides[index];
        if (slide?.mediaType === 'video' && !videosLoaded.has(index)) {
          const videoEl = videoRefs.current.get(index);
          if (videoEl) {
            videoEl.preload = 'auto';
            videoEl.load();
          }
        }
      });
    };
    
    preloadAdjacentVideos();
  }, [currentIndex, slides, videosLoaded]);

  if (loading) {
    // Show placeholder images immediately with smooth fade animation
    // Keep showing for at least 5 seconds even if content is ready
    return (
      <div className="relative w-full h-screen overflow-hidden">
        {/* Show actual placeholder images with crossfade */}
        {placeholderImages.map((imgSrc, idx) => (
          <img
            key={imgSrc}
            src={imgSrc}
            alt="Skytech Aviation"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              idx === currentPlaceholder ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              willChange: idx === currentPlaceholder ? 'opacity' : 'auto',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden'
            }}
            loading="eager"
          />
        ))}
        
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-50 z-20"></div>
        
        {/* Show content on placeholder */}
        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight animate-fade-in">
                Skytech Aviation
              </h1>
              <h2 className="text-xl sm:text-2xl md:text-3xl text-blue-100 mb-6 font-light animate-fade-in animation-delay-200">
                Authorized Civil Aircraft Parts Supplier
              </h2>
              <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl leading-relaxed animate-fade-in animation-delay-400">
                ASA Member - Trusted by airlines and distributors worldwide
              </p>
            </div>
          </div>
        </div>
        
        {/* Subtle loading indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30">
          <div className="flex gap-2">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-white rounded-full animate-pulse animation-delay-200"></div>
            <div className="w-2 h-2 bg-white rounded-full animate-pulse animation-delay-400"></div>
          </div>
        </div>
      </div>
    );
  }

  if (slides.length === 0 && !loading) {
    return null;
  }

  // Use fallback slide while loading, then switch to actual slides
  const displaySlides = loading || slides.length === 0 ? [fallbackSlide] : slides;
  const currentSlide = displaySlides[currentIndex];

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Media - Render all videos hidden for preloading */}
      <div className="absolute inset-0 z-0">
        {displaySlides.map((slide, index) => {
          const isActive = index === currentIndex;
          const mediaFailed = failedMedia.has(index);
          
          // If media failed, show placeholder/fallback image instead
          if (mediaFailed || slide.mediaType === 'image') {
            return (
              <img
                key={slide.id}
                src={mediaFailed ? placeholderImages[0] : slide.mediaUrl}
                alt={slide.title}
                loading={index === 0 ? 'eager' : 'lazy'}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                  isActive && !isTransitioning ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
                style={{
                  willChange: isActive ? 'opacity' : 'auto',
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden'
                }}
                onLoad={() => {
                  setImagesLoaded(prev => new Set(prev).add(index));
                  if (index === 0 && placeholderMinTimeReached) {
                    setLoading(false);
                  }
                }}
                onError={() => {
                  // Fallback to placeholder image on load error
                  if (!failedMedia.has(index)) {
                    setFailedMedia(prev => new Set(prev).add(index));
                    console.warn(`Failed to load image at index ${index}, using fallback`);
                  }
                }}
              />
            );
          }
          
          // Video rendering with fallback support
          return (
            <video
              key={slide.id}
              ref={(el) => {
                if (el) videoRefs.current.set(index, el);
              }}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                isActive && !isTransitioning ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
              style={{
                willChange: isActive ? 'opacity' : 'auto',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden'
              }}
              autoPlay={isActive}
              muted
              loop
              playsInline
              webkit-playsinline="true"
              x5-playsinline="true"
              preload={index === 0 ? 'auto' : 'metadata'}
              poster={placeholderImages[index % placeholderImages.length]}
              onLoadedData={() => {
                setVideosLoaded(prev => new Set(prev).add(index));
                if (index === currentIndex) {
                  const videoEl = videoRefs.current.get(index);
                  if (videoEl) {
                    const playPromise = videoEl.play();
                    if (playPromise !== undefined) {
                      playPromise.catch(() => {
                        // Autoplay prevented
                      });
                    }
                  }
                }
              }}
              onCanPlayThrough={() => {
                if (index === currentIndex && placeholderMinTimeReached) {
                  setLoading(false);
                  setFirstVideoReady(true);
                }
              }}
              onCanPlay={() => {
                if (index === currentIndex && placeholderMinTimeReached) {
                  setLoading(false);
                  setFirstVideoReady(true);
                }
              }}
              onError={() => {
                // Mark video as failed and fallback to placeholder image
                setFailedMedia(prev => new Set(prev).add(index));
                console.warn(`Failed to load video at index ${index}, will show fallback image`);
              }}
            >
              <source src={slide.mediaUrl} type="video/mp4" />
            </video>
          );
        })}
        
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-50 z-20"></div>
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

      {/* Navigation Controls - Only show when not loading and multiple slides */}
      {!loading && displaySlides.length > 1 && (
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
