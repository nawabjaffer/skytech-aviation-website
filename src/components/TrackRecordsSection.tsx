import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  TrendingUp, 
  Users, 
  Globe, 
  Package, 
  Clock, 
  Award,
  CheckCircle2,
  Plane
} from 'lucide-react';

const TrackRecordsSection: React.FC = () => {
  const { t } = useTranslation();

  const trackRecords = [
    {
      key: 'deliveries',
      icon: Package,
      value: '50,000+',
      description: 'Successful Parts Deliveries'
    },
    {
      key: 'clients',
      icon: Users,
      value: '500+',
      description: 'Satisfied Global Clients'
    },
    {
      key: 'countries',
      icon: Globe,
      value: '60+',
      description: 'Countries Served Worldwide'
    },
    {
      key: 'response',
      icon: Clock,
      value: '< 2hrs',
      description: 'Average Quote Response Time'
    }
  ];

  const achievements = [
    {
      year: '2023',
      title: 'Aviation Excellence Award',
      description: 'Recognized for outstanding service quality and customer satisfaction at the Middle East Aviation Summit',
      icon: Award
    },
    {
      year: '2022',
      title: 'Best Parts Supplier',
      description: 'Named Best Aviation Parts Supplier in the UAE for exceptional supply chain management',
      icon: TrendingUp
    },
    {
      year: '2021',
      title: 'Safety Excellence',
      description: 'Zero quality incidents maintaining 100% compliance with international aviation standards',
      icon: CheckCircle2
    },
    {
      year: '2020',
      title: 'Global Expansion',
      description: 'Successfully expanded distribution network to 50+ countries across 5 continents',
      icon: Plane
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 via-aviation-blue-50 to-gray-50 dark:from-gray-900 dark:via-aviation-blue-900/10 dark:to-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-aviation-blue-100 dark:bg-aviation-blue-900/30 text-aviation-blue-600 dark:text-aviation-blue-400 text-sm font-semibold rounded-full mb-4">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {trackRecords.map((record, index) => {
            const IconComponent = record.icon;
            return (
              <div
                key={record.key}
                className="relative bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden group"
              >
                {/* Background Decoration */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-aviation-blue-100 dark:bg-aviation-blue-900/20 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-500"></div>
                
                {/* Icon */}
                <div className="relative z-10 inline-flex items-center justify-center w-16 h-16 mb-6 bg-gradient-to-br from-aviation-blue-500 to-aviation-blue-700 rounded-2xl shadow-lg">
                  <IconComponent className="w-8 h-8 text-white" strokeWidth={2} />
                </div>

                {/* Value */}
                <div className="relative z-10 text-4xl md:text-5xl font-bold text-aviation-blue-600 dark:text-aviation-blue-400 mb-2">
                  {record.value}
                </div>

                {/* Description */}
                <p className="relative z-10 text-gray-600 dark:text-gray-400 font-medium">
                  {t(`home.trackRecords.items.${record.key}`, record.description)}
                </p>
              </div>
            );
          })}
        </div>

        {/* Achievement Timeline */}
        <div className="max-w-5xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            {t('home.trackRecords.achievementsTitle', 'Milestones That Define Us')}
          </h3>
          
          <div className="space-y-8">
            {achievements.map((achievement, index) => {
              const IconComponent = achievement.icon;
              const isEven = index % 2 === 0;
              
              return (
                <div
                  key={index}
                  className={`flex flex-col md:flex-row items-center gap-6 ${isEven ? '' : 'md:flex-row-reverse'}`}
                >
                  {/* Year Badge */}
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 bg-gradient-to-br from-aviation-blue-600 to-aviation-blue-700 rounded-full flex items-center justify-center shadow-xl">
                      <span className="text-white font-bold text-lg">{achievement.year}</span>
                    </div>
                  </div>

                  {/* Content Card */}
                  <div className={`flex-1 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow ${isEven ? 'md:text-left' : 'md:text-right'}`}>
                    <div className={`flex items-center gap-3 mb-3 ${isEven ? '' : 'md:flex-row-reverse'}`}>
                      <div className="p-2 bg-aviation-blue-100 dark:bg-aviation-blue-900/30 rounded-lg">
                        <IconComponent className="w-5 h-5 text-aviation-blue-600 dark:text-aviation-blue-400" strokeWidth={2} />
                      </div>
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                        {achievement.title}
                      </h4>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {achievement.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-20 text-center">
          <p className="text-gray-500 dark:text-gray-400 mb-8 font-medium">
            {t('home.trackRecords.trustedBy', 'Trusted by Leading Airlines & MROs Worldwide')}
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
            <div className="bg-white dark:bg-gray-800 px-8 py-4 rounded-xl shadow-md">
              <span className="text-2xl font-bold text-gray-400 dark:text-gray-500">Emirates</span>
            </div>
            <div className="bg-white dark:bg-gray-800 px-8 py-4 rounded-xl shadow-md">
              <span className="text-2xl font-bold text-gray-400 dark:text-gray-500">Etihad</span>
            </div>
            <div className="bg-white dark:bg-gray-800 px-8 py-4 rounded-xl shadow-md">
              <span className="text-2xl font-bold text-gray-400 dark:text-gray-500">Qatar Airways</span>
            </div>
            <div className="bg-white dark:bg-gray-800 px-8 py-4 rounded-xl shadow-md">
              <span className="text-2xl font-bold text-gray-400 dark:text-gray-500">Air Arabia</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrackRecordsSection;
