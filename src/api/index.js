import axios from "axios";
import { getToken } from "./storage";

export const BASE_URL = "https://react-bank-project.eapi.joincoded.com";

const instance = axios.create({
  baseURL: BASE_URL,
});
instance.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
export default instance;
