import React, { useEffect, useState } from "react";
import formimg from "../Images/loginImage.png";
import { Link, useNavigate } from "react-router-dom";
import { scrollToTop } from "../utils";
import { useForm } from "react-hook-form";
import { Button, Input, LoginForm, LoginImage } from "../components";
import user from "../api/User";
import { useDispatch, useSelector } from "react-redux";
import { login as authLogin } from "../slices/authSlice.js";
import { ToastContainer, toast } from "react-toastify";
import Cookies from "js-cookie";
import "react-toastify/dist/ReactToastify.css";
import { populateData } from "../slices/dataSlice.js";
import axios from "axios";
import loginService from "../utils/service/loginService.js";

const Login = () => {
  scrollToTop();
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);
  useEffect(() => {
    if (authStatus) navigate("/", { replace: true });
  }, [authStatus]);

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);


  return (
    <div className="flex min-h-screen">
      <ToastContainer /> 
      <LoginImage />
      <LoginForm />
    </div>
  );
};

export default Login;
