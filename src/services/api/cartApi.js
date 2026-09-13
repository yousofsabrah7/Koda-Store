import apiClient from "../../config/apiClient";

export const getCart = async () => {
    const response = await apiClient.get("/carts")
    return response.data;
};

export const addToCart = async (payload) => {
    const response = await apiClient.post("/carts/items", payload)
    return response.data
};

export const updateItemQuantity = async (payload) => {
    const response = await apiClient.patch("/carts/items", payload)
    return response.data
}

export const removeCartItem = async (productId) => {
    const response = await apiClient.delete(`/carts/items/${productId}`)
    return response.data
}

export const applyCoupon = async (payload) => {
    const response = await apiClient.post("/carts/coupon", payload)
    return response.data
};

export const removeCoupon = async () => {
    const response = await apiClient.post("/carts/coupon")
    return response.data
};

export const clearCart = async () => {
    const response = await apiClient.delete("/carts/clear")
    return response.data
}