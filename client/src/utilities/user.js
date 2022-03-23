import axios from "axios";
import { apiURL } from "../../constants";

export const login = async (email, password) => {
  const endpoint = new URL("/user/login", apiURL).href;
  return await axios
    .post(endpoint, {
      email: email,
      password: password,
    })
    .then((response) => {
      sessionStorage.setItem("Access Token", response.data.token);
    });
};

export const register = async (
  firstName,
  lastName,
  email,
  securityQuestionId,
  securityQuestionAnswer,
  password,
  confirmPassword
) => {
  const endpoint = new URL("http://localhost:4000/user/register", apiURL).href;
  return await axios.post(endpoint, {
    firstName: firstName,
    lastName: lastName,
    email: email,
    securityQuestionId: securityQuestionId,
    securityQuestionAnswer: securityQuestionAnswer,
    password: password,
    confirmPassword: confirmPassword,
  });
};

export const forgotPassword = async (
  email,
  securityQuestionId,
  securityQuestionAnswer
) => {
  const endpoint = new URL("/user/forgot-password", apiURL).href;
  return await axios.post(endpoint, {
    email: email,
    securityQuestionId: securityQuestionId,
    securityQuestionAnswer: securityQuestionAnswer,
  });
};

export const resetPassword = async (token, password, confirmPassword) => {
  const endpoint = new URL(`/user/reset-password/${token}`, apiURL).href;
  return await axios.post(endpoint, {
    password: password,
    confirmPassword: confirmPassword,
  });
};

export const getSecurityQuestions = async () => {
  const endpoint = new URL(
    "http://localhost:4000/user/get-security-questions",
    apiURL
  ).href;
  return await axios.get(endpoint);
};
