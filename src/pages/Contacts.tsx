import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SEOHead from '../components/SEOHead';
import { siteConfig } from '../config/siteConfig';
import { DOWNLOAD_LINKS } from '../config/links';
import { FlipbookModal, FLIPBOOK_CONFIGS } from '../components/FlipbookViewer';
import { BookOpen, ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  file?: FileList;
}

const Contacts: React.FC = () => {
  const { t } = useTranslation();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormData>();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [showBrochureModal, setShowBrochureModal] = useState(false);
  
  // Refs for animation sections
  const heroRef = useRef<HTMLElement>(null);
  const infoCardsRef = useRef<HTMLElement>(null);
  const formSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation with opacity
      if (heroRef.current) {
        const heroElements = heroRef.current.querySelectorAll('h1, p');
        if (heroElements.length > 0) {
          gsap.fromTo(heroElements,
            { opacity: 0, y: 40 },
            {
              opacity: 1, y: 0, duration: 0.9, stagger: 0.15, ease: 'power3.out',
              scrollTrigger: {
                trigger: heroRef.current,
                start: 'top 85%',
                toggleActions: 'play none none none'
              }
            }
          );
        }
      }

      // Info cards animation with scale
      if (infoCardsRef.current) {
        const infoCardElements = infoCardsRef.current.querySelectorAll('.grid > div');
        if (infoCardElements.length > 0) {
          gsap.fromTo(infoCardElements,
            { opacity: 0, y: 40, scale: 0.9 },
            {
              opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.15, ease: 'back.out(1.3)',
              scrollTrigger: {
                trigger: infoCardsRef.current,
                start: 'top 85%',
                toggleActions: 'play none none none'
              }
            }
          );
        }
      }

      // Form section animation with directional approach
      if (formSectionRef.current) {
        const formElements = formSectionRef.current.querySelectorAll('.grid > div');
        if (formElements.length > 0) {
          gsap.fromTo(formElements,
            { opacity: 0, x: (index) => index === 0 ? -40 : 40, y: 20 },
            {
              opacity: 1, x: 0, y: 0, duration: 0.8, stagger: 0.15, ease: 'power2.out',
              scrollTrigger: {
                trigger: formSectionRef.current,
                start: 'top 85%',
                toggleActions: 'play none none none'
              }
            }
          );
        }
      }
    });

    return () => ctx.revert();
  }, []);

  const onSubmit = async (data: ContactFormData) => {
    setSubmitting(true);
    setError('');

    try {
      // Simulate form submission (replace with actual API call)
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitted(true);
      reset();
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      setError('Failed to send message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <SEOHead 
        page="contact"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Contact', url: '/contact' }
        ]}
      />

      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-aviation-blue-50 to-gray-50 dark:from-gray-900 dark:via-aviation-blue-900/20 dark:to-gray-900">
        {/* Hero Section */}
        <section ref={heroRef} className="relative bg-gradient-to-r from-[#0b6d94] via-[#0a5a7a] to-[#073d53] text-white pt-28 pb-20 md:pt-32 md:pb-24">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-aviation-blue-300 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">{t('contact.hero.title')}</h1>
              <p className="text-xl md:text-2xl text-aviation-blue-100">{t('contact.hero.subtitle')}</p>
            </div>
          </div>
        </section>

        {/* Contact Info & Downloads Section */}
        <section ref={infoCardsRef} className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {/* Contact Information */}
              <div className="space-y-6">
                {/* Phone */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{t('contact.info.phone.title')}</h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-3">{t('contact.info.phone.description')}</p>
                      <a href={`tel:${siteConfig.contact.primaryPhone}`} className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                        {siteConfig.contact.primaryPhone}
                      </a>
                      {siteConfig.contact.secondaryPhone && (
                        <>
                          <p className="text-gray-500 dark:text-gray-500 text-sm my-2">or</p>
                          <a href={`tel:${siteConfig.contact.secondaryPhone}`} className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                            {siteConfig.contact.secondaryPhone}
                          </a>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{t('contact.info.email.title')}</h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-3">{t('contact.info.email.description')}</p>
                      <a href={`mailto:${siteConfig.contact.primaryEmail}`} className="text-blue-600 dark:text-blue-400 font-semibold hover:underline break-all">
                        {siteConfig.contact.primaryEmail}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{t('contact.info.address.title')}</h3>
                      <p className="text-gray-600 dark:text-gray-400">{siteConfig.address.fullAddress}</p>
                    </div>
                  </div>
                </div>

                {/* Social Media */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">{t('contact.info.social')}</h3>
                  <div className="flex gap-3">
                    <a
                      href={siteConfig.socialMedia.linkedin || '#'}
                      target={siteConfig.socialMedia.linkedin ? '_blank' : undefined}
                      rel={siteConfig.socialMedia.linkedin ? 'noreferrer' : undefined}
                      className="p-4 bg-white dark:bg-gray-800 rounded-lg hover:scale-110 transition-transform shadow-lg"
                    >
                      <svg className="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/>
                      </svg>
                    </a>
                    <a
                      href={siteConfig.socialMedia.twitter || '#'}
                      target={siteConfig.socialMedia.twitter ? '_blank' : undefined}
                      rel={siteConfig.socialMedia.twitter ? 'noreferrer' : undefined}
                      className="p-4 bg-white dark:bg-gray-800 rounded-lg hover:scale-110 transition-transform shadow-lg"
                    >
                      <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                      </svg>
                    </a>
                    <a
                      href={siteConfig.socialMedia.facebook || '#'}
                      target={siteConfig.socialMedia.facebook ? '_blank' : undefined}
                      rel={siteConfig.socialMedia.facebook ? 'noreferrer' : undefined}
                      className="p-4 bg-white dark:bg-gray-800 rounded-lg hover:scale-110 transition-transform shadow-lg"
                    >
                      <svg className="w-6 h-6 text-blue-700" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                      </svg>
                    </a>
                  </div>
                </div>

                {/* Download Catalogs with Interactive Brochure */}
                <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-2xl p-8">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    {t('contact.downloads.title')}
                  </h3>
                  <div className="space-y-3">
                    {/* Product Catalog - Regular Download */}
                    <a
                      href={DOWNLOAD_LINKS.productCatalog || '#'}
                      target={DOWNLOAD_LINKS.productCatalog ? '_blank' : undefined}
                      rel={DOWNLOAD_LINKS.productCatalog ? 'noopener noreferrer' : undefined}
                      className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-lg hover:scale-105 transition-transform shadow-lg"
                    >
                      <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clipRule="evenodd" />
                      </svg>
                      <span className="font-medium text-gray-900 dark:text-white">{t('contact.downloads.productCatalog')}</span>
                    </a>
                    
                    {/* Company Brochure - Interactive Flipbook */}
                    <button
                      onClick={() => setShowBrochureModal(true)}
                      className="w-full flex items-center gap-3 p-4 bg-gradient-to-r from-sky-500 to-cyan-500 rounded-lg hover:scale-105 transition-all duration-300 shadow-lg group text-left border-0 cursor-pointer"
                    >
                      <div className="relative flex-shrink-0">
                        <BookOpen className="w-6 h-6 text-white" />
                        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full animate-pulse" />
                      </div>
                      <div className="flex-1">
                        <span className="font-semibold text-white block">{t('contact.downloads.companyBrochure')}</span>
                        <span className="text-xs text-sky-100">Interactive Flipbook</span>
                      </div>
                      <ExternalLink className="w-5 h-5 text-white/70 group-hover:text-white transition-colors flex-shrink-0" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div ref={formSectionRef}>
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{t('contact.form.title')}</h3>
                  
                  {submitted && (
                    <div className="mb-6 p-4 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg">
                      {t('contact.form.success')}
                    </div>
                  )}

                  {error && (
                    <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg">
                      {error}
                    </div>
                  )}

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          {t('contact.form.fields.name')}
                        </label>
                        <input
                          type="text"
                          {...register('name', { required: true })}
                          className="input-field"
                          placeholder={t('contact.form.placeholders.name')}
                        />
                        {errors.name && <span className="text-red-500 text-sm">{t('contact.form.errors.required')}</span>}
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          {t('contact.form.fields.email')}
                        </label>
                        <input
                          type="email"
                          {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
                          className="input-field"
                          placeholder={t('contact.form.placeholders.email')}
                        />
                        {errors.email && <span className="text-red-500 text-sm">{t('contact.form.errors.required')}</span>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          {t('contact.form.fields.phone')}
                        </label>
                        <input
                          type="tel"
                          {...register('phone', { required: true })}
                          className="input-field"
                          placeholder={t('contact.form.placeholders.phone')}
                        />
                        {errors.phone && <span className="text-red-500 text-sm">{t('contact.form.errors.required')}</span>}
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          {t('contact.form.fields.subject')}
                        </label>
                        <input
                          type="text"
                          {...register('subject', { required: true })}
                          className="input-field"
                          placeholder={t('contact.form.placeholders.subject')}
                        />
                        {errors.subject && <span className="text-red-500 text-sm">{t('contact.form.errors.required')}</span>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        {t('contact.form.fields.message')}
                      </label>
                      <textarea
                        {...register('message', { required: true })}
                        className="input-field h-32 resize-none"
                        placeholder={t('contact.form.placeholders.message')}
                      />
                      {errors.message && <span className="text-red-500 text-sm">{t('contact.form.errors.required')}</span>}
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full px-8 py-4 bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50"
                    >
                      {submitting ? t('contact.form.sending') : t('contact.form.send')}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>

      {/* Brochure Modal - Rendered at top level */}
      {showBrochureModal && (
        <FlipbookModal
          config={FLIPBOOK_CONFIGS.companyBrochure}
          onClose={() => setShowBrochureModal(false)}
          showDownload={true}
        />
      )}
    </>
  );
};

export default Contacts;
