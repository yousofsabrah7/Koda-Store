import { useQuery } from "@tanstack/react-query";
import * as adminDbApi from "../endpoints/adminDbEndpoints";

// Admin Dashboard
export const useAdminDashboard = () => {
    return useQuery({
        queryKey: ["admin-dashboard"],
        queryFn: adminDbApi.getAdminDashboard,
    });
};