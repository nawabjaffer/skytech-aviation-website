import React, { useEffect, useState, useRef } from 'react';
import { initVersionCheck } from '../utils/cacheManager';
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
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const completedRef = useRef(false);
  const exitStartedRef = useRef(false);

  // Cache version check during initial load
  useEffect(() => {
    const checkCache = async () => {
      try {
        const result = await initVersionCheck();
        if (result.updated) {
          console.log('✓ Cache cleared - fresh content loaded');
        }
      } catch (error) {
        console.error('Cache check failed:', error);
      }
    };
    checkCache();
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

    // Mobile autoplay hardening (iOS Safari is picky about *attributes* existing)
    // Keep the video muted and inline so autoplay is allowed without user gesture.
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');
    video.setAttribute('autoplay', '');

    // Make playback feel more cinematic/slow
    video.defaultPlaybackRate = 0.9;
    video.playbackRate = 0.9;

    const tryPlay = () => {
      if (completedRef.current) return;
      // Re-assert muted before play attempts (some browsers can reset it)
      video.muted = true;
      video.defaultMuted = true;
      video.play().catch(() => {
        // On some mobile browsers, play() can still be blocked until user gesture.
        // We'll keep the intro smooth via the time-driven progress regardless.
      });
    };

    const handleLoadedMetadata = () => {
      setVideoLoaded(true);
      tryPlay();
    };

    const handleCanPlay = () => {
      tryPlay();
    };

    const handleVisibility = () => {
      // If the tab becomes visible again, try to resume.
      if (document.visibilityState === 'visible') {
        tryPlay();
      }
    };

    // Watchdog: if video pauses/stalls mid-intro, attempt resume periodically.
    const resumeInterval = setInterval(() => {
      if (completedRef.current) return;
      if (videoLoaded && video.paused && document.visibilityState === 'visible') {
        tryPlay();
      }
    }, 500);

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('canplay', handleCanPlay);
    document.addEventListener('visibilitychange', handleVisibility);
    tryPlay();

    return () => {
      clearInterval(resumeInterval);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('canplay', handleCanPlay);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [videoLoaded]);

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
        preload="auto"
        controls={false}
        disablePictureInPicture
        controlsList="nodownload noplaybackrate noremoteplayback"
        aria-hidden="true"
        tabIndex={-1}
      >
        <source src={videoSrc} type="video/mp4" />
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
          Skip Intro
        </button>
      )}
    </div>
  );
};

export default VideoLoadingScreen;
