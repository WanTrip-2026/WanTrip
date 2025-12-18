/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#2F3D4D', // 主色
        //'primary-hover': '#6D8FA3', // Button hover color
        secondary: '#6D8FA3', // 輔色
        accent: '#93ACAA', // 點綴色
        //'page-bg': '#DBD0BE', // Global background
        //title: '#000000', // Title color
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
