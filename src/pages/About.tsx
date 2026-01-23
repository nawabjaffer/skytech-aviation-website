import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Target, 
  Eye, 
  Award, 
  Shield, 
  Star, 
  Users, 
  Lightbulb, 
  Heart, 
  Globe,
  UserCircle,
  MapPin,
  TrendingUp,
  CheckCircle2,
  Phone
} from 'lucide-react';
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
      
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-aviation-blue-50 to-gray-50 dark:from-gray-900 dark:via-aviation-blue-900/20 dark:to-gray-900">
        
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-[#0b6d94] via-[#0a5a7a] to-[#073d53] text-white pt-28 pb-20 md:pt-32 md:pb-24">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-aviation-blue-300 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">{t('about.hero.title')}</h1>
              <p className="text-xl md:text-2xl text-aviation-blue-100">{t('about.hero.subtitle')}</p>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-4 bg-aviation-blue-100 dark:bg-aviation-blue-900/30 rounded-2xl">
                    <Target className="w-10 h-10 text-[#0b6d94] dark:text-aviation-blue-400" strokeWidth={2} />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{t('about.mission.title')}</h2>
                </div>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  {t('about.mission.description')}
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-4 bg-aviation-blue-100 dark:bg-aviation-blue-900/30 rounded-2xl">
                    <Eye className="w-10 h-10 text-[#0b6d94] dark:text-aviation-blue-400" strokeWidth={2} />
                  </div>
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
        <section className="py-20 bg-gradient-to-r from-[#0b6d94] to-[#0a5a7a] text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="flex-1">
                <div className="rounded-2xl p-8 flex items-center justify-center bg-white/10 backdrop-blur-sm">
                  <img 
                    src="https://www.aviationsuppliers.org/images/ASA-logo-wt.png" 
                    alt="ASA Logo" 
                    className="w-full max-w-[220px]"
                  />
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-4xl font-bold mb-6">{t('about.asa.title')}</h2>
                <p className="text-xl text-aviation-blue-100 mb-4 leading-relaxed">
                  {t('about.asa.description')}
                </p>
                  <span className="text-aviation-blue-100 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-300" />
                    {t('about.asa.memberSince')}
                  </span>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline */}
        {(() => {
          const milestones = t('about.timeline.milestones', { returnObjects: true }) as Record<string, { title: string; description: string }>;
          const milestoneKeys = milestones && typeof milestones === 'object' ? Object.keys(milestones) : [];
          
          if (milestoneKeys.length === 0) return null;
          
          return (
            <section className="py-20">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-16">
                  {t('about.timeline.title')}
                </h2>
                <div className="space-y-6">
                  {milestoneKeys.map((key, index) => {
                    const milestone = milestones[key];
                    if (!milestone || !milestone.title) return null;
                    
                    return (
                      <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-[#0b6d94]">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                          {milestone.title}
                        </h3>
                        {milestone.description && (
                          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                            {milestone.description}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          );
        })()}

        {/* Certifications */}
        {(() => {
          const certItems = t('about.certifications.items', { returnObjects: true }) as Record<string, { name: string; description: string }>;
          const certKeys = certItems && typeof certItems === 'object' ? Object.keys(certItems) : [];
          
          if (certKeys.length === 0) return null;
          
          return (
            <section className="py-24 bg-white dark:bg-gray-800">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-6">
                  {t('about.certifications.title')}
                </h2>
                <p className="text-xl text-center text-gray-600 dark:text-gray-400 mb-16">
                  {t('about.certifications.subtitle')}
                </p>
                <div className={`grid grid-cols-1 ${certKeys.length === 1 ? 'max-w-md mx-auto' : certKeys.length === 2 ? 'md:grid-cols-2 max-w-3xl mx-auto' : certKeys.length === 3 ? 'md:grid-cols-3 max-w-5xl mx-auto' : 'md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto'} gap-8`}>
                  {certKeys.map((cert, index) => {
                    const certData = certItems[cert];
                    if (!certData || !certData.name) return null;
                    const isISO = cert === 'iso9001';
                    
                    return (
                      <div key={index} className="bg-gradient-to-br from-aviation-blue-50 to-aviation-blue-100 dark:from-aviation-blue-900/20 dark:to-aviation-blue-800/20 rounded-2xl p-8 text-center hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                        <div className="flex justify-center mb-6">
                          <div className="p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-md">
                            {isISO ? (
                              <img
                                src="/iso-9001-2015.png"
                                alt="ISO Certified"
                                className="w-16 h-16 object-contain filter brightness-0 invert"
                              />
                            ) : (
                              <Award className="w-12 h-12 text-[#0b6d94]" strokeWidth={2} />
                            )}
                          </div>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                          {isISO ? 'ISO Certified' : certData.name}
                        </h3>
                        {!isISO && certData.description && (
                          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                            {certData.description}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          );
        })()}

        {/* Core Values */}
        {(() => {
          const valueItems = t('about.values.items', { returnObjects: true }) as Record<string, { title: string; description: string }>;
          const valueKeys = valueItems && typeof valueItems === 'object' ? Object.keys(valueItems) : [];
          
          if (valueKeys.length === 0) return null;
          
          // Icon mapping for values
          const valueIconMap: { [key: string]: React.ElementType } = {
            integrity: Target,
            quality: Star,
            reliability: Shield,
            innovation: Lightbulb,
            customer: Users,
            safety: Shield,
            value: TrendingUp
          };
          
          return (
            <section className="py-24">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-6">
                  {t('about.values.title')}
                </h2>
                <p className="text-xl text-center text-gray-600 dark:text-gray-400 mb-16">
                  {t('about.values.subtitle')}
                </p>
                <div className={`grid grid-cols-1 ${valueKeys.length <= 3 ? 'md:grid-cols-' + valueKeys.length : 'md:grid-cols-2 lg:grid-cols-3'} gap-8 max-w-6xl mx-auto`}>
                  {valueKeys.map((key, index) => {
                    const value = valueItems[key];
                    if (!value || !value.title) return null;
                    const IconComponent = valueIconMap[key] || Star;
                    
                    return (
                      <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="p-3 bg-aviation-blue-100 dark:bg-aviation-blue-900/30 rounded-xl">
                            <IconComponent className="w-6 h-6 text-[#0b6d94] dark:text-aviation-blue-400" strokeWidth={2} />
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                            {value.title}
                          </h3>
                        </div>
                        {value.description && (
                          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                            {value.description}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          );
        })()}

        {/* Team Section */}
        {(() => {
          const teamMembers = t('about.team.members', { returnObjects: true }) as Record<string, { name: string; position: string; bio: string; photo?: string; linkedin?: string }>;
          const memberKeys = teamMembers && typeof teamMembers === 'object' ? Object.keys(teamMembers) : [];
          
          if (memberKeys.length === 0) return null;
          
          return (
            <section className="py-24 bg-gradient-to-br from-gray-50 to-sky-50 dark:from-gray-900 dark:to-sky-900/20">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-6">
                  {t('about.team.title')}
                </h2>
                <p className="text-xl text-center text-gray-600 dark:text-gray-400 mb-16">
                  {t('about.team.subtitle')}
                </p>
                <div className={`${memberKeys.length === 1 ? 'max-w-md mx-auto' : memberKeys.length === 2 ? 'grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto' : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto'}`}>
                  {memberKeys.map((member, index) => {
                    const memberData = teamMembers[member];
                    if (!memberData || !memberData.name) return null;
                    
                    // CEO specific data
                    const ceoPhoto = member === 'ceo' ? '/images/ceo-mohamed-yaseen.jpg' : memberData.photo;
                    const ceoLinkedIn = member === 'ceo' ? 'https://ae.linkedin.com/in/mohamed-yaseen-80298b68' : memberData.linkedin;
                    
                    return (
                      <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300">
                        <div className="h-56 bg-gradient-to-br from-[#0b6d94] to-[#073d53] flex items-center justify-center relative overflow-hidden">
                          {ceoPhoto ? (
                            <img 
                              src={ceoPhoto} 
                              alt={memberData.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                                const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                                if (fallback) fallback.style.display = 'flex';
                              }}
                            />
                          ) : null}
                          <div className={`p-6 bg-white/10 backdrop-blur-sm rounded-full ${ceoPhoto ? 'hidden' : 'flex'}`}>
                            <UserCircle className="w-20 h-20 text-white" strokeWidth={1.5} />
                          </div>
                        </div>
                        <div className="p-8 text-center">
                          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                            {memberData.name}
                          </h3>
                          {memberData.position && (
                            <p className="text-[#0b6d94] dark:text-aviation-blue-400 font-semibold mb-4">
                              {memberData.position}
                            </p>
                          )}
                          {memberData.bio && (
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                              {memberData.bio}
                            </p>
                          )}
                          {ceoLinkedIn && (
                            <a 
                              href={ceoLinkedIn}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center w-10 h-10 bg-[#0077b5] text-white rounded-full hover:bg-[#006097] hover:scale-110 transition-all duration-300"
                              title="Connect on LinkedIn"
                            >
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                              </svg>
                            </a>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          );
        })()}

        {/* Office Locations */}
        <section className="py-24 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-6">
              {t('about.locations.title')}
            </h2>
            <p className="text-xl text-center text-gray-600 dark:text-gray-400 mb-16">
              {t('about.locations.subtitle')}
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Main Office */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 bg-[#0b6d94]/10 dark:bg-[#0b6d94]/20 rounded-xl">
                    <MapPin className="w-5 h-5 text-[#0b6d94] dark:text-aviation-blue-400" strokeWidth={2} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {t('about.locations.main.title')}
                  </h3>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">{t('about.locations.main.address.label')}</span>
                    <p className="text-gray-700 dark:text-gray-300 mt-1">
                      {t('about.locations.main.address.street')}<br />
                      {t('about.locations.main.address.city')}
                    </p>
                  </div>
                  {t('about.locations.main.contact.name') && (
                    <div>
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">{t('about.locations.main.contact.label')}</span>
                      <p className="text-gray-700 dark:text-gray-300 mt-1">{t('about.locations.main.contact.name')}</p>
                    </div>
                  )}
                  <div>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">{t('about.locations.main.phone.label')}</span>
                    <p className="text-gray-700 dark:text-gray-300 mt-1">{t('about.locations.main.phone.number')}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">{t('about.locations.main.email.label')}</span>
                    <p className="text-gray-700 dark:text-gray-300 mt-1">{t('about.locations.main.email.address')}</p>
                  </div>
                </div>
                
                <div className="rounded-xl overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.0763!2d55.3474!3d25.2477!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5d483bce5f2b%3A0x8c9c5c5c5c5c5c5c!2sAl%20Garhoud%2C%20Dubai!5e0!3m2!1sen!2sae"
                    width="100%"
                    height="200"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                  ></iframe>
                </div>
              </div>

              {/* Enquiry Contact */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 bg-[#0b6d94]/10 dark:bg-[#0b6d94]/20 rounded-xl">
                    <Phone className="w-5 h-5 text-[#0b6d94] dark:text-aviation-blue-400" strokeWidth={2} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {t('about.locations.regional.title')}
                  </h3>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                    <span className="font-medium text-gray-900 dark:text-white min-w-[60px]">{t('about.locations.regional.phone.label')}:</span>
                    <span>{t('about.locations.regional.phone.number')}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                    <span className="font-medium text-gray-900 dark:text-white min-w-[60px]">{t('about.locations.regional.email.label')}:</span>
                    <span>{t('about.locations.regional.email.address')}</span>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
                  <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                    For enquiries and support, our team is ready to assist you.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Awards & Recognition */}
        {(() => {
          const awardsItems = t('about.awards.items', { returnObjects: true }) as Record<string, { title: string; year: string; issuer: string }>;
          const awardKeys = awardsItems && typeof awardsItems === 'object' ? Object.keys(awardsItems) : [];
          
          if (awardKeys.length === 0) return null;
          
          // Dynamic grid class based on number of items
          const getGridClass = () => {
            const count = awardKeys.length;
            if (count === 1) return 'flex justify-center';
            if (count === 2) return 'grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto';
            if (count === 3) return 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto';
            return 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-6xl mx-auto';
          };
          
          return (
            <section className="py-20 bg-gray-50 dark:bg-gray-900">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
                    {t('about.awards.title')}
                  </h2>
                  <p className="text-lg text-gray-600 dark:text-gray-400">
                    {t('about.awards.subtitle')}
                  </p>
                </div>
                
                <div className={getGridClass()}>
                  {awardKeys.map((award, index) => {
                    const awardData = awardsItems[award];
                    if (!awardData || !awardData.title) return null;
                    const isISOAward = award === 'supplier' || (awardData.title && awardData.title.toLowerCase().includes('iso'));
                    
                    return (
                      <div 
                        key={index} 
                        className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 dark:border-gray-700 max-w-sm w-full"
                      >
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                            {isISOAward ? (
                              <img
                                src="/iso-9001-2015.png"
                                alt="ISO Certified"
                                className="w-10 h-10 object-contain filter brightness-0 invert"
                              />
                            ) : (
                              <Award className="w-6 h-6 text-amber-600 dark:text-amber-400" strokeWidth={2} />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1 leading-tight">
                              {isISOAward ? 'ISO Certified' : awardData.title}
                            </h3>
                            {!isISOAward && awardData.year && (
                              <p className="text-sm font-medium text-[#0b6d94] dark:text-aviation-blue-400 mb-1">
                                {awardData.year}
                              </p>
                            )}
                            {!isISOAward && awardData.issuer && (
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                {awardData.issuer}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          );
        })()}

        {/* Call to Action */}
        <section className="py-24 bg-gradient-to-r from-sky-500 via-sky-600 to-cyan-500">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {t('about.cta.title')}
            </h2>
            <p className="text-xl md:text-2xl text-sky-100 mb-10 max-w-3xl mx-auto">
              {t('about.cta.subtitle')}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="/contact"
                className="px-10 py-4 bg-white text-sky-600 font-bold rounded-xl hover:bg-sky-50 transition-all duration-300 shadow-2xl hover:shadow-white/50 hover:scale-105 transform"
              >
                {t('about.cta.contact')}
              </a>
              <a
                href="/products"
                className="px-10 py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-sky-600 transition-all duration-300 hover:scale-105 transform"
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