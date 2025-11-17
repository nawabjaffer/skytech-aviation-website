import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = '' }) => {
  return (
    <img
      src="/skytech-logo.png"
      alt="Skytech Aviation Logo"
      className={`transition-all duration-300 hover:scale-105 ${className}`}
      style={{ maxWidth: '100%', height: 'auto', objectFit: 'contain' }}
    />
  );
};

export default Logo;
