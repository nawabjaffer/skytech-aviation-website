import React from 'react';
import { Plane, Settings } from 'lucide-react';

/**
 * Enhanced Loading Fallback for Page Transitions
 * Shows a branded loading animation instead of blank screen
 */
const PageLoadingFallback: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-50 via-sky-50 to-blue-50 dark:from-gray-900 dark:via-slate-900 dark:to-gray-900">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-sky-400/20 dark:bg-sky-500/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Main loading content */}
      <div className="relative z-10 flex flex-col items-center gap-6">
        
        {/* Animated logo/icon group */}
        <div className="relative">
          {/* Rotating gear in center */}
          <div className="relative flex items-center justify-center">
            {/* Outer glow ring */}
            <div className="absolute w-28 h-28 bg-sky-500/20 dark:bg-sky-400/20 rounded-full animate-ping" 
                 style={{ animationDuration: '2s' }} />
            
            {/* Middle pulse ring */}
            <div className="absolute w-24 h-24 bg-gradient-to-r from-sky-400 to-blue-500 dark:from-sky-500 dark:to-blue-600 rounded-full opacity-30 animate-pulse"
                 style={{ animationDuration: '1.5s' }} />
            
            {/* Rotating gear */}
            <Settings 
              size={56}
              strokeWidth={1.5}
              className="text-sky-600 dark:text-sky-400 animate-spin-slow relative z-10"
            />
          </div>

          {/* Flying planes - left */}
          <div className="absolute -left-16 top-1/2 -translate-y-1/2 animate-fly-left">
            <Plane 
              size={28}
              strokeWidth={1.5}
              className="text-sky-500 dark:text-sky-400 rotate-45"
            />
          </div>

          {/* Flying planes - right */}
          <div className="absolute -right-16 top-1/2 -translate-y-1/2 animate-fly-right">
            <Plane 
              size={28}
              strokeWidth={1.5}
              className="text-sky-500 dark:text-sky-400 -rotate-45"
            />
          </div>
        </div>

        {/* Loading text */}
        <div className="flex flex-col items-center gap-2">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 animate-pulse">
            Loading
          </h3>
          
          {/* Animated dots */}
          <div className="flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2 h-2 bg-sky-500 dark:bg-sky-400 rounded-full animate-bounce"
                style={{
                  animationDelay: `${i * 0.15}s`,
                  animationDuration: '0.8s'
                }}
              />
            ))}
          </div>
        </div>

        {/* Brand name */}
        <div className="text-sm font-medium text-gray-600 dark:text-gray-400 tracking-wider">
          SKYTECH AVIATION
        </div>
      </div>
    </div>
  );
};

export default PageLoadingFallback;
