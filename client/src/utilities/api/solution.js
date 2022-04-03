import { apiURL } from "../../../constants";
import APIRequest from "./APIRequest";

const api = new APIRequest();

export const createSolution = async ({
  challengeId,
  solutionTitle,
  solutionDescription,
}) => {
  const endpoint = new URL("/api/solution/create-solution", apiURL).href;
  return await api.post(endpoint, {
    challengeId,
    solutionTitle,
    solutionDescription,
  });
};
