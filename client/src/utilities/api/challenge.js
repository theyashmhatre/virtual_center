import { apiURL } from "../../../constants";
import APIRequest from "./APIRequest";

const api = new APIRequest();

export const createChallenge = async ({
  title,
  description,
  coverImage,
  tags,
  endDate,
}) => {
  const formData = new FormData();
  formData.append('coverImage', coverImage);
  formData.append('challengeTitle', title);
  formData.append('challengeDescription', description);
  formData.append('tags', tags);
  formData.append('endDate', endDate);

  const customHeaders = {
    "Content-Type": "multipart/form-data"
  };

  const endpoint = new URL("/api/challenge/create", apiURL).href;
  return await api.post(endpoint, formData, customHeaders);
};

export const getChallenges = async (pageNo) => {
  const endpoint = new URL(
    `/api/challenge/multiple/${pageNo}`,
    apiURL
  ).href;
  return await api.get(endpoint);
};

export const getSingleChallenge = async (challengeId) => {
  const endpoint = new URL(
    `/api/challenge/single/${challengeId}`,
    apiURL
  ).href;
  return await api.get(endpoint);
};

export const searchChallenges = async (searchQuery, pageNo) => {
  const endpoint = new URL(
    `/api/challenge/search/${searchQuery}/${pageNo}`,
    apiURL
  ).href;
  return await api.get(endpoint);
};
