import apiClient from "../../config/apiClient";

export const getAllProducts = async () => {
    const response = await apiClient.get("/products")
    return response.data
}

export const createProduct = async (payload) => {
    const response = await apiClient.post("/products", payload)
    return response.data
}

export const searchProducts = async (query) => {
    const response = await apiClient.get(`/products/search?query=${query}`)
    return response.data
}

export const getProductById = async (id) => {
    const response = await apiClient.get(`/products/${id}`)
    return response.data
}

export const deleteProduct = async (id) => {
    const response = await apiClient.delete(`/products/${id}`)
    return response.data
}

export const updateProduct = async (id, payload) => {
    const response = await apiClient.patch(`/products/update/${id}`, payload)
    return response.data
}