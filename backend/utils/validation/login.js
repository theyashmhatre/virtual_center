const isEmpty = require("lodash/isEmpty");
const emailValidation = require("./emailValidation");

function validateLoginParams(data) {
    let errors = {};

    let {email, password} = data;

    // Email checks

    errors = emailValidation(email, errors);


    // Password checks
    if (!password) {errors.password = "Password field is required";}

    return {
        errors,
        isValid: isEmpty(errors) 
    };
}

module.exports = validateLoginParams;