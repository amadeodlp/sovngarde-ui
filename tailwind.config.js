/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6C5CE7', // Purple color for our gaming theme
        secondary: '#00B894', // Mint color for accents
        'neutral-850': '#1E1E24', // Slightly lighter than 900 for subtle contrast
        'neutral-950': '#13131A', // Darker than 900 for backgrounds
      }
    },
  },
  plugins: [],
}
