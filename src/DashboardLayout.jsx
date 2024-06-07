import React, {useEffect} from 'react'
import { SideBar } from './components'
import { Outlet, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import { ThemeProvider } from '@material-tailwind/react'
import { SideBar2 } from './components/dashboardComponents/Sidebar2'
function DashboardLayout() {
  const authStatus = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state?.auth?.userData)
 
  
  
  return (
    <ThemeProvider>
      <ToastContainer />
    <div className="min-h-screen flex flex-col lg:flex-row text-white">
      <SideBar2 />
      
      <div className="z-5 min-h-screen  bg-[#1f2020] text-white w-full ">
      <div className="absolute top-0 right-0 pr-4 pt-2 font-bold">{`${userData.firstName} ${userData.lastName}`}</div>
      <div className="flex-grow mt-11 border-t border-white pt-4">
            <Outlet />
          </div>
      </div>
    </div>
    </ThemeProvider>
  )
}

export default DashboardLayout