import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

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

// apiClient's interceptor rejects with { statusCode, message },
// so the message lives on error.message (not error.response.data).
const getErrorMessage = (error, fallback) => error?.message || fallback;

export const useSendRegisterOTP = () => {
  return useMutation({
    mutationFn: sendRegisterOTP,
    onSuccess: () => {
      toast.success("OTP sent successfully.");
    },

    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to send OTP."));
    },
  });
};

export const useVerifyRegisterOTP = () => {
  return useMutation({
    mutationFn: verifyRegisterOTP,

    onSuccess: () => {
      toast.success("OTP verified successfully.");
    },

    onError: (error) => {
      toast.error(
        getErrorMessage(error, "Failed to verify registration OTP."),
      );
    },
  });
};

export const useSendForgotPasswordOTP = () => {
  return useMutation({
    mutationFn: sendForgotPasswordOTP,

    onSuccess: () => {
      toast.success("Password reset OTP sent successfully.");
    },

    onError: (error) => {
      toast.error(
        getErrorMessage(error, "Failed to send password reset OTP."),
      );
    },
  });
};

export const useVerifyForgotPasswordOTP = () => {
  return useMutation({
    mutationFn: verifyForgotPasswordOTP,

    onSuccess: () => {
      toast.success("Password reset OTP verified successfully.");
    },

    onError: (error) => {
      toast.error(
        getErrorMessage(error, "Failed to verify password reset OTP."),
      );
    },
  });
};

export const useLogin = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: loginUser,

    onSuccess: (response) => {
      // Response: { success, message, token, user }
      if (response?.token) {
        setAuthToken(response.token);
      }

      dispatch(setLogin(response));

      queryClient.invalidateQueries({ queryKey: ["profile"] });

      toast.success("Welcome back! Logged in successfully.");
    },

    onError: (error) => {
      toast.error(
        getErrorMessage(
          error,
          "Login failed. Please check your email and password.",
        ),
      );
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const clearSession = () => {
    queryClient.clear();
    setAuthToken(null);
    dispatch(setLogout());
  };

  return useMutation({
    mutationFn: logoutUser,

    onSuccess: () => {
      clearSession();
      toast.success("Logged out successfully.");
    },

    onError: (error) => {
      clearSession();
      toast.error(getErrorMessage(error, "An error occurred during logout."));
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
    retry: false,
  });

  useEffect(() => {
    if (query.isSuccess) {
      dispatch(setProfile(query.data));
    }
  }, [query.isSuccess, query.data, dispatch]);

  useEffect(() => {
    if (!query.isError) return;

    const status = query.error?.statusCode;

    dispatch(setAuthorize(status));

    if (status === 401) {
      // Expired / invalid token: clear it silently.
      setAuthToken(null);
      return;
    }

    toast.error(getErrorMessage(query.error, "Something went wrong."));
  }, [query.isError, query.error, dispatch]);

  return query;
}