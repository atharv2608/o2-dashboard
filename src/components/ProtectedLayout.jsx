import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { logout } from "../slices/authSlice";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
function ProtectedLayout() {
  const authStatus = useSelector((state) => state.auth.status);
  const dispatch = useDispatch();
  React.useEffect(() => {
    const token = Cookies.get("accessToken");

    if (!token) {
      dispatch(logout());
    }
  }, []);
  return authStatus ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedLayout;
