import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { logout } from "../slices/authSlice";
import Cookies from "js-cookie";

function ProtectedLayout() {
  const authStatus = useSelector((state) => state.auth.status);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = Cookies.get("accessToken");
    if (!token) {
      dispatch(logout());
    }
  }, [dispatch]);

  if (!authStatus) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}

export default ProtectedLayout;
