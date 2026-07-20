/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          900: '#0a0705',
          800: '#120c08',
          700: '#1c130d',
          600: '#271a12',
        },
        wood: {
          50: '#f7f0e8',
          100: '#e8d9c5',
          200: '#d4b896',
          300: '#bd9a6b',
          400: '#a87d4a',
          500: '#8a6235',
          600: '#6e4d29',
          700: '#553a20',
          800: '#3d2917',
          900: '#2a1c10',
        },
        chili: {
          400: '#d94545',
          500: '#c0392b',
          600: '#a52a1e',
          700: '#8b2018',
          800: '#6e1812',
        },
        ember: {
          300: '#ffb347',
          400: '#ff9a3c',
          500: '#f57c00',
          600: '#e06800',
          700: '#c25500',
        },
        cream: {
          50: '#fdfaf5',
          100: '#faf3e8',
          200: '#f2e6d0',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        accent: ['"Bebas Neue"', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(245,124,0,0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(245,124,0,0.6)' },
        },
      },
    },
  },
  plugins: [],
};
