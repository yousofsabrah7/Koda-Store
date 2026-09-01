import React from "react";
import { selectIsAuthorize, selectRole } from "../redux/services/authSlice";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const RequireAdmin = () => {
  const role = useSelector(selectRole);
  const isAuthorize = useSelector(selectIsAuthorize);

  if (role !== "Admin" || !isAuthorize) {
    return <Navigate to={"/login"} replace />;
  }

  return <Outlet />;
};

export default RequireAdmin;
