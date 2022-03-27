export const inputValidation = (username, password) => {
  errors = {};
  
  if (!username) errors.username = "Username is required"

  if (!password) errors.password = "Password is required";

  return errors;
}
