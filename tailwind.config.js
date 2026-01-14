/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        'aviation-blue': {
          DEFAULT: '#0b6d94',
          50: '#f0fafb',
          100: '#d4eef4',
          200: '#a9dde9',
          300: '#6ec4d9',
          400: '#35a5c3',
          500: '#1a8bab',
          600: '#0b6d94',
          700: '#0a5a7a',
          800: '#094a64',
          900: '#073d53',
        },
        'sky-blue': {
          DEFAULT: '#0b6d94',
          50: '#f0fafb',
          100: '#d4eef4',
          200: '#a9dde9',
          300: '#6ec4d9',
          400: '#35a5c3',
          500: '#1a8bab',
          600: '#0b6d94',
          700: '#0a5a7a',
          800: '#094a64',
          900: '#073d53',
        },
        'accent-gold': {
          DEFAULT: '#f59e0b',
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Open Sans', 'system-ui', 'sans-serif'],
        heading: ['Poppins', 'Inter', 'sans-serif'],
        arabic: ['Cairo', 'Tajawal', 'sans-serif'],
        chinese: ['Noto Sans SC', 'Microsoft YaHei', 'SimHei', 'Heiti SC', 'sans-serif'],
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      screens: {
        'mobile': '320px',
        'tablet': '768px',
        'desktop': '1024px',
        'xl': '1440px',
      },
      animation: {
        'marquee': 'marquee 20s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}

