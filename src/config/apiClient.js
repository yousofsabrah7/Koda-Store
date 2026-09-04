import axios from "axios";
import { getAuthToken } from "../services/hooksApi";
const BASE_URL = import.meta.env.VITE_API_BASE_UTL;

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});
apiClient.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const status = error.response.status;
      let message = error.response.data?.message || "An error occurred";
      if (status === 401) {
        message = error.response.data?.message || "An error occurred";
      } else if (status === 403) {
        message = error.response.data?.message || "An error occurred";
      } else if (status === 404) {
        message = error.response.data?.message || "An error occurred";
      } else if (status >= 500) {
        message = error.response.data?.message || "An error occurred";
      }
      return Promise.reject({
        statusCode: status,
        message,
      });
    } else if (error.request) {
      return Promise.reject({
        statusCode: 400,
        message: "No response from server",
      });
    } else {
      return Promise.reject({
        statusCode: null,
        message: "Request configuration error",
      });
    }

    return Promise.reject(error);
  },
);
export default apiClient;
