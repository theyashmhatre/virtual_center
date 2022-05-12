import api from "./index";

export const getUsers = () => {
  const endpoint = "/api/user/get-users";
  return api.get(endpoint);
};

export const getAdmins = () => {
  const endpoint = "/api/user/get-admins";
  return api.get(endpoint);
};

export const updateStatusToActive = (username) => {
  const endpoint = `/api/user/active/${username}`;
  return api.post(endpoint);
};

export const updateStatusToInactive = (username) => {
  const endpoint = `/api/user/inactive/${username}`;
  return api.post(endpoint);
};

export const changeUserToAdmin = (username) => {
  const endpoint = `/api/user/change-to-admin/${username}`;
  return api.post(endpoint);
};

export const changeAdminToUser = (username) => {
  const endpoint = `/api/user/change-to-user/${username}`;
  return api.post(endpoint);
};
