const {passwordRegex} = require("../../constants");
const {isEmptyObject} = require("../../utils");


function passwordValidation(password, password2, errors) {

    if (!password) {errors.password = "Password field is required";}

    if (!password2) {errors.password2 = "Confirm password field is required";}

    if (!isEmptyObject(errors)) return errors;

    if (password.length < 8) {errors.password = "Password must be at least 8 characters";}
    else if (password.length > 40) {errors.password = "Password must be less than 40 characters.";}

    if (!isEmptyObject(errors)) return errors;

    if (password !== password2) {
        errors.password = "Passwords must match";
        return errors;
    }

    if (!passwordRegex.test(password)) {errors.password = "Password must contain atleast 1 uppercase character, lowercase character, special symbol and digit";}

    return errors;
}


module.exports = passwordValidation;