import { useDispatch } from "react-redux";
import {
  getAllOrders,
  getOrderById,
  getAdminCart,
  getAdminDashboard,
  updateOrderStatus,
} from "../api/ordersApi";
import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useAdminDashboard = () => {
  const dispatch = useDispatch();
  const query = useQuery({
    queryKey: ["adminDashboard"],
    queryFn: getAdminDashboard,
  });
  useEffect(() => {
    if (query.isSuccess) {
      //if success
    }
  }, []);

  useEffect(() => {
    if (query.isError) {
      const message =
        query.error?.response?.data?.message || "Something went wrong";
      toast.error(message);
    }
  }, [query.isError, query.error]);

  return query;
};

export const useAdminCart = (page, limit) => {
  const dispatch = useDispatch();

  const query = useQuery({
    queryKey: ["adminCart", page, limit],
    queryFn: () => getAdminCart(page, limit),
    enabled: !!page || !!limit,
  });
  useEffect(() => {
    if (query.isSuccess) {
      //if success
    }
  }, []);

  useEffect(() => {
    if (query.isError) {
      const message =
        query.error?.response?.data?.message || "Something went wrong";
      toast.error(message);
    }
  }, [query.isError, query.error]);

  return query;
};

// filter:{
//   status,
//   payment,
//   method,
//   from,
//   to,
//   sortBy,
//   sortDir
// }

export const useAllOrders = (page, limit, filter = "") => {
  const dispatch = useDispatch();
  const query = useQuery({
    queryKey: ["orders", page, limit, filter],
    queryFn: () => getAllOrders(page, limit, filter),
    enabled: !!page || !!limit || !!filter,
  });
  useEffect(() => {
    if (query.isSuccess) {
      //if success
    }
  }, []);

  useEffect(() => {
    if (query.isError) {
      const message =
        query.error?.response?.data?.message || "Something went wrong";
      toast.error(message);
    }
  }, [query.isError, query.error]);

  return query;
};

export const useOrderById = (orderId) => {
  const dispatch = useDispatch();

  const query = useQuery({
    queryKey: ["order", orderId],
    queryFn: () => getOrderById(orderId),
    enabled: !!orderId,
  });
  useEffect(() => {
    if (query.isSuccess) {
      //if success
    }
  }, []);

  useEffect(() => {
    if (query.isError) {
      const message =
        query.error?.response?.data?.message || "Something went wrong";
      toast.error(message);
    }
  }, [query.isError, query.error]);

  return query;
};
export const useOrderStatus = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: ({ orderId, status }) => updateOrderStatus(orderId, status),

    onSuccess: (_, variables) => {
      toast.success("Order status updated successfully");

      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });

      queryClient.invalidateQueries({
        queryKey: ["order", variables.orderId],
      });
    },

    onError: (error) => {
      const message =
        error?.response?.data?.message || "Failed to update order status";

      toast.error(message);
    },
  });
};
