import React, { useState, useEffect, useRef } from 'react';
import { X, Download, ExternalLink, BookOpen } from 'lucide-react';

interface FlipbookConfig {
  id: string;
  title: string;
  subtitle?: string;
  coverImage: string;
  flipbookUrl: string;
  downloadUrl?: string;
}

interface FlipbookViewerProps {
  config: FlipbookConfig;
  variant?: 'card' | 'inline' | 'modal';
  className?: string;
  showDownload?: boolean;
}

// HeyZine Flipbook configurations
export const FLIPBOOK_CONFIGS = {
  companyBrochure: {
    id: '61a32a0ad7',
    title: 'Skytech Aviation',
    subtitle: 'Company Brochure',
    coverImage: 'https://cdnc.heyzine.com/flip-book/cover/61a32a0ad7.jpg',
    flipbookUrl: 'https://heyzine.com/flip-book/61a32a0ad7.html',
    downloadUrl: 'https://heyzine.com/flip-book/61a32a0ad7.html#download',
  },
} as const;

// Load HeyZine scripts dynamically
const loadHeyZineScripts = (): Promise<void> => {
  return new Promise((resolve) => {
    // Check if already loaded
    if ((window as any).heyzinea) {
      resolve();
      return;
    }

    // Load CSS
    const existingLink = document.querySelector('link[href*="heyzine"]');
    if (!existingLink) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://cdnc.heyzine.com/release/heyzine.4.min.css';
      document.head.appendChild(link);
    }

    // Load JS
    const existingScript = document.querySelector('script[src*="heyzine"]');
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = 'https://cdnc.heyzine.com/release/addons.5.min.js';
      script.onload = () => {
        if ((window as any).heyzinea?.addons?.init) {
          (window as any).heyzinea.addons.init();
        }
        resolve();
      };
      document.head.appendChild(script);
    } else {
      resolve();
    }
  });
};

