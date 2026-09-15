import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAllProducts,
  // createProduct,
  searchProducts,
  getProductById,
  // deleteProduct,
  // updateProduct,
} from "../api/productsApi";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

export const useProducts = (page, limit, search, filter = {}) => {
  return useQuery({
    queryKey: ["products", page, limit, search, filter],
    queryFn: () => getAllProducts(page, limit, search, filter),
  });
};



export const useSearchProducts = (page, limit, search, filter = {}) => {
  return useQuery({
    queryKey: ["searchProducts", page, limit, search, filter],
    queryFn: () => searchProducts(page, limit, search, filter),
  });
};

export const useProduct = (productId) => {
  const dispatch = useDispatch();

  return useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProductById(productId),
    enabled: !!productId,
  });
};



