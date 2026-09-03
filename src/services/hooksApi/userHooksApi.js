import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import * as userApi from "../endpoints/userEndpoints";

// Users Hooks

export const useUsers = () => {
    return useQuery({
        queryKey: ["users"],
        queryFn: userApi.getAllUsers,
    });
};

export const useUser = (id) => {
    return useQuery({
        queryKey: ["user", id],
        queryFn: () => userApi.getUserById(id),
        enabled: !!id,
    });
};

export const useAddUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: userApi.addUser,
        onSuccess: () => {
            toast.success("Added user successfully");
            queryClient.invalidateQueries({ queryKey: ["users"] });  // auto update users
        },
        onError: (error) => {
            const message = error?.response?.data?.message || "Failed to add user";
            toast.error(message);
        },
    });
};

export const useUpdateUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, payload }) => userApi.updateUser(id, payload),
        onSuccess: () => {
            toast.success("User updated successfully");
            queryClient.invalidateQueries({ queryKey: ["users"] });
            queryClient.invalidateQueries({ queryKey: ["user"] });
        },
        onError: (error) => {
            const message = error?.response?.data?.message || "Failed to update user";
            toast.error(message);
        },
    });
};

export const useDeleteUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: userApi.deleteUser,
        onSuccess: () => {
            toast.success("delete user successfully");
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
        onError: (error) => {
            const message =
                error?.response?.data?.message || "Failed to deleted user";
            toast.error(message);
        },
    });
};