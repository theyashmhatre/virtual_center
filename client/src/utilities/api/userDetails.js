import api from "./index";

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
