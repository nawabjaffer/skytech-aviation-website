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

interface VideoEntry {
  video: HTMLVideoElement;
  cleanup: () => void;
}

class VideoPreloader {
  private preloadedVideos: Map<string, VideoEntry> = new Map();
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
      
      let resolved = false;
      let timeoutId: ReturnType<typeof setTimeout> | null = null;
      
      const handleSuccess = () => {
        if (resolved) return;
        resolved = true;
        if (timeoutId) clearTimeout(timeoutId);
        cleanup();
        this.preloadedVideos.set(url, { video, cleanup: () => this.cleanupVideo(url) });
        resolve({ url, loaded: true });
      };

      const handleError = () => {
        if (resolved) return;
        resolved = true;
        if (timeoutId) clearTimeout(timeoutId);
        cleanup();
        resolve({ url, loaded: false, error: 'Failed to load' });
      };
      
      const cleanup = () => {
        video.removeEventListener('canplaythrough', handleSuccess);
        video.removeEventListener('error', handleError);
      };

      video.addEventListener('canplaythrough', handleSuccess, { once: true });
      video.addEventListener('error', handleError, { once: true });
      
      // Fallback timeout - consider it loaded after 5 seconds even if not fully buffered
      timeoutId = setTimeout(() => {
        if (!resolved) {
          resolved = true;
          cleanup();
          this.preloadedVideos.set(url, { video, cleanup: () => this.cleanupVideo(url) });
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
      return [];
    }

    this.isPreloading = true;

    const results = await Promise.all(urls.map(url => this.preloadVideo(url)));
    
    this.isPreloading = false;
    
    return results;
  }

  /**
   * Get a preloaded video element (for reuse)
   */
  getPreloadedVideo(url: string): HTMLVideoElement | undefined {
    return this.preloadedVideos.get(url)?.video;
  }

  /**
   * Check if a video is preloaded
   */
  isPreloaded(url: string): boolean {
    return this.preloadedVideos.has(url);
  }
  
  /**
   * Clean up a single video to free memory
   */
  private cleanupVideo(url: string): void {
    const entry = this.preloadedVideos.get(url);
    if (entry) {
      entry.video.pause();
      entry.video.src = '';
      entry.video.load();
      this.preloadedVideos.delete(url);
      this.preloadPromises.delete(url);
    }
  }

  /**
   * Clear all preloaded videos (for memory management)
   */
  clear(): void {
    this.preloadedVideos.forEach((entry) => {
      entry.video.pause();
      entry.video.src = '';
      entry.video.load();
    });
    this.preloadedVideos.clear();
    this.preloadPromises.clear();
    this.isPreloading = false;
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
    }
  } catch {
    // Silently handle preload errors
  }
}

export default videoPreloader;
