import React from "react";
import { selectIsAuthorize, selectRole } from "../redux/services/authSlice";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useProfile } from "../services/useProfile";

const RequireAdmin = () => {
  const role = useSelector(selectRole);
  const isAuthorize = useSelector(selectIsAuthorize);
  const { isLoading, data } = useProfile();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="size-15 border-6 border-color-accent border-r-transparent rounded-full animate-spin"></span>
      </div>
    );
  }
  if (!data?.success && (role !== "admin" || !isAuthorize)) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default RequireAdmin;
