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

export const getSolutions = async (challengeId, pageNo) => {
  const endpoint = `/api/solution/get-solutions/${challengeId}/${pageNo}`;
  return await api.get(endpoint);
};

export const getSingleSolution = async (solutionId) => {
  const endpoint = `/api/solution/get-single-solution/${solutionId}`;
  return await api.get(endpoint);
};

export const getComments = async (solutionId, pageNo=1) => {
  const endpoint = `/api/solution/comments/${solutionId}`;
  return await api.get(endpoint);
};

export const postComment = async (solutionId, commentText) => {
  const endpoint = `/api/solution/${solutionId}/comment`;
  return await api.post(endpoint, { commentText }, {
    headers: {
      "Content-Type": "application/json"
    }
  });
};

export const getSolvers = async (accountId) => {
  const endpoint = `/api/solution/get-solvers/${accountId}`;
  return await api.get(endpoint);
}
