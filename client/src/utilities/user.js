import axios from "axios";
import { apiURL } from "../../constants";

export const login = async (email, password) => {
  const endpoint = new URL('/user/login', apiURL).href;
  return await axios
    .post(endpoint, {
      email: email,
      password: password
    })
    .then((response) => {
      sessionStorage.setItem('Access Token', response.data.token);
    });
}

export const register = async () => {
  const endpoint = new URL('/user/register', apiURL).href;
  return await axios.post(endpoint, {
    firstName: firstName,
    lastName: lastName,
    email: email,
    securityQuestionId: securityQuestionId,
    securityQuestionAnswer: securityQuestionAnswer,
    password: password,
    password2: confirmPassword
  });
};

export const getSecurityQuestions = async () => {
  const endpoint = new URL('/user/securityQuestions', apiURL).href;
  return await axios.get(endpoint);
};
