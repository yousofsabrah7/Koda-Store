import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addUser, deleteUser, getAllUsers, getUserById, updataUser } from "../api/usersApi";

export const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });
};

export const useUser = () => {
  useQuery({
    queryKey: ["user", id],
    queryFn: () => getUserById(id),
    enabled: !!id,
  });
};

export const useAddUser = () => {
  return useMutation({
    mutationFn: addUser,
    onSuccess: () => {
      toast.success("Added user successfully");
    },
    onError: (error) => {
      const message = error?.response?.data?.message || "Failed to add user";
      toast.error(message);
    },
  });
};

export const useUpdateUser = () => {
  return useMutation({
    mutationFn: ({ id, payload }) => updataUser(id, payload),
    onSuccess: () => {
      toast.success("update user successfully");
    },
    onError: (error) => {
      const message = error?.response?.data?.message || "Failed to updata user";
      toast.error(message);
    },
  });
};

export const useDeleteUser = () => {
  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      toast.success("delete user successfully");
    },
    onError: (error) => {
      const message =
        error?.response?.data?.message || "Failed to deleted user";
      toast.error(message);
    },
  });
};