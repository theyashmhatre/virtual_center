import { emailValidation, passwordValidation } from "../utils";

export const registerInputValidation = ({
  employeeId,
  employeeName,
  email,
  accountTypeId,
  contactNumber,
  username,
  securityQuestionId,
  securityQuestionAnswer,
  password,
  confirmPassword,
}) => {
  errors = {};

  if (!employeeId) errors.employeeId = "Employee Id is required";
  
  if (!employeeName) errors.employeeName = "Employee Name is required";
  
  errors = emailValidation(email, errors);

  if (!accountTypeId) errors.accountTypeId = "Account Name is required";
  
  if (!contactNumber) errors.contactNumber = "Contact Number is required";

  if (!username) errors.username = "Username is required";
  else if (username != employeeId) errors.username = "Username is incorrect";

  if (!securityQuestionId)
    errors.securityQuestionId = "Please Select one security question";
  
  if (!securityQuestionAnswer) 
    errors.securityQuestionAnswer = "Answer for security question can not be empty";
  
  errors = passwordValidation(password, confirmPassword, errors);

  return errors;
};

export const loginInputValidation = ({username, password}) => {
  errors = {};
  
  if (!username) errors.username = "Username is required"

  if (!password) errors.password = "Password is required";

  return errors;
};

export const forgotPasswordInputValidation = ({
  email,
  securityQuestionId,
  securityQuestionAnswer
}) => {
  errors = {};

  errors = emailValidation(email, errors);
  
  if (!securityQuestionId)
    errors.securityQuestionId = "Please Select one security question";
  
  if (!securityQuestionAnswer) 
    errors.securityQuestionAnswer = "Answer for security question can not be empty";
  
  return errors;
};
