import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import * as authApi from "../endpoints/authEndpoints";

const setAuthToken = (token) => {
    if (token) {
        localStorage.setItem("userToken", token);
    } else {
        localStorage.removeItem("userToken");
    }
};
const getAuthToken = () => localStorage.getItem("userToken");

export const useSendRegisterOtp = () => {
    return useMutation({
        mutationFn: authApi.sendRegisterOtp,
        onSuccess: () => {
            toast.success("OTP sent to your email successfully!");
        },
        onError: (error) => {
            const message =
                error?.response?.data?.message ||
                "Failed to send OTP. Please try again.";
            toast.error(message);
        },
    });
};

export const useVerifyRegisterOtp = () => {
    return useMutation({
        mutationFn: authApi.verifyRegisterOtp,
        onSuccess: () => {
            toast.success("Account created successfully! You can now log in.");
        },
        onError: (error) => {
            const message =
                error?.response?.data?.message ||
                "OTP verification failed. Please check your code.";
            toast.error(message);
        },
    });
};

export const useLogin = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: authApi.loginUser,
        onSuccess: (response) => {
            const token = response?.token || response?.accessToken;
            if (token) {
                setAuthToken(token);
            }
            toast.success("Welcome back! Logged in successfully.");
        },
        onError: (error) => {
            const message =
                error?.response?.data?.message ||
                "Login failed. Please check your email and password.";
            toast.error(message);
        },
    });
};

export const useLogout = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: authApi.logoutUser,
        onSuccess: () => {
            setAuthToken(null);
            queryClient.clear();
            toast.success("Logged out successfully.");
        },
        onError: (error) => {
            setAuthToken(null);
            queryClient.clear();
            const message =
                error?.response?.data?.message || "An error occurred during logout.";
            toast.error(message);
        },
    });
};


export const useSendForgotPasswordOtp = () => {
    return useMutation({
        mutationFn: authApi.sendForgotPasswordOtp,
        onSuccess: () => {
            toast.success("Password reset OTP sent to your email.");
        },
        onError: (error) => {
            const message =
                error?.response?.data?.message || "Failed to send reset OTP.";
            toast.error(message);
        },
    });
};

export const useVerifyResetPassword = () => {
    return useMutation({
        mutationFn: authApi.verifyResetPassword,
        onSuccess: () => {
            toast.success(
                "Password reset successfully! Log in with your new password.",
            );
        },
        onError: (error) => {
            const message =
                error?.response?.data?.message ||
                "Password reset failed. Please check your OTP.";
            toast.error(message);
        },
    });
};

export const useCurrentUser = () => {
    return useQuery({
        queryKey: ["currentUser"],
        queryFn: authApi.getCurrentUser,
    });
};

export const useAdminTest = () => {
    const token = getAuthToken();
    return useQuery({
        queryKey: ["adminTest"],
        queryFn: authApi.adminTest,
    });
};

export const useChangeRole = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: authApi.changeUserRole,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["currentUser"] });
            toast.success("User role updated successfully.");
        },
        onError: (error) => {
            const message =
                error?.response?.data?.message ||
                "Failed to update user role. Check your permissions.";
            toast.error(message);
        },
    });
};