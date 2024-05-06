/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        white: '#FAFAF9',
        gray: '#BABAC3',
        black: '#08080B',
      },
      backgroundImage: {
        mainBg: "url('/public/home-background.jpg')"
      }
    },
  },
  plugins: [],
}

