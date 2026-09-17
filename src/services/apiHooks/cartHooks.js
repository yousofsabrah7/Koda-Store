import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import toast from "react-hot-toast";

import {
  getCart,
  addToCart,
  updateItemQuantity,
  removeCartItem,
  applyCoupon,
  removeCoupon,
  clearCart,
} from "../api/cartApi";




export const useCart = () => {
  return useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
  });
};




export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addToCart,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });

      toast.success("Product added to cart");
    },

    onError: (error) => {
      const message =
        error?.response?.data?.message ||
        "Failed to add product to cart";

      toast.error(message);
    },
  });
};




export const useUpdateItemQuantity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateItemQuantity,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });

      toast.success("Cart updated");
    },

    onError: (error) => {
      const message =
        error?.response?.data?.message ||
        "Failed to update quantity";

      toast.error(message);
    },
  });
};




export const useRemoveCartItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeCartItem,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });

      toast.success("Removed from cart");
    },

    onError: (error) => {
      const message =
        error?.response?.data?.message ||
        "Failed to remove product";

      toast.error(message);
    },
  });
};




export const useApplyCoupon = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: applyCoupon,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });

      toast.success("Coupon applied successfully");
    },

    onError: (error) => {
      const message =
        error?.response?.data?.message ||
        "Failed to apply coupon";

      toast.error(message);
    },
  });
};




export const useRemoveCoupon = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeCoupon,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });

      toast.success("Coupon removed");
    },

    onError: (error) => {
      const message =
        error?.response?.data?.message ||
        "Failed to remove coupon";

      toast.error(message);
    },
  });
};


export const useClearCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: clearCart,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });

      toast.success("Cart cleared");
    },

    onError: (error) => {
      const message =
        error?.response?.data?.message ||
        "Failed to clear cart";

      toast.error(message);
    },
  });
};