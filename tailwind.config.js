/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        josefin:['Josefin Sans', 'sans-serif']
      },
      colors: {
        nit:{
          "100":"#f7eeef",
          "200":"#c484d2",
          "300":"#f4e7ef",
          "400":"#f2d9e0",
        }
      }
    },
  },
  plugins: [],
}