import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = '' }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const logoRef = useRef<SVGSVGElement>(null);
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!logoRef.current || !isHovered) return;
      
      const rect = logoRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      
      setMousePosition({ x, y });
    };

    if (isHovered) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isHovered]);

  return (
    <div className="flex items-center gap-3">
      {/* PNG Logo Image */}
      <img
        src="/skytech-logo.png"
        alt="Skytech Aviation Logo"
        className="h-14 w-auto flex-shrink-0 object-contain"
        style={{ maxWidth: '60px' }}
      />
      
      {/* SVG Animated Text */}
      <svg
        ref={logoRef}
        viewBox={` ${isArabic ? '-150 0 200 56' : '60 0 200 56'}`}
        preserveAspectRatio="xMidYMid meet"
        className={`transition-all duration-300 ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ overflow: 'visible', width: '180px', height: 'auto' }}
      >
      <defs>
        {/* Clipping mask - defines the logo shape boundary */}
        <clipPath id="logoClipPath">
          {/* Text "SKYTECH" */}
          <text x="55" y="28" fontFamily="'Inter', sans-serif" fontSize="18" fontWeight="700">SKYTECH</text>
          {/* Text "AVIATION" */}
          <text x="55" y="44" fontFamily="'Inter', sans-serif" fontSize="10" fontWeight="400" letterSpacing="5.6">AVIATION</text>
        </clipPath>

        {/* Gradient for hover effect - follows mouse */}
        <radialGradient
          id="hoverGradient"
          cx={`${isArabic ? mousePosition.x - 30 : mousePosition.x + 30}%`}
          cy={`${isArabic ?  mousePosition.y - 0 : mousePosition.y + 0}%`}
          r="60%"
        >
          <stop offset="0%" stopColor="#0ea5e9" stopOpacity="1">
            <animate
              attributeName="stopColor"
              values="#0ea5e9;#8b5cf6;#ec4899;#f59e0b;#10b981;#0ea5e9"
              dur="4s"
              repeatCount="indefinite"
            />
          </stop>
          <stop offset="30%" stopColor="#8b5cf6" stopOpacity="0.8">
            <animate
              attributeName="stopColor"
              values="#8b5cf6;#ec4899;#f59e0b;#10b981;#0ea5e9;#8b5cf6"
              dur="4s"
              repeatCount="indefinite"
            />
          </stop>
          <stop offset="60%" stopColor="#ec4899" stopOpacity="0.4">
            <animate
              attributeName="stopColor"
              values="#ec4899;#f59e0b;#10b981;#0ea5e9;#8b5cf6;#ec4899"
              dur="4s"
              repeatCount="indefinite"
            />
          </stop>
          <stop offset="100%" stopColor="transparent" stopOpacity="0" />
        </radialGradient>

        {/* Static gradient for plane */}
        <linearGradient id="planeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#e0e7ff" />
        </linearGradient>

        {/* Animated gradient for text when not hovered */}
        <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#e0e7ff" />
        </linearGradient>
      </defs>

      {/* Company Text */}
      <text
        x="55"
        y="28"
        fontFamily="'Inter', sans-serif"
        fontSize="18"
        fontWeight="700"
        fill="url(#textGradient)"
        className="transition-all duration-300"
      >
        SKYTECH
      </text>
      <text
        x="55"
        y="44"
        fontFamily="'Inter', sans-serif"
        fontSize="10"
        fontWeight="400"
        fill="url(#textGradient)"
        letterSpacing="5.6"
        className="transition-all duration-300"
      >
        AVIATION
      </text>

      {/* Hover overlay gradient - CLIPPED to logo shape */}
      {isHovered && (
        <g>
          {/* Background rectangle to fill entire viewBox with gradient */}
          <rect
            x="0"
            y="0"
            width="200"
            height="60"
            fill="url(#hoverGradient)"
            clipPath="url(#logoClipPath)"
            className="pointer-events-none"
          >
            <animate
              attributeName="opacity"
              values="0;1;1"
              dur="0.3s"
              fill="freeze"
            />
          </rect>
        </g>
      )}
    </svg>
    </div>
  );
};

export default Logo;
