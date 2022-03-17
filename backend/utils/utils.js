const {emailRegex, passwordRegex} = require("./constants");


function isEmptyObject(obj) {
  return !Object.keys(obj).length;
}

function emailValidation(email, errors) {
    if (!email) {errors.email = "Email field is required";}
    else if (!emailRegex.test(email)) {errors.email = "Email entered is invalid";}

    return errors;
}

function passwordsValidation(password, confirmPassword, errors) {

    if (!password) {errors.password = "Password field is required";}

    if (!confirmPassword) {errors.confirmPassword = "Confirm password field is required";}

    if (!isEmptyObject(errors)) return errors;

    if (password.length < 8) {errors.password = "Password must be at least 8 characters";}
    else if (password.length > 40) {errors.password = "Password must be less than 40 characters.";}

    if (!isEmptyObject(errors)) return errors;

    if (password !== confirmPassword) {
        errors.password = "Passwords must match";
        return errors;
    }

    if (!passwordRegex.test(password)) {errors.password = "Password must contain atleast 1 uppercase character, lowercase character, special symbol and digit";}

    return errors;
}



module.exports = {
    isEmptyObject,
    emailValidation,
    passwordsValidation
};