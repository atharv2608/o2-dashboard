import React, {useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Button from "../formElements/Button.jsx";
import Input from "../formElements/Input.jsx";
import { useDispatch, } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import loginService from "../../utils/service/loginService.js";
function LoginForm() {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch()
    const {
        handleSubmit,
        control,
        setError,
        formState: { errors },
      } = useForm();

    const login = async(data) => {
        loginService(data, setLoading, setError, dispatch)
    }
  return (
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
  )
}

export default LoginForm