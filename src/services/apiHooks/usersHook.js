import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import toast from "react-hot-toast";

import {
  addUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updataUser,
} from "../api/usersApi";



export const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });
};



export const useUser = (id) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => getUserById(id),
    enabled: Boolean(id),
  });
};



export const useAddUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addUser,

    onSuccess: () => {
      toast.success("User added successfully");

      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },

    onError: (error) => {
      const message =
        error?.response?.data?.message || "Failed to add user";

      toast.error(message);
    },
  });
};


export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }) => updataUser(id, payload),

    onSuccess: (_, variables) => {
      toast.success("User updated successfully");

      // Refresh users list
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });

      // Refresh specific user
      queryClient.invalidateQueries({
        queryKey: ["user", variables.id],
      });
    },

    onError: (error) => {
      const message =
        error?.response?.data?.message || "Failed to update user";

      toast.error(message);
    },
  });
};



export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser,

    onSuccess: (_, id) => {
      toast.success("User deleted successfully");

      // Refresh users list
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });

      // Remove deleted user from cache
      queryClient.removeQueries({
        queryKey: ["user", id],
      });
    },

    onError: (error) => {
      const message =
        error?.response?.data?.message || "Failed to delete user";

      toast.error(message);
    },
  });
};