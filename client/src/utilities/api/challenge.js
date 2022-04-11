import api from "./index";

export const createChallenge = async ({
  title,
  description,
  cloudProvider,
  coverImage,
  tags,
  endDate,
}) => {
  const formData = new FormData();
  formData.append("coverImage", coverImage);
  formData.append("challengeTitle", title);
  formData.append("challengeDescription", description);
  formData.append("cloudProvider", cloudProvider);
  formData.append("tags", tags);
  formData.append("endDate", endDate);

  const endpoint = "/api/challenge/create";
  return await api.post(endpoint, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getChallenges = async (pageNo, limit, sortedBy, order) => {
  const endpoint = `/api/challenge/multiple/${pageNo}/${limit}/${sortedBy}/${order}`;
  return await api.get(endpoint);
};

export const getSingleChallenge = async (challengeId) => {
  const endpoint = `/api/challenge/single/${challengeId}`;
  return await api.get(endpoint);
};

export const searchChallenges = async (searchQuery, pageNo) => {
  const endpoint = `/api/challenge/search/${searchQuery}/${pageNo}`;
  return await api.get(endpoint);
};
