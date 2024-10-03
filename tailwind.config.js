/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "custom-radial":
          "radial-gradient(circle at 91% 50%, rgba(82, 2, 43, 0.8), rgba(18, 2, 32, 0.7) 50%, rgb(0, 0, 15) 100%)",
      },
    },
  },
  plugins: [],
}
