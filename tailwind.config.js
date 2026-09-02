/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Poppins', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#6552D2',
          hover: '#5442BE',
          active: '#4837AA',
          light: '#7C6AE0',
          soft: '#F0EDFC',
        },
        'primary-soft': '#F0EDFC',
        background: '#F6F8FC',
        'text-main': '#1E2538',
        'text-muted': '#8C96A8',
      },
      boxShadow: {
        glass: '0 20px 50px rgba(101, 82, 210, 0.16), 0 0 0 1px rgba(255, 255, 255, 0.7), inset 0 1px 2px rgba(255, 255, 255, 0.95)',
        'glass-button': '0 8px 24px rgba(101, 82, 210, 0.28)',
      },
    },
  },
  plugins: [],
}
