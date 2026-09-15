import apiClient from "../../config/apiClient";

// export const getAllProducts = async (page, limit, search, filter) => {
//   const response = await apiClient.get(
//     `/products?page=${page}&limit=${limit}&category=${filter.category}&subcategory=${filter.subcategory}&brand=${filter.brand}&minPrice=${filter.minPrice}&maxPrice=${filter.maxPrice}&search=${search}&sort=${filter.sort}`,
//   );
//   return response.data;
// };
export const getAllProducts=async (page,limit,search,filter)=>{
  const response=await apiClient.get("/products",{
    params:{
      page:page || undefined,
      search:search,undefined,
      limit :limit || undefined,
      sort:filter.sort || undefined,
      category:filter.category || undefined,
      subcategory:filter.category || undefined,
      brand:filter.brand || undefined,
      minPrice:filter.minPrice || undefined,
      maxPrice:filter.maxPrice || undefined,
    }
  })
  return response.data
}

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

