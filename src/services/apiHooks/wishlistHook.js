import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useEffect } from "react";
import toast from "react-hot-toast";

import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
} from "../api/wishlistApi";
import { useNavigate } from "react-router-dom";

const useQueryErrorToast = (query) => {
  useEffect(() => {
    if (query.isError) {
      const message = query.error.message || "Something went wrong";

      query.error.statusCode !== 401 ? toast.error(message) : null;
    }
  }, [query.isError, query.error]);
};

export const useWishlist = () => {
  const query = useQuery({
    queryKey: ["wishlist"],
    queryFn: getWishlist,
  });

  useQueryErrorToast(query);

  return query;
};

export const useAddToWishlist = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addToWishlist,

    onSuccess: () => {
      toast.success("Product added to wishlist.");

      queryClient.invalidateQueries({
        queryKey: ["wishlist"],
      });
    },

    onError: (error) => {
      if (error.statusCode === 401) {
        navigate("/login", { replace: true });
      }
      const message = error.message || "Failed to add product to wishlist.";

      error.statusCode !== 401 ? toast.error(message) : null;
    },
  });
};

export const useRemoveFromWishlist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeFromWishlist,

    onSuccess: () => {
      toast.success("Product removed from wishlist.");

      queryClient.invalidateQueries({
        queryKey: ["wishlist"],
      });
    },

    onError: (error) => {
      const message =
        error.message || "Failed to remove product from wishlist.";

      toast.error(message);
    },
  });
};

export const useClearWishlist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: clearWishlist,

    onSuccess: () => {
      toast.success("Wishlist cleared successfully.");

      queryClient.invalidateQueries({
        queryKey: ["wishlist"],
      });
    },

    onError: (error) => {
      const message = error.message || "Failed to clear wishlist.";

      toast.error(message);
    },
  });
};
