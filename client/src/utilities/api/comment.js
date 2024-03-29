import api from "./index";

export const getComments = async (postId, typeId, pageNo=1, limit=5) => {
  const endpoint = `/api/utils/comment/multiple/${postId}/${typeId}/${pageNo}/${limit}`;
  return await api.get(endpoint);
};

export const postComment = async (postId, typeId, commentText) => {
  const endpoint = `/api/utils/comment/create`;
  return await api.post(
    endpoint,
    { postId, typeId, commentText },
    {
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
};

export const upvoteComment = async (commentId, typeId) => {
  const endpoint = `/api/utils/upvote/upvote/${commentId}/${typeId}`;
  return await api.post(endpoint);
};

export const downvoteComment = async (commentId, typeId) => {
  const endpoint = `/api/utils/upvote/downvote/${commentId}/${typeId}`;
  return await api.post(endpoint);
};
