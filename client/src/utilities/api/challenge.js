import api from "./index";

export const createChallenge = async ({
  title,
  description,
  cloudProvider,
  coverImage,
  tags,
  endDate,
}) => {
  const endpoint = "/api/challenge/create";
  let tagString = ""
  tags.map((tag, index) => {
    if (index) tagString += ","
    tagString += tag
  })

  return await api.post(endpoint, {
    coverImage: coverImage,
    challengeTitle: title,
    challengeDescription: description,
    cloudProvider: cloudProvider,
    tags: tagString,
    endDate: endDate,
  }, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const editChallenge = async ({
  title,
  description,
  cloudProvider,
  coverImage,
  tags,
  endDate,
  challengeId
}) => {
  const endpoint = `/api/challenge/edit/${challengeId}`;
  let tagString = ""
  tags.map((tag, index) => {
    if (index) tagString += ","
    tagString += tag
  })

  return await api.post(endpoint, {
    coverImage: coverImage,
    challengeTitle: title,
    challengeDescription: description,
    cloudProvider: cloudProvider,
    tags: tagString,
    endDate: endDate,
  }, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const deleteChallenge = async (challengeId) => {
  const endpoint = `/api/challenge/delete/${challengeId}`;
  return await api.delete(endpoint);
};

export const getChallenges = async (pageNo, limit, sortedBy, order) => {
  const endpoint = `/api/challenge/multiple/${pageNo}/${limit}/${sortedBy}/${order}`;
  return await api.get(endpoint);
};

export const getSingleChallenge = async (challengeId) => {
  const endpoint = `/api/challenge/single/${challengeId}`;
  return await api.get(endpoint);
};

export const getFilteredChallenges = async (accountName, pageNo, limit, sortedBy, order) => {
  const endpoint = `/api/dashboard/get-challenges/${accountName}/${pageNo}/${limit}/${sortedBy}/${order}`;
  return await api.get(endpoint);
};

export const searchChallenges = async (searchQuery, pageNo) => {
  const endpoint = `/api/challenge/search/${searchQuery}/${pageNo}`;
  return await api.get(endpoint);
};

export const getDeletedChallenges = async (pageNo=1, limit=10) => {
  const endpoint = `/api/challenge/deleted-challenges/${pageNo}/${limit}`;
  return await api.get(endpoint);
};
