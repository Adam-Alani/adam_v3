module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    inset: {
      '1/8': '12.5%'
    },
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
        dark: '#111111'
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
