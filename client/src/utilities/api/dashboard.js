import api from "./index";

export const getChallengesCounts = async () => {
  const endpoint = "/api/dashboard/account-analytics";
  return await api.get(endpoint);
};

export const getMostSubmissions = async (year) => {
  const endpoint = `/api/dashboard/most-submissions/${year}`;
  return await api.get(endpoint);
};
