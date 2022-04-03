import { apiURL } from "../../../constants";
import APIRequest from "./APIRequest";
import axios from "axios";
import jwt from "jsonwebtoken";

const api = new APIRequest();

export const getOfferings = async (page) => {
  const endpoint = new URL(`/api/offering/get-offerings/${page}`, apiURL).href;
  return await api.get(endpoint);
};
