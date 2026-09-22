import { useQuery } from "@tanstack/react-query";

import {
  getAllProducts,
  getProductById,
} from "../api/productsApi";

export const useProducts = (
  page,
  limit,
  search,
  filter = {},
  enabled = true
) => {
  return useQuery({
    queryKey: ["products", page, limit, search, filter],
    queryFn: () =>
      getAllProducts(
        page,
        limit,
        search,
        filter
      ),
    enabled,
  });
};

export const useProduct = (productId) => {
  return useQuery({
    queryKey: ["product", productId],
    queryFn: () =>
      getProductById(productId),
    enabled: !!productId,
  });
};