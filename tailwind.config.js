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
        maybe: '#35c499',
        primary: '#ffe279',
        dark: '#181818FF'
      },
      transitionDuration: {
        '2000': '2000ms',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
