import React, { useEffect, useState } from 'react';
import { Plane, Settings } from 'lucide-react';
import '../styles/loading-animation.css';

interface LoadingAnimationProps {
  onComplete: () => void;
  minDuration?: number; // Minimum duration in milliseconds
}

/**
 * Premium Aviation-Themed Loading Animation
 * 
 * Animation Phases:
 * 1. Initial State (0-1s): Rotating gear in center, planes in corners
 * 2. Flight Approach (1-3s): Planes follow curved paths toward center
 * 3. Gear Opening (3-4s): Gear expands, planes descend to bottom corners
 * 4. Final Convergence (4-5s): Zoom transition to page content
 * 
 * Performance: 60 FPS, GPU-accelerated, < 5KB impact
 */
const LoadingAnimation: React.FC<LoadingAnimationProps> = ({ 
  onComplete, 
  minDuration = 5000 
}) => {
  const [phase, setPhase] = useState<1 | 2 | 3 | 4>(1);
  const [canSkip, setCanSkip] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Phase transitions - continuous flow without pauses
    const timers: NodeJS.Timeout[] = [];

    // Phase 1: Initial state (gear spinning, planes at bottom)
    // Immediately start Phase 2 (no delay)
    timers.push(setTimeout(() => setPhase(2), 100));

    // Phase 2 → 3: Planes reach center (after 3 seconds of flight)
    timers.push(setTimeout(() => setPhase(3), 3100));

    // Phase 3 → 4: Gear opens and circular mask starts (after 1 second)
    timers.push(setTimeout(() => setPhase(4), 4100));

    // Enable skip button after 2 seconds
    timers.push(setTimeout(() => setCanSkip(true), 2000));

    // Complete animation after minDuration - remove loading screen completely
    timers.push(setTimeout(() => {
      setIsExiting(true);
      setTimeout(onComplete, 100); // Remove immediately after mask completes
    }, minDuration));

    return () => timers.forEach(clearTimeout);
  }, [minDuration, onComplete]);

  // Handle keyboard skip
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (canSkip && (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape')) {
        setIsExiting(true);
        setTimeout(onComplete, 800);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [canSkip, onComplete]);

  return (
    <div 
      className={`loading-animation-container phase-${phase} ${isExiting ? 'exiting' : ''}`}
      role="progressbar"
      aria-label="Loading Skytech Aviation website"
      aria-live="polite"
    >
      {/* Background with gradient and particles */}
      <div className="loading-background">
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
        <div className="particle particle-4"></div>
        <div className="particle particle-5"></div>
        <div className="particle particle-6"></div>
      </div>

      {/* Main animation container */}
      <div className="loading-content">
        
        {/* Bézier Path Lines that planes follow */}
        <svg className="bezier-path" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Left plane path: from bottom-left (10,90) through control (30,65) to center (50,50) */}
          <path
            d="M 10,90 Q 30,65 50,50"
            className="path-line path-left"
          />
          {/* Right plane path: from bottom-right (90,90) through control (70,65) to center (50,50) */}
          <path
            d="M 90,90 Q 70,65 50,50"
            className="path-line path-right"
          />
        </svg>

        {/* Left Airplane */}
        <div className={`airplane airplane-left phase-${phase}`}>
          <Plane 
            size={40} 
            strokeWidth={1.5}
            className="plane-icon"
          />
        </div>

        {/* Right Airplane */}
        <div className={`airplane airplane-right phase-${phase}`}>
          <Plane 
            size={40} 
            strokeWidth={1.5}
            className="plane-icon"
          />
        </div>

        {/* Center Gear */}
        <div className={`gear-container phase-${phase}`}>
          {/* Outer glow ring */}
          <div className="gear-glow"></div>
          
          {/* Progress ring (optional) */}
          <svg className="progress-ring" viewBox="0 0 120 120">
            <circle
              className="progress-ring-circle"
              cx="60"
              cy="60"
              r="54"
              fill="none"
              strokeWidth="2"
            />
          </svg>

          {/* Main gear icon */}
          <Settings 
            size={80} 
            strokeWidth={1.5}
            className={`gear-icon ${phase >= 3 ? 'opening' : ''}`}
          />

          {/* Center portal/hole that expands */}
          {phase >= 4 && (
            <div className="center-portal">
              <div className="portal-inner"></div>
            </div>
          )}

          {/* Expanding petals for gear opening effect */}
          {phase >= 3 && (
            <>
              <div className="gear-petal petal-1"></div>
              <div className="gear-petal petal-2"></div>
              <div className="gear-petal petal-3"></div>
              <div className="gear-petal petal-4"></div>
              <div className="gear-petal petal-5"></div>
              <div className="gear-petal petal-6"></div>
              <div className="gear-petal petal-7"></div>
              <div className="gear-petal petal-8"></div>
            </>
          )}
        </div>

        {/* Loading text */}
        <div className="loading-text">
          <span className="loading-label">Loading</span>
          <span className="loading-dots">
            <span className="dot dot-1">.</span>
            <span className="dot dot-2">.</span>
            <span className="dot dot-3">.</span>
          </span>
        </div>

        {/* Company name */}
        <div className="loading-brand">SKYTECH AVIATION</div>

        {/* Skip button */}
        {canSkip && !isExiting && (
          <button 
            className="skip-button"
            onClick={() => {
              setIsExiting(true);
              setTimeout(onComplete, 800);
            }}
            aria-label="Skip loading animation"
          >
            Press any key to continue
          </button>
        )}
      </div>

      {/* Screen reader announcement */}
      <div className="sr-only" aria-live="polite">
        {phase === 1 && 'Loading Skytech Aviation website'}
        {phase === 2 && 'Loading in progress'}
        {phase === 3 && 'Almost ready'}
        {phase === 4 && 'Loading complete'}
      </div>
    </div>
  );
};

export default LoadingAnimation;
