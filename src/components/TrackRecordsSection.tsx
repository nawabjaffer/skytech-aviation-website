import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  TrendingUp, 
  Users, 
  Globe, 
  Package, 
  Clock, 
  Award,
  CheckCircle2,
  Plane,
  Calendar
} from 'lucide-react';
import partnersData from '../data/partners.json';

interface Partner {
  name: string;
  logo?: string;
}

const TrackRecordsSection: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [isRTL, setIsRTL] = useState(false);

  // Detect RTL language
  useEffect(() => {
    const rtlLanguages = ['ar', 'he', 'fa', 'ur'];
    setIsRTL(rtlLanguages.includes(i18n.language));
  }, [i18n.language]);

  // Get partners data directly from JSON file (not from translations)
  const trustedPartners: Partner[] = partnersData.trustedGloballyBy;
  const distributorPartners: Partner[] = partnersData.distributorPartners;

  const trackRecords = [
    {
      key: 'years',
      icon: Calendar
    },
    {
      key: 'deliveries',
      icon: Package
    },
    {
      key: 'clients',
      icon: Users
    },
    {
      key: 'countries',
      icon: Globe
    }
  ];

  // Icon mapping for achievements
  const iconMap: { [key: string]: React.ElementType } = {
    award: Award,
    trending: TrendingUp,
    check: CheckCircle2,
    plane: Plane,
    users: Users,
    globe: Globe,
    package: Package,
    clock: Clock
  };

  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-[#0b6d94]/10 text-[#0b6d94] dark:text-aviation-blue-400 text-sm font-semibold rounded-full mb-4">
            {t('home.trackRecords.badge', 'Proven Excellence')}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t('home.trackRecords.title', 'Our Track Record of Success')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            {t('home.trackRecords.subtitle', 'Years of dedication to excellence in aviation parts supply, building trust with leading airlines and MROs worldwide')}
          </p>
        </div>

        {/* Track Record Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {trackRecords.map((record, index) => {
            const IconComponent = record.icon;
            return (
              <div
                key={record.key}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center border border-gray-100 dark:border-gray-700"
              >
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 mb-4 bg-[#0b6d94]/10 rounded-xl">
                  <IconComponent className="w-6 h-6 md:w-7 md:h-7 text-[#0b6d94]" strokeWidth={2} />
                </div>

                {/* Value */}
                <div className="text-3xl md:text-4xl font-bold text-[#0b6d94] dark:text-aviation-blue-400 mb-2">
                  {t(`home.trackRecords.items.${record.key}.value`)}
                </div>

                {/* Description */}
                <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
                  {t(`home.trackRecords.items.${record.key}.description`)}
                </p>
              </div>
            );
          })}
        </div>

        {/* Achievement Timeline */}
        {(() => {
          const achievements = t('home.trackRecords.achievements', { returnObjects: true }) as Array<{ year: string; title: string; description: string; icon?: string }>;
          if (!achievements || !Array.isArray(achievements) || achievements.length === 0) return null;
          
          return (
            <div className="max-w-4xl mx-auto mb-16">
              <h3 className="text-2xl md:text-3xl font-bold text-center text-gray-900 dark:text-white mb-10">
                {t('home.trackRecords.achievementsTitle', 'Milestones That Define Us')}
              </h3>
              
              <div className="space-y-4">
                {achievements.map((achievement, index) => {
                  if (!achievement || !achievement.title) return null;
                  const IconComponent = iconMap[achievement.icon || 'award'] || Award;
                  
                  return (
                    <div
                      key={index}
                      className="flex items-center gap-4 bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700"
                    >
                      {/* Year Badge */}
                      <div className="flex-shrink-0 w-16 h-16 bg-[#0b6d94] rounded-xl flex items-center justify-center">
                        <span className="text-white font-bold text-sm">{achievement.year}</span>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <IconComponent className="w-4 h-4 text-[#0b6d94] flex-shrink-0" strokeWidth={2} />
                          <h4 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                            {achievement.title}
                          </h4>
                        </div>
                        {achievement.description && (
                          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                            {achievement.description}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })()}

        {/* Trust Badges */}
        {(() => {
          const trustedPartners = t('home.trackRecords.trustedPartners', { returnObjects: true }) as string[];
          return trustedPartners && trustedPartners.length > 0 ? (
            <div className="mt-16 text-center">
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-gray-300 dark:to-gray-600"></div>
                <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-[0.2em]">
                  {t('home.trackRecords.trustedBy', 'Trusted by Leading Airlines & MROs Worldwide')}
                </p>
                <div className="h-px w-12 bg-gradient-to-l from-transparent to-gray-300 dark:to-gray-600"></div>
              </div>
              <div className="flex flex-wrap justify-center items-center gap-8 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                {trustedPartners.map((partner, index) => (
                  <div key={index} className="bg-white dark:bg-gray-800 px-8 py-4 rounded-xl shadow-md">
                    <span className="text-2xl font-bold text-gray-400 dark:text-gray-500">{partner}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : null;
        })()}

        {/* Trusted Globally By */}
        {(() => {
          if (!trustedPartners || trustedPartners.length === 0) return null;
          
          // Create enough duplicates for seamless infinite scroll
          const repeatedPartners = [...trustedPartners, ...trustedPartners, ...trustedPartners, ...trustedPartners, ...trustedPartners, ...trustedPartners, ...trustedPartners, ...trustedPartners];
          
          return (
            <div className="mt-12 pt-12 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-gray-300 dark:to-gray-600"></div>
                <h2 className="font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-[0.2em]">
                  {t('home.trackRecords.trustedGloballyLabel', 'Trusted Globally By')}
                </h2>
                <div className="h-px w-12 bg-gradient-to-l from-transparent to-gray-300 dark:to-gray-600"></div>
              </div>
              
              {/* Infinite Scrolling Carousel - Direction aware for RTL */}
              <div className="relative overflow-hidden py-8" dir="ltr">
                {/* Fade edges */}
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-50 dark:from-gray-900 to-transparent z-10 pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-50 dark:from-gray-900 to-transparent z-10 pointer-events-none"></div>
                
                <div className={isRTL ? "carousel-track-right" : "carousel-track-left"}>
                  {repeatedPartners.map((partner, index) => (
                    <div
                      key={index}
                      className="carousel-item flex-shrink-0 flex items-center justify-center px-8 py-4 min-w-[200px]"
                    >
                      {/* Fixed-size logo container for consistent sizing */}
                      <div className="logo-container w-[160px] h-[60px] flex items-center justify-center">
                        {partner.logo ? (
                          <>
                            <img
                              src={partner.logo}
                              alt={partner.name}
                              title={partner.name}
                              className="partner-logo max-h-[60px] max-w-[160px] w-auto h-auto object-contain grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-500 ease-out hover:scale-110"
                              loading="eager"
                              referrerPolicy="no-referrer"
                              style={{ minHeight: '40px', minWidth: '60px' }}
                              onLoad={(e) => {
                                // Smart scaling: ensure small logos are scaled up appropriately
                                const img = e.currentTarget;
                                const naturalWidth = img.naturalWidth;
                                const naturalHeight = img.naturalHeight;
                                
                                // If logo is very small, scale it up while maintaining aspect ratio
                                if (naturalHeight < 40 || naturalWidth < 60) {
                                  const scaleFactorH = 50 / naturalHeight;
                                  const scaleFactorW = 120 / naturalWidth;
                                  const scaleFactor = Math.min(scaleFactorH, scaleFactorW, 3); // Max 3x scale
                                  if (scaleFactor > 1) {
                                    img.style.transform = `scale(${scaleFactor})`;
                                    img.style.transformOrigin = 'center';
                                  }
                                }
                              }}
                              onError={(e) => {
                                const target = e.currentTarget;
                                target.style.display = 'none';
                                const fallback = target.nextElementSibling as HTMLElement;
                                if (fallback) fallback.style.display = 'flex';
                              }}
                            />
                            <div 
                              className="partner-fallback hidden items-center justify-center w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-lg px-3 py-2"
                            >
                              <span className="text-sm font-bold text-gray-600 dark:text-gray-300 tracking-wide whitespace-nowrap text-center leading-tight">
                                {partner.name}
                              </span>
                            </div>
                          </>
                        ) : (
                          <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-lg px-3 py-2">
                            <span className="text-sm font-bold text-gray-600 dark:text-gray-300 tracking-wide whitespace-nowrap text-center leading-tight">
                              {partner.name}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })()}

        {/* Distributor Partners Carousel */}
        {(() => {
          if (!distributorPartners || distributorPartners.length === 0) return null;
          
          // Create enough duplicates for seamless infinite scroll
          const repeatedDistributors = [...distributorPartners, ...distributorPartners, ...distributorPartners, ...distributorPartners, ...distributorPartners, ...distributorPartners, ...distributorPartners, ...distributorPartners];
          
          return (
            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-gray-300 dark:to-gray-600"></div>
                <h2 className="font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-[0.2em]">
                  {t('home.trackRecords.distributorPartnersLabel', 'Our Distributor Partners')}
                </h2>
                <div className="h-px w-12 bg-gradient-to-l from-transparent to-gray-300 dark:to-gray-600"></div>
              </div>
              
              {/* Infinite Scrolling Carousel - Direction aware for RTL */}
              <div className="relative overflow-hidden py-8" dir="ltr">
                {/* Fade edges */}
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-50 dark:from-gray-900 to-transparent z-10 pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-50 dark:from-gray-900 to-transparent z-10 pointer-events-none"></div>
                
                <div className={isRTL ? "carousel-track-left" : "carousel-track-right"}>
                  {repeatedDistributors.map((partner, index) => (
                    <div
                      key={index}
                      className="carousel-item flex-shrink-0 flex items-center justify-center px-8 py-4 min-w-[200px]"
                    >
                      {/* Fixed-size logo container for consistent sizing */}
                      <div className="logo-container w-[160px] h-[60px] flex items-center justify-center">
                        {partner.logo ? (
                          <>
                            <img
                              src={partner.logo}
                              alt={partner.name}
                              title={partner.name}
                              className="distributor-logo max-h-[60px] max-w-[160px] w-auto h-auto object-contain grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-500 ease-out hover:scale-110"
                              loading="eager"
                              referrerPolicy="no-referrer"
                              style={{ minHeight: '40px', minWidth: '60px' }}
                              onLoad={(e) => {
                                // Smart scaling: ensure small logos are scaled up appropriately
                                const img = e.currentTarget;
                                const naturalWidth = img.naturalWidth;
                                const naturalHeight = img.naturalHeight;
                                
                                // If logo is very small, scale it up while maintaining aspect ratio
                                if (naturalHeight < 40 || naturalWidth < 60) {
                                  const scaleFactorH = 50 / naturalHeight;
                                  const scaleFactorW = 120 / naturalWidth;
                                  const scaleFactor = Math.min(scaleFactorH, scaleFactorW, 3); // Max 3x scale
                                  if (scaleFactor > 1) {
                                    img.style.transform = `scale(${scaleFactor})`;
                                    img.style.transformOrigin = 'center';
                                  }
                                }
                              }}
                              onError={(e) => {
                                const target = e.currentTarget;
                                target.style.display = 'none';
                                const fallback = target.nextElementSibling as HTMLElement;
                                if (fallback) fallback.style.display = 'flex';
                              }}
                            />
                            <div 
                              className="distributor-fallback hidden items-center justify-center w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-lg px-3 py-2"
                            >
                              <span className="text-sm font-bold text-gray-600 dark:text-gray-300 tracking-wide whitespace-nowrap text-center leading-tight">
                                {partner.name}
                              </span>
                            </div>
                          </>
                        ) : (
                          <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-lg px-3 py-2">
                            <span className="text-sm font-bold text-gray-600 dark:text-gray-300 tracking-wide whitespace-nowrap text-center leading-tight">
                              {partner.name}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })()}

        {/* Carousel Animation Styles - Direction-aware for RTL support */}
        <style>{`
          .carousel-track-left,
          .carousel-track-right {
            display: flex;
            width: fit-content;
            will-change: transform;
          }
          
          .carousel-track-left {
            animation: scroll-ltr 120s linear infinite;
          }
          
          .carousel-track-right {
            animation: scroll-rtl 120s linear infinite;
          }
          
          .carousel-track-left:hover,
          .carousel-track-right:hover {
            animation-play-state: paused;
          }
          
          /* LTR scrolling animation (works for both LTR and RTL layouts) */
          @keyframes scroll-ltr {
            0% {
              transform: translate3d(0, 0, 0);
            }
            100% {
              transform: translate3d(-50%, 0, 0);
            }
          }
          
          /* RTL scrolling animation (opposite direction) */
          @keyframes scroll-rtl {
            0% {
              transform: translate3d(-50%, 0, 0);
            }
            100% {
              transform: translate3d(0, 0, 0);
            }
          }
          
          .carousel-item {
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          }
          
          /* Logo container styling for consistent sizing */
          .logo-container {
            position: relative;
            overflow: hidden;
          }
          
          .logo-container img {
            /* Ensure images fill available space proportionally */
            object-fit: contain;
            object-position: center;
          }
          
          /* Handle very small SVG logos */
          .logo-container img[src*=".svg"] {
            min-height: 50px;
            width: auto;
          }
          
          /* Smooth scaling animation */
          .logo-container img {
            transition: transform 0.5s ease-out, filter 0.5s ease-out, opacity 0.5s ease-out;
          }
        `}</style>
      </div>
    </section>
  );
};

export default TrackRecordsSection;
