var emailRegex = new RegExp("^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$");
var passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?]).+$");

var apiURL = process.env.REACT_APP_API_URL;

var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];

var colors = ["red", "yellow", "blue", "green", "gray", "pink", "orange", "voilet"];

var navigationData = {
  "main": [
    { title: "Home", link: "/main", roles: [1, 2, 3] },
    { title: "Our Offerings", link: "/main/offerings", roles: [1, 2, 3] }
  ],
  "challenge": [
    { title: "Challenges", link: "/challenge/challenges", roles: [1, 2, 3] },
    { title: "Dashboard", link: "/challenge/dashboard", roles: [1, 2, 3] },
    { title: "Our Solvers", link: "/challenge/solvers", roles: [1, 2, 3] }
  ],
  "support": [
    { title: "Contact", link: "/support", roles: [1, 2, 3] }
  ],
  "help": [
    { title: "help", link: "/help", roles: [1, 2, 3] }
  ],
  "account": [
    { title: "Profile", link: "/account/profile", roles: [1, 2, 3] },
    { title: "Settings", link: "/account/settings", roles: [1] }
  ]
};

const postTypeId = {
  "challenge": 1,
  "solution": 2,
  "offering": 3,
};

const roleIds = {
  "super_admin": 1,
  "admin": 2,
  "user": 3
};

module.exports = {
  emailRegex,
  passwordRegex,
  apiURL,
  monthNames,
  colors,
  navigationData,
  postTypeId,
  roleIds
};
