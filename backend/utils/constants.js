var emailRegex = new RegExp("^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$");
var passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?]).+$");

const types = {
    1 :"challenge",
    2 :"solution",
    3 :"offering"
};

const roles = {
    "super_admin": 1,
    "admin": 2,
    "user": 3
};

module.exports = {
    emailRegex,
    passwordRegex,
    types,
    roles
};