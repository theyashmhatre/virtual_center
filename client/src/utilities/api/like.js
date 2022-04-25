import api from "./index";

export const like = async (postId, typeId) => {
  const endpoint = `/api/utils/like/like/${postId}/${typeId}`;
  return await api.post(endpoint);
};

export const unlike = async (postId, typeId) => {
  const endpoint = `/api/utils/like/unlike/${postId}/${typeId}`;
  return await api.post(endpoint);
};

export const getTotalLikes = async (postId, typeId) => {
  const endpoint = `/api/utils/like/get-likes/${postId}/${typeId}`;
  return await api.get(endpoint);
};
