import { emailRegex, passwordRegex } from "../../constants";

export const passwordValidation = (password, confirmPassword, errors={}) => {
  if (!password) errors.password = "Password is required";
  else if (password.length < 8)
    errors.password = "Password must be at least 8 characters";
  else if (password.length > 40)
    errors.password = "Password must be less than 40 characters";
  else if (!passwordRegex.test(password))
    errors.password = "Password must contain atleast 1 uppercase character, lowercase character, special symbol and digit";

  if (!confirmPassword)
    errors.confirmPassword = "Confirm password is required";
  else if (password !== confirmPassword) 
    errors.confirmPassword = "Confirm Password should be same as Password";

  return errors;
}

export const emailValidation = (email, errors={}) => {
  if (!email) errors.email = "Email is required";
  else if (!emailRegex.test(email)) errors.email = "Email is incorrect";

  return errors;
}

export const isEmptyObject = (object) => !Object.keys(object).length;
