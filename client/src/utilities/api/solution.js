import api from "./index";

export const createSolution = async ({
  challengeId,
  solutionTitle,
  solutionDescription,
}) => {
  const endpoint = "/api/solution/create-solution";
  return await api.post(endpoint, {
    challengeId,
    solutionTitle,
    solutionDescription,
  }, {
    headers: {
      "Content-Type": "application/json"
    }
  });
};

export const getSolutions = async (challengeId, pageNo=1) => {
  const endpoint = `/api/solution/get-solutions/${challengeId}/${pageNo}`;
  return await api.get(endpoint);
};

export const getSingleSolution = async (solutionId) => {
  const endpoint = `/api/solution/get-single-solution/${solutionId}`;
  return await api.get(endpoint);
};

export const getSolutionComments = async (solutionId, pageNo=1, limit=5) => {
  const endpoint = `/api/solution/get-comments/${solutionId}/${pageNo}`;
  return await api.get(endpoint);
};

export const postSolutionComment = async (solutionId, commentText) => {
  const endpoint = `/api/solution/${solutionId}/comment`;
  return await api.post(endpoint, { commentText }, {
    headers: {
      "Content-Type": "application/json"
    }
  });
};

export const upvoteSolutionComment = async (commentId) => {
  const endpoint = `/api/solution/upvote/${commentId}`;
  return await api.post(endpoint);
};

export const downvoteSolutionComment = async (commentId) => {
  const endpoint = `/api/solution/downvote/${commentId}`;
  return await api.post(endpoint);
};

export const getSolvers = async (accountId) => {
  const endpoint = `/api/solution/get-solvers/${accountId}`;
  return await api.get(endpoint);
};
