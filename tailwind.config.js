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
        primary: '#3461FD',
        'primary-soft': '#EBF2FE',
        background: '#F6F8FC',
        'text-main': '#1E2538',
        'text-muted': '#8C96A8',
      },
      boxShadow: {
        glass: '0 8px 24px rgba(47, 84, 235, 0.06)',
      },
    },
  },
  plugins: [],
}
