/** @type {import('tailwindcss').Config} */
export default {
  content: ["./app/**/*.{vue,js,ts}", "./components/**/*.{vue,js,ts}"],
  theme: {
    extend: {
      colors: {
        "dodgeroll-gold": "#F79F1A",
        "apple-green": "#046E18",
        "dire-worf": "#292727"
      }
    },
    fontFamily: {
      montserrat: ["Montserrat", "sans-serif"],
    },
    container: {
      center: true,
      padding: "2rem",
    },
  },
  plugins: [],
}

