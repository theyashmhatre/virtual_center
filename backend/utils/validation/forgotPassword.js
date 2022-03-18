const { isEmptyObject } = require("../utils");
// const passwordValidation = require("./singleInputValidations/passwordValidation");

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

module.exports = validateForgotPasswordParams;
