/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1d4ed8',
        secondary: '#64748b',
        accent: '#f59e0b',
        dark: '#0f172a',
        card: '#1e293b',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scan': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(200%)' },
        }
      },
      animation: {
        'fade-in': 'fade-in 0.6s ease-out forwards',
        'scan': 'scan 2s ease-in-out infinite',
      }
    },
  },
  plugins: [],
};
