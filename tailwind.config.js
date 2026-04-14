/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        midnight: '#0b1223',
        navy: '#10182d',
        gold: '#d4ae57',
        surface: '#15203a',
        field: '#16203a',
        border: '#3b4b74'
      }
    }
  },
  plugins: []
};
