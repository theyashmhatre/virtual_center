import { apiURL } from "../../../constants";
import APIRequest from "./APIRequest";
import axios from "axios";
import jwt from "jsonwebtoken";

const api = new APIRequest();

export const getOfferings = async (page) => {
  const endpoint = new URL(`/api/offering/multiple/${page}`, apiURL).href;
  return await api.get(endpoint);
};

export const getSingleOffering = async (id) => {
  const endpoint = new URL(`/api/offering/single/${id}`, apiURL).href;
  return await api.get(endpoint);
};
