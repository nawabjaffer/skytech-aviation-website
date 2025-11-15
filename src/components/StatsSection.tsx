import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

interface StatItemProps {
  end: number;
  label: string;
  suffix?: string;
  prefix?: string;
  duration?: number;
}

const StatItem: React.FC<StatItemProps> = ({
  end,
  label,
  suffix = '',
  prefix = '',
  duration = 2000,
}) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            animateCount();
          }
        });
      },
      { threshold: 0.3 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [hasAnimated]);

  const animateCount = () => {
    const startTime = Date.now();
    const step = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(easeOutQuart * end);
      
      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  };

  const formatNumber = (num: number): string => {
    return num.toLocaleString();
  };

  return (
    <div ref={elementRef} className="text-center">
      <div className="text-5xl md:text-6xl font-bold text-blue-100 dark:text-blue-300 mb-2">
        {prefix}
        {formatNumber(count)}
        {suffix}
      </div>
      <div className="text-lg md:text-xl text-cyan-100 dark:text-cyan-300 font-medium">
        {label}
      </div>
    </div>
  );
};

const StatsSection: React.FC = () => {
  const { t } = useTranslation();

  const stats = [
    {
      key: 'years',
      end: 15,
      suffix: '+',
    },
    {
      key: 'parts',
      end: 10000,
      suffix: '+',
    },
    {
      key: 'countries',
      end: 25,
      suffix: '+',
    },
    {
      key: 'airlines',
      end: 50,
      suffix: '+',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-900 to-blue-700 dark:from-blue-950 dark:to-blue-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t('home.stats.title')}
          </h2>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {stats.map((stat) => (
            <StatItem
              key={stat.key}
              end={stat.end}
              label={t(`home.stats.${stat.key}`)}
              suffix={stat.suffix}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