// Flipbook Card Component - Shows a beautiful card with page curl effect
export const FlipbookCard: React.FC<FlipbookViewerProps> = ({
  config,
  className = '',
  showDownload = true,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    loadHeyZineScripts();
  }, []);

  return (
    <>
      <div
        className={`group relative cursor-pointer ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Card Container with 3D Effect */}
        <div className="relative w-full max-w-[320px] mx-auto perspective-1000">
          {/* Book Cover */}
          <div
            className={`relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-2xl transition-all duration-500 ${
              isHovered ? 'transform scale-105 shadow-3xl' : ''
            }`}
            style={{
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Cover Image */}
            <div className="relative aspect-[3/4] overflow-hidden">
              <img
                src={config.coverImage}
                alt={config.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              
              {/* Page Curl Effect */}
              <div
                className={`absolute bottom-0 right-0 w-20 h-20 transition-all duration-500 ${
                  isHovered ? 'opacity-100' : 'opacity-0'
                }`}
                style={{
                  background: 'linear-gradient(135deg, transparent 50%, rgba(255,255,255,0.9) 50%)',
                  borderRadius: '0 0 0 100%',
                  boxShadow: '-5px -5px 10px rgba(0,0,0,0.2)',
                }}
              />

              {/* Title Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-2xl font-bold text-white mb-1">{config.title}</h3>
                {config.subtitle && (
                  <p className="text-sky-300 font-medium">{config.subtitle}</p>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="p-4 bg-gradient-to-r from-sky-500 to-cyan-500">
              <div className="flex items-center justify-between gap-3">
                <button
                  onClick={() => setShowModal(true)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-lg transition-all duration-300 backdrop-blur-sm"
                >
                  <BookOpen className="w-5 h-5" />
                  <span>View Flipbook</span>
                </button>
                
                {showDownload && config.downloadUrl && (
                  <a
                    href={config.flipbookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center p-3 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-all duration-300 backdrop-blur-sm"
                    title="Open in new tab"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Floating Badge */}
          <div className="absolute -top-3 -right-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg animate-pulse">
            Interactive
          </div>
        </div>
      </div>

      {/* Modal Viewer */}
      {showModal && (
        <FlipbookModal
          config={config}
          onClose={() => setShowModal(false)}
          showDownload={showDownload}
        />
      )}
    </>
  );
};

// Flipbook Modal Component - Seamless full screen viewer
interface FlipbookModalProps {
  config: FlipbookConfig;
  onClose: () => void;
  showDownload?: boolean;
}

export const FlipbookModal: React.FC<FlipbookModalProps> = ({
  config,
  onClose,
  showDownload = true,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [showCloseHint, setShowCloseHint] = useState(true);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const hintTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const enteredFullscreenRef = useRef(false);
  const closingRef = useRef(false);

  // Auto-enter fullscreen on mount (desktop/tablet only)
  useEffect(() => {
    const enterFullscreen = async () => {
      try {
        const prefersFullscreen = !window.matchMedia('(max-width: 768px)').matches;
        if (modalRef.current && document.fullscreenEnabled && prefersFullscreen) {
          await modalRef.current.requestFullscreen();
          enteredFullscreenRef.current = true;
        }
      } catch (err) {
        // Fullscreen not supported - continue without it
      }
    };
    
    // Small delay to ensure modal is rendered
    const timer = setTimeout(enterFullscreen, 100);
    return () => clearTimeout(timer);
  }, []);

  // Prevent body scroll when modal is open
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  // Focus close button when modal opens for accessibility
  useEffect(() => {
    closeButtonRef.current?.focus();
  }, []);

  // Smart ESC handling: exit fullscreen first, then close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        
        // If in fullscreen, exit it
        if (document.fullscreenElement) {
          document.exitFullscreen().catch(() => {
            closeModal();
          });
        } else {
          // Not in fullscreen, close the modal
          closeModal();
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Close modal when fullscreen exits (prevents iframe staying in page)
  useEffect(() => {
    const handleFullscreenChange = () => {
      if (enteredFullscreenRef.current && !document.fullscreenElement) {
        closeModal();
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Auto-hide close hint after 3 seconds
  useEffect(() => {
    if (hintTimeoutRef.current) {
      clearTimeout(hintTimeoutRef.current);
    }
    hintTimeoutRef.current = setTimeout(() => {
      setShowCloseHint(false);
    }, 3000);

    return () => {
      if (hintTimeoutRef.current) {
        clearTimeout(hintTimeoutRef.current);
      }
    };
  }, []);

  const closeModal = () => {
    if (closingRef.current) return;
    closingRef.current = true;
    onClose();
  };

  const handleClose = async () => {
    // Exit fullscreen if active
    if (document.fullscreenElement) {
      try {
        await document.exitFullscreen();
      } catch (err) {
        // Continue closing
      }
    }
    closeModal();
  };

  return (
    <div 
      className="fixed inset-0 z-[9999] w-screen h-screen overflow-hidden safe-top safe-bottom"
      style={{ width: '100dvw', height: '100dvh' }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="flipbook-title"
    >
      {/* Full Screen Flipbook Container - Seamless Design */}
      <div
        ref={modalRef}
        className="relative w-full h-full bg-black overflow-hidden overscroll-contain"
        style={{ width: '100dvw', height: '100dvh' }}
      >
        {/* Mobile Safe Control Bar */}
        <div className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-3 py-2 sm:px-4 sm:py-3 bg-black/35 backdrop-blur-sm border-b border-white/10" style={{ paddingTop: 'env(safe-area-inset-top)' }}>
          <div className="text-white/70 text-xs sm:text-sm">{config.title}</div>
          <button
            onClick={handleClose}
            className="flex items-center gap-2 px-3 py-1.5 bg-white/15 hover:bg-white/25 active:bg-white/30 text-white text-xs sm:text-sm rounded-full transition-all duration-200 touch-manipulation"
            aria-label="Close flipbook viewer"
          >
            <X className="w-4 h-4" />
            <span>Close</span>
          </button>
        </div>
        {/* Minimal Close Button - Top Right Corner */}
        <button
          ref={closeButtonRef}
          onClick={handleClose}
          className="absolute top-4 sm:top-6 right-4 sm:right-6 z-50 p-2 sm:p-3 bg-white/10 hover:bg-white/20 active:bg-white/30 text-white rounded-full transition-all duration-200 touch-manipulation backdrop-blur-sm border border-white/10"
          title="Close (ESC)"
          aria-label="Close flipbook viewer"
          tabIndex={0}
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Subtle Close Hint - Bottom Right */}
        {showCloseHint && !isLoading && (
          <div className="absolute bottom-4 sm:bottom-6 right-4 sm:right-6 z-40 text-white/60 text-xs sm:text-sm backdrop-blur-sm bg-black/30 px-3 py-2 rounded-full animate-pulse pointer-events-none">
            Press ESC to close
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black z-30">
            <div className="text-center">
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4">
                <div className="absolute inset-0 border-4 border-sky-500/20 rounded-full" />
                <div className="absolute inset-0 border-4 border-transparent border-t-sky-500 rounded-full animate-spin" />
              </div>
              <p className="text-white/60 text-sm">Loading</p>
            </div>
          </div>
        )}

        {/* Seamless Flipbook Iframe - No Visible Borders */}
        <div className="absolute inset-0 pt-12 sm:pt-0" style={{ paddingTop: 'calc(env(safe-area-inset-top) + 3rem)' }}>
          <iframe
            src={config.flipbookUrl}
            title={config.title}
            className="w-full h-full border-0 bg-black"
            onLoad={() => setIsLoading(false)}
            allow="fullscreen"
            allowFullScreen
            webkitallowfullscreen="true"
            mozallowfullscreen="true"
            style={{ 
              touchAction: 'pan-x pan-y pinch-zoom',
              pointerEvents: 'auto',
              filter: 'none',
            }}
          />
        </div>

        {/* Download Button - Optional, Top Left when available */}
        {showDownload && !isLoading && (
          <a
            href={config.flipbookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-4 sm:top-6 left-4 sm:left-6 z-40 flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/10 hover:bg-white/20 active:bg-white/30 text-white text-xs sm:text-sm rounded-full transition-all duration-200 touch-manipulation backdrop-blur-sm border border-white/10"
            title="Download full version"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">View</span>
          </a>
        )}
      </div>
    </div>
  );
};

// Inline Flipbook Embed - For embedding directly in a page section
export const FlipbookEmbed: React.FC<FlipbookViewerProps> = ({
  config,
  className = '',
  showDownload = true,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadHeyZineScripts();
  }, []);

  return (
    <div className={`relative bg-gray-100 dark:bg-gray-800 rounded-2xl overflow-hidden shadow-xl ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-sky-500 to-cyan-500">
        <div className="flex items-center gap-3">
          <BookOpen className="w-6 h-6 text-white" />
          <div>
            <h3 className="font-bold text-white">{config.title}</h3>
            {config.subtitle && (
              <p className="text-sm text-sky-100">{config.subtitle}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {showDownload && (
            <a
              href={config.flipbookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-1.5 bg-white/20 hover:bg-white/30 text-white text-sm rounded-lg transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Download</span>
            </a>
          )}
          <a
            href={config.flipbookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors"
            title="Open in new tab"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Loading Indicator */}
      {isLoading && (
        <div className="absolute inset-0 top-14 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          <div className="text-center">
            <div className="relative w-16 h-16 mx-auto mb-3">
              <div className="absolute inset-0 border-4 border-sky-500/30 rounded-full" />
              <div className="absolute inset-0 border-4 border-transparent border-t-sky-500 rounded-full animate-spin" />
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Loading flipbook...</p>
          </div>
        </div>
      )}

      {/* Flipbook Iframe */}
      <div className="aspect-[4/3] md:aspect-[16/9]">
        <iframe
          src={config.flipbookUrl}
          title={config.title}
          className="w-full h-full border-0"
          onLoad={() => setIsLoading(false)}
          allow="fullscreen"
        />
      </div>
    </div>
  );
};

// Document Viewer Component - Can be used for any document viewing
interface DocumentViewerProps {
  type: 'flipbook' | 'pdf' | 'external';
  config: FlipbookConfig | { title: string; url: string; downloadUrl?: string };
  className?: string;
}

export const DocumentViewer: React.FC<DocumentViewerProps> = ({
  type,
  config,
  className = '',
}) => {
  if (type === 'flipbook' && 'coverImage' in config) {
    return <FlipbookCard config={config} className={className} />;
  }

  // For PDF or external documents
  const docConfig = config as { title: string; url: string; downloadUrl?: string };
  
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg ${className}`}>
      <div className="p-4 bg-gradient-to-r from-gray-700 to-gray-800">
        <h3 className="font-bold text-white">{docConfig.title}</h3>
      </div>
      <div className="aspect-[4/3]">
        <iframe
          src={docConfig.url}
          title={docConfig.title}
          className="w-full h-full border-0"
          allow="fullscreen"
        />
      </div>
      {docConfig.downloadUrl && (
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <a
            href={docConfig.downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-lg transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Download</span>
          </a>
        </div>
      )}
    </div>
  );
};

// Main export
const FlipbookViewer: React.FC<FlipbookViewerProps> = (props) => {
  switch (props.variant) {
    case 'inline':
      return <FlipbookEmbed {...props} />;
    case 'modal':
      return null; // Modal is triggered from card
    case 'card':
    default:
      return <FlipbookCard {...props} />;
  }
};

export default FlipbookViewer;
