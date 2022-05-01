const { isEmptyObject, emailValidation, passwordsValidation } = require("../utils");


function validateRegisterParams(data) {
    let errors = {};

    let { employeeName, email, password, confirmPassword, username, contactNumber, securityQuestionId, securityQuestionAnswer, accountTypeId } = data;


    //Name validation
    if (!employeeName) errors.employeeName = "Employee name cannot be empty";

    //email validation
    errors = emailValidation(email, errors);

    // Password validation
    errors = passwordsValidation(password, confirmPassword, errors);

    //username validation
    if (!username || isNaN(username)) errors.username = "Please enter a valid username i.e. Your employee ID";

    //contact number validation
    if (isNaN(contactNumber)) errors.contactNumber = "Please enter a valid contact number"; 

    if (!securityQuestionId || isNaN(securityQuestionId)) errors.securityQuestionId = "Please select a valid Security Question";
    if (!securityQuestionAnswer) errors.securityQuestionAnswer = "Please enter an answer to your Security Question";

    //Account Type ID validation
    if (!accountTypeId || isNaN(accountTypeId)) errors.accountTypeId = "Please enter a valid username i.e. Your employee ID";

    return {
        errors,
        isValid: isEmptyObject(errors)
    };
}

function validateLoginParams(data) {
    let errors = {};

    let { username, password } = data;

    //username validation
    if (!username || isNaN(username)) errors.username = "Please enter a valid username i.e. Your employee ID";

    // Password checks
    if (!password) { errors.password = "Password field is required"; }

    return {
        errors,
        isValid: isEmptyObject(errors)
    };
}

function validateForgotPasswordParams(data) {
    let errors = {};

    let { email, securityQuestionId, securityQuestionAnswer } = data;

    // Email checks
    if (!email) errors.email = "Please enter email and retry";

    if (!securityQuestionId || isNaN(securityQuestionId))
        errors.securityQuestionId = "Please select a valid security question";

    if (!securityQuestionAnswer)
        errors.securityQuestionAnswer =
            "Please enter your security question answer";

    // Password validation
    //   errors = passwordValidation(password, password2, errors);

    return {
        errors,
        isValid: isEmptyObject(errors),
    };
}

function updateProfileValidation(data) {
    let errors = {};

    let {
      employeeName,
      email,
      contactNumber,
      location,
      displayPicture
      } = data;



    //Name validation
    if (!employeeName) errors.employeeName = "Employee name cannot be empty";

    //email validation
    errors = emailValidation(email, errors);

    //contact number validation
    if (isNaN(contactNumber)) errors.contactNumber = "Please enter a valid contact number"; 

    return {
        errors,
        isValid: isEmptyObject(errors)
    };
}

module.exports = { 
    validateRegisterParams, 
    validateLoginParams, 
    validateForgotPasswordParams,
    updateProfileValidation
};