module.exports = {
  mode: "jit",
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        "gray-rgb": "rgb(246 246 246)",
        "blue-grd": "rgb(100 110 217)",
        "green-grd": "rgb(90 208 94)",
        "black-btn": "rgb(56 56 56)",
        "black-sidebar": "rgb(45 45 45)",
      },
    },
  },
  variants: {},
  plugins: [require("@tailwindcss/forms")],
};
