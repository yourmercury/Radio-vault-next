/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "theme-orange": "#F22F04",
        "theme-orange-transparent": "#f230049a",
        "theme-red": "#F22F04",
        "theme-grey": "#ABABAB",
        "theme-light-grey": "#F5F5F5",
      },
    },
  },
  plugins: [],
};
