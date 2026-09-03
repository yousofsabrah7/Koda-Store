import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import * as productsApi from "../endpoints/produtsEndpoints";

// Products
export const useProducts = () => {
    return useQuery({
        queryKey: ["products"],
        queryFn: productsApi.getAllProducts,
    });
};

export const useCreateProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: productsApi.createProduct,
        onSuccess: () => {
            toast.success("Product created successfully");
            queryClient.invalidateQueries({ queryKey: ["products"] });  // auto update products
        },
        onError: (error) => {
            const message = error?.response?.data?.message || "Failed to create product";
            toast.error(message);
        },
    });
};

export const useSearchProducts = (searchTerm) => {
    return useQuery({
        queryKey: ["searchProducts", searchTerm],
        queryFn: () => productsApi.searchProducts(searchTerm),
        enabled: !!searchTerm,
    });
}

export const useProduct = (id) => {
    return useQuery({
        queryKey: ["product", id],
        queryFn: () => productsApi.getProductById(id),
        enabled: !!id,
    });
}

export const useDeleteProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: productsApi.deleteProduct,
        onSuccess: () => {
            toast.success("Product deleted successfully");
            queryClient.invalidateQueries({ queryKey: ["products"] });
        },
        onError: (error) => {
            const message = error?.response?.data?.message || "Failed to delete product";
            toast.error(message);
        },
    });
}

export const useUpdateProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, payload }) => productsApi.updateProduct(id, payload),
        onSuccess: () => {
            toast.success("Product updated successfully");
            queryClient.invalidateQueries({ queryKey: ["products"] });
        },
        onError: (error) => {
            const message = error?.response?.data?.message || "Failed to update product";
            toast.error(message);
        },
    });
}