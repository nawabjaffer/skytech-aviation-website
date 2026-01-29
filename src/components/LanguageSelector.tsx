import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

interface LanguageSelectorProps {
  className?: string;
  compact?: boolean;
  dropdownAlign?: 'start' | 'end';
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  className = '',
  compact = false,
  dropdownAlign = 'end',
}) => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    if (!isOpen) return;
    const handleResizeOrScroll = () => setIsOpen(false);
    window.addEventListener('resize', handleResizeOrScroll);
    window.addEventListener('scroll', handleResizeOrScroll, { passive: true });
    return () => {
      window.removeEventListener('resize', handleResizeOrScroll);
      window.removeEventListener('scroll', handleResizeOrScroll);
    };
  }, [isOpen]);

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'ar', name: 'العربية', flag: '🇦🇪' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
  ];

  const handleLanguageChange = (code: string) => {
    i18n.changeLanguage(code);
    setIsOpen(false);
  };

  const currentLanguage = i18n.language || 'en';
  const currentLang = languages.find((lang) => lang.code === currentLanguage);

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={
          compact
            ? 'w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 dark:bg-gray-800 dark:hover:bg-gray-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-sky-blue'
            : 'flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 dark:bg-gray-800 dark:hover:bg-gray-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-sky-blue'
        }
        aria-label="Select language"
      >
        {compact ? (
          <span className="flex flex-col items-center justify-center leading-none" aria-hidden="true">
            <Globe className="w-3 h-3 sm:w-4 sm:h-4 text-white/90" />
            <span className="mt-0.5 text-[10px] sm:text-[10px] font-semibold tracking-wide text-white/90">
              {(currentLang?.code || 'EN').toUpperCase()}
            </span>
          </span>
        ) : (
          <>
            <span className="text-xl">{currentLang?.flag}</span>
            <span className="hidden tablet:inline text-white text-sm font-medium">
              {currentLang?.code.toUpperCase()}
            </span>
            <svg
              className={`w-4 h-4 text-white transition-transform duration-200 ${
                isOpen ? 'rotate-180' : ''
              }`}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path d="M19 9l-7 7-7-7" />
            </svg>
          </>
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div
            className="absolute mt-2 w-48 max-w-[calc(100vw-1.5rem)] bg-white dark:bg-gray-800 rounded-lg shadow-xl z-50 overflow-hidden border border-gray-200 dark:border-gray-700 max-h-[min(60vh,20rem)] overflow-y-auto"
            style={
              dropdownAlign === 'start'
                ? ({ insetInlineStart: 0 } as React.CSSProperties)
                : ({ insetInlineEnd: 0 } as React.CSSProperties)
            }
          >
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors duration-200 ${
                  currentLanguage === lang.code
                    ? 'bg-sky-blue-50 dark:bg-sky-blue-900/20 text-sky-blue-700 dark:text-sky-blue-400'
                    : 'hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200'
                }`}
              >
                <span className="text-2xl">{lang.flag}</span>
                <span className="font-medium">{lang.name}</span>
                {currentLanguage === lang.code && (
                  <svg
                    className="ml-auto w-5 h-5 text-sky-blue-600 dark:text-sky-blue-400"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default LanguageSelector;
