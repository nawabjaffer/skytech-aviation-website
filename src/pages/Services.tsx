import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Award, 
  Globe, 
  MessageCircle, 
  DollarSign, 
  Book, 
  FileText, 
  BarChart3, 
  Download,
  Search,
  Wrench,
  AlertTriangle,
  Truck,
  CheckCircle,
  FileCheck,
  ClipboardList,
  CircleDollarSign,
  Check,
  Rocket
} from 'lucide-react';
import SEOHead from '../components/SEOHead';

const Services: React.FC = () => {
  const { t } = useTranslation();

  const services = [
    {
      IconComponent: Search,
      key: 'sourcing',
      gradient: 'from-[#0b6d94] to-[#073d53]',
      iconBg: 'bg-aviation-blue-100 dark:bg-aviation-blue-900/30'
    },
    {
      IconComponent: Wrench,
      key: 'technical',
      gradient: 'from-green-500 to-green-700',
      iconBg: 'bg-green-100 dark:bg-green-900'
    },
    {
      IconComponent: AlertTriangle,
      key: 'aog',
      gradient: 'from-red-500 to-red-700',
      iconBg: 'bg-red-100 dark:bg-red-900'
    },
    {
      IconComponent: Truck,
      key: 'logistics',
      gradient: 'from-purple-500 to-purple-700',
      iconBg: 'bg-purple-100 dark:bg-purple-900'
    },
    {
      IconComponent: CheckCircle,
      key: 'quality',
      gradient: 'from-[#0b6d94] to-[#0a5a7a]',
      iconBg: 'bg-aviation-blue-100 dark:bg-aviation-blue-900/30'
    },
    {
      IconComponent: FileCheck,
      key: 'documentation',
      gradient: 'from-orange-500 to-orange-700',
      iconBg: 'bg-orange-100 dark:bg-orange-900'
    }
  ];

  const processSteps = [
    { number: 1, key: 'inquiry', IconComponent: ClipboardList, color: 'blue' },
    { number: 2, key: 'quote', IconComponent: CircleDollarSign, color: 'green' },
    { number: 3, key: 'order', IconComponent: Check, color: 'purple' },
    { number: 4, key: 'delivery', IconComponent: Rocket, color: 'orange' }
  ];

  return (
    <>
      <SEOHead 
        page="services"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Services', url: '/services' }
        ]}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-aviation-blue-50 to-gray-50 dark:from-gray-900 dark:via-aviation-blue-900/20 dark:to-gray-900">
        
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-[#0b6d94] via-[#0a5a7a] to-[#073d53] text-white py-20">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-aviation-blue-300 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">{t('services.hero.title')}</h1>
              <p className="text-xl md:text-2xl text-aviation-blue-100 mb-8">{t('services.hero.subtitle')}</p>
              <div className="flex flex-wrap gap-4 justify-center">
                <a
                  href="#services"
                  className="px-8 py-4 bg-white text-[#0b6d94] font-bold rounded-xl hover:bg-aviation-blue-50 transition-all duration-300 shadow-2xl hover:shadow-white/50 hover:scale-105 transform"
                >
                  {t('services.hero.cta1')}
                </a>
                <a
                  href="/contact"
                  className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-[#0b6d94] transition-all duration-300 hover:scale-105 transform"
                >
                  {t('services.hero.cta2')}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Service Cards */}
        <section id="services" className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                {t('services.cards.title')}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                {t('services.cards.subtitle')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {services.map((service, index) => {
                const IconComponent = service.IconComponent;
                return (
                  <div
                    key={service.key}
                    className="group bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className={`w-20 h-20 ${service.iconBg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="w-10 h-10 text-gray-700 dark:text-gray-200" strokeWidth={2} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      {t(`services.cards.items.${service.key}.title`)}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                      {t(`services.cards.items.${service.key}.description`)}
                    </p>
                  
                  {/* Benefits List */}
                  <div className="space-y-3">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wide">
                      {t('services.cards.keyFeatures')}
                    </p>
                    {[0, 1, 2].map((i) => (
                      <div key={i} className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {t(`services.cards.items.${service.key}.benefits.${i}`)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
              })}
            </div>
          </div>
        </section>

        {/* Process Timeline */}
        <section className="py-20 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                {t('services.process.title')}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                {t('services.process.subtitle')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {processSteps.map((step, index) => {
                const StepIcon = step.IconComponent;
                return (
                  <div key={step.key} className="relative">
                    <div className="flex flex-col items-center text-center">
                      {/* Step Number */}
                      <div className={`w-20 h-20 bg-gradient-to-br from-${step.color}-600 to-${step.color}-700 text-white rounded-full flex items-center justify-center text-2xl font-bold shadow-lg mb-4 relative z-10`}>
                        {step.number}
                      </div>
                      
                      {/* Icon */}
                      <div className="mb-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-2xl">
                        <StepIcon className="w-12 h-12 text-gray-700 dark:text-gray-200" strokeWidth={2} />
                      </div>
                      
                      {/* Title */}
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                        {t(`services.process.steps.${step.key}.title`)}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                        {t(`services.process.steps.${step.key}.description`)}
                      </p>
                    </div>

                    {/* Arrow Connector (except last item) */}
                    {index < processSteps.length - 1 && (
                      <div className="hidden md:block absolute top-10 left-full w-full -ml-4">
                      <svg className="w-8 h-8 text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                  )}
                </div>
              );
              })}
            </div>

            {/* Timeline Note */}
            <div className="mt-12 p-6 bg-gradient-to-r from-aviation-blue-50 to-aviation-blue-100 dark:from-aviation-blue-900/20 dark:to-aviation-blue-800/20 rounded-2xl border border-aviation-blue-200 dark:border-aviation-blue-800">
              <div className="flex items-center gap-3">
                <svg className="w-6 h-6 text-[#0b6d94] dark:text-aviation-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>{t('services.process.note.title')}:</strong> {t('services.process.note.description')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-aviation-blue-50 dark:from-gray-900 dark:to-aviation-blue-900/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                {t('services.benefits.title')}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                {t('services.benefits.subtitle')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-7xl mx-auto">
              {[
                { benefit: 'certified', IconComponent: Award, color: 'amber' },
                { benefit: 'network', IconComponent: Globe, color: 'aviation-blue' },
                { benefit: 'support', IconComponent: MessageCircle, color: 'green' },
                { benefit: 'pricing', IconComponent: DollarSign, color: 'purple' }
              ].map(({ benefit, IconComponent, color }, index) => (
                <div
                  key={benefit}
                  className="bg-white dark:bg-gray-800 rounded-3xl p-8 text-center shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
                >
                  <div className="flex justify-center mb-6">
                    <div className={`p-5 bg-${color}-100 dark:bg-${color}-900/30 rounded-2xl`}>
                      <IconComponent className={`w-10 h-10 text-${color === 'aviation-blue' ? '[#0b6d94]' : color + '-600'} dark:text-${color}-400`} strokeWidth={2} />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    {t(`services.benefits.items.${benefit}.title`)}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    {t(`services.benefits.items.${benefit}.description`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Support Channels */}
        <section className="py-20 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                {t('services.support.title')}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                {t('services.support.subtitle')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* 24/7 Hotline */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-2xl p-8 text-center">
                <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  {t('services.support.channels.hotline.title')}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {t('services.support.channels.hotline.description')}
                </p>
                <a href="tel:+97144XXXXXX" className="text-2xl font-bold text-blue-600 dark:text-blue-400 hover:underline">
                  {t('services.support.channels.hotline.number')}
                </a>
                <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                  {t('services.support.channels.hotline.availability')}
                </p>
              </div>

              {/* Email Support */}
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-2xl p-8 text-center">
                <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  {t('services.support.channels.email.title')}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {t('services.support.channels.email.description')}
                </p>
                <a href="mailto:support@skytechaviation.com" className="text-xl font-bold text-purple-600 dark:text-purple-400 hover:underline break-all">
                  {t('services.support.channels.email.address')}
                </a>
                <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                  {t('services.support.channels.email.responseTime')}
                </p>
              </div>

              {/* Live Chat */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-2xl p-8 text-center">
                <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  {t('services.support.channels.chat.title')}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {t('services.support.channels.chat.description')}
                </p>
                <button className="px-8 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors">
                  {t('services.support.channels.chat.button')}
                </button>
                <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                  {t('services.support.channels.chat.availability')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Download Center */}
        <section className="py-20 bg-gradient-to-r from-sky-500 via-sky-600 to-cyan-500">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {t('services.downloads.title')}
              </h2>
              <p className="text-xl text-sky-100 max-w-3xl mx-auto">
                {t('services.downloads.subtitle')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-6xl mx-auto">
              {[
                { key: 'catalog', IconComponent: Book, color: 'red' },
                { key: 'brochure', IconComponent: FileText, color: 'blue' },
                { key: 'certifications', IconComponent: Award, color: 'amber' },
                { key: 'capabilities', IconComponent: BarChart3, color: 'green' }
              ].map(({ key, IconComponent, color }) => (
                <a
                  key={key}
                  href="#"
                  className="group bg-white dark:bg-gray-800 rounded-3xl p-8 text-center hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl"
                >
                  <div className="flex justify-center mb-6">
                    <div className={`p-5 bg-${color}-100 dark:bg-${color}-900/30 rounded-2xl group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className={`w-12 h-12 text-${color}-600 dark:text-${color}-400`} strokeWidth={2} />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                    {t(`services.downloads.items.${key}.title`)}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                    {t(`services.downloads.items.${key}.description`)}
                  </p>
                  <div className="flex items-center justify-center gap-2 text-blue-600 dark:text-blue-400 font-semibold group-hover:gap-3 transition-all">
                    <Download className="w-5 h-5" strokeWidth={2} />
                    <span>{t('services.downloads.downloadButton')}</span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-3">
                    {t(`services.downloads.items.${key}.size`)}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-24 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              {t('services.cta.title')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-3xl mx-auto">
              {t('services.cta.subtitle')}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="/contact"
                className="px-10 py-4 bg-gradient-to-r from-sky-500 to-cyan-500 text-white font-bold rounded-xl hover:from-sky-600 hover:to-cyan-600 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 transform"
              >
                {t('services.cta.contact')}
              </a>
              <a
                href="/products"
                className="px-10 py-4 bg-transparent border-2 border-sky-500 text-sky-600 dark:border-sky-400 dark:text-sky-400 font-bold rounded-xl hover:bg-sky-500 hover:text-white dark:hover:bg-sky-400 dark:hover:text-gray-900 transition-all duration-300 hover:scale-105 transform"
              >
                {t('services.cta.products')}
              </a>
            </div>
          </div>
        </section>

      </div>
    </>
  );
};

export default Services;