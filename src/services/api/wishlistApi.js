import apiClient from "../../config/apiClient";

export const getWishlist = async () => {
  const response = await apiClient.get("/wishlists/my");
  return response.data;
};

export const addToWishlist = async (productId) => {
  const response = await apiClient.post(`/wishlists/add/${productId}`);
  return response.data;
};

export const removeFromWishlist = async (productId) => {
  const response = await apiClient.delete(`/wishlists/remove/${productId}`);
  return response.data;
};

export const clearWishlist = async () => {
  const response = await apiClient.delete("/wishlists/clear");
  return response.data;
};