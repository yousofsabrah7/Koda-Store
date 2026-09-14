import apiClient from "../../config/apiClient";

export const placeOrder = async (payload) => {
    const response = await apiClient.post("/orders", payload);
    return response.data;
};

export const getMyOrders = async () => {
    const response = await apiClient.get("/orders/my");
    return response.data;
};

export const getSingleOrder = async (orderId) => {
    const response = await apiClient.get(`/orders/my/${orderId}`);
    return response.data;
};

export const cancelOrder = async (orderId) => {
    const response = await apiClient.patch(`/orders/my/${orderId}/cancel`);
    return response.data;
}