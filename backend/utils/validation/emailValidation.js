const {emailRegex} = require("../constants");


function emailValidation(email, errors) {
    if (!email) {errors.email = "Email field is required";}
    else if (!emailRegex.test(email)) {errors.email = "Email entered is invalid";}

    return errors;
}


module.exports = emailValidation;