module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    cursor: {
      grab: 'grab',
      grabbing: 'grabbing'

    },
    inset: {
      '1/8': '12.5%',
      '1/20': '5%'
    },
    fontFamily: {
      'Rakkas': ['Rakkas'],
      'Recoleta': ['Recoleta'],
      'Rozha': ['Rozha'],
      'Inter': ['Inter']
    },
    extend: {
      colors: {
        maybe: '#35c499',
        primary: '#ffe279',
        gray: '#232323',
        dark: '#070707'
      },
      transitionDuration: {
        '2000': '2000ms',
      },
      fontSize: {
        'rs': '15vw'
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
