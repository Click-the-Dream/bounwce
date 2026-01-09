/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        sm: "240px",
        // => @media (min-width: 640px) { ... }

        md: "540px",
        // => @media (min-width: 768px) { ... }

        lg: "700px",
        // => @media (min-width: 1024px) { ... }

        xl: "1024px",
        // => @media (min-width: 1280px) { ... }

        "2xl": "1280px",
        // => @media (min-width: 1536px) { ... }
      },
      colors: {
        ash: "#545454",
        orange: "#FF4B2B",
        "lighter-ash": "#EBEBEB",
      },
      fontFamily: {
        inter: ["Inter"],
      },
      gridTemplateColumns: {
        auto: "repeat(auto-fill, minmax(220px, 1fr))",
      },
    },
  },
  plugins: [],
};
