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
    zIndex: {
      '0': 0,
      '10': 10,
      '20': 20,
      '30': 30,
    },
    colors: {
      red: colors.red,
      orange: colors.orange,
      yellow: colors.amber,
      black: '#212427',
      gray: '#929495',
      white: '#FFFFFF',
      blue: '#176CBF',
      transparent: 'transparent',
      green: '#1AA620',
      green2: '#517976',
      ashGray: '#929495',
      midGray: '#292828',
      goldCrayola: '#E8BD80',
      goldCrayola2: '#FDE9B7',
      brown: '#847672',
      nickel: '#7A7871',
      cadet: '#586669',
      camel: '#B59370',
      morningBlue: '#889D9B',
      morningBlue2: '#7E9493',
      xanadu: '#788A88',
      lemonMeringue: '#FBF1CD',
      honeydew: '#D8F3E5',
      
    },
    extend: {
      blur: {
        xs: '2px',
      },
      gradientColorStops: {
         'gradient-top-gold': '180deg, goldCrayola, goldCrayola2',
        // Define your gradients using the same values as above
        'gradient-bottom': '180deg, #AAB4A8ff, #E8BD80ff, #7A7871ff, #586669ff, #B59370ff, #889D9Bff, #7E9493ff, #788A88ff, #FBF1CDff, #D8F3E5ff',
        'gradient-left': '270deg, #AAB4A8ff, #E8BD80ff, #7A7871ff, #586669ff, #B59370ff, #889D9Bff, #7E9493ff, #788A88ff, #FBF1CDff, #D8F3E5ff',
        'gradient-top-right': '45deg, #AAB4A8ff, #E8BD80ff, #7A7871ff, #586669ff, #B59370ff, #889D9Bff, #7E9493ff, #788A88ff, #FBF1CDff, #D8F3E5ff',
        'gradient-bottom-right': '135deg, #AAB4A8ff, #E8BD80ff, #7A7871ff, #586669ff, #B59370ff, #889D9Bff, #7E9493ff, #788A88ff, #FBF1CDff, #D8F3E5ff',
        'top-left': '#AAB4A8ff 0%, #E8BD80ff 10%, #7A7871ff 20%, #586669ff 30%, #B59370ff 40%, #889D9Bff 50%, #7E9493ff 60%, #788A88ff 70%, #FBF1CDff 80%, #D8F3E5ff 90%',
        'bottom-left': '#AAB4A8ff 0%, #E8BD80ff 10%, #7A7871ff 20%, #586669ff 30%, #B59370ff 40%, #889D9Bff 50%, #7E9493ff 60%, #788A88ff 70%, #FBF1CDff 80%, #D8F3E5ff 90%',
        'gradient-radial': '#AAB4A8ff 0%, #E8BD80ff 10%, #7A7871ff 20%, #586669ff 30%, #B59370ff 40%, #889D9Bff 50%, #7E9493ff 60%, #788A88ff 70%, #FBF1CDff 80%, #D8F3E5ff 90%'
      },
      backgroundImage: theme => ({
           'hero-pattern': "url('/public/background.png')",
           'gradient-top-sandy': 'linear-gradient(145deg, #FDE9B7 31.51%, #E8BD80 79.82%)',
           'gradient-top-green': 'linear-gradient(180deg, #7B9697 0%, #53696A 100%)',
           'gradient-top-gold': 'linear-gradient(45deg, #E8BD80 30%, #E0972F 100%)',
           'gradient-top-teal': 'linear-gradient(180deg, #D8F3E5 39.87%, #C3F3E6 100%)',
           'gradient-top': 'linear-gradient(0deg, #AAB4A8ff, #E8BD80ff, #7A7871ff, #586669ff, #B59370ff, #889D9Bff, #7E9493ff, #788A88ff, #FBF1CDff, #D8F3E5ff)',
        'gradient-right': 'linear-gradient(90deg, #AAB4A8ff, #E8BD80ff, #7A7871ff, #586669ff, #B59370ff, #889D9Bff, #7E9493ff, #788A88ff, #FBF1CDff, #D8F3E5ff)',
        'gradient-bottom': 'linear-gradient(180deg, #AAB4A8ff, #E8BD80ff, #7A7871ff, #586669ff, #B59370ff, #889D9Bff, #7E9493ff, #788A88ff, #FBF1CDff, #D8F3E5ff)',
        'gradient-left': 'linear-gradient(270deg, #AAB4A8ff, #E8BD80ff, #7A7871ff, #586669ff, #B59370ff, #889D9Bff, #7E9493ff, #788A88ff, #FBF1CDff, #D8F3E5ff)',
        'gradient-top-right': 'linear-gradient(45deg, #AAB4A8ff, #E8BD80ff, #7A7871ff, #586669ff, #B59370ff, #889D9Bff, #7E9493ff, #788A88ff, #FBF1CDff, #D8F3E5ff)',
        'gradient-bottom-right': 'linear-gradient(135deg, #AAB4A8ff, #E8BD80ff, #7A7871ff, #586669ff, #B59370ff, #889D9Bff, #7E9493ff, #788A88ff, #FBF1CDff, #D8F3E5ff)',
        'gradient-radial': 'radial-gradient(#AAB4A8ff 0%, #E8BD80ff 10%, #7A7871ff 20%, #586669ff 30%, #B59370ff 40%, #889D9Bff 50%, #7E9493ff 60%, #788A88ff 70%, #FBF1CDff 80%, #D8F3E5ff 90%)'
        }),
        keyframes: {
          'swipe-up': {
            '0%': {
              transform: 'translateY(0)'
            },
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
          },
          'arrow-down': {
            '0%': {
              transform: 'translateY(-20px)'
            },
            '100%': {
              transform: 'translateY(30px)',
            } 
          },
          'arrow-up': {
            '0%': {
              transform: 'translateY(20px)'
            },
            '100%': {
              transform: 'translateY(-30px)',
            } 
          },
         

        },
        animation: {
            'swipe-down': 'swipe-down 2.5s ease-in-out infinite',
            'swipe-up': 'swipe-up 2.5s ease-out',
            'arrow-up': 'arrow-up 2s infinite',
            'arrow-down': 'arrow-down 2s infinite'
        }
    },
  },
corePlugins: {
    zIndex: true
},
  plugins: [],
  
}
