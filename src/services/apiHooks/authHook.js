import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import toast from "react-hot-toast";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  selectToken,
  setAuthorize,
  setLogin,
  setLogout,
  setProfile,
} from "../../redux/services/authSlice";

import {
  sendRegisterOTP,
  verifyRegisterOTP,
  getProfile,
  loginUser,
  logoutUser,
  sendForgotPasswordOTP,
  verifyForgotPasswordOTP,
} from "../api/authApi";

import { useEffect } from "react";

const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem("token", token);
  } else {
    localStorage.removeItem("token");
  }
};
export const getAuthToken = () => localStorage.getItem("token");

export const useSendRegisterOTP = () => {
  return useMutation({
    mutationFn: sendRegisterOTP,

    onSuccess: () => {
      toast.success("OTP sent successfully.");
    },

    onError: (error) => {
      const message =
        error?.response?.data?.message ||
        "Failed to send OTP.";

      toast.error(message);
    },
  });
};

export const useLogin = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

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
        dispatch(setLogin(response));
        toast.success("Welcome back! Logged in successfully.");
      }
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
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      queryClient.clear();
      setAuthToken(null);
      dispatch(setLogout());
      toast.success("Logged out successfully.");
    },
    onError: (error) => {
      queryClient.clear();
      setAuthToken(null);
      const message =
        error?.response?.data?.message || "An error occurred during logout.";
      toast.error(message);
    },
  });
};

export const useProfile = () => {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);

  const query = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
    enabled: !!token,
  });

  useEffect(() => {
    if (query.isSuccess) {
      dispatch(setProfile(query.data));
    }
  }, [query.isSuccess, query.data, dispatch]);

  useEffect(() => {
    if (query.isError) {
      const message =
        query.error?.response?.data?.message || "Something went wrong";
      dispatch(setAuthorize(query.error?.response?.status));
      toast.error(message);
    }
  }, [query.isError, query.error, dispatch, token]);
  return query;
};
