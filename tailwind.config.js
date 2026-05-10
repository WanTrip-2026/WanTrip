/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      borderRadius: {
        '10': '10px',
        '20': '20px',
        '30': '30px',
        '24': '24px',
        '30': '30px',
        '40': '40px',
      },
      colors: {
        main: {
          DEFAULT: '#365475',
          900: '#4A6583',
          800: '#5E7691',
          700: '#72879E',
          600: '#8698AC',
          500: '#9AA9BA',
          400: '#AFBBC8',
          300: '#C3CCD6',
          200: '#D7DDE3',
          100: '#EBEEF1',
        },

        primary: '#2F3D4D',

        dark: {
          DEFAULT: '#020408',
          900: '#1B1D21',
          800: '#353639',
          700: '#4E4F52',
          600: '#67686B',
          500: '#808183',
          400: '#9A9B9C',
          300: '#B3B4B5',
          200: '#CCCDCE',
          100: '#E6E6E6',
        },
        accent: '#93ACAA', 
      },
    },
  },
  plugins: [],
}
