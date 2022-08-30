import axios from "axios";
import { store } from "../store/index";

const Api = axios.create({
  // baseURL: "/api/",
  baseURL: "http://localhost:3333/",
});

Api.interceptors.request.use((config) => {
  const state = store.getState();
  const { access_token } = state.auth;

  if (access_token) {
    config.headers.Authorization = `Bearer ${access_token}`;
  }

  return config;
});

Api.interceptors.response.use((response) => {
  return response;
});
export default Api;
