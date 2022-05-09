import api from "./index";

export const getUserDetails = () => {
  const endpoint = "/api/user/get-users";
  return api.get(endpoint);
};

export const getAdminDetails = () => {
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

export const profile = async (userId) => {
  const endpoint = `/api/user/profile/${userId}`;
  return await api.get(endpoint);
};

export const updateProfile = async ({
  name,
  email,
  contact,
  location,
  displayPicture
}) => {
  const endpoint = "/api/user/update-profile";
  return await api.post(
    endpoint,
    {
      employeeName: name,
      email,
      contactNumber: contact,
      location,
      displayPicture
    },
    {
      headers: {
        "Content-Type": "application/json",
      }
    }
  );
};

export const changePassword = async (password, confirmPassword) => {
  const endpoint = "/api/user/change-password";
  return await api.post(
    endpoint,
    {
      password,
      confirmPassword
    },
    {
      headers: {
        "Content-Type": "application/json",
      }
    }
  );
};
