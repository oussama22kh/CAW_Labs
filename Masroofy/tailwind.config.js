module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Noto Sans", "sans-serif"],
      },
      backgroundImage: {
        inc: "url('/increase.png')",
      },
    },
  },
  plugins: [],
};
