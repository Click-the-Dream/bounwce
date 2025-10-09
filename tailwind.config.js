/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        "ash":"#545454",
        "orange": "#FF4B2B",
        "lighter-ash": "#EBEBEB",
      }
    },
  },
  plugins: [],
}
