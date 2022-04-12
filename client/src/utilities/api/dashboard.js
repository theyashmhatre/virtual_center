import api from "./index";

export const getChallengesCounts = async () => {
  const endpoint = "/api/dashboard/account-analytics";
  return await api.get(endpoint);
}