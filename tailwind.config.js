/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#FDFBF7',
          100: '#F7EEDF',
          200: '#EBDCBF',
          300: '#DEC49B',
          400: '#CCA368',
          500: '#B88846', // Primary luxury gold
          600: '#A17334',
          700: '#7F5724',
          800: '#5F3F19',
          900: '#3D270E',
        },
        maroon: {
          50: '#FDF2F3',
          100: '#FBE4E7',
          700: '#67101C',
          800: '#4E0C16',
          900: '#3B070F',
          950: '#230308',
        },
        luxury: {
          dark: '#0E0E0E',
          card: '#161616',
          ivory: '#FBF9F5',
          cream: '#F5EFEB',
          sand: '#ECE5DB',
          border: '#E5DACB',
        }
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'Cormorant Garamond', 'Cinzel', 'Playfair Display', 'serif'],
        cinzel: ['var(--font-cinzel)', 'Cinzel', 'serif'],
        sans: ['var(--font-montserrat)', 'Montserrat', 'sans-serif'],
      },
      letterSpacing: {
        widest: '.2em',
        ultra: '.3em',
      }
    },
  },
  plugins: [],
};
