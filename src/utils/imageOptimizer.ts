/**
 * Image Optimizer Utility
 * Handles responsive image loading and fallback strategies
 */

export interface ImageOptimizationConfig {
  primaryUrl: string;
  fallbackUrls: string[];
  timeout?: number; // milliseconds before trying fallback
  onError?: (error: Error) => void;
  onSuccess?: (url: string) => void;
}

/**
 * Attempt to load an image with fallback strategy
 * Returns the successfully loaded image URL
 */
export const loadImageWithFallback = (
  config: ImageOptimizationConfig
): Promise<string> => {
  const { primaryUrl, fallbackUrls, timeout = 5000, onError, onSuccess } = config;

  return new Promise((resolve) => {
    const allUrls = [primaryUrl, ...fallbackUrls];
    let currentIndex = 0;

    const tryLoadImage = (url: string, index: number) => {
      const img = new Image();
      
      const timeoutId = setTimeout(() => {
        console.warn(`Image load timeout for ${url}, trying fallback`);
        if (index < allUrls.length - 1) {
          tryLoadImage(allUrls[index + 1], index + 1);
        } else {
          const error = new Error(`All image URLs failed to load: ${allUrls.join(', ')}`);
          onError?.(error);
          resolve(fallbackUrls[0] || primaryUrl); // Return fallback even if not loaded
        }
      }, timeout);

      img.onload = () => {
        clearTimeout(timeoutId);
        onSuccess?.(url);
        resolve(url);
      };

      img.onerror = () => {
        clearTimeout(timeoutId);
        console.warn(`Failed to load image: ${url}`);
        if (index < allUrls.length - 1) {
          tryLoadImage(allUrls[index + 1], index + 1);
        } else {
          const error = new Error(`All image URLs failed to load: ${allUrls.join(', ')}`);
          onError?.(error);
          resolve(fallbackUrls[0] || primaryUrl); // Return fallback even if not loaded
        }
      };

      img.src = url;
    };

    tryLoadImage(primaryUrl, 0);
  });
};

/**
 * Preload multiple images for smoother carousel transitions
 */
export const preloadImages = (urls: string[]): Promise<void> => {
  const preloadPromises = urls.map(
    (url) =>
      new Promise<void>((resolve) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = () => resolve(); // Continue even if one fails
        img.src = url;
      })
  );

  return Promise.all(preloadPromises).then(() => undefined);
};

/**
 * Get responsive image URL based on device pixel ratio and viewport width
 */
export const getResponsiveImageUrl = (baseUrl: string): string => {
  // For now, just return the base URL
  // In the future, this could handle srcset variants
  return baseUrl;
};

/**
 * Check if an image is available/accessible
 */
export const isImageAvailable = (url: string): Promise<boolean> => {
  return new Promise((resolve) => {
    const img = new Image();
    const timeout = setTimeout(() => resolve(false), 3000);
    
    img.onload = () => {
      clearTimeout(timeout);
      resolve(true);
    };
    
    img.onerror = () => {
      clearTimeout(timeout);
      resolve(false);
    };
    
    img.src = url;
  });
};
