import React, { useEffect } from "react";
import logo from "../Images/o2_logo.png";
import { useNavigate } from "react-router-dom";
import { scrollToTop } from "../utils";
import { ToastContainer, toast } from "react-toastify";
function SuccessRegister() {
  const navigate = useNavigate();
  const registered = sessionStorage.getItem("registered");
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(()=>{
    if(registered === null || !registered){
        navigate("/registrations/volunteers", {replace: true})
    }
    toast.success("Registration Success")
  }, [])

  setTimeout(() => {
    sessionStorage.clear("registered")
    navigate("/login", {replace: true})
  }, 5000);

  return(
    <div className="min-h-screen bg-black flex items-center justify-center ">
    <ToastContainer />
        <div className="flex items-center justify-center flex-wrap">
          <div>
            <img src={logo} height={300} width={300} />
          </div>
          <div>
            <h1 className="text-white text-4xl font-bold text-center">
              Registration Successful!
            </h1>
            <p className="text-white mt-5 text-[20px] text-center">
              Keep checking the portal for further details
            </p>
          </div>
        </div>
      </div>
  )
}

export default SuccessRegister;
