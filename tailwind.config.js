module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./component/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'min': '200px',
      'sm': '640px',
      'md': '768px',
      '900px': '900px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      // => @media (min-width: 900px) { ... }
      'desktop': '1280px',
      // => @media (min-width: 1280px) { ... }
    },
    fontFamily:{
      'primary': ['Nunito', 'serif']
    },
    colors: {
      'primary': '#2BBCBA'
    },
    extend: {
        
    },  
    extends: {
      'top-1/5': '20%',
      'left-1/5': '20%',
      'right-1/5': '20%',
      'bottom-1/5': '20%',
    }
  },
  plugins: [],
}
