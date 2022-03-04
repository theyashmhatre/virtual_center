const Validator = require("validator");
const isEmpty = require("is-empty");


function validateRegisterParams(data) {
    let errors = {};

    let {name , email, password, password2} = data;


    //Name validation
    if (Validator.isEmpty(name)) errors.name = "Name cannot be empty";


    //email validation
    if (Validator.isEmpty(email)) {errors.email = "Email is required";}
    else if (!Validator.isEmail(email)) {errors.email = "Email entered is invalid";}


    // Password validation
    if (Validator.isEmpty(password)) {errors.password = "Password field is required";}

    if (Validator.isEmpty(password2)) {errors.password2 = "Confirm password field is required";}

    if (!Validator.isLength(password, { min: 6, max: 30 })) {errors.password = "Password must be at least 6 characters";}

    if (!Validator.equals(password, password2)) {errors.password2 = "Passwords must match";}

    console.log(errors);
    return {
        errors,
        isValid: isEmpty(errors)
    }
}

module.exports = validateRegisterParams;