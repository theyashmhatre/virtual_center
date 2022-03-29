import axios from "axios";
import jwt from "jsonwebtoken";
import { apiURL } from "../../constants";

export const login = async (username, password) => {
  const endpoint = new URL("/api/user/login", apiURL).href;
  return await axios
    .post(endpoint, {
      username,
      password,
    })
    .then((response) => {
      sessionStorage.setItem("Access Token", response.data.token);
    });
};

export const register = async (
  employeeName,
  email,
  accountTypeId,
  contactNumber,
  username,
  securityQuestionId,
  securityQuestionAnswer,
  password,
  confirmPassword,
) => {
  const endpoint = new URL("/api/user/register", apiURL).href;
  return await axios.post(endpoint, {
    employeeName,
    email,
    accountTypeId,
    contactNumber,
    username,
    securityQuestionId,
    securityQuestionAnswer,
    password,
    confirmPassword,
  });
};

export const forgotPassword = async (
  email,
  securityQuestionId,
  securityQuestionAnswer
) => {
  const endpoint = new URL("/api/user/forgot-password", apiURL).href;
  return await axios.post(endpoint, {
    email,
    securityQuestionId,
    securityQuestionAnswer,
  });
};

export const resetPassword = async (username, token, password, confirmPassword) => {
  const endpoint = new URL(`/api/user/reset-password/${username}/${token}`, apiURL).href;
  return await axios.post(endpoint, {
    password,
    confirmPassword,
  });
};

export const getSecurityQuestions = async () => {
  const endpoint = new URL(
    "/api/user/get-security-questions",
    apiURL
  ).href;
  return await axios.get(endpoint);
};

export const getAccountTypes = async () => {
  const endpoint = new URL(
    "/api/user/get-account-types",
    apiURL
  ).href;
  return await axios.get(endpoint);
};

export const isLoggedIn = () => {
  const token = sessionStorage.getItem('Access Token');
  
  if (token) {
    try {
      jwt.verify(token, process.env.REACT_APP_JWT_SECRET);
      return true;
    } catch(err) {
      sessionStorage.removeItem('Access Token');
      return false;
    }
  } else return false;
}
