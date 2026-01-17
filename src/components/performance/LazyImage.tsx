import React, { useEffect, useRef, useState } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  srcSet?: string;
  sizes?: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
  onLoad?: () => void;
  onError?: () => void;
  placeholder?: string;
}

/**
 * LazyImage Component
 * 
 * Implements progressive image loading with Intersection Observer
 * - Only loads images when they enter the viewport
 * - Supports responsive images with srcSet
 * - Shows placeholder until image loads
 * - Optimizes Core Web Vitals (LCP, CLS)
 */
const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className = '',
  srcSet,
  sizes,
  width,
  height,
  loading = 'lazy',
  onLoad,
  onError,
  placeholder = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23f0f0f0" width="400" height="300"/%3E%3C/svg%3E',
}) => {
  const [imageSrc, setImageSrc] = useState<string>(placeholder);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // If browser doesn't support IntersectionObserver, load image immediately
    if (!('IntersectionObserver' in window)) {
      setImageSrc(src);
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            setImageSrc(src);
            if (imgRef.current) {
              observer.unobserve(imgRef.current);
            }
          }
        });
      },
      {
        rootMargin: '50px', // Start loading 50px before entering viewport
        threshold: 0.01,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, [src]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    onError?.();
  };

  return (
    <img
      ref={imgRef}
      src={imageSrc}
      alt={alt}
      className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
      srcSet={isInView ? srcSet : undefined}
      sizes={sizes}
      width={width}
      height={height}
      loading={loading}
      onLoad={handleLoad}
      onError={handleError}
      decoding="async"
      style={{
        width: width ? `${width}px` : undefined,
        height: height ? `${height}px` : undefined,
      }}
    />
  );
};

export default LazyImage;
