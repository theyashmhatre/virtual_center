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

export const getSolutions = async (challengeId, pageNo) => {
  const endpoint = new URL(
    `/api/solution/get-solutions/${challengeId}/${pageNo}`,
    apiURL
  ).href;
  return await api.get(endpoint);
};

export const getSingleSolution = async (solutionId) => {
  const endpoint = new URL(
    `/api/solution/get-single-solution/${solutionId}`,
    apiURL
  ).href;
  return await api.get(endpoint);
};

export const getComments = async (solutionId, pageNo=1) => {
  const endpoint = new URL(
    `/api/solution/comments/${solutionId}`,
    apiURL
  ).href;
  return await api.get(endpoint);
};

export const postComment = async (solutionId, commentText) => {
  const endpoint = new URL(
    `/api/solution/${solutionId}/comment`,
    apiURL
  ).href;
  return await api.post(endpoint, { commentText });
};

export const getSolvers = async (accountId) => {
  const endpoint = new URL(
    `/api/solution/get-solvers/${accountId}`,
    apiURL
  ).href;
  return await api.get(endpoint);
}
