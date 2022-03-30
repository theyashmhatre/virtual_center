import { apiURL } from "../../constants";
import APIRequest from "./APIRequest";

const api = new APIRequest();

export const createChallenge = async ({
  title,
  description,
  tags,
  endDate
}) => {
  const endpoint = new URL("/api/challenge/create-challenge", apiURL).href;
  return await api.post(endpoint, {
    title,
    description,
    tags,
    endDate
  });
};