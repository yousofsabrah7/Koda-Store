import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";

import { useDispatch } from "react-redux";

import {
  getCart,
  addToCart,
  updateItemQuantity,
  removeCartItem,
  applyCoupon,
  removeCoupon,
  clearCart,
} from "../api/cartApi";

import { getAuthToken } from "./authHook";

import { setCart, clearCartState } from "../../redux/services/cartSlice";
import { useNavigate } from "react-router-dom";

// =========================
// Get Cart
// =========================

export const useCart = () => {
  const token = getAuthToken();
  const dispatch = useDispatch();

  return useQuery({
    queryKey: ["cart", token],

    queryFn: getCart,

    enabled: !!token,

    retry: (failureCount, error) => {
      if (error?.statusCode === 401) return false;

      return failureCount < 2;
    },

    onSuccess: (response) => {
      dispatch(setCart(response));
    },
  });
};

// =========================
// Add To Cart
// =========================

export const useAddToCart = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: addToCart,

    onSuccess: (response) => {
      // Update Redux
      dispatch(setCart(response));

      // Update React Query
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });

      toast.success("Product added to cart");
    },

    onError: (error) => {
      if (error.statusCode === 401) {
        navigate("/login", { replace: true });
      }
      toast.error(error?.message || "Failed to add product to cart");
    },
  });
};

// =========================
// Update Item Quantity
// =========================

export const useUpdateItemQuantity = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: updateItemQuantity,

    onSuccess: (response) => {
      // Update Redux
      dispatch(setCart(response));

      // Refetch Cart
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });

      toast.success("Cart updated");
    },

    onError: (error) => {
      toast.error(error?.message || "Failed to update quantity");
    },
  });
};

// =========================
// Remove Cart Item
// =========================

export const useRemoveCartItem = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: removeCartItem,

    onSuccess: (response) => {
      // Update Redux
      dispatch(setCart(response));

      // Refetch Cart
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });

      toast.success("Product removed from cart");
    },

    onError: (error) => {
      toast.error(error?.message || "Failed to remove product");
    },
  });
};

// =========================
// Apply Coupon
// =========================

export const useApplyCoupon = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: applyCoupon,

    onSuccess: (response) => {
      // Update Redux
      dispatch(setCart(response));

      // Refetch Cart
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });

      toast.success("Coupon applied successfully");
    },

    onError: (error) => {
      toast.error(error?.message || "Failed to apply coupon");
    },
  });
};

// =========================
// Remove Coupon
// =========================

export const useRemoveCoupon = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: removeCoupon,

    onSuccess: (response) => {
      // Update Redux
      dispatch(setCart(response));

      // Refetch Cart
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });

      toast.success("Coupon removed");
    },

    onError: (error) => {
      toast.error(error?.message || "Failed to remove coupon");
    },
  });
};

// =========================
// Clear Cart
// =========================

export const useClearCart = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: clearCart,

    onSuccess: () => {
      // Clear Redux
      dispatch(clearCartState());

      // Refetch Cart
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });

      toast.success("Cart cleared");
    },

    onError: (error) => {
      toast.error(error?.message || "Failed to clear cart");
    },
  });
};
