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

export const getChallengeComments = async (challengeId, pageNo=1, limit=5) => {
  const endpoint = `/api/challenge/comment/multiple/${challengeId}/${pageNo}/${limit}`;
  return await api.get(endpoint);
};

export const postChallengeComment = async (challengeId, commentText) => {
  const endpoint = `/api/challenge/comment/create`;
  return await api.post(endpoint, { challengeId, commentText }, {
    headers: {
      "Content-Type": "application/json"
    }
  });
};

export const upvoteChallengeComment = async (commentId) => {
  const endpoint = '/api/challenge/comment/upvote';
  return await api.post(endpoint, { commentId }, {
    headers: { "Content-Type": "application/json" }
  });
};

export const downvoteChallengeComment = async (commentId) => {
  const endpoint = '/api/challenge/comment/downvote';
  return await api.post(endpoint, { commentId }, {
    headers: { "Content-Type": "application/json" }
  });
};
