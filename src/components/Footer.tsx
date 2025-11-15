import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

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
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold font-heading mb-4">Skytech Aviation</h3>
            <p className="text-gray-200 mb-4">
              {t('footer.companyDesc')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
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

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('footer.contactInfo')}</h4>
            <ul className="space-y-2 text-gray-200">
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
                <p className="text-sm">{t('footer.email')}: info@skytechaviation.com</p>
                <p className="text-sm">{t('footer.phone')}: +971 XXX XXXX</p>
                <p className="text-sm mt-2">{t('footer.address')}</p>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-white/20 pt-6">
          <div className="flex flex-col tablet:flex-row justify-between items-center gap-4">
            <p className="text-gray-200 text-sm">
              &copy; {currentYear} Skytech Aviation. {t('footer.rights')}
            </p>
            <div className="flex gap-6">
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