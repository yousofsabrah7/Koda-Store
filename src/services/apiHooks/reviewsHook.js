import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { addReview, getProductReviews, deleteReview } from "../api/reviewsApi";

export const useProductReviews = (productId) => {
  return useQuery({
    queryKey: ["reviews", productId],
    queryFn: () => getProductReviews(productId),
    enabled: !!productId,
  });
};

export const useAddReview = (productId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => addReview(productId, payload),

    onSuccess: () => {
      toast.success("Review added successfully");

      // Refresh reviews automatically
      queryClient.invalidateQueries({
        queryKey: ["reviews", productId],
      });
    },

    onError: (error) => {
      const message = error.message || "Failed to add review";

      toast.error(message);
    },
  });
};

export const useDeleteReview = (productId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (reviewId) => deleteReview(productId, reviewId),

    onSuccess: () => {
      toast.success("Review deleted successfully");

      // Refresh reviews automatically
      queryClient.invalidateQueries({
        queryKey: ["reviews", productId],
      });
    },

    onError: (error) => {
      const message = error.message || "Failed to delete review";

      toast.error(message);
    },
  });
};
