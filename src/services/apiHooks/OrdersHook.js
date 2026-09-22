import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";

import {
  placeOrder,
  getMyOrders,
  getSingleOrder,
  cancelOrder,
} from "../api/ordersApi";

export const useMyOrders = ({ page = 1, limit = 10, status } = {}) => {
  return useQuery({
    queryKey: ["myOrders", page, limit, status],
    queryFn: () =>
      getMyOrders({
        page,
        limit,
        status,
      }),
  });
};

export const useSingleOrder = (orderId) => {
  return useQuery({
    queryKey: ["myOrder", orderId],
    queryFn: () => getSingleOrder(orderId),
    enabled: Boolean(orderId),
  });
};

export const usePlaceOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: placeOrder,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["myOrders"],
      });

      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });

      toast.success("Order placed successfully");
    },

    onError: (error) => {
      const message = error.message || "Failed to place order";

      toast.error(message);
    },
  });
};

export const useCancelOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cancelOrder,

    onSuccess: (_, orderId) => {
      queryClient.invalidateQueries({
        queryKey: ["myOrders"],
      });

      queryClient.invalidateQueries({
        queryKey: ["myOrder", orderId],
      });

      toast.success("Order cancelled successfully");
    },

    onError: (error) => {
      const message = error.message || "Failed to cancel order";

      toast.error(message);
    },
  });
};
