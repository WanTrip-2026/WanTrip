/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        main: '#365475', // Primary btn hover color
        main_900: '#4A6583',
        main_800: '#5E7691',
        main_700: '#72879E',
        main_600: '#8698AC',
        main_500: '#9AA9BA',
        main_400: '#AFBBC8',
        main_300: '#C3CCD6',
        main_200: '#D7DDE3',
        main_100: '#EBEEF1',

        primary: '#2F3D4D', //主色 //Primary btn color

        dark: '#020408',
        dark_900: '#1B1D21',
        dark_800: '#353639',
        dark_700: '#4E4F52',
        dark_600: '#67686B',
        dark_500: '#808183',
        dark_400: '#9A9B9C',
        dark_300: '#B3B4B5', // Secondary btn hover color
        dark_200: '#CCCDCE',
        dark_100: '#E6E6E6', // Secondary btn color
        accent: '#93ACAA', // 點綴色
      },
    },
  },
  plugins: [],
}
