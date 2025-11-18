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
    <footer className='bg-gradient-aviation dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800 text-white mt-auto transition-colors duration-300'>
      <div className='container-custom py-12'>
        {/* Footer Grid */}
        <div className='grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-[1fr_0.6fr_1fr_1fr] gap-8 mb-8 items-stretch'>
          {/* Company Info with Logo */}
          <div
            className={`flex flex-col h-full p-2 ${
              isArabic ? 'items-end text-right' : 'items-start text-left'
            }`}
          >
            <h4 className='text-lg font-semibold mb-2 w-full'>
              {t('footer.companyInfo')}
            </h4>
            <div className='w-full h-full'>
              <img
              src='/icon-192.png'
              alt='Skytech Aviation Logo'
              className='w-auto h-auto max-h-24 md:max-h-32 lg:max-h-[12rem] object-contain filter invert brightness-0 hover:invert-0 hover:brightness-100 transition-all duration-300'
              />
            </div>
            <p className='text-gray-200 text-sm'>{t('footer.companyDesc')}</p>
          </div>

          {/* Quick Links (narrower) */}
          <div
            className={`flex flex-col h-full gap-3 p-2 ${
              isArabic ? 'text-right' : 'items-start text-left'
            }`}
          >
            <h4 className='text-lg font-semibold mb-2 w-full'>
              {t('footer.quickLinks')}
            </h4>
            <ul className='flex-1 flex flex-col justify-start space-y-2'>
              {footerLinks.company.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className='text-gray-200 hover:text-sky-blue-200 transition-colors duration-300'
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div
            className={`flex flex-col h-full gap-3 p-2 ${
              isArabic ? 'items-end text-right' : 'items-start text-left'
            }`}
          >
            <h4 className='text-lg font-semibold mb-2 w-full'>
              {t('footer.contactInfo')}
            </h4>
            <ul className='flex-1 flex flex-col justify-start space-y-2 text-gray-200'>
              {footerLinks.support.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className='hover:text-sky-blue-200 transition-colors duration-300'
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className='pt-2'>
                <p className='text-sm'>info@skytech.ae</p>
                <p className='text-sm'>+971 561 611 002</p>
                <p className='text-sm mt-2'>{t('footer.address')}</p>
              </li>
            </ul>
          </div>

          {/* ASA Member Badge */}
          <div
            className={`flex flex-col h-full items-center justify-center text-center p-2`}
          >
            <h4 className='text-lg font-semibold w-full'>
              {t('footer.asaMember')}
            </h4>
            <div className='w-full flex-1 flex items-center justify-center h-full'>
              <img
                src='/ASALogo.png'
                alt='ASA Logo'
                className='w-full h-full object-contain'
              />
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className='border-t border-white/20 pt-6'>
          <div
            className={`flex flex-col ${
              isArabic ? 'tablet:flex-row-reverse' : 'tablet:flex-row'
            } justify-between items-center gap-4`}
          >
            <p className='text-gray-200 text-sm'>
              &copy; {currentYear} Skytech Aviation. {t('footer.rights')}
            </p>
            <div className={`flex gap-6 ${isArabic ? 'flex-row-reverse' : ''}`}>
              <a
                href='#'
                className='text-gray-200 hover:text-sky-blue-200 transition-colors duration-300'
              >
                Privacy Policy
              </a>
              <a
                href='#'
                className='text-gray-200 hover:text-sky-blue-200 transition-colors duration-300'
              >
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
