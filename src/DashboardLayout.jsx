import React from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import {ThemeProvider } from '@material-tailwind/react';
import { Sidebar, MyProfile } from './components/';
import {scrollToTop} from "./utils"
function DashboardLayout() {
  scrollToTop()
  const userData = useSelector((state) => state?.auth?.userData);

  return (
    <ThemeProvider>
      <ToastContainer />
      <div className="min-h-screen flex flex-col lg:flex-row text-white">
        <Sidebar />
        <div className="flex-grow flex flex-col min-h-screen bg-[#1f2020] text-white w-full">
          <div className="hidden bg-[#1f2020] p-4 lg:flex justify-end items-center lg:items-start">
            <div className="font-bold flex items-center">
            <MyProfile username={`${userData.firstName} ${userData.lastName}`} role={userData.designation} />
            </div>
          </div>
          <div className="flex-grow  lg:border-t lg:border-white p-4">
            <Outlet />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default DashboardLayout;
