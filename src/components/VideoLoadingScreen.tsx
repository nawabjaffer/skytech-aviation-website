import React, { useEffect, useState, useRef } from 'react';
import { initVersionCheck } from '../utils/cacheManager';
import { preloadHeroVideos } from '../utils/videoPreloader';
import '../styles/video-loading.css';

interface VideoLoadingScreenProps {
  onComplete: () => void;
  videoSrc?: string;
}

/**
 * Premium Video Loading Screen
 * 
 * Features:
 * - Full-screen video background
 * - Loading percentage based on video playback progress
 * - Smooth cinematic transitions
 * - 8-second video duration with progress tracking
 * - GPU-accelerated animations
 * - Preloads hero carousel videos for instant playback after loading
 */
const VideoLoadingScreen: React.FC<VideoLoadingScreenProps> = ({ 
  onComplete,
  videoSrc = '/skytech-loading.mp4'
}) => {
  const INTRO_DURATION_MS = 8000;
  const EXIT_ANIMATION_MS = 800;
  const EXIT_START_MS = INTRO_DURATION_MS - EXIT_ANIMATION_MS;

  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const completedRef = useRef(false);
  const exitStartedRef = useRef(false);
  const videoReadyRef = useRef(false);

  // Cache version check and video preloading during initial load
  useEffect(() => {
    const initializeResources = async () => {
      try {
        // Start cache check and video preloading in parallel
        await Promise.all([
          initVersionCheck(),
          preloadHeroVideos() // Preload hero videos during loading screen
        ]);
      } catch {
        // Silently handle initialization errors
      }
    };
    initializeResources();
  }, []);

  // Drive progress by time so it stays smooth even if video stalls.
  useEffect(() => {
    startTimeRef.current = performance.now();
    completedRef.current = false;
    exitStartedRef.current = false;

    const tick = (now: number) => {
      if (completedRef.current) return;

      const start = startTimeRef.current ?? now;
      const elapsed = Math.max(0, now - start);

      const nextProgress = Math.min(100, Math.round((elapsed / INTRO_DURATION_MS) * 100));
      setProgress(prev => (nextProgress > prev ? nextProgress : prev));

      if (!exitStartedRef.current && elapsed >= EXIT_START_MS) {
        exitStartedRef.current = true;
        setIsExiting(true);
      }

      if (elapsed >= INTRO_DURATION_MS) {
        completedRef.current = true;
        setProgress(100);
        onComplete();
        return;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [onComplete]);

  // Handle video playback (independent from progress)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    videoReadyRef.current = false;

    // Mobile autoplay hardening (Safari is picky about *attribute state at load*)
    // Important: set muted/playsInline BEFORE assigning src + calling load().
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');
    // iOS Safari still relies on the prefixed attribute in some cases
    video.setAttribute('webkit-playsinline', '');
    video.setAttribute('autoplay', '');
    video.setAttribute('loop', '');
    video.preload = 'auto';

    // Assign source after autoplay-related attributes are in place.
    // This avoids Safari deciding autoplay eligibility too early.
    if (video.getAttribute('src') !== videoSrc) {
      video.setAttribute('src', videoSrc);
      try {
        video.load();
      } catch {
        // ignore
      }
    }

    // Make playback feel more cinematic/slow
    video.defaultPlaybackRate = 0.9;
    video.playbackRate = 0.9;

    const tryPlay = async () => {
      if (completedRef.current) return;
      // Re-assert muted before play attempts (some browsers can reset it)
      video.muted = true;
      video.defaultMuted = true;
      video.volume = 0;

      try {
        await video.play();
      } catch {
        // Some Safari/device settings may block autoplay even when muted.
        // We keep the intro smooth via time-driven progress regardless.
      }
    };

    const handleLoadedMetadata = () => {
      requestAnimationFrame(() => {
        void tryPlay();
      });
    };

    const handleLoadedData = () => {
      requestAnimationFrame(() => {
        void tryPlay();
      });
    };

    const handleCanPlay = () => {
      videoReadyRef.current = true;
      void tryPlay();
    };

    const handleCanPlayThrough = () => {
      videoReadyRef.current = true;
      void tryPlay();
    };

    const handleVisibility = () => {
      // If the tab becomes visible again, try to resume.
      if (document.visibilityState === 'visible') {
        void tryPlay();
      }
    };

    // Watchdog: if video pauses/stalls mid-intro, attempt resume periodically.
    const resumeInterval = setInterval(() => {
      if (completedRef.current) return;
      const ready = videoReadyRef.current || video.readyState >= 2;
      if (ready && video.paused && document.visibilityState === 'visible') {
        void tryPlay();
      }
    }, 500);

    // If autoplay is blocked until the first user gesture, resume ASAP on that gesture.
    const resumeOnGesture = () => {
      void tryPlay();
    };
    window.addEventListener('pointerdown', resumeOnGesture, { once: true, passive: true });
    window.addEventListener('touchstart', resumeOnGesture, { once: true, passive: true });

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('canplaythrough', handleCanPlayThrough);
    document.addEventListener('visibilitychange', handleVisibility);
    // Kick an immediate attempt; many browsers will ignore until ready.
    requestAnimationFrame(() => {
      void tryPlay();
    });

    return () => {
      clearInterval(resumeInterval);
      window.removeEventListener('pointerdown', resumeOnGesture);
      window.removeEventListener('touchstart', resumeOnGesture);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('canplaythrough', handleCanPlayThrough);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [videoSrc]);

  return (
    <div 
      className={`video-loading-container ${isExiting ? 'exiting' : ''}`}
      role="progressbar"
      aria-label="Loading Skytech Aviation website"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      {/* Video Background */}
      <video
        ref={videoRef}
        className="loading-video"
        autoPlay
        muted
        playsInline
        loop
        preload="auto"
        controls={false}
        disablePictureInPicture
        controlsList="nodownload noplaybackrate noremoteplayback"
        aria-hidden="true"
        tabIndex={-1}
      >
        {/* Source is assigned via JS to ensure Safari autoplay works reliably */}
      </video>

      {/* Gradient Overlay */}
      <div className="video-overlay" />

      {/* Loading Progress UI */}
      <div className="loading-ui">
        {/* Progress Ring */}
        <div className="progress-ring-container">
          <svg className="progress-ring" viewBox="0 0 100 100">
            {/* Background Ring */}
            <circle
              className="progress-ring-bg"
              cx="50"
              cy="50"
              r="45"
              fill="none"
              strokeWidth="2"
            />
            {/* Progress Ring */}
            <circle
              className="progress-ring-fill"
              cx="50"
              cy="50"
              r="45"
              fill="none"
              strokeWidth="3"
              strokeLinecap="round"
              style={{
                strokeDasharray: `${2 * Math.PI * 45}`,
                strokeDashoffset: `${2 * Math.PI * 45 * (1 - progress / 100)}`
              }}
            />
          </svg>
          
          {/* Percentage Text */}
          <div className="progress-text">
            <span className="progress-number">{progress}</span>
            <span className="progress-percent">%</span>
          </div>
        </div>

        {/* Loading Text */}
        <div className="loading-text">
          <span className="loading-label">Loading</span>
          <span className="loading-dots">
            <span>.</span><span>.</span><span>.</span>
          </span>
        </div>
      </div>

      {/* Skip Hint - appears after 3 seconds */}
      {progress > 35 && !isExiting && (
        <button 
          className="skip-hint"
          onClick={() => {
            if (completedRef.current) return;
            completedRef.current = true;
            setIsExiting(true);
            onComplete();
          }}
        >
          X
        </button>
      )}
    </div>
  );
};

export default VideoLoadingScreen;
