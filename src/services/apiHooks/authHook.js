import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import toast from "react-hot-toast";

import {
  loginUser,
  logoutUser,
  getProfile,
} from "../api/authApi";


const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem("token", token);
  } else {
    localStorage.removeItem("token");
  }
};

export const getAuthToken = () => {
  return localStorage.getItem("token");
};


export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: loginUser,

    onSuccess: (response) => {
      const token = response?.token;

      if (token) {
        setAuthToken(token);
      }

      queryClient.invalidateQueries({
        queryKey: ["profile"],
      });

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
    mutationFn: logoutUser,

    onSuccess: () => {
      queryClient.clear();
      setAuthToken(null);
      toast.success("Logged out successfully.");
    },

    onError: (error) => {
      queryClient.clear();
      setAuthToken(null);

      const message =
        error?.response?.data?.message ||
        "An error occurred during logout.";

      toast.error(message);
    },
  });
};


export const useProfile = () => {
  const token = getAuthToken();

  return useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
    enabled: !!token,
  });
};