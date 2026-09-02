import axios from "axios";
import getAuthToken from "../server/hooksApi";
const apiClient = axios.create({
  baseURL: "https://e-commerce-api-3wara.vercel.app",
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
      const status = error.response.status;

      if (status === 401) {
        console.log("Unauthorized - token expired or invalid");
        localStorage.removeItem("userToken");
        window.location.href = "/login";
      } else if (status === 403) {
        console.log("Forbidden - no permission");
      } else if (status === 404) {
        console.log("Resource not found");
      } else if (status >= 500) {
        console.log("Server error");
      }
    } else if (error.request) {
      console.log("No response from server");
    } else {
      console.log("Request configuration error");
    }

    return Promise.reject(error);
  })
export default apiClient;
