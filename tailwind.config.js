/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#bd1e23',
        'primary-dark': '#a01a1e',
        'primary-light': '#d42a2f',
        secondary: '#1a472a',
        'secondary-dark': '#143d23',
        'secondary-light': '#1f5432',
        gold: '#c9a962',
        'gold-light': '#d4bc7d',
        cream: '#faf8f5',
        'cream-dark': '#f5f0e8',
      },
      fontFamily: {
        sans: ['Lato', 'sans-serif'],
        serif: ['Cormorant Garamond', 'serif'],
        display: ['Italianno', 'cursive'],
      },
      animation: {
        'bounce-delayed-1': 'bounce 1s infinite 0.2s',
        'bounce-delayed-2': 'bounce 1s infinite',
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'fade-in-down': 'fadeInDown 0.8s ease-out forwards',
        'fade-in-left': 'fadeInLeft 0.8s ease-out forwards',
        'fade-in-right': 'fadeInRight 0.8s ease-out forwards',
        'scale-in': 'scaleIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-down': 'slideDown 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'reveal-text': 'revealText 1s cubic-bezier(0.77, 0, 0.175, 1) forwards',
        'underline-grow': 'underlineGrow 0.6s ease-out forwards',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'ken-burns': 'kenBurns 20s ease-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'stagger-1': 'fadeInUp 0.8s ease-out 0.1s forwards',
        'stagger-2': 'fadeInUp 0.8s ease-out 0.2s forwards',
        'stagger-3': 'fadeInUp 0.8s ease-out 0.3s forwards',
        'stagger-4': 'fadeInUp 0.8s ease-out 0.4s forwards',
        'stagger-5': 'fadeInUp 0.8s ease-out 0.5s forwards',
      },
      keyframes: {
        bounce: {
          '0%, 100%': {
            transform: 'translateY(-25%)',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
          },
          '50%': {
            transform: 'translateY(0)',
            animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
          },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeInRight: {
          '0%': { opacity: '0', transform: 'translateX(40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        revealText: {
          '0%': { clipPath: 'inset(0 100% 0 0)' },
          '100%': { clipPath: 'inset(0 0 0 0)' },
        },
        underlineGrow: {
          '0%': { transform: 'scaleX(0)', transformOrigin: 'left' },
          '100%': { transform: 'scaleX(1)', transformOrigin: 'left' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(189, 30, 35, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(189, 30, 35, 0.6)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        kenBurns: {
          '0%': { transform: 'scale(1) translate(0, 0)' },
          '50%': { transform: 'scale(1.1) translate(-1%, -1%)' },
          '100%': { transform: 'scale(1) translate(0, 0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
      boxShadow: {
        'elegant': '0 4px 20px -2px rgba(0, 0, 0, 0.1), 0 2px 8px -2px rgba(0, 0, 0, 0.06)',
        'elegant-lg': '0 10px 40px -5px rgba(0, 0, 0, 0.15), 0 4px 16px -4px rgba(0, 0, 0, 0.1)',
        'elegant-xl': '0 20px 60px -10px rgba(0, 0, 0, 0.2), 0 8px 24px -8px rgba(0, 0, 0, 0.1)',
        'glow-primary': '0 0 30px rgba(189, 30, 35, 0.3)',
        'glow-secondary': '0 0 30px rgba(26, 71, 42, 0.3)',
        'inner-glow': 'inset 0 0 20px rgba(255, 255, 255, 0.1)',
      },
      backdropBlur: {
        'xs': '2px',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      letterSpacing: {
        'ultra-wide': '0.2em',
        'super-wide': '0.3em',
      },
    },
  },
  plugins: [],
};