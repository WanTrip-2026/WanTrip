/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#6D8FA3', // 主色
        primary_hover: '#365475', // Button hover color
        secondary: '#E4E4E4', // 輔色
        secondary_hover: '#C7C7C7',
        accent: '#93ACAA', // 點綴色
        page: '#F8FDFF', // Global background
      },
      fontFamily: {
        sans: ['Helvetica', 'Arial', 'SF Pro', 'Noto Sans TC', '微軟正黑體', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
