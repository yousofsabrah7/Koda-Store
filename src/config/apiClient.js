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
      console.log(error.response);
      const status = error.response.status;
      let message = "Something went wrong";
      if (status === 401) {
        message = "Unauthorized - token expired or invalid";
      } else if (status === 403) {
        message = "Forbidden - no permission";
      } else if (status === 404) {
        message = "Resource not found";
      } else if (status >= 500) {
        message = "Server error";
      }
      return Promise.reject({
        statusCode: status,
        message,
      });
    } else if (error.request) {
      return Promise.reject({
        statusCode: null,
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
