import axios from "axios";
import { store } from "../store/index";

const Api = axios.create({
  // baseURL: "/api/",
  baseURL: "http://localhost:3333/",
});

Api.interceptors.request.use((config) => {
  const state = store.getState();
  const { token } = state.auth;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

Api.interceptors.response.use((response) => {
  return response;
});
export default Api;
