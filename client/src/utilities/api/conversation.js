import api from ".";

export const getConversations = () => {
  const endpoint = "/api/conversation/all";
  return api.get(endpoint);
};

export const getConversationWithUserId = (userId) => {
  const endpoint = `/api/conversation/get-messages/${userId}`;
  return api.get(endpoint);
};

export const getUserDetails = (userId) => {
  const endpoint = `/api/conversation/user-details/${userId}`;
  return api.get(endpoint);
};

export const markAllMesssaageUnread = (userId) => {
  const endpoint = `/api/conversation/mark-all-unread/${userId}`;
  return api.post(endpoint);
};

export const sendMessageToUser = (message, userId) => {
  const endpoint = `/api/conversation/send-message/${userId}`;
  return api.post(
    endpoint,
    {
      message: message,
    },
    {
      headers: {
        "Content-Type": "application/json",
      }
    }
  );
};
