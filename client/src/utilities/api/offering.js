import api from "./index";

export const getOfferings = async (page) => {
  const endpoint = `/api/offering/multiple/${page}/4`;
  return await api.get(endpoint);
};

export const getSingleOffering = async (id) => {
  const endpoint = `/api/offering/single/${id}`;
  return await api.get(endpoint);
};

export const getComments = async (offeringId, pageNo = 1) => {
  const endpoint = `/api/offering/get-comments/${offeringId}/${pageNo}`;
  return await api.get(endpoint);
};

export const postComment = async (offeringId, commentText) => {
  const endpoint = `/api/offering/comment`;
  return await api.post(
    endpoint,
    { offeringId, commentText },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
