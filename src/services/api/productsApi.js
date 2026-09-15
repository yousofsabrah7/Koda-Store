import apiClient from "../../config/apiClient";

export const getAllProducts = async (page, limit, search, filter= {}) => {
  const response = await apiClient.get(
    "/products", {
      params: {
        page,
        limit,
        category: filter.category,
        subcategory: filter.subcategory,
        brand: filter.brand,
        minPrice: filter.minPrice,
        maxPrice: filter.maxPrice,
        search,
        sort: filter.sort,
      }
    }
  );
  return response.data;
};


export const getProductById = async (id) => {
  const response = await apiClient.get(`/products/${id}`);
  return response.data;
};
