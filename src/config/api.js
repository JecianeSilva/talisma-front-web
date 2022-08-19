import axios from "axios";
import { store } from "../store/index";

const api = axios.create({
  baseURL: "/api/",
});

api.interceptors.request.use((config) => {
  const state = store.getState();
  const { access_token } = state.auth;

  if (access_token) {
    config.headers.Authorization = `Bearer ${access_token}`;
  }

  return config;
});

export default api;
