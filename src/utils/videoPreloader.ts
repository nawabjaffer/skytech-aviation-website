/**
 * Video Preloader Utility
 * Preloads hero carousel videos during the initial loading screen
 * for instant playback when the site loads.
 */

interface PreloadResult {
  url: string;
  loaded: boolean;
  error?: string;
}

class VideoPreloader {
  private preloadedVideos: Map<string, HTMLVideoElement> = new Map();
  private preloadPromises: Map<string, Promise<PreloadResult>> = new Map();
  private isPreloading = false;

  /**
   * Preload a single video
   */
  preloadVideo(url: string): Promise<PreloadResult> {
    // Return cached promise if already preloading
    if (this.preloadPromises.has(url)) {
      return this.preloadPromises.get(url)!;
    }

    // Return immediately if already loaded
    if (this.preloadedVideos.has(url)) {
      return Promise.resolve({ url, loaded: true });
    }

    const promise = new Promise<PreloadResult>((resolve) => {
      const video = document.createElement('video');
      video.preload = 'auto';
      video.muted = true;
      video.playsInline = true;
      video.setAttribute('muted', '');
      video.setAttribute('playsinline', '');
      
      const handleSuccess = () => {
        this.preloadedVideos.set(url, video);
        console.log(`✓ Video preloaded: ${url.substring(0, 50)}...`);
        resolve({ url, loaded: true });
      };

      const handleError = (e: Event) => {
        console.warn(`✗ Failed to preload video: ${url}`, e);
        resolve({ url, loaded: false, error: 'Failed to load' });
      };

      video.addEventListener('canplaythrough', handleSuccess, { once: true });
      video.addEventListener('error', handleError, { once: true });
      
      // Fallback timeout - consider it loaded after 5 seconds even if not fully buffered
      setTimeout(() => {
        if (!this.preloadedVideos.has(url)) {
          this.preloadedVideos.set(url, video);
          console.log(`⏱ Video partially preloaded (timeout): ${url.substring(0, 50)}...`);
          resolve({ url, loaded: true });
        }
      }, 5000);

      video.src = url;
      video.load();
    });

    this.preloadPromises.set(url, promise);
    return promise;
  }

  /**
   * Preload multiple videos concurrently
   */
  async preloadVideos(urls: string[]): Promise<PreloadResult[]> {
    if (this.isPreloading) {
      console.log('Video preloading already in progress');
      return [];
    }

    this.isPreloading = true;
    console.log(`📹 Preloading ${urls.length} videos...`);

    const results = await Promise.all(urls.map(url => this.preloadVideo(url)));
    
    this.isPreloading = false;
    const successful = results.filter(r => r.loaded).length;
    console.log(`✓ Video preloading complete: ${successful}/${urls.length} loaded`);
    
    return results;
  }

  /**
   * Get a preloaded video element (for reuse)
   */
  getPreloadedVideo(url: string): HTMLVideoElement | undefined {
    return this.preloadedVideos.get(url);
  }

  /**
   * Check if a video is preloaded
   */
  isPreloaded(url: string): boolean {
    return this.preloadedVideos.has(url);
  }

  /**
   * Clear all preloaded videos (for memory management)
   */
  clear(): void {
    this.preloadedVideos.forEach(video => {
      video.src = '';
      video.load();
    });
    this.preloadedVideos.clear();
    this.preloadPromises.clear();
  }
}

// Singleton instance
export const videoPreloader = new VideoPreloader();

/**
 * Fetch hero slide video URLs from Google Sheets and preload them
 */
export async function preloadHeroVideos(): Promise<void> {
  try {
    // Dynamically import to avoid circular dependencies
    const googleSheetsService = (await import('../services/googleSheetsService')).default;
    const slides = await googleSheetsService.getHeroSlides();
    
    const videoUrls = slides
      .filter(slide => slide.mediaType === 'video' && slide.mediaUrl)
      .map(slide => slide.mediaUrl);

    if (videoUrls.length > 0) {
      await videoPreloader.preloadVideos(videoUrls);
    } else {
      console.log('No hero videos to preload');
    }
  } catch (error) {
    console.warn('Failed to preload hero videos:', error);
  }
}

export default videoPreloader;
