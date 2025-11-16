import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Home, Plane, Wrench, Info, Phone, ArrowLeft, Cloud } from 'lucide-react';
import SEOHead from '../components/SEOHead';

/**
 * NotFound Component - 404 Error Page
 * 
 * A professionally designed 404 page with:
 * - Engaging SVG icon animations
 * - Clear error message with proper hierarchy
 * - Navigation suggestions with professional icons
 * - SEO optimization
 * - Multilingual support
 * - Consistent spacing and alignment
 */
const NotFound: React.FC = () => {
  const { t } = useTranslation();

  const navigationLinks = [
    { path: '/', label: t('nav.home'), icon: Home },
    { path: '/products', label: t('nav.products'), icon: Plane },
    { path: '/services', label: t('nav.services'), icon: Wrench },
    { path: '/about', label: t('nav.about'), icon: Info },
    { path: '/contacts', label: t('nav.contacts'), icon: Phone },
  ];

  return (
    <>
      <SEOHead 
        customTitle="404 - Page Not Found | Skytech Aviation"
        customDescription="The page you're looking for doesn't exist. Explore our aircraft parts, services, and more."
        customKeywords={['404', 'page not found', 'skytech aviation', 'aircraft parts']}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4 py-12">
        <div className="max-w-5xl mx-auto w-full">
          
          {/* Animated Aircraft Illustration */}
          <div className="mb-12 relative flex justify-center">
            <div className="inline-block relative">
              {/* Animated Aircraft with professional SVG */}
              <div className="mb-6 transform hover:scale-105 transition-transform duration-300">
                <Plane 
                  className="w-32 h-32 text-sky-500 dark:text-sky-400 animate-bounce" 
                  strokeWidth={1.5}
                />
              </div>
              
              {/* Cloud animations with professional icons */}
              <div className="absolute -top-6 -left-10 opacity-40 animate-pulse">
                <Cloud className="w-16 h-16 text-gray-400 dark:text-gray-600" />
              </div>
              <div className="absolute -top-4 -right-14 opacity-30 animate-pulse" style={{ animationDelay: '0.5s' }}>
                <Cloud className="w-12 h-12 text-gray-400 dark:text-gray-500" />
              </div>
              <div className="absolute -bottom-6 left-14 opacity-50 animate-pulse" style={{ animationDelay: '1s' }}>
                <Cloud className="w-10 h-10 text-gray-300 dark:text-gray-600" />
              </div>
            </div>
          </div>

          {/* Error Code */}
          <div className="mb-8 text-center">
            <h1 className="text-8xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-600 dark:from-sky-400 dark:to-blue-500 mb-4">
              404
            </h1>
            <div className="h-1 w-24 bg-gradient-to-r from-sky-500 to-blue-600 mx-auto rounded-full"></div>
          </div>

          {/* Error Message */}
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-6">
              {t('errors.404.title', 'Flight Path Not Found')}
            </h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed px-4">
              {t('errors.404.message', 'Looks like this page took a detour! Our aircraft parts and services are still available on the main flight path.')}
            </p>
            
            {/* Fun aviation-themed message */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 shadow-xl border border-gray-200 dark:border-gray-700 max-w-lg mx-auto">
              <div className="flex items-center justify-center mb-4">
                <Plane className="w-8 h-8 text-sky-500 dark:text-sky-400 transform rotate-45" />
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">
                {t('errors.404.aviation_message', 'Even the best pilots need course corrections. Let us help you navigate back to your destination!')}
              </p>
            </div>
          </div>

          {/* Navigation Suggestions */}
          <div className="mb-12">
            <h3 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-white mb-8 text-center">
              {t('errors.404.suggestions', 'Popular Destinations')}
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-4xl mx-auto px-4">
              {navigationLinks.map((link) => {
                const IconComponent = link.icon;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="group bg-white dark:bg-gray-800 hover:bg-sky-50 dark:hover:bg-gray-700 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-sky-300 dark:hover:border-sky-600 flex flex-col items-center justify-center text-center"
                  >
                    <div className="mb-3 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-8 h-8 text-gray-600 dark:text-gray-400 group-hover:text-sky-600 dark:group-hover:text-sky-400" strokeWidth={1.5} />
                    </div>
                    <div className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-sky-600 dark:group-hover:text-sky-400">
                      {link.label}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10 px-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Home className="w-5 h-5" strokeWidth={2} />
              {t('errors.404.go_home', 'Return to Home Base')}
            </Link>
            
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-2 px-8 py-4 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
            >
              <ArrowLeft className="w-5 h-5" strokeWidth={2} />
              {t('errors.404.go_back', 'Go Back')}
            </button>
          </div>

          {/* Search Suggestion */}
          <div className="text-center text-sm text-gray-500 dark:text-gray-400 mb-8 px-4">
            <p>
              {t('errors.404.search_help', 'Looking for something specific? Try our')}{' '}
              <Link to="/products" className="text-sky-600 dark:text-sky-400 hover:underline font-medium transition-colors">
                {t('nav.products', 'products catalog')}
              </Link>{' '}
              {t('common.or')}{' '}
              <Link to="/contacts" className="text-sky-600 dark:text-sky-400 hover:underline font-medium transition-colors">
                {t('errors.404.contact_us', 'contact us')}
              </Link>
              {t('common.for_help', ' for help')}
            </p>
          </div>

          {/* Company info */}
          <div className="text-center pt-8 border-t border-gray-200 dark:border-gray-700 mx-4">
            <p className="text-xs text-gray-400 dark:text-gray-500">
              Skytech Aviation - {t('company.tagline', 'Your trusted partner in aircraft parts and services')}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;