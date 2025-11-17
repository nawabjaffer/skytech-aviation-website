import { useState, useEffect, useCallback } from 'react';

interface UseLoadingCompleteOptions {
  minDuration?: number; // Minimum loading duration in milliseconds
  autoStart?: boolean; // Auto-start loading on mount
}

interface UseLoadingCompleteReturn {
  isLoading: boolean;
  progress: number; // 0-100
  startLoading: () => void;
  completeLoading: () => void;
  setProgress: (progress: number) => void;
}

/**
 * Hook to manage loading state with minimum duration enforcement
 * 
 * Features:
 * - Ensures minimum display time (prevents flash for fast loads)
 * - Tracks loading progress
 * - Smooth transitions
 * - sessionStorage integration for first-time loading
 * 
 * @example
 * ```tsx
 * const { isLoading, progress, completeLoading } = useLoadingComplete({
 *   minDuration: 5000,
 *   autoStart: true
 * });
 * 
 * // When data is ready
 * useEffect(() => {
 *   if (dataLoaded) {
 *     completeLoading();
 *   }
 * }, [dataLoaded]);
 * ```
 */
export const useLoadingComplete = (
  options: UseLoadingCompleteOptions = {}
): UseLoadingCompleteReturn => {
  const { 
    minDuration = 5000, 
    autoStart = true 
  } = options;

  const [isLoading, setIsLoading] = useState(autoStart);
  const [progress, setProgress] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [canComplete, setCanComplete] = useState(false);

  // Start loading
  const startLoading = useCallback(() => {
    setIsLoading(true);
    setProgress(0);
    setStartTime(Date.now());
    setCanComplete(false);
  }, []);

  // Complete loading (with minimum duration check)
  const completeLoading = useCallback(() => {
    if (!startTime) {
      setIsLoading(false);
      return;
    }

    const elapsed = Date.now() - startTime;
    const remaining = Math.max(0, minDuration - elapsed);

    if (remaining > 0) {
      // Wait for minimum duration
      setTimeout(() => {
        setProgress(100);
        setTimeout(() => setIsLoading(false), 300); // Fade out delay
      }, remaining);
    } else {
      // Minimum duration already met
      setProgress(100);
      setTimeout(() => setIsLoading(false), 300);
    }
  }, [startTime, minDuration]);

  // Auto-progress simulation (optional - for smoother UX)
  useEffect(() => {
    if (!isLoading || !startTime) return;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const autoProgress = Math.min(90, (elapsed / minDuration) * 100);
      
      setProgress((prev) => {
        // Only auto-increment if not manually set higher
        if (autoProgress > prev) {
          return autoProgress;
        }
        return prev;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isLoading, startTime, minDuration]);

  // Enable completion after minimum duration
  useEffect(() => {
    if (!isLoading || !startTime) return;

    const timer = setTimeout(() => {
      setCanComplete(true);
    }, minDuration);

    return () => clearTimeout(timer);
  }, [isLoading, startTime, minDuration]);

  // Auto-start on mount
  useEffect(() => {
    if (autoStart) {
      startLoading();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    isLoading,
    progress,
    startLoading,
    completeLoading,
    setProgress,
  };
};

/**
 * Hook to check if this is the user's first visit
 * Uses sessionStorage to track within a browser session
 */
export const useFirstVisit = (): {
  isFirstVisit: boolean;
  markVisited: () => void;
} => {
  const STORAGE_KEY = 'skytech_visited';
  
  const [isFirstVisit, setIsFirstVisit] = useState(() => {
    if (typeof window === 'undefined') return true;
    return !sessionStorage.getItem(STORAGE_KEY);
  });

  const markVisited = useCallback(() => {
    sessionStorage.setItem(STORAGE_KEY, 'true');
    setIsFirstVisit(false);
  }, []);

  return { isFirstVisit, markVisited };
};

export default useLoadingComplete;
