import React, { useState, useEffect, useRef } from "react";
import { Squash as Hamburger } from "hamburger-react";
import {Button} from "../components"
import logo from "../Images/o2_logo.png"
import user from "../api/User";
import {logout} from "../slices/authSlice.js"
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navRef = useRef(null);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    // Initialize the state based on the current window width
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const logoutHandler = async () => {
    dispatch(logout());
    setLoading(true);
    try {
      await user
        .logoutUser()
        .then((res) => {
          if (res.data?.statusCode === 200) {
            navigate("/login", { replace: true });
            setLoading(false);
          }
        })
        .catch((error) => {
          if (error?.response?.status === 401) toast.error("No user logged in");
          else {
            console.error("Error: ", error)
            toast.error("Ran into problem")
          }
          setLoading(false);
        });
    } catch (error) {
      console.error("Error: ", error)
      toast.error("Some error occured")
      setLoading(false)
    } finally{
      setLoading(false)
    }
  };

  return (
    <div className="fixed left-0 top-0 lg:static dashboard-nav-container w-full lg:w-1/5 flex flex-col h-auto lg:min-h-screen">
    <ToastContainer />
      <div className="mobile-nav bg-black flex justify-between items-center lg:hidden p-3">
        <div className="order-last">
          <img src={logo} width={50} height={50} alt="logo" />
        </div>
        <div className="">
          <Hamburger color="#F5F5F5" toggled={isOpen} toggle={setIsOpen} />
        </div>
      </div>
      <div
        ref={navRef}
        className={`dropdown bg-black w-1/2 lg:w-full h-full flex-col  gap-4 lg:justify-between ${
          isOpen ? "flex" : "hidden"
        } lg:flex`}
      >
        <div className=" dashboard-links-container pl-4 flex flex-col gap-2 pt-6 lg:pt-12">
          <NavLink to="/" className="link text-xl font-bold">Dashboard</NavLink>
          <div className="link text-xl font-bold">Events</div>
          <div className="link text-xl font-bold">Non Events</div>
          <div className="link text-xl font-bold">Schedule</div>
          <div className="link text-xl font-bold">Colleges</div>
          <div className="link-container flex flex-col gap-2">
            <NavLink to="/databank" className="link text-xl font-bold">Data Bank</NavLink>
            <div className="sublink-container flex flex-col pl-6 gap-2">
              <div className="sublink font-semibold">Registrations</div>
              <div className="sublink font-semibold">Master Data</div>
              <div className="sublink font-semibold">Printable</div>
              <div className="sublink font-semibold">Website Creatives</div>
            </div>
          </div>
          <div className="link-container flex flex-col gap-2">
            <div className="link text-xl font-bold">Control Panel</div>
            <div className="sublink-container flex flex-col pl-6 gap-2">
              <div className="sublink font-semibold">Initial Setup</div>
              <div className="sublink font-semibold">Features</div>
            </div>
          </div>
          <div className="link-container flex flex-col gap-2">
            <div className="link text-xl font-bold">Developer</div>
            <div className="sublink-container flex flex-col pl-6 gap-2">
              <div className="sublink font-semibold">Add Feature</div>
              <div className="sublink font-semibold">Add Role</div>
            </div>
          </div>
        </div>
        <div className="button-container flex p-2">
         <Button loading={loading} label="Logout" className="logout bg-red-500 text-white text-center py-1 w-full rounded " onClick={logoutHandler} />
        </div>
      </div>
    </div>
  );
};

export default SideBar;
