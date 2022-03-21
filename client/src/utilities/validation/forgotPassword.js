import { emailValidation } from "../utils";

export const inputValidation = (email, securityQuestionId, securityQuestionAnswer) => {
  errors = {};

  errors = emailValidation(email, errors);
  
  if (!securityQuestionId) errors.securityQuestionId = "Please Select one security question";
  
  if (!securityQuestionAnswer) 
    errors.securityQuestionAnswer = "Answer for security question can not be empty";
  
  return errors;
}
