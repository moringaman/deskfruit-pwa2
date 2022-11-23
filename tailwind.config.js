/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

module.exports = {
  content: [
     "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
     screens: {
      'tablet': '640px',
      'laptop': '1024px',
      'desktop': '1280px',
    },
    colors: {
      red: colors.red,
      orange: colors.orange,
      yellow: colors.amber,
      black: colors.black,
      gray: colors.gray,
      white: '#FFFFFF',
      blue: '#176CBF',
      transparent: 'transparent',
      green: colors.green

    },
    extend: {
      backgroundImage: theme => ({
           'hero-pattern': "url('/public/background.png')",
        }),
        keyframes: {
          'swipe-up': {
            '0%': {
              transform: 'translateY(0)'
            }
          },
          'swipe-down': {
            '0%': {
              transform: 'translateY(0)'
            },
            '50%': {
              transform: 'translateY(222px)',
              // opacity: "0"
            },
             '100%': {
              transform: 'translateY(0)'
            }
          }

        },
        animation: {
            'swipe-down': 'swipe-down 2.5s ease-in-out infinite',
            'swipe-up': 'swipe-up 2.5s ease-out',
        }
    },
  },
  plugins: [],
}
