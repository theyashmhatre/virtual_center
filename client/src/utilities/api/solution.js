import api from "./index";

export const createSolution = async ({
  challengeId,
  solutionTitle,
  teamMembers,
  solutionDescription,
}) => {
  const endpoint = "/api/solution/create-solution";
  // console.log(teamMembers);
  return await api.post(
    endpoint,
    {
      challengeId,
      solutionTitle,
      teamMembers,
      solutionDescription,
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
