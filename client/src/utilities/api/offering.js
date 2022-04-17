import api from "./index";

export const getOfferings = async (page=1, limit=8) => {
  const endpoint = `/api/offering/multiple/${page}/${limit}`;
  return await api.get(endpoint);
};

export const getSingleOffering = async (id) => {
  const endpoint = `/api/offering/single/${id}`;
  return await api.get(endpoint);
};

export const getOfferingComments = async (offeringId, pageNo = 1, limit=5) => {
  const endpoint = `/api/offering/comment/multiple/${offeringId}/${pageNo}/${limit}`;
  return await api.get(endpoint);
};

export const postOfferingComment = async (offeringId, commentText) => {
  const endpoint = `/api/offering/comment/create`;
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
