/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'gold': {
          50: '#fefbf3',
          100: '#fef7e0',
          200: '#fdecc4',
          300: '#fbda9c',
          400: '#f8c572',
          500: '#E1A140',  // Main gold color
          600: '#d6a832',
          700: '#c08b28',
          800: '#9d7024',
          900: '#7f5d20',
        },
        'puce': {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#532200',  // Main puce color
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        },
        'sand': {
          50: '#fefbf3',
          100: '#fef7e0',
          200: '#fdecc4',
          300: '#fbda9c',
          400: '#f8c572',
          500: '#EFCFA0',  // Main sand dollar color
          600: '#d6a832',
          700: '#c08b28',
          800: '#9d7024',
          900: '#7f5d20',
        },
        'orange': {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#914110',  // Main burnt orange color
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
};