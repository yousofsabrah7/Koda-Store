import apiClient from '../../config/apiClient';


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