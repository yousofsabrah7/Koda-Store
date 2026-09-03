import apiClient from "../../config/apiClient";

export const sendRegisterOtp = async (payload) => {
    const response = await apiClient.post('/auth/register/send-otp', payload);
    return response.data;
};

export const verifyRegisterOtp = async (payload) => {
    const response = await apiClient.post('/auth/register/verify-otp', payload);
    return response.data;
};

export const loginUser = async (payload) => {
    const response = await apiClient.post('/auth/login', payload);
    return response.data;
};

export const logoutUser = async () => {
    const response = await apiClient.post('/auth/logout');
    return response.data;
};

export const sendForgotPasswordOtp = async (payload) => {
    const response = await apiClient.post('/auth/forgot-password/send-otp', payload);
    return response.data;
};

export const verifyResetPassword = async (payload) => {
    const response = await apiClient.post('/auth/forgot-password/verify-otp', payload);
    return response.data;
};

export const getCurrentUser = async () => {
    const response = await apiClient.get('/auth/me');
    return response.data;
};

export const adminTest = async () => {
    const response = await apiClient.get('/auth/admin-test');
    return response.data;
};

export const changeUserRole = async (payload) => {
    const response = await apiClient.patch('/auth/change-role', payload);
    return response.data;
};