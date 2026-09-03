import apiClient from "../../config/apiClient";

export const getAdminDashboard = async () => {
    const response = await apiClient.get("/orders/admin/dashboard")
    return response.data
}