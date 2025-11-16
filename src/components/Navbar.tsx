import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import DarkModeToggle from './DarkModeToggle';
import LanguageSelector from './LanguageSelector';
import Logo from './Logo';

const Navbar: React.FC = () => {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll for backdrop blur effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: '/', label: t('nav.home') },
    { path: '/products', label: t('nav.products') },
    { path: '/services', label: t('nav.services') },
    { path: '/distributors', label: t('nav.distributors') },
    { path: '/about', label: t('nav.about') },
    { path: '/contacts', label: t('nav.contact') },
  ];

  return (
    <nav 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-aviation-blue/95 dark:bg-gray-900/95 backdrop-blur-md shadow-xl' 
          : 'bg-aviation-blue dark:bg-gray-900 shadow-lg'
      }`}
    >
      <div className="container-custom">
        <div className="flex justify-between items-center py-4">
          {/* Logo/Brand */}
          <div className="flex-shrink-0 rtl:order-last">
            <Link 
              to="/" 
              className="block transition-transform duration-300 hover:scale-105"
            >
              <Logo className="h-12 w-auto min-w-[180px]" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <ul className="hidden desktop:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`text-white font-medium transition-all duration-300 hover:text-sky-blue relative group px-1 ${
                    isActive(link.path) ? 'text-sky-blue' : ''
                  }`}
                >
                  {link.label}
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-sky-blue transform origin-left transition-transform duration-300 ${
                    isActive(link.path) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}></span>
                </Link>
              </li>
            ))}
            {/* Language Selector */}
            <li>
              <LanguageSelector />
            </li>
            {/* Dark Mode Toggle */}
            <li>
              <DarkModeToggle />
            </li>
          </ul>

          {/* Right side controls for mobile */}
          <div className="flex items-center gap-3 desktop:hidden">
            <LanguageSelector />
            <DarkModeToggle />
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white focus:outline-none focus:ring-2 focus:ring-sky-blue rounded-lg p-2"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`desktop:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <ul className="pb-4 space-y-3">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block py-3 px-4 text-white font-medium rounded-lg transition-all duration-300 hover:bg-sky-blue hover:px-6 ${
                    isActive(link.path) ? 'bg-sky-blue px-6' : ''
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;