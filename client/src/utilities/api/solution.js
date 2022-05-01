import api from "./index";

export const createSolution = async ({
  challengeId,
  solutionTitle,
  solutionDescription,
  teamMembers,
  attachment,
}) => {
  const endpoint = "/api/solution/create-solution";
  return await api.post(
    endpoint,
    {
      challengeId,
      solutionTitle,
      solutionDescription,
      teamMembers,
      attachment,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const getSolutions = async (challengeId, pageNo = 1, limit = 5) => {
  const endpoint = `/api/solution/get-solutions/${challengeId}/${pageNo}/${limit}`;
  return await api.get(endpoint);
};

export const getSingleSolution = async (solutionId) => {
  const endpoint = `/api/solution/get-single-solution/${solutionId}`;
  return await api.get(endpoint);
};

export const getTeamMembers = async (solutionId) => {
  const endpoint = `/api/solution/get-team-members/${solutionId}`;
  return await api.get(endpoint);
};

export const getSolvers = async (accountId) => {
  const endpoint = `/api/solution/get-solvers/${accountId}`;
  return await api.get(endpoint);
};
