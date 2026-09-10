import apiClient from "../../config/apiClient";

export const adminWishlist = async (page, limit) => {
  const response = await apiClient.get(
    `/wishlists/admin/all?page=${page}&limit=${limit}`,
  );
  return response.data;
};
export const adminWishlistStatus = async () => {
  const response = await apiClient.get(`/wishlists/admin/status`);
  return response.data;
};
