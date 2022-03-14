const {isEmptyObject} = require("../utils");
const emailValidation = require("./singleInputValidations/emailValidation");

function validateLoginParams(data) {
    let errors = {};

    let {email, password} = data;

    // Email checks

    errors = emailValidation(email, errors);


    // Password checks
    if (!password) {errors.password = "Password field is required";}

    return {
        errors,
        isValid: isEmptyObject(errors) 
    };
}

module.exports = validateLoginParams;