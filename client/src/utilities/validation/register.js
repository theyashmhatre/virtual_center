import { emailValidation, passwordValidation } from "../utils";

export const inputValidation = (
  employeeId,
  employeeName,
  email,
  accountName,
  contact,
  username,
  securityQuestionId,
  securityQuestionAnswer,
  password,
  confirmPassword,
) => {
  errors = {};

  if (!employeeId) errors.employeeId = "Employee Id is required";
  
  if (!employeeName) errors.employeeName = "Employee Name is required";
  
  errors = emailValidation(email, errors);

  if (!accountName) errors.accountName = "Account Name is required";
  
  if (!contact) errors.contact = "Contact Number is required";

  if (!username) errors.username = "Username is required";
  else if (username != employeeId) errors.username = "Username is incorrect";

  if (!securityQuestionId) errors.securityQuestionId = "Please Select one security question";
  
  if (!securityQuestionAnswer) 
    errors.securityQuestionAnswer = "Answer for security question can not be empty";
  
  errors = passwordValidation(password, confirmPassword, errors);

  return errors;
}
