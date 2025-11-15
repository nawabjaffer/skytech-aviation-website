import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDarkMode } from '../contexts/DarkModeContext';

const DarkModeToggle: React.FC = () => {
  const { t } = useTranslation();
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 rounded-lg bg-white/10 hover:bg-white/20 dark:bg-gray-800 dark:hover:bg-gray-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-sky-blue"
      aria-label={t('theme.toggle')}
      title={isDarkMode ? t('theme.light') : t('theme.dark')}
    >
      {isDarkMode ? (
        // Sun icon for light mode
        <svg
          className="w-5 h-5 text-yellow-400"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ) : (
        // Moon icon for dark mode
        <svg
          className="w-5 h-5 text-gray-200"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      )}
    </button>
  );
};

export default DarkModeToggle;
