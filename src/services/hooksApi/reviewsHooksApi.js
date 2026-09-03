import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import * as reviewsApi from "../endpoints/reviewsEndpoints"


// Reviews
export const useGetProductReviews = (productId) => {
  return useQuery({
    queryKey: ["productReviews", productId],
    queryFn: () => reviewsApi.getProductReviews(productId),
    enabled: !!productId,
  });
};

export const useAddReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ productId, payload }) => reviewsApi.addReview(productId, payload),
    onSuccess: (data, variables) => {
      toast.success("Review added successfully");
      queryClient.invalidateQueries({ queryKey: ["productReviews", variables.productId] });
    },
    onError: (error) => {
      const message = error?.response?.data?.message || "Failed to add review";
      toast.error(message);
    },
  });
};

export const useDeleteReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ productId, reviewId }) => reviewsApi.deleteReview(productId, reviewId),
    onSuccess: (data, variables) => {
      toast.success("Review deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["productReviews", variables.productId] });
    },
    onError: (error) => {
      const message = error?.response?.data?.message || "Failed to delete review";
      toast.error(message);
    },
  });
};
