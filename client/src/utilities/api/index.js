import axios from "axios";
import { apiURL } from "../../../constants";

axios.defaults.headers.common = {
  'pragma': 'no-cache',
  'cache-control': 'no-cache',
};

const api = axios.create({
  baseURL: apiURL
});

api.interceptors.request.use((req) => {
  if (sessionStorage.getItem('Access Token')) {
    req.headers.Authorization = `Bearer ${sessionStorage.getItem('Access Token')}`;
  }
  return req;
});

export default api;
