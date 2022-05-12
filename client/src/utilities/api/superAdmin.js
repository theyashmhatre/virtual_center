import api from "./index";

export const getUsers = () => {
  const endpoint = "/api/super-admin/get-users";
  return api.get(endpoint);
};

export const getAdmins = () => {
  const endpoint = "/api/super-admin/get-admins";
  return api.get(endpoint);
};

export const updateStatusToActive = (username) => {
  const endpoint = `/api/super-admin/active/${username}`;
  return api.post(endpoint);
};

export const updateStatusToInactive = (username) => {
  const endpoint = `/api/super-admin/inactive/${username}`;
  return api.post(endpoint);
};

export const changeUserToAdmin = (username) => {
  const endpoint = `/api/super-admin/change-to-admin/${username}`;
  return api.post(endpoint);
};

export const changeAdminToUser = (username) => {
  const endpoint = `/api/super-admin/change-to-user/${username}`;
  return api.post(endpoint);
};
