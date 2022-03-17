import axios from "axios";
import { apiURL } from "../../constants";

class APIRequest {
  // Send GET requests with Authorization headers
  async get(endpoint) {
    const url = new URL(endpoint, apiURL).href;
    const token = sessionStorage.getItem('Access Token');

    return await axios.get(url, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    });
  };

  // Send POST requests with Authorization headers
  async post(endpoint, body=null) {
    const url = new URL(endpoint, apiURL).href;
    const token = sessionStorage.getItem('Access Token');

    return await axios.post(url, body, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    });
  };

  // Send PUT requests with Authorization headers
  async put(endpoint, body=null) {
    const url = new URL(endpoint, apiURL).href;
    const token = sessionStorage.getItem('Access Token');

    return await axios.get(url, body, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    });
  };
};

export default APIRequest;
