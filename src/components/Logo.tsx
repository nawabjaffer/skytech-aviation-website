import React, { useState, useRef, useEffect } from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = '' }) => {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const logoRef = useRef<SVGSVGElement>(null);

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
    <svg
      ref={logoRef}
      viewBox="0 0 200 60"
      className={`transition-all duration-300 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <defs>
        {/* Clipping mask - defines the logo shape boundary */}
        <clipPath id="logoClipPath">
          {/* Plane body */}
          <path d="M 15 30 L 40 25 L 45 25 L 38 30 L 45 30 L 48 33 L 45 35 L 38 35 L 45 40 L 40 40 L 15 35 Z" />
          {/* Plane wings */}
          <path d="M 25 30 L 20 20 L 25 22 Z M 25 35 L 20 45 L 25 43 Z" />
          {/* Text "SKYTECH" */}
          <text x="55" y="28" fontFamily="'Inter', sans-serif" fontSize="18" fontWeight="700">SKYTECH</text>
          {/* Text "AVIATION" */}
          <text x="55" y="44" fontFamily="'Inter', sans-serif" fontSize="11" fontWeight="400" letterSpacing="2">AVIATION</text>
        </clipPath>

        {/* Gradient for hover effect - follows mouse */}
        <radialGradient
          id="hoverGradient"
          cx={`${mousePosition.x}%`}
          cy={`${mousePosition.y}%`}
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

      {/* Plane Icon - Stylized Aviation Symbol */}
      <g transform="translate(10, 10)">
        {/* Plane body */}
        <path
          d="M 5 20 L 30 15 L 35 15 L 28 20 L 35 20 L 38 23 L 35 25 L 28 25 L 35 30 L 30 30 L 5 25 Z"
          fill="url(#planeGradient)"
          className="transition-all duration-500"
          style={{
            transform: isHovered ? 'translateX(3px) scale(1.05)' : 'translateX(0) scale(1)',
            transformOrigin: 'center',
          }}
        />
        {/* Plane wings */}
        <path
          d="M 15 20 L 10 10 L 15 12 Z M 15 25 L 10 35 L 15 33 Z"
          fill="url(#planeGradient)"
          className="transition-all duration-500"
          style={{
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
            transformOrigin: 'center',
          }}
        />
      </g>

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
        fontSize="11"
        fontWeight="400"
        fill="url(#textGradient)"
        letterSpacing="2"
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
  );
};

export default Logo;
