import { emailValidation } from "../utils";

export const inputValidation = (email, password) => {
  errors = {};
  
  errors = emailValidation(email);

  if (!password) errors.password = "Password is required";

  return errors;
}
