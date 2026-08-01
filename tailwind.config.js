/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        amber: {
          50: 'var(--amber-50)',
          100: 'var(--amber-100)',
          500: 'var(--amber-500)',
          600: 'var(--amber-600)',
          700: 'var(--amber-700)'
        },
        stone: {
          50: 'var(--stone-50)',
          100: 'var(--stone-100)',
          200: 'var(--stone-200)',
          400: 'var(--stone-400)',
          500: 'var(--stone-500)',
          700: 'var(--stone-700)',
          900: 'var(--stone-900)'
        }
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.25rem'
      },
      fontFamily: {
        sans: ["Inter", 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: []
};
