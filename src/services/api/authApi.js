import apiClient from '../../config/apiClient';

export const sendRegisterOTP = async (payload) => {
  const response = await apiClient.post("/auth/register/send-otp", payload);
  return response.data;
}

export const verifyRegisterOTP = async (payload) => {
  const response = await apiClient.post("/auth/register/verify-otp", payload);
  return response.data;
};

export const loginUser = async (payload) => {
  const response = await apiClient.post("/auth/login", payload);
  return response.data;
};

export const logoutUser = async () => {
  const response = await apiClient.post("/auth/logout");
  return response.data;
};

export const sendForgotPasswordOTP = async (payload) => {
  const response = await apiClient.post("/auth/forgot-password/send-otp", payload);
  return response.data;
};

export const verifyForgotPasswordOTP = async (payload) => {
  const response = await apiClient.post("/auth/forgot-password/verify-otp", payload);
  return response.data;
};


export const getProfile = async () => {
  const response = await apiClient.get("/auth/me");
  return response.data;
};
