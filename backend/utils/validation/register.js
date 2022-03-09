const isEmpty = require("lodash/isEmpty");
const emailValidation = require("./emailValidation");
const passwordValidation = require("./passwordValidation");


function validateRegisterParams(data) {
    let errors = {};

    let {firstName, lastName , email, password, password2} = data;


    //Name validation
    if (!firstName) errors.firstName = "First Name cannot be empty";
    if (!lastName) errors.lastName = "Last Name cannot be empty";


    //email validation
    errors = emailValidation(email, errors);


    // Password validation
    errors = passwordValidation(password,password2, errors);


    console.log(errors);
    return {
        errors,
        isValid: isEmpty(errors)
    };
}

module.exports = validateRegisterParams;