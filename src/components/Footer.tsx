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
                <p className='text-sm mt-2'>{COMPANY_INFO.address.full || t('footer.address')}</p>
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
            <div className={`flex gap-4 ${isArabic ? 'flex-row-reverse' : ''}`}>
              {/* LinkedIn */}
              <a
                href='https://www.linkedin.com/company/skytech-aviation-llc-fz'
                target='_blank'
                rel='noopener noreferrer'
                className='text-gray-200 hover:text-sky-blue-200 transition-colors duration-300'
                title='Follow us on LinkedIn'
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              {/* Instagram */}
              <a
                href='https://www.instagram.com/skytech_uae/'
                target='_blank'
                rel='noopener noreferrer'
                className='text-gray-200 hover:text-sky-blue-200 transition-colors duration-300'
                title='Follow us on Instagram'
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
