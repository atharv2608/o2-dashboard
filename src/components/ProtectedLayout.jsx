import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
function ProtectedLayout() {
    const authStatus = useSelector((state) => state.auth.status);
  return (
    authStatus ? <Outlet /> : <Navigate to="/login" />
  )
}

export default ProtectedLayout