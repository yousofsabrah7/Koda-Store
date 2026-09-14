import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import toast from "react-hot-toast";

import {
  updataUser,
} from "../api/usersApi";


export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }) => updataUser(id, payload),

    onSuccess: (_, variables) => {
      toast.success("User updated successfully.");

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
        error?.response?.data?.message ||
        "Failed to update user.";

      toast.error(message);
    },
  });
};