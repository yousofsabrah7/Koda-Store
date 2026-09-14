import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import toast from "react-hot-toast";

import {
  placeOrder,
  getMyOrders,
  getSingleOrder,
  cancelOrder,
} from "../api/ordersApi";




export const useMyOrders = () => {
  return useQuery({
    queryKey: ["myOrders"],
    queryFn: getMyOrders,
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
      // Refresh orders
      queryClient.invalidateQueries({
        queryKey: ["myOrders"],
      });

      // Refresh cart because the order was created
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });

      toast.success("Order placed successfully");
    },

    onError: (error) => {
      const message =
        error?.response?.data?.message ||
        "Failed to place order";

      toast.error(message);
    },
  });
};




export const useCancelOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cancelOrder,

    onSuccess: (_, orderId) => {
      // Refresh order list
      queryClient.invalidateQueries({
        queryKey: ["myOrders"],
      });

      // Refresh specific order
      queryClient.invalidateQueries({
        queryKey: ["myOrder", orderId],
      });

      toast.success("Order cancelled successfully");
    },

    onError: (error) => {
      const message =
        error?.response?.data?.message ||
        "Failed to cancel order";

      toast.error(message);
    },
  });
};