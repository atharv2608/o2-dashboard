import React, { useEffect, useState } from "react";
import {useNavigate } from "react-router-dom";
import { scrollToTop } from "../utils";
import { LoginForm, LoginImage } from "../components";
import {useSelector } from "react-redux";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  scrollToTop();
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);
  useEffect(() => {
    if (authStatus) navigate("/", { replace: true });
  }, [authStatus]);
  return (
    <div className="flex min-h-screen">
      <ToastContainer /> 
      <LoginImage />
      <LoginForm />
    </div>
  );
};

export default Login;
