import React, { useEffect, useState, useRef } from 'react';
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
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import partnersData from '../data/partners.json';

gsap.registerPlugin(ScrollTrigger);

interface Partner {
  name: string;
  logo?: string;
}

const TrackRecordsSection: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [isRTL, setIsRTL] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const statsGridRef = useRef<HTMLDivElement>(null);

  // Detect RTL language
  useEffect(() => {
    const rtlLanguages = ['ar', 'he', 'fa', 'ur'];
    setIsRTL(rtlLanguages.includes(i18n.language));
  }, [i18n.language]);

  // GSAP animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate header
      if (headerRef.current && headerRef.current.children.length > 0) {
        gsap.fromTo(
          headerRef.current.children,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.18,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Animate stats grid items with scale
      if (statsGridRef.current && statsGridRef.current.children.length > 0) {
        gsap.fromTo(
          statsGridRef.current.children,
          { opacity: 0, y: 40, scale: 0.85 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'back.out(1.5)',
            scrollTrigger: {
              trigger: statsGridRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

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
    <section ref={sectionRef} className="py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-16">
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
        <div ref={statsGridRef} className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-16">
          {trackRecords.map((record, index) => {
            const IconComponent = record.icon;
            return (
              <div
                key={record.key}
                className="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center border border-gray-100 dark:border-gray-700 overflow-hidden"
              >
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 mb-3 sm:mb-4 bg-[#0b6d94]/10 rounded-xl">
                  <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-[#0b6d94]" strokeWidth={2} />
                </div>

                {/* Value */}
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0b6d94] dark:text-aviation-blue-400 mb-1 sm:mb-2 whitespace-nowrap">
                  {t(`home.trackRecords.items.${record.key}.value`)}
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-400 leading-tight">
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
              <div className="relative overflow-hidden py-12" dir="ltr">
                {/* Fade edges */}
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-50 dark:from-gray-900 to-transparent z-10 pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-50 dark:from-gray-900 to-transparent z-10 pointer-events-none"></div>
                
                <div className={`ripple-carousel ${isRTL ? "carousel-track-right" : "carousel-track-left"}`}>
                  {repeatedPartners.map((partner, index) => (
                    <div
                      key={index}
                      className="carousel-item ripple-item flex-shrink-0 flex items-center justify-center px-6 py-6 min-w-[220px]"
                      data-index={index}
                    >
                      {/* Fixed-size logo container for consistent sizing - increased for hover */}
                      <div className="logo-container w-[180px] h-[80px] flex items-center justify-center overflow-visible">
                        {partner.logo ? (
                          <>
                            <img
                              src={partner.logo}
                              alt={partner.name}
                              title={partner.name}
                              className="partner-logo max-h-[70px] max-w-[170px] w-auto h-auto object-contain transition-all duration-500 ease-out"
                              loading="eager"
                              referrerPolicy="no-referrer"
                              style={{ minHeight: '45px', minWidth: '70px' }}
                              onError={(e) => {
                                const target = e.currentTarget;
                                target.style.display = 'none';
                                const fallback = target.nextElementSibling as HTMLElement;
                                if (fallback) fallback.style.display = 'flex';
                              }}
                            />
                            <div 
                              className="partner-fallback hidden items-center justify-center w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-lg px-4 py-3"
                            >
                              <span className="text-sm font-bold text-gray-600 dark:text-gray-300 tracking-wide whitespace-nowrap text-center leading-tight">
                                {partner.name}
                              </span>
                            </div>
                          </>
                        ) : (
                          <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-lg px-4 py-3">
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
              <div className="relative overflow-hidden py-12" dir="ltr">
                {/* Fade edges */}
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-50 dark:from-gray-900 to-transparent z-10 pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-50 dark:from-gray-900 to-transparent z-10 pointer-events-none"></div>
                
                <div className={`ripple-carousel ${isRTL ? "carousel-track-left" : "carousel-track-right"}`}>
                  {repeatedDistributors.map((partner, index) => (
                    <div
                      key={index}
                      className="carousel-item ripple-item flex-shrink-0 flex items-center justify-center px-6 py-6 min-w-[220px]"
                      data-index={index}
                    >
                      {/* Fixed-size logo container for consistent sizing - increased for hover */}
                      <div className="logo-container w-[180px] h-[80px] flex items-center justify-center overflow-visible">
                        {partner.logo ? (
                          <>
                            <img
                              src={partner.logo}
                              alt={partner.name}
                              title={partner.name}
                              className="distributor-logo max-h-[70px] max-w-[170px] w-auto h-auto object-contain transition-all duration-500 ease-out"
                              loading="eager"
                              referrerPolicy="no-referrer"
                              style={{ minHeight: '45px', minWidth: '70px' }}
                              onError={(e) => {
                                const target = e.currentTarget;
                                target.style.display = 'none';
                                const fallback = target.nextElementSibling as HTMLElement;
                                if (fallback) fallback.style.display = 'flex';
                              }}
                            />
                            <div 
                              className="distributor-fallback hidden items-center justify-center w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-lg px-4 py-3"
                            >
                              <span className="text-sm font-bold text-gray-600 dark:text-gray-300 tracking-wide whitespace-nowrap text-center leading-tight">
                                {partner.name}
                              </span>
                            </div>
                          </>
                        ) : (
                          <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-lg px-4 py-3">
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

        {/* Carousel Animation Styles - Direction-aware for RTL support with Liquidify Ripple Effect */}
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
            transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
          }
          
          /* Logo container styling for consistent sizing - no overflow hidden */
          .logo-container {
            position: relative;
            overflow: visible;
          }
          
          .logo-container img {
            /* Ensure images fill available space proportionally */
            object-fit: contain;
            object-position: center;
          }
          
          /* Handle very small SVG logos */
          .logo-container img[src*=".svg"] {
            min-height: 55px;
            width: auto;
          }
          
          /* Smooth scaling animation with liquidify effect */
          .logo-container img {
            transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), 
                        filter 0.4s ease-out, 
                        opacity 0.4s ease-out;
          }
          
          /* ====== THREAD-CONNECTED FLOWING ANIMATION ====== */
          
          /* Thread item base state - smooth flowing motion */
          .ripple-item {
            transform: scale(1);
            transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            transform-origin: center center;
            position: relative;
          }
          
          /* Hovered item - smooth scale with glow */
          .ripple-item:hover {
            transform: scale(1.15);
            z-index: 20;
          }
          
          .ripple-item:hover .logo-container img {
            transform: scale(1.08);
            filter: drop-shadow(0 6px 16px rgba(11, 109, 148, 0.25));
          }
          
          /* Connected thread effect - adjacent items flow together */
          .ripple-item:hover + .ripple-item {
            transform: scale(1.08) translateX(4px);
            z-index: 18;
          }
          
          .ripple-item:has(+ .ripple-item:hover) {
            transform: scale(1.08) translateX(-4px);
            z-index: 18;
          }
          
          /* Second-level connected neighbors - subtle connection */
          .ripple-item:hover + .ripple-item + .ripple-item {
            transform: scale(1.04) translateX(2px);
            z-index: 16;
          }
          
          .ripple-item:has(+ .ripple-item + .ripple-item:hover) {
            transform: scale(1.04) translateX(-2px);
            z-index: 16;
          }
          
          /* Thread connection line effect with hover */
          .ripple-item:hover .logo-container::before {
            content: '';
            position: absolute;
            left: 100%;
            top: 50%;
            width: 8px;
            height: 2px;
            background: linear-gradient(to right, rgba(11, 109, 148, 0.4), transparent);
            transform: translateY(-50%);
            animation: threadPulse 0.6s ease-in-out;
          }
          
          .ripple-item:has(+ .ripple-item:hover) .logo-container::after {
            content: '';
            position: absolute;
            right: 100%;
            top: 50%;
            width: 8px;
            height: 2px;
            background: linear-gradient(to left, rgba(11, 109, 148, 0.4), transparent);
            transform: translateY(-50%);
            animation: threadPulse 0.6s ease-in-out;
          }
          
          /* Thread pulse animation - items connected in flow */
          @keyframes threadPulse {
            0% {
              opacity: 0;
              width: 0;
            }
            50% {
              opacity: 1;
            }
            100% {
              opacity: 0;
              width: 8px;
            }
          }
          
          /* Subtle glow connecting the items */
          .ripple-item:hover .logo-container::after {
            content: '';
            position: absolute;
            inset: -8px -4px -8px -4px;
            background: radial-gradient(ellipse 120% 100% at center, rgba(11, 109, 148, 0.12) 0%, transparent 70%);
            border-radius: 50%;
            z-index: -1;
            animation: threadGlow 0.8s ease-in-out;
          }
          
          @keyframes threadGlow {
            0%, 100% {
              opacity: 0.4;
              transform: scale(0.95);
            }
            50% {
              opacity: 0.8;
              transform: scale(1.05);
            }
          }
          
          /* Smooth transition when leaving hover - items flow back */
          .ripple-carousel .ripple-item {
            transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          }
          
          /* Ensure images are visible with full color */
          .partner-logo,
          .distributor-logo {
            filter: none !important;
            opacity: 1 !important;
          }
        `}</style>
      </div>
    </section>
  );
};

export default TrackRecordsSection;
