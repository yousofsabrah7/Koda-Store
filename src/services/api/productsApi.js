import apiClient from "../../config/apiClient";

export const getAllProducts = async (page, limit, search, filter) => {
  const response = await apiClient.get(
    `/products?page=${page}&limit=${limit}&category=${filter.category}&subcategory=${filter.subcategory}&brand=${filter.brand}&minPrice=${filter.minPrice}&maxPrice=${filter.maxPrice}&search=${search}&sort=${filter.sort}`,
  );
  return response.data;
};

export const createProduct = async (payload) => {
  const response = await apiClient.post("/products", payload);
  return response.data;
};
// filter:{
//  category,
//  subcategory,
//  brand,
//  minPrice,
//  maxPrice,
//  sort
// }

export const searchProducts = async (page, limit, search, filter) => {
  const response = await apiClient.get(
    `/products/search?page=${page}&limit=${limit}&category=${filter.category}&subcategory=${filter.subcategory}&brand=${filter.brand}&minPrice=${filter.minPrice}&maxPrice=${filter.maxPrice}&search=${search}&sort=${filter.sort}`,
  );
  return response.data;
};

export const getProductById = async (id) => {
  const response = await apiClient.get(`/products/${id}`);
  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await apiClient.delete(`/products/${id}`);
  return response.data;
};

export const updateProduct = async (id, payload) => {
  const response = await apiClient.patch(`/products/update/${id}`, payload);
  return response.data;
};
