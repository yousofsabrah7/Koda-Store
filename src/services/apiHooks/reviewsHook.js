import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addReview, getProductReviews, deleteReview } from "../api/reviewsApi";

export const useProductReviews = (productId) => {
  const dispatch = useDispatch();
  return useQuery({
    queryKey: ["reviews", productId],
    queryFn: () => getProductReviews(productId),
    enabled: !!productId,
  });
};

export const useAddReview = (productId) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: (payload) => addReview(productId, payload),
    onSuccess: () => {
      toast.success("Product created successfully");
      queryClient.invalidateQueries({ queryKey: ["reviews"] }); // auto update products
    },
    onError: (error) => {
      const message =
        error?.response?.data?.message || "Failed to create product";
      toast.error(message);
    },
  });
};

export const useDeleteReview = (productId) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: (reviewId) => deleteReview(productId, reviewId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews", productId] });
    },
    onError: (error) => {
      const message =
        error?.response?.data?.message || "Failed to delete product";
      toast.error(message);
    },
  });
};
