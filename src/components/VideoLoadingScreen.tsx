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
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

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

  // Handle video playback and progress
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedData = () => {
      setVideoLoaded(true);
      video.play().catch(err => {
        console.log('Video autoplay prevented:', err);
        // Fallback: complete loading after timeout if video can't play
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(onComplete, 800);
        }, 2000);
      });
    };

    const handleTimeUpdate = () => {
      if (video.duration) {
        const percentage = Math.round((video.currentTime / video.duration) * 100);
        setProgress(percentage);
      }
    };

    const handleEnded = () => {
      setProgress(100);
      setIsExiting(true);
      setTimeout(onComplete, 800);
    };

    // Fallback timer in case video doesn't load
    const fallbackTimer = setTimeout(() => {
      if (!videoLoaded) {
        setIsExiting(true);
        setTimeout(onComplete, 800);
      }
    }, 10000); // 10 second fallback

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);

    return () => {
      clearTimeout(fallbackTimer);
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
    };
  }, [onComplete, videoLoaded]);

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
        muted
        playsInline
        preload="auto"
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
            setIsExiting(true);
            setTimeout(onComplete, 800);
          }}
        >
          Skip Intro
        </button>
      )}
    </div>
  );
};

export default VideoLoadingScreen;
