/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inria Sans', 'sans-serif'], // Police par défaut
      },
      colors: {
        brandBlue: '#1B3A64',  // Bleu pour la barre
        brandGreen: '#94C45F', // Vert secondaire si besoin
      },
    },
  },
  plugins: [],
}
