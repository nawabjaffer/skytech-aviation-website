import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import DarkModeToggle from './DarkModeToggle';
import LanguageSelector from './LanguageSelector';
import Logo from './Logo';
import { useLoadingState } from '../contexts/LoadingStateContext';
import '../styles/navbar-cinematic.css';

const Navbar: React.FC = () => {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();
  const { isLoadingComplete } = useLoadingState();

  // Handle scroll for transparent to solid transition
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animate navbar entrance after loading completes
  useEffect(() => {
    if (isLoadingComplete || location.pathname !== '/') {
      // Small delay for cinematic entrance
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isLoadingComplete, location.pathname]);

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
      className={`navbar-cinematic fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
        isScrolled 
          ? 'navbar-solid' 
          : 'navbar-transparent'
      } ${isVisible ? 'navbar-visible' : 'navbar-hidden'}`}
    >
      <div className="container-custom">
        {/* Desktop Navbar: utilities (left), logo (center), nav links (right) */}
        <div className="hidden desktop:grid grid-cols-3 items-center py-4">
          {/* Left Utilities */}
          <div className="flex items-center justify-start gap-3">
            <LanguageSelector compact />
            <DarkModeToggle />
          </div>

          {/* Center Logo */}
          <div className="flex items-center justify-center">
            <Link
              to="/"
              className="logo-container block transition-transform duration-300 hover:scale-110 flex-shrink-0"
              aria-label="Skytech Aviation"
            >
              <Logo className="h-10 w-auto" />
            </Link>
          </div>

          {/* Right Navigation */}
          <ul className="flex items-center justify-end gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <li key={link.path} className="h-16 flex items-center">
                <Link
                  to={link.path}
                  className={`nav-link font-medium transition-all duration-300 hover:text-sky-blue relative group px-1 ${
                    isActive(link.path) ? 'text-sky-blue nav-link-active' : 'text-white'
                  }`}
                >
                  {link.label}
                  <span className={`absolute -bottom-1 left-0 w-full h-1 bg-sky-blue transform origin-left transition-transform duration-300 px-1 ${
                    isActive(link.path) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}></span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile Navbar */}
        <div className="flex justify-between items-center py-4 desktop:hidden">
          <Link
            to="/"
            className="logo-container block transition-transform duration-300 hover:scale-110 flex-shrink-0"
            aria-label="Skytech Aviation"
          >
            <Logo className="h-10 w-auto" />
          </Link>

          <div className="flex items-center gap-3">
            <LanguageSelector compact />
            <DarkModeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="menu-button text-white focus:outline-none focus:ring-2 focus:ring-sky-blue rounded-lg p-2"
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
                aria-hidden="true"
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