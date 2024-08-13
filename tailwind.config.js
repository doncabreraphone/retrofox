// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx,html}',
    './public/index.html',
  ],
  theme: {
    extend: {
      screens: {
        '3xl': '1600px',  // Ajusta según tus necesidades
      },
    },
  },
  plugins: [],
}
