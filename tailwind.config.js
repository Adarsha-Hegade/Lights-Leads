/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'playfair': ['"Playfair Display"', 'serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      colors: {
        primary: '#1a5f7a',
        secondary: '#2c3e50',
        accent: '#c8a97e',
      },
    },
  },
  plugins: [],
};