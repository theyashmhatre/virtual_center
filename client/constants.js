var emailRegex = new RegExp("^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$");
var passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?]).+$");

var apiURL = process.env.REACT_APP_API_URL;

var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];

var colors = ["red", "yellow", "blue", "green", "gray", "pink", "orange", "voilet"];

var navigationData = {
  "main": [
    { title: "Home", link: "/main" },
    { title: "Our Offerings", link: "/main/offerings" }
  ],
  "challenge": [
    { title: "Challenges", link: "/challenge/challenges" },
    { title: "Dashboard", link: "/challenge/dashboard" },
    { title: "Our Solvers", link: "/challenge/solvers" }
  ],
  "support": [
    { title: "Contact", link: "/support" }
  ],
  "help": [
    { title: "help", link: "/help" }
  ]
};

const postTypeId = {
  "challenge": 1,
  "solution": 2,
  "offering": 3,
};

module.exports = {
  emailRegex,
  passwordRegex,
  apiURL,
  monthNames,
  colors,
  navigationData,
  postTypeId,
};
