/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "frame-number": "url('../assets/icons/ic-frame-number.svg')",
        mosque: "url('../src/assets/img/medina.webp')",
        quran: "url('../src/assets/img/quran.webp')",
      },
    },
  },
  plugins: [],
};
