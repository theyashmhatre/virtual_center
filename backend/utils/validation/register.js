const {isEmptyObject} = require("../utils");
const emailValidation = require("./singleInputValidations/emailValidation");
const passwordValidation = require("./singleInputValidations/passwordValidation");


function validateRegisterParams(data) {
    let errors = {};

    let {firstName, lastName , email, password, password2, securityQuestionId, securityQuestionAnswer} = data;


    //Name validation
    if (!firstName) errors.firstName = "First Name cannot be empty";
    if (!lastName) errors.lastName = "Last Name cannot be empty";


    //email validation
    errors = emailValidation(email, errors);


    // Password validation
    errors = passwordValidation(password,password2, errors);

    if (!securityQuestionId || isNaN(securityQuestionId)) errors.securityQuestionId = "Please select a valid Security Question";
    if (!securityQuestionAnswer) errors.securityQuestionAnswer = "Please enter an answer to your Security Question";

    return {
        errors,
        isValid: isEmptyObject(errors)
    };
}

module.exports = validateRegisterParams;