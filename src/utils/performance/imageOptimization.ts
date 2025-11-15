/**
 * Image Optimization Utilities
 * 
 * Helper functions for generating responsive images with WebP format
 * and srcSet for different screen sizes and pixel densities
 */

export interface ImageSize {
  width: number;
  height: number;
}

export interface ImageSrcSet {
  srcSet: string;
  sizes: string;
}

/**
 * Generate srcSet for responsive images
 * @param basePath - Base path to the image (without extension)
 * @param extension - Original image extension (jpg, png, etc.)
 * @param widths - Array of widths to generate
 * @returns srcSet string
 */
export const generateSrcSet = (
  basePath: string,
  extension: string = 'jpg',
  widths: number[] = [320, 640, 768, 1024, 1280, 1920]
): string => {
  return widths
    .map((width) => `${basePath}-${width}w.${extension} ${width}w`)
    .join(', ');
};

/**
 * Generate WebP srcSet with fallback
 * @param basePath - Base path to the image
 * @param originalExt - Original extension (jpg, png)
 * @param widths - Array of widths
 * @returns Object with webp and fallback srcSet
 */
export const generateWebPSrcSet = (
  basePath: string,
  originalExt: string = 'jpg',
  widths: number[] = [320, 640, 768, 1024, 1280, 1920]
): { webp: string; fallback: string } => {
  const webp = widths
    .map((width) => `${basePath}-${width}w.webp ${width}w`)
    .join(', ');
  
  const fallback = widths
    .map((width) => `${basePath}-${width}w.${originalExt} ${width}w`)
    .join(', ');

  return { webp, fallback };
};

/**
 * Generate sizes attribute for responsive images
 * @param breakpoints - Object with breakpoint definitions
 * @returns sizes string
 */
export const generateSizes = (
  breakpoints: { [key: string]: string } = {
    mobile: '100vw',
    tablet: '50vw',
    desktop: '33vw',
  }
): string => {
  const defaultSizes = [
    '(max-width: 640px) 100vw',
    '(max-width: 1024px) 50vw',
    '33vw',
  ];

  return defaultSizes.join(', ');
};

/**
 * Get optimized image props for a given image
 * @param imagePath - Original image path
 * @param alt - Alt text
 * @param options - Additional options
 * @returns Props object for LazyImage component
 */
export const getOptimizedImageProps = (
  imagePath: string,
  alt: string,
  options: {
    widths?: number[];
    sizes?: string;
    width?: number;
    height?: number;
  } = {}
) => {
  // Extract base path and extension
  const lastDotIndex = imagePath.lastIndexOf('.');
  const basePath = imagePath.substring(0, lastDotIndex);
  const extension = imagePath.substring(lastDotIndex + 1);

  const { webp, fallback } = generateWebPSrcSet(
    basePath,
    extension,
    options.widths
  );

  return {
    src: `${basePath}.${extension}`,
    srcSet: webp || fallback,
    sizes: options.sizes || generateSizes(),
    alt,
    width: options.width,
    height: options.height,
  };
};

/**
 * Calculate aspect ratio to prevent layout shift (CLS)
 * @param width - Image width
 * @param height - Image height
 * @returns Padding bottom percentage for aspect ratio box
 */
export const calculateAspectRatio = (width: number, height: number): string => {
  return `${(height / width) * 100}%`;
};

/**
 * Common image sizes for aircraft/aviation images
 */
export const AVIATION_IMAGE_SIZES = {
  hero: { width: 1920, height: 1080 }, // 16:9
  productCard: { width: 600, height: 400 }, // 3:2
  thumbnail: { width: 300, height: 200 }, // 3:2
  banner: { width: 1200, height: 400 }, // 3:1
  square: { width: 800, height: 800 }, // 1:1
};

/**
 * Responsive breakpoints matching TailwindCSS
 */
export const RESPONSIVE_BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};
