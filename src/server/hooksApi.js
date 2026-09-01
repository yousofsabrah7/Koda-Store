import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { sendRegisterOtp,
  verifyRegisterOtp,
  loginUser,
  logoutUser,
  sendForgotPasswordOtp,
  verifyResetPassword,
  getCurrentUser,
  adminTest,
  changeUserRole,
  addUser,
  deleteUser,
  getAdminDashboard,
  getAllUsers,
  getUserById,
  updataUser,
  getAllProducts,
  createProduct,
  searchProducts,
  getProductById,
  deleteProduct,
  updateProduct,
  getProductReviews,
  addReview,
  deleteReview,
} from "./endpointapi";

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
    mutationFn: sendRegisterOtp,
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
    mutationFn: verifyRegisterOtp,
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
    mutationFn: loginUser,
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
    mutationFn: logoutUser,
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
    mutationFn: sendForgotPasswordOtp,
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
    mutationFn: verifyResetPassword,
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
    queryFn: getCurrentUser,
  });
};

export const useAdminTest = () => {
  const token = getAuthToken();
  return useQuery({
    queryKey: ["adminTest"],
    queryFn: adminTest,
  });
};

export const useChangeRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: changeUserRole,
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
// Admin Dashboard
export const useAdminDashboard = () => {
  return useQuery({
    queryKey: ["admin-dashboard"],
    queryFn: getAdminDashboard,
  });
};

// Users Hooks

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

// Products
export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      toast.success("Product created successfully");
      queryClient.invalidateQueries({ queryKey: ["products"] });  // auto update products
    },
    onError: (error) => {
      const message = error?.response?.data?.message || "Failed to create product";
      toast.error(message);
    },
  });
};

export const useSearchProducts = (searchTerm) => {
  return useQuery({
    queryKey: ["searchProducts", searchTerm],
    queryFn: () => searchProducts(searchTerm),
    enabled: !!searchTerm,
  });
}

export const useProduct = (id) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
    enabled: !!id,
  });
}

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      toast.success("Product deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error) => {
      const message = error?.response?.data?.message || "Failed to delete product";
      toast.error(message);
    },
  });
}

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }) => updateProduct(id, payload),
    onSuccess: () => {
      toast.success("Product updated successfully");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error) => {
      const message = error?.response?.data?.message || "Failed to update product";
      toast.error(message);
    },
  });
}

// Reviews
export const useGetProductReviews = (productId) => {
  return useQuery({
    queryKey: ["productReviews", productId],
    queryFn: () => getProductReviews(productId),
    enabled: !!productId,
  });
};

export const useAddReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ productId, payload }) => addReview(productId, payload),
    onSuccess: (data, variables) => {
      toast.success("Review added successfully");
      queryClient.invalidateQueries({ queryKey: ["productReviews", variables.productId] });
    },
    onError: (error) => {
      const message = error?.response?.data?.message || "Failed to add review";
      toast.error(message);
    },
  });
};

export const useDeleteReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ productId, reviewId }) => deleteReview(productId, reviewId),
    onSuccess: (data, variables) => {
      toast.success("Review deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["productReviews", variables.productId] });
    },
    onError: (error) => {
      const message = error?.response?.data?.message || "Failed to delete review";
      toast.error(message);
    },
  });
};
export const useLoginUser = () => {
  return useMutation({
    mutationFn: (credentials) => loginUser(credentials),
    onSuccess: (data) => {
      toast.success("Logged in successfully!");
    },
    onError: (error) => {
      const message = error?.response?.data?.message || "Login failed";
      toast.error(message);
    },
  });
};