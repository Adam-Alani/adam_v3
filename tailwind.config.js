module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      'Rakkas': ['Rakkas'],
      'Recoleta': ['Recoleta'],
      'Rozha': ['Rozha'],
      'Work-Sans': ['Work-Sans'],
    },
    extend: {
      colors: {
        primary: '#3100FF',
        dark: '#131313'
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
