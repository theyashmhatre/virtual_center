module.exports = {
  mode: "jit",
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      flexGrow: {
        2: 2,
        9: 9,
        1: 1,
      },
      colors: {
        "gray-rgb": "rgb(246 246 246)",
        "blue-grd": "rgb(100 110 217)",
        "green-grd": "rgb(90 208 94)",
        "black-btn": "rgb(56 56 56)",
        "black-sidebar": "rgb(45 45 45)",
      },
      height: {
        "10v": "10vh",
        "20v": "20vh",
        "30v": "30vh",
        "40v": "40vh",
        "50v": "50vh",
        "60v": "60vh",
        "70v": "70vh",
        "80v": "80vh",
        "90v": "90vh",
        "60per": "60%",
        "50per": "50%",
        "40per": "40%",
        "25per": "25%",
        "30per": "30%",
        "70per": "70%",
        "10per": "10%",
        "90per": "90%",
      },
      minHeight: {
        40: "10rem",
        100: "400px",
        "screen": "100vh"
      },
      maxHeight: {
        "50v": "50vh"
      },
      width: {
        "10per": "10%",
        "70per": "70%",
        "30per": "30%",
        "90v": "90vw",
        "60per": "60%",
        "40per": "40%",
        "24per": "24%",
        "50per": "50%",
        "5per": "5%",
        "90per": "90%",
      },
      screens: {
        xs: { min: "0px", max: "500px" },
        sm: { min: "0px", max: "767px" },
        md: { min: "768px", max: "991px" },
        lg: { min: "992px", max: "1199px" },
        xl: { min: "1200px" },
      },
    },
  },
  variants: {
    extend: {
      display: ['group-hover'],
    },
  },
  plugins: [],
};
