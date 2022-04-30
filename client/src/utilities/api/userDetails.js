import api from "./index";

export const getUserDetails = () => {
  const endpoint = "/api/user/get-users";
  return api.get(endpoint);
};

export const getAdminDetails = () => {
  const endpoint = "/api/user/get-admins";
  return api.get(endpoint);
};
