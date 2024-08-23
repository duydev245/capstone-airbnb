import { getLocalStorage } from "../utils/index";
import axios from "axios";
import { BASE_URL, TOKEN_CYBERSOFT } from "../constants/urlConfig";

const fetcher = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    TokenCybersoft: TOKEN_CYBERSOFT,
  },
});

fetcher.interceptors.request.use((config) => {
  const token = getLocalStorage("token");

  config.headers = {
    ...config.headers,
    token: token ? `${token}` : "",
  };

  return config;
});

export default fetcher;
