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
            color: '#fff',
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
              color: '#3b82f6',
              '&:hover': {
                color: '#60a5fa',
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
        }
      },
      animation: {
        'text-shine': 'text-shine 3s linear infinite'
      }
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
  ],
};