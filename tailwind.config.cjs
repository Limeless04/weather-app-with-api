/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
      white: "#FFF",
      black: "#000",
      transparent: 'transparent',
      current: 'currentColor',
      'coolgrey': '#938BA1',
      'beaublue': '#B0C6CE',
      'midbluegreen': '#B2E4DB',
      'magicmint': '#A9FBD7',
      'aeroblue': '#D7FDEC',
      'pacifiblue': '#23B5D3',
      'richblack' : '#071013',
      'gainsboro' : '#DFE0E2',
      'cadetblue' : '#A2AEBB',
      'pewterblue' : '#75ABBC'

    },
    },
  },
  plugins: [],
}
