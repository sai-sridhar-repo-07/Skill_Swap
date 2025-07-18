/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: "#6C63FF",
        secondary: "#F5F5F5",
        accent: "#FF6584",
      },
    },
  },
  plugins: [],
}
