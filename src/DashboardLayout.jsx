import React, {useEffect} from 'react'
import TopBar from './components/TopBar'
import { SideBar } from './components'
import { Outlet, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'
function DashboardLayout() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate()
  useEffect(() => {
    if(!authStatus) navigate("/login", {replace: true})

  }, [authStatus])
  
  
  return (
    <>
      {/* <TopBar /> */}
      <ToastContainer />
    <div className="min-h-screen flex flex-col lg:flex-row text-white">
      <SideBar />
      <div className="z-5 min-h-screen  bg-slate-700 text-white flex items-center justify-center w-full">
        <Outlet />
      </div>
    </div>
    </>
  )
}

export default DashboardLayout