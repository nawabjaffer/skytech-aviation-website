import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SEOHead from '../components/SEOHead';

/**
 * NotFound Component - 404 Error Page
 * 
 * A beautifully designed 404 page with:
 * - Engaging illustration/animation
 * - Clear error message
 * - Navigation suggestions
 * - SEO optimization
 * - Multilingual support
 */
const NotFound: React.FC = () => {
  const { t } = useTranslation();

  const navigationLinks = [
    { path: '/', label: t('nav.home'), icon: '🏠' },
    { path: '/products', label: t('nav.products'), icon: '✈️' },
    { path: '/services', label: t('nav.services'), icon: '🔧' },
    { path: '/about', label: t('nav.about'), icon: 'ℹ️' },
    { path: '/contacts', label: t('nav.contacts'), icon: '📞' },
  ];

  return (
    <>
      <SEOHead 
        customTitle="404 - Page Not Found | Skytech Aviation"
        customDescription="The page you're looking for doesn't exist. Explore our aircraft parts, services, and more."
        customKeywords={['404', 'page not found', 'skytech aviation', 'aircraft parts']}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Animated Aircraft Illustration */}
          <div className="mb-8 relative">
            <div className="inline-block relative">
              {/* Animated Aircraft */}
              <div className="text-8xl mb-4 animate-bounce">
                ✈️
              </div>
              
              {/* Cloud animations */}
              <div className="absolute -top-4 -left-8 text-4xl text-gray-300 dark:text-gray-600 animate-pulse">
                ☁️
              </div>
              <div className="absolute -top-2 -right-12 text-3xl text-gray-400 dark:text-gray-500 animate-pulse delay-500">
                ☁️
              </div>
              <div className="absolute -bottom-4 left-12 text-2xl text-gray-300 dark:text-gray-600 animate-pulse delay-1000">
                ☁️
              </div>
            </div>
          </div>

          {/* Error Code */}
          <div className="mb-6">
            <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-600 dark:from-sky-400 dark:to-blue-500 mb-2">
              404
            </h1>
            <div className="h-1 w-24 bg-gradient-to-r from-sky-500 to-blue-600 mx-auto rounded-full"></div>
          </div>

          {/* Error Message */}
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
              {t('errors.404.title', 'Flight Path Not Found')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto leading-relaxed">
              {t('errors.404.message', 'Looks like this page took a detour! Our aircraft parts and services are still available on the main flight path.')}
            </p>
            
            {/* Fun aviation-themed message */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 max-w-md mx-auto">
              <div className="text-2xl mb-2">🛫</div>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                {t('errors.404.aviation_message', 'Even the best pilots need course corrections. Let us help you navigate back to your destination!')}
              </p>
            </div>
          </div>

          {/* Navigation Suggestions */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
              {t('errors.404.suggestions', 'Popular Destinations')}
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-3xl mx-auto">
              {navigationLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="group bg-white dark:bg-gray-800 hover:bg-sky-50 dark:hover:bg-gray-700 rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-sky-300 dark:hover:border-sky-600"
                >
                  <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-300">
                    {link.icon}
                  </div>
                  <div className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-sky-600 dark:group-hover:text-sky-400">
                    {link.label}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/"
              className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <span className="mr-2">🏠</span>
              {t('errors.404.go_home', 'Return to Home Base')}
            </Link>
            
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center px-8 py-3 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-600"
            >
              <span className="mr-2">↩️</span>
              {t('errors.404.go_back', 'Go Back')}
            </button>
          </div>

          {/* Search Suggestion */}
          <div className="mt-8 text-sm text-gray-500 dark:text-gray-400">
            <p>
              {t('errors.404.search_help', 'Looking for something specific? Try our')}{' '}
              <Link to="/products" className="text-sky-600 dark:text-sky-400 hover:underline font-medium">
                {t('nav.products', 'products catalog')}
              </Link>{' '}
              {t('common.or')}{' '}
              <Link to="/contacts" className="text-sky-600 dark:text-sky-400 hover:underline font-medium">
                {t('errors.404.contact_us', 'contact us')}
              </Link>
              {t('common.for_help', ' for help')}
            </p>
          </div>

          {/* Company info */}
          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
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