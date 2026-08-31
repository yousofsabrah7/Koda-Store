import apiClient from "../config/apiClient";
// Auth
export const sendRegisterOtp = async (payload) => {
  const response = await apiClient.post('/auth/register/send-otp', payload);
  return response.data;
};


export const verifyRegisterOtp = async (payload) => {
  const response = await apiClient.post('/auth/register/verify-otp', payload);
  return response.data;
};

export const loginUser = async (payload) => {
  const response = await apiClient.post('/auth/login', payload);
  return response.data;
};

export const logoutUser = async () => {
  const response = await apiClient.post('/auth/logout');
  return response.data;
};

export const sendForgotPasswordOtp = async (payload) => {
  const response = await apiClient.post('/auth/forgot-password/send-otp', payload);
  return response.data;
};

export const verifyResetPassword = async (payload) => {
  const response = await apiClient.post('/auth/forgot-password/verify-otp', payload);
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await apiClient.get('/auth/me');
  return response.data;
};

export const adminTest = async () => {
  const response = await apiClient.get('/auth/admin-test');
  return response.data;
};

export const changeUserRole = async (payload) => {
  const response = await apiClient.patch('/auth/change-role', payload);
  return response.data;
};

// Order Admin Dashboard
export const getAdminDashboard=async()=>{
  const response=await apiClient.get("/orders/admin/dashboard")
  return response.data
}

// User
export const getAllUsers=async()=>{
  const response=await apiClient.get("/users/all")
  return response.data
}

export const getUserById=async (id)=>{
  const response=await apiClient.get(`/users/${id}`)
  return response.data
}

export const addUser=async (payload)=>{
  const response=await apiClient.post("/users/add",payload);
  return response.data
}

export const updataUser=async(id,payload)=>{
  const response=await apiClient.patch(`/users/${id}`,payload)
  return response.data
}

export const deleteUser=async (id)=>{
  const response=await apiClient.delete(`/users/${id}`)
  return response.data
}

// Products
export const getAllProducts=async()=>{
  const response=await apiClient.get("/products")
  return response.data
}

export const createProduct=async(payload)=>{
  const response=await apiClient.post("/products",payload)
  return response.data
}

export const searchProducts=async(query)=>{
  const response=await apiClient.get(`/products/search?query=${query}`)
  return response.data
}

export const getProductById=async(id)=>{
  const response=await apiClient.get(`/products/${id}`)
  return response.data
}

export const deleteProduct=async(id)=>{
  const response=await apiClient.delete(`/products/${id}`)
  return response.data
}

export const updateProduct=async(id,payload)=>{
  const response=await apiClient.patch(`/products/update/${id}`,payload)
  return response.data
}

// Reviews 
export const getProductReviews=async(productId)=>{
  const response=await apiClient.get(`/products/${productId}/reviews`)
  return response.data
}

export const addReview=async(productId,payload)=>{
  const response=await apiClient.post(`/products/${productId}/reviews`,payload)
  return response.data
}

export const deleteReview=async(productId,reviewId)=>{
  const response=await apiClient.delete(`/products/${productId}/reviews/${reviewId}`)
  return response.data
}