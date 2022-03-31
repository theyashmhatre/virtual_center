import { apiURL } from "../../constants";
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
  formData.append('title', title);
  formData.append('description', description);
  formData.append('tags', tags);
  formData.append('endDate', endDate);

  const customHeaders = {
    "Content-Type": "multipart/form-data"
  };

  const endpoint = new URL("/api/challenge/create-challenge", apiURL).href;
  return await api.post(endpoint, formData, customHeaders);
};
