import { useQuery } from "@tanstack/react-query";
import {
  getAllProducts,
  createProduct,
  searchProducts,
  deleteProduct,
  updateProduct,
  getProductById,

} from "../api/productsApi";

export const useProducts = (page, limit, search, filter = {}) => {
  return useQuery({
    queryKey: ["products", page, limit, search, filter],
    queryFn: () => getAllProducts(page, limit, search, filter),
  });
};
export const useProduct = (productId) => {

  return useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProductById(productId),
    enabled: !!productId,
  });
};
