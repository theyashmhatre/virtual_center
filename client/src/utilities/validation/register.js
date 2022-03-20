import { emailValidation, passwordValidation } from "../utils";

export const inputValidation = (firstName, lastName, email, securityQuestionId, securityQuestionAnswer, password, confirmPassword) => {
  errors = {};

  if (!firstName) errors.firstName = "First Name is required";
  
  if (!lastName) errors.lastName = "Last Name is required";
  
  errors = emailValidation(email, errors);
  
  if (!securityQuestionId) errors.securityQuestionId = "Please Select one security question";
  
  if (!securityQuestionAnswer) 
    errors.securityQuestionAnswer = "Answer for security question can not be empty";
  
  errors = passwordValidation(password, confirmPassword, errors);

  return errors;
}
