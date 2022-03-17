const {isEmptyObject, passwordsValidation} = require("../utils");

function validateForgotPasswordParams(data) {
    let errors = {};

    let {email, securityQuestionId, securityQuestionAnswer, password, confirmPassword} = data;

    // Email checks
    if (!email) errors.email = "Please enter email and retry";

    if (!securityQuestionId || isNaN(securityQuestionId)) errors.securityQuestionId = "Please select a valid security question";

    if (!securityQuestionAnswer) errors.securityQuestionAnswer = "Please enter your security question answer";


    // Password validation
    errors = passwordsValidation(password,confirmPassword, errors);

    return {
        errors,
        isValid: isEmptyObject(errors) 
    };
}

module.exports = validateForgotPasswordParams;