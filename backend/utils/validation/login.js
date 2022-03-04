const Validator = require("validator");
const isEmpty = require("is-empty");


function validateLoginParams(data) {
    let errors = {}

    let {email, password} = data;

    // Email checks
    if (Validator.isEmpty(email)) {errors.email = "Email field is required";} 
    else if (!Validator.isEmail(email)) {errors.email = "Email is invalid";}


    // Password checks
    if (Validator.isEmpty(password)) {errors.password = "Password field is required";}

    return {
        errors,
        isValid: isEmpty(errors)
    }
}

module.exports = validateLoginParams;