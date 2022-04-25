import api from "./index";

export const createOffering = async ({
  title,
  description,
  ownerName,
  ownerEmail,
  attachement
}) => {
  const formData = new FormData();
  formData.append("attachement", attachement);
  formData.append("offeringTitle", title);
  formData.append("offeringDescription", description);
  formData.append("ownerName", ownerName);
  formData.append("ownerEmail", ownerEmail);

  const endpoint = "/api/offering/create";
  return await api.post(endpoint, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getOfferings = async (page=1, limit=8) => {
  const endpoint = `/api/offering/multiple/${page}/${limit}`;
  return await api.get(endpoint);
};

export const getSingleOffering = async (id) => {
  const endpoint = `/api/offering/single/${id}`;
  return await api.get(endpoint);
};

export const likeOffering = async (offeringId) => {
  const endpoint = "/api/offering/like";
  return await api.post(
    endpoint,
    { offeringId },
    {
      headers: {
        "Content-Type": "application/json",
      }
    }
  );
};

export const getTotalLikes = async (offeringId) => {
  const endpoint = `/api/offering/${offeringId}/likes/count`;
  return await api.get(endpoint);
};

export const checkLikedByUser = async (offeringId, userId) => {
  const endpoint = `/api/offering/check-like/${userId}/${offeringId}`;
  return await api.get(endpoint);
}
