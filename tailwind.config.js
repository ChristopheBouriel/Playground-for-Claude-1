/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brightColor: "#ff0055",
        backgroundColor: "#ffffe6",
        normalText: "#999999",
        lightText: "#f8f8f8",
      },
    },
  },
  plugins: [],
};