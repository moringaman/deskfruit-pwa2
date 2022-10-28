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
      yellow: colors.amber,
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      blue: '#176CBF',
      transparent: 'transparent',
      green: colors.green

    },
    extend: {
      backgroundImage: theme => ({
           'hero-pattern': "url('/public/background.png')",
        })
    },
  },
  plugins: [],
}
