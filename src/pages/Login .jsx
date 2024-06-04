import React, { useEffect, useState } from "react";
import formimg from "../Images/formimage.png";
import { Link, useNavigate } from "react-router-dom";
import { scrollToTop } from "../utils";
import { useForm } from "react-hook-form";
import { Input } from "../components";
import { ClipLoader } from "react-spinners";
import user from "../api/User";
import { useDispatch, useSelector } from "react-redux";
import { login as authLogin } from "../slices/authSlice.js"
const Login = () => {
  scrollToTop();
  const navigate = useNavigate()
  const authStatus = useSelector((state) => state.auth.status);
  useEffect(()=>{
    if(authStatus) navigate("/", {replace: true})
  }, [authStatus])

  const dispatch = useDispatch()
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
            console.log(res);
            const userData = res.data.data
            const designation = res.data.data.designation
            if(userData) dispatch(authLogin(userData, designation))
            alert("Login Success");
          }
          setLoading(false);
        })
        .catch((error) => {
          if (error?.response?.status === 404)
            setError("phone", { type: "not-found", message: "User null" });
          if (error?.response?.status === 403)
            alert("Volunteer not yet selected");
          if (error?.response?.status === 401) alert("Invalid Credentials");
          if (error?.response?.status === 409) alert("Already Logged in");
          setLoading(false);
        });
    } catch (error) {
      alert("Some error occured");
      setLoading(false);
    }
  };
  return (
    <div className="flex min-h-screen">
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <ClipLoader
          color="#EF4444"
          height={600}
          width={600}
          loading={loading ? true : false}
          className="absolute"
        />
      </div>
      <div
        className="hidden  lg:block min-h-screen w-1/2 bg-cover bg-center "
        style={backgroundImageStyle}
      ></div>
      <div className="bg-black text-white w-full lg:w-1/2  flex items-center justify-center ">
        {" "}
        <form
          className="w-full p-14 flex flex-col gap-8 lg:p-36"
          onSubmit={handleSubmit(login)}
        >
          <div className="flex flex-col gap-2">
            <div className="font-black text-3xl lg:text-4xl">Welcome!👋</div>
            <div className="text-md md:text-lg">
              Enter your login credentials
            </div>
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
                  EmaiPhone number is invalid
                </p>
              )}
              {errors.phone?.type === "not-found" && (
                <p role="alert" className="text-red-500">
                  User does not exist
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
            <button type="submit" className="bg-red-500 py-2 px-4 rounded-xl">
              login
            </button>
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
