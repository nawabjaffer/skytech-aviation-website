import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Footer: React.FC = () => {
  const { t, i18n } = useTranslation();
  const currentYear = new Date().getFullYear();
  const isArabic = i18n.language === 'ar';

  const footerLinks = {
    company: [
      { path: '/about', label: t('nav.about') },
      { path: '/products', label: t('nav.products') },
      { path: '/services', label: t('nav.services') },
    ],
    support: [
      { path: '/distributors', label: t('nav.distributors') },
      { path: '/contacts', label: t('nav.contact') },
    ],
  };

  return (
    <footer className="bg-gradient-aviation dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800 text-white mt-auto transition-colors duration-300">
      <div className="container-custom py-12">
        {/* Footer Grid */}
        <div className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3 gap-8 mb-8">
          {/* Company Info with Logo */}
          <div className="flex flex-row gap-4">
            {/* Skytech Logo */}
            <div className={`flex-shrink-0 ${isArabic ? 'ltr' : ''}`}>
              <img 
                src="/icon-192.png" 
                alt="Skytech Aviation Logo" 
                className="h-20 w-auto object-contain"
              />
            </div>
            <div className="flex flex-col items-start">
              <h3 className="text-xl font-bold font-heading mb-2">Skytech Aviation</h3>
              <p className="text-gray-200 text-sm">
                {t('footer.companyDesc')}
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className={`${isArabic ? 'text-right' : 'text-left'}`}>
            <h4 className="text-lg font-semibold mb-4">{t('footer.quickLinks')}</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-200 hover:text-sky-blue-200 transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info and ASA Logo */}
          <div className={"flex flex-col items-start"}>
            <h4 className={`text-lg font-semibold mb-4 ${isArabic ? 'text-right' : 'text-left'} w-full`}>
              {t('footer.contactInfo')}
            </h4>
            <ul className={`space-y-2 text-gray-200 mb-6 ${isArabic ? 'text-right' : 'text-left'}`}>
              {footerLinks.support.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="hover:text-sky-blue-200 transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <p className="text-sm">{t('footer.email')}: info@skytech.ae</p>
                <p className="text-sm">{t('footer.phone')}: +971 561 611 002</p>
                <p className="text-sm mt-2">{t('footer.address')}</p>
              </li>
            </ul>
            
            {/* ASA Member Badge */}
            <div className={`mt-auto ${isArabic ? 'ltr' : ''}`}>
              <div className="bg-blue-900/30 rounded-lg p-3 border border-blue-500/30">
                <p className={`text-sm font-semibold text-yellow-300 mb-2 ${isArabic ? 'text-right' : 'text-left'}`}>
                  ✓ ASA Member Since 2015
                </p>
                <p className={`text-xs text-gray-300 ${isArabic ? 'text-right' : 'text-left'}`}>
                  Aviation Suppliers Association
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-white/20 pt-6">
          <div className={`flex flex-col ${isArabic ? 'tablet:flex-row-reverse' : 'tablet:flex-row'} justify-between items-center gap-4`}>
            <p className="text-gray-200 text-sm">
              &copy; {currentYear} Skytech Aviation. {t('footer.rights')}
            </p>
            <div className={`flex gap-6 ${isArabic ? 'flex-row-reverse' : ''}`}>
              <a href="#" className="text-gray-200 hover:text-sky-blue-200 transition-colors duration-300">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-200 hover:text-sky-blue-200 transition-colors duration-300">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
