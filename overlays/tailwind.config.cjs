/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        'focus-scene': { raw: '(max-height: 160px)' },
      },
    },
  },
  plugins: [],
};
