import React, { useEffect, useState } from "react";
import formimg from "../Images/formimage.png";
import { Link, useNavigate } from "react-router-dom";
import { scrollToTop } from "../utils";
import { useForm } from "react-hook-form";
import { Button, Input } from "../components";
import user from "../api/User";
import { useDispatch, useSelector } from "react-redux";
import { login as authLogin } from "../slices/authSlice.js";
import { ToastContainer, toast } from "react-toastify";
import Cookies from "js-cookie";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  scrollToTop();
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);
  useEffect(() => {
    if (authStatus) navigate("/", { replace: true });
  }, [authStatus]);

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const backgroundImageStyle = {
    backgroundImage: `url(${formimg})`,
  };
  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm();

  const login = async (data) => {
    setLoading(true);
    const formData = { phone: data.phone, password: data.password };
    try {
      await user
        .loginUser(formData)
        .then((res) => {
          if (res.data?.statusCode === 200) {
            const userData = res.data.data;
            Cookies.set("accessToken", userData.accessToken, {
              expires: 7, 
              path: '/', 
              secure: true, 
              sameSite: 'strict' 
            })
            const designation = res.data.data.designation;
            if (userData) dispatch(authLogin(userData, designation));
          }
          setLoading(false);
        })
        .catch((error) => {
          if (error?.response?.status === 404) {
            setError("phone", { type: "not-found", message: "User null" });
            toast.error("User does not exist"); // Using toast for error message
          } else if (error?.response?.status === 403) {
            toast.error("Volunteer not yet selected");
          } else if (error?.response?.status === 401) {
            toast.error("Invalid Credentials");
          } else if (error?.response?.status === 409) {
            toast.error("Already Logged in");
          } else {
            toast.error("Ran into problem");
            console.error("Error: ", error)
          }
          setLoading(false);
        });
    } catch (error) {
      toast.error("Some error occurred");
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      <ToastContainer /> {/* Ensuring ToastContainer is included */}
      {/* <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <ClipLoader
          color="#EF4444"
          height={600}
          width={600}
          loading={loading ? true : false}
          className="absolute"
        />
      </div> */}
      <div
        className="hidden lg:block min-h-screen w-1/2 bg-cover bg-center"
        style={backgroundImageStyle}
      ></div>
      <div className="bg-black text-white w-full lg:w-1/2 flex items-center justify-center">
        <form
          className="w-full p-14 flex flex-col gap-8 lg:p-36"
          onSubmit={handleSubmit(login)}
        >
          <div className="flex flex-col gap-2">
            <div className="font-black text-3xl lg:text-4xl">Welcome!👋</div>
            <div className="text-md md:text-lg">Enter your login credentials</div>
          </div>
          {/* form inputs */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <Input
                type="text"
                label="Mobile Number"
                placeholder="Enter mobile number"
                name="phone"
                control={control}
                rules={{
                  required: true,
                  pattern: {
                    value: /^\d+$/,
                    message: "Invalid phone number",
                  },
                  minLength: 10,
                  maxLength: 10,
                }}
              />
              {errors.phone?.type === "required" && (
                <p role="alert" className="text-red-500">
                  Phone number is required
                </p>
              )}
              {errors.phone?.type === "minLength" && (
                <p role="alert" className="text-red-500">
                  Phone number is invalid
                </p>
              )}
              {errors.phone?.type === "maxLength" && (
                <p role="alert" className="text-red-500">
                  Phone number is invalid
                </p>
              )}
              {errors.phone?.type === "pattern" && (
                <p role="alert" className="text-red-500">
                  Phone number is invalid
                </p>
              )}
              
            </div>
            <div className="flex flex-col gap-2">
              <Input
                label="Password"
                type="password"
                name="password"
                placeholder="Enter Password"
                autoComplete="on"
                control={control}
                rules={{ required: true }}
              />
            </div>
            {errors.password?.type === "required" && (
              <p role="alert" className="text-red-500">
                Password is required
              </p>
            )}
          </div>
          {/* submit button */}
          <div>
            <Button className="bg-red-500 py-2 px-4 rounded-xl" label="Login" loading={loading}/>
            <div className="mt-5 underline font-bold hover:text-red-500">
              <Link to="/registrations/volunteers">
                Don't have an account? Sign up here!
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
