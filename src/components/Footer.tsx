import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { NAV_LINKS, EMAIL_LINKS, PHONE_LINKS, COMPANY_INFO, EXTERNAL_LINKS } from '../config/links';

const Footer: React.FC = () => {
  const { t, i18n } = useTranslation();
  const currentYear = new Date().getFullYear();
  const isArabic = i18n.language === 'ar';

  const footerLinks = {
    company: [
      { path: NAV_LINKS.about, label: t('nav.about') },
      { path: NAV_LINKS.products, label: t('nav.products') },
      { path: NAV_LINKS.services, label: t('nav.services') },
    ],
    support: [
      { path: NAV_LINKS.distributors, label: t('nav.distributors') },
      { path: NAV_LINKS.contact, label: t('nav.contact') },
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
            <div className="relative w-full h-full flex items-center justify-center group">
              {/* drop-shadow element placed behind the image */}
              <img
                src="/icon-192.png"
                alt="Skytech Aviation Logo"
                className="relative z-10 w-auto h-auto max-h-24 md:max-h-32 lg:max-h-[12rem] object-contain rounded-md filter invert brightness-0 group-hover:invert-0 group-hover:brightness-100 transition-all duration-300 group-hover:scale-105"
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
                <p className='text-sm'>{EMAIL_LINKS.info}</p>
                <p className='text-sm'>{PHONE_LINKS.primary}</p>
                <p className='text-sm mt-2'>{COMPANY_INFO.fullAddress || t('footer.address')}</p>
              </li>
            </ul>
          </div>

          {/* Certifications & Memberships */}
          <div
            className={`flex flex-col h-full items-center justify-center text-center p-2`}
          >
            <h4 className='text-lg font-semibold w-full mb-4'>
              {t('footer.asaMember')}
            </h4>
            <div className='w-full flex-1 flex flex-row items-center justify-center gap-4'>
              {/* ASA Logo */}
              <a href={EXTERNAL_LINKS.asa} target="_blank" rel="noopener noreferrer" className='flex-1 max-w-[120px]'>
                <img
                  src='/ASALogo.png'
                  alt='ASA Logo'
                  className='w-full h-auto object-contain hover:opacity-80 transition-opacity'
                />
              </a>
              {/* ISO 9001:2015 Logo */}
              <div className='flex-1 max-w-[100px]'>
                <img
                  src='/iso-9001-2015.png'
                  alt='ISO 9001:2015 Certified'
                  className='w-full h-auto object-contain filter brightness-0 invert'
                />
              </div>
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
