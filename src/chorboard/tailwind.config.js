module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        header: [
          'aviano-future',
          'Futura',
          '"Helvetica Neue"',
          'Helvetica',
          'Arial',
          'sans-serif'
        ],
        body: [
          'futura-pt',
          'Futura',
          '"Helvetica Neue"',
          'Helvetica',
          'Arial',
          'sans-serif'
        ],
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
      require('@tailwindcss/forms'),
      require('tailwindcss-neumorphism'),
  ],
}
