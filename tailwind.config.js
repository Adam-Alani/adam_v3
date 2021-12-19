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
        rYellow: '#ffe279',
        rDGreen: '#93f861',
        rGreen: '#4ae3b4',
        rPurple: '#a48df5',
        rBlue: '#8dd6f5',
        rRed: '#f58d8d',
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
