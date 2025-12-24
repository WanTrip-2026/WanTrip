/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#2F3D4D', // 主色
        primary_hover: '#3C5572', // Button hover color
        secondary: '#6D8FA3', // 輔色
        accent: '#93ACAA', // 點綴色
        page: '#F8FDFF', // Global background
      },
      fontFamily: {
        sans: ['Helvetica', 'Arial', 'SF Pro', 'Noto Sans TC', '微軟正黑體', sans-serif],
      },
    },
  },
  plugins: [],
}
