import React from 'react';
import { useTranslation } from 'react-i18next';
import SEOHead from '../components/SEOHead';

const About: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <SEOHead 
        page="about"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'About', url: '/about' }
        ]}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-gray-900">
        
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 text-white py-20">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-300 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">{t('about.hero.title')}</h1>
              <p className="text-xl md:text-2xl text-blue-100">{t('about.hero.subtitle')}</p>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-shadow">
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-5xl">🎯</div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{t('about.mission.title')}</h2>
                </div>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  {t('about.mission.description')}
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-shadow">
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-5xl">👁️</div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{t('about.vision.title')}</h2>
                </div>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  {t('about.vision.description')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Company Introduction */}
        <section className="py-20 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-8">
              {t('about.introduction.title')}
            </h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                {t('about.introduction.paragraph1')}
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                {t('about.introduction.paragraph2')}
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                {t('about.introduction.paragraph3')}
              </p>
            </div>
          </div>
        </section>

        {/* ASA Membership Highlight */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="flex-1">
                <div className="rounded-2xl p-8 flex items-center justify-center shadow-2xl">
                  <img 
                    src="https://www.aviationsuppliers.org/images/ASA-logo-wt.png" 
                    alt="ASA Logo" 
                    className="w-full max-w-xs"
                  />
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-4xl font-bold mb-6">{t('about.asa.title')}</h2>
                <p className="text-xl text-blue-100 mb-4 leading-relaxed">
                  {t('about.asa.description')}
                </p>
                <div className="flex items-center gap-3 text-lg">
                  <svg className="w-6 h-6 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-blue-100">{t('about.asa.memberSince')}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-16">
              {t('about.timeline.title')}
            </h2>
            <div className="space-y-8">
              {[
                { year: '2010', event: 'founded' },
                { year: '2012', event: 'expansion' },
                { year: '2015', event: 'asa' },
                { year: '2018', event: 'certification' },
                { year: '2020', event: 'global' },
                { year: '2023', event: 'innovation' }
              ].map((milestone, index) => (
                <div key={index} className="flex gap-8 items-start">
                  <div className="flex flex-col items-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg flex-shrink-0">
                      {milestone.year}
                    </div>
                    {index < 5 && (
                      <div className="w-1 h-full bg-gradient-to-b from-blue-600 to-purple-600 mt-2"></div>
                    )}
                  </div>
                  <div className="flex-1 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {t(`about.timeline.milestones.${milestone.event}.title`)}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      {t(`about.timeline.milestones.${milestone.event}.description`)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section className="py-20 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-4">
              {t('about.certifications.title')}
            </h2>
            <p className="text-xl text-center text-gray-600 dark:text-gray-400 mb-12">
              {t('about.certifications.subtitle')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {['iso9001', 'as9120', 'easa', 'faa'].map((cert, index) => (
                <div key={index} className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 text-center hover:scale-105 transition-transform shadow-lg">
                  <div className="text-5xl mb-4">🏆</div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {t(`about.certifications.items.${cert}.name`)}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {t(`about.certifications.items.${cert}.description`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-4">
              {t('about.values.title')}
            </h2>
            <p className="text-xl text-center text-gray-600 dark:text-gray-400 mb-12">
              {t('about.values.subtitle')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                { icon: '🎯', name: 'integrity' },
                { icon: '⭐', name: 'quality' },
                { icon: '🤝', name: 'reliability' },
                { icon: '💡', name: 'innovation' },
                { icon: '👥', name: 'customer' },
                { icon: '🌍', name: 'safety' }
              ].map((value, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl hover:scale-105 transition-all">
                  <div className="text-6xl mb-4">{value.icon}</div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    {t(`about.values.items.${value.name}.title`)}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    {t(`about.values.items.${value.name}.description`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-4">
              {t('about.team.title')}
            </h2>
            <p className="text-xl text-center text-gray-600 dark:text-gray-400 mb-12">
              {t('about.team.subtitle')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {['ceo', 'cto', 'sales'].map((member, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow">
                  <div className="h-64 bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                    <div className="text-8xl text-white/80">👤</div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                      {t(`about.team.members.${member}.name`)}
                    </h3>
                    <p className="text-blue-600 dark:text-blue-400 font-medium mb-3">
                      {t(`about.team.members.${member}.position`)}
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      {t(`about.team.members.${member}.bio`)}
                    </p>
                    <div className="flex gap-3">
                      <a href="#" className="text-blue-600 hover:text-blue-700 dark:text-blue-400">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Office Locations */}
        <section className="py-20 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-4">
              {t('about.locations.title')}
            </h2>
            <p className="text-xl text-center text-gray-600 dark:text-gray-400 mb-12">
              {t('about.locations.subtitle')}
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {/* Main Office */}
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {t('about.locations.main.title')}
                </h3>
                <div className="space-y-4">
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong>{t('about.locations.main.address.label')}:</strong><br />
                    {t('about.locations.main.address.street')}<br />
                    {t('about.locations.main.address.city')}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong>{t('about.locations.main.phone.label')}:</strong> {t('about.locations.main.phone.number')}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong>{t('about.locations.main.email.label')}:</strong> {t('about.locations.main.email.address')}
                  </p>
                  <div className="pt-4">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d462560.6828072805!2d54.89782999414062!3d25.076280535204924!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43496ad9c645%3A0xbde66e5084295162!2sDubai!5e0!3m2!1sen!2sae!4v1635849271234!5m2!1sen!2sae"
                      width="100%"
                      height="250"
                      style={{ border: 0, borderRadius: '12px' }}
                      allowFullScreen
                      loading="lazy"
                      className="shadow-lg"
                    ></iframe>
                  </div>
                </div>
              </div>

              {/* Regional Office */}
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {t('about.locations.regional.title')}
                </h3>
                <div className="space-y-4">
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong>{t('about.locations.regional.address.label')}:</strong><br />
                    {t('about.locations.regional.address.street')}<br />
                    {t('about.locations.regional.address.city')}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong>{t('about.locations.regional.phone.label')}:</strong> {t('about.locations.regional.phone.number')}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong>{t('about.locations.regional.email.label')}:</strong> {t('about.locations.regional.email.address')}
                  </p>
                  <div className="pt-4">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3609.1594166447834!2d55.27577931501432!3d25.186917583895634!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f69d9e8b3c4db%3A0x4d3f73e2895b8c1d!2sSharjah!5e0!3m2!1sen!2sae!4v1635849371234!5m2!1sen!2sae"
                      width="100%"
                      height="250"
                      style={{ border: 0, borderRadius: '12px' }}
                      allowFullScreen
                      loading="lazy"
                      className="shadow-lg"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Awards & Recognition */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-4">
              {t('about.awards.title')}
            </h2>
            <p className="text-xl text-center text-gray-600 dark:text-gray-400 mb-12">
              {t('about.awards.subtitle')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {['excellence', 'supplier', 'innovation', 'safety', 'service', 'growth'].map((award, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl p-8 text-center shadow-xl hover:scale-105 transition-transform">
                  <div className="text-6xl mb-4">🏆</div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {t(`about.awards.items.${award}.title`)}
                  </h3>
                  <p className="text-blue-600 dark:text-blue-400 font-medium mb-2">
                    {t(`about.awards.items.${award}.year`)}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {t(`about.awards.items.${award}.issuer`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {t('about.cta.title')}
            </h2>
            <p className="text-xl md:text-2xl text-blue-100 mb-10 max-w-3xl mx-auto">
              {t('about.cta.subtitle')}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="/contact"
                className="px-10 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-all duration-300 shadow-2xl hover:shadow-white/50 hover:scale-105 transform"
              >
                {t('about.cta.contact')}
              </a>
              <a
                href="/products"
                className="px-10 py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-blue-600 transition-all duration-300 hover:scale-105 transform"
              >
                {t('about.cta.products')}
              </a>
            </div>
          </div>
        </section>

      </div>
    </>
  );
};

export default About;