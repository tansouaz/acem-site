/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Space Grotesk", "sans-serif"],
        outfit: ["Outfit", "sans-serif"],
      },
      keyframes: {
        slowZoom: {
          "0%": { transform: "scale(1.02)" },
          "100%": { transform: "scale(1.08)" },
        },
        floatGlow: {
          "0%,100%": { transform: "translateY(0px)", opacity: "0.18" },
          "50%": { transform: "translateY(-12px)", opacity: "0.28" },
        },
      },
      animation: {
        slowZoom: "slowZoom 18s ease-in-out infinite alternate",
        floatGlow: "floatGlow 6s ease-in-out infinite",
      },
      boxShadow: {
        premium: "0 10px 30px rgba(0,0,0,0.18)",
        orangeGlow: "0 10px 30px rgba(249,115,22,0.16)",
      },
    },
  },
  plugins: [],
};
