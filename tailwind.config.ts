import type { Config } from 'tailwindcss'

export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './composables/**/*.{js,ts}',
    './plugins/**/*.{js,ts}',
    './utils/**/*.{js,ts}',
    './app.vue',
    './error.vue',
  ],
  theme: {
    extend: {
      colors: {
        // Primary brand colors
        primary: {
          DEFAULT: '#4618ac',
          50: '#f5f0ff',
          100: '#ede5ff',
          200: '#dcceff',
          300: '#c3a8ff',
          400: '#a574ff',
          500: '#8b3dff',
          600: '#7c1aff',
          700: '#6d0aed',
          800: '#5b0bc7',
          900: '#4618ac',
          950: '#2c0e6c',
        },
        // Filter/sidebar background
        filter: {
          DEFAULT: '#5825cc',
          dark: '#3d1a91',
        },
        // Accent yellow
        accent: {
          DEFAULT: '#fad318',
          50: '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#facc15',
          500: '#fad318',
          600: '#ca8a04',
          700: '#a16207',
          800: '#854d0e',
          900: '#713f12',
        },
        // Muted purple text
        muted: {
          DEFAULT: '#b3aac9',
          light: '#d4cfe5',
          dark: '#8a7fa8',
        },
        // Dark overlay
        overlay: 'rgba(0, 0, 0, 0.7)',
        // Card background
        card: {
          DEFAULT: '#2c0e6c',
          hover: '#3d1a91',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Arial', 'Helvetica', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        'container': '1240px',
      },
      gridTemplateColumns: {
        'sidebar': '220px calc(100% - 240px)',
        'products': 'repeat(4, 1fr)',
        'products-3': 'repeat(3, 1fr)',
        'products-2': 'repeat(2, 1fr)',
      },
      spacing: {
        'sidebar': '220px',
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -2px rgba(0, 0, 0, 0.2)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -4px rgba(0, 0, 0, 0.3)',
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config
