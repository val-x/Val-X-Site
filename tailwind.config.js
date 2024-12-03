/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        blue: "#2997FF",
        gray: {
          DEFAULT: "#86868b",
          100: "#94928d",
          200: "#afafaf",
          300: "#42424570",
        },
        zinc: "#101010",
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#9ca3af',
            h1: {
              color: '#fff',
            },
            h2: {
              color: '#fff',
            },
            h3: {
              color: '#fff',
            },
            strong: {
              color: '#fff',
            },
            a: {
              color: '#60a5fa',
              '&:hover': {
                color: '#3b82f6',
              },
            },
            code: {
              color: '#fff',
              backgroundColor: '#374151',
              padding: '0.25rem',
              borderRadius: '0.25rem',
            },
          },
        },
      },
      perspective: {
        '1000': '1000px',
      },
      transitionProperty: {
        'transform': 'transform',
      },
      keyframes: {
        'text-shine': {
          '0%': {
            'background-size': '200% 100%',
            'background-position': '100% 50%'
          },
          '100%': {
            'background-size': '200% 100%',
            'background-position': '0% 50%'
          }
        },
        'float-1': {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
          '50%': { transform: 'translate(10px, -10px) rotate(45deg)' },
        },
        'float-2': {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
          '50%': { transform: 'translate(-15px, 10px) rotate(-45deg)' },
        },
        'float-3': {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
          '50%': { transform: 'translate(15px, 15px) rotate(90deg)' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'shimmer': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      },
      animation: {
        'text-shine': 'text-shine 3s linear infinite',
        'float-1': 'float-1 4s ease-in-out infinite',
        'float-2': 'float-2 6s ease-in-out infinite',
        'float-3': 'float-3 5s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 3s ease infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 3s infinite',
      },
      backgroundImage: {
        'gradient-conic': 'conic-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-hide': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
        '.perspective-1000': {
          'perspective': '1000px',
        },
      });
    },
    require('@tailwindcss/aspect-ratio'),
  ],
};